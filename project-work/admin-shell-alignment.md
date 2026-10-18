# Admin Shell alignment and composition

Status: OWNER LIVE VALIDATION — Sidebar navigation, padding hierarchy, and header-height correction
Phase: D — Sidebar tabs
Actor: OWNER (live QSD validation)
Repository: `CodeByNath/WEXdesigns`

## Outcome

Align the existing Admin Shell around the Owner’s intended composition without
inventing data, routes, actions, or a second visual system. The current WEX
shell remains the baseline: Header, Sidebar, Main/Body and Footer, existing
Logo allocation, existing responsive drawer behaviour, and registered WEX
tokens only.

## Owner-approved Sidebar-tab package

The Owner has closed the alignment batch and authorised the next Admin Sidebar
component from the supplied visual reference. Build local, non-routing tab
presentation for Dashboard; an initially expanded Product Manager group with
New Product visually active, All Products, and Product Keywords; and an
initially collapsed Tools group. Use repeated component inputs and accessible
button controls. The compact rail must retain icons only; expanded and
hover-expanded Sidebar states may reveal labels. Do not add routes, API/QSD
bindings, persistence, data loading, or Body/Location selection behaviour.

Reference-specific active/expanded states are initial visual state only.
Only one leaf tab may be selected at a time. Parent groups remain disclosure
controls, but mirror their selected child's filled contextual treatment. An
inactive tab's hover state is an interactive outline, distinct from selection.

## Phase D checklist

- [x] Define repeated local inputs for the approved Sidebar tabs and groups.
- [x] Build the expanded/hover-expanded tab presentation and icon-only rail.
- [x] Support accessible Product Manager and Tools group toggles without
  introducing routes or persistence.
- [x] Owner visual correction: separate the single selected leaf state from
  the inactive-tab hover state; groups mirror their selected-child context.
- [x] Owner visual correction: align Sidebar tab labels to the Menu typography
  token without raw values or inline CSS.
- [x] Owner visual correction: make the Sidebar fluid with a 288px maximum and
  restore the nested group gap using the standard spacing token.
- [x] Owner visual correction: align nested Sidebar tab labels to the parent
  label column using only the existing spacing tokens.
- [x] Owner visual correction: apply 16px inline padding to expanded Sidebar
  tabs without altering the nested-label alignment rule.
- [x] Owner visual correction: cap expanded Sidebar tab height at 44px using
  the existing spacing tokens.
- [x] Verify desktop, expanded/hover-expanded, compact, keyboard, and focus
  states; publish the immutable Studio release and staging pointer.
- [ ] Owner live validation: confirm the published Sidebar navigation tabs.

## Owner spacing contract

Use padding and parent-owned `gap`, never margins, for shell layout. The Admin
Shell Main wrapper has `--wex-space-8` padding on every viewport; its first
inner wrapper also has `--wex-space-8` padding. Deeper wrappers receive no
automatic padding—add a registered padding token only when that wrapper owns a
real boundary. Layout containers with sibling children default to
`--wex-space-8` gap; this is not a global `div` selector or an override of
component-internal spacing.

The Header main wrapper has zero padding on every viewport. Its left Brand
shell has `--wex-space-16` on both inline edges and `--wex-space-4` on both
block edges. Its right Navigation shell has `--wex-space-16` at inline end and
`--wex-space-4` on both block edges. All named values already exist as WEX
spacing tokens.

The Brand/Logo shell aligns its contents to inline start in both default and
expanded states.

The Header is fixed at `--wex-space-64` on every viewport and may never exceed
that block size. The collapsed Sidebar rail is independently `76px` inline,
so its 8px Sidebar wrapper and 8px navigation compartment leave a true 44px
icon allocation. The Header Brand shell aligns to that rail inline, while its
Logo allocation remains constrained by `--wex-space-16` on both inline edges
and `--wex-space-4` on both block edges within the 64px Header.

