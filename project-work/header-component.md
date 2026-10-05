# Header Component

Status: BUILDER ACTION REQUIRED
Phase: Header authority candidate — governance correction

## Reviewer verdict

**Proceed with safeguards**

Reviewed `docs/header-component-authority` at
`a23363569a7aa5e1c2f03686f04319dc9df16d8c` against current `main`
`abb0a4c7c795f592077acaf4ee8273c8d724bb5d`, the recovered Owner-approved
Header plan, Atomic Composition, Authority Model, dependency rules, WEX
Layout/Spacing source, Component Manager, Global Components, Admin Shell, and
portable Identity authority.

The substantive Header authority is correct. It preserves the approved family,
recursive direct-child boundaries, 64px Header/Brand allocation, 16px/8px and
8px/8px gutter semantics, <=767px replacement rule, child-owned Search and
PrimaryNavigation modes, one MainAction slot, schema/WEX/Shared UI/application
ownership separation, and reusable-capability vs concrete WEXAMH identity
separation.

Existing WEX source confirms `--wex-space-8`, `--wex-space-16`,
`--wex-space-64`, and the existing `max-width: 767px` compact boundary.
No new global spacing scale or breakpoint was invented.

## Required bounded correction

The candidate currently self-promotes its own authority:

- ADR 0020 says `Status: Accepted` before Reviewer acceptance/promotion.
- Code Maps describe ADR 0020 as established/accepted authority while it is
  still only a pushed candidate.
- New/updated Code Map verification metadata points to older
  `239d32c...` rather than the current candidate baseline
  `main abb0a4c7...`.

Builder must correct only this governance/evidence state:

1. Change ADR 0020 status to a non-accepted candidate state such as
   `Proposed — awaiting Reviewer acceptance` (or the repository's existing
   equivalent).
2. Change Code Map wording so ADR 0020 is described as a submitted/proposed
   Header authority candidate, not accepted authority.
3. Refresh Code Map verification metadata to the actual current baseline
   `origin/main abb0a4c7c795f592077acaf4ee8273c8d724bb5d`.
4. Do not change the approved Header architecture, values, slots, ownership,
   identity boundary, or exclusions.
5. Run `pnpm audit:foundation` and `git diff --check`, push the correction on
   the same `docs/header-component-authority` branch, update this same work
   file to `AWAITING REVIEWER REVIEW` with the new exact SHA, and stop.

No Header source, schema implementation, CSS, fixture/mount, registration,
Admin Station fitting, child implementation, host integration, or new
architecture is authorised.
