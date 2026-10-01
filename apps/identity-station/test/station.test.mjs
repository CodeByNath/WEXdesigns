import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { PGlite } from '@electric-sql/pglite';

import {
  AllocationNotFoundError,
  BootstrapAllocationConflictError,
  CandidateExhaustedError,
  InvalidAllocationStateError,
  InvalidBootstrapPlacementError,
  InvalidReserveRequestError,
  createIdentityStation,
} from '../dist/index.js';

const migrationPath = fileURLToPath(
  new URL('../migrations/001_create_allocation_ledger.sql', import.meta.url),
);
const migration = await readFile(migrationPath, 'utf8');

function sequence(values) {
  let index = 0;
  return () => values[index++] ?? values.at(-1);
}

function testDatabase(postgres, bootstrapTransaction = (operation) => operation()) {
  async function withTransaction(operation) {
    await postgres.query('BEGIN');
    try {
      const value = await operation(postgres);
      await postgres.query('COMMIT');
      return value;
    } catch (error) {
      await postgres.query('ROLLBACK');
      throw error;
    }
  }

  return {
    withTransaction,
    withAdminManagerHeaderBootstrapTransaction(operation) {
      return bootstrapTransaction(() => withTransaction(operation));
    },
  };
}

function serializedBootstrapTransaction() {
  let previous = Promise.resolve();

  return async (operation) => {
    let release;
    const current = new Promise((resolve) => { release = resolve; });
    const preceding = previous;
    previous = current;
    await preceding;
    try {
      return await operation();
    } finally {
      release();
    }
  };
}

async function fixture(suffixes = ['ABCDE', 'FGHJK', 'LMNPQ']) {
  const dataDirectory = await mkdtemp(join(tmpdir(), 'weerax-identity-station-'));
  const postgres = await PGlite.create(dataDirectory);
  await postgres.exec(migration);
  return {
    postgres,
    station: createIdentityStation(testDatabase(postgres), { nextSuffix: sequence(suffixes), maxReservationAttempts: suffixes.length }),
    async dispose() {
      await postgres.close();
      await rm(dataDirectory, { recursive: true, force: true });
    },
  };
}

test('test fixtures prove the authorised Admin Manager and Admin Header lifecycle without minting durable IDs', async (t) => {
  const { postgres, station, dispose } = await fixture();
  t.after(dispose);

  const root = await station.reserve({ family: 'WEXAM', placement: {} });
  assert.equal(root.allocationId, 'WEXAMABCDE');
  assert.equal(root.state, 'reserved');
  await station.assign(root.allocationId);

  const header = await station.reserve({
    family: 'WEXAMH',
    placement: { parentAllocationId: root.allocationId, slot: 'header' },
  });
  const assignedHeader = await station.assign(header.allocationId);
  const found = await station.lookup(assignedHeader.allocationId);

  assert.deepEqual(found?.placement, { parentAllocationId: root.allocationId, slot: 'header' });
  assert.equal(found?.state, 'assigned');
});

test('the Station bootstrap resolves its existing allocation pair after a separate database session', async (t) => {
  const dataDirectory = await mkdtemp(join(tmpdir(), 'weerax-identity-station-bootstrap-'));
  t.after(() => rm(dataDirectory, { recursive: true, force: true }));

  const firstPostgres = await PGlite.create(dataDirectory);
  await firstPostgres.exec(migration);
  const firstStation = createIdentityStation(testDatabase(firstPostgres), {
    nextSuffix: sequence(['ABCDE', 'FGHJK']),
  });
  const firstBootstrap = await firstStation.bootstrapAdminManagerHeader();
  await firstPostgres.close();

  const secondPostgres = await PGlite.create(dataDirectory);
  t.after(() => secondPostgres.close());
  const secondStation = createIdentityStation(testDatabase(secondPostgres), {
    nextSuffix: sequence(['LMNPQ', 'RSTUV']),
  });
  const secondBootstrap = await secondStation.bootstrapAdminManagerHeader();

  assert.equal(secondBootstrap.adminManager.allocationId, firstBootstrap.adminManager.allocationId);
  assert.equal(secondBootstrap.adminHeader.allocationId, firstBootstrap.adminHeader.allocationId);
  assert.deepEqual(secondBootstrap.adminHeader.placement, {
    parentAllocationId: firstBootstrap.adminManager.allocationId,
    slot: 'header',
  });
  const rows = await secondPostgres.query('SELECT allocation_id FROM wex_identity.allocation_ledger ORDER BY allocation_id');
  assert.equal(rows.rows.length, 2);
});

test('the Station bootstrap stops rather than creating a second pair from conflicting root evidence', async (t) => {
  const { postgres, station, dispose } = await fixture(['ABCDE', 'FGHJK', 'LMNPQ']);
  t.after(dispose);

  await station.reserve({ family: 'WEXAM', placement: {} });
  await station.reserve({ family: 'WEXAM', placement: {} });

  await assert.rejects(() => station.bootstrapAdminManagerHeader(), BootstrapAllocationConflictError);
  const rows = await postgres.query('SELECT allocation_id FROM wex_identity.allocation_ledger');
  assert.equal(rows.rows.length, 2);
});

