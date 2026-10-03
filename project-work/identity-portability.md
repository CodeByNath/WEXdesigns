# WEX Identity Portability

Status: AWAITING REVIEWER REVIEW
Phase: 1 — Restore architecture authority

## Builder handoff

Candidate: `docs/identity-portability-authority` at
`ce05552844a8b95e4bef135488c1c3944cbbb5f4`, pushed to `origin` from
`main` baseline `d06538613d6f25b2337daaf9727b5604c3524c75`.

The candidate adds proposed ADR 0016 and updates the identity architecture,
repository map, Identity Station Code Map, and decision index. ADR 0016
identifies the exact central-Station/PostgreSQL clauses superseded in ADRs
0013–0015 and preserves their valid ID form, lifecycle, parent/slot, and
binding rules as host-local adapter semantics.

Evidence:

- `pnpm audit:foundation` passed.
- `git diff --check` passed before commit and staging.
- Remote branch verification returned the exact candidate SHA above.
- Docs only: no runtime, schema, storage, Header, PostgreSQL, or adapter source
  changed.

Await Reviewer verdict. Do not begin Phase 2 or Header work.

## Owner direction — strict

WEX Identity is a **Plugin + Tool**, not a mandatory central database service.

WEX defines portable UI identity rules and tooling. When plugged into a host system, an approved storage adapter creates an isolated WEX identity space inside that host's available storage, registers that platform/system, and persists that system's WEX shell/component identities.

Purpose: directly identify, target, inspect, debug and extend a specific WEX shell/component from inside or outside the host controller without depending on root CSS traversal or host-specific component structure.

### Non-negotiable invariants

- Each host/system owns its own WEX identity **circle/space** through an adapter.
- WEX identity does not replace host business/domain identities.
- WEX must not require PostgreSQL, WordPress, MySQL, filesystem or any one backend.
- PostgreSQL is one storage adapter/proof only; never universal authority.
- First reference adapter is local file/folder storage.
- Installation/init must detect absence and require explicit user/admin approval before creating the WEX space and platform registration.
- Storage adapters implement one WEX-defined persistence contract; changing backend must not change identity semantics.
- A registered WEX allocation remains immutable/non-reusable within its host identity space.
- Host adapters may later target filesystem, WordPress/MySQL, PostgreSQL, API or other demonstrated storage.
- Do not move host business data into WEX.
- Do not resume Header work until the recorded resume gate.
- No Builder may reinterpret these invariants without Owner + Reviewer architecture approval.

## Phased plan

### Phase 1 — Authority recovery
Audit ADR 0013–0015, platform-identity architecture, repository map and current Identity Station. Propose the smallest superseding ADR/architecture correction that preserves useful ID format/lifecycle rules but removes mandatory central-Station/PostgreSQL ownership. **Docs only. Stop for review.**

### Phase 2 — Portable storage contract
Define framework-neutral storage-adapter contract and identity-space records: platform registration, allocation lifecycle, parent/slot, lookup, collision/non-reuse, bindings boundary, approval/init state. No backend implementation. Stop.

### Phase 3 — Local folder adapter
Implement first plug-and-play adapter that creates an isolated WEX folder/file structure after approval, initializes platform identity, and durably stores allocations. Tests must prove restart/readback, collision/non-reuse and no host-data ownership. Stop.

### Phase 4 — Plugin/tool bootstrap
Implement host-facing initialization flow: detect existing WEX space -> request approval when absent -> create/register -> return platform registration -> expose identity tooling. No product-specific UI. Stop.

### Phase 5 — PostgreSQL conversion
Refactor current PostgreSQL Identity Station work to implement the same adapter contract. It must become optional infrastructure, not the core model. Preserve transaction/concurrency proof. Stop.

### Phase 6 — Component targeting proof
Prove a registered shell/component can be located by WEX identity and independently inspected/targeted for diagnostics or separately-authorised features without root CSS/tree traversal. No domain feature implementation. Stop.

### Phase 7 — Host integration proof
Use a separately authorised real host (CompuZign/WordPress is a candidate) to implement its storage adapter and platform registration without importing its domain rules into WEX. Stop.

### Header resume gate
Header work may resume after Phases 1–4 are accepted and promoted. Allocate/test Header through the portable local adapter first; host-specific fitting remains later.

## Builder instruction — Phase 1 only

Create one topic branch from current `main`. Change architecture/ADR documentation only. Explicitly identify which clauses in ADR 0013–0015 are superseded and what remains valid. Do not modify runtime, schemas, storage, Header, PostgreSQL code or adapters yet.

Run `pnpm audit:foundation` and `git diff --check`, push the candidate, update this file to `AWAITING REVIEWER REVIEW`, and stop.
