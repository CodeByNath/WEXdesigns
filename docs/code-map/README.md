# Code Map

Code Map is maintained navigation evidence for demonstrated repository subjects. It helps an agent find the governing authority, current implementation, focused verification, dependency boundary, and safe change route without becoming a second specification.

## Subject-map format

Each subject map contains:

- purpose and scope;
- created date;
- last-verified date;
- verified branch/ref or commit/SHA for paths and boundaries;
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

- [Button system](button-system.md) — first demonstrated subject map.
