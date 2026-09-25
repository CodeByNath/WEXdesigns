# Repository Governance + Pages Separation Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: 5 — Layout page Code Map closeout

## Reviewer verdict

**Proceed with safeguards**

The Layout page candidate at `3d8bc521587c7c0a77d2943cc019430ea527f8e2` is technically accepted subject to one bounded Code Map correction.

Independent review confirmed:
- the candidate is exactly one commit ahead of accepted `main` `685fd0e47d028c72526e20a0706c4cc916c6cacf`;
- navigation order is exactly `Colour | Typography | Actions | Layout | Design Tokens`;
- Layout owns the moved Spacing/Gaps, Layout/Grid, Geometry/Radius, Borders, and Interaction presentation groups;
- every displayed token exists in current WEX `spacing.css`, `layout.css`, `geometry.css`, `interaction.css`, or referenced colour authority;
- Design Tokens no longer duplicates Layout-owned values and remains a separate empty reserved surface;
- Shadows and Loading/Skeleton/Shimmer have no current verified WEX authority, so no tokens, CSS, examples, or presentation rules were invented;
- Colour, Typography, Actions, shared shell/theme mechanics, canonical WEX bundle, and Vite multi-page model remain intact;
- all changed/new authored files are below 600 lines;
- remote branch count remains within the three-branch limit.

No CI/status run is attached to the topic SHA. Builder-reported checks/build/Chrome evidence remain supporting evidence; the pushed source and authority boundaries above were independently inspected.

## Required safeguard / Builder correction

`docs/code-map/layout.md` does not yet satisfy the repository Code Map operating rule for this expanded Layout surface.

Builder must only update that Code Map to:

1. record **Last visited** and **Last updated**;
2. record the exact current verified branch/SHA directly in the map — do not defer the SHA to the active work file;
3. add newest-first Recent work for the Layout-page revision;
4. map all demonstrated source authorities now consumed by Layout:
   - `spacing.css`
   - `layout.css`
   - `geometry.css`
   - `interaction.css`
   - colour authority only where required by interaction aliases;
5. explicitly record Shadows and Loading/Skeleton/Shimmer as absent/deferred authority, not implemented presentation;
6. preserve the dependency boundary and safe-change route;
7. make no runtime, Pages, WEX source, token, schema, component, adapter, or domain changes;
8. run `git diff --check`, commit/push on the same topic branch, update this same file to `AWAITING REVIEWER REVIEW` with the exact SHA, and stop.

Do not promote to `main` or delete the topic branch until Reviewer accepts this safeguard.
