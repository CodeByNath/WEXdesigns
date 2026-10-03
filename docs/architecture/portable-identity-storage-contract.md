# Portable WEX Identity Storage Contract

## Scope

This architecture contract routes the accepted portable ownership model in
[ADR 0016](../decisions/0016-portable-wex-identity-spaces.md) and the accepted
boundary decision in [ADR 0017](../decisions/0017-portable-identity-storage-contract.md).
It defines portable data and operation guarantees, not an adapter, storage
format, transport, approval UI, allocation generator, or domain integration.

## Residence and ownership

```text
WEX Identity Plugin + Tool
  -> owns identity semantics and requests operations
  -> Storage Adapter
       -> persists/reads records and supplies backend atomicity
  -> host-local WEX identity space
```

| Location | Owns | Must not own |
| --- | --- | --- |
| `@weerax/schemas` | Strict serializable record validation and types | ID issuance, storage, lookup execution, callbacks, host data |
| WEX Identity Plugin + Tool | Registration semantics, family validation, issuance, lifecycle, placement, lookup/targeting, approval/init | A mandatory backend or host-domain authority |
| Host Storage Adapter | Isolated-space persistence/read and atomicity/durability mechanics | IDs, families, lifecycle meaning, domain resolution |
| Host platform | Business records, permissions, approval UX, integration wiring | WEX allocation meaning or durable WEX lifecycle ownership |

No adapter package or Plugin + Tool runtime exists in this phase. The schemas
are importable data contracts only.

## Serializable records

| Record | Required data | Boundary |
| --- | --- | --- |
| WEX platform registration | `wexPlatformRegistrationId`, opaque `platformKey`, `registeredAt` | One WEX-owned, durable registration in one host-local space; no business payload |
| Initialization observation | `absent`, `approval-required`, or `ready` | `approval-required` is a Plugin + Tool state before first creation, not a UI |
| Allocation lifecycle record | Space ID, allocation ID, family, placement, lifecycle state, reserve timestamp; assignment/retirement evidence when applicable | Durable WEX evidence only |
| Lookup key | `wexPlatformRegistrationId`, `allocationId` | Addresses exactly one allocation in one host space |

`wexPlatformRegistrationId + allocationId` is the only portable allocation
address. An allocation ID alone is not globally unique. The Plugin + Tool
creates and validates the registration ID after explicit approval; its concrete
format is deliberately unresolved because no existing authority defines a
platform-ID prefix or family. A root placement is empty; a child placement
contains the exact `parentAllocationId` and parent-owned `slot`. Parentage is
never inferred from a prefix.

The lifecycle vocabulary is closed: `reserved`, `assigned`, `retired`. A
reserved record has `reservedAt`; assignment has `assignedAt`; retirement has
`retiredAt` and non-empty `retirementEvidence`. Retirement may preserve an
assignment timestamp when assignment happened before retirement. Each record
is strict and serializable; it excludes callbacks, permissions, payloads,
bindings, and host-domain data.

## Required adapter operations

The future Plugin + Tool invokes these operations through a host adapter
instance already scoped to one host. These are semantic requirements, not a
TypeScript runtime interface in this phase.

| Operation | Plugin + Tool responsibility | Adapter guarantee |
| --- | --- | --- |
| Detect | Ask whether the host WEX space exists | Report absent/present without creating state |
| Create/open | After approval, create/validate the WEX registration ID; on reopen, validate read-back identity | Persist/read only the supplied durable registration in the isolated WEX space; never generate or replace it |
| Registration read/write | Decide registration validity | Persist/read the strict registration record |
| Reserve | Generate/validate the ID and construct a `reserved` record | Atomically insert only if its `(wexPlatformRegistrationId, allocationId)` is unused |
| Transition | Validate legal reserve/assign/retire transition and immutable fields | Atomically compare the expected current state and persist the supplied next record |
| Lookup | Request an allocation address | Read the record for the exact space/address or report no record |

No operation accepts a caller-supplied allocation ID as an authority decision:
the Plugin + Tool generates and validates it before the adapter sees a record.
An adapter cannot change an immutable ID, family, or placement. There is no
delete or reuse operation.

## Concurrency, collision, and non-reuse

An adapter may use a file lock, atomic rename/compare-and-swap, unique database
constraint with transaction, conditional API write, or an equivalent backend
mechanism. Its observable guarantee must be identical:

1. only one reservation for an address can succeed;
2. conflicting reservations are rejected without overwriting durable evidence;
3. transitions only succeed from the expected state;
4. a committed reservation, assignment, or retirement remains unavailable for
   reuse; and
5. concurrent callers can neither replace immutable evidence nor make an
   occupied address appear available.

The local folder reference adapter must prove those guarantees first. A later
PostgreSQL adapter may use its transaction and unique boundary as one valid
implementation, not as a different identity model.

## Initialization and binding boundary

When detection reports absent, the Plugin + Tool enters `approval-required`.
After explicit user or administrator approval it creates the WEX registration
identity, asks the adapter to create the space and persist the supplied
registration, then reports `ready`. On reopening, the adapter reads back the
same durable registration; it cannot generate, replace, or reuse that WEX
identity. Approval mechanism and presentation remain host integration concerns.

The existing `WexUiPlatformBinding` remains a separate opaque mapping between a
WEX allocation slot and a platform reference. This storage contract does not
persist, resolve, or enrich bindings, and it never carries a host business
record, permission, callback, resolver, or executable payload.

## Safe change route

Change ID forms, family policy, parent/slot semantics, or binding meaning
through ADR 0013 as corrected by ADR 0016. Change this portable operation or
record boundary through ADR 0017 and this document before adapting a backend.
Implement the local-folder adapter only in Phase 3. Do not use the historical
PostgreSQL Station as the portable core or alter it before Phase 5.
