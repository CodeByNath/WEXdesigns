# WEX UI Platform Identity

## Scope

WEX Platform Identity identifies UI compositions and concrete UI allocations. It
does not identify authoritative business records, grant domain permissions, or
replace a consuming platform's lifecycle, persistence, validation, or action
authority.

This architecture boundary is paired with [ADR 0013](../decisions/0013-wex-ui-platform-identity.md).
The ADR decides the identifier namespace and allocation lifecycle. No current
schema, generator, registry, persistence store, adapter, runtime binding, or
component is introduced by this document.

## Four separate identities

| Identity | Purpose | Owner |
| --- | --- | --- |
| Reusable definition/capability | An independently identified reusable UI definition or type | WEX composition authority |
| UI composition/allocation | One concrete WEX composition/allocation instance | WEX configuration boundary |
| Platform/domain reference | An authoritative external record reference | Consuming platform/domain |
| Binding/reference | An explicit mapping from a WEX allocation slot to an external reference | Integration/configuration boundary |

An independently identified reusable capability is not an allocation. A
platform/domain reference is opaque to WEX. Neither matching names nor identity
prefixes establish a parent/child or domain relationship.

## Explicit composition and binding paths

```text
Platform/domain reference
        -> explicit binding
        -> WEX allocation + binding slot
        -> component / element / atom
```

```text
UI interaction/composition
        -> WEX allocation identity
        -> explicit binding
        -> platform/domain reference
        -> authoritative domain action or data
```

Manual/static atom values remain local composition content. A dynamic atom may
resolve only through an approved explicit binding. Bindings contain data only;
they never contain a callback, handler, permission, payload, or executable
resolver.

The minimum serializable binding boundary is:

```text
{
  uiAllocationId,
  bindingSlot,
  platformKey,
  platformRecordRef
}
```

`uiAllocationId + bindingSlot` structurally addresses a binding by default. A
binding receives its own identity only when it needs an independent lifecycle,
persistence record, external reference, or ownership boundary.

## Direct-child relationships

An allocation's parent relationship is explicit. A root has no parent. A
separately allocated direct child records its `parentAllocationId` and the
parent-owned `slot`; a composition may instead record its direct child in its
own governed structure. Prefixes never encode the relationship.

This preserves the atomic-composition rule: each parent owns only direct-child
composition, allowed direct-child types, and direct-child count. A child with
children is their shell; ancestors do not automatically control descendant
spacing, presentation, state, or behaviour.

## Allocation lifecycle and placement

Allocation identifiers are immutable once issued. The configuration boundary
that issues an allocation must reserve it and reject collisions. An allocation
or binding that must survive a configuration round trip, external reference, or
platform-to-UI lookup requires durable configuration storage. A platform record
may resolve to zero, one, or many WEX allocations; reverse lookup is therefore
an indexed query, not an inferred hierarchy.

Retired externally referenced allocations are not reissued. Their retirement
record/tombstone is retained when needed to preserve a durable reference or
audit trail. Ephemeral previews that need neither allocation lifecycle nor an
external reference remain structurally addressed and need not mint an identity.

| Boundary | Responsibility | Must not own |
| --- | --- | --- |
| `@weerax/schemas` | Framework-neutral serializable identity, parent, and binding validation | Issuance, persistence, lookup, callbacks |
| Product-side adapters | Explicit mapping and authoritative platform-reference resolution | WEX allocation issuance or domain duplication |
| Shared UI | Rendering supplied definitions | Registry, persistence, platform authority |
| Application/integration configuration service | Allocation issuance, reservation, durable configuration, and lookup | Domain-record authority |

No reusable-core registry is implied. A consuming application/integration may
implement the WEX-defined configuration contract only in a separately approved
phase.

## Implementation boundary

The first implementation phase, after ADR acceptance, is limited to pure
`@weerax/schemas` shapes and focused validation tests. It must not add a
generator, registry, persistence, adapter, runtime binding, Header ID, or
migration. Allocation service behaviour requires a later demonstrated consumer
and a separate approval.
