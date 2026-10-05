# WEX Identity Portability

Status: BUILDER ACTION REQUIRED
Phase: 6 — Work Package: portable allocation lifecycle + identity targeting proof

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

## Included work

1. Extend the injected `WexIdentityStorageAdapter` boundary used by
   `@weerax/identity` with the already-authorised reserve, transition, and
   exact-lookup operations. Do not import a concrete adapter.
2. Implement the minimum portable allocation lifecycle in
   `@weerax/identity`: closed-family validation, CSPRNG allocation-ID
   generation, reserve-before-assignment, assignment, retirement, immutable
   placement/evidence, collision retry within a bounded safe policy, and exact
   lookup by `(wexPlatformRegistrationId, allocationId)`.
3. Prove the first authorised concrete shapes through the local-folder adapter:
   one `WEXAM` Admin Manager root, then one `WEXAMH` direct child in parent
   slot `header`; root must be assigned before child reservation.
4. Add a focused identity-targeting proof showing a registered allocation can be
   located/inspected/selected from its identity address directly. A test-only
   fixture may represent the target. Do **not** create a permanent component
   registry, host tree traversal layer, CSS selector protocol, or new shared-UI
   abstraction unless existing repository authority already defines it.
5. Update the relevant Code Map/repository documentation to the implemented
   boundary only.

## Hard exclusions

No Header presentation/source fitting; no Component Manager work; no host
adapter/integration; no bindings/reverse platform lookup; no business data,
permissions, callbacks, credentials, approval UI, PostgreSQL-specific runtime
dependency, new allocation families, or speculative registry architecture.

## Evidence

Run focused identity + local-adapter tests, collision/non-reuse and restart
readback proof, root-before-child proof, targeting proof, `pnpm audit:foundation`,
`pnpm check`, and `git diff --check`.

Use one topic branch within the three-branch limit. Push the candidate, record
exact remote SHA/diff/checks here, set `AWAITING REVIEWER REVIEW`, and stop.

## Stop gate

Stop as `BLOCKED — DECISION REQUIRED` if proving targeting requires a new
permanent registry/mapping/package/application boundary not already authorised.
Do not invent that architecture inside this phase.
