# WEX Identity Portability

Status: BUILDER ACTION REQUIRED
Phase: 3A — Harden local-folder isolation and damaged-space detection

## Reviewer verdict

**Stop — architectural risk**

Reviewer independently inspected
`feat/local-folder-identity-adapter` at
`714e4c72a117950754f847644688b2aa9129a254`.

The candidate correctly preserves WEX identity ownership and implements the
intended local persistence mechanics, including side-effect-free basic
detection, supplied registration persistence, allocation reserve/read/transition,
lock-based collision control, temp-file + rename writes, schema validation,
restart/readback, and no ID generation.

Two blocking filesystem-boundary gaps remain.

### 1. Symlink/path-containment escape

The adapter constructs paths beneath the configured directory, but it does not
prove that existing filesystem entries such as `allocations/` resolve inside
that directory.

A symlinked directory can therefore redirect allocation writes outside the
configured WEX identity space even though the allocation ID itself is schema
safe.

The existing path-escape test only rejects an invalid allocation ID string; it
does not prove filesystem containment.

### 2. Orphaned/damaged space can be mistaken for absent

`detectSpace()` treats a missing `registration.json` as `absent` even when
the WEX directory or allocation records already exist.

That permits `createSpace()` to register a new platform identity over leftover
or partially damaged WEX persistence, risking accidental adoption of old
allocation evidence.

An existing non-empty/partial WEX space must not be silently reinitialized.

## Builder correction — Phase 3A only

On the same topic branch:

1. Harden filesystem containment so every read/write target used by the adapter
   is proven to remain inside the configured WEX identity-space directory.
2. Reject symlink/redirection conditions that could cause registration,
   allocations, locks, or temp writes to resolve outside that space.
3. Define detection distinctly enough to prevent partial/damaged WEX state from
   being reported as cleanly absent.
4. A space with WEX remnants but no valid registration must fail closed as
   damaged/inconsistent; it must not be recreated automatically.
5. `createSpace()` must refuse to initialize over existing incompatible WEX
   remnants.
6. Preserve side-effect-free detection.
7. Add deterministic tests for:
   - symlinked allocation directory/path escape;
   - partial space with missing registration + existing allocation/remnant;
   - corrupt registration/remnant fail-closed behavior;
   - normal fresh create and reopen still working.
8. Keep adapter ownership unchanged: no ID generation, family selection,
   lifecycle semantics, approval UI, or host-domain behavior.
9. Do not begin Phase 4 or modify PostgreSQL/WordPress/Header/UI.

Run:
`pnpm --filter @weerax/adapters check`,
`pnpm --filter @weerax/schemas check`,
`pnpm audit:foundation`,
`pnpm check`,
and `git diff --check`.

Push the corrected candidate, update this same work file to
`AWAITING REVIEWER REVIEW` with exact SHA/evidence, and stop.

## Locked roadmap

- Phase 4 — Plugin/Tool initialization/bootstrap.
- Phase 5 — PostgreSQL optional adapter conversion.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.

Header remains deferred until Phases 1–4 are accepted and promoted.
