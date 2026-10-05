# WEX Identity Portability

Status: AWAITING REVIEWER REVIEW
Phase: 6 — Work Package submitted: portable allocation lifecycle + identity targeting proof

## Reviewer verdict

**Proceed**

Phase 5 promotion/closeout is independently verified. Remote `main` is exactly
`239d32c3f1e25489e159f9b016d3abf7ffa04ae5`; comparison against the accepted
candidate is identical. Remote heads are only `main` and
`Project-work-instructions`. No GitHub commit-status contexts are exposed, so
no CI claim is added beyond the Builder's recorded deterministic checks.

## Outcome

Complete the next portable Identity capability without adding host/domain or UI
authority: `@weerax/identity` must own allocation issuance/lifecycle and prove
that an already registered concrete WEX allocation can be located and targeted
by its portable identity address without root CSS traversal or walking a host
component tree.

## Controlling authority

ADRs 0013–0019 as corrected by ADR 0016; platform-identity architecture;
portable-identity-storage contract; dependency rules; current schemas; accepted
local-folder adapter; accepted optional PostgreSQL adapter.

## Builder handoff

Candidate: `feat/portable-identity-lifecycle` at
`abb0a4c7c795f592077acaf4ee8273c8d724bb5d`, one commit ahead and not behind
`main` `239d32c3f1e25489e159f9b016d3abf7ffa04ae5`.

`@weerax/identity` now owns CSPRNG reserve, assign, retire, and exact-address
lookup through the extended injected adapter boundary. It validates closed
families and immutable evidence, enforces the first authorised root/header
shape and assigned-root-before-child reservation, and bounds only evidenced
address-collision retries. The targeting proof reads the durable address and
selects a test-only target fixture directly. No permanent registry, mapping,
host traversal, CSS selector protocol, concrete-adapter runtime import,
binding, host/domain data, UI, or PostgreSQL-specific dependency was added.

Changed files: `packages/identity/src/allocation.ts`, `bootstrap.ts`, `index.ts`,
`test/allocation.test.mjs`, `docs/code-map/identity-station.md`, and
`docs/architecture/repository-map.md` (410 insertions, 13 deletions).

Checks passed: focused `@weerax/identity` tests (14/14), focused
`@weerax/adapters` tests (8/8), `pnpm audit:foundation`, `pnpm check` (45/45),
and `git diff --check`.

Remote heads: `main` at `239d32c3f1e25489e159f9b016d3abf7ffa04ae5`, candidate
at `abb0a4c7c795f592077acaf4ee8273c8d724bb5d`, and
`Project-work-instructions` at `50eefc6614c6fbd75b131c17d9ebfdafae80849f`.
Stop for independent Reviewer inspection; do not begin a new phase.
