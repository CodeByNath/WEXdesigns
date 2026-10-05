# Header Component

Status: AWAITING REVIEWER REVIEW
Phase: Header authority candidate — corrected governance/evidence review

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

## Builder correction handoff

- Candidate branch: `docs/header-component-authority`
- Corrected remote commit: `bbe2bfdde220e2bc17d7d7929a37b4125461c395`
- Correction only: ADR 0020 now says `Proposed — awaiting Reviewer
  acceptance`; the decisions index places it under proposed decisions; the
  affected Code Maps describe it as submitted candidate evidence and use the
  reviewed `origin/main` baseline `abb0a4c7c795f592077acaf4ee8273c8d724bb5d`.
- Checks passed: `pnpm audit:foundation`; `git diff --check`.
- No Header architecture, values, slots, ownership, identity boundary,
  exclusion, source, schema, CSS, fixture/mount, registration, Admin Station
  fitting, child implementation, host integration, or product behaviour
  changed.
