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

Correct only Header Code Map verification metadata:

1. update `docs/code-map/header-component.md` so its verified `origin/main`
   SHA is `64159f9475fc1dee203bb8ffc450e10c3cf364eb`;
2. inspect the adjacent Header-touched Code Maps from the accepted authority
   closeout and correct any equivalent stale pre-promotion verification SHA if
   present;
3. do not alter Header architecture, ADR 0020, slots, presentation values,
   ownership, schema boundary, identity separation, or implementation scope;
4. run `pnpm audit:foundation` and `git diff --check`;
5. because the authority topic branch is already safely closed, make this
   bounded documentation correction using the repository-approved maintenance
   workflow, record the exact resulting `main` SHA and checks in this same
   file, set `AWAITING REVIEWER REVIEW`, and stop.

Do not begin Header schema/source implementation until this evidence correction
is independently closed.
