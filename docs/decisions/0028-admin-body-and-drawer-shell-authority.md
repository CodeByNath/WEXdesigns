# 0028: Admin Body and Drawer Shell Authority

## Status

Accepted — Owner-authorised direct UI release, 2026-10-28.

## Decision

Admin Station owns two direct, empty application-shell allocations beside its
existing Sidebar: Admin Body and Admin Drawer. They are sibling shell regions,
not reusable components and not variants of Header Results.

Admin Body fills the workspace remaining after the Sidebar. Admin Drawer uses
that same remaining workspace in one of three approved allocation modes:
Default, Half, or Full. The Sidebar remains the first allocation and neither
shell duplicates, infers, or covers Sidebar sizing.

## Boundary

Both shells use the same closed owner/request boundary shape as Header Results.
The shell records the current owner and exposes only placement, visibility,
sizing, and scroll allocation. A requesting feature does not couple to the
shell DOM.

One current owner may use each shell allocation at a time. The requester owns
its action, content, state, and replacement of any earlier mounted content.
The shell does not supply records, placeholders, padding, decorative styling,
or business behaviour.

The Dashboard View action is the first demonstration. It requests the Dashboard
Body and default Drawer allocations and mounts its test label in the Drawer.
That label is Dashboard content; it is not inherited by future Services or
other Drawer requesters.

## Consequences

Features may request either shell independently or both allocations together,
but must provide their own mounted content. New requesters reuse the approved
request boundary and WEX layout relationship rather than copying Sidebar
dimensions, positioning rules, or Dashboard content.

## Amendment: Drawer compartments (Owner-directed, 2026-11-03)

The Owner directed that Admin Drawer is a complete shell rather than a single
empty region. It contains four content-empty compartments: Header, Sidebar,
Body, and Footer. The Sidebar spans the Drawer's full height at the collapsed
Admin Sidebar rail size; Header, Body, and Footer stack beside it. Body is the
Drawer's scroll boundary; the other three hold their allocation.

The compartments sit inside one Drawer frame carrying the subtle border and
the large radius; the Drawer shell element itself keeps only placement, mode,
and its overflow boundary, unchanged.

Compartment styling uses only existing WEX tokens (spacing, border, layer
colour, and the Admin shell sizing variables). No token was created, changed,
or amended. A requester mounts content into a compartment and still owns that
content and its state; the compartments supply no records, copy, controls, or
business behaviour. The open owner/request boundary, the three allocation
modes, and the Body shell above are unchanged.

This decision preserves ADR 0026 as the authority for Header Results. The
shared request-boundary shape does not make Body or Drawer Header components or
create a global surface-content family.

## Owner-directed footer actions — 2026-11-09

The Drawer footer holds Close at its start and Save and Publish at its end.
Save is disabled while there is nothing to save. When a requester reports
something to save or discard (`setAdminDrawerDirty`), Save enables and Discard
replaces Close at the start; using Save or Discard clears the state, which hides
Discard and restores Close. Save and Discard emit `wex:admin-drawer-save` and
`wex:admin-drawer-discard` on the Admin shell; the requester owns what they do.
Only existing Small Button variants and spacing tokens are used; no token was
created.

## Owner-directed Drawer Sidebar tabs — 2026-11-09

The Drawer Sidebar prints the tabs a requester supplies in its request
(`sidebar: [{ id, label, icon, active? }]`, icons from the existing system
icons). They use the Tab Navigation Small tier tokens and are icon only in every
Drawer mode: there is no label text, no pin or unpin control and no separate
panel. Hovering or focusing a tab previews its section in the existing Drawer
Body shell, leaving returns the Body to the selected tab's section, and clicking
a tab selects it. The change is emitted as `wex:admin-drawer-tab`
(`{ id, preview }`) on the Admin shell; the requester mounts the section into
`adminDrawerCompartment(shell, 'body')` and owns its content. The Body carries
`data-admin-drawer-body-preview` while previewing. No token was created.

## Owner-directed Drawer overlay — 2026-11-10

While the Drawer is open, a glass overlay covers only the Admin Body (the main
area), not the Header, the Sidebar or the Drawer. It is a `::before` of the Admin
shell in the main grid area that uses the WEX Overlay Glass tokens (ADR 0036):
the large radius, a 35% tint of the primary background and a 1px blur.

## Owner-directed Presentation section and header status — 2026-11-12

The Add New requester (`admin-station-products.js`) passes four Sidebar tabs and
prints the shown section's name in a new line right below the Drawer Header
label (`data-admin-drawer-header-location`). The first tab, Presentation, prints
straight into the Drawer Body shell, with no wrapper: a two-column Product
Summary (title and label and value rows at the start, the framed image with its
ID chip at the end), a 1px edge to edge separator, the Promotions row (label,
green Active pill with its count in a circle on the pill's top right corner, and
a subtle See all, disabled when nothing is active), the two promotion cards (each
with a small View and Edit dropdown) and the Notifications label.

### Promotion cards data — 2026-11-13

The preview promotions are Black Friday (By Jake Harper) and Adults at kids
Price (By Amanda Collins), both Jan 10, 2024 to Jan 31, 2024 for New Customers.
A card prints the start and the end date in two rows, each with the calendar
icon, then the audience with the user-group icon.

The first Add New Sidebar tab (Presentation) uses the presentation-chart-bar
icon and the second (Pricing) uses the tag icon.

The Drawer Header status pill follows what is pending: with pending items it is
Pending and carries their count in the same circle; with none the count is hidden
and the pill is the requester's Active or Disabled. The notification module
reports its action-required count through the optional `onActionRequiredChange`
option. A zero count is never shown in the Drawer.

Boundaries: only existing tokens are used, apart from the 35% overlay tint
recorded in ADR 0036 and the label chip classes reused from the Pill
Notification Status tokens. The data (the six PADI courses of
qldscubadive.com.au/padi-courses-gold-coast, plus the product code PFT4KA, the
rating, the language and the promotions) is preview fixture data until the
product feed is connected. Nothing outside the Drawer was changed.
