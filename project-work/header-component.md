# Header / Admin Station Shell

Status: BUILDER ACTION REQUIRED
Phase: Architecture correction + first real child component

## Owner correction

The previous Header-as-Shared-UI-component direction is rejected.

**Header is an identified application shell, not a reusable component.**

Its WEX identity identifies the concrete Header allocation and its direct
composition compartments. Header owns placement/composition of its direct
children; it does not become a Component Manager specimen and does not own the
internals of those children.

Current intended shape:

```text
Admin Station
└─ Header shell (WEXAMH)
   ├─ Brand compartment
   │  └─ Logo component
   └─ Navigation compartment
      ├─ Location component
      ├─ Search component
      ├─ Navigation System component
      └─ Main Action component
```

The existing Header shell geometry remains the starting allocation evidence:
64px Header height and 64px × 64px Brand compartment. Do not invent new visual
values in this correction package.

## Builder work package

Correct the accepted regression introduced by the former Header component work,
then establish **Logo** as the first actual Header child component.

1. Read the Header Code Map, ADR 0020, recursive composition/identity authority,
   Admin Station authority, and the actual `e1a2bd7...` Header implementation
   before editing.
2. Record the Owner correction in repository architecture authority. Supersede
   any clause that calls Header a reusable Shared UI component or Component
   Manager specimen.
3. Remove the Header reusable-component boundary from `@weerax/ui` and remove
   the Header specimen/mount from Component Manager.
4. Preserve Header only as the Admin Station/application shell composition
   boundary. WEX may continue to own approved Header presentation/geometry;
   schemas may describe serializable shell composition/compartments, but neither
   may turn Header back into a reusable UI component.
5. Preserve WEX Identity semantics: the real Header allocation is `WEXAMH`
   under the Admin Manager `WEXAM` root at parent slot `header`. Do not
   perform Phase 7 host registration/fitting in this package unless separately
   authorised.
6. Create the **Logo component** as the first real reusable Header child.
   Component Manager is the design/validation surface for Logo.
7. Logo receives the existing 64px × 64px Brand compartment allocation. Header
   controls that compartment; Logo controls only its own internal rendering and
   presentation contract.
8. Keep Logo platform/domain neutral. Do not hardcode a consuming product route,
   business identity, callback, or host behaviour.
9. Update focused tests, foundation/dependency audit, Code Maps, and browser
   evidence for Component Manager showing Logo rather than Header.

## Hard exclusions

No Location/Search/Navigation System/Main Action implementation yet. No
CompuZign or other product rules. No Sidebar/Main/Footer work. No new WEX visual
values. No real-host WEX Identity Phase 7 integration. Do not delete accepted
portable identity work.

Run the required deterministic checks and Component Manager browser proof.
Push one bounded topic branch and hand back the exact SHA with changed files,
tests, browser evidence, and any unresolved authority conflict. Stop for
Reviewer.
