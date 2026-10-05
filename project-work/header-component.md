# Header / Admin Station Shell

Status: AWAITING REVIEWER REVIEW
Phase: Architecture correction + first real child component — candidate submitted

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

## Builder handoff

Candidate branch: `feat/header-shell-logo`
Candidate SHA: `ec23fa579303c3f449e2b49074589a3f81768b7d`

The candidate supersedes reusable Header authority with ADR 0021, removes the
Header schema/UI resolver/specimen, preserves the existing Admin Station Header
shell, and adds Logo as the isolated Component Manager child candidate. Header
shell geometry retains the approved 64px Header and 64px × 64px Brand
allocation. No Phase 7 registration, identity issuance, Admin Station fitting,
other Header children, product rule, or new visual value was added.

Evidence:

- `pnpm build`, `pnpm check`, `pnpm audit:foundation`, focused package checks,
  and `git diff --check` passed.
- Chrome browser proof at local candidate preview: Component Manager exposes
  Logo only; Fluid, Large (1440px), and Compact (767px) preview states report
  expected WEX layout values; dark theme propagates into the isolated frame;
  compact keyboard focus is visibly rendered; accessibility tree exposes the
  Logo heading, fixture text, labelled viewport controls, and live status.
- Remote verification: `origin/feat/header-shell-logo` resolves to the exact
  candidate SHA above.

No unresolved authority conflict or deviation. Stop for Reviewer.
