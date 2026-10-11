# Header / Admin Station Shell

Status: BUILDER ACTION REQUIRED
Phase: Fix real Header shell presentation

## Owner direction

Fix the Admin Station shell starting with the **Header shell only**.

Current live/browser evidence shows the Header's 64px element sitting inside an
implicitly stretched grid row, leaving a large empty band before Sidebar/Main.
That presentation is not acceptable.

## Verified cause

On `main` at
`046b9bf3dae1f645565019d01ac32e15df54b7d0`:

- `.wex-admin-shell` has `min-block-size: 100vh`;
- it declares grid areas/columns but **no explicit grid-template-rows**;
- Header itself correctly declares a 64px block size;
- therefore free block-space is distributed across implicit grid rows instead
  of keeping the Header row at its owned 64px height.

## Builder work package — Header shell only

1. Read current Admin Station runtime, WEX layout/header foundations, ADR 0021,
   ADR 0022, and Header/Admin Shell Code Maps before editing.
2. Correct the Admin Station grid row sizing so the Header row is exactly the
   accepted 64px Header height and no stretched blank Header row remains.
3. Keep `.wex-admin-shell__header` as the one real Header shell.
4. Preserve the existing fitted Logo and Brand compartment; verify Logo is
   visibly rendered inside the 64px × 64px Brand allocation.
5. Preserve current Header background, bottom border, WEX values, and compact
   padding rules unless a verified conflict requires correction.
6. Do not redesign Sidebar, Main, or Footer. They may remain empty structural
   regions in this package.
7. Verify Header behaviour at:
   - Large/Desktop
   - 1024px
   - 767px and below
   - light and dark themes
8. Capture browser evidence showing there is no large empty band between Header
   and the next shell row.

## Hard exclusions

No Location, Search, Navigation System, Main Action, Sidebar redesign, Main
redesign, Footer redesign, CompuZign adapter/API work, Identity Phase 7, new
Header abstraction, or new WEX visual values.

## Acceptance target

The Admin Station should now begin visually as:

```text
┌──────────────────── Header — 64px ────────────────────┐
│ [ Logo / Brand 64×64 ]                                │
├───────────────────────────────────────────────────────┤
│ next Admin Station row begins immediately             │
```

The Header must not occupy or reserve a stretched viewport-height row.

Run focused tests, `pnpm check`, `pnpm audit:foundation`,
`git diff --check`, and browser proof. Push one bounded topic branch, update
this same work file to `AWAITING REVIEWER REVIEW` with exact SHA and evidence,
then stop.
