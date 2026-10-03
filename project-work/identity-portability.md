# WEX Identity Portability

Status: AWAITING REVIEWER REVIEW
Phase: 1E — Accepted documentation branch closed

## Reviewer verdict

**Proceed**

Reviewer independently verified Phase 1D on remote `main` at
`0b1cf4a0c08ddc1b80ce0d3cf53dd4a2f01b0539`.

Accepted evidence:

- ADR 0016 is now `Accepted`.
- The decision index places ADR 0016 under Accepted.
- The Identity Station Code Map records accepted ADR 0016 and the reviewed
  authority baseline.
- The promoted diff contains bookkeeping only; no architecture substance,
  runtime, schema, storage, adapter, PostgreSQL, Header, or UI changes.
- The accepted WEX Plugin + Tool / storage-adapter ownership model is unchanged.

The Code Map's `Verified against` SHA is treated as the authority baseline it
was checked against. Do not create a self-referential update cycle merely
because the bookkeeping commit itself has a newer SHA.

## Builder instruction — Phase 1E only

The completed remote topic branch
`docs/identity-portability-authority-closeout` is no longer needed.

1. Verify remote `main` remains
   `0b1cf4a0c08ddc1b80ce0d3cf53dd4a2f01b0539`.
2. Verify the topic branch tip is already contained in `main`.
3. Delete only that completed remote topic branch.
4. Verify remote heads are exactly:
   - `main`
   - `Project-work-instructions`
5. Update this same work file to `AWAITING REVIEWER REVIEW` with branch
   housekeeping evidence and stop.

Do not begin Phase 2 in this closeout step.

## Builder handoff

- Before deletion, remote `main` and
  `docs/identity-portability-authority-closeout` both resolved to
  `0b1cf4a0c08ddc1b80ce0d3cf53dd4a2f01b0539`; containment was verified.
- Deleted only the completed remote topic branch with `git push origin --delete`.
- Remaining remote heads verified exactly: `main` at
  `0b1cf4a0c08ddc1b80ce0d3cf53dd4a2f01b0539` and
  `Project-work-instructions`.
- No source edits, additional branch operations, or Phase 2 work occurred.

## Next phase after closeout

Phase 2 — define the portable WEX Identity + storage-adapter contract.

The Phase 2 design must preserve these locked responsibilities:

- WEX Identity Plugin + Tool owns platform/system registration semantics,
  family validation, ID generation/issuance, lifecycle, parent/slot,
  lookup/targeting, and approval/init semantics.
- Storage adapters only create/open the isolated WEX space, persist/read
  WEX-directed records, and provide backend atomicity/durability.
- Backend choice cannot alter WEX identity meaning.
- No host business/domain data enters WEX identity storage.
- Local folder/file storage remains the first reference adapter.
- Header remains deferred until Phases 1–4 are accepted and promoted.

No Builder may alter this ownership model without Owner + Reviewer architecture
approval.
