import {
  WexIdentityAllocationLookupSchema,
  WexIdentityAllocationRecordSchema,
  WexIdentityAllocationLifecycleStateSchema,
  WexIdentitySpaceRegistrationSchema,
  type WexIdentityAllocationLifecycleState,
  type WexIdentityAllocationLookup,
  type WexIdentityAllocationRecord,
  type WexIdentitySpaceRegistration,
} from '@weerax/schemas';

import type { Transaction, TransactionDatabase } from './database.js';

export class PostgresIdentityAdapterError extends Error {
  override name = 'PostgresIdentityAdapterError';
}

export type PostgresIdentityTransition = {
  expectedState: WexIdentityAllocationLifecycleState;
  record: WexIdentityAllocationRecord;
};

/**
 * A host-scoped optional PostgreSQL implementation of the portable storage
 * boundary. It persists supplied records and enforces atomicity only.
 */
export type PostgresIdentityAdapter = {
  detectSpace(): Promise<'absent' | 'present'>;
  createSpace(registration: WexIdentitySpaceRegistration): Promise<void>;
  readRegistration(): Promise<WexIdentitySpaceRegistration | undefined>;
  reserve(record: WexIdentityAllocationRecord): Promise<void>;
  transition(transition: PostgresIdentityTransition): Promise<void>;
  lookup(key: WexIdentityAllocationLookup): Promise<WexIdentityAllocationRecord | undefined>;
};

type RegistrationRow = {
  readonly wex_platform_registration_id: string;
  readonly platform_key: string;
  readonly registered_at: string | Date;
};

type AllocationRow = RegistrationRow & {
  readonly allocation_id: string;
  readonly family: string;
  readonly placement_kind: string;
  readonly parent_allocation_id: string | null;
  readonly slot: string | null;
  readonly lifecycle_state: string;
  readonly reserved_at: string | Date;
  readonly assigned_at: string | Date | null;
  readonly retired_at: string | Date | null;
  readonly retirement_evidence: string | null;
};

function adapterError(message: string, cause?: unknown): PostgresIdentityAdapterError {
  return new PostgresIdentityAdapterError(message, cause === undefined ? undefined : { cause });
}

function iso(value: string | Date | null): string | undefined {
  return value === null ? undefined : new Date(value).toISOString();
}

function registrationFrom(row: RegistrationRow): WexIdentitySpaceRegistration {
  try {
    return WexIdentitySpaceRegistrationSchema.parse({
      wexPlatformRegistrationId: row.wex_platform_registration_id,
      platformKey: row.platform_key,
      registeredAt: iso(row.registered_at),
    });
  } catch (error) {
    throw adapterError('PostgreSQL identity-space registration is damaged', error);
  }
}

function recordFrom(row: AllocationRow): WexIdentityAllocationRecord {
  const placement = row.placement_kind === 'root'
    ? {}
    : { parentAllocationId: row.parent_allocation_id, slot: row.slot };
  const base = {
    wexPlatformRegistrationId: row.wex_platform_registration_id,
    allocationId: row.allocation_id,
    family: row.family,
    placement,
    reservedAt: iso(row.reserved_at),
  };

  try {
    if (row.lifecycle_state === 'reserved') {
      return WexIdentityAllocationRecordSchema.parse({ ...base, lifecycleState: 'reserved' });
    }
    if (row.lifecycle_state === 'assigned') {
      return WexIdentityAllocationRecordSchema.parse({
        ...base,
        lifecycleState: 'assigned',
        assignedAt: iso(row.assigned_at),
      });
    }
    if (row.lifecycle_state === 'retired') {
      return WexIdentityAllocationRecordSchema.parse({
        ...base,
        lifecycleState: 'retired',
        ...(iso(row.assigned_at) === undefined ? {} : { assignedAt: iso(row.assigned_at) }),
        retiredAt: iso(row.retired_at),
        retirementEvidence: row.retirement_evidence,
      });
    }
  } catch (error) {
    throw adapterError('PostgreSQL allocation record is damaged', error);
  }
  throw adapterError('PostgreSQL allocation lifecycle state is invalid');
}

