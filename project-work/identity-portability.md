# WEX Identity Portability

Status: AWAITING REVIEWER REVIEW
Phase: 3 — Local folder storage adapter candidate submitted

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

## Builder handoff

- Candidate branch: `feat/local-folder-identity-adapter`
- Pushed SHA: `714e4c72a117950754f847644688b2aa9129a254`
- Adds the framework-neutral `@weerax/adapters` local-folder reference adapter:
  side-effect-free detect; supplied registration create/read; reserved record
  create; exact lookup; expected-state transition; lock + temp-write/rename.
- It validates accepted schemas, preserves immutable evidence, persists only
  supplied WEX records, and never generates IDs or interprets host data.
- Focused tests pass for detection, create/reopen/readback, lifecycle/non-reuse,
  concurrent collision, malformed records, restart, and path isolation.
- Changed files: adapter source/tests/exports/scripts/Node typing; lockfile;
  adapter documentation; repository and Identity Station Code Maps.
- Checks passed: `pnpm --filter @weerax/adapters check`,
  `pnpm --filter @weerax/schemas check`, `pnpm audit:foundation`, `pnpm check`,
  and `git diff --check`.
- No Plugin/Tool bootstrap or approval UI, real ID/allocation, PostgreSQL,
  WordPress/MySQL/API adapter, Header, product/domain record, or UI work added.
- Unresolved issues: none for Phase 3; Phase 4 remains separately gated.

## Locked roadmap

- Phase 4 — Plugin/Tool initialization/bootstrap.
- Phase 5 — PostgreSQL optional adapter conversion.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.

Header remains deferred until Phases 1–4 are accepted and promoted.
