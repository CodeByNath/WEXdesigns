# Header Component

Status: BUILDER ACTION REQUIRED
Phase: Header Code Map verification correction — promotion and closeout

## Reviewer verdict

**Proceed**

Reviewed maintenance candidate `docs/header-code-map-verification` at
`06faa4509926f0f55db3e749dd65a99d5ad1e75c` against `main`
`64159f9475fc1dee203bb8ffc450e10c3cf364eb`.

The candidate is one commit ahead and not behind `main`. The diff is limited
to four Header-touched Code Maps:

- `docs/code-map/header-component.md`
- `docs/code-map/component-manager.md`
- `docs/code-map/global-components.md`
- `docs/code-map/admin-shell.md`

Each change replaces the stale pre-promotion verification SHA with accepted
Header-authority `origin/main`
`64159f9475fc1dee203bb8ffc450e10c3cf364eb`. No Header architecture,
ADR 0020, slots, presentation values, ownership, schema boundary, identity
separation, implementation, registration, fitting, or host/domain behaviour
changed.

Builder-reported `pnpm audit:foundation` and `git diff --check` passed.
GitHub exposes no separate commit-status contexts for this SHA.

## Builder instruction

Promote **only**
`06faa4509926f0f55db3e749dd65a99d5ad1e75c` to `main` by fast-forward.

Then:

1. verify remote `main` equals that exact SHA;
2. verify the promoted tree/diff is identical to the accepted maintenance
   candidate;
3. run `pnpm audit:foundation` and `git diff --check`;
4. prove containment, then delete `docs/header-code-map-verification`;
5. confirm remote heads return to only `main` and
   `Project-work-instructions`;
6. update this same file to `AWAITING REVIEWER REVIEW` with exact promotion
   SHA, checks, containment/diff evidence, and branch-deletion evidence;
7. stop.

Do not begin Header schema/source implementation until Reviewer independently
closes this promotion.
