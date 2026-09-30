# Header Component

Status: BUILDER ACTION REQUIRED
Phase: 5 — Resolve Header-owned WEX presentation and implementation plan

## Reviewer verdict

**Proceed with safeguards**

Owner clarification resolves the remaining ownership question:

- the Admin Station shell loads the Header component;
- the shell does not own or control Header internals;
- therefore Header owns its own reusable WEX presentation contract;
- child components loaded by Header own their own internal presentation,
  behaviour, modes, and actions;
- Header only owns slot composition and the presentation of the Header shell
  itself.

This is consistent with the project direction:

`atomic schema -> reusable component -> shell slot -> application assembly -> domain meaning`.

## Accepted Header composition

- Header height: 64px on all devices.
- Brand slot: 64px x 64px.
- Navigation: remaining inline width.
- Two-level gutter only:
  - Large/Medium: 16px outer + 8px immediate inner = 24px;
  - Compact <=767px: 8px outer + 8px immediate inner = 16px;
  - deeper nesting adds no Header gutter padding.
- Header slots:
  - Brand / Logo;
  - LocationLabel at >=768px;
  - SidebarTrigger replacing LocationLabel at <=767px;
  - Search;
  - PrimaryNavigation;
  - exactly one MainAction at inline-end.
- Header chooses which component loads into each slot; it does not control the
  loaded component's internals.
- Search owns full/icon-only mode.
- PrimaryNavigation owns ordered items and fixed/scrollable mode.
- SidebarTrigger owns toggle semantics/state.
- MainAction and Brand/Home own their own action contracts.

## Header presentation ownership

Header is **not presentation-neutral**. Its reusable surface belongs to the
Header component and must be expressed through WEX authority.

The Admin Station Header region must not restyle Header internals merely because
it hosts the component.

## Builder action

Before source implementation, resolve the smallest exact Header WEX
presentation contract from existing authority:

1. inspect current WEX semantic layer, border, geometry, spacing, interaction,
   and theme tokens;
2. propose the exact existing semantic token(s) for Header background and any
   required separator/border visible in the accepted Header reference;
3. do not copy raw colours or arbitrary pixel values from the reference;
4. do not reuse the current Admin Station region styling as generic Header
   authority without proving the same WEX token choice independently;
5. define the Header shell structure/slot API only — child internals remain
   placeholders/controlled fixtures;
6. define how the 64px Header and 64px Brand square interact with the two-level
   gutter without increasing the Header's block size;
7. confirm LocationLabel/SidebarTrigger is a component-selection swap, not
   duplicate hidden content;
8. confirm Header does not introduce child component schemas or action contracts;
9. prepare the smallest implementation phase for Component Manager only.

If existing WEX authority is sufficient, record the exact token contract and
proposed implementation scope here. If it is insufficient, stop and identify
the missing WEX presentation decision precisely.

Do not implement Header source, child components, or Admin Station integration
in this phase.
