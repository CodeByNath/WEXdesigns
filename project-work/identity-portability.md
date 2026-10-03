# WEX Identity Portability

Status: BUILDER ACTION REQUIRED
Phase: 3 — Implement local folder storage adapter

## Reviewer verdict

**Proceed**

Phase 2 is fully accepted, promoted, and closed.

Reviewer independently verified:

- remote `main` is exactly
  `50c0c9120617e4c15e47265b018833c173661771`;
- the accepted portable contract and ADR 0017 are on `main`;
- the completed Phase 2 topic branch is deleted;
- remote heads are exactly `main` and `Project-work-instructions`;
- no Phase 3 implementation has started.

## Phase 3 objective

Implement the first real storage backend for WEX Identity:

**local folder/file storage**

This is the reference persistence adapter only. It must prove the accepted
portable contract without becoming an identity authority.

## Locked ownership

WEX Identity Plugin + Tool owns:
- platform registration identity semantics;
- family validation;
- ID generation/issuance;
- lifecycle validation;
- parent/slot semantics;
- lookup/targeting semantics;
- approval/init semantics.

Local Folder Adapter owns only:
- detect/create/open isolated WEX storage space;
- persist/read supplied registration and allocation records;
- atomicity/collision protection appropriate to files;
- durable non-reuse evidence;
- backend-specific path/file mechanics.

The adapter must never generate IDs, choose families, decide lifecycle meaning,
or invent host/domain data.

## Builder instruction — Phase 3 only

Create one topic branch from current `main`.

Implement the minimum local-folder adapter that satisfies ADR 0016 + ADR 0017
and the portable storage contract.

Required behavior:

1. **Space detection**
   - detect whether the configured WEX identity space exists;
   - detection must not create files/directories.

2. **Create/open**
   - create only when called by the Plugin/Tool after approval;
   - create an isolated WEX-owned directory structure;
   - reopening must read existing registration rather than replacing it.

3. **Platform registration persistence**
   - persist supplied `wexPlatformRegistrationId`, opaque `platformKey`,
     and registration timestamp;
   - adapter must not mint or alter them.

4. **Allocation persistence**
   - atomically create a supplied reserved allocation record only when the
     portable address is unused;
   - read exact records by portable address;
   - persist only valid supplied lifecycle transitions;
   - no delete/reuse path.

5. **Filesystem atomicity**
   - use a deterministic filesystem-safe mechanism such as exclusive create,
     lock + atomic rename, compare/write, or equivalent;
   - prove concurrent attempts cannot overwrite an occupied allocation;
   - partial/interrupted writes must not leave a valid-looking corrupt record.

6. **Restart/readback proof**
   - close/recreate the adapter instance and prove registration/allocation
     records survive and are readable.

7. **Isolation**
   - all WEX identity files remain inside the configured WEX identity-space
     directory;
   - no host business files/data are touched.

## Required tests

Focused deterministic tests must prove:
- detection is side-effect free;
- first create vs reopen behavior;
- registration immutability/readback;
- collision rejection;
- lifecycle compare/write behavior;
- non-reuse after reserved/assigned/retired records;
- restart/readback;
- concurrent reservation safety;
- malformed/corrupt persisted data is rejected rather than silently accepted;
- no path escape outside the configured WEX identity space.

## Explicit exclusions

Do not:
- implement approval UI or full Plugin/Tool bootstrap flow;
- mint a real WEX platform registration ID;
- mint real Admin/Header allocations;
- modify PostgreSQL Station;
- add WordPress/MySQL/API adapters;
- resume Header work;
- add product/domain records or UI.

Use the accepted schemas/contracts. If implementation reveals a contract defect,
stop and record the architecture gate rather than silently changing semantics.

Run focused adapter tests plus:
`pnpm --filter @weerax/schemas check`,
`pnpm audit:foundation`,
`pnpm check`,
and `git diff --check`.

Push the candidate, update this same file to
`AWAITING REVIEWER REVIEW` with exact branch/SHA, changed files, test evidence,
and unresolved issues, then stop.

## Locked roadmap

- Phase 4 — Plugin/Tool initialization/bootstrap.
- Phase 5 — PostgreSQL optional adapter conversion.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.

Header remains deferred until Phases 1–4 are accepted and promoted.
