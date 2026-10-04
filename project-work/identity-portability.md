# WEX Identity Portability

Status: BUILDER ACTION REQUIRED  
Phase: 5 — Work Package: PostgreSQL optional storage-adapter conversion

## Reviewer verdict

**Proceed with safeguards**

Phase 4 is complete and independently verified:

- remote `main` is exactly
  `a74be3d66a297a1d7db511f2d15aa73629997037`;
- `feat/identity-bootstrap` is deleted;
- remote heads are only `main` and `Project-work-instructions`;
- portable bootstrap is implemented in `@weerax/identity`.

A stale Code Map verification SHA and ADR 0017's old “format unresolved”
sentence are factual housekeeping only; correct them inside this package.

## Work Package outcome

Convert the historical PostgreSQL Identity Station into an **optional storage
adapter proof** that conforms to the accepted portable identity contract,
without making PostgreSQL a required backend or moving identity semantics out
of `@weerax/identity`.

Builder may complete all included tasks without intermediate Reviewer approval
unless a stop gate is hit.

## Controlling authority

- ADRs 0016–0019
- `docs/architecture/platform-identity.md`
- `docs/architecture/portable-identity-storage-contract.md`
- `docs/architecture/dependency-rules.md`
- Identity Code Map
- verified local-folder adapter as reference behavior

## Included work

1. Refactor the historical PostgreSQL proof so its durable operations conform
   to the same portable storage semantics as the local-folder adapter:
   detect, create supplied registration, read registration, atomic reserve,
   compare/write transition, and exact lookup.
2. Ensure PostgreSQL never generates registration/allocation IDs, chooses
   families, owns lifecycle meaning, or infers placement.
3. Preserve backend atomicity using PostgreSQL transactions/constraints.
4. Keep `@weerax/identity` independent of PostgreSQL and concrete adapters.
5. Remove or isolate historical Station-only issuer/bootstrap behavior that
   contradicts ADR 0016; do not preserve central-authority semantics merely for
   compatibility.
6. Add deterministic PostgreSQL/PGlite proof for registration identity,
   collision rejection, transition compare/write, non-reuse, lookup isolation,
   and damaged/mismatch failure as applicable.
7. Update migrations only as required for the portable record model. Any
   migration must be additive/safe for test proof; no live/customer database
   migration is authorised.
8. Correct factual documentation:
   - Identity Code Map verified SHA/status;
   - ADR 0017 registration-format text to route to accepted ADR 0018;
   - repository/dependency maps as required by the actual converted state.
9. Run all relevant checks and push one reviewable candidate.

## Hard exclusions

No mandatory PostgreSQL backend.
No host/customer production migration or deployment.
No WordPress/MySQL/API adapter.
No Header/UI or approval UI.
No domain bindings/permissions.
No Phase 6 component targeting.
No new identity semantics beyond ADRs 0016–0019.

## Stop gates

Return `BLOCKED — DECISION REQUIRED` only if:

- conversion requires a new permanent package/residence decision;
- existing PostgreSQL data would need destructive migration;
- accepted authority is contradictory or incomplete;
- implementing portable adapter semantics requires widening into new allocation
  semantics in `@weerax/identity` not already authorised;
- a material persistence/concurrency/security defect cannot be resolved inside
  accepted authority.

Do not stop for ordinary refactoring, migration fixture updates, test fixes,
exports, or documentation changes inside this package.

## Required evidence

- exact pushed branch/SHA and changed-file list;
- `pnpm audit:foundation`;
- PostgreSQL/Station package checks;
- schemas/adapters/identity checks as affected;
- `pnpm check`;
- `git diff --check`;
- proof PostgreSQL is persistence/atomicity-only and optional;
- proof no production/live database was migrated;
- confirmation all hard exclusions remain untouched.

Return this same file to `AWAITING REVIEWER REVIEW` after the full package is
pushed. Do not self-approve or promote to `main`.

## Next gate

Reviewer audits Phase 5 as one unit.

Phase 6 remains component targeting/inspection proof.
Header may resume only after the identity roadmap gate recorded by repository
authority permits it.
