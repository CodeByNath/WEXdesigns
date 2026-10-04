import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { PGlite } from '@electric-sql/pglite';

import {
  createPostgresIdentityAdapter,
  PostgresIdentityAdapterError,
} from '../dist/index.js';

const migrationPaths = [
  fileURLToPath(new URL('../migrations/001_create_allocation_ledger.sql', import.meta.url)),
  fileURLToPath(new URL('../migrations/002_create_portable_identity_adapter.sql', import.meta.url)),
];
const migrations = await Promise.all(migrationPaths.map((path) => readFile(path, 'utf8')));

const registration = {
  wexPlatformRegistrationId: 'WEXPR-ABCDEFGHJKLMNPQRSTUVWXYZ23',
  platformKey: 'host-platform',
  registeredAt: '2026-10-04T00:00:00.000Z',
};

function reserved(allocationId = 'WEXAMABCDE') {
  return {
    wexPlatformRegistrationId: registration.wexPlatformRegistrationId,
    allocationId,
    family: allocationId.startsWith('WEXAMH') ? 'WEXAMH' : 'WEXAM',
    placement: {},
    lifecycleState: 'reserved',
    reservedAt: '2026-10-04T00:01:00.000Z',
  };
}

function testDatabase(postgres) {
  return {
    async withTransaction(operation) {
      await postgres.query('BEGIN');
      try {
        const value = await operation(postgres);
        await postgres.query('COMMIT');
        return value;
      } catch (error) {
        await postgres.query('ROLLBACK');
        throw error;
      }
    },
  };
}

async function fixture(t) {
  const dataDirectory = await mkdtemp(join(tmpdir(), 'weerax-postgres-identity-adapter-'));
  const postgres = await PGlite.create(dataDirectory);
  t.after(async () => {
    await postgres.close();
    await rm(dataDirectory, { recursive: true, force: true });
  });
  for (const migration of migrations) await postgres.exec(migration);
  return { postgres, adapter: createPostgresIdentityAdapter(testDatabase(postgres)) };
}

test('detects, creates, and reads only the supplied portable registration', async (t) => {
  const { adapter } = await fixture(t);
  assert.equal(await adapter.detectSpace(), 'absent');

  await adapter.createSpace(registration);
  assert.equal(await adapter.detectSpace(), 'present');
  assert.deepEqual(await adapter.readRegistration(), registration);
  await assert.rejects(
    () => adapter.createSpace({ ...registration, platformKey: 'other-platform' }),
    PostgresIdentityAdapterError,
  );
  assert.deepEqual(await adapter.readRegistration(), registration);
});

test('atomically rejects a registration-address collision without replacing evidence', async (t) => {
  const { adapter } = await fixture(t);
  await adapter.createSpace(registration);
  const initial = reserved();

  await adapter.reserve(initial);
  await assert.rejects(() => adapter.reserve(initial), PostgresIdentityAdapterError);
  assert.deepEqual(await adapter.lookup({
    wexPlatformRegistrationId: registration.wexPlatformRegistrationId,
    allocationId: initial.allocationId,
  }), initial);
});

test('uses compare/write transitions while retaining immutable and non-reusable records', async (t) => {
  const { adapter } = await fixture(t);
  await adapter.createSpace(registration);
  const initial = reserved();
  const key = {
    wexPlatformRegistrationId: registration.wexPlatformRegistrationId,
    allocationId: initial.allocationId,
  };
  await adapter.reserve(initial);

  const assigned = {
    ...initial,
    lifecycleState: 'assigned',
    assignedAt: '2026-10-04T00:02:00.000Z',
  };
  await adapter.transition({ expectedState: 'reserved', record: assigned });
  await assert.rejects(
    () => adapter.transition({ expectedState: 'reserved', record: assigned }),
    PostgresIdentityAdapterError,
  );
  await assert.rejects(
    () => adapter.transition({
      expectedState: 'assigned',
      record: { ...assigned, placement: { parentAllocationId: 'WEXAMFGHJK', slot: 'header' } },
    }),
    PostgresIdentityAdapterError,
  );

  const retired = {
    ...assigned,
    lifecycleState: 'retired',
    retiredAt: '2026-10-04T00:03:00.000Z',
    retirementEvidence: 'host-retired',
  };
  await adapter.transition({ expectedState: 'assigned', record: retired });
  await assert.rejects(() => adapter.reserve(initial), PostgresIdentityAdapterError);
  await assert.rejects(
    () => adapter.transition({ expectedState: 'retired', record: assigned }),
    PostgresIdentityAdapterError,
  );
  assert.deepEqual(await adapter.lookup(key), retired);
});

test('isolates lookup by registration address and fails closed for mismatch or damaged registration', async (t) => {
  const { postgres, adapter } = await fixture(t);
  await adapter.createSpace(registration);
  const initial = reserved();
  await adapter.reserve(initial);

  assert.equal(await adapter.lookup({
    wexPlatformRegistrationId: registration.wexPlatformRegistrationId,
    allocationId: 'WEXAMFGHJK',
  }), undefined);
  await assert.rejects(
    () => adapter.lookup({
      wexPlatformRegistrationId: 'WEXPR-ABCDEFGHJKLMNPQRSTUVWXYZ24',
      allocationId: initial.allocationId,
    }),
    PostgresIdentityAdapterError,
  );

  await postgres.query("UPDATE wex_identity.identity_space_registration SET platform_key = '' WHERE singleton = TRUE");
  await assert.rejects(() => adapter.readRegistration(), PostgresIdentityAdapterError);
  await assert.rejects(() => adapter.detectSpace(), PostgresIdentityAdapterError);
});
