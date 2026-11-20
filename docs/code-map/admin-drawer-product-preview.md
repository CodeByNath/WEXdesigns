# Drawer product presentation preview

## Current verification

- Last visited / updated: 2026-11-20.
- Verified WEX `main`: `06e507c5a06d8f906b9f75ccb8a4471143f3d768`.
- Instruction ref: `origin/Project-work-instructions` at
  `5f83d91d496b28dbca58c3a6720c9e40c5a8c2a9`; direct Owner UI lane,
  no new formal cycle or architecture decision.
- Pointer 422: `wex-studio-v1-e41d9a73397224295425ca88aeb5924d7c22714d`.
  Source `e41d9a73397224295425ca88aeb5924d7c22714d`, publication commit
  `ad2c420f30b1252d81b614072d43bcda85c2f84e`; subsequent comment-only commit
  `06e507c` triggered the successful deployment without altering the pointer.
- [Pages run 44682952459](https://github.com/CodeByNath/WEXdesigns/actions/runs/44682952459)
  passed. Live pointer and manifest verified; 114 runtime tests and typechecking
  passed for the release. These are release checks, not a new test run for this
  documentation update.
- Browser inspection loaded the published immutable entry/styles through a local
  host wrapper and opened Full Presentation → Description with both activity tabs.
- WEX publication complete. QSD runtime adoption remains unverified;
  no QSD repository access or deployment is part of this work.

## Scope and authority

This map records verified application preview behavior and routes to source.
It does not register a Global Component, product schema or domain contract.

- [Admin Shell map](admin-shell.md): shell ownership and dependency routes.
- [ADR 0028](../decisions/0028-admin-body-and-drawer-shell-authority.md) and
  [product presentation companion](../decisions/0028-admin-drawer-product-presentation.md):
  dated Owner decisions; later refinements supersede earlier descriptions.
- [ADR 0027](../decisions/0027-tab-navigation-global-tokens.md): registered Tab Navigation
  presentation used by the Notification Toggle.
- [Repository governance](../foundation/repository-governance.md): size and map rules.
- [Studio host guidance](../../apps/web-runtime/studio-host/README.md): build,
  input boundary, source fixture and published-bundle preview distinction.

## Current section behavior

The default preview is explicitly Combo through `productSummaryFixture.isCombo`.
Only explicit `isCombo: true` constructs activity navigation and panels.
Single inputs construct neither tabs nor hidden/printed combo content.
Every combo section has exactly Natural Bridge Tour and Hot Air Balloon Flight,
using Notification filters' existing Toggle / Small Horizontal classes and native
pressed buttons. Tabs sit directly below the section heading; selection replaces
one named region. No Current itinerary tab exists.

| Section | Current behavior | Row / group spacing |
| --- | --- | --- |
| Overview | PADI summary; Marketing Title after Booking ID, then Tagline; Type after Language only for Combo | 8px rows |
| Pricing | Existing reference fares and badges; no activity tabs | 16px groups; 8px fare lines |
| Description | Two activity overviews and highlights; Single retains original tour copy | 16px rows |
| Media | Existing video/image samples; no activity tabs | 16px groups; 8px image-label/gallery gaps |
| Snapshot | Same ten fields per activity; supplied blank values stay empty | 8px rows |
| Meeting | First activity retains all four original meeting points; second has one authorised sample point | 8px inner rows; existing heading/group gaps |
| Itinerary | Four Natural Bridge steps / seven balloon steps; Single keeps eight original steps and preview images | 8px inner rows; 16px step gaps |
| Info | Activity-specific lists and six policy fields; Why Book Direct pills remain shared | 16px groups; existing pill gaps |
| Keywords | Existing reference vocabulary; no activity tabs | 8px rows |
| FAQ / Booking | Four Natural Bridge / five balloon Q&As; booking metadata remains shared | 8px Q&A and booking rows; existing heading/group gaps |

Spacing values above describe existing tokens, not newly defined values.
Overview Tagline is “Become a certified PADI scuba diver in just one weekend.”
Marketing Title matches the PADI product title. Single omits the Type row.
Normal and Full Overview both reuse the approved floating-image layout at every
width, so rows below the image regain the available width. Header menu View
opens existing Full mode. The image radius and shell allocations are unchanged.
Only readable reference copy is used; clipped continuation text is not invented.
Why Book Direct retains its six original benefits; balloon Info disclaimer is empty.

## Single-content history audit

Checked available Git history, including each section's creation commit, on
2026-11-20. The combo changes did not replace older Scuba section copy:

| Existing content | Earliest section evidence |
| --- | --- |
| PADI summary, Booking ID PFT4KA, $425, course duration | `fcf408a` Product Summary; remains present |
| A$259 fares and tour badges | `0201aa0` Pricing |
| Coombabah / Gold Coast day-tour description and highlights | `b7c0a72` Description |
| 11.5 hours, 7am–6:30pm, Southern Cross Tours | `e0712a2` Snapshot |
| Four Brisbane hotel meeting points | `58b07c8` Meeting |
| Eight Brisbane / Gold Coast itinerary steps | `97433ca` Itinerary |
| Tour inclusions, exclusions and policies | `9a205be` Info |
| Tour keyword vocabulary | `8a5d3b0` Keywords |
| Five tour FAQs, Rezdy / PBASBR and related tours | `24ebe9f` FAQ / Booking |

Scuba preview images are reused in Media and Single Itinerary; they do not
establish Scuba textual content for those sections. No older Scuba versions of
these tour-copy fixtures were found in available repository history. No content
restoration was necessary or performed. This does not assert that copy never
existed outside this repository's available history.

## Styling audit — 2026-11-20

Audited the changed source between `746e1a3^` and `06e507c`: 12 JavaScript and
8 CSS files. No inline style assignment, style attribute construction, `cssText`
or style-element creation was found in the changed JavaScript files. All 20
custom properties referenced by the changed styles resolve in WEX/runtime CSS.
Combo additions reuse existing Toggle classes, spacing and pill styling; no new
visual token is introduced.

Literal dimensions in the changed styles are the existing 767px Admin breakpoint
and existing 9ch Overview label allocation. The latter, image 0.6fr-to-2fr ratio,
16px image-frame use of the space token and inner-radius calculation predate
this batch and are recorded as Owner-directed rules in ADR 0028. The all-width
wrapping reuses that established compact composition. Media's 96px/128px token
arithmetic and Full shell allocation are separately recorded in the companion.
These rules are not global token definitions or permission to invent equivalents.
Do not replace them or generalise them without the required Owner authority.

## Source and focused checks

All paths below are under `apps/web-runtime/`:

- Composition: [`src/admin-station-add-new-sections.js`](../../apps/web-runtime/src/admin-station-add-new-sections.js).
- Shared rows, pills, Combo flag and Overview: [`src/admin-station-product-summary.js`](../../apps/web-runtime/src/admin-station-product-summary.js)
  and matching `.css`; [`test/admin-station-product-summary.test.mjs`](../../apps/web-runtime/test/admin-station-product-summary.test.mjs).
- Each section implementation/style: `src/admin-station-product-{pricing,description,media,snapshot,meeting,itinerary,info,keywords,faq-booking}.{js,css}`.
- Separate activity copy: `src/admin-station-product-{description,itinerary,info,faq-booking}-combo.js`;
  Snapshot and Meeting groups stay in their section modules.
- Combo behavior tests: `test/admin-station-product-{description,snapshot,meeting,itinerary,info,faq-booking}.test.mjs`.
- Section navigation and View: [`src/admin-station-product-sections.js`](../../apps/web-runtime/src/admin-station-product-sections.js),
  [`src/admin-station-drawer.js`](../../apps/web-runtime/src/admin-station-drawer.js),
  [`test/admin-station-product-sections.test.mjs`](../../apps/web-runtime/test/admin-station-product-sections.test.mjs)
  and [`test/admin-station-drawer.test.mjs`](../../apps/web-runtime/test/admin-station-drawer.test.mjs).
- Reused Toggle presentation: [`src/admin-station-notifications.js`](../../apps/web-runtime/src/admin-station-notifications.js)
  and matching `.css`; no new tab component registration.

For implementation edits, run the affected behavior tests and runtime typecheck;
release validation additionally uses the established immutable-release and pointer
tooling routed by the Admin Shell map. The last release passed all 114 runtime
tests. Browser checks included both tabs, keyboard/focus selection and a 320px
viewport without page overflow; this is not exhaustive device coverage.

## Safe change route and exclusions

Data remains local, read-only preview fixtures. Preserve the Single branch when
adding combo groups and keep shared booking metadata / benefits outside activity
panels. Test explicit false or absent combo flags as well as true. Keep responsive
row rules scoped so Overview floats cannot alter other sections' spacing.
Use only existing verified tokens and explicitly accepted layout rules. Stop for
Owner authority if a required value or intended token use is missing.
No editor, persistence, provider calls, domain adapter, host API or QSD integration
is introduced. Documentation updates do not republish immutable Studio assets or
advance the staging pointer. A localhost preview process is temporary evidence,
not a durable product route or proof of QSD runtime adoption.

## Publication incident notes

The initial pointer-422 deployment run `44682249770` failed during Pages artifact
discovery after the build checks passed. Rerunning its failed job produced two
`github-pages` artifacts and failed again. A separate manual dispatch
`44682668918` failed pointer validation: the current workflow supplies
`github.event.before` as its base, which is absent for manual dispatch. Neither
failure proves a source or pointer defect. The subsequent push run linked above
succeeded and its live pointer/manifest matched.
A proposed workflow correction was not published because the available Git
credential lacked the `workflow` scope; the workflow remains unchanged. Do not
assume manual dispatch works or blindly rerun an upload/deploy job that already
has an artifact. Resolve any future failure from its logs within existing
permissions; this note grants no new workflow or credential authority.

## Documentation-update validation

On 2026-11-20, local Markdown target checks, the 600-line working limit and
`git diff --check` passed for the documentation update. No runtime/CSS source,
release assets or staging pointer changed in this update.
The broader `node tooling/scripts/validate-foundation.mjs` check was attempted
and failed at “Button radius token is missing”: its assertion expects
`--wex-button-radius: var(--wex-radius-default)`, while the existing
`packages/wex/src/foundations/buttons.css` declares `var(--wex-radius-large)`.
Both files are identical to verified `main` `06e507c`, establishing that this
mismatch predates the documentation update. No Button or validator change was
made; the Foundation audit must not be reported as passing.
