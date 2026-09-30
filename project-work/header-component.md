# Header Component

Status: BUILDER ACTION REQUIRED
Phase: 5 — Formalise recursive composition and Header implementation plan

## Reviewer verdict

**Proceed with safeguards**

Owner has clarified the missing recursive composition rule. Apply it before any
Header implementation.

## Recursive composition authority

WEX composition is recursive, not flat.

`atomic capability -> element -> component -> component-as-shell -> larger component -> application shell -> runtime`

At every level:

- a parent owns composition of its **direct children** only;
- the parent selects which approved child/component is loaded into each direct
  slot;
- the parent does not own or reach into the child's internals;
- the child owns its own presentation, modes, state contract, interaction
  mechanics, and behaviour;
- if that child contains further elements/components, it becomes the shell for
  those direct children and the same rule repeats;
- nesting does not automatically propagate padding, layout authority,
  presentation, or behaviour through all ancestor levels.

Example:

`Header -> Navigation -> PrimaryNavigation -> NavigationItem -> Icon/Label`

Each level owns only the direct composition relationship beneath it.

## Accepted Header composition

- Header height: 64px all devices.
- Brand: 64px x 64px.
- Navigation: remaining inline width.
- Two-level Header gutter only:
  - Large/Medium: 16px outer + 8px immediate inner = 24px;
  - Compact <=767px: 8px outer + 8px immediate inner = 16px;
  - deeper Header descendants do not inherit/repeat that gutter.
- Header directly composes:
  - Brand / Logo;
  - LocationLabel at >=768px;
  - SidebarTrigger replacing LocationLabel at <=767px;
  - Search;
  - PrimaryNavigation;
  - exactly one MainAction at inline-end.
- Header does not own child internals.
- Navigation may itself be a component/shell for its own direct children.
- Search owns full/icon-only.
- PrimaryNavigation owns ordered items and fixed/scrollable.
- SidebarTrigger owns toggle semantics/state.
- MainAction and Brand/Home own their own action contracts.

## Header presentation ownership

Header owns its reusable WEX presentation. Admin Station loads Header but does
not restyle or control Header internals.

## Builder action

Before implementation:

1. inspect current WEX surface, border, geometry, spacing, interaction, theme,
   and typography authority;
2. determine the smallest existing-token Header surface contract;
3. define the Header direct-slot API only;
4. identify where nested components become their own composition shells rather
   than being flattened into Header;
5. explicitly prevent ancestor gutter/padding from cascading into deeper child
   composition;
6. keep LocationLabel/SidebarTrigger as a slot-selection swap;
7. do not introduce child-internal schemas, state, action execution, Search
   modes, PrimaryNavigation scrolling, or Sidebar toggle logic into Header;
8. determine whether the recursive composition rule requires a bounded ADR or
   architecture-doc update before source implementation; if so, propose that
   authority change rather than burying it in Header code;
9. prepare the smallest Component Manager proof phase using controlled child
   fixtures/slots only.

If existing WEX authority is insufficient for Header surface values, stop and
identify the exact missing presentation decision.

Do not implement Header source, child components, or Admin Station integration
in this phase. Return this file to `AWAITING REVIEWER REVIEW` with the exact
authority findings and proposed implementation boundary.
