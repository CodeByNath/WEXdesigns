# Platform Identity System

Status: AWAITING REVIEWER REVIEW
Phase: 1 — Define WEX UI identity architecture boundary

## Owner direction

WEX Platform Identity identifies **UI compositions and UI allocations**.

Product/domain platforms such as CompuZign retain authority over their own data,
business identity, lifecycle, persistence, validation, and domain actions.

The two identity domains meet through adapters/bindings:

```text
Platform / domain identity
        ↕ adapter / binding
WEX UI composition / allocation identity
```

Neither side becomes the other's authority.

## Core architecture to establish

The phase must determine and document the smallest WEX identity contract that
supports both directions:

```text
platform data identity
→ adapter
→ WEX UI composition/allocation
→ component/element/atom
```

and:

```text
UI interaction/composition
→ WEX identity
→ adapter
→ platform identity
→ authoritative domain action/data
```

Bindings must be explicit serializable data. Never infer a domain relationship
from matching names or prefixes.

Dynamic atom values may resolve through a binding into authoritative platform
data. Manual/static atom values remain local composition content.

## Recorded candidate vocabulary — not yet accepted authority

Use the following only as proposals to audit, not as implementation permission:

- fixed generated suffix length across WEX identity families;
- `WEXAM + 5-char suffix` — candidate Admin Manager composition family;
- `WEXAMH + 5-char suffix` — candidate Admin-owned Header allocation family;
- reusable Header capability is distinct from an Admin Header allocation;
- prefix describes the UI identity family, not the authoritative parent/child
  relationship;
- parent/child composition and platform binding remain explicit fields/data;
- primitive atoms remain ID-less unless independent identity is actually needed.

CompuZign Platform Identifier may be used as **read-only precedent** for
collision resistance, closed vocabulary, immutable identity, binding and
tombstone concepts. Do not import CompuZign prefixes, entities, storage or
domain rules into WEX.

## Completed audit scope

The audit inspected current architecture, schema/action contracts, package
boundaries, and the repository's available identity precedent references.

## Stop boundary

This is architecture/audit only.

Do not implement a generator, registry, persistence store, prefixes, schemas,
adapters, Header IDs, runtime bindings, or migrations.

Return this same file to `AWAITING REVIEWER REVIEW` with authority findings,
proposed identity layers, required architecture-doc/ADR changes, and the
smallest implementation boundary.

## Builder audit handoff — 2026-10-01

`EntityIdentifier` validates generic UUID/slug values only. `SemanticAction.id`
is a local action/composition identity and `recordId` is domain identity; neither
is a WEX allocation namespace.

Proposed layers are: reusable capability/definition ID; immutable WEX
composition/allocation ID; opaque authoritative platform/domain reference; and
an explicit binding. The minimum binding is
`{ uiAllocationId, bindingSlot, platformKey, platformRecordRef }`; its
allocation-plus-slot is sufficient unless it has independent lifecycle or
external-reference needs. Parent relationships must be explicit, either as a
parent allocation ID plus slot or direct-child definition structure—not prefixes.

Schemas should validate serializable shapes only; adapters map and resolve the
platform reference; shared UI consumes definitions only; an application/
integration-owned WEX configuration service would own issuance, reservation,
persistence and reverse lookup. No reusable-core registry is justified.

Format validation plus allocation-time uniqueness/reservation and immutability
are required. Persistence, reverse lookup and tombstones are required only when
the allocation/binding outlives its definition or has independent external
references; this lifecycle decision remains open.

Required next authority: a bounded identity architecture note plus ADR deciding
closed families, suffix alphabet/length, issuance/reservation, and lifecycle/
tombstone policy. `WEXAM`/`WEXAMH` remain proposals. Smallest later
implementation: pure schema shapes and focused tests after that ADR—no
generator, registry, storage, adapters, runtime binding, or Header work.
