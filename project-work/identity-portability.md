# WEX Identity Portability

Status: BUILDER ACTION REQUIRED
Phase: 2 — Define portable identity + storage-adapter contract

## Reviewer verdict

**Proceed**

Phase 1 is closed.

Reviewer independently verified:

- remote `main` remains
  `0b1cf4a0c08ddc1b80ce0d3cf53dd4a2f01b0539`;
- the completed closeout topic branch is deleted;
- remote heads are exactly `main` and `Project-work-instructions`;
- no Phase 2 source work has started.

## Phase 2 objective

Define the portable WEX Identity contract that every storage backend must obey
before any adapter implementation begins.

This phase is **contract/architecture only**.

### Locked ownership

WEX Identity Plugin + Tool owns:
- platform/system registration semantics;
- family validation;
- ID generation/issuance;
- reserve / assign / retire lifecycle rules;
- parent/slot semantics;
- lookup/targeting semantics;
- initialization/approval semantics.

Storage Adapter owns only:
- create/open isolated host WEX identity space;
- persist/read WEX-directed records;
- atomic compare/write or equivalent collision protection;
- durable non-reuse evidence;
- backend-specific filesystem/DB/API mechanics.

Adapters must never invent IDs, families, lifecycle states, or identity meaning.

## Builder instruction — Phase 2 only

Create one topic branch from current `main`.

Define the minimum framework-neutral contract and record shapes required for:

1. **Identity-space registration**
   - host/platform registration record;
   - stable identity-space reference used with allocation IDs;
   - no host business payload.

2. **Initialization state**
   - detect absent/present WEX identity space;
   - approval-required state before first creation;
   - initialized/registered state;
   - no UI implementation.

3. **Allocation persistence record**
   - allocation ID;
   - family;
   - lifecycle state;
   - immutable placement: root or exact parentAllocationId + parent-owned slot;
   - required timestamps/evidence for reserve/assign/retire.

4. **Storage-adapter operations**
   - detect/open/create space;
   - read platform registration;
   - persist registration;
   - atomic reserve record;
   - lifecycle transition persistence;
   - lookup/read;
   - retirement/non-reuse evidence.

5. **Concurrency/collision contract**
   - adapter-specific mechanism allowed;
   - portable guarantee must be identical across backends.

6. **Binding boundary**
   - preserve existing opaque platform/domain binding separation;
   - do not move product/domain resolution into storage adapters.

### Required architecture decisions

- Decide where the portable Plugin + Tool contract lives in repository
  architecture without violating dependency rules.
- Decide which shapes belong in `@weerax/schemas` versus runtime/plugin code.
- Keep the contract backend-neutral: no fs paths, SQL, WordPress APIs, database
  credentials, callbacks, CSS, UI components, or domain logic in schemas.
- Local folder is only the first future adapter; do not implement it in Phase 2.

### Explicit exclusions

Do not:
- implement filesystem storage;
- modify PostgreSQL Station runtime;
- create WordPress/MySQL integration;
- mint real Header/Admin IDs;
- resume Header work;
- add product-specific records;
- add UI.

Update/add ADR/architecture/schema-contract documentation only as required by the
accepted architecture. If a minimal schema shape is necessary to express the
portable serializable contract, it may be proposed/implemented only if clearly
framework-neutral and covered by focused validation tests.

Run the relevant checks, including `pnpm audit:foundation`, schema checks if
schemas change, and `git diff --check`.

Push the candidate, update this same file to
`AWAITING REVIEWER REVIEW` with exact branch/SHA, changed files, checks, and
unresolved decisions, then stop.

## Locked roadmap

- Phase 3 — local folder adapter.
- Phase 4 — Plugin/Tool initialization: detect -> approval -> create/open space
  -> register platform -> ready.
- Phase 5 — convert PostgreSQL proof into optional adapter.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.

Header remains deferred until Phases 1–4 are accepted and promoted.

No Builder may alter the accepted ownership model without Owner + Reviewer
architecture approval.
