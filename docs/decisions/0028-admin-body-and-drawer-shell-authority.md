# 0028: Admin Body and Drawer Shell Authority

## Status

Accepted — Owner-authorised direct UI release, 2026-10-28.

## Decision

Admin Station owns two direct, empty application-shell allocations beside its
existing Sidebar: Admin Body and Admin Drawer. They are sibling shell regions,
not reusable components and not variants of Header Results.

Admin Body fills the workspace remaining after the Sidebar. Admin Drawer uses
that same remaining workspace in one of three approved allocation modes:
Default, Half, or Full. The Sidebar remains the first allocation and neither
shell duplicates, infers, or covers Sidebar sizing.

## Boundary

Both shells use the same closed owner/request boundary shape as Header Results.
The shell records the current owner and exposes only placement, visibility,
sizing, and scroll allocation. A requesting feature does not couple to the
shell DOM.

One current owner may use each shell allocation at a time. The requester owns
its action, content, state, and replacement of any earlier mounted content.
The shell does not supply records, placeholders, padding, decorative styling,
or business behaviour.

The Dashboard View action is the first demonstration. It requests the Dashboard
Body and default Drawer allocations and mounts its test label in the Drawer.
That label is Dashboard content; it is not inherited by future Services or
other Drawer requesters.

## Consequences

Features may request either shell independently or both allocations together,
but must provide their own mounted content. New requesters reuse the approved
request boundary and WEX layout relationship rather than copying Sidebar
dimensions, positioning rules, or Dashboard content.

## Amendment: Drawer compartments (Owner-directed, 2026-11-03)

The Owner directed that Admin Drawer is a complete shell rather than a single
empty region. It contains four content-empty compartments: Header, Sidebar,
Body, and Footer. The Sidebar spans the Drawer's full height at the collapsed
Admin Sidebar rail size; Header, Body, and Footer stack beside it. Body is the
Drawer's scroll boundary; the other three hold their allocation.

The compartments sit inside one Drawer frame carrying the subtle border and
the large radius; the Drawer shell element itself keeps only placement, mode,
and its overflow boundary, unchanged.

Compartment styling uses only existing WEX tokens (spacing, border, layer
colour, and the Admin shell sizing variables). No token was created, changed,
or amended. A requester mounts content into a compartment and still owns that
content and its state; the compartments supply no records, copy, controls, or
business behaviour. The open owner/request boundary, the three allocation
modes, and the Body shell above are unchanged.

This decision preserves ADR 0026 as the authority for Header Results. The
shared request-boundary shape does not make Body or Drawer Header components or
create a global surface-content family.
