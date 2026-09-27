# Global Tokens / Typography DNA

Status: AWAITING REVIEWER REVIEW
Phase: 2 — Typography-aligned Global Tokens correction round

## Reviewer verdict

**Proceed with safeguards**

Reviewed candidate: `feat/global-tokens-typography` at
`a6df4aa39439021976d39393b9718f8caf30cb68`, one commit directly ahead of
`main` `21d41fd209621b6e107e964563a7f9f964e407b5`.

The architectural correction is aligned: Page Heading DNA is retired; ADR 0012,
Code Map, focused tests, and runtime now use the existing Heading / Title /
Navigation / Body vocabulary, preserve Small / Default / Large tier ownership,
keep Typography source/classes unchanged, retain token-reference/sparse-override
rules, and preserve `/global-tokens/`. No parallel component API or raw visual
value system was introduced.

## Safeguard required before promotion

The runtime presentation does not yet print the canonical token names
consistently. In the Small tier it renders `Heading`, `Title`, `Navigation`
and body prose beneath a separate `Small` section. The Owner direction requires
the visible presentation itself to use the Typography names directly:

- Heading Small / Default / Large
- Title Small / Default / Large
- Navigation Small / Default / Large
- Body Small / Default / Large

The current runtime test checks tier headings and class-name prefixes, so this
display-name regression can pass unnoticed.

## Builder instruction

On the existing `feat/global-tokens-typography` branch only:

1. Change the twelve base specimen labels so each visibly prints its exact
   canonical role + tier name, including `Heading Small`, `Title Small`,
   `Navigation Small`, `Body Small`, and the corresponding Default/Large
   names.
2. Strengthen the focused runtime test to assert those twelve visible canonical
   names, not only class prefixes/tier section headings.
3. Do not change the accepted ADR model, Typography values/classes, registered
   attribute mappings, route, layout architecture, or any unrelated source.
4. Run focused tests, `git diff --check`, `pnpm check`, and the same Chrome
   desktop/compact, light/dark, keyboard/focus validation.
5. Push the correction to the same topic branch, update this same file to
   `AWAITING REVIEWER REVIEW` with the exact remote SHA/evidence, then stop.

No promotion to `main` is authorised in this round.

## Builder correction handoff

Candidate: `feat/global-tokens-typography` at
`b3e12319439bb53d873a80957f50446780940cd5` (pushed to `origin`).

- Changed only `apps/web-runtime/global-tokens/index.html` and its focused
  runtime test. All twelve base specimens now visibly print their exact
  canonical role + tier name.
- The focused test now asserts each visible canonical name inside its matching
  Small, Default, or Large section rather than checking only class prefixes.
- Passed `git diff --check`, focused authority/runtime tests (9 passing), and
  `pnpm check` (35 successful tasks; only existing Turborepo warnings).
- Chrome local candidate preview passed desktop and compact layouts, light/dark
  switching, semantic heading exposure, keyboard focus visibility, and
  skip-link transfer to `#main-content`.

No promotion to `main` was performed. Stop for Reviewer review.

## Reviewer evidence

Remote heads remain within the three-branch limit:
`main`, `Project-work-instructions`, and `feat/global-tokens-typography`.
GitHub exposes no registered status checks or workflow runs for the submitted
candidate; Builder local check/browser evidence is therefore recorded but not
mistaken for CI or live Pages evidence.
