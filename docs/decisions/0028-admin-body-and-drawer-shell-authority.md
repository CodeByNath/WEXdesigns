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
with a small View and Edit dropdown) and the Notifications label (replaced by
the Activity row, see below).

### Promotion cards data — 2026-11-13

The preview promotions are Black Friday (By Jake Harper) and Adults at kids
Price (By Amanda Collins), both Jan 10, 2024 to Jan 31, 2024 for New Customers.
A card prints the start and the end date in two rows, each with the calendar
icon, then the audience with the user-group icon.

The first Add New Sidebar tab (Presentation) uses the presentation-chart-bar
icon and the second (Pricing) uses the tag icon.

### Activity — 2026-11-12

The Notifications label in Presentation became **Activity**: the log of product
activity (Product price updated, New order created, New review). Like
Promotions it prints a label row with a subtle See all (disabled when nothing is
logged), then the two most recent activities as cards, one per row (single
column), in `admin-station-activity.js` and `.css`. Each card follows the Note
card design: an icon (tool for product edits, cart for orders, user for reviews; Heroicons
outline system icons) and the title at the
start of a header, the time (calendar icon), a
divider and a Small Option Button (View and Edit, `wex:admin-activity-action`)
at the end, a line under the header, then the description. The options button
is the one the promotion cards use (`createOptionsMenu`). No avatar or
attachments. Existing tokens only; no
new token, inline style or component. The data is preview data until a provider
supplies the log.

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

## Owner-directed Product Summary refinements — 2026-11-15

The Add New Presentation Product Summary lists Platform ID (the platform
identifier, regular weight, no pill) first and Booking ID (the Rezdy product
code, bold) second; the ID chip under the image is removed. The image column is
0.6fr beside the 2fr content area, 40% narrower than before, so the content area
gets the room. The 0.6fr share is an Owner-directed value, not a token. No token
was created and nothing outside the Drawer Presentation section changed.

## Owner-directed mobile Drawer Sidebar — 2026-11-15

At the mobile breakpoint (max-width 767px, the existing Admin shell breakpoint)
the Drawer Sidebar tabs stay icon only but sit in one horizontal row below the
Header and above the Body, instead of in a column beside it. The tabs, tokens
and states are unchanged; only the frame grid, the Sidebar border and the tab
list direction move to the row layout. Above the breakpoint nothing changes. No
token was created; the rules live in `drawer-sidebar.css` because `layout.css`
is at its line cap.

## Owner-directed Product Summary Labels alignment — 2026-11-15

When the Labels chips run onto a second row, the Labels label moves from
centred on the first chip to the top of its area (`align-items: flex-start`
with the existing chip-height minimum), like the text rows. On one row it stays
centred on the chip. The Product Summary marks the wrapped state on the chips
list with `data-wrapped`, set by a resize observer; the CSS reads that marker.
No token was created.

## Owner-directed Product Summary Labels top border — 2026-11-15

The Labels row's label (`dt`) and its value (`dd`) each carry a 1px top border
in the subtle border colour, at every width. The rule uses the existing
`--wex-border-width-default` and `--wex-color-border-subtle` tokens in
`admin-station-product-summary.css`. No token was created.

## Owner-directed Product Summary Labels label at the top — 2026-11-15

The Labels label sits at the top of its row at every width, like the text rows.
This replaces the wrapped-only alignment (`data-wrapped`, the resize observer
and the chip-height centring of the label) and removes the 1px top border on
the Labels label and value. The row already aligns its cells to the start, so no
Labels-specific rule remains. No token was created.

## Owner-directed revert of the all-width Labels label alignment — 2026-11-15

The all-width top alignment of the Labels label is reverted. The Labels label
is again centred on the first chip row and moves to the top only when its chips
wrap onto a second row (`data-wrapped`, set by a resize observer). The 1px top
borders on the Labels label and value stay removed. No token was created.

## Owner-directed Product Summary image shell and small-device wrap — 2026-11-15