test('concurrent Station bootstrap sessions commit only one Admin Manager and Header pair', async (t) => {
  const dataDirectory = await mkdtemp(join(tmpdir(), 'weerax-identity-station-concurrency-'));
  t.after(() => rm(dataDirectory, { recursive: true, force: true }));
  const postgres = await PGlite.create(dataDirectory);
  t.after(() => postgres.close());
  await postgres.exec(migration);

  const bootstrapTransaction = serializedBootstrapTransaction();
  const firstStation = createIdentityStation(testDatabase(postgres, bootstrapTransaction), {
    nextSuffix: sequence(['ABCDE', 'FGHJK']),
  });
  const secondStation = createIdentityStation(testDatabase(postgres, bootstrapTransaction), {
    nextSuffix: sequence(['LMNPQ', 'RSTUV']),
  });
  const [first, second] = await Promise.all([
    firstStation.bootstrapAdminManagerHeader(),
    secondStation.bootstrapAdminManagerHeader(),
  ]);

  assert.equal(first.adminManager.allocationId, second.adminManager.allocationId);
  assert.equal(first.adminHeader.allocationId, second.adminHeader.allocationId);
  const rows = await postgres.query(`SELECT family, placement_kind, parent_allocation_id, slot
    FROM wex_identity.allocation_ledger ORDER BY family`);
  assert.deepEqual(rows.rows, [
    { family: 'WEXAM', placement_kind: 'root', parent_allocation_id: null, slot: null },
    { family: 'WEXAMH', placement_kind: 'child', parent_allocation_id: first.adminManager.allocationId, slot: 'header' },
  ]);
});

test('retries a collision without consuming a failed candidate', async (t) => {
  const { postgres, station, dispose } = await fixture(['ABCDE', 'BCDEF']);
  t.after(dispose);

  await postgres.query(`INSERT INTO wex_identity.allocation_ledger (
    allocation_id, family, placement_kind, state, reserved_at
  ) VALUES ('WEXAMABCDE', 'WEXAM', 'root', 'reserved', CURRENT_TIMESTAMP)`);

  const allocation = await station.reserve({ family: 'WEXAM', placement: {} });
  assert.equal(allocation.allocationId, 'WEXAMBCDEF');
  const ids = await postgres.query('SELECT allocation_id FROM wex_identity.allocation_ledger ORDER BY allocation_id');
  assert.deepEqual(ids.rows.map((row) => row.allocation_id), ['WEXAMABCDE', 'WEXAMBCDEF']);
});

test('committed reservations cannot be reused', async (t) => {
  const { postgres, station, dispose } = await fixture(['ABCDE']);
  t.after(dispose);

  await station.reserve({ family: 'WEXAM', placement: {} });
  await assert.rejects(
    () => station.reserve({ family: 'WEXAM', placement: {} }),
    CandidateExhaustedError,
  );
});

test('ledger identity and placement evidence cannot mutate or be deleted', async (t) => {
  const { postgres, station, dispose } = await fixture();
  t.after(dispose);
  const root = await station.reserve({ family: 'WEXAM', placement: {} });

  await assert.rejects(
    () => postgres.query("UPDATE wex_identity.allocation_ledger SET family = 'WEXAMH' WHERE allocation_id = $1", [root.allocationId]),
  );
  await assert.rejects(
    () => postgres.query('DELETE FROM wex_identity.allocation_ledger WHERE allocation_id = $1', [root.allocationId]),
  );
});

test('assignment cannot create or reassign an allocation', async (t) => {
  const { postgres, station, dispose } = await fixture();
  t.after(dispose);

  await assert.rejects(() => station.assign('WEXAMABCDE'), AllocationNotFoundError);
  const root = await station.reserve({ family: 'WEXAM', placement: {} });
  await station.assign(root.allocationId);
  await assert.rejects(() => station.assign(root.allocationId), InvalidAllocationStateError);
});

test('Admin Header reservation requires an assigned Admin Manager parent', async (t) => {
  const { postgres, station, dispose } = await fixture();
  t.after(dispose);
  const root = await station.reserve({ family: 'WEXAM', placement: {} });

  await assert.rejects(
    () => station.reserve({
      family: 'WEXAMH',
      placement: { parentAllocationId: root.allocationId, slot: 'header' },
    }),
    InvalidBootstrapPlacementError,
  );
});

test('reserve has no caller-supplied ID or platform/domain boundary', async (t) => {
  const { postgres, station, dispose } = await fixture();
  t.after(dispose);

  await assert.rejects(
    () => station.reserve({ family: 'WEXAM', placement: {}, allocationId: 'WEXAMZZZZZ' }),
    InvalidReserveRequestError,
  );
  await assert.rejects(
    () => station.reserve({ family: 'WEXAM', placement: {}, platformRecordRef: 'domain-1' }),
    InvalidReserveRequestError,
  );
});
