# Admin Shell

Status: AWAITING REVIEWER REVIEW
Phase: 1 — Build and validate minimal Admin Shell in Component Manager

## Reviewer verdict

**Stop — architectural risk**

Baseline `main`:
`32e4866edd6576edf2b6f86f5cffc446cf509e03`.

Candidate reviewed:
`feat/admin-shell` at
`d08225c9fd9ad7e2d8be13ca964e60fe78b841b3`.

## Accepted scope

Build the first reusable Admin Shell under Shared UI and validate it in
Component Manager. Initial regions remain only:

- Header
- Sidebar
- Body / Main
- Footer

The shell is not a page, business Admin Station, domain authority, Drawer, Data
Card, Collection, form, or product navigation surface.

## Reviewer finding

The pushed candidate is one clean commit ahead of `main` and stays within the
authorised file area. Its WEX presentation uses existing tokens and existing
responsive thresholds; no domain/schema/product behaviour was added.

However, the Shared UI API currently accepts arbitrary HTML strings for all
four slots and returns them interpolated into markup:

`createAdminShellMarkup({ header, sidebar, main, footer })`

Component Manager then writes that result through `innerHTML`.

That is the wrong composition boundary for the intended dynamic system. The
Admin Shell should provide stable mount regions that later approved components
can be mounted into. It must not establish raw HTML payload injection as the
reusable shell contract. Besides creating an avoidable injection boundary, this
would make future component composition depend on serialized/rendered markup
instead of the controlled definition/component architecture.

Do not promote this candidate as-is.

## Builder correction instruction

1. Keep the correction inside this Phase 1 and existing `feat/admin-shell`
   branch.
2. Preserve the accepted semantic structure and WEX presentation:
   Header, Sidebar, Main, Footer; current WEX tokens; current responsive
   thresholds; Component Manager validation.
3. Remove arbitrary HTML strings from the reusable Admin Shell API.
4. Make the Shared UI shell expose stable empty structural mount regions only.
   The shell may render its fixed structural markup, but it must not accept
   caller-supplied HTML/markup payloads.
5. Keep neutral preview labels/content strictly in Component Manager fixture
   code. Mount them into the shell regions from the application preview rather
   than making fixture markup part of the Shared UI shell contract.
6. Do not add a new schema/definition contract merely to solve this correction.
   If stable component mounting cannot be achieved without a new cross-runtime
   contract, stop and report that architecture gate.
7. Add focused tests proving the Shared UI API accepts no raw slot markup,
   exposes exactly the four mount regions, and Component Manager can populate
   neutral fixtures without changing shell authority.
8. Re-run focused UI/runtime tests, `git diff --check`, `pnpm check`,
   foundation audit, and Chrome validation for all viewport modes/themes and
   landmark semantics.
9. Commit/push the bounded correction, update this file to
   `AWAITING REVIEWER REVIEW` with exact SHA/evidence, and stop.

## Builder correction handoff

Correction candidate: `feat/admin-shell` at
`f75afb8524c272f62708cc64d163980176150f07`, pushed and verified at
`origin/feat/admin-shell`.

The Shared UI API is now zero-argument fixed structural markup with exactly
four empty named landmark regions. Component Manager creates neutral fixture
nodes with `textContent` and appends them to those regions; raw fixture markup
is no longer part of the shell API.

Focused Shared UI/runtime tests, `pnpm check` (35 tasks),
`pnpm audit:foundation`, and `git diff --check` passed. Chrome local preview
validated Large 1440px, Medium 1024px, Compact 767px, Fluid, light/dark,
landmarks, visible radio focus, and keyboard traversal without unexpected shell
controls. Pages is main-only, so live verification remains post-promotion.

## Boundary

Runtime Admin Station integration and later pluggable components remain
separate authorised phases.
