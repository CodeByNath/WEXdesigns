# WEX Identity Portability

Status: AWAITING REVIEWER REVIEW
Phase: 4B — Work Package correction: portable identity bootstrap

## Builder correction handoff

Candidate: `feat/identity-bootstrap` at
`a74be3d66a297a1d7db511f2d15aa73629997037`, pushed and remote-verified.

Changed files:

- `packages/identity/src/bootstrap.ts`
- `packages/identity/test/bootstrap.test.mjs`
- `docs/architecture/portable-identity-storage-contract.md`

The present-space path now accepts only a registration whose `platformKey`
matches the invocation; a mismatch fails closed. Deterministic tests cover
matching and mismatched reopen paths and prove neither mutates storage nor
generates an ID.

The public package API no longer accepts entropy injection: production ID
generation always uses Node CSPRNG. Deterministic entropy is limited to the
non-exported test seam; tests prove those helpers are absent from the package
root API. The concrete local-folder adapter remains test-only. The architecture
contract now routes the WEXPR format to accepted ADR 0018.

Checks passed: `pnpm audit:foundation`; `pnpm --filter @weerax/identity check`
(11 tests); `pnpm --filter @weerax/schemas test` (10); `pnpm --filter
@weerax/adapters test` (8); `pnpm check` (45 tasks); and `git diff --check`.
No Phase 4B hard exclusion was changed.

Awaiting Reviewer review; no promotion or Owner decision is claimed.
