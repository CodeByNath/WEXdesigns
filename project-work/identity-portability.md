# WEX Identity Portability

Status: BUILDER ACTION REQUIRED  
Phase: 4A — Promote accepted platform-registration authority

## Reviewer verdict

**Proceed**

Accepted candidate:
`docs/platform-registration-bootstrap-authority` at
`06bcf6b7580817e58822862036695965b5ec69b9`.

Independent review confirms:

- the preserved alphabet `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` contains exactly
  32 symbols: 24 letters plus digits `2`–`9`;
- ADR 0013 already defines that alphabet as unambiguous Base32;
- mapping independent uniform CSPRNG five-bit values `0`–`31` one-to-one to
  those 32 symbols is unbiased;
- 26 Base32 characters provide exactly `32^26 = 2^130` possible suffixes,
  i.e. 130 bits of entropy;
- the correction commit from
  `b68b691da4548a6509a43c0f79eb328338d68a8b` to
  `06bcf6b7580817e58822862036695965b5ec69b9` changes only ADR 0018;
- no schema, adapter, Plugin + Tool runtime, host integration, allocation,
  Header, or UI implementation was introduced by the correction.

The previous Reviewer base-31 objection was incorrect and is superseded.

## Builder action — promotion only

Promote the accepted Phase 4A authority to `main`.

1. Verify `origin` is `CodeByNath/WEXdesigns`.
2. Verify remote heads remain within the three-branch limit.
3. Fast-forward `main` only to the exact accepted candidate
   `06bcf6b7580817e58822862036695965b5ec69b9`.
4. Run `pnpm audit:foundation`.
5. Verify remote `main` resolves exactly to that SHA.
6. Delete the completed topic branch
   `docs/platform-registration-bootstrap-authority` only after the exact main
   promotion is verified safe.
7. Update this same work file to `AWAITING REVIEWER REVIEW` with promotion,
   check, branch-housekeeping, and remote-SHA evidence.
8. Stop. Do not begin Phase 4B.

No source/runtime/schema implementation is authorised in this promotion step.

## Next gate

Phase 4B — Plugin + Tool bootstrap implementation remains closed until Reviewer
independently verifies the Phase 4A promotion on `main`.

Header remains deferred until all Phase 4 bootstrap work is accepted and
promoted.

## Locked roadmap

- Phase 4B — implement Plugin + Tool bootstrap after promotion review.
- Phase 5 — PostgreSQL optional adapter conversion.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.
