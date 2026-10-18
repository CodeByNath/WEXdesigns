# Admin Shell alignment and composition

Status: OWNER LIVE VALIDATION REQUIRED — Phase A published to WEX Studio
Phase: A — padding and gap alignment before navigation components
Actor: BUILDER:DESIGNER (WEX only)
Repository: `CodeByNath/WEXdesigns`

## Outcome

Align the existing Admin Shell around the Owner’s intended composition without
inventing data, routes, actions, or a second visual system. The current WEX
shell remains the baseline: Header, Sidebar, Main/Body and Footer, existing
Logo allocation, existing responsive drawer behaviour, and registered WEX
tokens only.

## Owner spacing contract

Use padding and parent-owned `gap`, never margins, for shell layout. The Admin
Shell Main wrapper has `--wex-space-8` padding on every viewport; its first
inner wrapper also has `--wex-space-8` padding. Deeper wrappers receive no
automatic padding—add a registered padding token only when that wrapper owns a
real boundary. Layout containers with sibling children default to
`--wex-space-8` gap; this is not a global `div` selector or an override of
component-internal spacing.

The Header main wrapper has zero padding on every viewport. Its left Brand
shell has `--wex-space-16` at inline start and `--wex-space-4` on both block
edges. Its right Navigation shell mirrors that rule: `--wex-space-16` at inline
end and `--wex-space-4` on both block edges. All named values already exist as
WEX spacing tokens.

## Phase A checklist

- [x] Confirm the current shell wrappers and registered spacing tokens.
- [x] Give Main and its first inner wrapper `--wex-space-8` padding.
- [x] Set Header wrapper padding to zero; apply the specified Brand and
  Navigation-shell edge padding.
- [x] Apply `--wex-space-8` as the default gap only to Phase-A layout
  containers with direct siblings.
- [x] Run WEX/runtime checks, publish the immutable Studio release and advance
  the staging pointer.
- [ ] Owner live validation: confirm the published shell alignment.

Builder evidence: source `2979d8759380ccbf54a72d21d0fa032da9157cba`,
immutable release `wex-studio-v1-2979d8759380ccbf54a72d21d0fa032da9157cba`,
and `main` pointer commit `1cf0705f4168f3bd0a3774a863d868ba1fb57c4e`
(sequence 8). `pnpm --filter @weerax/web-runtime test` passed 27/27,
`pnpm --filter @weerax/wex test` passed 15/15, release/pointer integrity
checks passed, Pages run 75 succeeded, and live pointer/manifest verification
passed. The remaining checkbox is intentionally Owner-owned.

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
