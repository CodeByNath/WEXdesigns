# Admin Shell / Admin Station

## Current operating status

- Last visited / updated: 2026-11-20.
- Verified source: `main` at `06e507c5a06d8f906b9f75ccb8a4471143f3d768`;
  Studio staging pointer 422 selects immutable source `e41d9a73397224295425ca88aeb5924d7c22714d`.
- WEX publication and live pointer/manifest verified; QSD runtime adoption unverified.
- Registration: application/runtime layout, not a Shared UI component.
- Product section source, tests, current spacing, content history and release evidence:
  [Drawer product preview Code Map](admin-drawer-product-preview.md).

### Recent work (newest first)

- 2026-11-20: Owner-directed Overview fields, all-width wrapping and View-to-Full
  action; spacing refinements; combo-only two-activity tabs in Description,
  Snapshot, Meeting, Itinerary, Info and FAQ / Booking. Released through pointer
  422. [Current detail and verification](admin-drawer-product-preview.md).
- 2026-11-20: History audit found PADI Overview intact; other Single fixtures
  originated as Gold Coast reference copy, rather than overwritten Scuba copy.
  CSS audit found no inline CSS in the changed JS or unresolved referenced tokens;
  existing Owner-approved layout rules remain distinct from global tokens.

- 2026-11-19: Drawer header options menu lists Edit, Disabled, Archive, Delete,
  then View (`data-admin-drawer-header-action="view"` in `admin-station-shell.js`;
  pinned in `admin-station-drawer.test.mjs`). No handler or new token.
  [ADR 0028 companion](../decisions/0028-admin-drawer-product-presentation.md).

- 2026-11-19: FAQ / Booking preview (`admin-station-product-faq-booking.js`/`.css`)
  completes the ten product sections with shared 10 / 10 heading, five read-only
  Q&A groups and booking details. Bold plain values and 16px rows follow Meeting;
  fully visible related-tour choices use existing chips as preview data. Empty
  optional fields are omitted; review shortcodes never execute. No editor or booking
  integration. [ADR 0028 companion](../decisions/0028-admin-drawer-product-presentation.md).

- 2026-11-19: Keywords preview (`admin-station-product-keywords.js`/`.css`) uses
  the shared 9 / 10 heading, 16px labelled rows and wrapping neutral chips for
  Activity Type, Audience Level and Experience Group. Owner renamed the main
  navigation label and heading from Product Keywords to Keywords. Screenshot
  choices are fixture vocabulary, not persisted selections. No browse/add/editor UI.
  [ADR 0028 companion](../decisions/0028-admin-drawer-product-presentation.md).

- 2026-11-19: Info preview (`admin-station-product-info.js`/`.css`) uses the shared
  8 / 10 heading and 16px labelled rows. Included, Not Included and What to bring
  reuse Description’s full-width neutral chips; seven information sections use
  bold plain paragraphs. Reference copy includes Owner-supplied full list
  wording. No editor, HTML injection or domain adapter.
  [ADR 0028 companion](../decisions/0028-admin-drawer-product-presentation.md).

- 2026-11-19: Itinerary preview (`admin-station-product-itinerary.js`/`.css`)
  uses the shared 7 / 10 heading, Meeting-style read-only step groups, bold
  title/description values and existing Media thumbnail frames. All eight reference
  steps retain their supplied order and numbers.
  Images use existing Studio preview assets pending originals. No editor.
  [ADR 0028 companion](../decisions/0028-admin-drawer-product-presentation.md).

- 2026-11-19: Owner-directed Meeting preview (`admin-station-product-meeting.js`/`.css`)
  mounts in the main shell with the shared 6 / 10 heading. Four meeting points
  show Time, Label and Address as bold plain text with existing 16px row gaps.
  Map URL is optional read-only text, omitted when empty in the reference. No
  editor or map embed. [ADR 0028 companion](../decisions/0028-admin-drawer-product-presentation.md).

- 2026-11-19: Owner-directed Snapshot preview (`admin-station-product-snapshot.js`/`.css`)
  mounts in the existing main shell with shared 5 / 10 heading and ten labelled
  fields from the reference. Bold neutral chips reuse Description/Pricing;
  rows use the existing 16px gap on desktop and compact views. Read-only fixture
  values; no editor or domain adapter. [ADR 0028 companion](../decisions/0028-admin-drawer-product-presentation.md).

- 2026-11-19: Owner-directed Media preview (`admin-station-product-media.js`/`.css`)
  mounts in the existing main shell: shared 4 / 10 heading, bold Video URL,
  Hero image and wrapping Gallery images with labels above their values (8px
  media gap), 16px between groups. Existing Overview frames
  and Owner-directed 96px gallery thumbnails (`--wex-space-64` + `--wex-space-32`);
  hero is 128px using twice `--wex-space-64`. Existing Studio preview images pending supplied
  originals. No editor or asset management. [ADR 0028 companion](../decisions/0028-admin-drawer-product-presentation.md).

