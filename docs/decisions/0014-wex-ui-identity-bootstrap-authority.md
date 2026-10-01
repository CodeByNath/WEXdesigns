# 0014: WEX UI Identity Bootstrap Authority

## Status

Accepted — architecture authority. This decision authorises no allocation,
issuer implementation, storage implementation, registry, Header source, or UI
composition.

## Context

ADR 0013 reserves the whole WEX UI allocation namespace for the WEX UI Identity
Authority / Station. It requires an allocation to be reserved before assignment,
to be immutable and never reused, and to retain durable evidence when it must
survive external reference or configuration round trips. The first demonstrated
allocations are the Admin Manager root and its direct Admin Header child, but
there is no Authority / Station issuer yet.

The Platform Identity architecture forbids applications, Shared UI,
`@weerax/schemas`, `@weerax/wex`, and adapters from owning a generator,
registry, or persistent allocation state. Atomic Composition requires a direct
child to record an explicit parent allocation ID and a parent-owned slot.

## Decision

### Station-owned durable allocation ledger

The WEX UI Identity Authority / Station owns one durable allocation ledger as
the authoritative evidence for every non-ephemeral allocation. The ledger is
the source of truth for reservation, assignment, collision prevention,
non-reuse, placement, resolution, and, where applicable, retirement. It is not
an application configuration file, a WEX repository document, a schema value,
a Shared UI state store, an adapter record, or a platform-domain record.

The future Station implementation must use durable Authority-controlled storage
and an atomic uniqueness boundary on `allocationId`. The concrete storage
technology, service API, deployment, and operational access model are deferred
to that separately authorised implementation; they must preserve this ledger
ownership and durable evidence boundary.

Each ledger entry has immutable allocation evidence at minimum:

```text
allocationId
family
placement: root | { parentAllocationId, slot }
state: reserved | assigned | retired
reservedAt
assignedAt (when assigned)
retiredAt and retirement evidence (when retired and required)
```

`allocationId`, `family`, and `placement` cannot be changed after reservation.
The ledger may record only data needed to operate allocation lifecycle; it must
not absorb platform ownership, executable bindings, callbacks, permissions, or
presentation state.

### Reservation-before-assignment

The Station alone chooses a candidate from ADR 0013's closed family table and
five-character uppercase unambiguous Base32 suffix rule. It first performs one
atomic durable ledger write that rejects an existing `allocationId` and records
the allocation as `reserved`. Only after that write succeeds may the Station
return it for assignment. A failed, abandoned, or retired reservation remains
evidence that the identifier is unavailable for reuse.

Assignment changes only the lifecycle state from `reserved` to `assigned`.
It cannot create a second allocation record, replace placement, or make an ID
available again. A later retirement retains the ledger record and any required
tombstone evidence under ADR 0013.

### First-allocation bootstrap shape

The next authorised implementation may request exactly these two concrete
allocation shapes through the Station:

| Allocation | Family | Placement |
| --- | --- | --- |
| Admin Manager root | `WEXAM` | root |
| Admin Header direct child | `WEXAMH` | `parentAllocationId` is the assigned Admin Manager root; parent-owned `slot` is `header` |

The family label does not imply hierarchy. The Admin Header relationship exists
only because its durable entry records the exact parent allocation ID and the
Admin Manager-owned `header` slot. The root must be assigned before its child
is reserved. No concrete value is minted or reserved by this decision.

## Consequences and boundary

A later Identity Authority implementation must demonstrate durable atomic
reservation, collision rejection, permanent non-reuse, root-before-child
ordering, and exact parent/slot persistence before it may allocate these two
records. It may add only the minimum Authority / Station mechanism approved in
that later phase.

This decision does not authorise Header presentation, child-component
composition, bindings, reverse lookup, adapters, migrations, schemas, or any
application-local identity minting. Header shell work remains gated on the
separate Phase 9 allocation proof.
