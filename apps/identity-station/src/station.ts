import { randomInt } from 'node:crypto';

import {
  WexUiAllocationFamilySchema,
  WexUiAllocationIdSchema,
  WexUiAllocationPlacementSchema,
  WEX_UI_ALLOCATION_SUFFIX_ALPHABET,
  type WexUiAllocationFamily,
  type WexUiAllocationId,
  type WexUiAllocationPlacement,
} from '@weerax/schemas';

import type { Transaction, TransactionDatabase } from './database.js';
import {
  AllocationNotFoundError,
  CandidateExhaustedError,
  InvalidAllocationStateError,
  InvalidBootstrapPlacementError,
  InvalidReserveRequestError,
} from './errors.js';

const MAX_RESERVATION_ATTEMPTS = 32;

export interface ReserveRequest {
  readonly family: WexUiAllocationFamily;
  readonly placement: WexUiAllocationPlacement;
}

export interface AllocationLedgerEntry {
  readonly allocationId: WexUiAllocationId;
  readonly family: WexUiAllocationFamily;
  readonly placement: WexUiAllocationPlacement;
  readonly state: 'reserved' | 'assigned' | 'retired';
  readonly reservedAt: string;
  readonly assignedAt?: string;
  readonly retiredAt?: string;
}

export interface IdentityStation {
  reserve(request: unknown): Promise<AllocationLedgerEntry>;
  assign(allocationId: string): Promise<AllocationLedgerEntry>;
  lookup(allocationId: string): Promise<AllocationLedgerEntry | undefined>;
}

export interface IdentityStationOptions {
  readonly nextSuffix?: () => string;
  readonly maxReservationAttempts?: number;
}

