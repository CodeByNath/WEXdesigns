# Global Tokens / Typography DNA

Status: BUILDER ACTION REQUIRED
Phase: 3D — Promote final Global Tokens presentation and verify hosted result

## Reviewer verdict

**Proceed**

Accepted candidate: `feat/global-tokens-typography` at
`5ff024f94d555648136839e27044b77bb90655ff`, one commit directly ahead of
`main` `ca42918152a930700c2cd5f440c94d8723e31d8f`.

## Reviewer findings

The final presentation cleanup matches the Owner correction:

- the redundant Canonical vocabulary / Large / Default / Small showcase is
  removed from `/global-tokens/`;
- Heading Default remains the sole base Design Token presentation;
- registered attributes remain ordered Colour / Light, Colour / Accent,
  Weight / Bold, Weight / Thin, Style / Italic, Size / Large, Size / Small;
- Size attributes continue to use existing Heading Large/Small Typography
  classes only;
- `Colour / Light` now maps to existing `--wex-color-white` in ADR 0012,
  presentation selectors, and focused tests;
- no WEX Colour foundation, Typography foundation, primitive/custom-property
  storage, schema, component API, or raw visual value changed;
- the only CSS changes are the two pre-existing Global Tokens Light-demo
  selectors authorised for this correction;
- focused tests no longer require the removed tier showcase and guard the base
  token, attribute order, Size mappings, and exact White mapping.

Builder reported `git diff --check`, focused tests (9/9), `pnpm check`
(35/35), and local Chrome validation passed. GitHub exposes no candidate
status/workflow run before promotion.

## Builder instruction

Using the existing topic branch only:

1. Reconfirm remote `feat/global-tokens-typography` resolves exactly to
   `5ff024f94d555648136839e27044b77bb90655ff` and `main` has not changed
   unexpectedly.
2. Promote that exact candidate to `main` without widening or rewriting it.
3. Verify the exact remote `main` SHA.
4. Inspect the resulting GitHub Pages deployment/workflow.
5. Validate the hosted `/WEXdesigns/global-tokens/` page in Chrome for:
   simplified Registered attributes-only presentation; Heading Default base;
   correct seven-attribute order; visibly white Colour / Light specimen;
   desktop/compact; light/dark; keyboard focus; skip-link transfer.
6. Do not begin any new work or unrelated cleanup.
7. Keep the topic branch until Reviewer verifies promoted source and hosted
   behaviour.
8. Update this same work file to `AWAITING REVIEWER REVIEW` with exact promoted
   SHA, Pages evidence, hosted browser result, and any limitation; stop.

## Closeout boundary

After Reviewer independently verifies the promoted source and hosted page, the
topic branch can be removed and this Global Tokens work closed.
