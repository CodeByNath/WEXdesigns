# 0038: WEX Action Button Label Only Global Tokens

## Status

Accepted — Owner-authorised direct UI session, 18 November 2026.
The Owner requested Label Only with a chevron and choices, then explicitly
selected primary accent for the Drawer consumer.

## Decision

Register WEX Action Button Label Only, mode Small Menu. One ordinary Small
Button contains a visible label followed by the existing system chevron-down.
Its class is `.wex-action-button-label-only--small-menu`.

The family references existing Small Button target and icon size, Button
inline padding and content gap. Typography, border, radius, focus, pressed,
hover and disabled states remain those of ordinary Small Button. The consumer
selects tone: the Drawer uses `wex-button--primary`. No new root values, joined
button geometry or separate click targets are introduced. Icon Only Small Menu
remains unchanged. The existing Dropdown Menu Default supplies menu surfaces
and rows; disabled rows use the existing Button disabled opacity once.

## Drawer consumer

Supersedes the earlier Footer action arrangement in ADR 0028. Close remains
at the start. The former Next label is replaced by Previous section and Next
section icon-only Small Neutral Buttons using system chevron-left / chevron-right.
They appear only in Full mode with product navigation. They select the preceding
or following section in Overview → Pricing → Description → Media → Snapshot →
Meeting → Itinerary → Info → Product Keywords → FAQ / Booking order. Previous
is disabled at Overview; Next is disabled at FAQ / Booking. Both stay visible
at the boundaries and follow selection, never temporary hover preview. The
newly selected navigation tab receives focus. Without navigation they hide.

The trailing action becomes the Label Only Small Menu.

The requester independently supplies `dirty` (unsaved changes) and
`publishable` (something is ready to publish) through
`setAdminDrawerActionState`. `setAdminDrawerDirty` remains available and does
not alter publish readiness. Every Drawer opening resets both flags to false.

- Publishable: trigger label Publish; choices Publish, Save, Discard.
- Not publishable: trigger label Save; choices Save, Discard.
- Superseded 2026-11-22 (ADR 0028, Footer single action button): Save and Discard
  are hidden, not disabled, without unsaved changes, and the trigger is hidden when
  nothing applies. Publish is available only when publishable.

The leading choice is also present in the menu so it can be executed: the
single label/chevron trigger opens choices rather than executing a command.
Choice buttons use native disabled semantics and menuitem roles. Arrow keys,
Home/End, Escape, Tab, outside click and focus leaving the menu are supported;
Escape restores trigger focus. The menu opens above the Footer.

Save, Publish and Discard emit `wex:admin-drawer-save`,
`wex:admin-drawer-publish`, and `wex:admin-drawer-discard` on the Admin shell.
These are UI requests only, with no backend/persistence implementation. The
requester reports success by updating state; a click never fabricates completion.

## Evidence routes

- `packages/wex/src/foundations/action-button-label-only.css`
- `packages/wex/test/action-button-label-only-foundation.test.mjs`
- `apps/web-runtime/src/admin-station-drawer-footer.js`
- `apps/web-runtime/test/admin-station-drawer-footer.test.mjs`
- `apps/web-runtime/global-tokens/index.html`
- `docs/code-map/global-tokens.md` and `docs/code-map/admin-shell.md`
