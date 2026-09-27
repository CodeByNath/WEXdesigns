# Global Tokens / Typography DNA

Status: BUILDER ACTION REQUIRED
Phase: 3C — Final Global Tokens presentation cleanup

## Reviewer verdict

**Proceed with safeguards**

Accepted/presented implementation is on `main` and
`feat/global-tokens-typography` at
`ca42918152a930700c2cd5f440c94d8723e31d8f`.

Owner browser validation passed the promoted surface. Two final corrections
remain inside this same Global Tokens work.

## Owner corrections

### 1. Remove redundant tier showcase

The separate **Canonical vocabulary / Typography + Global Tokens** block with
Large, Default, and Small role cards is no longer needed. The accepted Design
Token model already expresses the hierarchy:

```text
Heading Default = base Design Token

Attributes:
Colour / Light
Colour / Accent
Weight / Bold
Weight / Thin
Style / Italic
Size / Large
Size / Small
```

Remove that redundant showcase from the runtime presentation. Keep Registered
attributes as the primary showcase.

### 2. Correct Colour / Light mapping

`Colour / Light` must follow the intended hierarchy and reference
`--wex-color-white`, not `--wex-color-light`.

This is a Global Token relationship/presentation correction. Do **not** change
the WEX Colour foundation or redefine either primitive.

## Required Builder correction

Using the existing topic branch only:

1. Remove the Canonical vocabulary header and Large / Default / Small role-card
   sections from `/global-tokens/`.
2. Keep Registered attributes with Heading Default first, then Colour / Light,
   Colour / Accent, Weight / Bold, Weight / Thin, Style / Italic,
   Size / Large, Size / Small.
3. Correct ADR 0012 so Colour / Light maps to existing
   `--wex-color-white`.
4. Correct the Global Tokens runtime presentation so the Light specimen uses
   `--wex-color-white`. A narrowly bounded `catalogue.css` edit is authorised
   only for the existing Light presentation selector(s) that currently map to
   `--wex-color-light`; do not add a new token or raw colour.
5. Update the Global Tokens Code Map only where its description conflicts.
6. Update focused tests to remove requirements for the deleted tier showcase
   and to guard Heading Default plus all seven attributes, including the exact
   `--wex-color-white` Light relationship.
7. Do not edit WEX foundation CSS, Typography CSS, Colour foundation CSS,
   primitive/custom-property storage, schemas, component APIs, or unrelated
   presentation.
8. Run focused tests, `git diff --check`, `pnpm check`, and Chrome
   desktop/compact + light/dark + keyboard/focus validation.
9. Push to the same topic branch, update this work file to
   `AWAITING REVIEWER REVIEW` with exact SHA/evidence, and stop.

## Closeout boundary

This is the final correction inside the current Global Tokens work. After
Reviewer accepts the pushed result and verifies the hosted page, the topic
branch can be removed and this work closed.