- 2026-11-19: Pricing rows use the same 16px gap as Description on desktop and
  compact views (`admin-station-product-pricing.css`); fare and chip internal
  gaps unchanged. [ADR 0028 companion](../decisions/0028-admin-drawer-product-presentation.md).

- 2026-11-19: Owner-directed Description preview in the Full Drawer main content
  shell (`admin-station-product-description.js`/`.css`). Shares Overview/Pricing
  section heading and label/value rows; plain product description and Quick
  Highlights using Pricing’s neutral chips, no editor. Description rows have a 16px gap; highlights share full width and
  content-driven equal height. Values are bold. Overview retains its 8px rows.
  Reference copy is preview data; [ADR 0028 companion](../decisions/0028-admin-drawer-product-presentation.md).
  ADR 0028's existing product notes moved into that companion without semantic
  change to keep its parent under the authored-file limit.

- 2026-11-22: Product Summary See all removed. The Drawer footer is one action
  button showing only applicable actions (`drawerActionChoices`,
  `admin-station-drawer-footer.js`, `drawer-footer.css`, `viewEdit` request field,
  ADR 0028 Footer single action button): View (opens Full) and Edit in view, then
  Publish/Save/Discard while editing and as they apply; always label + chevron.
- 2026-11-22: Editor view (footer Edit): Full, Publish main, connections shell
  emptied, main shell keeps only the section heading; editor proportion: main shell up to the
  content maximum, navigation unchanged, connections take the rest
  (`admin-station-drawer-editor.css`, `admin-station-add-new-sections.js`, ADR 0028
  Editor view; proof `admin-station-drawer-editor.test.mjs`). Content not built.

- 2026-11-22: Overview editor: outlined fields, label pill on the border, Search Input states (Focused, Pressed, no hover), full-content textarea values
  (`admin-station-outlined-field.js`/`.css`, `admin-station-product-overview-editor.js`,
  ADR 0028 Overview editor; proof `admin-station-drawer-editor.test.mjs`). Other sections not built.

- 2026-11-18: (superseded by the footer View) Product Summary offered the See all action
  with product content and an open-view handler, outside Full. It opened existing
  Full product navigation without resetting content, including when Default and
  Full measure the same on mobile. `setAdminDrawerMode` keeps approved mode and
  column eligibility; focused proof: `admin-station-product-summary.test.mjs`.

- 2026-11-18: Full Drawer switches its product navigation and compact composition
  below 840px of Drawer frame width (Owner-directed), using the existing Drawer
  size container; at 840px and above it retains the vertical three-shell layout.

- 2026-11-18: Drawer Footer uses Full-mode Previous/Next icon-only chevrons, disabled at
  the first/last product section and replaces the former Publish control
  with a primary-accent Label Only Small Menu (ADR 0038). Requester-supplied
  `dirty` and `publishable` state determines Publish / Save / Discard ordering
  and native disabled states; Close stays at the start. Commands emit events;
  the requester reports completion. Source: `admin-station-drawer-footer.js`;
  behavioural proof: `admin-station-drawer-footer.test.mjs`.

- 2026-11-18: Drawer Sidebar tabs return to the selected section only when the pointer or focus
  leaves the whole tab list, so moving between tabs no longer flashes it
  (`admin-station-drawer-sidebar.js`, ADR 0028).
- 2026-11-18: Product navigation (Full) previews on hover or focus like the Drawer Sidebar tabs:
  the main content shell shows the hovered section, and the selected one returns when the pointer or
  focus leaves the whole list (`createProductSections`, `admin-station-product-sections.js`; ADR 0028).
- 2026-11-17: Full Pricing section (`admin-station-product-pricing.js/.css`), loaded into the
  main content shell by the product navigation: labels and values only, never inputs, from the
  reference Tour Product Editor Pricing (Advertised price, Price list with price, type and a
  small note beside or below it, Badges and Featured chips). Overview and Pricing share a section
  heading, the name with its "n / 10" chip (`createProductSectionHead` in
  `admin-station-product-sections.js`); ADR 0028. Preview values only.
- 2026-11-18: The Drawer Body keeps the same three shells in every view (navigation, main
  content, connections; `admin-station-add-new-sections.js`/`.css`, `admin-station-drawer-full.css`;
  ADR 0028). Stacked views give the main content shell the edge-to-edge 1px line (it moved
  from the Product Summary to the shell, so Full below 840px has it too); desktop Full is
  unchanged. The Overview heading shows only in Full.
  Stacked Full spacing: navigation 8px above and below, heading 8px above and below (`--wex-admin-shell-drawer-heading-gap`).
  See all moved under the Product Summary image (`admin-station-product-summary.js`).
  The section step count uses the Promotions count badge look (`admin-station-product-summary.css`).
