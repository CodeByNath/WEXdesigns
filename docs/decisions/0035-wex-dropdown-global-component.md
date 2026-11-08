# 0035: WEX Dropdown Global Component

## Status

Accepted — Owner-directed UI session, 2026-11-08.

## Decision

Global Components registers WEX Dropdown: the surface anchored directly beneath
a Header or a Drawer header that hosts one module. Default is the anchor
(`.wex-dropdown`) and has no size modes. The Owner's "Component Mode" attribute
is `data-wex-component-mode`, a space-separated list of a module and, optionally,
a size:

- `notification-module`: the Header notifications (448 × 512, the values the
  Header already requested, now held as tokens).
- `notification-module small`: the same module for the Drawer header,
  5 × the 64px space wide, with the Small row, icon and padding tokens.

The Header results shell and the Drawer header both use `.wex-dropdown`; the
Header's own rule keeps only the requested-size hooks that Search and Profile
still use. The Notification Module is one builder, `createNotificationModule`,
mounted by the Header bell and, in Small, by the Drawer header status pill. The
Drawer instance lists Action required notifications first.

## Boundaries

The Dropdown never supplies module content. The WEX Dropdown Menu (ADR 0033) is
the options popover and is unrelated. Tokens are declared on `.wex-dropdown`
because they resolve against the Admin shell's Header size. Small values come
only from existing WEX spacing and icon-size tokens.

## Evidence

- Canonical tokens and classes: `packages/wex/src/foundations/dropdown.css`
- Focused proof: `packages/wex/test/dropdown-foundation.test.mjs`
- Consumers: `apps/web-runtime/src/admin-station-notifications.js`,
  `apps/web-runtime/src/admin-station-drawer-notifications.js`
