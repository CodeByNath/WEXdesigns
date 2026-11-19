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

The Drawer footer keeps Close at its start. Owner-directed Label Only Small
Menu actions, section arrows, availability and command ownership are now specified
by [ADR 0038](0038-wex-action-button-label-only-global-tokens.md), superseding
the former separate Save / Publish buttons and Discard replacing Close.

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

## Owner-directed zero-padded Activity times — 2026-11-15

Activity times print the hour with a leading zero (09:41 AM, 10:24 AM) so they
have the same width. The preview values are updated. No token was created.

## Owner-directed temporary hidden end-date icon — 2026-11-15

Temporary: the calendar icon of the Promotion end date row is hidden
(`visibility: hidden`, so it keeps its space and the text stays aligned). To be
reverted when the Owner asks. No token was created.

## Owner-directed revert of the hidden end-date icon — 2026-11-15

The temporary hidden calendar icon on the Promotion end date row is reverted;
both date rows show their calendar icon again. No token was created.

## Owner-directed Drawer Body max content width — 2026-11-15

The Drawer Body content no longer stretches without limit in the Half and Full
modes. The Drawer is a size container and the Body inset grows on both sides so
the content is at most the default Drawer inline size (560px, the existing
`--wex-admin-shell-drawer-default-inline-size`); at the default Drawer width the
inset stays the 16px Body padding, so nothing changes there. The edge to edge
lines under the summary and the promotions use the same inset
(`--wex-admin-shell-drawer-body-inset`). The width is the existing Drawer token,
chosen by the assistant for the Owner to confirm. No token was created.

## Owner-directed revert of the Drawer Body max width — 2026-11-15

The Drawer Body max content width is reverted (`drawer-body.css`, the size
container and the shared inset are removed); the Drawer Body is as before. The
width limit belongs to the Admin Body shell instead (next section). No token was
created.

## Owner-directed Admin Body shell max width — 2026-11-15

The Admin Body shell controls the width of what is mounted in it. The shell
stretches the full workspace, but its content is never wider than 1440px and is
always aligned to the left. The limit is the core value
`--wex-admin-shell-body-max-inline-size`, set to the existing
`--wex-layout-max-wide` (1440px, ADR and `layout.css`); mounted content applies
it from the shell rather than choosing its own. The Admin header and footer are
not limited. The rule lives in `admin-body.css` because `layout.css` is at its
line cap. No new design value was created.

## Owner-directed Drawer Body shell columns — 2026-11-15

The Drawer Body shell, not the mounted components, lays out the Body in columns.
Each column is at most 560px (`--wex-admin-shell-drawer-body-column-max-inline-size`,
set to the existing default Drawer inline size). When the Drawer has room for
another full 560px column the content continues in it; otherwise it stays in one
column no wider than 560px, aligned to the left. At 767px and below the Body is
one full-width column. Sections are laid out in the order they are mounted, so a
section whose heading and list are separate children can be split across columns
until sections are grouped. No new design value was created.

## Owner-directed Admin main width — 2026-11-15

The normal Admin body, the main workspace shell (`.wex-admin-shell__main`), also
stretches while its content is at most 1440px and aligned left, using the same
core value as the Admin Body shell, `--wex-admin-shell-body-max-inline-size`.
The Admin header and footer stay full width. No new design value was created.

## Owner-directed revert of the Admin Body shell width rule — 2026-11-15

For now, the Admin Body shell and Admin main width rule (content at most 1440px,
aligned left; `admin-body.css` and `--wex-admin-shell-body-max-inline-size`) is
reverted. The shells stretch their content as before. No token remains.

## Owner-directed revert of the Drawer Body shell columns — 2026-11-15

The Drawer Body shell columns rule is reverted (`drawer-body.css` and
`--wex-admin-shell-drawer-body-column-max-inline-size`). In a wide Drawer it
split section headings from their lists across columns. The Drawer Body is one
column as before. No token remains.

## Owner-directed compact Drawer Default — 2026-11-15

When Half would be narrower than 720px, Default becomes half of the workspace, the
same width as Half, so Default and Half are not offered as separate modes (the
existing check hides Half when it is not wider than Default). The Drawer shell
measures Half on open and on resize and marks the Admin shell
`data-admin-drawer-compact`; `drawer-width.css` applies the width at 768px and
up. Small screens keep their Drawer rules. The 720px is Owner-directed. No token
was created.

