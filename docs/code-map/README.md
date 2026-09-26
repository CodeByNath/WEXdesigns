# Code Map

Code Map is maintained navigation evidence for demonstrated repository subjects. It helps an agent find the governing authority, current implementation, focused verification, dependency boundary, and safe change route without becoming a second specification.

## Operating order

For a demonstrated subject, open its map before opening a large authority or
implementation file. Read the map's current verification and newest work first,
then follow its links to the governing authority and source. The map is an
operating aid; current source and its governing authority always win.

## Subject-map format

Each subject map contains:

- purpose and scope;
- `Last visited`, `Last updated`, and verified branch/ref or commit/SHA for
  paths and boundaries;
- newest related work first;
- links to relevant Foundation, architecture, and accepted ADRs;
- actual source and focused test/check locations;
- dependency path and boundary;
- safe change routing; and
- related documents.

Maps link to source and authority; they do not restate contracts, tokens, APIs, or test assertions.

## Freshness

Create a subject map only for a demonstrated repository area. The owner changing a mapped subject updates its map when paths, dependency boundaries, governing authority, or safe routing changes, and refreshes its verification metadata after checking the linked implementation. Review or maintenance work may correct or defer a stale map through normal work control.

If source moves or a map becomes stale, source and governing authority win. Correct the map through authorised work; a Code Map entry is navigation evidence, not an independent architecture authority.

## Subjects

- [Colour](colour.md)
- [Typography and font delivery](typography-font-delivery.md)
- [Heading DNA](heading-dna.md) — navigation to the accepted Page Heading DNA v1 authority.
- [Actions and interaction](interaction-focus.md)
- [Button system](button-system.md) — first demonstrated subject map.
- [Spacing](spacing.md)
- [Layout](layout.md)
- [Sizing and tier system](sizing-tier-system.md)
