# 0034: WEX Option Button Global Tokens

## Status

Accepted — Owner-authorised direct UI session, 2026-11-03.

## Decision

Global Tokens registers WEX Option Button with Default and Small modes for the
three-dot action that opens the options of a component. Default is promoted
from the Notifications header options button; Small from the per-row actions of
Notifications and the Services Manager, which had carried separate copies.

Default is a 40px circular target with 8px padding and the More Action Default
icon allocation. Small is a 24px target with 4px padding and the Small Button
icon allocation. Both modes share one foreground (`--wex-color-text-primary`
for default, hover and pressed) and one focus behaviour: the ring shows for
keyboard focus only. All values reference existing WEX foundations; the circle
radius is half the Default target size. The presentation classes are
`.wex-option-button--default` and `.wex-option-button--small`, used with the
`wex-button` Subtle tone.

## Boundaries

This registers the button only. The popover is WEX Dropdown Menu (ADR 0033).
The consumer keeps the accessible name, the expanded state and the command.
The WEX More Action Small icon token (16px) is not consumed: the Small Button
icon rule resolves first, so Small renders the 14px Small Button icon, as it
did before this decision.

## Evidence

- Canonical tokens and classes: `packages/wex/src/foundations/option-button.css`
- Focused proof: `packages/wex/test/option-button-foundation.test.mjs`
- Global Tokens catalogue: `apps/web-runtime/global-tokens/index.html`
- Consumers: `apps/web-runtime/src/admin-station-notifications.js`,
  `apps/web-runtime/src/admin-station-services.js`