## Owner-directed Default Drawer minimum kept — 2026-11-15

The compact Default (half of the workspace when Half would be under 720px) never
goes below the Default minimum, the default Drawer inline size (560px):
`max(50%, min(560px, 100%))`. Where half of the workspace is narrower than that,
Default stays at its minimum and Half is not offered, as before. No token was
created.

## Owner-directed revert of the compact Drawer Default — 2026-11-15

The compact Default rule (Default is half of the workspace when Half would be
under 720px) and its 560px minimum fix are both reverted: `drawer-width.css`,
`HALF_COMPACT_BELOW` and `data-admin-drawer-compact` are removed. The Drawer
modes are as before: Default is 560px, Half is 50%, Full is the whole workspace,
and Half is hidden only when it is not wider than Default. No token was created.

## Owner-directed Half mode skipped when narrow — 2026-11-15

Half mode does not exist when it would be narrower than 720px. The Drawer then has
Default (560px) and Full only and jumps between them, by drag or keyboard; Default
is unchanged. When Half is 720px or wider it exists as before (and still only when
it is wider than Default). This replaces the earlier compact Default idea. The
720px is Owner-directed. No token was created.

## Owner-directed Drawer Body max content width — 2026-11-15

The Drawer Body shell keeps its content at most 720px wide and on the left; the Body
end inset (`padding-inline-end`) absorbs the rest, so Header and Footer stay full width
and nothing else in the Body changes. At Default and Half the content is under 720px,
so they are unchanged. The Drawer is a size container so the Body can read its width.
The 720px is Owner-directed and is built from existing tokens (11 x the 64px space plus
the 16px space); no token was created. The two 560px columns idea is not built yet: the
Body children are flat (heading, list, heading, list), so columns would split each
heading from its list until sections are grouped.

## Owner-directed revert of the Drawer Body max content width — 2026-11-15

The Drawer Body 720px max content width above is reverted: `drawer-body.css`, its import
and its test are removed, and the Drawer is no longer a size container for it. The Body
is as it was before: full width with its 16px padding. No token was created.


## Owner-directed each section is one unit — 2026-11-15

Each Drawer Body section is one unit: one element holds all its pieces, so a row and its
cards can never be separated. The Presentation sections are the Product summary (already
one element), Promotions (row and cards) and Activity (row and cards). The Body spaces the
units with its 24px gap; inside a unit the row and its cards are 12px apart, and the
Promotions unit carries the closing 1px line that the cards used to carry. The look is
unchanged. No token was created.

## Owner-directed Drawer Body content width by mode — 2026-11-15

The Drawer Body shell caps its content at 560px (the default Drawer inline size) and keeps it
on the left; in Half mode the cap is 720px (11 x the 64px space plus the 16px space). The Body
end inset (`padding-inline-end`) takes the rest, and the Drawer is a size container so the Body
can read its width. Default is narrower than the cap, so it is unchanged. Header, Sidebar and
Footer are not affected. No token was created.

## Owner-directed Half cap returns to 560px when two columns fit — 2026-11-15

In Half mode the Drawer Body content cap is 720px only while the Body is narrower than two
560px columns (1120px). From that width on the cap is 560px, so the room is kept for another
560px column and the content does not stretch. Default and Full are unchanged (Full is 560px).
The step uses existing tokens only (the default Drawer inline size, the 64px and 16px spaces);
no token was created.

## Owner-directed Header and Footer actions end at the content — 2026-11-15

When the Body content is capped and leaves empty room at the Drawer end, the Header and
Footer actions (status pill, menu, close, Save, Publish) end where the content ends, not at
the far Drawer edge. One shared inset (`--wex-admin-shell-drawer-content-end-inset`) feeds the
Body, Header and Footer end padding, so they always agree. The bars keep their full width and
their 16px minimum end padding, so Default is unchanged. When a second column exists, the
actions should end at the end of the last column. No token was created.

## Owner-directed Drawer Body right divider — 2026-11-15

The Drawer Body ends 16px after its content and closes there with a 1px divider on the right,
the counterpart of the Sidebar's. The Body shrinks with an end margin (the shared
`--wex-admin-shell-drawer-content-end-inset` minus its 16px padding and the divider), so the
content, the Header actions and the Footer actions keep the same end edge. When the content
fills the Drawer the divider has no width, so Default is unchanged. No token was created.