The Sidebar follows the normal nested-shell rule: the Sidebar wrapper owns
`--wex-space-8`, and each first-level compartment—the Menu/toggle controls
and the navigation action container—also owns `--wex-space-8`. The Logo block
allocation is fixed with both minimum and maximum block size at `56px`,
preserving the Brand shell's `4px` block padding within the 64px Header. A
collapsed navigation tab occupies the resulting `44px × 44px` content box, and
its icon wrapper inherits that full allocation.

## Phase A checklist

- [x] Confirm the current shell wrappers and registered spacing tokens.
- [x] Give Main and its first inner wrapper `--wex-space-8` padding.
- [x] Set Header wrapper padding to zero; apply the specified Brand and
  Navigation-shell edge padding.
- [x] Apply `--wex-space-8` as the default gap only to Phase-A layout
  containers with direct siblings.
- [x] Owner visual correction: remove the outer Admin Shell grid gap while
  preserving internal shell/component gaps and padding.
- [x] Owner visual correction: add `--wex-space-16` padding to the Logo shell
  inline end while retaining its existing padding and allocation.
- [x] Owner visual correction: remove the Logo shell’s inline-start padding
  while retaining its inline-end and block padding.
- [x] Owner visual correction: restore the Logo shell’s `--wex-space-16`
  inline-start padding while retaining the other current padding.
- [x] Owner visual correction: left-align the Logo shell in its default state.
- [x] Owner visual correction: fix Header/Logo shell and collapsed Sidebar
  geometry at 64px, with the Logo contained by the specified shell padding.
- [x] Owner visual correction: restore 16px Sidebar padding in every state and
  lock the Logo allocation to 56px block height inside the 64px Header.
- [x] Owner visual correction: change the Brand title text from `Studio` to
  `VRAX Admin`.
- [x] Owner visual correction: round the outer corners and divider endpoints
  of the Sidebar split-control SVG.
- [x] Owner visual correction: make the Sidebar split-control border
  transparent while preserving the keyboard focus indicator.
- [x] Owner visual correction: restore the interactive border on Sidebar-toggle
  hover while keeping its resting border transparent.
- [x] Owner visual correction: use white for the Admin Header/Main surfaces
  and grey for the Sidebar, retaining the blue Brand block.
- [x] Run WEX/runtime checks, publish the immutable Studio release and advance
  the staging pointer.
- [ ] Owner live validation: confirm the published shell alignment.

Sidebar navigation/padding evidence: source
`5a9172ff0e2ee7a2e22c4697bc48efe3eca2dbb2`, immutable release
`wex-studio-v1-5a9172ff0e2ee7a2e22c4697bc48efe3eca2dbb2`, and `main`
pointer commit `e0a927a87ffb6d81b048e12df6d5a61d4803765c` (sequence 23).
The Sidebar now uses `8px` outer padding plus `8px` on its first-level Menu/
toggle and navigation compartments. Runtime type-check and 27/27 tests passed;
release/pointer integrity passed. The Pages deployment is pending. Owner live
validation remains open.

