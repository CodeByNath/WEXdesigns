# 0015: WEX UI Identity Station Placement

## Status

Accepted — architecture authority. It authorises no service,
database, API endpoint, allocation, Header source, schema change, or UI
composition.

## Context

ADR 0013 assigns allocation-family validation, issuance, reservation,
permanent non-reuse, lifecycle, and lookup to one WEX UI Identity Authority /
Station. ADR 0014 requires that Station to retain a durable allocation ledger
and make reservation an atomic uniqueness operation. The current repository
has no Identity Station, storage layer, or durable persistence implementation.
`apps/web-runtime` is a browser presentation application (and uses local
storage only for its local theme), while `apps/studio-agent-runner` is a Node
contract-validation shell. Neither can own the shared allocation namespace.

The Station cannot be placed in `@weerax/schemas`, `@weerax/wex`,
`@weerax/ui`, or `@weerax/adapters`: that would violate ADR 0013 and the
repository dependency rules. Nor can a consuming application mint IDs or own
the ledger, because a namespace-local store cannot prove global non-reuse.

## Decision

### Runtime placement

The WEX UI Identity Authority / Station will be a new standalone Node service
application at `apps/identity-station`. It is a WEX platform runtime, not a
reusable package, browser application, domain service, adapter, or presentation
layer. A future implementation may consume `@weerax/schemas` for input/output
validation, but the package must remain free of issuance, persistence, lookup,
and runtime code.

The service is the sole process permitted to write allocation lifecycle data.
Consuming applications request the Station's operations and receive identities;
they do not receive a database credential or a write-capable ledger interface.
The precise transport and caller authentication mechanism are implementation
concerns, but must expose only the operation boundary below.

### Durable ledger placement

The ledger will live in a PostgreSQL database owned by the Station, in a
dedicated `wex_identity` schema. Its first durable relation is
`wex_identity.allocation_ledger`; it is not an application configuration file,
browser storage, a repository document, a schema value, or a platform-domain
table. The Station's database role is the only role allowed to mutate it.

`allocationId` is the ledger relation's primary key/unique boundary. The
Station performs every reservation and lifecycle transition in a database
transaction. It records the immutable ADR 0014 evidence (`allocationId`,
`family`, `placement`, and `reservedAt`) together with lifecycle state and the
applicable assignment or retirement timestamps. Its mutation path rejects an
attempt to change the allocation ID, family, or placement after reservation.

Only a successfully committed reservation makes an ID permanently unavailable.
A candidate collision or failed transaction leaves no reservation evidence and
does not consume that candidate; an inserted `reserved`, `assigned`, or
`retired` row is never reused or deleted.

### Minimum Station operation boundary

The first implementation exposes only these Authority-owned operations:

| Operation | Input | Result and invariant |
| --- | --- | --- |
| `reserve` | approved family and explicit root or parent/slot placement; never a caller-supplied allocation ID | The Station chooses a valid candidate and atomically inserts one `reserved` ledger row. A direct child is accepted only when its exact parent is already assigned and its parent-owned slot is valid for the authorised bootstrap shape. |
| `assign` | a Station-reserved allocation ID | Transitions that same row from `reserved` to `assigned`; it cannot create a row, replace placement, or release the ID. |
| `lookup` | allocation ID | Returns the durable allocation evidence and lifecycle state for resolution. |

For the first two allocations, `reserve` must reject the Admin Header request
until the Admin Manager root has been assigned. It then persists the Header
entry's exact `parentAllocationId` and `header` slot. Platform bindings,
reverse lookup by platform record, retirement operations, bulk allocation,
and caller-provided IDs are outside this first operation boundary.

## Consequences and boundary

This is a new permanent service and durable-storage architecture. A later,
separately authorised implementation phase must add the service manifest,
PostgreSQL migration, service-private ledger access, bounded transport,
transaction/collision/non-reuse tests, and the ADR 0014 root-before-child proof
before it may reserve or assign either allocation. Deployment topology,
database hosting, credential provisioning, and caller authentication must be
decided with that operational implementation; none may relocate ledger
ownership to a consumer or domain platform.

This proposal does not implement PostgreSQL, add dependencies, create
`apps/identity-station`, mint IDs, allocate the Admin Manager or Admin Header,
change Header source, add schemas, or compose UI.
