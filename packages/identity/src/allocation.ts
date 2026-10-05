import { randomBytes as nodeRandomBytes } from 'node:crypto';

import {
  WexIdentityAllocationLookupSchema,
  WexIdentityAllocationRecordSchema,
  WexPlatformRegistrationIdSchema,
  WexUiAllocationFamilySchema,
  WexUiAllocationIdSchema,
  WexUiAllocationPlacementSchema,
  WEX_UI_ALLOCATION_SUFFIX_ALPHABET,
  type WexIdentityAllocationLookup,
  type WexIdentityAllocationRecord,
  type WexPlatformRegistrationId,
  type WexUiAllocationFamily,
  type WexUiAllocationId,
  type WexUiAllocationPlacement,
} from '@weerax/schemas';

import type { WexIdentityStorageAdapter } from './bootstrap.js';

const ALLOCATION_SUFFIX_LENGTH = 5;
const DEFAULT_RESERVATION_ATTEMPTS = 8;

export class WexIdentityAllocationError extends Error {
  override name = 'WexIdentityAllocationError';
}

export type WexIdentityAllocationAddress = WexIdentityAllocationLookup;

export type ReserveWexIdentityAllocationOptions = {
  adapter: WexIdentityStorageAdapter;
  wexPlatformRegistrationId: WexPlatformRegistrationId;
  family: WexUiAllocationFamily;
  placement: WexUiAllocationPlacement;
  now?: () => Date;
  maxReservationAttempts?: number;
};

type ReserveWexIdentityAllocationTestOptions = ReserveWexIdentityAllocationOptions & {
  randomBytes: (size: number) => Uint8Array;
};

export type AssignWexIdentityAllocationOptions = {
  adapter: WexIdentityStorageAdapter;
  address: WexIdentityAllocationAddress;
  now?: () => Date;
};

export type RetireWexIdentityAllocationOptions = AssignWexIdentityAllocationOptions & {
  retirementEvidence: string;
};

function allocationError(message: string, cause?: unknown): WexIdentityAllocationError {
  return new WexIdentityAllocationError(message, cause === undefined ? undefined : { cause });
}

function timestamp(now?: () => Date): string {
  return (now ?? (() => new Date()))().toISOString();
}

function parseAddress(value: unknown): WexIdentityAllocationAddress {
  try {
    return WexIdentityAllocationLookupSchema.parse(value);
  } catch (error) {
    throw allocationError('WEX allocation address is invalid', error);
  }
}

function parseRecord(value: unknown): WexIdentityAllocationRecord {
  try {
    return WexIdentityAllocationRecordSchema.parse(value);
  } catch (error) {
    throw allocationError('WEX allocation evidence is invalid or damaged', error);
  }
}

function isRoot(placement: WexUiAllocationPlacement): boolean {
  return !('parentAllocationId' in placement);
}

function generateWexUiAllocationIdWith(
  family: WexUiAllocationFamily,
  randomBytes: (size: number) => Uint8Array,
): WexUiAllocationId {
  const random = randomBytes(ALLOCATION_SUFFIX_LENGTH);
  if (!(random instanceof Uint8Array) || random.length !== ALLOCATION_SUFFIX_LENGTH) {
    throw allocationError('Secure random source did not return 5 bytes');
  }
  const suffix = Array.from(random, (value) => WEX_UI_ALLOCATION_SUFFIX_ALPHABET[value & 0b11111]).join('');
  return WexUiAllocationIdSchema.parse(`${family}${suffix}`);
}

async function lookupRequired(
  adapter: WexIdentityStorageAdapter,
  address: WexIdentityAllocationAddress,
): Promise<WexIdentityAllocationRecord | undefined> {
  let record: WexIdentityAllocationRecord | undefined;
  try {
    record = await adapter.lookup(address);
  } catch (error) {
    throw allocationError('Unable to look up WEX allocation evidence', error);
  }
  if (record === undefined) return undefined;
  const parsed = parseRecord(record);
  if (parsed.wexPlatformRegistrationId !== address.wexPlatformRegistrationId
    || parsed.allocationId !== address.allocationId) {
    throw allocationError('WEX allocation lookup returned a different address');
  }
  return parsed;
}

