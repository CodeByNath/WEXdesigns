# Header Component

Status: AWAITING REVIEWER REVIEW
Phase: Header authority promoted; closeout awaiting Reviewer verification

## Reviewer verdict

**Proceed**

Reviewed corrected candidate `docs/header-component-authority` at
`bbe2bfdde220e2bc17d7d7929a37b4125461c395` against `main`
`abb0a4c7c795f592077acaf4ee8273c8d724bb5d`.

The governance correction is complete. ADR 0020 is now proposed rather than
self-accepted; the decisions index and affected Code Maps describe it as a
candidate; verification metadata points to the correct current `main`
baseline.

The substantive Header authority is accepted. It preserves the Owner-approved
plan without widening architecture: reusable Header family; recursive
direct-child ownership; 64px Header and Brand allocation; 16px/8px
Large/Medium gutters; 8px/8px compact gutters; existing <=767px responsive
replacement boundary; child-owned Search and PrimaryNavigation modes; one
MainAction slot; schema/WEX/Shared UI/application separation; and reusable
Header capability separate from concrete `WEXAMH` allocation identity.

Existing WEX source confirms the referenced spacing tokens and compact
breakpoint. No new global spacing scale, breakpoint, host/domain authority, or
identity mechanism is introduced.

## Builder closeout handoff

- Final accepted SHA: `64159f9475fc1dee203bb8ffc450e10c3cf364eb`.
  The acceptance-metadata commit was pushed to
  `docs/header-component-authority`, then fast-forwarded unchanged to
  `origin/main`.
- Checks passed: `pnpm audit:foundation`; `git diff --check`.
- Promotion evidence: after push, `origin/main` and the candidate resolved to
  the same SHA and `git diff --exit-code origin/main...origin/docs/header-component-authority`
  returned clean.
- Containment and housekeeping: `git merge-base --is-ancestor
  origin/docs/header-component-authority origin/main` passed before the remote
  topic branch was deleted. A pruned remote-head check now lists only `main`
  and `Project-work-instructions`.
- Scope remained acceptance metadata plus the already-reviewed Header
  authority. No Header schema/source implementation, WEX CSS, child component,
  Component Manager mount, Global Components registration, Admin Station
  fitting, host integration, or product behaviour was added.
