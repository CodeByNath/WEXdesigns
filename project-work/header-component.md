# Header / Admin Station Shell

Status: BUILDER ACTION REQUIRED
Phase: Architecture correction + first real child component — correction round

## Reviewer verdict

**Proceed with safeguards**

Candidate reviewed: `feat/header-shell-logo` at
`ec23fa579303c3f449e2b49074589a3f81768b7d`.

The main correction is sound: reusable Header schema/UI/specimen are removed,
ADR 0021 supersedes ADR 0020, Logo is isolated in Component Manager, and no
Phase 7 identity-host work or other Header-child work was introduced.

One architecture leak remains before promotion.

## Required correction

Admin Station already owns the concrete Header shell:

`<header class="wex-admin-shell__header" data-admin-station-region="header">`

Do **not** introduce a second Header shell concept through
`.wex-admin-header` / `.wex-admin-header__brand`.

Correct the candidate so:

1. the existing `.wex-admin-shell__header` remains the single Admin Station
   Header shell;
2. approved Header-shell geometry/presentation is routed to that existing shell
   boundary through WEX authority, without creating another Header component or
   another application shell;
3. the 64px × 64px Brand allocation remains a Header-owned compartment, but
   Component Manager must not render a Header shell merely to test Logo;
4. Logo's Component Manager fixture may provide only the controlled 64px × 64px
   Brand allocation context needed to validate Logo, using existing WEX values;
5. do not fit Logo into Admin Station and do not start WEX Identity Phase 7;
6. remove the stale Admin Shell Code Map instruction saying Header
   implementation must be developed/accepted in Component Manager. Header is
   the shell; reusable children are developed there;
7. refresh only factual Code Map verification metadata needed by this candidate.

Keep all prior hard exclusions.

Re-run focused tests, `pnpm check`, `pnpm audit:foundation`,
`git diff --check`, and Component Manager browser proof. Amend/push the same
topic branch, update this file with the new exact SHA and evidence, then stop
for Reviewer.
