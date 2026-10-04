# WEX Identity Portability

Status: BUILDER ACTION REQUIRED  
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

## Work Package outcome

Deliver one reviewable Phase 4B candidate implementing and proving portable WEX
Identity bootstrap against the accepted local-folder adapter boundary.

Builder may complete all included tasks without intermediate Reviewer approval
while staying inside accepted authority.

## Controlling authority

- ADR 0016 — Portable WEX Identity Spaces
- ADR 0017 — Portable WEX Identity Storage Contract
- ADR 0018 — WEX Platform Registration Bootstrap Contract
- ADR 0019 — WEX Identity Runtime Residence
- `docs/architecture/platform-identity.md`
- `docs/architecture/portable-identity-storage-contract.md`
- `docs/architecture/dependency-rules.md`
- Identity Code Map
- verified `main` schemas and local-folder adapter

## Included work

1. Create `packages/identity` / `@weerax/identity` with only
   `@weerax/schemas` as an internal package dependency.
2. Add strict schema support for the accepted
   `WEXPR-[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{26}` registration form where
   required by accepted authority.
3. Implement cryptographically secure 26-character Base32 registration
   generation exactly as ADR 0018 defines.
4. Implement bootstrap orchestration through an injected framework-neutral
   storage-adapter operation boundary:
   detect absent/present/damaged state; expose approval-required; create only
   after explicit approval; persist the supplied registration; exact readback
   validation; repeat-safe ready; fail closed on mismatch/damage.
5. Prove ADR 0018 create-failure/readback behavior and the rule that one
   bootstrap invocation generates at most one registration ID.
6. Demonstrate integration against the accepted local-folder adapter without
   making `@weerax/identity` import or depend on the concrete adapter package.
7. Add focused deterministic tests covering all accepted bootstrap states and
   invariants.
8. Update exports, package metadata, Code Maps/repository map/documentation only
   as required to accurately describe the implemented Phase 4B boundary.
9. Run the complete relevant repository checks and push one candidate.

## Hard exclusions

Do not implement allocation reserve/assign/retire issuance, PostgreSQL
conversion, WordPress/MySQL or another host adapter, host business bindings,
approval UI, Header/UI work, domain permissions, or a generic orchestration
framework.

Do not make `@weerax/identity` import `@weerax/adapters`,
`@weerax/identity-station`, WEX presentation, Shared UI, applications, React,
browser UI, or host/domain systems.

Do not change accepted identity semantics or storage-adapter ownership.

## Stop gates

Stop and return `BLOCKED — DECISION REQUIRED` only if:

- accepted authority is contradictory or materially incomplete;
- implementation requires a new permanent architecture boundary;
- scope must widen beyond this package;
- destructive migration or host/customer-state change becomes necessary;
- a material security, persistence, concurrency, or dependency-boundary defect
  cannot be resolved within accepted authority.

Do not stop for ordinary implementation choices, exports, test fixes, package
wiring, or documentation updates inside this package.

## Required evidence

- exact topic branch and pushed SHA;
- complete changed-file list;
- `pnpm audit:foundation`;
- package-specific checks/tests for schemas, identity, and adapters as relevant;
- `pnpm check` if executable in the repository;
- `git diff --check`;
- tests proving:
  - no mutation before approval;
  - exact WEXPR validation/generation;
  - exact persisted readback;
  - repeated reopen/idempotence;
  - damaged/mismatched space fails closed;
  - create-failure readback semantics;
  - one generated ID maximum per invocation;
- confirmation all hard exclusions remain untouched.

Return this same file to `AWAITING REVIEWER REVIEW` once the entire Work
Package is pushed and remote-verified. Do not self-approve or promote to
`main`.

## Next gate

Reviewer audits the completed Phase 4B Work Package as one unit.

If accepted, closeout/promotion should be handled as one bounded transaction
rather than split into avoidable micro-review phases.

Header remains deferred until Phase 4 bootstrap is accepted and promoted.

## Locked roadmap

- Phase 5 — PostgreSQL optional adapter conversion.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.
