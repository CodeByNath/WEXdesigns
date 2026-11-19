# ADR 0028 companion: Drawer product presentation

Part of [ADR 0028](0028-admin-body-and-drawer-shell-authority.md). Existing
product-presentation notes moved here without changing their meaning to keep
the parent document within the repository file-length limit.

## Full-mode Presentation composition — Owner-directed, 2026-11-17

In Full mode, the Drawer Sidebar's existing icon tabs form one row immediately
below the Header. The Footer spans the frame. Other modes retain their existing
Sidebar and content arrangement.

Add New Presentation adds the Owner-supplied numbered product navigation:
Overview, Pricing, Description, Media, Snapshot, Meeting, Itinerary, Info,
Product Keywords, and FAQ / Booking. Overview is selected initially and displays
the existing Product Summary. The other product sections have no content yet.
Selection uses native buttons and the registered Tab Navigation Small Dropdown
family. The navigation appears only in Full mode.

Full Presentation places product navigation at the start, the selected product
section in the first content column, and the existing Promotions and Activity
units stacked in the second content column. The two content columns split their
available space 60% left and 40% right, excluding the navigation and gaps
(Owner-directed, 2026-11-17). Save and Publish end at the right edge of the
left content column; the Body and Footer share the same grid tracks. Close or
Discard stays at the Drawer start. Compact Full restores the existing footer
row. Product Summary has no bottom border in Full mode. Existing content nodes
are moved by CSS grid placement, never cloned. At the existing compact Drawer boundary, the
product navigation scrolls horizontally and content stacks without overlap.
No new visual token or Global Component is registered.

## Full Drawer shell allocation — Owner-directed, 2026-11-17

Supersedes the 60% / 40% split above. In Full mode the Drawer has three shells:
product navigation, main content and connections (Promotions and Activity). They
share the Drawer width 2 : 5 : 3, excluding the insets and gaps. The navigation no
longer sizes to its content. The 720px content maximum is kept: one part stops at a
fifth of it, so main content stops at 720px (navigation 288px, connections 432px) and
the ratio holds; the extra width is not spread. The navigation is also capped at 220px
(3 x the 64px space plus the 24px and 4px spaces, Owner-directed), so it stops there
and the 288px above no longer applies. Full only; other modes and
compact Full are unchanged. `admin-station-drawer-full.css`; behaviour check in
`admin-station-product-sections.test.mjs`. No token was created.

In desktop Full the three shells each run the full Drawer height, with the Footer at the
bottom of the main content shell only (Owner-directed, 2026-11-17): the Footer is placed in
the main content column, so Close and Save/Publish align with the main content and the
Footer shares the main content start and end borders (`--wex-border-width-default`,
`--wex-color-border-subtle`) and its top line. The Body spans the Body and Footer rows, the
shells carry their own 16px start padding, and the main content shell ends above the Footer.
The frame takes the Drawer layer colour so the shells show through nowhere. The Promotions
line stretches across the whole connections shell, from the main content border to the
Drawer end, with its content kept 24px and 16px in (Owner-directed). In desktop Full the navigation,
main content and connections shells each scroll on their own when their content is taller
than the Drawer (Owner-directed): the Body does not scroll, and Promotions and Activity
are grouped in a connections shell (`wex-admin-drawer-connections`) so they scroll together.
The Body keeps the same three shells in every view (navigation, main content, connections;
Owner-directed, 2026-11-18): they are real shells, never `display: contents`. Desktop Full
places them side by side; every other view stacks them, the navigation showing only in Full.
Stacked, the main content shell carries the 1px section line edge to edge (it belongs to the
shell, not to the Product Summary), so the line stays whichever section the shell holds.
In stacked Full the horizontal navigation sits 8px below the icon strip and 8px above its line, and the section heading sits 8px below that line and 8px above its content (one `--wex-admin-shell-drawer-heading-gap`, 16px elsewhere); the Overview heading shows only in Full (Owner-directed, 2026-11-18).
See all sits under the Product Summary image in the same media column, 8px from it (Owner-directed, 2026-11-18).
The section step count uses the Promotions count badge look (Owner-directed, 2026-11-18). The shells end with a 16px inset
and an extra last track takes the remaining width, so the connections shell has a maximum
width too (24px + 3 parts + 16px) and does not spread. In desktop Full the Header start
and actions stay within the shell columns: the actions end where the connections shell
ends (Owner-directed). The main content shell
(`wex-admin-drawer-main`) is always present in Full: it owns the borders, padding and
scroll and loads the section the product navigation selects, so its borders stay when a
section without content is chosen (Overview loads the Product Summary). The navigation
shell has no border. Compact Full is unchanged. Other modes are unchanged. No token was
created.

Full Pricing section (Owner-directed, 2026-11-17): the main content shell loads Pricing as
labels and values, never inputs, from the reference Tour Product Editor. Advertised price,
a Price list (price in bold, then type with its note in small text beside it, or below it when
the line is tight), and Badges and Featured chips share one label column. Overview and Pricing
headings print the name with its "n / 10" step chip on one line, level with the first tab. The product navigation previews on hover or focus like the Drawer Sidebar tabs (Owner-directed, 2026-11-18); in both, the selected section returns only when the pointer or focus leaves the whole list, so crossing the gap between items does not flash it. Existing
tokens only; no token was created.

## Owner-directed Full Drawer boundary — 2026-11-18
Full product navigation and its compact composition become horizontal below
840px of Drawer frame width; at 840px and above, retain vertical navigation.
Product Summary’s content-backed See all opens existing Full navigation directly,
even when Full and Default widths match on mobile (Owner, 2026-11-18).

## Description presentation — Owner-directed, 2026-11-19

The Full Drawer's main content shell loads Description with the same section
heading, step count and label/value rows as Overview and Pricing. Product
description is bold read-only text; Quick Highlights uses Pricing's neutral
chips. Each highlight fills the same width and shares the content-driven height
of the longest highlight. Description rows have a 16px gap, including compact
views. Uses existing typography, spacing and chip tokens; no editor, persistence,
new token or Global Component. Reference copy remains preview data.

## Pricing section spacing — Owner-directed, 2026-11-19

Advertised price, Price list, Badges and Featured have the same 16px gap as
Description, including compact views, through `--wex-space-16`. The fare list
and chip gaps keep their existing values. Overview row spacing stays at 8px.
