# Platform Identity System

Status: BUILDER ACTION REQUIRED
Phase: 2A — Adopt centralized WEX UI identity authority

## Reviewer verdict

**Proceed with safeguards**

Owner has selected the issuer model.

The mature CompuZign identifier mechanics remain valid precedent:
closed families, fixed suffix, centralized validation, reservation before bind,
immutability, non-reuse, explicit lookup/binding, and tombstones where lifecycle
requires them.

WEX must adapt those mechanics to **UI identity**, not copy CompuZign domain
entities or storage.

## Selected authority model

WEX UI allocation identities are issued through one authoritative **WEX UI
Identity Authority / Station**.

It owns the WEX UI identifier namespace and is the only authority permitted to:

- register/validate WEX UI identity families;
- mint allocation IDs;
- reserve before assignment;
- reject collisions;
- prevent reuse;
- resolve allocation identity;
- maintain reverse lookup where required;
- retain retirement/tombstone records where required by durable lifecycle.

Applications/products request WEX UI identities. They do not independently mint
IDs from disconnected local namespaces.

This resolves the prior contradiction between a five-character suffix and
independent issuers.

## Ownership boundary

Do not confuse the identity authority with the presentation package.

- `@weerax/wex` remains presentation authority.
- `@weerax/schemas` owns serializable identity/binding contracts.
- the WEX UI Identity Authority/Station owns issuance, reservation, lookup and
  identity lifecycle.
- adapters bind WEX UI allocations to opaque platform/domain references.
- consuming platforms remain authoritative for business/data identities,
  persistence, permissions, validation and domain actions.

## Identity domains

Keep these distinct:

1. reusable UI definition/capability identity;
2. concrete WEX UI composition/allocation identity;
3. external platform/domain identity;
4. explicit serializable binding/reference.

Bindings and parent/child relationships are explicit data. Prefixes never encode
relationships.

Primitive atoms remain ID-less unless independent identity is required.

## Candidate family policy to retain for ADR correction

- closed family vocabulary;
- fixed five-character generated suffix;
- uppercase unambiguous Base32 alphabet;
- candidate Admin Manager family: `WEXAM + XXXXX`;
- candidate Admin-owned Header allocation: `WEXAMH + XXXXX`;
- exact full-form family recognition because `WEXAM` is a prefix of
  `WEXAMH`;
- reusable Header capability remains separate from an Admin Header allocation.

The ADR must define uniqueness as guaranteed by the single authoritative WEX UI
Identity Authority across the namespace it owns. Do not claim uniqueness outside
that authority boundary.

## Builder correction

Update the existing candidate branch
`docs/platform-identity-architecture` only.

Revise the architecture note and ADR so that:

1. application-owned independent issuers are removed;
2. one WEX UI Identity Authority/Station owns issuance/reservation;
3. apps request/consume identities but cannot mint independently;
4. schema/package ownership remains separate from identity-service ownership;
5. lookup/non-reuse/tombstone behaviour is bounded to demonstrated lifecycle
   requirements;
6. the platform↔UI adapter model remains bidirectional and explicit;
7. CompuZign is cited only as precedent, never as WEX architecture authority.

Run `git diff --check` and `pnpm audit:foundation`.

Return this same file to `AWAITING REVIEWER REVIEW` with the exact candidate
SHA and changed files.

## Stop boundary

Architecture correction only.

Do not implement schemas, generator, registry/storage, service runtime, adapters,
Header IDs, bindings or migrations yet.
