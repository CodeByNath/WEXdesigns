# WEX UI Platform Identity

## Scope

WEX Platform Identity identifies UI compositions and concrete UI allocations. It
does not identify authoritative business records, grant domain permissions, or
replace a consuming platform's lifecycle, persistence, validation, or action
authority.

This architecture boundary is paired with [ADR 0013](../decisions/0013-wex-ui-platform-identity.md)
as corrected by accepted [ADR 0016](../decisions/0016-portable-wex-identity-spaces.md).
Proposed [ADR 0017](../decisions/0017-portable-identity-storage-contract.md)
and the [portable storage contract](portable-identity-storage-contract.md)
define the next record and operation boundary. Current schemas validate only
the serializable records; no generator, registry, persistence store, adapter,
runtime binding, or component is introduced by this document.

## Four separate identities

| Identity | Purpose | Owner |
| --- | --- | --- |
| Reusable definition/capability | An independently identified reusable UI definition or type | WEX composition authority |
| UI composition/allocation | One concrete WEX composition/allocation instance | WEX Identity Plugin + Tool, persisted in the host's isolated WEX identity space |
| Platform/domain reference | An authoritative external record reference | Consuming platform/domain |
| Binding/reference | An explicit mapping from a WEX allocation slot to an external reference | Adapter/integration boundary |

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

Each host owns one isolated WEX identity space through an approved storage
adapter. The WEX Identity Plugin + Tool registers/validates families, generates
and issues immutable allocation IDs, applies reserve/assign/retire lifecycle
rules, and resolves allocations within that host space. The adapter only
creates or opens the host space and durably persists, reads, and atomically
protects the Plugin + Tool's lifecycle records. It must not invent IDs,
families, lifecycle states, or identity semantics. A WEX allocation is
addressed by its identity-space registration and allocation ID; applications do
not create disconnected IDs outside that space. An allocation or binding that
must survive a configuration round trip, external reference, or platform-to-UI
lookup requires durable adapter storage. A platform record may resolve to zero,
one, or many WEX allocations; reverse lookup is therefore an indexed query,
not an inferred hierarchy.

Retired externally referenced allocations are not reissued. Their retirement
record/tombstone is retained when needed to preserve a durable reference or
audit trail. Ephemeral previews that need neither allocation lifecycle nor an
external reference remain structurally addressed and need not mint an identity.

| Boundary | Responsibility | Must not own |
| --- | --- | --- |
| `@weerax/schemas` | Framework-neutral serializable identity-space, allocation, parent, and binding validation | Issuance, persistence, lookup execution, callbacks |
| Host storage adapters | Create/open host WEX space; persist/read lifecycle records; backend atomicity and durability | ID/family/lifecycle invention, identity semantics, or host-domain data ownership |
| Product-side adapters | Explicit mapping and authoritative platform-reference resolution | WEX identity issuance outside the Plugin + Tool contract or domain duplication |
| Shared UI | Rendering supplied definitions | Registry, persistence, platform authority |
| WEX Plugin + Tool | Platform registration, family validation, ID issuance, lifecycle, parent/slot, lookup/targeting, and approval/init semantics | Host-domain authority or mandatory backend ownership |

The WEX Plugin + Tool is separate from the WEX presentation package and
reusable core packages. PostgreSQL Station infrastructure is optional adapter
proof, not central authority. Applications may request or consume identities
only through separately approved integration.

## Implementation boundary

The proposed portable storage contract defines the framework-neutral
identity-space records and adapter guarantees. It does not add an adapter,
runtime binding, Header ID, migration, or backend-specific storage. After
acceptance, implementation proceeds through the separately authorised local
folder adapter phase.
