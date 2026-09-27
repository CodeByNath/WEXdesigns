# Global Tokens / Typography DNA

Status: BUILDER ACTION REQUIRED
Phase: 3A — Owner correction before Global Tokens closeout

## Reviewer verdict

**Stop — architectural risk**

This is not a rejection of the promoted Phase 2 implementation. The Owner has
superseded one part of ADR 0012 before this Global Tokens work is closed, so the
same subject must be corrected before final live acceptance and branch closeout.

Current promoted `main`: `b3e12319439bb53d873a80957f50446780940cd5`.
Existing topic branch: `feat/global-tokens-typography`.

## Owner correction

Preserve the canonical Typography source and its existing Small / Default /
Large values. Change the Global Tokens model and presentation as follows:

1. Present the canonical tier flow in this order:
   **Large -> Default -> Small**.
2. For Heading Global Tokens, treat **Heading Default** as the base token.
3. Register **Size / Large** and **Size / Small** as sparse Heading Default
   attributes, alongside the existing colour, weight, and style attributes.
4. A Size attribute changes only Heading size/rhythm by referencing the existing
   Heading Large or Heading Small Typography tokens. It inherits Heading
   Default's remaining concerns; no size value is copied or invented.
5. Typography continues to own the actual Large / Default / Small values.
   Global Tokens own only the approved relationship/reference.
6. In the Registered attributes showcase, show Heading Default first with its
   main/default presentation, then Colour / Light, Colour / Accent,
   Weight / Bold, Weight / Thin, Style / Italic, and finally the Size
   attributes.
7. Do not create a new typography family, raw size, component API, or parallel
   token system.

## Required Builder correction

On the existing topic branch only:

- amend ADR 0012 so it no longer says Size can never be a Global Token
  attribute; state the Owner-approved Heading Default + sparse Size attribute
  model above while preserving token-reference/inheritance rules;
- update the Global Tokens Code Map if its routing/boundary text conflicts;
- reorder the canonical presentation Large -> Default -> Small;
- update the Registered attributes showcase to include Size / Large and
  Size / Small after the existing attributes;
- keep `/global-tokens/`, existing Typography source values/classes, and all
  unrelated WEX foundations unchanged;
- strengthen focused tests for ordering, Heading Default base inheritance, and
  both registered Size attributes;
- run focused tests, `git diff --check`, `pnpm check`, and Chrome
  desktop/compact + light/dark + keyboard/focus validation;
- push the correction to the same topic branch and update this same work file
  to `AWAITING REVIEWER REVIEW` with exact SHA/evidence, then stop.

Do not delete the topic branch or close this Global Tokens work until Reviewer
accepts this Owner correction and the final hosted boundary.
