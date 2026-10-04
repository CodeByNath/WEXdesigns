# WEX Identity Portability

Status: BUILDER ACTION REQUIRED  
Phase: 4B — Work Package closeout: promote portable identity bootstrap

## Reviewer verdict

**Proceed**

Accepted candidate:
`feat/identity-bootstrap` at
`a74be3d66a297a1d7db511f2d15aa73629997037`.

Reviewer independently verified the complete Phase 4B Work Package against
ADRs 0016–0019 and the portable storage/dependency authority.

Accepted evidence:

- `@weerax/identity` resides only in the approved permanent package boundary;
- production runtime depends internally only on `@weerax/schemas`;
- the concrete local-folder adapter is used only in tests;
- WEXPR validation/generation matches ADR 0018;
- production registration generation always uses Node CSPRNG;
- deterministic entropy seams are not exported from the package root API;
- no mutation or ID generation occurs before approval;
- present-space reopen requires matching `platformKey`;
- a mismatched/damaged existing space fails closed;
- exact create/readback and create-failure/readback semantics are preserved;
- one invocation generates at most one registration identity;
- the stale unresolved-format architecture wording is corrected;
- allocation issuance/lifecycle, PostgreSQL conversion, host integration,
  approval UI, Header/UI, bindings, permissions, and generic orchestration
  remain untouched.

The correction commit changes only bootstrap implementation/tests and the
portable storage architecture text. The full branch remains inside the
authorised Phase 4B scope.

Builder-reported checks passed:
`pnpm audit:foundation`,
`pnpm --filter @weerax/identity check`,
schema tests, adapter tests, `pnpm check`, and `git diff --check`.

## Builder closeout transaction

1. Verify `origin` is `CodeByNath/WEXdesigns`.
2. Fast-forward `main` only to
   `a74be3d66a297a1d7db511f2d15aa73629997037`.
3. Run `pnpm audit:foundation` and `pnpm check` after promotion.
4. Verify remote `main` resolves exactly to that SHA.
5. Delete `feat/identity-bootstrap` only after exact remote-main verification.
6. Update repository/Code Map status only if promotion requires a factual
   promoted-state correction; do not widen implementation.
7. Update this same work file to `AWAITING REVIEWER REVIEW` with exact
   promotion SHA, checks, and branch-housekeeping evidence.
8. Stop.

## Next gate

After Reviewer verifies promotion and housekeeping, Phase 4 is complete.

The next Work Package is Phase 5 — convert the historical PostgreSQL Identity
Station into an optional storage adapter behind the accepted portable identity
runtime.

Header remains deferred until Phase 4 is verified promoted.