The Product Summary image shell is rounded 16px at every width. There is no 16px
radius token, so the 16px space token carries the Owner-directed value. On small
devices (max-width 767px) the image floats at the end, out of the column, with
the width the 0.6fr column gave it. Nothing runs over it: the title and the rows
beside it break their lines at the image edge, and rows below it use the full
width. The image comes first in the DOM so it can float; above the breakpoint
the grid places it in the end column as before. Because each row now wraps the
image on its own, the rows no longer share one label column on small devices:
every row gets the same label width (`9ch`, wide enough for the longest label).
That `9ch` is not a token; the Owner approved it on 2026-11-15. No token was created.


## Owner-directed icon beside wrapping text — 2026-11-15

An icon beside a text label in the Drawer Body stays level with the first line
when the text wraps. The Owner made this a global rule: WEX Icon Label
(`.wex-icon-label`, ADR 0037). The Promotion card and Activity card icons use it
and carry no local alignment rules. No token was created.

## Owner-directed Promotion cards share every row — 2026-11-15

The two Promotion cards share the list's rows for the header and for each of the
four details (owner, start, end, audience): the card spans five rows and its
details list spans four, both as subgrids. When a title or a detail wraps in one
card, the matching row of the other card keeps the same line, so the dates sit
on the same axis. The spacing between details stays 8px and between the header
and details 12px. No token was created.

## Owner-directed Promotion cards flow one to a row when narrow — 2026-11-15

The Promotion cards sit two to a row. When a card would be narrower than 160px,
the width the Owner saw at the narrow Drawer, each card flows in a row of its own
(`repeat(auto-fit, minmax(...))`). The 160px is written as 2.5 times the 64px
space token; the rows stay shared between the cards of one row. No token was
created.

## Owner-directed Activity time never splits — 2026-11-15

The Activity time stays on one line (`white-space: nowrap`). When the title and
the time with its options button do not fit on one row, the card header wraps
and the time and button take a second row, at the end. No token was created.

## Owner-directed Activity header layout — 2026-11-15

The Activity time uses a clock icon (a new Heroicons `clock` system glyph, MIT)
instead of the calendar. The options button sits at the top end of the card
header, with its divider running the full height of the header. When the title
and the time do not fit on one row, the time takes a row of its own, aligned to
the start; it never breaks inside itself. This refines the earlier rule that
moved the time and button to a second row together. No token was created.

## Owner-directed identical Activity cards — 2026-11-15

The Activity cards always look identical. When the time does not fit beside the
title in any one card, every card puts its time on its own row, aligned to the
start. The list is marked `data-time-stacked` by a resize observer that measures
the cards with the marker off on each width change; the CSS reads the marker. No
token was created.

## Owner-directed Activity options button centred — 2026-11-15

The Activity options button is centred vertically in its cell, which keeps the
full-height divider, instead of sitting at the top. Its menu opens just below
the button. This refines the earlier top placement. No token was created.

## Owner-directed Activity time above the title — 2026-11-15

When the Activity cards stack their time on a row of its own, the time sits above
the title and the title below it (visual order only, `order: -1` on the time).
With room on one row the title stays at the start and the time beside it. No
token was created.

## Owner-directed revert of the Activity time above the title — 2026-11-15

The swap is reverted: when the Activity cards stack their time on a row of its
own, the time sits below the title again, in the order of the markup. No token
was created.

## Owner-directed status tones on title icons — 2026-11-15

The Promotion and Activity title icons are coloured by status through the global
Icon Label tone (ADR 0037): green for active, success and pass, yellow for
warning, red for errors and blue for no action required. The preview data is
assigned as follows: both promotions are success (Active); Product price updated
is info, New order created is success and New review is warning. These
assignments are preview values. No token was created.

## Owner-directed Activity times share a left edge — 2026-11-15

The Activity cards share three grid columns (title, time, options): the list is
the grid and each card and header is a subgrid, so every time starts at the same
left edge. The title column is at least as wide as the longest title. When the
shared columns overflow the list, the resize observer marks the list
`data-time-stacked` and every card gives its time a row of its own below the
title. This replaces the earlier flex-wrap header. No token was created.
