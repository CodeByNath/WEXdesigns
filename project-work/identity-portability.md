# WEX Identity Portability

Status: BUILDER ACTION REQUIRED  
Phase: 4A — Promote ADR 0018 acceptance state

## Reviewer verdict

**Proceed**

Accepted candidate:
`docs/adr-0018-acceptance-state` at
`4f876eb26510338479d2bf3d7ec3d27773f9384e`.

Independent review confirms:

- candidate is exactly one commit ahead of `main`;
- only
  `docs/decisions/0018-wex-platform-registration-bootstrap-contract.md`
  and `docs/decisions/README.md` changed;
- ADR 0018 now records `Accepted — Phase 4A architecture authority`;
- `## Proposed decision` is now `## Decision`;
- ADR 0018 is listed under the accepted ADR index and the empty Proposed section
  is removed;
- identifier format, Base32 generation method, state machine, ownership,
  bootstrap semantics, and consequences remain unchanged;
- no schema, adapter, Plugin + Tool runtime, allocation, PostgreSQL conversion,
  host integration, Header, or UI work was introduced.

The correction matches the bounded Phase 4A instruction.

## Builder action — promotion only

1. Verify `origin` is `CodeByNath/WEXdesigns`.
2. Verify remote heads remain within the three-branch maximum.
3. Fast-forward `main` only to
   `4f876eb26510338479d2bf3d7ec3d27773f9384e`.
4. Run `pnpm audit:foundation`.
5. Verify remote `main` resolves exactly to that SHA.
6. Delete `docs/adr-0018-acceptance-state` only after exact remote-main
   verification proves it safe.
7. Update this same work file to `AWAITING REVIEWER REVIEW` with promotion,
   check, branch-housekeeping, and exact remote-SHA evidence.
8. Stop. Do not begin Phase 4B.

No source/runtime/schema implementation is authorised in this promotion step.

## Next gate

Phase 4B — Plugin + Tool bootstrap remains closed until Reviewer independently
verifies this promotion on `main`.

Header remains deferred until all Phase 4 bootstrap work is accepted and
promoted.

## Locked roadmap

- Phase 4B — Plugin + Tool bootstrap.
- Phase 5 — PostgreSQL optional adapter conversion.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.
