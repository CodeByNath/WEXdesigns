# Admin Shell / Admin Station Layout

Status: AWAITING REVIEWER REVIEW
Phase: 4 — Runtime-layout correction submitted

## Reviewer verdict

Previous verdict: **Stop — architectural risk**. The bounded resource-coupling
correction is now submitted for independent review.

Accepted `main` baseline:
`137d8f9db212eb9c7630fd401321f39e439e8249`.

## Architecture boundary

Admin Shell is the Admin Station application/runtime layout, not Shared UI or
a Component Manager specimen. Component Manager is the isolated sandbox for
proving reusable Lego pieces before acceptance and later fitting. WEX owns
presentation/layout/responsive authority; future adapters provide domain
authority.

## Builder handoff

Candidate branch: `feat/admin-shell-runtime-layout`
Candidate tip: `1c8143e67376137acb03351b0ed25a763a74f0da`

This tip retains the prior structural correction and adds only the Reviewer
requested isolation:

- Admin Station now imports `admin-station.css` and `admin-station.js`, not
  `catalogue.css` or `main.js`.
- The station stylesheet imports WEX foundations and uses only WEX tokens for
  document, skip-link, and focus presentation.
- Its minimal runtime initializes WEX light/dark state from existing theme
  storage or the system preference; it contains no catalogue, Typography,
  Component Manager, viewport, or messaging logic.
- Focused tests explicitly prohibit catalogue/Component Manager entry coupling;
  the Admin Shell Code Map routes to the new entry resources.

The candidate still has only Header, Sidebar, Main, and Footer regions. No
navigation, Drawer, Data Card, Collection, forms, components, schemas,
adapters, records, permissions, persistence, or product behaviour was added.

## Verification

- `pnpm --filter @weerax/web-runtime test` — pass (12)
- `pnpm run audit:foundation` — pass
- `git diff --check` — pass
- `pnpm check` — pass (existing missing-lockfile/Turbo warning only)
- Chrome local validation: standalone station renders correctly at compact and
  wide states, honors light/dark WEX presentation, and the visible skip link
  moves focus to Main. Component Manager remains its independent empty sandbox.

## Reviewer action

Independently inspect candidate tip, diff, standalone entry resources, tests,
and evidence. Record the permitted verdict here; do not begin an Admin Station
Lego piece until Phase 4 is accepted.
