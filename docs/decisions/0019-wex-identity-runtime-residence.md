# 0019: WEX Identity Runtime Residence

## Status

Accepted — establishes the permanent package boundary for the portable WEX
Identity Plugin + Tool. It authorises no runtime, schema, adapter, allocation,
UI, migration, or host-integration implementation.

## Context

Accepted ADRs 0016–0018 assign portable registration, identity semantics, and
bootstrap behaviour to the WEX Identity Plugin + Tool. The historical
`@weerax/identity-station` is only an optional PostgreSQL storage-adapter proof
and cannot become that portable core. Before bootstrap implementation begins,
the repository needs one durable runtime residence that preserves the portable
storage boundary and the acyclic dependency graph.

## Decision

### Residence and ownership

`packages/identity` is the permanent residence of the portable WEX Identity
Plugin + Tool. Its package name is `@weerax/identity`.

When separately implemented, it owns portable WEX identity semantics and
runtime operations: platform registration, allocation-family validation, ID
generation and issuance, allocation lifecycle orchestration, explicit
parent/slot placement, lookup/targeting, and approval/initialization semantics.
It does not own host business identity, host persistence, permissions, domain
records, approval presentation, or host integration wiring.

### Dependency and adapter boundary

`@weerax/identity` may depend internally only on `@weerax/schemas`. It consumes
an approved framework-neutral storage-adapter operation boundary supplied by
the integrating host; it does not import, select, or require a concrete storage
adapter. This preserves the local-folder adapter as a persistence/atomicity
implementation and permits later approved adapters without changing portable
identity semantics.

`@weerax/identity` must not depend on `@weerax/wex`, `@weerax/ui`, web runtime
or other application code, `@weerax/identity-station`, React, browser UI, host
business systems, or any domain owner. `@weerax/identity-station` remains a
historical PostgreSQL proof and a future optional storage adapter; it is not
the portable identity core, a mandatory backend, or a dependency of this
package.

### Existing authority

This residence implements no new identity semantics. ADR 0016 continues to
own portable identity-space and allocation authority; ADR 0017 continues to
own the serializable storage contract and adapter guarantees; ADR 0018
continues to own platform-registration bootstrap semantics and format.

## Consequences and next boundary

The package directory and its bootstrap runtime may be created only in the
separately authorised Phase 4B implementation work. That implementation must
use the approved framework-neutral adapter boundary and prove ADR 0018's
approval, readback, idempotence, and fail-closed guarantees. It does not
authorise allocation issuance, PostgreSQL conversion, a host-specific adapter,
approval UI, Header/UI work, or domain integration.
