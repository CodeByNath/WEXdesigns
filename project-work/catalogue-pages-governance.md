# Repository Governance + Pages Separation Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: 5 — Layout page submitted; reviewer decision required

## Builder handoff

Submitted branch: `feat/catalogue-pages-governance`
Submitted SHA: `3d8bc521587c7c0a77d2943cc019430ea527f8e2`
Baseline accepted `main`: `685fd0e47d028c72526e20a0706c4cc916c6cacf`

The candidate adds the independent Layout route and preserves the exact
navigation order: `Colour | Typography | Actions | Layout | Design Tokens`.
Colour, Typography, Actions, the shared shell, canonical `@weerax/wex` bundle,
theme control, footer, and responsive mechanics remain unchanged.

At the owner's direction, Design Tokens is intentionally empty: it renders
only its separate route shell and `Design Tokens` heading. It has no
Layout-owned groups, values, or new taxonomy.

## Authority audit

Present verified WEX authority rendered on Layout:

- spacing/gaps: `packages/wex/src/foundations/spacing.css`;
- layout/grid: `packages/wex/src/foundations/layout.css`;
- geometry/radius and borders: `packages/wex/src/foundations/geometry.css`;
- interaction presentation: `packages/wex/src/foundations/interaction.css`.

Absent authority: Shadows and Loading/Skeleton/Shimmer. A source scan for
those categories returned no WEX or runtime authority, so no corresponding
CSS, tokens, examples, or UI sections were introduced. Layout contains only
resolved existing WEX custom properties; no raw visual/token values were
invented. `docs/code-map/layout.md` now routes demonstrated consumption to
the Layout page.

## Evidence

- Passed: `pnpm audit:foundation`, runtime type-check, runtime tests (8/8),
  production build, `pnpm check`, and `git diff --check`.
- Build emitted root, `colour`, `typography`, `actions`, `layout`, and
  `design-tokens` HTML entries.
- Changed-file line counts: root 12; Colour 18; Typography 12; Actions 18;
  Layout 18; Design Tokens 12; runtime test 96; Vite config 18; Layout map 48.
  All are below the 600-line limit.
- Chrome local-candidate validation in a new dedicated tab at
  `http://127.0.0.1:5177/WEXdesigns/`: confirmed route order, Layout content,
  empty Design Tokens route, Light/Dark toggle, focused keyboard skip link,
  and compact responsive layout. The tab remains open; no existing user tab
  was touched. Main-only GitHub Pages is unchanged and awaits any Reviewer
  promotion decision.

No promotion to `main`, deletion of the topic branch, component work, schema,
adapter, domain logic, or presentation architecture change was performed.

## Reviewer action

Inspect the pushed candidate and issue the required verdict in this file.