async function validatePlacement(
  adapter: WexIdentityStorageAdapter,
  registrationId: WexPlatformRegistrationId,
  family: WexUiAllocationFamily,
  placement: WexUiAllocationPlacement,
): Promise<void> {
  if (family === 'WEXAM') {
    if (!isRoot(placement)) throw allocationError('WEXAM allocation must use root placement');
    return;
  }
  if (isRoot(placement) || placement.slot !== 'header') {
    throw allocationError('WEXAMH allocation must use its parent-owned header slot');
  }
  const parent = await lookupRequired(adapter, {
    wexPlatformRegistrationId: registrationId,
    allocationId: placement.parentAllocationId,
  });
  if (parent === undefined || parent.family !== 'WEXAM' || !isRoot(parent.placement)
    || parent.lifecycleState !== 'assigned') {
    throw allocationError('WEXAM root must be assigned before WEXAMH reservation');
  }
}

async function reserveWexIdentityAllocationWith(
  options: ReserveWexIdentityAllocationOptions,
  randomBytes: (size: number) => Uint8Array,
): Promise<WexIdentityAllocationRecord> {
  let registrationId: WexPlatformRegistrationId;
  let family: WexUiAllocationFamily;
  let placement: WexUiAllocationPlacement;
  try {
    registrationId = WexPlatformRegistrationIdSchema.parse(options.wexPlatformRegistrationId);
    family = WexUiAllocationFamilySchema.parse(options.family);
    placement = WexUiAllocationPlacementSchema.parse(options.placement);
  } catch (error) {
    throw allocationError('WEX allocation request is invalid', error);
  }
  await validatePlacement(options.adapter, registrationId, family, placement);
  const attempts = options.maxReservationAttempts ?? DEFAULT_RESERVATION_ATTEMPTS;
  if (!Number.isInteger(attempts) || attempts < 1 || attempts > 32) {
    throw allocationError('WEX allocation reservation attempts must be between 1 and 32');
  }

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const record = parseRecord({
      wexPlatformRegistrationId: registrationId,
      allocationId: generateWexUiAllocationIdWith(family, randomBytes),
      family,
      placement,
      lifecycleState: 'reserved',
      reservedAt: timestamp(options.now),
    });
    try {
      await options.adapter.reserve(record);
      return record;
    } catch (error) {
      const existing = await lookupRequired(options.adapter, {
        wexPlatformRegistrationId: registrationId,
        allocationId: record.allocationId,
      });
      if (existing !== undefined) continue;
      throw allocationError('Unable to reserve WEX allocation evidence', error);
    }
  }
  throw allocationError('WEX allocation collision retry limit was reached');
}

export async function reserveWexIdentityAllocation(
  options: ReserveWexIdentityAllocationOptions,
): Promise<WexIdentityAllocationRecord> {
  return reserveWexIdentityAllocationWith(options, nodeRandomBytes);
}

export async function reserveWexIdentityAllocationForTest(
  options: ReserveWexIdentityAllocationTestOptions,
): Promise<WexIdentityAllocationRecord> {
  return reserveWexIdentityAllocationWith(options, options.randomBytes);
}

export async function lookupWexIdentityAllocation(
  adapter: WexIdentityStorageAdapter,
  address: WexIdentityAllocationAddress,
): Promise<WexIdentityAllocationRecord | undefined> {
  return lookupRequired(adapter, parseAddress(address));
}

export async function assignWexIdentityAllocation(
  options: AssignWexIdentityAllocationOptions,
): Promise<WexIdentityAllocationRecord> {
  const address = parseAddress(options.address);
  const current = await lookupRequired(options.adapter, address);
  if (current === undefined) throw allocationError('Cannot assign a missing WEX allocation');
  if (current.lifecycleState !== 'reserved') throw allocationError('Only a reserved WEX allocation can be assigned');
  const next = parseRecord({ ...current, lifecycleState: 'assigned', assignedAt: timestamp(options.now) });
  try {
    await options.adapter.transition({ expectedState: 'reserved', record: next });
  } catch (error) {
    throw allocationError('Unable to assign WEX allocation evidence', error);
  }
  return next;
}

export async function retireWexIdentityAllocation(
  options: RetireWexIdentityAllocationOptions,
): Promise<WexIdentityAllocationRecord> {
  const address = parseAddress(options.address);
  const current = await lookupRequired(options.adapter, address);
  if (current === undefined || current.lifecycleState === 'retired') {
    throw allocationError('Only an active WEX allocation can be retired');
  }
  if (options.retirementEvidence.length === 0) throw allocationError('WEX retirement evidence is required');
  const next = parseRecord({
    ...current,
    lifecycleState: 'retired',
    retiredAt: timestamp(options.now),
    retirementEvidence: options.retirementEvidence,
  });
  try {
    await options.adapter.transition({ expectedState: current.lifecycleState, record: next });
  } catch (error) {
    throw allocationError('Unable to retire WEX allocation evidence', error);
  }
  return next;
}