## Owner-directed Drawer Body divider keeps the background — 2026-11-15

Correction to the right divider above: the Body is not shrunk and its background is not
removed. The Body keeps its full width and background; the 1px divider is a background layer
placed 16px after the content, and the end padding takes the rest. It shows whenever the
Drawer is wider than the content (not only with two columns) and has no width otherwise, so
Default is unchanged. The end margin and border approach is removed. No token was created.

## Owner-directed divider through Header and Footer — 2026-11-15

The Drawer right divider (16px after the content, shown whenever the Drawer is wider than
the content) is also drawn in the Header and the Footer, at the same place as in the Body, so
it runs the full Drawer height. The bars keep their backgrounds, borders and actions. Default
is unchanged. No token was created.

## Owner-directed Half Drawer max width, divider and action movement removed — 2026-11-16

The right divider (Body, Header, Footer) and the Header and Footer actions ending where the
Body content ends are removed; the actions sit at the Drawer edge again. In their place, while
there is no content to load into another column, the Half Drawer is at most 1000px wide
(`--wex-admin-shell-drawer-half-max-inline-size`, built from the 64px, 48px and 8px spaces; the
Half rules in `layout.css` use `min(50%, ...)`). Full stays the full width for now, Default is
560px, and the Body content caps (560px, 720px in Half) are unchanged. No token was created.

## Owner-directed section lines stretch full — 2026-11-16

The 1px section lines (under the Product summary and under the Promotions unit) run edge to
edge across the whole Drawer Body, including the room that capped content leaves at the Drawer
end in Half and Full. The Body publishes its end inset (`--wex-admin-shell-drawer-body-end-inset`,
16px at least) and the two sections use it as negative end margin and matching end padding, so
their content width does not change. Default is unchanged. No token was created.

## Owner-directed Half mode content centred — 2026-11-16

In Half mode the Drawer Body content (not the Body shell) is centred: the Body start inset is
half of the room the capped content leaves (16px at least), and the end inset takes the other
half. The end inset formula now subtracts the start inset, and the section lines use both insets
so they still run edge to edge. Default and Full are unchanged. No token was created.

## Current Drawer width state — 2026-11-16

Summary of the Owner-directed Drawer width work, so the sections above need not be replayed.

- **Modes:** Default is 560px. Half is `min(50%, 1000px)` (`drawer-width.css`, read by the Half
  rules in `layout.css`) and exists only when it is wider than Default and at least 720px
  (`HALF_MIN_WIDTH`); otherwise the Drawer jumps from Default to Wide. Wide (Owner-directed
  2026-11-17) is `min(100%, 1000px)` using the same `drawer-width.css` value as Half; it exists when it is
  wider than the mode below it, and is the whole width within 1000px. Full is the whole width; availability follows the request’s `columns: 1 | 2` declaration
  (omitted means one). Full is available for two columns. Add New declares two for now,
  enabling Full without adding second-column content (Owner-directed, 2026-11-17).
- **Body content:** capped at 560px, and 720px in Half (back to 560px once the Body has room
  for two 560px columns; not reachable while Half is at most 1000px), left aligned. In Half the
  content is centred. Insets come from `--wex-admin-shell-drawer-body-start-inset` and
  `--wex-admin-shell-drawer-body-end-inset` (`drawer-body.css`).
- **Sections:** each Body section is one unit (`sectionUnit`); the 1px section lines run edge to
  edge across the Body using the two insets.
- **Removed (history above):** the Drawer Body multi-column layout, the Admin Body and main
  1440px cap, the compact Default, the right divider and the Header and Footer actions following
  the content. No token was created for any of this.
- **Wide mode (2026-11-17, Owner-directed):** a fourth mode between Half and Full that stops at 1000px,
  with the Half Body rules (720px cap, centred; `drawer-body.css`). For one-column requests,
  Wide is the widest mode; two-column requests also allow Full. No token was created.
- **Open:** the second column is not built. When it is, the Header and Footer actions should end
  at the end of the last column, and the Half cap rule for two columns becomes reachable.

## Product presentation

See the [ADR 0028 product-presentation companion](0028-admin-drawer-product-presentation.md)
for the existing Full Drawer composition, shell allocation, Pricing and
responsive boundary notes, plus the Owner-directed Description presentation.
