# 0037: WEX Icon Label Global Rule

## Status

Accepted — Owner-authorised direct UI session, 2026-11-15.

## Decision

WEX owns one global rule for a text label with an icon beside it: when the text
wraps onto a second line, the icon stays level with the first line. The row
(`.wex-icon-label`) aligns its items to the start and the icon
(`.wex-icon-label__icon`) is one text line high (`1lh`), so it carries the same
type class as its text and centres its glyph on the first line. This is the rule
the Promotion details already followed; it is promoted from the Promotion card
and generalised instead of being repeated in each component.

An icon may carry a status tone (`data-tone`), Owner-directed on 2026-11-15:
`success` (active, success, pass) is green, `warning` yellow, `error` red and
`info` (no action required) blue. The tones use the existing status background
tokens (`--wex-color-background-success`, `-warning`, `-error`) and
`--wex-color-icon-accent`.

The rule uses only existing foundations: the 8px spacing token for the gap, the
16px icon size token for the icon and the status colour tokens for the tones. It
creates no token, tier or mode.

## Consumers

The Promotion card title icon and detail icons, and the Activity card title icon
and time icon, use the rule and carry no local icon alignment rules. Any other
component that prints an icon beside a text label uses the same classes.

## Evidence

- Rule: `packages/wex/src/foundations/icon-label.css`
- Focused proof: `packages/wex/test/icon-label-foundation.test.mjs`
- Consumers: `apps/web-runtime/src/admin-station-promotions.js`,
  `apps/web-runtime/src/admin-station-activity.js`
