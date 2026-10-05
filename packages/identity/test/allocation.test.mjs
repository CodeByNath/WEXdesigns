import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

import { createLocalFolderIdentityAdapter } from '../../adapters/dist/index.js';
import {
  assignWexIdentityAllocation,
  lookupWexIdentityAllocation,
  retireWexIdentityAllocation,
  WexIdentityAllocationError,
} from '../dist/index.js';
import { reserveWexIdentityAllocationForTest } from '../dist/allocation.js';

const registration = {
  wexPlatformRegistrationId: 'WEXPR-ABCDEFGHJKLMNPQRSTUVWXYZ23',
  platformKey: 'host-platform',
  registeredAt: '2026-10-05T00:00:00.000Z',
};

function deterministicRandom(size) {
  return Uint8Array.from({ length: size }, (_, index) => index);
}

function address(record) {
  return {
    wexPlatformRegistrationId: record.wexPlatformRegistrationId,
    allocationId: record.allocationId,
  };
}

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'weerax-identity-allocation-'));
  const directory = join(root, 'wex-identity-space');
  t.after(() => rm(root, { recursive: true, force: true }));
  const adapter = createLocalFolderIdentityAdapter({ directory });
  await adapter.createSpace(registration);
  return { directory, adapter };
}

function reserveOptions(adapter, overrides = {}) {
  return {
    adapter,
    wexPlatformRegistrationId: registration.wexPlatformRegistrationId,
    family: 'WEXAM',
    placement: {},
    now: () => new Date('2026-10-05T00:01:00.000Z'),
    randomBytes: deterministicRandom,
    ...overrides,
  };
}

test('reserves and assigns the authorised WEXAM root before reserving WEXAMH header', async (t) => {
  const { adapter } = await fixture(t);
  const root = await reserveWexIdentityAllocationForTest(reserveOptions(adapter));
  assert.deepEqual(root, {
    ...address(root),
    family: 'WEXAM',
    placement: {},
    lifecycleState: 'reserved',
    reservedAt: '2026-10-05T00:01:00.000Z',
  });

  await assert.rejects(
    () => reserveWexIdentityAllocationForTest(reserveOptions(adapter, {
      family: 'WEXAMH',
      placement: { parentAllocationId: root.allocationId, slot: 'header' },
    })),
    WexIdentityAllocationError,
  );

  const assignedRoot = await assignWexIdentityAllocation({
    adapter,
    address: address(root),
    now: () => new Date('2026-10-05T00:02:00.000Z'),
  });
  assert.equal(assignedRoot.lifecycleState, 'assigned');

  const header = await reserveWexIdentityAllocationForTest(reserveOptions(adapter, {
    family: 'WEXAMH',
    placement: { parentAllocationId: root.allocationId, slot: 'header' },
    now: () => new Date('2026-10-05T00:03:00.000Z'),
  }));
  assert.deepEqual(header.placement, { parentAllocationId: root.allocationId, slot: 'header' });
  assert.equal(header.lifecycleState, 'reserved');
});

test('locates, inspects, and selects a test fixture by its portable identity address', async (t) => {
  const { adapter } = await fixture(t);
  const root = await reserveWexIdentityAllocationForTest(reserveOptions(adapter));
  await assignWexIdentityAllocation({ adapter, address: address(root) });
  const header = await reserveWexIdentityAllocationForTest(reserveOptions(adapter, {
    family: 'WEXAMH',
    placement: { parentAllocationId: root.allocationId, slot: 'header' },
  }));

  const fixtureTarget = {
    kind: 'test-header-target',
    identityAddress: address(header),
  };
  const inspected = await lookupWexIdentityAllocation(adapter, fixtureTarget.identityAddress);
  assert.deepEqual(inspected, header);
  const selected = fixtureTarget.identityAddress.wexPlatformRegistrationId === inspected.wexPlatformRegistrationId
    && fixtureTarget.identityAddress.allocationId === inspected.allocationId
    ? fixtureTarget
    : undefined;
  assert.equal(selected, fixtureTarget);
});

test('retains non-reuse evidence across restart and bounds collision retries', async (t) => {
  const { directory, adapter } = await fixture(t);
  const root = await reserveWexIdentityAllocationForTest(reserveOptions(adapter));
  const assigned = await assignWexIdentityAllocation({ adapter, address: address(root) });
  const retired = await retireWexIdentityAllocation({
    adapter,
    address: address(assigned),
    retirementEvidence: 'test retirement',
    now: () => new Date('2026-10-05T00:04:00.000Z'),
  });
  assert.equal(retired.lifecycleState, 'retired');

  const restarted = createLocalFolderIdentityAdapter({ directory });
  assert.deepEqual(await lookupWexIdentityAllocation(restarted, address(root)), retired);
  await assert.rejects(
    () => reserveWexIdentityAllocationForTest(reserveOptions(restarted, { maxReservationAttempts: 1 })),
    WexIdentityAllocationError,
  );
  assert.deepEqual(await lookupWexIdentityAllocation(restarted, address(root)), retired);
});