function sameImmutableEvidence(current: WexIdentityAllocationRecord, next: WexIdentityAllocationRecord): boolean {
  return current.wexPlatformRegistrationId === next.wexPlatformRegistrationId
    && current.allocationId === next.allocationId
    && current.family === next.family
    && current.reservedAt === next.reservedAt
    && JSON.stringify(current.placement) === JSON.stringify(next.placement);
}

function preservesLifecycleEvidence(current: WexIdentityAllocationRecord, next: WexIdentityAllocationRecord): boolean {
  if (current.lifecycleState === 'reserved') return true;
  if (current.lifecycleState === 'assigned') {
    return next.lifecycleState !== 'reserved' && current.assignedAt === next.assignedAt;
  }
  return next.lifecycleState === 'retired'
    && current.assignedAt === next.assignedAt
    && current.retiredAt === next.retiredAt
    && current.retirementEvidence === next.retirementEvidence;
}

async function registrationRow(transaction: Transaction): Promise<RegistrationRow | undefined> {
  const result = await transaction.query<RegistrationRow>(
    `SELECT wex_platform_registration_id, platform_key, registered_at
       FROM wex_identity.identity_space_registration
      WHERE singleton = TRUE`,
  );
  return result.rows[0];
}

async function requireMatchingRegistration(
  transaction: Transaction,
  registrationId: string,
): Promise<void> {
  const row = await registrationRow(transaction);
  if (row === undefined) throw adapterError('PostgreSQL WEX identity space has no registration');
  const registration = registrationFrom(row);
  if (registration.wexPlatformRegistrationId !== registrationId) {
    throw adapterError('WEX platform registration identity does not match this PostgreSQL space');
  }
}

function allocationValues(record: WexIdentityAllocationRecord): readonly unknown[] {
  const root = Object.keys(record.placement).length === 0;
  return [
    record.wexPlatformRegistrationId,
    record.allocationId,
    record.family,
    root ? 'root' : 'child',
    root ? null : record.placement.parentAllocationId,
    root ? null : record.placement.slot,
    record.lifecycleState,
    record.reservedAt,
    record.lifecycleState === 'reserved' ? null : record.assignedAt,
    record.lifecycleState === 'retired' ? record.retiredAt : null,
    record.lifecycleState === 'retired' ? record.retirementEvidence : null,
  ];
}

async function allocationRow(
  transaction: Transaction,
  key: WexIdentityAllocationLookup,
): Promise<AllocationRow | undefined> {
  const result = await transaction.query<AllocationRow>(
    `SELECT wex_platform_registration_id, allocation_id, family, placement_kind,
            parent_allocation_id, slot, lifecycle_state, reserved_at, assigned_at,
            retired_at, retirement_evidence
       FROM wex_identity.identity_allocation_record
      WHERE wex_platform_registration_id = $1 AND allocation_id = $2`,
    [key.wexPlatformRegistrationId, key.allocationId],
  );
  return result.rows[0];
}

