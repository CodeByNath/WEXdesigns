import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

import {
  createLocalFolderIdentityAdapter,
  LocalFolderIdentityAdapterError,
} from '../dist/index.js';

const registration = {
  wexPlatformRegistrationId: 'opaque-platform-registration',
  platformKey: 'host-platform',
  registeredAt: '2026-10-03T00:00:00.000Z',
};

function reserved(allocationId = 'WEXAMABCDE') {
  return {
    wexPlatformRegistrationId: registration.wexPlatformRegistrationId,
    allocationId,
    family: allocationId.startsWith('WEXAMH') ? 'WEXAMH' : 'WEXAM',
    placement: {},
    lifecycleState: 'reserved',
    reservedAt: '2026-10-03T00:01:00.000Z',
  };
}

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'weerax-local-identity-'));
  const directory = join(root, 'wex-identity-space');
  t.after(() => rm(root, { recursive: true, force: true }));
  return { root, directory, adapter: createLocalFolderIdentityAdapter({ directory }) };
}

test('detection is side-effect free and creation persists a supplied registration', async (t) => {
  const { directory, adapter } = await fixture(t);
  assert.equal(await adapter.detectSpace(), 'absent');
  await assert.rejects(() => stat(directory));

  await adapter.createSpace(registration);
  assert.equal(await adapter.detectSpace(), 'present');
  assert.deepEqual(await adapter.readRegistration(), registration);
});

test('reopening reads registration without replacement', async (t) => {
  const { directory, adapter } = await fixture(t);
  await adapter.createSpace(registration);
  const reopened = createLocalFolderIdentityAdapter({ directory });
  assert.deepEqual(await reopened.readRegistration(), registration);
  await assert.rejects(
    () => reopened.createSpace({ ...registration, platformKey: 'other-platform' }),
    LocalFolderIdentityAdapterError,
  );
  assert.deepEqual(await reopened.readRegistration(), registration);
});

test('reserves, reads, transitions, and retains allocation evidence', async (t) => {
  const { adapter } = await fixture(t);
  await adapter.createSpace(registration);
  const initial = reserved();
  await adapter.reserve(initial);
  assert.deepEqual(await adapter.lookup({
    wexPlatformRegistrationId: registration.wexPlatformRegistrationId,
    allocationId: initial.allocationId,
  }), initial);

  const assigned = {
    ...initial,
    lifecycleState: 'assigned',
    assignedAt: '2026-10-03T00:02:00.000Z',
  };
  await adapter.transition({ expectedState: 'reserved', record: assigned });
  await assert.rejects(
    () => adapter.transition({ expectedState: 'reserved', record: assigned }),
    LocalFolderIdentityAdapterError,
  );
  await assert.rejects(() => adapter.reserve(initial), LocalFolderIdentityAdapterError);

  const retired = {
    ...assigned,
    lifecycleState: 'retired',
    retiredAt: '2026-10-03T00:03:00.000Z',
    retirementEvidence: 'host-retired',
  };
  await adapter.transition({ expectedState: 'assigned', record: retired });
  await assert.rejects(() => adapter.reserve(initial), LocalFolderIdentityAdapterError);
});

test('rejects immutable evidence changes and concurrent reservation collisions', async (t) => {
  const { adapter } = await fixture(t);
  await adapter.createSpace(registration);
  const initial = reserved();
  const outcomes = await Promise.allSettled(Array.from({ length: 8 }, () => adapter.reserve(initial)));
  assert.equal(outcomes.filter((outcome) => outcome.status === 'fulfilled').length, 1);
  assert.equal(outcomes.filter((outcome) => outcome.status === 'rejected').length, 7);

  const changed = {
    ...initial,
    lifecycleState: 'assigned',
    assignedAt: '2026-10-03T00:02:00.000Z',
    placement: { parentAllocationId: 'WEXAMFGHJK', slot: 'header' },
  };
  await assert.rejects(
    () => adapter.transition({ expectedState: 'reserved', record: changed }),
    LocalFolderIdentityAdapterError,
  );
});

test('restart readback, malformed records, and path escape attempts are rejected', async (t) => {
  const { root, directory, adapter } = await fixture(t);
  await adapter.createSpace(registration);
  const initial = reserved();
  await adapter.reserve(initial);

  const restarted = createLocalFolderIdentityAdapter({ directory });
  assert.deepEqual(await restarted.readRegistration(), registration);
  assert.deepEqual(await restarted.lookup({
    wexPlatformRegistrationId: registration.wexPlatformRegistrationId,
    allocationId: initial.allocationId,
  }), initial);

  await writeFile(join(directory, 'allocations', 'WEXAMFGHJK.json'), '{not-json');
  await assert.rejects(
    () => restarted.lookup({
      wexPlatformRegistrationId: registration.wexPlatformRegistrationId,
      allocationId: 'WEXAMFGHJK',
    }),
    LocalFolderIdentityAdapterError,
  );

  const hostFile = join(root, 'host-business-data.txt');
  await writeFile(hostFile, 'unchanged');
  await assert.rejects(
    () => restarted.lookup({
      wexPlatformRegistrationId: registration.wexPlatformRegistrationId,
      allocationId: '../../host-business-data',
    }),
  );
  assert.equal(await readFile(hostFile, 'utf8'), 'unchanged');
});
