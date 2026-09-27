# Global Tokens / Typography DNA

Status: BUILDER ACTION REQUIRED
Phase: 3A — Owner presentation correction before Global Tokens closeout

## Reviewer verdict

**Proceed with safeguards**

Current promoted `main`: `b3e12319439bb53d873a80957f50446780940cd5`.
Existing topic branch: `feat/global-tokens-typography`.

## Owner correction

This is a presentation + authority-description correction only. Do not change
WEX CSS foundations, Typography CSS/classes, token definitions, token storage,
or resolved values.

The Global Tokens presentation should communicate the WEX Design Token hierarchy
independently of how the underlying CSS tokens are physically stored.

1. Present the canonical tier flow in this order:
   **Large -> Default -> Small**.
2. For Heading, treat **Heading Default** as the base Design Token.
3. Treat **Large** and **Small** as registered **Size attributes** of that
   Heading Default Design Token, parallel to the existing registered
   Colour, Weight, and Style attributes.
4. Size / Large and Size / Small change only size/rhythm by referencing the
   already-existing Heading Large or Heading Small Typography classes/tokens.
   They inherit the Heading Default token's remaining concerns.
5. Typography continues to own the actual Large / Default / Small values and
   classes. The Design Token layer owns only the governed relationship.
6. Registered attributes should show the Heading Default base first, then:
   - Colour / Light
   - Colour / Accent
   - Weight / Bold
   - Weight / Thin
   - Style / Italic
   - Size / Large
   - Size / Small
7. The attribute showcase should remain centred and wrap naturally using the
   existing presentation system.
8. Do not create or move CSS tokens, duplicate values, add a typography family,
   create a component API, or establish a parallel token system.

## Required Builder correction

On the existing topic branch only:

- amend ADR 0012 only as needed to describe Heading Default as the base Design
  Token with sparse Colour / Weight / Style / Size attributes;
- remove wording that says Size cannot be a Design Token attribute;
- update the Global Tokens Code Map only where its descriptive boundary
  conflicts with this Owner model;
- reorder the runtime presentation Large -> Default -> Small;
- update Registered attributes to show Heading Default as the base followed by
  the seven attributes above, with Size / Large and Size / Small last;
- use only existing WEX Typography classes/tokens to render those size
  attributes;
- **do not edit WEX foundation CSS, Typography CSS, Colour CSS, custom-property
  definitions/storage, or introduce new visual values**;
- avoid `catalogue.css` changes unless the requested centred/wrapping
  presentation is impossible with existing rules; if CSS appears necessary,
  stop and record the exact layout gate instead of changing it silently;
- strengthen focused tests for Large -> Default -> Small ordering, Heading
  Default base presentation, and Size / Large + Size / Small attributes;
- run focused tests, `git diff --check`, `pnpm check`, and Chrome
  desktop/compact + light/dark + keyboard/focus validation;
- push the correction to the same topic branch and update this same work file
  to `AWAITING REVIEWER REVIEW` with exact SHA/evidence, then stop.

Do not delete the topic branch or close this Global Tokens work until Reviewer
accepts this correction and the final hosted boundary.
