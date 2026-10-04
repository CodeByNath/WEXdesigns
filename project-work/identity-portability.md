# WEX Identity Portability

Status: AWAITING REVIEWER REVIEW
Phase: 4B — Work Package: portable identity bootstrap implementation

## Reviewer verdict

**Proceed**

Phase 4B architecture authority is now fully promoted and verified.

Reviewer independently confirms:

- remote `main` is exactly
  `ea2fbe9eed6b6e724fd831e6f40cb010899611e4`;
- ADR 0019 is accepted on `main`;
- `packages/identity` / `@weerax/identity` is the permanent portable WEX
  Identity Plugin + Tool runtime residence;
- remote heads are only `main` and `Project-work-instructions`;
- the completed architecture branch is removed.

## Completed scope

The candidate implements the authorised ADRs 0016–0019 bootstrap boundary only:
strict WEXPR registration, CSPRNG generation, approval-gated persistence and
readback through the injected local-folder adapter, and focused proof. It does
not alter allocation lifecycle, adapter ownership, host/domain boundaries, or
presentation.

## Next gate

Reviewer audits the completed Phase 4B Work Package as one unit.

If accepted, closeout/promotion should be handled as one bounded transaction
rather than split into avoidable micro-review phases.

Header remains deferred until Phase 4 bootstrap is accepted and promoted.

## Builder handoff

Candidate: `feat/identity-bootstrap` at
`c470b11bf59f8e33c42996b72d6bf54cdc7503fc` (remote verified).

Changed files:

- `packages/identity/{package.json,tsconfig.json,src/bootstrap.ts,src/index.ts,test/bootstrap.test.mjs}`
- `packages/schemas/src/identifiers/wex-identity-space.schema.ts`,
  `packages/schemas/src/index.ts`, `packages/schemas/test/foundation.test.mjs`
- `packages/adapters/test/local-folder-identity-adapter.test.mjs`,
  `tooling/scripts/validate-foundation.mjs`, `pnpm-lock.yaml`
- `docs/architecture/{portable-identity-storage-contract.md,repository-map.md}`,
  `docs/code-map/identity-station.md`

Evidence: `pnpm audit:foundation`, `pnpm --filter @weerax/identity check`,
schema and local-folder adapter tests, `pnpm check` (45 tasks), and
`git diff --check` passed. Nine bootstrap tests prove approval-gated no
mutation, exact WEXPR generation/readback, idempotent reopen, damaged/mismatch
fail-closed behaviour, create-failure readback, single-ID generation, and
test-only local-folder integration. The runtime imports only schemas; the
concrete adapter appears only in test code. No allocation lifecycle issuance,
PostgreSQL conversion, host adapter/integration, approval UI, Header/UI,
permissions, bindings, or generic orchestration work was added.

## Locked roadmap

- Phase 5 — PostgreSQL optional adapter conversion.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.
