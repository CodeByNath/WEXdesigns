# Platform Identity System

Status: BUILDER ACTION REQUIRED
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

## Builder action

1. Read current `main` authority first:
   - `docs/architecture/authority-model.md`;
   - `docs/architecture/atomic-composition.md`;
   - schema identity/action authority;
   - repository/dependency rules.
2. Audit where UI composition identity belongs across `schemas`, adapters,
   shared UI and applications.
3. Separate:
   - reusable UI definition/capability identity;
   - UI composition/allocation identity;
   - external platform/domain identity;
   - adapter/binding identity/reference.
4. Determine whether UI allocation identity needs reservation, immutability,
   reverse lookup, tombstones, persistence, or only a subset. Do not copy the
   CompuZign engine blindly.
5. Define the minimum serializable binding shape needed to support
   platform→UI loading and UI→platform resolution without executable callbacks.
6. Identify validation/collision requirements and fixed-suffix/prefix policy
   implications.
7. Identify where parent/child composition identity is stored explicitly.
8. Record unresolved decisions and architecture risks.

## Stop boundary

This is architecture/audit only.

Do not implement a generator, registry, persistence store, prefixes, schemas,
adapters, Header IDs, runtime bindings, or migrations.

Return this same file to `AWAITING REVIEWER REVIEW` with authority findings,
proposed identity layers, required architecture-doc/ADR changes, and the
smallest implementation boundary.