- 2026-11-17: Full Drawer shells share the width 2 : 5 : 3 (navigation, main content,
  connections), stopping at 720px main content and 220px navigation, each running the
  full Drawer height scrolling on its own, with the Header actions ending at the connections shell end (a main content shell keeps its borders while the navigation loads a section; connections groups Promotions and Activity,
  `admin-station-add-new-sections.js`); the Footer sits under main content only and shares its start and
  end borders (`admin-station-drawer-full.css`, ADR 0028). Supersedes the 60/40 split below.
- 2026-11-17 (Owner-approved release batch): Full-mode Sidebar tabs move
  into one row below the Header (`drawer-sidebar.css`). Add New Presentation
  adds numbered product navigation with Overview selected by default
  (`admin-station-product-sections.js`); Product Summary stays in content column
  one and Promotions/Activity occupy column two (`admin-station-drawer-full.css`),
  split 60% left / 40% right excluding navigation and gaps (Owner-directed).
  Footer Save/Publish share the left content column’s end via subgrid; Close
  remains at the start (`drawer-footer.css`, `admin-station-shell.js`).
  Product Summary’s bottom border is removed only in Full mode.
  Other modes retain their existing arrangement. Navigation consumes the
  registered Small Dropdown tokens; compact Full stacks at the existing Drawer
  boundary. Behaviour check: `admin-station-product-sections.test.mjs`.

