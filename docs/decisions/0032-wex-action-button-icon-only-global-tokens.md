# 0032: WEX Action Button Icon Only Global Tokens

## Status

Accepted — Owner-authorised direct UI session, 2026-11-02.

## Decision

Global Tokens registers WEX Action Button Icon Only with a Small mode for a
square action button that shows one icon and no visible label. It is promoted
from the Services Manager Columns, List and Filter tools.

The Small mode references only existing WEX foundations: the Small Button
target size and the Small Button icon size. It adds no colour, border, radius
or state; the button keeps the tone, border, radius and interaction of its
`wex-button` classes. The presentation class is
`.wex-action-button-icon-only--small`. Default and Large modes are registered
only when a consumer needs them.

## Boundaries

This registers presentation tokens only. It does not define a command, menu,
split behaviour or accessible name; the consuming component supplies its own
`aria-label`, icon and interaction. Overview consumes it for the split action
(Add new and its menu toggle) and the Services Manager for its tools.

## Evidence

- Canonical tokens and class:
  `packages/wex/src/foundations/action-button-icon-only.css`
- Focused proof: `packages/wex/test/action-button-icon-only-foundation.test.mjs`
- Global Tokens catalogue: `apps/web-runtime/global-tokens/index.html`
- Consumers: `apps/web-runtime/src/admin-station-overview.js`,
  `apps/web-runtime/src/admin-station-services.js`
