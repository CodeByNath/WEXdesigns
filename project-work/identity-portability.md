# WEX Identity Portability

Status: BUILDER ACTION REQUIRED  
Phase: 4B architecture gate — promote Identity runtime residence authority

## Reviewer verdict

**Proceed**

Accepted candidate:
`docs/identity-runtime-residence` at
`ea2fbe9eed6b6e724fd831e6f40cb010899611e4`.

Independent review confirms:

- candidate is exactly one commit ahead of `main`;
- changes are architecture/documentation only;
- ADR 0019 records `packages/identity` / `@weerax/identity` as the permanent
  portable WEX Identity Plugin + Tool runtime residence;
- `@weerax/identity` owns portable identity semantics/runtime and depends
  internally only on `@weerax/schemas`;
- storage is consumed through an injected framework-neutral adapter boundary,
  so the identity runtime does not import a concrete adapter implementation;
- adapters remain persistence/atomicity-only;
- `@weerax/identity-station` remains historical PostgreSQL proof / future
  optional adapter and is not portable core;
- repository map, dependency rules, ADR index, and Identity Code Map agree;
- no runtime, schema, adapter, allocation, PostgreSQL, host-integration, Header,
  or UI implementation was introduced.

The architecture candidate matches the Owner-approved package boundary.

## Builder closeout — promotion only

1. Verify `origin` is `CodeByNath/WEXdesigns`.
2. Fast-forward `main` only to
   `ea2fbe9eed6b6e724fd831e6f40cb010899611e4`.
3. Run `pnpm audit:foundation`.
4. Verify remote `main` resolves exactly to that SHA.
5. Delete `docs/identity-runtime-residence` only after exact remote-main
   verification proves it safe.
6. Update this same work file to `AWAITING REVIEWER REVIEW` with promotion,
   check, branch-housekeeping, and exact remote-SHA evidence.
7. Stop. Do not begin runtime implementation yet.

## Next gate

After Reviewer verifies this promotion/housekeeping, reopen Phase 4B as one
bounded Work Package covering the full portable bootstrap implementation.
No intermediate micro-review gates inside that package unless a defined stop
gate is hit.

Header remains deferred until Phase 4 bootstrap is accepted and promoted.
