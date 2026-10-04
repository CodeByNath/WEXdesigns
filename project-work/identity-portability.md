# WEX Identity Portability

Status: BLOCKED — DECISION REQUIRED
Phase: 4B — Work Package: portable identity bootstrap implementation

## Reviewer verdict

**Proceed**

Phase 4A is closed. Reviewer independently verified remote `main` is exactly
`4f876eb26510338479d2bf3d7ec3d27773f9384e`, ADR 0018 is recorded as Accepted,
the ADR index agrees, and remote heads are only `main` and
`Project-work-instructions`.

## Work Package outcome

Deliver one reviewable Phase 4B candidate proving the accepted portable WEX
Identity Plugin + Tool bootstrap contract against the accepted local-folder
adapter.

Builder may complete all included tasks without intermediate Reviewer approval
while staying inside accepted authority.

## Controlling authority

- ADR 0016 — Portable WEX Identity Spaces
- ADR 0017 — Portable WEX Identity Storage Contract
- ADR 0018 — Platform Registration Bootstrap Contract
- `docs/architecture/portable-identity-storage-contract.md`
- `docs/architecture/dependency-rules.md`
- verified `main` schemas and local-folder adapter

## Included work

1. Add strict schema support for the accepted `WEXPR-` registration format.
2. Implement cryptographically secure 26-character Base32 registration
   generation exactly as ADR 0018 defines.
3. Implement Plugin + Tool bootstrap orchestration:
   detect absent/present/damaged state; expose approval-required; create only
   after explicit approval; persist supplied registration through the adapter;
   exact readback validation; repeat-safe ready; fail closed on mismatch.
4. Prove failure/collision/create-error behavior including the ADR 0018 rule
   that one invocation generates at most one registration ID.
5. Integrate only with the accepted local-folder adapter boundary.
6. Add focused deterministic tests for all accepted bootstrap states and
   invariants.
7. Update exports, Code Maps/repository map/documentation only as required to
   accurately describe the implemented Phase 4B boundary.
8. Run the full relevant repository checks and push one candidate for review.

## Hard exclusions

Do not implement allocation issuance/reserve/assign/retire, PostgreSQL
conversion, WordPress/MySQL or other host adapter, host business bindings,
approval UI, Header/UI work, domain permissions, or a generic orchestration
framework.

Do not change accepted identity semantics or storage-adapter ownership.

## Stop gates

Stop and return `BLOCKED — DECISION REQUIRED` only if:

- permanent Plugin + Tool package/runtime residence is not already resolvable
  from repository authority and implementing it would require inventing a new
  architectural package boundary;
- accepted authority contradicts required implementation;
- scope must widen beyond this package;
- a destructive migration or host/customer-state change becomes necessary;
- a material security/persistence/concurrency failure cannot be resolved within
  accepted authority.

Do not stop for ordinary implementation choices, test fixes, exports, or
documentation updates that remain inside this package.

## Required evidence

- exact topic branch and pushed SHA;
- complete changed-file list;
- `pnpm audit:foundation`;
- relevant package checks/tests plus `pnpm check` if executable in the repo;
- `git diff --check`;
- test evidence for no mutation before approval, exact WEXPR format, exact
  readback, reopen/idempotence, damaged/mismatched failure, create-failure
  readback behavior, and one-ID-per-invocation;
- confirmation all hard exclusions remain untouched.

Return this same file to `AWAITING REVIEWER REVIEW` once the entire Work
Package is pushed. Do not self-approve or promote to `main`.

## Next gate

Reviewer audits the whole Phase 4B Work Package as one unit. If accepted,
promotion can be included with closeout rather than split into unnecessary
micro-review phases.

Header remains deferred until Phase 4 bootstrap is accepted and promoted.

## Builder stop-gate report

Phase 4B cannot begin because the permanent WEX Identity Plugin + Tool runtime
residence is not resolvable from accepted authority:

- `docs/architecture/platform-identity.md` requires the Plugin + Tool to be
  separate from the WEX presentation package and reusable core packages.
- `docs/architecture/portable-identity-storage-contract.md` says no Plugin +
  Tool runtime exists; the current workspace exposes only schemas, adapters,
  presentation packages, applications, and the historical PostgreSQL Station.
- ADR 0016 makes that Station an optional adapter proof, not the portable WEX
  identity core. Placing the runtime there would contradict accepted authority.
- Creating a new package/app would establish a permanent package boundary that
  current authority does not assign.

No topic branch was created and no schema, adapter, Plugin + Tool runtime,
allocation, PostgreSQL conversion, host integration, Header, or UI work began.
An accepted architecture decision must assign the Plugin + Tool's permanent
residence and permitted dependency direction before this Work Package can run.

## Locked roadmap

- Phase 5 — PostgreSQL optional adapter conversion.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.
