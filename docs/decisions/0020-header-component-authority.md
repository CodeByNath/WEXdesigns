# 0020: Header Component Authority

## Status

Accepted — Header-family authority only. Schema, Shared UI, WEX, Component
Manager, and application implementation each require separately authorised
work.

## Context and authority inspected

- [Atomic Composition](../architecture/atomic-composition.md) assigns every
  parent ownership of only its direct-child composition, types, slots, and
  counts. It leaves component-family contracts to separately accepted work.
- The [Authority Model](../architecture/authority-model.md) and
  [Dependency Rules](../architecture/dependency-rules.md) place serializable
  contracts in schemas, reusable structure and accessibility mechanics in
  Shared UI, WEX presentation in WEX, and product meaning in applications and
  domain owners.
- The verified [Layout](../code-map/layout.md) and
  [Spacing](../code-map/spacing.md) foundations supply the existing responsive
  compact boundary and spacing scale. They do not themselves define a Header
  family or Header-local allocation semantics.
- [Component Manager](../code-map/component-manager.md) is an isolated future
  Shared UI validation surface. [Admin Shell](../code-map/admin-shell.md) is an
  application layout, not Header authority.
- The portable [WEX Platform Identity](../architecture/platform-identity.md)
  boundary keeps a reusable capability separate from any concrete WEX
  allocation. Under ADRs 0013 and 0016, `WEXAMH` remains an Admin Header
  allocation family, never a reusable Header capability identifier.

The existing WEX foundation uses `--wex-space-8`, `--wex-space-16`, and
`--wex-space-64`, and its compact responsive rule applies at `<=767px`. This
decision assigns the approved Header-specific meaning to those existing values;
it adds no global token, spacing scale, or breakpoint.

## Decision

### Reusable family and placement

Header is the first reusable Shared UI Lego family for Admin Station. A future
Header implementation is developed and validated in Component Manager before a
separately accepted fit into the Admin Station Header region. It is not an
Admin Station component, route, or domain-owned navigation implementation.

The Header family owns reusable semantic structure, direct-child composition,
layout allocation mechanics, and accessibility mechanics. WEX owns its visual
and responsive presentation. A consuming application or domain owner supplies
only approved serializable content, semantic intent, and runtime meaning; it
continues to own route maps, search data and behaviour, account state,
notifications, permissions, persistence, validation, credentials, and command
legality.

### Direct-child composition

The Header composition has exactly two required direct-child slots:

```text
Header
├── brand: Brand                 (exactly one)
└── navigation: Navigation       (exactly one)
```

`Navigation` is the shell for its own descendants. It has exactly four
required direct-child slots:

```text
Navigation
├── location: LocationLabel | SidebarTrigger  (exactly one active form)
├── search: Search                              (exactly one)
├── primaryNavigation: PrimaryNavigation        (exactly one)
└── mainAction: MainAction                      (exactly one)
```

There are no Header- or Navigation-level arbitrary extra-child collections.
The `location` slot is a WEX-responsive replacement slot: `LocationLabel` is
loaded at `>=768px`; `SidebarTrigger` replaces it at `<=767px`. Search owns its
full/icon-only modes, and PrimaryNavigation owns its ordered items and
fixed/scrollable modes. Header and Navigation may not absorb those child
internals, descendant spacing, state, behaviour, or product authority.

`mainAction` is exactly one prominent inline-end slot. Its semantic action,
when a later child contract permits one, remains serializable and is executed
only by a consuming application/domain integration.

### Header presentation semantics

WEX shall implement the following Header-specific semantics when a separately
authorised WEX implementation phase begins:

| Concern | Approved semantics |
| --- | --- |
| Header block size | `64px` (`--wex-space-64`) at every viewport mode |
| Brand allocation | `64px × 64px` (`--wex-space-64`) |
| Navigation allocation | The remaining inline space after Brand |
| Large/Medium gutters | `16px` outer and `8px` immediate inner |
| Compact gutters (`<=767px`) | `8px` outer and `8px` immediate inner |
| Responsive location form | LocationLabel at `>=768px`; SidebarTrigger at `<=767px` |

Those outer and immediate-inner gutters belong only to the Header allocation
boundary. Descendants must not accumulate them as inherited spacing. The values
consume WEX layout and spacing foundations; they do not establish a second
global spacing, sizing, or responsive system.

### Serializable contract boundary

This decision defines the minimum future schema design, but creates no source
schema. A future framework-neutral Header definition must express:

- the Header family/capability and its governed direct-child slots;
- exactly one Brand and one Navigation direct child;
- Navigation's four required slots and the closed location replacement forms;
- child-owned definition boundaries, including Search modes and ordered
  PrimaryNavigation items/modes; and
- a single MainAction slot without serializing a callback, executable resolver,
  raw CSS, visual value, raw breakpoint, or application route/search behaviour.

The Header definition must not duplicate concrete allocation identity. A
reusable Header capability needs an independent identity only when the accepted
composition and identity rules require one. A concrete Admin Header allocation,
if independently needed, must be issued through the accepted portable WEX
Identity Plugin + Tool lifecycle and may use the closed `WEXAMH` family; no
Header implementation may mint an ad-hoc local ID.

## Consequences and next boundary

This decision authorises no schema implementation, Shared UI code, CSS, child
component, fixture, mount, registry entry, Admin Station fitting, adapter,
binding, route/search behaviour, browser interaction, or catalogue expansion.

The next authorised Header implementation work must first define and test the
framework-neutral contracts and WEX/Shared UI boundaries required by this
decision, then validate the reusable candidate in Component Manager. An Admin
Station fit remains a subsequent acceptance boundary with its own application
and browser evidence.
