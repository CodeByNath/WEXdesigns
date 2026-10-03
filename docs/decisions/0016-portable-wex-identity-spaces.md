# 0016: Portable WEX Identity Spaces

## Status

Proposed — supersedes the clauses identified below in ADRs 0013–0015. It is
architecture authority only and authorises no storage contract, adapter,
runtime, schema, migration, allocation, Header source, or UI composition.

## Context

ADRs 0013–0015 placed WEX allocation issuance in one central Identity Station
and made its PostgreSQL ledger the shared namespace. That model conflicts with
the required portable Plugin + Tool model: a consuming host must be able to
create and own an isolated WEX identity space using its available storage,
without WEX requiring any particular backend or moving host business data into
WEX.

The existing ID format, immutable lifecycle evidence, direct-child placement,
and explicit binding boundary remain useful. They must be preserved as
portable identity semantics rather than central-service ownership.

## Decision

### Host-local identity space

WEX Identity is a portable Plugin + Tool. An approved host storage adapter
creates and accesses one isolated WEX identity space for that host, registers
the host platform in that space, and stores WEX allocation lifecycle evidence
there. The identity address is the pair of its host identity-space registration
and allocation ID; an allocation ID alone is not globally unique across hosts.

Installation or initialization must first detect whether the WEX identity space
exists. When absent, it must require explicit user or administrator approval
before creating the space or its platform registration. The first reference
adapter will use local folder/file storage. PostgreSQL, WordPress/MySQL, an API,
or another backend may be demonstrated later only as an adapter implementing
the same WEX persistence semantics.

The host continues to own its business/domain identities, data, persistence,
validation, permissions, and lifecycle. WEX identity storage contains only the
WEX platform registration and WEX allocation lifecycle evidence; it must not
absorb host business data.

### Portable allocation semantics

Each approved storage adapter implements one framework-neutral WEX persistence
contract. Backend choice must not alter allocation, parent/slot, lookup,
collision, non-reuse, binding-boundary, or approval/init semantics. The
contract and record shapes are deferred to Phase 2.

Within one host identity space, the adapter must register and validate the
closed allocation-family vocabulary, reserve before assignment, reject
collisions, retain immutable allocation evidence, and never reuse a registered
allocation. A reservation, assignment, or retirement remains unavailable for
reuse in that host space. The adapter must provide durable readback and lookup
required for a registered allocation's lifecycle; its concurrency/atomicity
mechanism is backend-specific but must prove the same collision and non-reuse
guarantees.

The ID forms, uppercase unambiguous Base32 suffix alphabet, closed family
recognition, explicit root or `parentAllocationId`/parent-owned `slot`
placement, and explicit opaque binding boundary from ADR 0013 remain valid.
Parentage is never inferred from an ID prefix. Bindings remain separate from
host-domain authority and never contain callbacks, permissions, or executable
payloads.

### Tool and adapter boundary

The WEX Plugin + Tool owns portable identity rules, initialization flow, and
identity inspection/targeting tooling. A host adapter owns its local WEX-space
persistence implementation and no host business data. A later host integration
may use WEX identity to find a registered WEX shell or component for inspection,
diagnostics, or separately authorised extension without traversing root CSS or
the host application's component tree.

The current Identity Station and its PostgreSQL ledger are an optional storage
adapter/proof, not the WEX identity core, universal namespace, or mandatory
runtime. They must be converted through the later adapter phase; this decision
does not modify them.

## Exact supersession

This decision supersedes only the central-ownership and mandatory-storage
clauses below; all other clauses remain in force unless a later accepted
decision changes them.

| Earlier decision | Superseded clauses | Still valid |
| --- | --- | --- |
| ADR 0013 | “globally unique” allocation namespace; “single WEX UI Identity Authority / Station”; Station-only issuance, durable lifecycle, and lookup; applications may not mint host-local IDs | Four identity layers; exact closed family forms and validation; explicit parent/slot; opaque serializable bindings; reservation-before-use, immutable/non-reusable lifecycle semantics; no domain ownership in WEX |
| ADR 0014 | Station-owned single durable ledger; Station alone chooses/reserves/assigns IDs; Station-only first-allocation bootstrap | Lifecycle evidence fields and immutable placement; reserve-before-assign; root-before-direct-child ordering; collision rejection and non-reuse requirements |
| ADR 0015 | Standalone Node Station as sole runtime; PostgreSQL `wex_identity` ledger as mandatory placement; Station-only writer/operations; consumer-local storage cannot prove the required semantics | A PostgreSQL transaction/unique boundary is a valid optional proof; reserve, assign, and lookup remain required portable operations; no caller-supplied allocation IDs; no domain-record or presentation ownership |

## Consequences and next boundary

No implementation changes follow from this ADR alone. Phase 2 must define the
framework-neutral storage-adapter contract, platform-registration and
identity-space records, initialization/approval state, lifecycle, lookup,
collision/non-reuse, parent/slot, and binding boundary before any adapter is
implemented. The Header remains deferred until Phases 1–4 are accepted and
promoted, then allocated through the portable local adapter first.
