# ADR 0028 companion: Drawer product presentation

Part of [ADR 0028](0028-admin-body-and-drawer-shell-authority.md). Existing
product-presentation notes moved here without changing their meaning to keep
the parent document within the repository file-length limit.

## Current implementation reading guide — verified 2026-11-20

The dated sections below preserve the sequence of Owner decisions. Later spacing,
View-action and combo decisions supersede earlier descriptions of the same
behavior. Historical “no release” statements describe the individual edit at that
time: the accumulated changes are now published through Studio pointer 422.
This update records implementation evidence; it introduces no presentation rule.

The [Drawer product preview Code Map](../code-map/admin-drawer-product-preview.md)
provides the current section matrix, exact release/source evidence, source/test
routes, styling audit and Single-content provenance. Exactly two activity tabs
appear only for Combo in Description, Snapshot, Meeting, Itinerary, Info and
FAQ / Booking. Pricing, Media and Keywords have no added activity tabs.
Single retains its untabbed fixture content. “Unchanged Single” refers to the
existing fixture copy: only Overview and reused preview images are Scuba-related;
the other section fixtures were introduced from Gold Coast tour references.

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
The Product Summary no longer has a See all button; the footer View opens Full (Owner-directed, 2026-11-22).
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
The footer View (previously Product Summary See all) opens existing Full navigation directly,
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

## Media presentation — Owner-directed, 2026-11-19

Media follows the same read-only Full Drawer presentation: shared heading and
4 / 10 count, Video URL in bold, Hero image and Gallery images in shared
label/value rows with 16px gaps. Hero image and Gallery images put the label on
its own row above the values, separated by the existing 8px media gap
(Owner-directed). Images reuse Overview's frame and the existing
Services 64px square thumbnail allocation. The Owner explicitly directs the
hero to double to 128px square, using twice `--wex-space-64`; gallery is
96px square at the Owner's explicit direction, using `--wex-space-64` plus
`--wex-space-32`, and wraps with the existing 8px
media gap. No picker, upload, removal, editor or embedded third-party player.
The fixture reuses existing Studio preview images; the reference screenshot's
original image files are not available. No new visual token or component.

## Snapshot presentation — Owner-directed, 2026-11-19

Snapshot uses the shared Full Drawer heading with 5 / 10 count and label/value
rows, with the existing 16px spacing including compact views. Duration, Walking,
Departure time, Return time, Fitness, Group size, Min age, Pickup, Operated by
and Languages use the neutral bold chips already used by Description highlights
and Pricing. Values transcribed from the Owner's reference remain preview data.
No input, editing, persistence, domain adapter, new token or component.

## Meeting presentation — Owner-directed, 2026-11-19

Meeting uses the shared Full Drawer heading and 6 / 10 count. Each reference
meeting point is a named read-only group with Time, Label and Address in the
existing bold plain text styling and shared label/value rows (Owner correction: no pills
for Meeting values). Existing 16px spacing
separates rows and group headings from content. Optional Map URL prints as bold
text only when provided; the reference supplies no map URLs. No editor, add or
remove controls, embedded maps, persistence, new token or domain adapter.

## Itinerary presentation — Owner-directed, 2026-11-19

Itinerary uses the shared 7 / 10 heading and read-only ordered step groups.
Step title and Step description are bold plain text in shared labelled rows.
Image labels sit above the existing Media 128px hero frame with its 8px
gap; existing 16px tokens separate rows and steps. No editing, reordering,
picking, removal, persistence or new tokens. All eight reference steps retain their supplied order and numbers.
Existing Studio preview images stand in for original files not supplied.

## Info presentation — Owner-directed, 2026-11-19

Info uses the shared 8 / 10 heading and 16px labelled rows. Included, Not Included
and What to bring reuse Description’s full-width, equal-height neutral chips.
Fitness & accessibility, Weather policy, Cancellation, Child / Infant info,
Safety, Tour disclaimer and Why Book Direct use bold plain paragraphs retaining
line breaks. Screenshot markup is represented as readable text, never injected
HTML. Reference copy remains preview data; the Owner supplied the complete wording
for the two previously clipped list entries. No editor, persistence, domain adapter or new visual tokens.

