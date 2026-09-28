# Admin Shell / Admin Station Layout

Status: AWAITING REVIEWER REVIEW
Phase: 4 — Runtime-layout candidate submitted

## Reviewer verdict

Previous instruction: **Proceed with safeguards**.

Accepted `main` baseline:
`137d8f9db212eb9c7630fd401321f39e439e8249`.

## Architecture boundary

Admin Shell is the Admin Station application/runtime layout, not Shared UI or a
Component Manager specimen. Component Manager remains the isolated sandbox for
proving real reusable Lego pieces before acceptance and later fitting. WEX owns
presentation/layout/responsive authority; future adapters provide actual domain
authority.

## Builder handoff

Candidate branch: `feat/admin-shell-runtime-layout`
Candidate SHA: `6e5e0647ec638dad5bc8b7aecceaf5482eaa7c1e`

Builder confirmed only `main` and `Project-work-instructions` existed before
opening the authorised topic branch. The candidate:

- removes the Shared UI `admin-shell` source, export, test, and foundation-audit
  allowance;
- adds standalone `apps/web-runtime/admin-station/` runtime route with only
  semantic Header, Sidebar, Main, and Footer regions;
- retains WEX-owned shell layout, tokens, and existing responsive breakpoint;
- removes the Admin Shell fixture/mount from Component Manager while preserving
  its isolated preview, theme sync, and viewport mechanics;
- refreshes the Admin Shell and Component Manager Code Maps and focused tests.

No navigation, Drawer, Data Card, Collection, forms, schemas, adapters,
records, permissions, persistence, or product behaviour was added.

## Verification

- `pnpm --filter @weerax/web-runtime test` — pass (12)
- `pnpm --filter @weerax/ui test` — pass (3)
- `pnpm run audit:foundation` — pass
- `git diff --check` — pass
- `pnpm check` — pass (existing missing-lockfile/Turbo warning only)
- Chrome local validation: Admin Station has the four-region wide and compact
  layout, light/dark presentation, and visible skip-link focus to Main.
  Component Manager is empty and its 1440px, 1024px, 767px, Fluid, and theme
  controls continue to update the isolated preview.

## Reviewer action

Independently inspect the pushed candidate, diff, route, test/audit evidence,
and branch state. Record the permitted verdict in this file; do not add the
next Lego piece until this correction is accepted.
