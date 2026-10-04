# WEX Identity Portability

Status: BLOCKED — DECISION REQUIRED  
Phase: 4B architecture gate — permanent Plugin + Tool residence

## Reviewer verdict

**Stop — architectural risk**

The Builder stop is correct. Accepted authority defines what the portable WEX
Identity Plugin + Tool owns, but not its permanent repository residence.

Verified constraints:

- it cannot live in `@weerax/wex`, Shared UI, schemas, or adapters because
  those layers already have narrower ownership;
- it cannot be implemented in `@weerax/identity-station`, because ADR 0016
  explicitly makes that PostgreSQL Station an optional adapter proof rather
  than the portable identity core;
- no accepted repository map entry currently owns the Plugin + Tool runtime;
- creating a new package/app without authority would invent a permanent package
  boundary.

## Architecture decision required

Resolve one thing only:

**Permanent repository residence for the WEX Identity Plugin + Tool runtime.**

Recommended direction for Owner/Reviewer approval:

`packages/identity` as `@weerax/identity`.

Reason:

- it is reusable WEX system capability, not application assembly;
- it owns portable identity semantics/runtime while remaining separate from
  presentation, schemas, adapters, Shared UI, and host-domain code;
- it may depend on `@weerax/schemas` and the framework-neutral adapter
  contract/implementation boundary, but no presentation or application layer;
- host applications/plugins consume it rather than owning its semantics;
- the historical PostgreSQL Identity Station can later become one optional
  storage adapter behind this runtime.

This is a new permanent package boundary, so it must be accepted through
repository architecture before implementation.

## Next Builder instruction after Owner approval

Create one architecture-only ADR/update package that:

1. establishes `packages/identity` / `@weerax/identity` as the permanent
   portable WEX Identity Plugin + Tool runtime residence;
2. defines its allowed dependencies and forbidden dependencies;
3. updates repository/dependency maps consistently;
4. preserves ADRs 0016–0018 unchanged except for any necessary cross-reference;
5. explicitly keeps adapters persistence-only and Identity Station optional;
6. makes no runtime/schema/adapter implementation changes.

After that architecture candidate is accepted, reopen the existing Phase 4B
Work Package and complete it as one Builder package without intermediate
micro-reviews.

## Hard exclusions

No Phase 4B implementation, allocation issuance, PostgreSQL conversion,
host-specific adapter, Header/UI, approval UI, or domain integration until this
residence decision is accepted.

Header remains deferred until Phase 4 bootstrap is accepted and promoted.
