# WEX Identity Portability

Status: AWAITING REVIEWER REVIEW
Phase: 3B — Preserve irreversible lifecycle evidence submitted

## Reviewer verdict

**Stop — architectural risk**

Reviewer independently inspected corrected candidate
`7778d2839ee0fbc3932b989ba4afa8db220a7e1e`.

Phase 3A filesystem corrections are accepted:

- symlinked allocation storage is rejected;
- allocation storage is resolved/checked inside the configured WEX space;
- registration/allocation/lock entries must be regular non-symlink files;
- partial/corrupt/incompatible remnants fail closed;
- missing registration plus existing remnants cannot be silently reinitialized;
- fresh detection remains side-effect free;
- normal create/reopen/readback remains supported.

One persistence invariant remains blocking.

## Blocking gap — irreversible lifecycle evidence

`transition()` currently verifies only:

- current state equals caller-supplied `expectedState`;
- immutable ID/family/placement/reservation evidence is unchanged.

It can therefore persist a supplied transition such as:

- `retired -> assigned`; or
- `assigned -> reserved`.

That can erase retirement/assignment evidence and violate the adapter's accepted
responsibility to provide **durable non-reuse evidence**.

WEX Plugin + Tool still owns lifecycle meaning. The adapter must not invent
business/lifecycle policy, but it must enforce the persistence-level invariant
that already-committed evidence cannot be rolled backward or removed.

## Builder correction — Phase 3B only

On the same topic branch:

1. Preserve the accepted ownership boundary: do not move lifecycle authority
   into the adapter.
2. Add the minimum persistence guard needed to prevent durable lifecycle
   evidence from being rolled backward or erased.
3. At minimum:
   - a retired record must never be replaced by another lifecycle state;
   - an assigned record must never be replaced by a reserved record;
   - existing `assignedAt`, `retiredAt`, and retirement evidence must not be
     removed once durably committed.
4. Continue allowing only transitions that preserve accumulated evidence. Do
   not invent new lifecycle states or domain rules.
5. Add deterministic tests proving rollback attempts are rejected and the
   original durable record remains unchanged after rejection.
6. Retain all accepted Phase 3A filesystem hardening.
7. Do not begin Phase 4 or modify PostgreSQL, WordPress, Header, UI, identity
   generation, or approval/bootstrap behavior.

Run:
`pnpm --filter @weerax/adapters check`,
`pnpm --filter @weerax/schemas check`,
`pnpm audit:foundation`,
`pnpm check`,
and `git diff --check`.

## Builder handoff

Candidate: `feat/local-folder-identity-adapter` at
`fa66bf6ce3c24d8d83c373f3025f429d1533d847` (pushed and remote-verified).

Changed only:

- `packages/adapters/src/local-folder-identity-adapter.ts`
- `packages/adapters/test/local-folder-identity-adapter.test.mjs`

The adapter now rejects assigned-to-reserved and retired-to-non-retired writes,
and preserves committed assignment and retirement evidence. Focused tests prove
rejected rollback/revision attempts leave the persisted record unchanged.

Evidence passed:

- `pnpm --filter @weerax/adapters check` (8 tests);
- `pnpm --filter @weerax/schemas check` (10 tests);
- `pnpm audit:foundation`;
- `pnpm check` (40 tasks); and
- `git diff --check`.

No browser validation applies: this phase changes no runtime, catalogue, or
browser-facing presentation. No deviations or unresolved Builder issues.

## Locked roadmap

- Phase 4 — Plugin/Tool initialization/bootstrap.
- Phase 5 — PostgreSQL optional adapter conversion.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.

Header remains deferred until Phases 1–4 are accepted and promoted.
