# 0030: WEX More Action Global Tokens

## Status

Accepted — Owner-authorised direct UI release, 2026-10-29.

## Decision

Global Tokens registers WEX More Action Default and WEX More Action Small for
the existing horizontal three-dot action mark. Default references the existing
20px icon foundation; Small references the existing 16px icon foundation.

The token family provides only the icon allocation. It does not define an
action target, button appearance, menu, command, or domain behaviour. The
same system SVG is shared by the notification results component and service
cards; each consuming action retains its local Button tier and interaction.

## Evidence

- Canonical tokens: packages/wex/src/foundations/more-action.css
- Runtime system SVG factory:
  apps/web-runtime/src/admin-station-system-icons.js
- Consumers:
  apps/web-runtime/src/admin-station-notifications.js,
  apps/web-runtime/src/admin-station-services.js
