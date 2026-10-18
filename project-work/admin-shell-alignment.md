# Admin Shell alignment and composition

Status: DEFERRED — Owner-approved plan ready; start only on “start aligning shell”
Phase: A — shell alignment before navigation components
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

Phase A is ready. The next explicit Owner instruction, “start aligning shell,”
authorises only step A; steps B–E remain gated as listed above.
