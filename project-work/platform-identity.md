# Platform Identity System

Status: BUILDER ACTION REQUIRED
Phase: 2A — Resolve WEX allocation namespace and issuer authority

## Reviewer verdict

**Stop — architectural risk**

Reviewer inspected the pushed candidate
`docs/platform-identity-architecture` at
`16fd8ca7eea465e54318540091655d6417b0e263`.

The four-layer identity split, explicit parent/slot relationship, serializable
binding direction, atom-resolution boundary, and separation from domain identity
are sound.

One unresolved contradiction prevents ADR acceptance.

## Blocking issue — uniqueness scope versus issuer model

ADR 0013 currently says:

- every WEX allocation ID is **globally unique within the WEX allocation
  namespace**;
- the suffix is exactly five Base32 characters;
- issuance/reservation is owned by a **consuming application/integration**
  configuration service;
- there is no reusable/core registry.

Those statements do not currently establish a mechanism capable of guaranteeing
global uniqueness across independent consumers/configuration stores.

A five-character Base32 suffix provides 33,554,432 candidates per family.
Reservation can guarantee non-collision only inside the reservation authority
that can see the relevant namespace. Independent application-owned issuers
cannot deterministically guarantee one global WEX namespace without a shared
authority or a different identity model.

Do not carry CompuZign's five-character suffix into WEX merely because its
single-platform registry can reserve that space.

## Required correction

Builder must revise the proposed architecture/ADR to make **namespace scope and
issuer authority explicit**.

Choose and justify one coherent model from repository architecture, for example:

1. IDs are unique only within an explicitly identified WEX configuration/runtime
   namespace, with that namespace participating in the full reference; or
2. WEX owns a shared/global issuance authority capable of reserving across all
   consumers; or
3. use an identifier construction whose uniqueness semantics do not depend on a
   shared five-character reservation space.

Do not select an option merely for convenience. Check it against portability,
offline/local authoring, multiple products, allocation lookup, persistence and
future adapter use.

If the five-character family format remains, state exactly **where its uniqueness
is guaranteed** and stop calling it global if that guarantee is namespace-local.

## Additional clarification required

Use "composition/schema authority" rather than language that could imply
`@weerax/wex` owns identifier contracts. The WEX package remains presentation
authority; serializable identity contracts belong to schemas/composition
authority.

Retain these accepted boundaries:

- definition/capability identity != allocation identity;
- WEX UI identity != platform/domain identity;
- bindings are explicit serializable data;
- parent/child links are explicit, never prefix-derived;
- bindings contain no executable callbacks;
- primitive atoms remain ID-less unless independent identity is required.

## Stop boundary

Architecture correction only.

Do not implement schemas, generators, registries, storage, adapters, runtime
bindings, Header IDs or migrations.

Update the same candidate branch with the corrected ADR/architecture note, run
`git diff --check` and `pnpm audit:foundation`, then return this work file to
`AWAITING REVIEWER REVIEW` with exact SHA and the chosen namespace/issuer
model.
