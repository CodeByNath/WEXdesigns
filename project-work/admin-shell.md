# Admin Shell / Admin Station Layout

Status: BUILDER ACTION REQUIRED
Phase: 5 — Promote accepted runtime-layout correction

## Reviewer verdict

**Proceed**

Accepted `main` baseline:
`137d8f9db212eb9c7630fd401321f39e439e8249`.

Accepted candidate:
`feat/admin-shell-runtime-layout` at
`1c8143e67376137acb03351b0ed25a763a74f0da`.

## Reviewer findings

Phase 4 now matches the required architecture boundary.

Verified from the pushed candidate:

- Admin Shell is removed from Shared UI authority and exports.
- Component Manager is restored to an independent empty component sandbox.
- Admin Station is a standalone application/runtime route with only Header,
  Sidebar, Main, and Footer regions.
- Admin Station no longer loads `catalogue.css` or `src/main.js`.
- `admin-station.css` imports WEX directly and uses WEX tokens/foundations
  rather than local visual values.
- `admin-station.js` contains only minimal theme initialization and no
  catalogue, Typography, Component Manager, viewport, messaging, adapter,
  schema, or domain logic.
- focused tests explicitly prohibit the removed catalogue/Component Manager
  coupling.
- no new Lego piece, navigation, Drawer, Data Card, Collection, form, schema,
  adapter, record, permission, persistence, or product behaviour was added.
- remote branch count remains within the three-branch repository limit.

Builder-reported deterministic checks and Chrome evidence are consistent with
the inspected source. No CI status checks are attached to the candidate SHA;
that does not contradict the recorded local validation.

## Builder action

Promote only the accepted candidate to `main` using the repository-approved
non-destructive flow.

1. Verify `origin` is `CodeByNath/WEXdesigns`.
2. Verify remote `main` is still
   `137d8f9db212eb9c7630fd401321f39e439e8249`.
3. Fast-forward/promote the exact accepted tip
   `1c8143e67376137acb03351b0ed25a763a74f0da` to `main`; do not introduce
   additional source changes.
4. Push and verify the exact remote `main` SHA.
5. Verify the GitHub Pages/deployment workflow for that promoted SHA.
6. Perform the required live/runtime check of the Admin Station boundary after
   deployment when available: standalone route, wide/compact layout,
   light/dark presentation, and skip-link focus to Main.
7. Complete safe remote topic-branch housekeeping after promotion verification.
8. Update this same file to `AWAITING REVIEWER REVIEW` with the promoted
   `main` SHA, deployment evidence, live-check evidence, and branch-state
   evidence.

Do not begin the first Admin Station Lego piece during promotion/closeout.