Sidebar icon-sizing evidence: source
`3757430327da22bc728f0d0819867553a79cec59`, immutable release
`wex-studio-v1-3757430327da22bc728f0d0819867553a79cec59`, and `main`
pointer commit `055e81d0baafe6a2f811813120a8ec72d6227c3b` (sequence 24).
Sidebar icon wrappers fill their available control space, capped at 44px, and
their SVG glyphs are 20px. Runtime type-check and 27/27 tests passed;
release/pointer integrity passed, and
[Pages run 99](https://github.com/CodeByNath/WEXdesigns/actions/runs/39127330134)
succeeded. Owner live validation remains open.

Collapsed shell-sizing evidence: source
`673779afad4c51307d0898b01812024153567c98`, immutable release
`wex-studio-v1-673779afad4c51307d0898b01812024153567c98`, and `main`
pointer commit `357cf1365a6586b90f6113cdea004db49d400199` (sequence 25).
The Header/Brand and collapsed Sidebar rail are 76px, producing a verified
44px × 44px Sidebar icon allocation with 20px SVG glyphs. Runtime type-check
and 27/27 tests passed; release/pointer integrity passed, and
[Pages run 102](https://github.com/CodeByNath/WEXdesigns/actions/runs/39128096302)
succeeded. Owner live validation remains open.

Header-height correction evidence: source
`94a2f5192f28f6d87f922d4e886bf7dbc744292e`, immutable release
`wex-studio-v1-94a2f5192f28f6d87f922d4e886bf7dbc744292e`, and `main`
pointer commit `1e0fe48070c7faced016e6aa55f98f08201b9e4a` (sequence 26).
The Header and Brand are capped at 64px on every viewport; the Sidebar rail
remains independently 76px to retain the verified 44px × 44px tab-icon
allocation. Runtime type-check and 27/27 tests passed; release/pointer
integrity passed, and [Pages run 105](https://github.com/CodeByNath/WEXdesigns/actions/runs/39128432536)
succeeded. Owner live validation remains open.

Brand-logo allocation evidence: source
`c1fa1d02f19317ed89aed5507145281648e60970`, immutable release
`wex-studio-v1-c1fa1d02f19317ed89aed5507145281648e60970`, and `main`
pointer commit `7025e8e56afdd22626f55142145057e824364b8e` (sequence 27).
The Logo now fills the full padded Brand content width (44px) within the fixed
64px Header, while its image keeps its aspect ratio. Runtime type-check and
27/27 tests passed; release/pointer integrity passed, and
[Pages run 108](https://github.com/CodeByNath/WEXdesigns/actions/runs/39128721613)
succeeded. Owner live validation remains open.

Bounded Brand-logo evidence: source
`62e016bcfe9351aef7f6ba51a29dcd260dd8e6d8`, immutable release
`wex-studio-v1-62e016bcfe9351aef7f6ba51a29dcd260dd8e6d8`, and `main`
pointer commit `98e100d83b1f36fda2b37e8b2041f185606ab495` (sequence 28).
The Logo width is fixed to the collapsed Sidebar rail's padded 44px allocation
in both collapsed and expanded Brand states; it no longer consumes the expanded
Brand title space. Runtime type-check and 27/27 tests passed; release/pointer
integrity passed, and [Pages run 111](https://github.com/CodeByNath/WEXdesigns/actions/runs/39128942885)
succeeded. Owner live validation remains open.

Collapsed tab-size evidence: source
`c87f3769ff35dfd678b48cb2839536ceffb96b36`, immutable release
`wex-studio-v1-c87f3769ff35dfd678b48cb2839536ceffb96b36`, and `main`
pointer commit `d311cf23eab220da4d759abe201d6c678c009376` (sequence 29).
Collapsed Sidebar tabs are `44px × 44px`, with their icon wrappers receiving
the full 44px allocation; the `8px` list gap remains between actions. Runtime
type-check and 27/27 tests passed; release/pointer integrity passed, and
[Pages run 114](https://github.com/CodeByNath/WEXdesigns/actions/runs/39134190800)
succeeded. Owner live validation remains open.

Sidebar selected/hover-state evidence: source
`be0376ef69e8cc179e117cb84acf72b54c861b3a`, immutable release
`wex-studio-v1-be0376ef69e8cc179e117cb84acf72b54c861b3a`, and `main`
pointer commit `f98288a93e9ddb4e04b2ea25ce54c26a71037bcb` (sequence 30).
Groups are disclosure-only and cannot be active alongside a selected child;
the single selected leaf has the filled state, while inactive tabs use the
interactive hover outline. Runtime type-check and 27/27 tests passed;
release/pointer integrity passed, and
[Pages run 117](https://github.com/CodeByNath/WEXdesigns/actions/runs/39135067401)
succeeded. Owner live validation remains open.

Linked parent/child-state evidence: source
`2ad32e25c918b182c5d483f15adacd24cc1c8009`, immutable release
`wex-studio-v1-2ad32e25c918b182c5d483f15adacd24cc1c8009`, and `main`
pointer commit `fd62ad0ffa7944f219f7084c5965dc67db92b304` (sequence 31).
A selected child applies the existing filled context treatment to its parent
group; selecting a leaf outside that group clears the parent context. The
selected leaf remains the only navigational selection, and hover remains
distinct. Runtime type-check and 27/27 tests passed; release/pointer integrity
passed, and
[Pages run 120](https://github.com/CodeByNath/WEXdesigns/actions/runs/39135335568)
succeeded. Owner live validation remains open.

Sidebar-tab typography evidence: source
`244d522abdf4bb689d1c1b35232bc33b584df86b`, immutable release
`wex-studio-v1-244d522abdf4bb689d1c1b35232bc33b584df86b`, and `main`
pointer commit `5717d4d4cf8f4ddb37caae1f3924f24f68d9a192` (sequence 32).
Sidebar tab labels now use the exact `wex-type-navigation-small-semibold`
typography class used by the Menu label; no raw typography values or inline
CSS were introduced. Runtime type-check and 27/27 tests passed;
release/pointer integrity passed, and
[Pages run 123](https://github.com/CodeByNath/WEXdesigns/actions/runs/39135683448)
succeeded. Owner live validation remains open.

Sidebar width and gap evidence: source
`eae42b344dc9b2bbe287596f577e935f50a67117`, immutable release
`wex-studio-v1-eae42b344dc9b2bbe287596f577e935f50a67117`, and `main`
pointer commit `14bb6e846436f7b8e8ff1bb1a9efdbb5e00da4ee` (sequence 34).
The Sidebar is `100%` fluid within a token-composed 288px maximum; each group
wrapper owns the standard `--wex-space-8` gap between its control and children.
No raw layout values or inline styles were introduced. Runtime type-check and
27/27 tests passed; release/pointer integrity passed, and
[Pages run 129](https://github.com/CodeByNath/WEXdesigns/actions/runs/39138538771)
succeeded. Owner live validation remains open.

Sidebar-tab alignment evidence: source
`9d4fe171fd0d4b25acce667e891bf52020b61c0d`, immutable release
`wex-studio-v1-9d4fe171fd0d4b25acce667e891bf52020b61c0d`, and `main`
pointer commit `7d480cf7a8084f3bd340d94352ed8a327fd4e7d3` (sequence 35).
Nested child labels align to the parent tab-label column using only
`--wex-space-48`, `--wex-space-8`, and `--wex-space-4`; the Sidebar and
navigation retain their 8px outer/inner padding hierarchy. Runtime type-check
and 27/27 tests passed; release/pointer integrity passed, and
[Pages run 132](https://github.com/CodeByNath/WEXdesigns/actions/runs/39139194583)
succeeded. Owner live validation remains open.

Sidebar-tab padding evidence: source
`3da1c9ed3e3cc6f900e0a460fdf443fbb9003c76`, immutable release
`wex-studio-v1-3da1c9ed3e3cc6f900e0a460fdf443fbb9003c76`, and `main`
pointer commit `fa6b2a1a6520230840a4f4fdb9c6edc5cafc204c` (sequence 36).
Expanded Sidebar tabs use the existing `--wex-space-16` inline padding token;
the nested-label alignment calculation is unchanged. Runtime type-check and
27/27 tests passed; release/pointer integrity passed, and
[Pages run 135](https://github.com/CodeByNath/WEXdesigns/actions/runs/39141448609)
succeeded. Owner live validation remains open.

Sidebar-tab height evidence: source
`c14c0b3c4c010e3b837d304702b4cb209d8141eb`, immutable release
`wex-studio-v1-c14c0b3c4c010e3b837d304702b4cb209d8141eb`, and `main`
pointer commit `acacaff9c2faed6fd7f614e9e284dfd46526f2a2` (sequence 37).
Expanded Sidebar tabs use the existing token-composed 44px minimum and maximum
block size; padding and nested-label alignment are unchanged. Runtime
type-check and 27/27 tests passed; release/pointer integrity passed, and
[Pages run 138](https://github.com/CodeByNath/WEXdesigns/actions/runs/39141849881)
succeeded. Owner live validation remains open.

Builder evidence: source `2979d8759380ccbf54a72d21d0fa032da9157cba`,
immutable release `wex-studio-v1-2979d8759380ccbf54a72d21d0fa032da9157cba`,
and `main` pointer commit `1cf0705f4168f3bd0a3774a863d868ba1fb57c4e`
(sequence 8). `pnpm --filter @weerax/web-runtime test` passed 27/27,
`pnpm --filter @weerax/wex test` passed 15/15, release/pointer integrity
checks passed, Pages run 75 succeeded, and live pointer/manifest verification
passed. The remaining checkbox is intentionally Owner-owned.

Brand-title evidence: source `42740f373c6b550fc8416de52dff7e784853bb0b`,
immutable release `wex-studio-v1-42740f373c6b550fc8416de52dff7e784853bb0b`,
and `main` pointer commit `c776f2ee25b1efbb922060f9f06759d90257c281`
(sequence 16). The Brand title now reads `VRAX Admin`.
`pnpm --filter @weerax/web-runtime test` passed 27/27 and
`pnpm --filter @weerax/wex test` passed 15/15; release/pointer integrity and
live pointer verification passed. Pages run 83 is still in progress; Owner
live validation remains open.

Rounded split-control evidence: source `29c3ead09a2fd85946e4e1d5cadb50ced8de1fe6`,
immutable release `wex-studio-v1-29c3ead09a2fd85946e4e1d5cadb50ced8de1fe6`,
and `main` pointer commit `1a1bce422573923bd094d424ee23d757253b30dd`
(sequence 17). The Sidebar split-control icon has a rounded outer rectangle
and round-ended divider without changing the button shell. Both test suites
passed (runtime 27/27, WEX 15/15); release/pointer integrity and live pointer
verification passed, and
[Pages deployment](https://github.com/CodeByNath/WEXdesigns/actions/runs/39120931348)
succeeded. Owner live validation remains open.

Transparent-border evidence: source `eba24a92ce160a00745b56f6c6f8e453f4c9d1e3`,
immutable release `wex-studio-v1-eba24a92ce160a00745b56f6c6f8e453f4c9d1e3`,
and `main` pointer commit `ebebe2a2b3a6872598fd42c03e8db4b0703aeb21`
(sequence 18). The Sidebar toggle's default and hover borders are transparent;
the existing keyboard-focus outline remains intact. Both test suites passed
(runtime 27/27, WEX 15/15), and release/pointer integrity plus live pointer
verification passed. Pages deployment is still in progress; Owner live
validation remains open.

Surface-swap evidence: source `28ffc8ec5fad278bcafa6c8bfe217e0f82fcf25c`,
immutable release `wex-studio-v1-28ffc8ec5fad278bcafa6c8bfe217e0f82fcf25c`,
and `main` pointer commit `65709aea4c402a0b68dfba978d3ef82b54c74a8d`
(sequence 19). The Admin shell, Header, and Main use the white layer; the
Sidebar uses the grey layer; the Brand block remains blue. Both test suites
passed (runtime 27/27, WEX 15/15), release/pointer integrity and live pointer
verification passed, and
[Pages deployment](https://github.com/CodeByNath/WEXdesigns/actions/runs/39122290912)
succeeded. Owner live validation remains open.

Toggle-hover evidence: source `4f6e138768bec8fccca00d92cbb3911c18b93743`,
immutable release `wex-studio-v1-4f6e138768bec8fccca00d92cbb3911c18b93743`,
and `main` pointer commit `9bde7c3c844055f00e35c1ec46d570d21d33158b`
(sequence 20). The Sidebar toggle now has a transparent resting border and
the interactive border on hover; its existing keyboard-focus outline remains
intact. Both test suites passed (runtime 27/27, WEX 15/15), and
release/pointer integrity plus live pointer verification passed. Pages
deployment is still in progress; Owner live validation remains open.

Sidebar/Logo evidence: source `92333c82d86e65705f19b22b9ff0768f85c2a9a7`,
immutable release `wex-studio-v1-92333c82d86e65705f19b22b9ff0768f85c2a9a7`,
and `main` pointer commit `8e81a01d10d60a565f376233498b06d7453478e6`
(sequence 15). Sidebar padding is `16px` in every state; the collapsed
control is `32px` to fit the 64px rail. The Logo allocation's min/max block
size is 56px inside the Header's 4px block padding. `pnpm --filter
@weerax/wex test` passed 15/15, `pnpm --filter @weerax/web-runtime test`
passed 27/27, release/pointer integrity checks and live pointer/manifest
verification passed, and
[Pages run 82](https://github.com/CodeByNath/WEXdesigns/actions/runs/39116579570)
succeeded. Owner live validation remains open.

Fixed-geometry evidence: source `194a119c25023c19c05ba25ed903b94406136357`,
immutable release `wex-studio-v1-194a119c25023c19c05ba25ed903b94406136357`,
and `main` pointer commit `6d0e9ff0133fc66d2a8d6a9c5b94de94758d9903`
(sequence 14). The Header and collapsed Sidebar track are `64px`; the Brand
shell is `64px × 64px`, and its Logo allocation is `32px × 56px` inside the
specified `16/16/4/4` shell padding. `pnpm --filter @weerax/wex test` passed
15/15, `pnpm --filter @weerax/web-runtime test` passed 27/27,
release/pointer integrity checks and live pointer/manifest verification passed,
and [Pages run 81](https://github.com/CodeByNath/WEXdesigns/actions/runs/39115577350)
succeeded. Owner live validation remains open.

Logo alignment evidence: source `d6dd9905be41541e38b5ccc7cad0de4876ede4fe`,
immutable release `wex-studio-v1-d6dd9905be41541e38b5ccc7cad0de4876ede4fe`,
and `main` pointer commit `efaeaddc37433f592959fdad77ac1e7ad166cf92`
(sequence 13). The default Brand/Logo shell now aligns its contents to inline
start, matching its expanded state. `pnpm --filter @weerax/wex test` passed
15/15, `pnpm --filter @weerax/web-runtime test` passed 27/27,
release/pointer integrity checks and live pointer/manifest verification passed,
and [Pages run 80](https://github.com/CodeByNath/WEXdesigns/actions/runs/39115153331)
succeeded. Owner live validation remains open.

Correction evidence: source `f486eb3143ad7dcd4a3d201fa38691dd786d8cde`,
immutable release `wex-studio-v1-f486eb3143ad7dcd4a3d201fa38691dd786d8cde`,
and `main` pointer commit `264c2390a57541abf200010a66c00b3f03869ecc`
(sequence 9). The root Admin Shell grid no longer owns a `gap`; internal
shell/component gaps and padding are retained. `pnpm --filter @weerax/web-runtime
test` passed 27/27, `pnpm --filter @weerax/wex test` passed 15/15,
release/pointer integrity checks and live pointer/manifest verification passed,
and [Pages run 76](https://github.com/CodeByNath/WEXdesigns/actions/runs/39114011483)
succeeded. Owner live validation remains open.

Logo left-padding restoration evidence: source
`283172b6821b82801bb79808291bda44c10625ed`, immutable release
`wex-studio-v1-283172b6821b82801bb79808291bda44c10625ed`, and `main` pointer
commit `ecd44390f17e2d7b235de9911b5c33dcf9143446` (sequence 12). The
Brand/Logo shell again owns `--wex-space-16` at inline start, preserving its
existing inline-end and block padding. `pnpm --filter @weerax/wex test` passed
15/15, `pnpm --filter @weerax/web-runtime test` passed 27/27, release/pointer
integrity checks and live pointer/manifest verification passed, and
[Pages run 79](https://github.com/CodeByNath/WEXdesigns/actions/runs/39114963291)
succeeded. Owner live validation remains open.

Logo left-padding evidence: source `f6215864da2027782cd0daf34eaae0cee63b8880`,
immutable release `wex-studio-v1-f6215864da2027782cd0daf34eaae0cee63b8880`,
and `main` pointer commit `14f542fbd3d6ea47dd270da720f64c3e793cea22`
(sequence 11). The Brand/Logo shell no longer owns inline-start padding; its
inline-end and block padding and fixed allocation remain. `pnpm --filter
@weerax/wex test` passed 15/15, `pnpm --filter @weerax/web-runtime test`
passed 27/27, release/pointer integrity checks and live pointer/manifest
verification passed, and
[Pages run 78](https://github.com/CodeByNath/WEXdesigns/actions/runs/39114623707)
succeeded. Owner live validation remains open.

Logo padding evidence: source `a266631d7095aecdabfb577e8a0a7bb6d28c106e`,
immutable release `wex-studio-v1-a266631d7095aecdabfb577e8a0a7bb6d28c106e`,
and `main` pointer commit `3e115aac546932b9743e8b551d9939d9c54403e6`
(sequence 10). The Brand/Logo shell retains its `--wex-space-16` inline-start
and gains the same inline-end padding without changing its allocation.
`pnpm --filter @weerax/wex test` passed 15/15, `pnpm --filter
@weerax/web-runtime test` passed 27/27, release/pointer integrity checks and
live pointer/manifest verification passed, and
[Pages run 77](https://github.com/CodeByNath/WEXdesigns/actions/runs/39114266700)
succeeded. Owner live validation remains open.

## Intended composition

```text
Admin Shell
├── Header
│   ├── Brand shell (left): existing Logo allocation
│   └── Navigation shell (right)
│       ├── Location shell: active-page text, e.g. “Dashboard”
│       └── NavAction shell
│           ├── primary Account action
│           └── repeated circular icon actions, each able to expose sub-actions
├── Sidebar
│   └── SidebarTab repeater: icon tab actions; reveal labels on the approved
│       expanded/hover state
├── Body
│   └── default page shell, initially Dashboard
└── Footer
```

The Header owns allocation of Brand and Navigation only. Navigation owns its
Location and NavAction compartments. Sidebar owns its tab entries. Each future
action owns only its own icon, label, command, and optional submenu; no parent
may style through a child boundary.

## Ordered work

1. **A — Align shells (first implementation):** retain the 64px Header and
   working Logo compartment; add/align the named Header and Sidebar/Body
   compartments using only current WEX layout, colour, spacing, focus, and
   responsive rules. Keep body scrolling, compact drawer behaviour, and
   border-box sizing intact. No actions, labels, placeholder data, dropdowns,
   or route-loading behaviour.
2. **B — Define navigation inputs:** agree the approved component/definition
   contract for active location, Account, icon actions, tab actions, and their
   command identifiers. Decide how the Body reports its location and how the
   Sidebar selects a page. This is a component/interaction decision; do not
   fabricate state, IDs, routes, persistence, or QSD API bindings.
3. **C — Build Header navigation:** implement Location and NavAction only from
   the accepted inputs. Repeated actions must be keyboard accessible, expose
   clear accessible names, and return focus when an optional submenu closes.
4. **D — Build Sidebar tabs:** implement the repeated icon-tab component from
   the accepted inputs. It controls the default Dashboard page shell and its
   location label; expanded/hover label behaviour must not alter collapsed or
   compact drawer geometry.
5. **E — Verify and publish:** test desktop, expanded/hover Sidebar and compact
   drawer states; keyboard, focus, Escape, sub-action close/focus return,
   label visibility, body scroll, light/dark themes and no overflow. Run the
   applicable WEX/runtime tests, then follow the established immutable Studio
   release and staging-pointer publication path.

## Hard boundaries and stop gates

No QSD access or changes, API/storage/persistence, invented visual values,
inline styles, new dependency, dummy actions, hard-coded menu data, or broad
dashboard contents. Stop before B if the accepted WEX component/command or
popover/dropdown authority does not exist; record the missing decision rather
than creating a parallel component system. A supplied Sidebar reference guides
composition only; it does not authorise values outside WEX authority.

## Ready state

Phase A is published for Owner validation. Steps B–E remain gated. Live
validation is Owner-owned and its checkbox remains open until confirmed.
