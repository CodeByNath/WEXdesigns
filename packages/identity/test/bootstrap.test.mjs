import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

import { createLocalFolderIdentityAdapter } from '../../adapters/dist/index.js';
import {
  bootstrapWexIdentity,
  generateWexPlatformRegistrationId,
  WexIdentityBootstrapError,
} from '../dist/index.js';
import * as publicIdentityApi from '../dist/index.js';
import {
  bootstrapWexIdentityForTest,
  generateWexPlatformRegistrationIdForTest,
} from '../dist/bootstrap.js';

const registrationId = 'WEXPR-ABCDEFGHJKLMNPQRSTUVWXYZ23';
const timestamp = '2026-10-04T00:00:00.000Z';

function deterministicRandom(size) {
  return Uint8Array.from({ length: size }, (_, index) => index);
}

function bootstrapOptions(adapter, overrides = {}) {
  return {
    adapter,
    platformKey: 'host-platform',
    approvalGranted: true,
    now: () => new Date(timestamp),
    randomBytes: deterministicRandom,
    ...overrides,
  };
}

function memoryAdapter({
  observation = 'absent',
  registration,
  create = async (record) => record,
  read,
} = {}) {
  let persisted = registration;
  let createCalls = 0;
  let readCalls = 0;

  return {
    get createCalls() { return createCalls; },
    get readCalls() { return readCalls; },
    get persisted() { return persisted; },
    async detectSpace() {
      if (observation instanceof Error) throw observation;
      return observation;
    },
    async createSpace(record) {
      createCalls += 1;
      const result = await create(record);
      if (result !== undefined) persisted = result;
    },
    async readRegistration() {
      readCalls += 1;
      if (read instanceof Error) throw read;
      return read === undefined ? persisted : read;
    },
  };
}