- 2026-11-16 (current Drawer width state, this session's result): Drawer modes are
  Default 560px, Half `min(50%, 1000px)` (only when it is at least 720px and wider
  than Default; otherwise the Drawer jumps from Default to Wide), Wide `min(100%, 1000px)` (when it is wider
  than the mode below it) and Full 100%, available when the request declares `columns: 2`
  (`columns: 1` or omitted disables Full). Add New declares two for now, enabling Full
  without adding second-column content (Owner-directed, 2026-11-17).
  The Drawer Body (`drawer-body.css`) caps its content at 560px, 720px in Half
  (back to 560px once two 560px columns fit), left aligned, centred in Half. Each
  Body section is one unit (`sectionUnit`), and the section lines run edge to
  edge. Header, Sidebar and Footer are unaffected. Not built: the second column
  (the Header and Footer actions should then end at the last column). Removed this
  session: the right divider, the actions following the content, the Admin Body
  1440px cap, the Drawer Body multi-column layout and the compact Default.

- 2026-11-16: In Half mode the Drawer Body content is centred: the room is shared
  equally at the start and the end (`--wex-admin-shell-drawer-body-start-inset`,
  `drawer-body.css`). The section lines still run edge to edge. Default and Full are
  unchanged (content on the left).
- 2026-11-16: The 1px lines under the Product summary and under Promotions stretch
  across the whole Drawer Body, also across the room the capped content leaves, using
  `--wex-admin-shell-drawer-body-end-inset` (`drawer-body.css`). The content stays capped.
- 2026-11-17: New Wide mode (Owner-directed): the Drawer stops at 1000px, with the Half content rules (720px
  cap, centred). Full stays 100%; its availability now follows the request column declaration. Rule in `drawer-width.css`; modes in
  `admin-station-drawer.js`.
- 2026-11-16: The Half Drawer is at most 1000px wide while there is no content for
  another column (`drawer-width.css`, read by the Half rules in `layout.css`); Full
  stays the full width for now. The right divider and the Header and Footer actions
  following the content are removed: the actions sit at the Drawer edge again.
- 2026-11-15 (removed 2026-11-16): The Drawer right divider also runs through the Header and Footer: the
  three compartments draw the same 1px line at the same place (`drawer-body.css`),
  so it spans the full Drawer height.
- 2026-11-15 (removed 2026-11-16): The Drawer Body right divider is a background line, not a shrunk Body:
  the Body keeps its full width and background, and the 1px divider sits 16px after
  the content whenever the Drawer is wider than the content (`drawer-body.css`).
- 2026-11-15 (removed 2026-11-16): The Drawer Body closes on the right with a 1px divider, 16px after its
  content (like the Sidebar's), when the content leaves room at the Drawer end
  (`drawer-body.css`); with no room it has no width, so Default is unchanged.
- 2026-11-15 (removed 2026-11-16): The Drawer Header and Footer actions (status pill, menu, close, Save,
  Publish) end where the Body content ends, through the shared
  `--wex-admin-shell-drawer-content-end-inset` (`drawer-body.css`, used by
  `drawer-header.css` and `drawer-footer.css`). The bars stay full width.
- 2026-11-15: In Half mode the Drawer Body content cap is 720px only until the Body
  has room for two 560px columns; from then on it is 560px, keeping the room for
  another column (`drawer-body.css`).
- 2026-11-15: The Drawer Body shell caps its content at 560px, left aligned, and
  at 720px in Half mode (`packages/wex/src/foundations/drawer-body.css`). The Body
  end inset takes the rest; Header, Sidebar and Footer are unaffected.
- 2026-11-15: Each Drawer Body section is one unit: `sectionUnit` in
  `admin-station-add-new-sections.js` prints the Promotions row with its cards and
  the Activity row with its cards inside one `.wex-admin-drawer-section` element
  (the summary is already one). Spacing and the Promotions line are unchanged.
- 2026-11-15: The Drawer Body 720px max content width is reverted (`drawer-body.css`
  removed); the Body is full width with its 16px padding again.
- 2026-11-15: Half mode does not exist when it would be narrower than 720px
  (`HALF_MIN_WIDTH` in `admin-station-drawer.js`): the Drawer jumps from Default
  (560px) to Full. Default is unchanged.
- 2026-11-15: The Activity cards share three grid columns (title, time, options;
  cards and headers are subgrids), so every time starts at the same left edge.
  When the columns overflow, the list carries `data-time-stacked` and every card
  puts its time on its own row below the title.
- 2026-11-15: Title icons in the Drawer Body carry a status tone through the
  global Icon Label rule (`data-tone`): success green (active, success, pass),
  warning yellow, error red, info blue (no action required). Preview data:
  both promotions success; Product price updated info, New order created
  success, New review warning.
- 2026-11-15: The Activity options button is centred vertically in its full-height
  divider cell; its menu opens below the button.
- 2026-11-15: The Activity cards look identical: when the time does not fit beside
  the title in any card, the list carries `data-time-stacked` (set by a resize
  observer in `admin-station-activity.js`) and every card gives its time a row of
  its own, below the title.
- 2026-11-15: Activity card header: the time uses the new `clock` system icon;
  the options button sits at the top end with a divider the full height of the
  header; the time takes its own row, aligned to the start, when it does not fit
  beside the title.
- 2026-11-15: The Activity time never breaks inside itself; when the title and
  the time do not fit on one row, the time and options button move to a second
  row (`flex-wrap` on the card header).
- 2026-11-15: Promotion cards flow two to a row, and one to a row when a card
  would be narrower than 160px (`auto-fit`, 2.5 times the 64px space token).
- 2026-11-15: Promotion cards share every row (header plus owner, start, end,
  audience) as nested subgrids, so matching details of the two cards sit on the
  same line when a title or detail wraps.
- 2026-11-15: Icons beside text in the Drawer Body (Promotion details and title,
  Activity title and time) use the global Icon Label rule (`.wex-icon-label`,
  ADR 0037): the icon stays level with the first line when the text wraps.
- 2026-11-13: The Presentation Notifications label is now Activity
  (`admin-station-activity.js`/`.css`: `createActivityHeading` and
  `createActivityCards`): a label row with See all, then the two most recent
  activity cards, one per row, in the Note card design (icon and title, time, a
  View/Edit options button via `createOptionsMenu`, description). Preview data:
  Product price updated, New order created, New review.
- 2026-11-13: Promotion cards (`admin-station-promotions.js`/`.css`): preview
  data Black Friday and Adults at kids Price; each card prints its start and end
  date in two rows and the audience with the user-group icon; the cards share
  their rows (subgrid) so the details of both line up; the options button and its
  View/Edit menu are `createOptionsMenu`. Drawer Sidebar tabs: Presentation uses
  presentation-chart-bar and Pricing uses tag. New system icons: tool, cart,
  user-group, presentation-chart-bar (`admin-station-system-icons.js`).
- 2026-11-11: Owner rule, Drawer only: a zero count is never shown. The Drawer
  Header pill count and the Promotions active count hide at zero (pinned by a
  test in `admin-station-drawer.test.mjs`). Counts outside the Drawer (bell
  "N new", Search "N results", stats) are unchanged.
- 2026-11-11: The Drawer Header status pill follows what is pending: with
  pending items it is Pending and carries their count in a 24px circle on its top
  right corner (`data-admin-drawer-header-count`); with none the count is hidden
  and the pill is the requester's Active or Disabled (a requested Pending becomes
  Active). `setAdminDrawerHeaderCount` and `renderStatus` in
  `admin-station-drawer-header.js`; the Drawer notifications module reports its
  action-required count through the `onActionRequiredChange` option. The
  Promotions row shows the same circle on its green Active pill, or "No active
  promotions" with no pill and See all disabled at zero.
- 2026-11-11: The Drawer Header has a section line right below the Drawer label
  (`data-admin-drawer-header-location`, `setAdminDrawerHeaderLocation` in
  `admin-station-drawer-header.js`); Add New prints the shown section there
  (Presentation, Pricing, Options, Settings) and no longer prints it in the Body.
- 2026-11-11: Add New first tab is Presentation: its Body prints
  the two-column Product Summary (`admin-station-product-summary.js`/`.css`:
  name, then the Platform ID (regular weight, no pill) and Booking ID (Rezdy product code; bold, no pill), Rating, Price, Duration,
  Language, Category (bold, no pill) and Labels (chips) label and value rows at
  the start; the framed image (padding, border, 16px shell radius) at the end; on small devices it floats at the end so text breaks around it and rows below it use the full width, in a column 40% narrower than before (2fr content, 0.6fr image); the Labels label moves to the top when its chips wrap onto a second row (`data-wrapped`); preview data from the PADI courses at
  qldscubadive.com.au/padi-courses-gold-coast, which also replace the Services
  preview rows in `admin-station-services.js`), then the Promotions row
  (`createPromotionsHeading`: label, active count with a green Active pill or "No
  active promotions", subtle See all at the end), the two promotion cards
  (`createPromotionCards`, 12px under the row, shown while any are active; each
  card's options button, top right inline with the title, opens a small dropdown
  menu with View and Edit and announces `wex:admin-promotion-action`) and the
  Notifications label. Built and kept, not placed until asked: the Notification
  Module `footerClose: false` option. New system icons: calendar, tag, layers.
- 2026-11-10: Drawer open overlay: `packages/wex/src/foundations/drawer-overlay.css`
  adds a glass overlay (`::before` on `.wex-admin-shell[data-admin-drawer="open"]`,
  `grid-area: main`) over the Admin Body only, using the WEX Overlay Glass
  tokens (`overlay.css`, ADR 0036).
- 2026-11-10: Add New Body sections: `admin-station-add-new-sections.js` listens
  for `wex:admin-drawer-tab` and prints one section per Sidebar tab straight
  into the Drawer Body shell, with no wrapper (hover previews, leaving restores
  the selected tab's section, click keeps it). Sections hold the title only
  until the Owner defines fields.
- 2026-11-10: The Add New requester (`admin-station-products.js`) now passes
  four placeholder `sidebar` tabs (Presentation, Pricing, Options, Settings) so the
  Drawer Sidebar shows in the product. Tabs and icons are placeholders until
  the Owner supplies the real sections; section content is not mounted yet.
- 2026-11-09: Drawer Sidebar tabs: requests may carry `sidebar` tabs, printed by
  `apps/web-runtime/src/admin-station-drawer-sidebar.js` and styled in
  `packages/wex/src/foundations/drawer-sidebar.css` (Tab Navigation Small
  tokens, icon only in every mode). Hover previews the section in the Drawer
  Body shell, click selects it (`wex:admin-drawer-tab`). Not yet released.
- 2026-11-15: At max-width 767px the Drawer Sidebar icon tabs sit in one
  horizontal row below the Header (rules in `drawer-sidebar.css`, ADR 0028).

- 2026-11-09: Drawer notifications dropdown opts into Toggle mode Stretched and
  puts the selected tab first (`toggleStretched`, `selectedTabFirst`). The Drawer
  footer holds Close (or Discard in its place) at the start and Save and Publish
  at the end. Footer state lives in `apps/web-runtime/src/admin-station-drawer-footer.js`:
  a requester calls `setAdminDrawerDirty(shell, boolean)` and listens for
  `wex:admin-drawer-save` and `wex:admin-drawer-discard`. Layout is in
  `packages/wex/src/foundations/drawer-footer.css` (ADR 0028, ADR 0027). Published
  as Studio releases, staging pointer 341 to 343.

- The Admin Drawer is now a complete shell of four content-empty compartments:
  Header, a full-height Sidebar rail, Body (the scroll boundary), and Footer,
  styled from existing tokens only (ADR 0028 amendment). Requesters mount
  content with `adminDrawerCompartment(shell, 'body')` instead of replacing the
  Drawer's children; Dashboard and Products were updated accordingly.

- The Overview Add New menu item requests the Admin Drawer in Default mode
  under the `add-new` owner. Overview only reports the choice; the Products
  mount makes the request and clears the Drawer Body so no earlier requester's
  content remains. The Drawer content is not yet authored.

- Overview is a station-scoped module composed ahead of the existing Manager
  list/grid module by the local Products page mount. Overview owns only its
  summary structure and consumes the current Services fixture; Manager retains
  its existing cards, list controls, and presentation ownership.

- The local All Services view is a single station-scoped collection mounted by
  the selected Services leaf. Grid and list controls only change the
  presentation of the same rendered service item; compact layout reflows to
  one column rather than introducing a horizontally scrolling table. It is
  presentation-only and awaits an authorised station-data adapter.
- Drawer now occupies the Sidebar-priority workspace above Body rather than
  creating a third grid track that compresses Body. A pinned Sidebar alone
  widens the shared reserved column; hover expansion stays an overlay. Drawer
  consumes the existing Sidebar surface token. At the compact breakpoint, an
  open Drawer resets the shell to its one-column viewport allocation.
- Sidebar pin, compact open/close, and disclosure controls preserve the
  current Drawer allocation. Selecting a Sidebar leaf remains a different
  navigation action and closes that allocation before its Body/content action
  can take over.
- When the desktop Sidebar expands on hover, it stays above Drawer; Drawer
  remains above Body inside the shared remaining workspace.
- The Admin Body and Drawer are sibling Admin Station shell allocations with
  the same closed owner/request boundary shape as Header Results. Each shell
  exposes one current owner at a time; the requesting feature owns the
  content it mounts and replaces. The Dashboard View action is the current
  demonstration: it requests both allocations and supplies its own small
  Drawer label. Other navigation features neither inherit that action nor its
  content.
- Body occupies the full workspace remaining after Sidebar allocation. Drawer
  uses that same Sidebar-priority workspace in Default, Half, and Full modes,
  above Body; it never duplicates or covers Sidebar sizing.
- The Header Results allocation now hosts three local application components:
  the honest Profile unavailable state, fixture-backed Notifications, and live
  navigation Search. Each component owns its content, transient state, and
  controls; the Header Results shell still owns only its anchored allocation.
  Search derives result categories from matching local navigation entries,
  suppressing filters for empty states and retaining only categories that have
  current query results. Notification and Search icon surfaces consume the
  existing dark-theme semantic colour treatment through their component styles.
- Profile's external WordPress exit action follows the registered small tab
  sizing path. Its presentation remains local to the Profile result component;
  it does not add a Header action or account integration contract.
- The Header-owned location label derives its text from the selected local
  Sidebar tab and refreshes when that selection changes. It is hidden at the
  compact breakpoint, where the Header split control is visible.
- The owner-approved Sidebar navigation now has local, repeated tab
  presentation: Menu controls, root navigation and each internal wrapper use
  the registered 8px spacing; expanded tabs cap at 44px; and the Sidebar
  expands to a maximum 288px width.
- Icon-bearing top-level tabs have no extra leading tab padding. Their 44px
  icon allocation owns the leading position, the label follows at the
  tokenized 8px gap, and nested child labels align with that label column.
  Tabs without a leading icon retain their 16px inline tab padding.
- Active child state is reflected on its group. An inactive hover state is an
  interactive outline and remains distinct from the selected fill and accent
  text treatment.
- Phase 2E adds the WEX-owned staging-only release pointer
  (`studio-releases/staging-pointer.json`, ADR 0025). Only the pointer moves;
  `tooling/scripts/studio-staging-pointer.mjs` proposes and verifies it, the
  Pages workflow gates and live-checks it, and promotion to `main` is the
  approval. Consumer adoption stays outside this repository.

- Phase 2B adds the WEX-owned retained Studio-release producer:
  `tooling/scripts/studio-release.mjs` verifies final emitted bytes and writes
  an immutable source-SHA directory under `apps/web-runtime/public/studio-releases/`.
  The Pages workflow validates retained release directories; QSD consumption,
  lock selection and staging proof remain outside this repository.

- Logo image property binding accepts an application-resolved typed value at
  the Studio/Admin Station boundary. The entry reads the sole serializable
  host input once as it loads; it does not fetch QSD data or change the empty
  Dashboard body.
- Phase 1A adds a relative-asset Studio host entry that mounts this empty shell
  at a host-provided `#qsd-studio-host`; its manifest and installer guidance
  are WEX-owned. It makes no QSD, business-data, identity, storage, or
  bootstrap call. The actual QSD host runtime remains a separately authorised
  verification boundary.
- The dashboard shell work package gives the root grid explicit tracks and a
  full-height layout, an empty collapsible Sidebar rail, a compact overlay
  drawer, and Heroicons shell controls, promoted to `main`.
- The Logo fitting work mounts the Shared UI-owned Logo structure through a
  generic web materializer, without identity-host or domain behaviour.
- Phase 4 moves the Admin Shell from Shared UI to the standalone Admin Station
  runtime route and restores Component Manager to an empty component sandbox.

## Purpose and scope

This map routes the Admin Station's structural application layout to its
authority, source, and validation. It contains Header, Sidebar, Main, and
Footer regions, plus the owner-authorised local Sidebar-tab presentation. It
does not define product navigation, records, permissions, persistence,
adapters, schemas, or pluggable components.

## Governing authority and evidence routes

- [Studio Operating Model](../foundation/studio-operating-model.md)
- [Repository map](../architecture/repository-map.md)
- [Layout](layout.md)
- [Component Manager](component-manager.md)
- [Header Component](header-component.md)
- [ADR 0028: Admin Body and Drawer Shell Authority](../decisions/0028-admin-body-and-drawer-shell-authority.md)

## Current source and focused verification

- Runtime route: [`apps/web-runtime/admin-station/index.html`](../../apps/web-runtime/admin-station/index.html)
- Runtime entry resources: [`apps/web-runtime/src/admin-station.css`](../../apps/web-runtime/src/admin-station.css), [`apps/web-runtime/src/admin-station.js`](../../apps/web-runtime/src/admin-station.js), [`apps/web-runtime/src/admin-station-runtime.js`](../../apps/web-runtime/src/admin-station-runtime.js), [`apps/web-runtime/src/admin-station-shell.js`](../../apps/web-runtime/src/admin-station-shell.js)
- Admin Drawer placement and allocation boundary:
  [`apps/web-runtime/src/admin-station-drawer.js`](../../apps/web-runtime/src/admin-station-drawer.js), with its shell styles in [`packages/wex/src/foundations/layout.css`](../../packages/wex/src/foundations/layout.css)
- Admin Body full-workspace request boundary:
  [`apps/web-runtime/src/admin-station-body.js`](../../apps/web-runtime/src/admin-station-body.js)
- Dashboard action and its shell requests:
  [`apps/web-runtime/src/admin-station-dashboard.js`](../../apps/web-runtime/src/admin-station-dashboard.js),
  [`admin-station-dashboard.css`](../../apps/web-runtime/src/admin-station-dashboard.css)
- All Services station-scoped list presentation:
  [`apps/web-runtime/src/admin-station-services.js`](../../apps/web-runtime/src/admin-station-services.js),
  [`admin-station-services.css`](../../apps/web-runtime/src/admin-station-services.css),
  and the shared system SVG factory
  [`admin-station-system-icons.js`](../../apps/web-runtime/src/admin-station-system-icons.js)
- Products-page composition and standalone Overview module:
  [`apps/web-runtime/src/admin-station-products.js`](../../apps/web-runtime/src/admin-station-products.js),
  [`admin-station-products.css`](../../apps/web-runtime/src/admin-station-products.css),
  [`admin-station-overview.js`](../../apps/web-runtime/src/admin-station-overview.js), and
  [`admin-station-overview.css`](../../apps/web-runtime/src/admin-station-overview.css)
- Portable Studio host: [`apps/web-runtime/src/studio-host.js`](../../apps/web-runtime/src/studio-host.js), [`apps/web-runtime/vite.studio-host.config.ts`](../../apps/web-runtime/vite.studio-host.config.ts), [`apps/web-runtime/studio-host/README.md`](../../apps/web-runtime/studio-host/README.md)
- Staging pointer: [`ADR 0025`](../decisions/0025-studio-staging-release-pointer.md), [`tooling/scripts/studio-staging-pointer.mjs`](../../tooling/scripts/studio-staging-pointer.mjs), [`apps/web-runtime/test/studio-staging-pointer.test.mjs`](../../apps/web-runtime/test/studio-staging-pointer.test.mjs)
- Release producer and proof: [`tooling/scripts/studio-release.mjs`](../../tooling/scripts/studio-release.mjs), [`tooling/scripts/verify-studio-releases.mjs`](../../tooling/scripts/verify-studio-releases.mjs), [`apps/web-runtime/test/studio-release.test.mjs`](../../apps/web-runtime/test/studio-release.test.mjs)
- Logo image property adapter:
  [`apps/web-runtime/src/logo-property-binding.js`](../../apps/web-runtime/src/logo-property-binding.js)
- Sidebar rail and compact drawer interaction: [`apps/web-runtime/src/admin-station-sidebar.js`](../../apps/web-runtime/src/admin-station-sidebar.js)
- Sidebar-tab presentation and disclosure controls:
  [`apps/web-runtime/src/admin-station-navigation.js`](../../apps/web-runtime/src/admin-station-navigation.js)
- Header location-label presentation and local selection bridge:
  [`apps/web-runtime/src/admin-station-location.js`](../../apps/web-runtime/src/admin-station-location.js)
- Header Results mounted components and their presentation:
  [`apps/web-runtime/src/admin-station-profile.js`](../../apps/web-runtime/src/admin-station-profile.js),
  [`admin-station-profile.css`](../../apps/web-runtime/src/admin-station-profile.css),
  [`admin-station-notifications.js`](../../apps/web-runtime/src/admin-station-notifications.js),
  [`admin-station-notifications.css`](../../apps/web-runtime/src/admin-station-notifications.css),
  [`admin-station-search.js`](../../apps/web-runtime/src/admin-station-search.js), and
  [`admin-station-search.css`](../../apps/web-runtime/src/admin-station-search.css)
- Runtime registration: [`apps/web-runtime/vite.config.ts`](../../apps/web-runtime/vite.config.ts)
- WEX shell presentation: [`packages/wex/src/foundations/layout.css`](../../packages/wex/src/foundations/layout.css),
  [`packages/wex/src/foundations/header.css`](../../packages/wex/src/foundations/header.css),
  and [`more-action.css`](../../packages/wex/src/foundations/more-action.css)
- Body and Drawer boundary checks:
  [`apps/web-runtime/test/admin-station-body.test.mjs`](../../apps/web-runtime/test/admin-station-body.test.mjs),
  [`apps/web-runtime/test/admin-station-drawer.test.mjs`](../../apps/web-runtime/test/admin-station-drawer.test.mjs)
- All Services focused checks:
  [`apps/web-runtime/test/admin-station-services.test.mjs`](../../apps/web-runtime/test/admin-station-services.test.mjs)
- Overview composition check:
  [`apps/web-runtime/test/admin-station-overview.test.mjs`](../../apps/web-runtime/test/admin-station-overview.test.mjs)
- Generic web materializer: [`apps/web-runtime/src/render-description.js`](../../apps/web-runtime/src/render-description.js)
- Focused checks: [`apps/web-runtime/test/catalogue.test.mjs`](../../apps/web-runtime/test/catalogue.test.mjs), [`apps/web-runtime/test/studio-host.test.mjs`](../../apps/web-runtime/test/studio-host.test.mjs), [`packages/wex/test/header-foundation.test.mjs`](../../packages/wex/test/header-foundation.test.mjs), and [`tooling/scripts/validate-foundation.mjs`](../../tooling/scripts/validate-foundation.mjs)

## Dependency boundary

```text
Admin Station runtime layout
  -> WEX layout, spacing, colour, typography, geometry, responsive authority
  -> accepted Shared UI Logo render description via generic materializer
  -> local Sidebar-tab presentation with no product command bindings
  -> Header-owned location label derived only from the local Sidebar selection
  -> Products-page composition of independent Overview and Manager modules
  -> Admin-owned Body and Drawer request frames, each with one current owner
  -> requesting feature-owned mounted content and actions
  -> Services-owned single-station list presentation
  -> future authorised domain adapters
```

Component Manager independently develops and validates reusable Lego pieces
before an accepted piece is fitted here.

## Current Sidebar navigation rules

- Sidebar shell, controls, and navigation are independent internal wrappers.
  The shell, controls, and navigation each consume the established 8px
  padding/gap rule; they do not use margin for layout spacing.
- Expanded navigation tabs use 4px block and 16px inline token padding with a
  44px maximum block size. A root tab carrying a leading icon overrides only
  its leading padding to zero because its 44px icon allocation already owns
  that space.
- Tab SVGs are 20px inside their token-composed 44px icon allocation.
  Nested lists start at the parent label column, preserving alignment between
  a leading-icon parent and its children.
- Compact navigation hides labels while retaining 44px tab/icon targets.
  Expanded or hover-expanded navigation shows the labels and disclosure
  controls without changing the underlying navigation model.

## Safe change routing

- Change visual values or responsive behaviour through WEX authority.
- Develop reusable Header children in Component Manager through separately
  authorised component work. Header is already the Admin Station shell and is
  never a Component Manager specimen.
- Add product navigation, records, permissions, adapters, persistence, or
  product behaviour only through separately authorised runtime work. The
  Services collection is owner-authorised presentation-only work; keep its
  one-station snapshot boundary until an adapter contract is accepted.
- Keep the Admin Drawer's four compartments (Header, Sidebar, Body, Footer)
  content-empty: the Drawer owns only the direct-body placement, approved
  allocation mode, compartment layout, and the Body scroll boundary. It uses
  the same owner/request boundary shape as Header Results. One requester owns
  the open allocation; it mounts content through `adminDrawerCompartment` and
  owns that content's structure, presentation, and behaviour.
- Keep the Admin Body shell content-empty: it owns only the full available
  workspace allocation and scroll boundary. One requester owns the open
  allocation; an action requests it through its closed event boundary, and the
  mounted component owns all interior structure, presentation, and behaviour.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
