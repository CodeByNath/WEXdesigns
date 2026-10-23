# 0026: Header Results Shell Authority

## Status

Accepted — Owner-authorised direct UI release, 2026-10-23.

## Decision

The Admin Station Header owns a direct, empty Results compartment in addition
to its existing Brand and Navigation compartments. It is an application shell
allocation, not a reusable component or a result-content family.

The Results shell has three approved structural modes:

- `popover` — end-aligned below the Header.
- `full-span` — below the Header across its full inline allocation.
- `end-rail` — fitted to the Header's right edge for the available window
  height.

These modes describe placement and allocation, not a WEX Small / Default /
Large tier, density setting, or a component visual variant. They do not add a
new global breakpoint or raw presentation value.

## Boundary

The Header Results shell owns only its placement, available size, frame,
visibility, and scroll boundary. A requesting Navigation component chooses an
approved structural mode through the closed Header Results request boundary.
The shell does not know the requester's domain meaning.

The mounted result component owns all interior structure and states,
including data loading, Skeleton Shimmer, empty, error, selection, controls,
and element-level behaviour. The Header shell must not supply placeholders,
loading presentation, result rows, tabs, or actions.

The first demonstrated mapping is the existing Email action requesting the
`end-rail` mode. Future requests for Sidebar or Body result shells remain
owned by those shells; they are not variants of Header Results.

## Consequences

Header Results is deliberately content-empty until a separately authored
result component mounts into it. The closed request boundary keeps Navigation
from depending on the shell's DOM, presentation values, or inner content.

This decision changes the direct Header compartment boundary but does not
change Logo's render-description authority, create a shared Header component,
or register a global result component family.
