# Repository Governance + Pages Separation Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: 3 — GitHub Pages surface separation submitted

## Reviewer verdict

**Builder handoff — Reviewer decision pending**

Candidate branch/SHA: `feat/catalogue-pages-governance` at
`685fd0e47d028c72526e20a0706c4cc916c6cacf`.

## Delivered scope

- Root `index.html` is now a small entry surface linking to Colour,
  Typography, Actions, and Design Tokens.
- Added one route per authorised surface under `apps/web-runtime/`; Vite now
  emits all four paths in the existing single GitHub Pages artifact.
- Moved the existing Colour presentation, complete Typography renderer and
  computed facts, and existing Button examples without new WEX values,
  component architecture, schemas, adapters, or domain behaviour.
- Design Tokens resolves only existing WEX spacing, layout, and geometry
  custom properties.
- Removed the temporary `Outer states` markup, styles, and former state test;
  `rg -n 'outer-state|Outer states' apps/web-runtime` returns no results.
- Header, footer, theme mechanics, canonical WEX bundle, and Components
  deferral remain intact.

## Changed files and limits

All changed/new authored files are <=600 lines: root 12; Colour 18;
Typography 12; Actions 18; Design Tokens 16; `catalogue.css` 402;
`main.js` unchanged at 113; tests 81; Vite config 17.

Changed paths are limited to the five route HTML files, runtime catalogue CSS,
runtime route tests, and Vite multi-page configuration.

## Evidence

Passed: `pnpm audit:foundation`; runtime type-check; runtime tests (7/7);
runtime production build; `pnpm check` (35/35); and `git diff --check`.
`pnpm check` retained its existing non-fatal Turborepo lockfile-parsing and
web-runtime test-output warnings.

The build emitted `dist/index.html` and `dist/{colour,typography,actions,
design-tokens}/index.html` under one artifact.

Chrome verified the exact local candidate in a dedicated new preview tab:
the root navigation reached all four routes; Colour resolved its existing WEX
values; Actions exposed the five existing Button variants; Design Tokens
resolved existing foundation properties; Typography rendered IBM Plex computed
family/size/line-height/weight/style facts; Light/Dark toggled and returned to
Light; keyboard Tab reached the visible Skip to content link; and the compact
layout rendered cleanly. The dedicated preview tab remains open. Production
Pages is main-only and remains a post-promotion Reviewer boundary.

Builder stops for Reviewer.
