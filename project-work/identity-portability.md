# WEX Identity Portability

Status: AWAITING REVIEWER REVIEW
Phase: 4B architecture gate — establish permanent Identity runtime residence

## Owner decision

Approved:

`packages/identity`  
package name: `@weerax/identity`

This is the permanent residence of the portable WEX Identity Plugin + Tool
runtime.

## Reviewer verdict

**Proceed**

The architecture gate is resolved by Owner approval. Builder must now record
that decision in repository authority before any Phase 4B runtime implementation
begins.

## Architecture-only Builder package

Create one documentation/architecture candidate that:

1. records `packages/identity` / `@weerax/identity` as the permanent WEX
   Identity Plugin + Tool runtime residence;
2. defines its ownership as portable WEX identity semantics and runtime:
   platform registration, family validation, ID generation/issuance,
   allocation lifecycle orchestration, parent/slot, lookup/targeting, and
   approval/init semantics;
3. keeps storage adapters persistence/atomicity-only;
4. keeps `@weerax/identity-station` as historical PostgreSQL proof / future
   optional storage adapter, not portable core;
5. defines allowed dependencies narrowly:
   `@weerax/schemas` and the approved framework-neutral adapter boundary only;
6. forbids dependencies on WEX presentation, Shared UI, web runtime,
   application/domain code, React/browser UI, and host business systems;
7. updates repository map and dependency rules consistently;
8. adds/updates the relevant ADR establishing this permanent package boundary;
9. keeps ADRs 0016–0018 semantics intact except for necessary cross-reference
   or residence clarification;
10. makes no runtime, schema, adapter, allocation, UI, Header, PostgreSQL, or
    host-integration implementation changes.

## Required evidence

- exact pushed topic branch/SHA;
- complete changed-file list;
- `pnpm audit:foundation`;
- `git diff --check`;
- confirmation the diff is architecture/documentation only;
- confirmation Phase 4B runtime implementation has not begun.

Return this same file to `AWAITING REVIEWER REVIEW` after the architecture
candidate is pushed and remote-verified.

## After acceptance

Once this package-boundary authority is accepted and promoted, reopen the
existing Phase 4B Work Package and complete bootstrap implementation as one
larger Builder package without intermediate micro-review gates.

## Hard exclusions

No Phase 4B runtime/schema/adapter implementation yet.
No allocation issuance implementation.
No PostgreSQL conversion.
No host-specific adapter.
No Header/UI or approval UI.
No domain integration.

Header remains deferred until Phase 4 bootstrap is accepted and promoted.

## Builder architecture handoff

Candidate: `docs/identity-runtime-residence` at
`ea2fbe9eed6b6e724fd831e6f40cb010899611e4` (remote verified).

- Changed only architecture/documentation: ADR 0019, the decision index,
  repository map, dependency rules, and Identity Code Map.
- ADR 0019 records `packages/identity` / `@weerax/identity` as the permanent
  portable Plugin + Tool residence. It depends internally only on schemas and
  consumes an injected framework-neutral adapter boundary; it forbids concrete
  adapter, Station, presentation, application, browser/UI, and host/domain
  dependencies.
- `pnpm audit:foundation` and `git diff --check` passed.
- No runtime package/source, schema, adapter, allocation, PostgreSQL,
  host-integration, Header, or UI work began.