export function createPostgresIdentityAdapter(database: TransactionDatabase): PostgresIdentityAdapter {
  return {
    async detectSpace() {
      return database.withTransaction(async (transaction) => {
        const registration = await registrationRow(transaction);
        if (registration !== undefined) {
          registrationFrom(registration);
          return 'present';
        }
        const allocations = await transaction.query('SELECT 1 FROM wex_identity.identity_allocation_record LIMIT 1');
        if (allocations.rows[0] !== undefined) {
          throw adapterError('PostgreSQL WEX identity space has allocation remnants without a registration');
        }
        return 'absent';
      });
    },

    async createSpace(registration) {
      const parsed = WexIdentitySpaceRegistrationSchema.parse(registration);
      await database.withTransaction(async (transaction) => {
        const inserted = await transaction.query<RegistrationRow>(
          `INSERT INTO wex_identity.identity_space_registration (
             singleton, wex_platform_registration_id, platform_key, registered_at
           ) VALUES (TRUE, $1, $2, $3)
           ON CONFLICT (singleton) DO NOTHING
           RETURNING wex_platform_registration_id, platform_key, registered_at`,
          [parsed.wexPlatformRegistrationId, parsed.platformKey, parsed.registeredAt],
        );
        if (inserted.rows[0] === undefined) {
          throw adapterError('PostgreSQL WEX identity space is already registered');
        }
      });
    },

    async readRegistration() {
      return database.withTransaction(async (transaction) => {
        const row = await registrationRow(transaction);
        if (row === undefined) return undefined;
        return registrationFrom(row);
      });
    },

    async reserve(record) {
      const parsed = WexIdentityAllocationRecordSchema.parse(record);
      if (parsed.lifecycleState !== 'reserved') {
        throw adapterError('Only a supplied reserved allocation can be persisted');
      }
      await database.withTransaction(async (transaction) => {
        await requireMatchingRegistration(transaction, parsed.wexPlatformRegistrationId);
        const inserted = await transaction.query(
          `INSERT INTO wex_identity.identity_allocation_record (
             wex_platform_registration_id, allocation_id, family, placement_kind,
             parent_allocation_id, slot, lifecycle_state, reserved_at, assigned_at,
             retired_at, retirement_evidence
           ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
           ON CONFLICT (wex_platform_registration_id, allocation_id) DO NOTHING
           RETURNING allocation_id`,
          allocationValues(parsed),
        );
        if (inserted.rows[0] === undefined) {
          throw adapterError('WEX allocation address is already occupied');
        }
      });
    },

    async transition(transition) {
      const expectedState = WexIdentityAllocationLifecycleStateSchema.parse(transition.expectedState);
      const next = WexIdentityAllocationRecordSchema.parse(transition.record);
      await database.withTransaction(async (transaction) => {
        await requireMatchingRegistration(transaction, next.wexPlatformRegistrationId);
        const key = {
          wexPlatformRegistrationId: next.wexPlatformRegistrationId,
          allocationId: next.allocationId,
        };
        const row = await allocationRow(transaction, key);
        if (row === undefined) throw adapterError('Cannot transition a missing WEX allocation');
        const current = recordFrom(row);
        if (current.lifecycleState !== expectedState) {
          throw adapterError('WEX allocation lifecycle state changed concurrently');
        }
        if (!sameImmutableEvidence(current, next)) {
          throw adapterError('WEX allocation immutable evidence cannot change');
        }
        if (!preservesLifecycleEvidence(current, next)) {
          throw adapterError('WEX allocation lifecycle evidence cannot be rolled back or removed');
        }
        const updated = await transaction.query(
          `UPDATE wex_identity.identity_allocation_record
              SET lifecycle_state = $1, assigned_at = $2, retired_at = $3,
                  retirement_evidence = $4
            WHERE wex_platform_registration_id = $5 AND allocation_id = $6
              AND lifecycle_state = $7
          RETURNING allocation_id`,
          [
            next.lifecycleState,
            next.lifecycleState === 'reserved' ? null : next.assignedAt,
            next.lifecycleState === 'retired' ? next.retiredAt : null,
            next.lifecycleState === 'retired' ? next.retirementEvidence : null,
            key.wexPlatformRegistrationId,
            key.allocationId,
            expectedState,
          ],
        );
        if (updated.rows[0] === undefined) {
          throw adapterError('WEX allocation lifecycle state changed concurrently');
        }
      });
    },

    async lookup(key) {
      const parsed = WexIdentityAllocationLookupSchema.parse(key);
      return database.withTransaction(async (transaction) => {
        await requireMatchingRegistration(transaction, parsed.wexPlatformRegistrationId);
        const row = await allocationRow(transaction, parsed);
        return row === undefined ? undefined : recordFrom(row);
      });
    },
  };
}