test('generates the exact WEXPR Base32 form from independent five-bit values', () => {
  assert.equal(generateWexPlatformRegistrationIdForTest(deterministicRandom), registrationId);
  assert.match(generateWexPlatformRegistrationId(), /^WEXPR-[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{26}$/);
});

test('requires approval without mutating or generating an identity', async () => {
  const adapter = memoryAdapter();
  let randomCalls = 0;

  const result = await bootstrapWexIdentityForTest(bootstrapOptions(adapter, {
    approvalGranted: false,
    randomBytes(size) {
      randomCalls += 1;
      return deterministicRandom(size);
    },
  }));

  assert.deepEqual(result, { state: 'approval-required' });
  assert.equal(adapter.createCalls, 0);
  assert.equal(adapter.readCalls, 0);
  assert.equal(randomCalls, 0);
});

test('creates one supplied registration and requires exact readback', async () => {
  const adapter = memoryAdapter();
  const result = await bootstrapWexIdentityForTest(bootstrapOptions(adapter));

  assert.deepEqual(result, {
    state: 'ready',
    registration: {
      wexPlatformRegistrationId: registrationId,
      platformKey: 'host-platform',
      registeredAt: timestamp,
    },
  });
  assert.equal(adapter.createCalls, 1);
  assert.deepEqual(adapter.persisted, result.registration);
});

test('reopens a matching platform without generating or replacing its registration', async () => {
  const registration = {
    wexPlatformRegistrationId: registrationId,
    platformKey: 'host-platform',
    registeredAt: timestamp,
  };
  const adapter = memoryAdapter({ observation: 'present', registration });
  let randomCalls = 0;

  const result = await bootstrapWexIdentityForTest(bootstrapOptions(adapter, {
    randomBytes(size) {
      randomCalls += 1;
      return deterministicRandom(size);
    },
  }));

  assert.deepEqual(result, { state: 'ready', registration });
  assert.equal(adapter.createCalls, 0);
  assert.equal(randomCalls, 0);
});

test('fails closed when a present space belongs to a different platform', async () => {
  const registration = {
    wexPlatformRegistrationId: registrationId,
    platformKey: 'other-platform',
    registeredAt: timestamp,
  };
  const adapter = memoryAdapter({ observation: 'present', registration });
  let randomCalls = 0;

  await assert.rejects(
    () => bootstrapWexIdentityForTest(bootstrapOptions(adapter, {
      randomBytes(size) {
        randomCalls += 1;
        return deterministicRandom(size);
      },
    })),
    WexIdentityBootstrapError,
  );
  assert.equal(adapter.createCalls, 0);
  assert.equal(randomCalls, 0);
});

test('fails closed for damaged, missing, or mismatched registrations', async () => {
  await assert.rejects(
    () => bootstrapWexIdentityForTest(bootstrapOptions(memoryAdapter({ observation: new Error('damaged') }))),
    WexIdentityBootstrapError,
  );
  await assert.rejects(
    () => bootstrapWexIdentityForTest(bootstrapOptions(memoryAdapter({ observation: 'present' }))),
    WexIdentityBootstrapError,
  );
  const adapter = memoryAdapter({
    create: async (record) => ({ ...record, platformKey: 'different-host' }),
  });
  await assert.rejects(() => bootstrapWexIdentityForTest(bootstrapOptions(adapter)), WexIdentityBootstrapError);
});

test('treats create failure with exact durable readback as ready', async () => {
  let persisted;
  let createCalls = 0;
  const adapter = {
    async detectSpace() { return 'absent'; },
    async createSpace(record) {
      createCalls += 1;
      persisted = record;
      throw new Error('connection dropped after durable write');
    },
    async readRegistration() { return persisted; },
  };
  const result = await bootstrapWexIdentityForTest(bootstrapOptions(adapter));

  assert.equal(result.state, 'ready');
  assert.equal(result.registration.wexPlatformRegistrationId, registrationId);
  assert.equal(createCalls, 1);
});

test('fails closed when a failed create reads back a different registration', async () => {
  let persisted;
  const adapter = {
    async detectSpace() { return 'absent'; },
    async createSpace(record) {
      persisted = { ...record, platformKey: 'different-host' };
      throw new Error('connection dropped after a conflicting write');
    },
    async readRegistration() { return persisted; },
  };

  await assert.rejects(() => bootstrapWexIdentityForTest(bootstrapOptions(adapter)), WexIdentityBootstrapError);
});

test('generates at most one ID when create fails without a readback', async () => {
  const adapter = memoryAdapter({
    create: async () => { throw new Error('create failed'); },
  });
  let randomCalls = 0;

  await assert.rejects(
    () => bootstrapWexIdentityForTest(bootstrapOptions(adapter, {
      randomBytes(size) {
        randomCalls += 1;
        return deterministicRandom(size);
      },
    })),
    WexIdentityBootstrapError,
  );
  assert.equal(adapter.createCalls, 1);
  assert.equal(randomCalls, 1);
});

test('the public bootstrap ignores caller-supplied non-CSPRNG entropy', async () => {
  const adapter = memoryAdapter();
  let randomCalls = 0;

  const result = await bootstrapWexIdentity({
    ...bootstrapOptions(adapter),
    randomBytes(size) {
      randomCalls += 1;
      return deterministicRandom(size);
    },
  });

  assert.equal(result.state, 'ready');
  assert.match(result.registration.wexPlatformRegistrationId, /^WEXPR-[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{26}$/);
  assert.equal(randomCalls, 0);
  assert.equal('bootstrapWexIdentityForTest' in publicIdentityApi, false);
  assert.equal('generateWexPlatformRegistrationIdForTest' in publicIdentityApi, false);
});

test('integrates through the local-folder adapter without importing it at runtime', async (t) => {
  const root = await mkdtemp(join(tmpdir(), 'weerax-identity-bootstrap-'));
  const directory = join(root, 'wex-identity-space');
  t.after(() => rm(root, { recursive: true, force: true }));
  const adapter = createLocalFolderIdentityAdapter({ directory });

  const created = await bootstrapWexIdentity({
    adapter,
    platformKey: 'host-platform',
    approvalGranted: true,
    now: () => new Date(timestamp),
  });
  const reopened = await bootstrapWexIdentity({
    adapter,
    platformKey: 'host-platform',
    approvalGranted: true,
    now: () => new Date(timestamp),
  });

  assert.equal(created.state, 'ready');
  assert.deepEqual(reopened, created);
  assert.deepEqual(await adapter.readRegistration(), created.registration);
});
