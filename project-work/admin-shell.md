# Admin Shell / Admin Station Layout

Status: BUILDER ACTION REQUIRED
Phase: 4 — Reclassify Admin Shell as full-page runtime layout

## Reviewer verdict

**Proceed with safeguards**

Current `main`:
`137d8f9db212eb9c7630fd401321f39e439e8249`.

## Owner architecture clarification

We are reverse-engineering the Admin Station.

The **Admin Shell is the Admin Station application/runtime layout**, not a
Shared UI component and not a Component Manager specimen.

Component Manager is the engineering sandbox used to reverse-engineer, build,
test, and validate each real reusable Lego piece — including its component
structure, schema/definition boundary, controlled adapter mapping, WEX
presentation, responsive behaviour, interactions, and accessibility — before
that accepted piece is fitted into the Admin Station.

After enough accepted pieces are fitted, the Admin Station becomes complete;
real consuming-system domain adapters then provide authoritative records,
permissions, actions, and lifecycle behaviour.

## Authority alignment

This clarification is consistent with existing repository authority:

- `apps/web-runtime` owns browser application assembly;
- Shared UI owns reusable component rendering/interaction/accessibility;
- WEX owns presentation/layout/responsive rules;
- adapters translate domain authority into approved contracts.

The current `packages/ui/src/components/admin-shell.ts` classification and
Component Manager mounting therefore reflect the superseded interpretation.

## Builder correction instruction

1. Confirm remote heads are only `main` and `Project-work-instructions`,
   then create one topic branch from current `main`.
2. Update the Admin Shell and Component Manager Code Maps first so they route to
   the corrected ownership boundary.
3. Remove Admin Shell from Shared UI **component authority**:
   - remove `packages/ui/src/components/admin-shell.ts` and its export/tests;
   - update foundation audit/component allowlists accordingly;
   - do not replace it with another Shared UI shell component.
4. Restore Component Manager to its independent component-sandbox purpose:
   remove Admin Shell-specific fixture/mount content while preserving the
   accepted isolated preview, viewport switching, theme sync, and sandbox
   mechanics.
5. Establish a standalone full-page Admin Station/Admin Shell runtime route in
   `apps/web-runtime` with only these application layout regions:
   Header, Sidebar, Main/Body, Footer.
6. The full-page shell must consume existing WEX layout/spacing/colour/
   typography/geometry/responsive authority. Do not invent local visual values
   or duplicate breakpoint logic.
7. Keep this phase structural only. Do not add Drawer, navigation component,
   Data Card, Collection, forms, domain records, permissions, persistence,
   adapters, schemas, or product behaviour.
8. Preserve the Component Manager as the future place where those Lego pieces
   are developed and tested before fitting into the Admin Station.
9. Add focused tests proving:
   - Admin Shell is application/runtime layout, not a Shared UI component;
   - the standalone route has Header/Sidebar/Main/Footer;
   - Component Manager no longer mounts Admin Shell;
   - existing Component Manager viewport/theme tooling remains intact;
   - no domain/product behaviour is introduced.
10. Run focused runtime/UI tests, foundation audit, `git diff --check`,
    `pnpm check`, and Chrome validation for the full-page shell plus restored
    Component Manager across relevant themes/breakpoints.
11. Commit/push one candidate, verify remote SHA, update this same file to
    `AWAITING REVIEWER REVIEW` with exact evidence, and stop.

## Next boundary after acceptance

Choose the first **real Admin Station Lego piece** from the intended/existing
station. Reverse-engineer and prove that piece in Component Manager, including
the required schema/adapter boundary where genuinely needed, then fit the
accepted piece into the Admin Station.

Do not invent a component merely because a region exists.
