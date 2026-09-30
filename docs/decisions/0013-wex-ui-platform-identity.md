# 0013: WEX UI Platform Identity

## Status

Proposed — architecture authority only. It creates no identifier generator,
registry, persistence store, schema, adapter, runtime binding, Header identity,
or migration.

## Context and authority inspected

The Authority Model assigns serializable component IDs and mappings to
composition definitions while preserving domain ownership of records, lifecycle,
persistence, validation, commands, and permissions. Atomic Composition makes
atoms ID-less by default and structurally addressable through their owning
composition identity and path/slot. Dependency Rules reserve framework-neutral
contracts for schemas, product translation for adapters, and application wiring
outside reusable packages.

The resulting system needs a stable WEX identity for a concrete UI allocation
without taking over an external platform's record identity. The two systems meet
only through explicit serializable bindings. CompuZign is read-only precedent
for collision, immutable identity, binding, and retirement concepts; its
prefixes, entities, storage, and lifecycle are not imported.

## Decision

### Identity layers

The following remain distinct:

1. a reusable definition/capability identity, only where that reusable type
   independently needs identity;
2. a WEX UI composition/allocation identity for one concrete allocation;
3. an opaque platform/domain identity; and
4. an explicit binding/reference between the allocation/slot and the platform
   reference.

An allocation identifier is globally unique and immutable within the namespace
owned by the single WEX UI Identity Authority / Station. It neither identifies a
domain record nor encodes a parent/child or platform relationship.

### Closed allocation-family policy

Allocation IDs use one closed family prefix followed by exactly five characters
from this uppercase unambiguous Base32 alphabet:

```text
ABCDEFGHJKLMNPQRSTUVWXYZ23456789
```

The initial proposed families are:

| Family | Exact form | Meaning |
| --- | --- | --- |
| Admin Manager composition | `WEXAM` + five suffix characters | Concrete Admin Manager composition allocation |
| Admin Header allocation | `WEXAMH` + five suffix characters | Concrete Admin-owned Header allocation |

Validation must use the closed complete family table and the exact full form,
not name inference. Because `WEXAM` prefixes `WEXAMH`, family recognition must
select a complete matching form before interpreting the suffix. Unknown
families, wrong suffix lengths, lower-case values, and ambiguous/non-alphabet
characters are invalid.

A reusable Header capability remains separate from an Admin Header allocation.
The family table is architecture authority; a future schema implements this
closed vocabulary rather than introducing per-application prefixes.

### Structure and binding

A root allocation has no parent. A separately allocated direct child records
both `parentAllocationId` and its parent-defined `slot`; the alternative is a
governed direct-child definition held by the parent. Parent/child links are
never inferred from a family or name.

The minimum binding data is:

```text
{
  uiAllocationId,
  bindingSlot,
  platformKey,
  platformRecordRef
}
```

It maps a WEX allocation/slot to an opaque authoritative platform reference.
The `(uiAllocationId, bindingSlot)` pair is the binding address unless a binding
requires its own lifecycle, persistence, external reference, or ownership.
Dynamic atom values may resolve via this explicit binding; manual/static atom
values remain composition-local. Bindings never serialize executable callbacks,
handlers, permissions, or payloads.

### Issuance, lifecycle, and ownership

One WEX UI Identity Authority / Station owns the WEX allocation namespace. It
alone registers and validates families, mints allocation IDs, reserves before
assignment, rejects collisions, prevents reuse, resolves allocations, maintains
required reverse lookup, and retains required retirement/tombstone records.
Applications/products request and consume those identities; they do not mint
disconnected local IDs. The Authority / Station is distinct from the domain
owner and the WEX presentation package. `@weerax/schemas`, `@weerax/wex`, Shared
UI, and adapters do not own a generator, registry, or persistence store.

Allocation identifiers are reserved before use and never reused. Persistence
and reverse lookup are required when an allocation or binding must survive a
configuration round trip, external reference, or platform-to-UI resolution;
reverse lookup may return many allocations for one platform record. A retirement
tombstone is required when a retired allocation has durable external references
or audit requirements. Ephemeral previews remain ID-less unless a concrete
independent identity need exists.

## Consequences and first implementation boundary

The first authorised implementation may add only strict, framework-neutral
schemas and focused tests for allocation-ID form, closed family recognition,
binding serializability, explicit parent/slot structure, and rejection of
callbacks or undeclared fields. Uniqueness, reservation, reverse lookup,
persistence, tombstones, and allocation issuance are not schema-test concerns;
they require a later Identity Authority / Station phase with its own storage and
lifecycle tests.

This decision does not alter `EntityIdentifier`, `SemanticAction`, domain
record ownership, existing Button action identity, visual WEX source, or the
deferred Header work.
