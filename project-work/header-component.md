# Header Component

Status: BUILDER ACTION REQUIRED
Phase: Header authority closeout — Code Map verification correction

## Reviewer verdict

**Proceed with safeguards**

The Header authority promotion is independently verified.

Remote `main` is exactly
`64159f9475fc1dee203bb8ffc450e10c3cf364eb`, identical to the final accepted
candidate. ADR 0020 is correctly marked `Accepted`, the decisions index lists
it under Accepted, and the completed topic branch has been deleted. Remote
heads are only `main` and `Project-work-instructions`.

One closeout evidence defect remains:

- `docs/code-map/header-component.md` still says its authority was verified
  against pre-promotion `origin/main`
  `abb0a4c7c795f592077acaf4ee8273c8d724bb5d`.

That is now stale because accepted Header authority lives on `main` at
`64159f9475fc1dee203bb8ffc450e10c3cf364eb`.

## Builder instruction

Use the normal maintenance topic-branch handoff. This instruction does **not**
authorize Builder to update `main` directly.

1. Create one bounded maintenance/docs topic branch from current `main`.
2. Update `docs/code-map/header-component.md` so its verified `origin/main`
   SHA is `64159f9475fc1dee203bb8ffc450e10c3cf364eb`.
3. Inspect the adjacent Header-touched Code Maps from the accepted authority
   closeout and correct any equivalent stale pre-promotion verification SHA if
   present.
4. Do not alter Header architecture, ADR 0020, slots, presentation values,
   ownership, schema boundary, identity separation, or implementation scope.
5. Run `pnpm audit:foundation` and `git diff --check`.
6. Commit and push only this documentation correction on the maintenance topic
   branch.
7. Update this same file to `AWAITING REVIEWER REVIEW` with the exact remote
   candidate branch/SHA, changed files, and checks; then stop.
8. Reviewer will independently verify the candidate and explicitly authorize
   promotion to `main` in the next cycle. The phrase “resulting main SHA” is
   post-promotion closeout evidence, not current Builder permission to push or
   merge to `main`.

Do not begin Header schema/source implementation until this evidence correction
is independently closed.
