# WEX Identity Portability

Status: AWAITING REVIEWER REVIEW
Phase: 4A — Correct platform-registration authority proposal

## Reviewer verdict

**Stop — architectural risk**

Candidate reviewed:
`docs/platform-registration-bootstrap-authority` at
`b68b691da4548a6509a43c0f79eb328338d68a8b`.

The proposal correctly preserves the accepted ownership boundary from ADRs
0016–0017: the WEX Identity Plugin + Tool owns registration generation and
validation; the adapter only persists the supplied registration; bootstrap is
approval-gated and fail-closed; host/domain identity is not reused as WEX
registration identity.

One blocking contract defect prevents acceptance:

- the proposed alphabet
  `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` has **31 symbols**;
- ADR 0018 says each output character maps one independent uniform five-bit
  value to that alphabet, but five bits have 32 outcomes;
- therefore the stated generator cannot be implemented as a uniform direct
  mapping;
- 26 base-31 characters contain about **128.8 bits** of entropy, not 130 bits.

This must be corrected before runtime/schema implementation so Phase 4B does
not encode biased or undefined identity generation.

## Builder correction — Phase 4A only

Revise the same ADR 0018 proposal on the same topic branch.

Preserve the existing accepted allocation alphabet. Do **not** invent a new
symbol or change allocation-ID formats.

Specify a cryptographically secure **uniform base-31 generation method**
(e.g. rejection sampling or an equivalent unbiased construction), and state the
entropy/collision claim accurately for 26 base-31 characters. Keep the exact
`WEXPR-` form and validation regex unless the correction itself proves they
must change.

Do not modify schemas, adapters, Plugin + Tool runtime, host integration,
allocation issuance, Header, or UI.

Required evidence:

- `pnpm audit:foundation`
- `git diff --check`
- exact pushed branch/SHA and changed-file list
- confirmation that no Phase 4B implementation began

Return this file to `AWAITING REVIEWER REVIEW` after the corrected proposal is
pushed and remote-verified.

## Locked roadmap

- Phase 4B — implement Plugin/Tool bootstrap only after ADR 0018 is accepted.
- Phase 5 — PostgreSQL optional adapter conversion.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.

Header remains deferred until all Phase 4 bootstrap work is accepted and
promoted.

## Builder correction handoff

Candidate: `docs/platform-registration-bootstrap-authority` at
`06bcf6b7580817e58822862036695965b5ec69b9` (remote verified).

- Revised only
  `docs/decisions/0018-wex-platform-registration-bootstrap-contract.md`.
- The preserved accepted alphabet and schema literal
  `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` contain 32 symbols, not 31 (24 permitted
  letters plus `2`–`9`). The proposal now states the one-to-one, unbiased
  mapping of independent CSPRNG five-bit values `0`–`31`, `32^26` possible
  suffixes, and 130 bits of entropy. A base-31/rejection construction would
  contradict the mandated unchanged alphabet and the accepted ADR 0013
  Base32 contract.
- Checks passed: `pnpm audit:foundation`; `git diff --check`.
- No schema, adapter, Plugin + Tool runtime, host integration, allocation,
  Header, or UI work was begun; Phase 4B remains untouched.