interface LedgerRow {
  readonly allocation_id: string;
  readonly family: string;
  readonly placement_kind: string;
  readonly parent_allocation_id: string | null;
  readonly slot: string | null;
  readonly state: string;
  readonly reserved_at: string | Date;
  readonly assigned_at: string | Date | null;
  readonly retired_at: string | Date | null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseReserveRequest(value: unknown): ReserveRequest {
  if (!isRecord(value) || Object.keys(value).length !== 2 || !('family' in value) || !('placement' in value)) {
    throw new InvalidReserveRequestError('reserve accepts only family and placement');
  }

  return {
    family: WexUiAllocationFamilySchema.parse(value.family),
    placement: WexUiAllocationPlacementSchema.parse(value.placement),
  };
}

function isRoot(placement: WexUiAllocationPlacement): boolean {
  return Object.keys(placement).length === 0;
}

function suffix(): string {
  return Array.from({ length: 5 }, () => WEX_UI_ALLOCATION_SUFFIX_ALPHABET[randomInt(WEX_UI_ALLOCATION_SUFFIX_ALPHABET.length)]).join('');
}

function timestamp(value: string | Date | null): string | undefined {
  if (value === null) return undefined;
  return new Date(value).toISOString();
}

function entry(row: LedgerRow): AllocationLedgerEntry {
  const placement = row.placement_kind === 'root'
    ? {}
    : {
      parentAllocationId: WexUiAllocationIdSchema.parse(row.parent_allocation_id),
      slot: row.slot ?? '',
    };

  return {
    allocationId: WexUiAllocationIdSchema.parse(row.allocation_id),
    family: WexUiAllocationFamilySchema.parse(row.family),
    placement: WexUiAllocationPlacementSchema.parse(placement),
    state: row.state === 'reserved' || row.state === 'assigned' || row.state === 'retired'
      ? row.state
      : (() => { throw new InvalidAllocationStateError('ledger state is invalid'); })(),
    reservedAt: timestamp(row.reserved_at) ?? '',
    ...(timestamp(row.assigned_at) === undefined ? {} : { assignedAt: timestamp(row.assigned_at) }),
    ...(timestamp(row.retired_at) === undefined ? {} : { retiredAt: timestamp(row.retired_at) }),
  };
}

async function requireBootstrapPlacement(
  transaction: Transaction,
  family: WexUiAllocationFamily,
  placement: WexUiAllocationPlacement,
): Promise<void> {
  if (family === 'WEXAM' && isRoot(placement)) return;

  if (
    family !== 'WEXAMH'
    || isRoot(placement)
    || placement.slot !== 'header'
  ) {
    throw new InvalidBootstrapPlacementError('only the Admin Manager root and Admin Header child are authorised');
  }

  const parent = await transaction.query<Pick<LedgerRow, 'family' | 'state'>>(
    `SELECT family, state
       FROM wex_identity.allocation_ledger
      WHERE allocation_id = $1`,
    [placement.parentAllocationId],
  );

  if (parent.rows[0]?.family !== 'WEXAM' || parent.rows[0]?.state !== 'assigned') {
    throw new InvalidBootstrapPlacementError('Admin Header requires an assigned Admin Manager parent');
  }
}

async function lookupRow(transaction: Transaction, allocationId: string): Promise<LedgerRow | undefined> {
  const rows = await transaction.query<LedgerRow>(
    `SELECT allocation_id, family, placement_kind, parent_allocation_id, slot, state,
            reserved_at, assigned_at, retired_at
       FROM wex_identity.allocation_ledger
      WHERE allocation_id = $1`,
    [WexUiAllocationIdSchema.parse(allocationId)],
  );

  return rows.rows[0];
}

export function createIdentityStation(
  database: TransactionDatabase,
  options: IdentityStationOptions = {},
): IdentityStation {
  const nextSuffix = options.nextSuffix ?? suffix;
  const maxReservationAttempts = options.maxReservationAttempts ?? MAX_RESERVATION_ATTEMPTS;

  return {
    async reserve(request: unknown): Promise<AllocationLedgerEntry> {
      const { family, placement } = parseReserveRequest(request);

      return database.withTransaction(async (transaction) => {
        await requireBootstrapPlacement(transaction, family, placement);

        for (let attempt = 0; attempt < maxReservationAttempts; attempt += 1) {
          const allocationId = WexUiAllocationIdSchema.parse(`${family}${nextSuffix()}`);
          const inserted = await transaction.query<LedgerRow>(
            `INSERT INTO wex_identity.allocation_ledger (
               allocation_id, family, placement_kind, parent_allocation_id, slot, state, reserved_at
             ) VALUES ($1, $2, $3, $4, $5, 'reserved', CURRENT_TIMESTAMP)
             ON CONFLICT (allocation_id) DO NOTHING
             RETURNING allocation_id, family, placement_kind, parent_allocation_id, slot, state,
                       reserved_at, assigned_at, retired_at`,
            [
              allocationId,
              family,
              isRoot(placement) ? 'root' : 'child',
              isRoot(placement) ? null : placement.parentAllocationId,
              isRoot(placement) ? null : placement.slot,
            ],
          );

          if (inserted.rows[0] !== undefined) return entry(inserted.rows[0]);
        }

        throw new CandidateExhaustedError('could not reserve a unique allocation ID');
      });
    },

    async assign(allocationId: string): Promise<AllocationLedgerEntry> {
      return database.withTransaction(async (transaction) => {
        const validAllocationId = WexUiAllocationIdSchema.parse(allocationId);
        const updated = await transaction.query<LedgerRow>(
          `UPDATE wex_identity.allocation_ledger
              SET state = 'assigned', assigned_at = CURRENT_TIMESTAMP
            WHERE allocation_id = $1 AND state = 'reserved'
          RETURNING allocation_id, family, placement_kind, parent_allocation_id, slot, state,
                    reserved_at, assigned_at, retired_at`,
          [validAllocationId],
        );

        if (updated.rows[0] !== undefined) return entry(updated.rows[0]);
        if (await lookupRow(transaction, validAllocationId) === undefined) {
          throw new AllocationNotFoundError('allocation is not reserved');
        }
        throw new InvalidAllocationStateError('only reserved allocations can be assigned');
      });
    },

    async lookup(allocationId: string): Promise<AllocationLedgerEntry | undefined> {
      return database.withTransaction(async (transaction) => {
        const found = await lookupRow(transaction, allocationId);
        return found === undefined ? undefined : entry(found);
      });
    },
  };
}
