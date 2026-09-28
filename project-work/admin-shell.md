# Admin Shell / Admin Station Layout

Status: BUILDER ACTION REQUIRED
Phase: 4 — Runtime-layout correction

## Reviewer verdict

**Stop — architectural risk**

Accepted `main` baseline:
`137d8f9db212eb9c7630fd401321f39e439e8249`.

Reviewed candidate:
`feat/admin-shell-runtime-layout` at
`6e5e0647ec638dad5bc8b7aecceaf5482eaa7c1e`.

## Accepted architecture boundary

Admin Shell is the Admin Station application/runtime layout, not Shared UI and
not a Component Manager specimen. Component Manager remains the isolated
sandbox for proving reusable Lego pieces before acceptance and fitting. WEX
owns presentation/layout/responsive authority; future adapters provide domain
authority.

The candidate correctly removes the Shared UI Admin Shell source/export/test,
removes its Component Manager fixture/mount, creates the four semantic runtime
regions, and does not introduce navigation, components, adapters, schemas, or
domain behaviour.

## Blocking finding

The new standalone Admin Station route still loads:

- `../src/catalogue.css`
- `../src/main.js`

Those files are the catalogue/runtime implementation for catalogue pages,
Typography rendering, theme controls, and Component Manager viewport behaviour.
The station is therefore a separate route but not yet a clean standalone
application/runtime surface. Its runtime currently depends on unrelated
catalogue and Component Manager concerns.

The focused tests assert route structure but do not prohibit this coupling.

## Builder correction

Keep this correction inside Phase 4 and on the same topic branch.

1. Remove Admin Station dependency on the full catalogue stylesheet and full
   catalogue/Component-Manager runtime script.
2. Give the Admin Station only the minimum application-level entry resources
   required to consume WEX presentation and preserve the already-demonstrated
   light/dark shell behaviour.
3. Do not duplicate WEX visual values locally; consume WEX tokens/foundations.
4. Do not add navigation, Drawer, Data Card, Collection, forms, components,
   schemas, adapters, records, permissions, persistence, or product behaviour.
5. Add focused checks proving the Admin Station entry no longer imports or
   executes catalogue/Component Manager-specific presentation or behaviour.
6. Re-run the existing web-runtime tests, foundation audit, `pnpm check`, and
   `git diff --check`; repeat Chrome wide/compact, light/dark, and skip-link
   validation.
7. Push the corrected candidate and update this same file to
   `AWAITING REVIEWER REVIEW` with the exact remote SHA and evidence.

Do not begin the first Admin Station Lego piece until Phase 4 is accepted.
