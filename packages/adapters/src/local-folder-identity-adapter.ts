import { randomUUID } from 'node:crypto';
import { lstat, mkdir, open, readFile, readdir, realpath, rename, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, isAbsolute, join, relative } from 'node:path';
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

type SpaceInspection = 'absent' | 'present';

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

  function unsafePath(path: string): LocalFolderIdentityAdapterError {
    return new LocalFolderIdentityAdapterError(`Unsafe WEX identity-space path: ${path}`);
  }

  function isWithinSpace(spacePath: string, candidatePath: string): boolean {
    const relation = relative(spacePath, candidatePath);
    return relation === '' || (!relation.startsWith('..') && !isAbsolute(relation));
  }

  async function readEntry(path: string) {
    try {
      return await lstat(path);
    } catch (error) {
      if (isMissing(error)) return undefined;
      throw error;
    }
  }

  async function requireSpaceDirectory(create: boolean): Promise<string | undefined> {
    if (create) await mkdir(directory, { recursive: true });
    const entry = await readEntry(directory);
    if (entry === undefined) return undefined;
    if (!entry.isDirectory() || entry.isSymbolicLink()) throw unsafePath(directory);
    return realpath(directory);
  }

  async function requireRegularFile(path: string, missingAllowed = false): Promise<boolean> {
    const entry = await readEntry(path);
    if (entry === undefined) {
      if (missingAllowed) return false;
      throw new LocalFolderIdentityAdapterError(`Missing WEX identity-space record: ${path}`);
    }
    if (!entry.isFile() || entry.isSymbolicLink()) throw unsafePath(path);
    return true;
  }

  async function requireAllocationsDirectory(spacePath: string, create = false): Promise<string> {
    if (create) await mkdir(allocationsPath, { recursive: true });
    const entry = await readEntry(allocationsPath);
    if (entry === undefined || !entry.isDirectory() || entry.isSymbolicLink()) throw unsafePath(allocationsPath);
    const resolved = await realpath(allocationsPath);
    if (!isWithinSpace(spacePath, resolved)) throw unsafePath(allocationsPath);
    return resolved;
  }

  async function inspectSpace(): Promise<SpaceInspection> {
    const spacePath = await requireSpaceDirectory(false);
    if (spacePath === undefined) return 'absent';

    const entries = (await readdir(spacePath)).filter((entry) => entry !== LOCK_FILE);
    const hasRegistration = entries.includes(REGISTRATION_FILE);
    if (!hasRegistration) {
      if (entries.length === 0) return 'absent';
      throw new LocalFolderIdentityAdapterError('WEX identity space is damaged or contains incompatible remnants');
    }

    if (!await requireRegularFile(registrationPath, true)) {
      throw new LocalFolderIdentityAdapterError('WEX identity space registration is missing');
    }
    await requireAllocationsDirectory(spacePath);
    await readRegistrationRecord();
    if (entries.some((entry) => entry !== REGISTRATION_FILE && entry !== ALLOCATIONS_DIRECTORY)) {
      throw new LocalFolderIdentityAdapterError('WEX identity space contains incompatible remnants');
    }
    return 'present';
  }

  function allocationPath(key: WexIdentityAllocationLookup): string {
    const parsed = WexIdentityAllocationLookupSchema.parse(key);
    return join(allocationsPath, `${parsed.allocationId}.json`);
  }

  async function readRegistrationRecord(): Promise<WexIdentitySpaceRegistration | undefined> {
    try {
      if (!await requireRegularFile(registrationPath, true)) return undefined;
      const value = await readFile(registrationPath, 'utf8');
      return parseJson(value, WexIdentitySpaceRegistrationSchema.parse, registrationPath);
    } catch (error) {
      if (isMissing(error)) return undefined;
      throw error;
    }
  }

  async function readRegistration(): Promise<WexIdentitySpaceRegistration | undefined> {
    if (await inspectSpace() === 'absent') return undefined;
    return readRegistrationRecord();
  }

  async function readAllocation(key: WexIdentityAllocationLookup): Promise<WexIdentityAllocationRecord | undefined> {
    const path = allocationPath(key);
    try {
      if (!await requireRegularFile(path, true)) return undefined;
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
    await requireRegularFile(path, true);
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
        await requireRegularFile(lockPath);
        break;
      } catch (error) {
        if (!isAlreadyPresent(error)) throw error;
        await requireRegularFile(lockPath);
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
      return inspectSpace();
    },

    async createSpace(registration) {
      const parsed = WexIdentitySpaceRegistrationSchema.parse(registration);
      const spacePath = await requireSpaceDirectory(true);
      if (spacePath === undefined) throw new LocalFolderIdentityAdapterError('Unable to create WEX identity space directory');
      if (await inspectSpace() === 'present') {
        throw new LocalFolderIdentityAdapterError('WEX identity space is already registered');
      }
      await withLock(async () => {
        if (await inspectSpace() === 'present') {
          throw new LocalFolderIdentityAdapterError('WEX identity space is already registered');
        }
        await requireAllocationsDirectory(spacePath, true);
        if (await readRegistrationRecord() !== undefined) {
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
      await withLock(async () => {
        const spacePath = await requireSpaceDirectory(false);
        if (spacePath === undefined) throw new LocalFolderIdentityAdapterError('WEX identity space has no registration');
        await requireAllocationsDirectory(spacePath);
        await requireMatchingRegistration(parsed.wexPlatformRegistrationId);
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
      await withLock(async () => {
        const spacePath = await requireSpaceDirectory(false);
        if (spacePath === undefined) throw new LocalFolderIdentityAdapterError('WEX identity space has no registration');
        await requireAllocationsDirectory(spacePath);
        await requireMatchingRegistration(next.wexPlatformRegistrationId);
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
      const spacePath = await requireSpaceDirectory(false);
      if (spacePath === undefined) throw new LocalFolderIdentityAdapterError('WEX identity space has no registration');
      await requireAllocationsDirectory(spacePath);
      await requireMatchingRegistration(parsed.wexPlatformRegistrationId);
      return readAllocation(parsed);
    },
  };
}
