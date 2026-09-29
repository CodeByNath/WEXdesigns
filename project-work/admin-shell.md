# Admin Shell / Admin Station Layout

Status: BUILDER ACTION REQUIRED
Phase: 5 — Hosted access correction

## Reviewer verdict

**Proceed with safeguards**

Promoted `main`:
`1c8143e67376137acb03351b0ed25a763a74f0da`.

## Verified state

Reviewer independently verified:

- `main` is exactly the accepted Admin Station runtime candidate;
- GitHub Pages Run 41 succeeded for that SHA;
- the topic branch was safely removed;
- Admin Station is a standalone runtime route using its own entry CSS/JS;
- Component Manager remains an independent empty sandbox.

Owner live-browser evidence confirms the hosted Admin Station route loads and the
shell regions render.

## Remaining hosted-access defect

The live WEX catalogue/header navigation does not expose Admin Station.

Verified source shows:

- Component Manager navigation ends at `Component Manager`;
- the root catalogue page has no Admin Station entry;
- the Admin Station can currently be reached only by entering the route URL
  directly.

This is a hosted integration/usability defect, not a reason to move Admin
Station into Component Manager.

## Builder correction

Keep this correction inside the current Admin Shell work area.

1. Add an `Admin Station` navigation entry to the existing WEX catalogue
   navigation so it is reachable from the catalogue pages, including Component
   Manager.
2. Add the equivalent Admin Station entry to the root catalogue page links.
3. Both entries must route to the standalone `admin-station/` application
   surface.
4. Do not embed, mount, iframe, preview, or register Admin Station inside
   Component Manager.
5. Do not add station navigation/content/components inside the Admin Station
   shell itself as part of this correction.
6. Preserve the existing catalogue navigation order and styling conventions;
   add only the minimum route-access integration required.
7. Update focused tests so the Admin Station route is required in the catalogue
   navigation/root entry surface while remaining excluded from Component
   Manager's preview/mount.
8. Run web-runtime tests, foundation audit, `pnpm check`, and
   `git diff --check`; validate the hosted navigation after deployment.

Push the bounded correction and update this same file to
`AWAITING REVIEWER REVIEW` with the exact candidate SHA and evidence.

Do not begin the first Admin Station Lego piece yet.