## Keywords presentation — Owner-directed, 2026-11-19

The main label is Keywords in both product navigation and the shared 9 / 10
heading; the internal product-keywords section identity stays stable. Activity
Type, Audience Level and Experience Group use existing shared labelled rows,
16px row spacing and wrapping bold neutral chips. Reference choices populate
preview data only; the screenshots establish no saved selections. No browse,
add, checkbox, editor, persistence, new token or domain adapter.

## FAQ / Booking presentation — Owner-directed, 2026-11-19

FAQ / Booking uses the shared 10 / 10 heading and Meeting-style read-only groups
for five Question/Answer pairs, then Booking details. Bold plain values and
existing 16px gaps are retained. Booking system and Primary product code show
reference values Rezdy and PBASBR. Optional Alt product code, Reviews embed /
shortcode and Catalogue destinations print only with supplied content; reviews
remain inert plain text. The four fully visible Related Tours choices and IDs
use existing chips as preview data, not saved selections; clipped further choices
are not invented. No editor, ordering controls, embed execution, booking provider
connection, persistence, new token or domain adapter.

## Drawer header options menu: View — Owner-directed, 2026-11-19

The Drawer header options menu adds a View action as its last item, after Edit,
Disabled, Archive and Delete. The Drawer already shows the view, so people opening
this menu are looking to change something and View sits below them. The item uses
the existing Dropdown Menu item class. No handler, token, icon or persistence is
added; actions remain requester-driven.

## Overview common fields — Owner-directed, 2026-11-20

All products show Marketing Title immediately after Booking ID, followed by
Tagline (the Owner's label for the reference's one-sentence hook). Type appears
immediately after Language only for explicit preview `isCombo: true`, as plain
bold text displaying Combo (no pill; Owner-directed 2026-11-20). For Single products the whole
Type row is omitted, including from print. Marketing Title and Tagline use
existing bold plain value styling for all services. The PADI preview uses its
existing product title as Marketing Title and the Owner-supplied Tagline:
“Become a certified PADI scuba diver in just one weekend.” No editor,
persistence, provider integration, new token or CSS value.

## Empty rows and default Overview — Owner-directed, 2026-11-20

The read-only view never shows a label whose value is empty: the shared
`labelledRows` omits such rows (blank Walking/Return time, empty balloon Tour
disclaimer). Marketing Title and Tagline show only in Full mode; the default
presentation leaves both out (`display: none` outside Full, no new token).

## Normal Presentation wrapping and View — Owner-directed, 2026-11-20

Normal and Full Presentation use the previously approved compact floating
image composition at every viewport width: existing image allocation, 16px
side gap, 8px bottom gap, 12px facts gap and row layout. Below the image, rows use the available width. The existing image radius and
Full-mode shell allocation are unchanged. The heading retains its existing
Drawer heading gap above the floating composition. No new visual value or token.

Superseding the inert View item above, Header View now selects the existing
Full mode through `setAdminDrawerMode`, retaining two-column eligibility and
requester/section state. The existing menu dismissal remains; focus moves to
the selected product tab, or back to the toggle if no tab exists. No editor,
persistence or release.

## Combo Description preview — Owner-directed, 2026-11-20

Pricing remains unchanged. Description alone adds labelled combo activity
groups beneath its section heading, selected using the existing Notification
filters Toggle / Small Horizontal presentation (ADR 0027). The reference groups
are Natural Bridge Tour and Hot Air Balloon Flight. Each shows its read-only
Product description and Quick Highlights using the current Description styles.
Only fully visible overview paragraphs and highlights are transcribed; clipped
copy is not invented. Selection replaces one content panel and uses the same
native pressed-button semantics and focus states as Notification filters.

Groups and their navigation are constructed only for explicit `isCombo: true`;
Single products retain their original description without combo DOM or printed
combo content. The local preview fixture is now explicitly Combo, shared by
Overview's Type pill and Description. Existing other fixture fields stay as
presentation samples. No editor, add/remove control, persistence, provider
contract, Global Component registration, new visual value or Studio release.

