# Admin Shell

Status: BUILDER ACTION REQUIRED
Phase: 1 — Build and validate minimal Admin Shell in Component Manager

## Reviewer verdict

**Proceed with safeguards**

Baseline `main`:
`32e4866edd6576edf2b6f86f5cffc446cf509e03`.

Component Manager is accepted and ready to host separately authorised Shared UI
component work.

## Owner direction

Build the first **Admin Shell** as a reusable Shared UI structure and validate it
inside Component Manager before any product/runtime integration.

Initial shell regions are only:

- Header
- Sidebar
- Body / Main
- Footer

The shell is not a page, not the business Admin Station, and not domain
authority. Later components such as Drawer are plugged into it after being built
and corrected in Component Manager.

## Authority boundary

- WEX owns visual/layout/responsive/interaction presentation.
- Shared UI owns the reusable shell structure, rendering mechanics,
  interaction mechanics, and accessibility mechanics.
- runtime applications own mounting/assembly.
- consuming products own domain data, permissions, lifecycle, validation, and
  workflow legality.

The shell must remain data-agnostic. Do not embed product identity, records,
navigation data, persistence, permissions, or business behaviour.

## Builder instruction

1. Confirm only `main` and `Project-work-instructions` exist remotely, then
   create one topic branch from current `main`.
2. Start from:
   - `docs/code-map/component-manager.md`
   - `docs/code-map/layout.md`
   - `docs/foundation/studio-operating-model.md`
   - `docs/architecture/repository-map.md`
3. Create an Admin Shell Code Map before implementation.
4. Implement the smallest reusable Admin Shell structure under Shared UI with
   semantic Header, Sidebar, Main, and Footer regions/slots.
5. Consume existing WEX layout, spacing, geometry, typography, colour,
   interaction, and responsive authority. Do not invent local visual values or
   duplicate WEX breakpoint logic.
6. Mount the Admin Shell candidate inside Component Manager's isolated preview
   so Large, Medium, Compact, Fluid, light/dark, keyboard/focus, and landmark
   semantics can be corrected before runtime-shell adoption.
7. Use neutral fixture labels/content only as sandbox evidence. Fixtures must
   remain Component Manager test/demo input, not shell authority or schema.
8. Do not add Drawer, Data Card, Collection, forms, domain records, adapters,
   routing, persistence, permissions, product navigation, or real Admin Station
   behaviour.
9. Do not create a new serializable/schema contract unless current repository
   authority already requires it. If a new cross-runtime contract is necessary,
   stop at that architecture gate and report the exact decision required.
10. Add focused Shared UI + runtime tests proving region structure,
    accessibility landmarks, WEX consumption, sandbox mounting, responsive
    behaviour through the real Component Manager iframe, and absence of domain
    behaviour.
11. Run focused tests, `git diff --check`, `pnpm check`, and Chrome
    validation across all Component Manager viewport modes and themes.
12. Commit/push one candidate, verify remote SHA, update this same work file to
    `AWAITING REVIEWER REVIEW` with changed files, checks, browser evidence,
    limitations/architecture gates, and stop.

## Boundary

This phase proves the **minimal Admin Shell component only**. Runtime Admin
Station integration and later pluggable components are separate authorised
phases.
