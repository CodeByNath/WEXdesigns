import { randomUUID } from 'node:crypto';
import { mkdir, open, readFile, rename, rm, stat, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

import {
  WexIdentityAllocationLookupSchema,
  WexIdentityAllocationRecordSchema,
  WexIdentitySpaceRegistrationSchema,
  type WexIdentityAllocationLifecycleState,
  type WexIdentityAllocationLookup,
  type WexIdentityAllocationRecord,
  type WexIdentitySpaceRegistration,
} from '@weerax/schemas';

const REGISTRATION_FILE = 'registration.json';
const ALLOCATIONS_DIRECTORY = 'allocations';
const LOCK_FILE = '.wex-identity.lock';

export class LocalFolderIdentityAdapterError extends Error {
  override name = 'LocalFolderIdentityAdapterError';
}

export type LocalFolderIdentityAdapterOptions = {
  directory: string;
  lockRetryDelayMs?: number;
};

export type LocalFolderIdentityTransition = {
  expectedState: WexIdentityAllocationLifecycleState;
  record: WexIdentityAllocationRecord;
};

export type LocalFolderIdentityAdapter = {
  detectSpace(): Promise<'absent' | 'present'>;
  createSpace(registration: WexIdentitySpaceRegistration): Promise<void>;
  readRegistration(): Promise<WexIdentitySpaceRegistration | undefined>;
  reserve(record: WexIdentityAllocationRecord): Promise<void>;
  transition(transition: LocalFolderIdentityTransition): Promise<void>;
  lookup(key: WexIdentityAllocationLookup): Promise<WexIdentityAllocationRecord | undefined>;
};

function isMissing(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT';
}

function isAlreadyPresent(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 'EEXIST';
}

function json(value: unknown): string {
  return `${JSON.stringify(value)}\n`;
}

function parseJson<T>(value: string, parse: (input: unknown) => T, path: string): T {
  try {
    return parse(JSON.parse(value));
  } catch (error) {
    throw new LocalFolderIdentityAdapterError(`Invalid persisted WEX identity record: ${path}`, { cause: error });
  }
}

function sameImmutableEvidence(current: WexIdentityAllocationRecord, next: WexIdentityAllocationRecord): boolean {
  return current.wexPlatformRegistrationId === next.wexPlatformRegistrationId
    && current.allocationId === next.allocationId
    && current.family === next.family
    && current.reservedAt === next.reservedAt
    && JSON.stringify(current.placement) === JSON.stringify(next.placement);
}

export function createLocalFolderIdentityAdapter(
  options: LocalFolderIdentityAdapterOptions,
): LocalFolderIdentityAdapter {
  const directory = options.directory;
  const retryDelay = options.lockRetryDelayMs ?? 5;
  const registrationPath = join(directory, REGISTRATION_FILE);
  const allocationsPath = join(directory, ALLOCATIONS_DIRECTORY);
  const lockPath = join(directory, LOCK_FILE);

  function allocationPath(key: WexIdentityAllocationLookup): string {
    const parsed = WexIdentityAllocationLookupSchema.parse(key);
    return join(allocationsPath, `${parsed.allocationId}.json`);
  }

  async function readRegistration(): Promise<WexIdentitySpaceRegistration | undefined> {
    try {
      const value = await readFile(registrationPath, 'utf8');
      return parseJson(value, WexIdentitySpaceRegistrationSchema.parse, registrationPath);
    } catch (error) {
      if (isMissing(error)) return undefined;
      throw error;
    }
  }

  async function readAllocation(key: WexIdentityAllocationLookup): Promise<WexIdentityAllocationRecord | undefined> {
    const path = allocationPath(key);
    try {
      const value = await readFile(path, 'utf8');
      const record = parseJson(value, WexIdentityAllocationRecordSchema.parse, path);
      if (record.wexPlatformRegistrationId !== key.wexPlatformRegistrationId) {
        throw new LocalFolderIdentityAdapterError(`Allocation registration identity mismatch: ${path}`);
      }
      return record;
    } catch (error) {
      if (isMissing(error)) return undefined;
      throw error;
    }
  }

  async function requireMatchingRegistration(registrationId: string): Promise<void> {
    const registration = await readRegistration();
    if (registration === undefined) {
      throw new LocalFolderIdentityAdapterError('WEX identity space has no registration');
    }
    if (registration.wexPlatformRegistrationId !== registrationId) {
      throw new LocalFolderIdentityAdapterError('WEX platform registration identity does not match this space');
    }
  }

  async function writeAtomically(path: string, value: unknown): Promise<void> {
    const temporaryPath = join(dirname(path), `.${basename(path)}.${randomUUID()}.tmp`);
    try {
      await writeFile(temporaryPath, json(value), { encoding: 'utf8', flag: 'wx' });
      await rename(temporaryPath, path);
    } finally {
      await rm(temporaryPath, { force: true });
    }
  }

  async function withLock<Result>(operation: () => Promise<Result>): Promise<Result> {
    let handle: Awaited<ReturnType<typeof open>> | undefined;
    for (;;) {
      try {
        handle = await open(lockPath, 'wx');
        break;
      } catch (error) {
        if (!isAlreadyPresent(error)) throw error;
        await delay(retryDelay);
      }
    }

    try {
      return await operation();
    } finally {
      await handle.close();
      await rm(lockPath, { force: true });
    }
  }

  return {
    async detectSpace() {
      try {
        await stat(registrationPath);
      } catch (error) {
        if (isMissing(error)) return 'absent';
        throw error;
      }
      await readRegistration();
      return 'present';
    },

    async createSpace(registration) {
      const parsed = WexIdentitySpaceRegistrationSchema.parse(registration);
      await mkdir(allocationsPath, { recursive: true });
      await withLock(async () => {
        if (await readRegistration() !== undefined) {
          throw new LocalFolderIdentityAdapterError('WEX identity space is already registered');
        }
        await writeAtomically(registrationPath, parsed);
      });
    },

    readRegistration,

    async reserve(record) {
      const parsed = WexIdentityAllocationRecordSchema.parse(record);
      if (parsed.lifecycleState !== 'reserved') {
        throw new LocalFolderIdentityAdapterError('Only a supplied reserved allocation can be created');
      }
      await requireMatchingRegistration(parsed.wexPlatformRegistrationId);
      await withLock(async () => {
        const key = {
          wexPlatformRegistrationId: parsed.wexPlatformRegistrationId,
          allocationId: parsed.allocationId,
        };
        const path = allocationPath(key);
        if (await readAllocation(key) !== undefined) {
          throw new LocalFolderIdentityAdapterError('WEX allocation address is already occupied');
        }
        await writeAtomically(path, parsed);
      });
    },

    async transition(transition) {
      const next = WexIdentityAllocationRecordSchema.parse(transition.record);
      await requireMatchingRegistration(next.wexPlatformRegistrationId);
      await withLock(async () => {
        const key = {
          wexPlatformRegistrationId: next.wexPlatformRegistrationId,
          allocationId: next.allocationId,
        };
        const current = await readAllocation(key);
        if (current === undefined) {
          throw new LocalFolderIdentityAdapterError('Cannot transition a missing WEX allocation');
        }
        if (current.lifecycleState !== transition.expectedState) {
          throw new LocalFolderIdentityAdapterError('WEX allocation lifecycle state changed concurrently');
        }
        if (!sameImmutableEvidence(current, next)) {
          throw new LocalFolderIdentityAdapterError('WEX allocation immutable evidence cannot change');
        }
        await writeAtomically(allocationPath(key), next);
      });
    },

    async lookup(key) {
      const parsed = WexIdentityAllocationLookupSchema.parse(key);
      await requireMatchingRegistration(parsed.wexPlatformRegistrationId);
      return readAllocation(parsed);
    },
  };
}
