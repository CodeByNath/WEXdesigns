# WEX Identity Portability

Status: BUILDER ACTION REQUIRED
Phase: 1A — Correct Plugin/Tool vs storage-adapter ownership

## Reviewer verdict

**Stop — architectural risk**

Reviewer independently inspected
`docs/identity-portability-authority` at
`ce05552844a8b95e4bef135488c1c3944cbbb5f4`.

The candidate correctly removes mandatory central PostgreSQL/Station ownership,
defines host-local WEX identity spaces, preserves host-domain independence, makes
PostgreSQL optional, records explicit approval-before-init, and defers Header.

### Blocking ownership error

The proposed authority currently gives the **storage adapter** responsibility to
register/validate families, issue IDs, reserve/assign lifecycle and effectively
operate WEX identity semantics.

That is not the Owner direction.

**WEX Identity is the Plugin + Tool. Storage is the adapter.**

The portable WEX identity core must own identity semantics and operations.
A storage adapter only persists those semantics into the host's available
storage and provides the backend-specific atomicity/durability mechanism.

Do not replace one central identity authority with many backend-specific identity
authorities.

## Strict corrected boundary

```text
WEX Identity Plugin + Tool
  owns:
  - platform/system registration semantics
  - family validation
  - ID generation/issuance rules
  - reserve / assign / retire lifecycle rules
  - parent/slot semantics
  - lookup/targeting semantics
  - init/approval flow
          |
          v
WEX Storage Adapter Contract
  owns:
  - create/open isolated host WEX space
  - persist/read lifecycle records
  - atomic compare/write or equivalent collision protection
  - durable non-reuse evidence
  - backend-specific file/DB/API mechanics
          |
          v
Host storage
  filesystem / WordPress-MySQL / PostgreSQL / API / other
```

Changing storage backend must never change WEX identity generation or lifecycle
meaning.

## Builder correction — Phase 1A only

On the same topic branch:

1. Correct proposed ADR 0016 and architecture docs so WEX Plugin + Tool owns the
   portable identity semantics/operations and storage adapters own persistence
   mechanics only.
2. Remove wording that makes each adapter an independent identity issuer or
   family authority.
3. Preserve host-local identity spaces and the address boundary:
   platform/system registration + WEX allocation identity.
4. Keep allocation IDs unique/non-reusable within their registered host space;
   Phase 2 will define the exact platform-registration record/address shape.
5. Keep explicit approval before creating a host WEX space.
6. Keep PostgreSQL as optional adapter/proof only and local folder as first
   reference adapter.
7. Explicitly state adapters must not invent IDs, families, lifecycle states or
   identity semantics outside the WEX Plugin/Tool contract.
8. Docs only. No runtime/schema/storage/Header changes.
9. Run `pnpm audit:foundation` and `git diff --check`, push the corrected
   candidate, update this same file to `AWAITING REVIEWER REVIEW`, and stop.

## Locked roadmap after Phase 1

- Phase 2 — portable WEX identity + storage-adapter contract.
- Phase 3 — local folder adapter.
- Phase 4 — Plugin/Tool initialization: detect -> approval -> create/open space
  -> register platform -> ready.
- Phase 5 — convert PostgreSQL proof into optional adapter.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.

Header remains deferred until Phases 1–4 are accepted and promoted.

No Builder may alter this ownership model without Owner + Reviewer architecture
approval.
