# Admin Shell

Status: BUILDER ACTION REQUIRED
Phase: 2 — Promote accepted Admin Shell candidate

## Reviewer verdict

**Proceed with safeguards**

Baseline `main`:
`32e4866edd6576edf2b6f86f5cffc446cf509e03`.

Accepted candidate:
`feat/admin-shell` at
`f75afb8524c272f62708cc64d163980176150f07`.

## Reviewer acceptance — corrected Phase 1

Reviewer independently inspected the pushed candidate against `main`.

The correction resolves the prior architecture defect:

- Shared UI now exposes a zero-argument fixed Admin Shell structure;
- the reusable API accepts no caller-supplied HTML/slot markup;
- Header, Sidebar, Main, and Footer are empty named mount regions;
- neutral sandbox fixtures are created by Component Manager with DOM nodes and
  `textContent`, then appended into those regions;
- no schema, adapter, domain data, Drawer, Data Card, Collection, routing,
  persistence, permission, or product behaviour was introduced.

The resulting candidate remains two commits ahead because it contains the
initial rejected implementation plus the bounded correction; the resulting tree
matches the approved boundary.

WEX presentation remains limited to existing tokens and existing responsive
thresholds. The Component Manager continues to exercise the real isolated
preview context rather than duplicating breakpoint logic.

Builder-reported focused tests, `pnpm check`, foundation audit,
`git diff --check`, and local Chrome validation passed. Those browser results
are candidate-local evidence; hosted behaviour remains a separate post-promotion
boundary.

## Promotion safeguards / Builder instruction

1. Fast-forward accepted candidate
   `f75afb8524c272f62708cc64d163980176150f07` to `main`; do not alter
   implementation source during promotion.
2. Verify remote `main` equals that exact SHA.
3. Verify the GitHub Pages deployment succeeds for the same SHA.
4. Validate hosted Component Manager in Chrome with the Admin Shell mounted:
   Large 1440px, Medium 1024px, Compact 767px, Fluid, light/dark, keyboard/focus,
   and Header/Sidebar/Main/Footer landmark structure.
5. Confirm the shell remains structurally empty before Component Manager fixture
   population and no domain/product behaviour appears in the hosted result.
6. Delete `feat/admin-shell` only after promotion and hosted verification are
   proven safe.
7. Verify remote heads return to exactly `main` and
   `Project-work-instructions`.
8. Update this same file to `AWAITING REVIEWER REVIEW` with exact promotion,
   Pages, hosted-browser, and branch-housekeeping evidence; stop.

## Boundary

This promotion accepts only the minimal reusable Admin Shell component.
Runtime Admin Station integration and later pluggable components remain
separate authorised phases.
