# Component Manager

Status: BUILDER ACTION REQUIRED
Phase: 1 — Establish Component Manager sandbox surface

## Reviewer verdict

**Proceed with safeguards**

Baseline `main`:
`b85a2f98bfb22765c27f824ec4be42b2a23e924e`.

## Owner direction

Create **Component Manager** as the isolated component sandbox used before a
Shared UI component is plugged into a runtime shell.

Component Manager is where a component can be mounted with controlled
definitions/data, inspected, corrected, interaction-tested, accessibility-tested,
and validated against WEX presentation.

It is not the Admin Shell, not a consuming product, and not domain authority.

## Architecture boundary

Foundation remains binding:

- WEX owns reusable visual and interaction-presentation authority.
- Shared UI owns reusable structure, rendering, interaction, and accessibility
  mechanics that consume WEX.
- domain/product authority owns records, permissions, validation, lifecycle,
  workflow legality, and runtime behaviour.
- application/runtime shells own assembly and placement.

Component Manager is a development/runtime validation surface for Shared UI
components. It must not become permanent component authority or a page-builder.

## Builder instruction

1. Confirm only `main` and `Project-work-instructions` exist remotely, then
   create one topic branch from current `main`.
2. Start from the Global Components Code Map, Foundation Studio Operating Model,
   repository map, and current web-runtime catalogue shell.
3. Add a concise Component Manager Code Map before source implementation.
4. Add a first-class `/component-manager/` route to the catalogue ecosystem,
   positioned after Global Components unless existing authority requires a
   different non-breaking placement.
5. Build only the **sandbox shell** in this phase. It should provide a clear
   isolated mount/work area ready to host a component candidate and controlled
   fixture/definition input later.
6. Do not register or implement Admin Shell, Drawer, Data Card, Collection,
   forms, domain records, adapters, or product-specific behaviour yet.
7. Do not invent new WEX visual values. Use existing WEX foundations/DNA and
   existing catalogue-shell presentation.
8. Keep Component Manager authority separate from component authority: future
   components retain their own schemas/contracts/Code Maps/ADRs where required.
9. Add focused route/navigation/accessibility tests proving the sandbox exists
   and contains no registered component implementation yet.
10. Run focused tests, `git diff --check`, `pnpm check`, and Chrome
    desktop/compact + light/dark + keyboard/focus validation.
11. Commit/push one candidate, update this same work file to
    `AWAITING REVIEWER REVIEW` with exact SHA/evidence, and stop.

## Next boundary

After Component Manager is accepted and live, the next separately authorised
work is the **Admin Shell** structure: Header, Sidebar, Body/Main, Footer.
Drawer and later components are developed/corrected in Component Manager before
being plugged into that shell.