## Restore section spacing — Owner-directed, 2026-11-20

The all-width image-wrapping rules apply shared row classes only beneath the
Overview Product Summary. They must not override other sections’ grid layout,
label columns or 16px group spacing. Overview retains its existing 8px row gaps;
Pricing, Description, Media, Snapshot, Meeting, Itinerary, Info, Keywords and
FAQ / Booking retain their established 16px spacing and internal gaps.

## Snapshot and Meeting row refinement — Owner-directed, 2026-11-20

Superseding their 16px row spacing above, Snapshot label/value rows and the
Time, Label and Address rows within each Meeting point use `--wex-space-8`
on desktop and compact layouts. The Meeting point heading-to-content and
between-point gaps retain their existing spacing. Overview remains 8px;
all other section spacing is unchanged. Preview only; no release.

## Itinerary inner row refinement — Owner-directed, 2026-11-20

Step title, Step description and Image rows inside each Itinerary step use
`--wex-space-8` on desktop and compact layouts. Step heading-to-content and
between-step spacing remain unchanged. No new token or release.

## Why Book Direct pills — Owner-directed, 2026-11-20

Each existing Why Book Direct benefit renders as an individual pill using the
same full-width neutral chips as Info's Included, Not Included and What to bring
lists. Benefit wording and section spacing are unchanged. No new token, editor
or release.

## Keywords row refinement — Owner-directed, 2026-11-20

Activity Type, Audience Level and Experience Group rows use `--wex-space-8`
on desktop and compact layouts. Internal chip gaps and section heading spacing
are unchanged. No new token or release.

## Booking details row refinement — Owner-directed, 2026-11-20

Only Booking details' labelled rows (Booking system, product codes and supplied
optional metadata including Related Tours) use `--wex-space-8` at desktop and
compact widths. Q&A retains its existing row and group spacing. The Booking
details heading gap and internal chip gaps are unchanged. Preview only.

## Q&A inner row refinement — Owner-directed, 2026-11-20

Question-to-Answer spacing within every Q&A group now also uses
`--wex-space-8` on desktop and compact layouts. Booking details remains 8px.
Heading-to-content and between-group spacing are unchanged. Preview only.

## Combo Snapshot preview — Owner-directed, 2026-11-20

Snapshot uses the same combo-only Toggle / Small Horizontal presentation and
native pressed-button selection as Description. Natural Bridge Tour and Hot
Air Balloon Flight retain their supplied ten fields: Duration, Walking,
Departure time, Return time, Fitness, Group size, Min age, Pickup, Operated by
and Languages. Values use the existing neutral pills with 8px rows. The balloon
reference's blank Walking and Return time values stay empty, without empty
pills or invented data. Single products keep the original Snapshot with no
combo navigation or group content. Preview only, no editor, new token or release.

## Combo Meeting preview — Owner-directed, 2026-11-20

Meeting uses the same combo-only Toggle / Small Horizontal tabs as Description
and Snapshot directly below the Meeting heading, using the existing
Time, Label and Address rows with 8px spacing; optional Map URL still prints
only when supplied. The Owner authorised placeholder meeting details for this
preview. All four existing points remain inside the first activity tab; the
second activity shows one sample point. Single
products construct no combo tabs or group content and retain their existing
meeting points. No editor, new token or release.

## Combo Itinerary preview — Owner-directed, 2026-11-20

Combo-only Toggle / Small Horizontal tabs sit directly below the Itinerary
heading, with only Natural Bridge Tour and Hot Air Balloon Flight. Single
products retain the existing eight steps, descriptions and preview images
unchanged. Natural Bridge Tour shows the four fully visible
reference steps; Hot Air Balloon Flight adds all seven supplied steps. The
reference's editor controls are not reproduced. Existing 8px inner rows and
16px step gaps remain. Single products retain the untabbed current itinerary
and construct no combo content. Presentation preview only; no new token or release.

## Combo Info preview — Owner-directed, 2026-11-20

