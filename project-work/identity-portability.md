# WEX Identity Portability

Status: BUILDER ACTION REQUIRED
Phase: 6 — Promotion and closeout

## Reviewer verdict

**Proceed**

Reviewed candidate `feat/portable-identity-lifecycle` at
`abb0a4c7c795f592077acaf4ee8273c8d724bb5d` against `main`
`239d32c3f1e25489e159f9b016d3abf7ffa04ae5`, the Phase 6 work package,
ADRs 0013–0019 as corrected by ADR 0016, platform-identity architecture,
portable storage contract, dependency rules, current schemas, and the actual
pushed source/tests.

The candidate is one commit ahead and not behind `main`. It keeps portable
identity semantics in `@weerax/identity`, extends only the injected
framework-neutral adapter boundary, preserves adapter persistence-only
ownership, and adds no concrete-adapter runtime dependency, host/domain data,
binding authority, registry, CSS selector protocol, component-tree traversal,
or UI authority.

The implementation provides closed-family CSPRNG reservation, bounded
collision retry only when durable occupancy is evidenced, reserve/assign/retire
lifecycle, exact portable lookup, immutable placement/evidence, assigned-root
before Header-child reservation, restart/non-reuse proof, and direct
identity-address targeting of a test-only fixture. No new permanent targeting
architecture is introduced.

Builder-reported focused identity/adapters tests, `pnpm audit:foundation`,
`pnpm check`, and `git diff --check` passed. GitHub exposes no commit-status
contexts for this SHA, so no separate CI result is claimed.

## Builder instruction

Promote **only**
`abb0a4c7c795f592077acaf4ee8273c8d724bb5d` to `main` by fast-forward.
Do not change source, schemas, identity semantics, targeting architecture, or
open Phase 7 during promotion.

Then:

1. verify remote `main` equals the exact accepted candidate SHA;
2. verify the promoted tree/diff is identical to the accepted candidate;
3. run `pnpm audit:foundation` and repository-required closeout checks;
4. prove candidate containment, then delete
   `feat/portable-identity-lifecycle`;
5. confirm remote heads return to only `main` and
   `Project-work-instructions`;
6. update this same file to `AWAITING REVIEWER REVIEW` with exact promotion
   SHA, checks, diff/containment evidence, and branch-deletion evidence;
7. stop. Do not begin Phase 7, Header source fitting, or host integration.
