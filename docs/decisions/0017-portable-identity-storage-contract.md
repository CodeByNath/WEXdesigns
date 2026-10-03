# 0017: Portable WEX Identity Storage Contract

## Status

Proposed — defines the framework-neutral contract boundary required by accepted
ADR 0016. It authorises no storage adapter, filesystem or database access,
runtime Plugin + Tool, allocation, migration, Header work, or UI.

## Context

ADR 0016 moves WEX Identity from a central Station to one isolated WEX identity
space per host. The WEX Identity Plugin + Tool retains issuance and lifecycle
semantics, while a host storage adapter persists only WEX-directed records.
Without a portable contract, a local-folder reference adapter and later
PostgreSQL, WordPress/MySQL, or API adapters could encode different identity
meaning or take ownership of issuance.

## Decision

### Contract residence

`@weerax/schemas` owns strict validation and TypeScript types for the
serializable records shared at the boundary:

- identity-space registration;
- initialization observation state;
- allocation lifecycle records; and
- allocation lookup keys.

The normative operation and invariant contract lives in
[Portable WEX Identity storage contract](../architecture/portable-identity-storage-contract.md).
It is implemented later by the WEX Identity Plugin + Tool and host adapters.
Schemas validate plain data only; they do not issue IDs, create/open storage,
perform transitions, provide atomicity, or resolve platform/domain records.

### Stable host-local address

One identity-space registration records the WEX-owned `identitySpaceId`, opaque
host `platformKey`, and registration timestamp. The portable identity address
is `(identitySpaceId, allocationId)`. Neither field is a host business record
or a global namespace claim.

### Lifecycle evidence

Every persisted allocation record contains the identity-space reference,
allocation ID, closed family, immutable root or parent/slot placement,
lifecycle state, and reservation timestamp. Assignment adds its timestamp.
Retirement adds its timestamp and non-empty serializable retirement evidence;
it may retain an assignment timestamp when it was assigned first. The record
must match the existing closed family validation; adapters never infer family
or placement from an ID prefix.

### Operation and concurrency boundary

The Plugin + Tool is the only authority that requests detection, approved
creation/opening, registration persistence/read, reservation, lifecycle
transition, and lookup. An adapter receives the Plugin + Tool's records and
performs only backend persistence/read and atomic protection.

The adapter must make initial reservation an atomic create-if-absent operation
for `(identitySpaceId, allocationId)`, and make lifecycle transitions atomic
compare/write operations against the expected current state. Its backend can
choose filesystem locking, database transactions, conditional writes, or an
equivalent mechanism, but every backend must provide collision rejection and
permanent non-reuse with the same observable meaning.

### Initialization and binding boundaries

Detection of an absent identity space returns no registration or allocation
record. The Plugin + Tool must expose `approval-required` and obtain explicit
user or administrator approval before it asks an adapter to create a space or
persist the first registration. This decision defines no approval UI.

The contract does not carry host business data, callbacks, permissions,
resolvers, or product/domain resolution. Existing WEX allocation-to-platform
bindings remain an explicit, opaque, separately governed boundary; storage
adapters must not interpret them or add them to allocation lifecycle records.

## Consequences and next boundary

The first implementation may create the WEX Identity Plugin + Tool and the
local folder reference adapter only in their separately authorised phases. A
future adapter must demonstrate the operation, atomicity, collision, and
non-reuse guarantees in this decision. The historical PostgreSQL Station
remains unchanged until its optional-adapter conversion phase.