Info uses only Natural Bridge Tour and Hot Air Balloon Flight tabs directly
below its heading, following the existing Toggle / Small Horizontal system.
Each activity supplies Included, Not Included, What to bring and six policy
fields using the existing pills, paragraph styling and 16px group spacing.
Why Book Direct remains shared outside the activity panel with existing pills.
Single products retain all original Info copy and structure without combo DOM.
Only readable reference copy is transcribed; clipped continuations are omitted
and the balloon disclaimer remains empty. No editor, new token or release.

## Combo FAQ / Booking preview — Owner-directed, 2026-11-20

Only combo products construct the two activity Toggle / Small Horizontal tabs,
placed directly below the FAQ / Booking heading. Natural Bridge Tour supplies
four fully visible Q&As; Hot Air Balloon Flight supplies the four visible Q&As
plus the breakfast Q&A in the continuation reference. Clipped unseen entries
are not invented. Existing 8px Question/Answer rows and group gaps remain.
Booking details remain shared outside the activity panel, including existing
codes, optional reviews/destinations and related-tour pills. Single products
retain their original FAQs and booking content without tabs. No editor, new
visual token or release.

## Footer single action button (Owner-directed, 2026-11-22)

The Drawer footer has one action button (the primary Label Only Small Menu), and
it shows only the actions that apply (they are hidden, not disabled):

- Presentation footer (the request declares `viewEdit: true`; Add New does), in
  view: View (opens Full, as the Header View does) only while the request declares
  two columns and the Drawer is not yet Full, and Edit. Edit enters editing and
  emits `wex:admin-drawer-edit`. Editing itself is not built. Reopening starts in view.
- Editing, and every requester without `viewEdit`: Publish while the requester says
  something is publishable; Save and Discard only while there are unsaved changes.
- It is always the same label + chevron button; its menu lists the applicable
  actions, at the ordinary Small Button size, as Save and Publish always were. None hides the button.

This supersedes the disabled Save/Discard states and disabled trigger in ADR 0038 for
the Drawer footer. Mode changes refresh the footer through an attribute observer.
The Product Summary has no See all. No new token or visual value.

## Editor view (Owner-directed, 2026-11-22)

Edit (footer) opens the editor view of an Add New Drawer: it switches to Full
(the section navigation is its frame) and the requester reports `publishable`,
so Publish is the main action, with Save and Discard offered only while there
are unsaved changes. The Drawer carries `data-admin-drawer-editing`;
`admin-station-drawer-editor.css` then keeps the navigation shell, empties the
connections shell (Promotions and Activity hidden, shell kept) and turns the main
content shell into the editor, keeping only each section heading. The editor
content is built per section, Overview first (below). Reopening starts in view. No new token or visual value.

Editor proportion (Owner-directed, 2026-11-22): in desktop Full the editor's main content
shell takes the room up to the content maximum (the same maximum the view's main shell stops
at, 11 x the 64px space plus the 16px space), the navigation keeps its width and the connections
shell (kept, empty) takes what is left, instead of the view's 2 : 5 : 3 split. In every layout the
editor's main content shell never passes that maximum (`admin-station-drawer-editor.css`).

### Overview editor

From the Owner's "Outlined (adaptive label)" design: one outlined field per
value, the label a pill on the top border at the right (the section step count pill,
centred on the border by its own height;
`admin-station-outlined-field.js`/`.css`). The field follows the Search Input states: the stable border, and Focused and
Pressed with the shared outer-state boundary on the outer edge plus its inset gap
(`--wex-outer-ring-*`), drawn as `search-input.css` draws it. There is no hover
colour, so Pressed never shows two colours. The value is a textarea that grows to show its full content (a hidden copy of the text
gives it its height), so long values wrap and are never clipped. Border, Large radius, spacing
4 and 12 and type are existing WEX values only. Selected is not offered (a field
has no persistent selection). The field is not a registered Global Component or
token family. Fields: Name, Platform ID (read
only), Booking ID, Marketing Title, Tagline, Price, Duration, Language and
Category (`admin-station-product-overview-editor.js`); Rating, Type and Labels are
not edited yet. The label stays on the border when a field is empty (the
adaptive in-field label needs positioning values that do not exist). No
persistence or provider integration.
