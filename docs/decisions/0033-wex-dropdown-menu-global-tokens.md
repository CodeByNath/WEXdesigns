# 0033: WEX Dropdown Menu Global Tokens

## Status

Accepted — Owner-authorised direct UI session, 2026-11-03.

## Decision

Global Tokens registers WEX Dropdown Menu with a Small mode for the popover
that lists the options of an action. It is promoted from the Services Manager
Columns, Filter, Status and item-action menus, and replaces the local copy the
Overview Add New menu had drifted into.

The container references only existing WEX foundations: spacing, the default
border width, the subtle border colour, the large radius and the primary
background. The rows reuse the registered WEX Tab Navigation Small Dropdown
contract for size, type, hover, selected and focus. The presentation classes are
`.wex-dropdown-menu--small` and `.wex-dropdown-menu__item--small`.

## Boundaries

This registers surface and row presentation only. The consumer keeps the
position, options, commands and accessible names; selected rows are marked with
`aria-pressed="true"`. Default and Large modes are registered only when a
consumer needs them.

## Evidence

- Canonical tokens and classes: `packages/wex/src/foundations/dropdown-menu.css`
- Focused proof: `packages/wex/test/dropdown-menu-foundation.test.mjs`
- Global Tokens catalogue: `apps/web-runtime/global-tokens/index.html`
- Consumers: `apps/web-runtime/src/admin-station-overview.js`,
  `apps/web-runtime/src/admin-station-services.js`
