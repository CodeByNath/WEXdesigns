# WEX Identity Portability

Status: AWAITING REVIEWER REVIEW
Phase: 2B — Accepted contract decision recorded

## Reviewer verdict

**Proceed with safeguards**

Reviewer independently verified candidate
`b50e84b429966f4f8457abcd1c2fd6624a10af13` is a two-commit direct descendant
of `main` at `0b1cf4a0c08ddc1b80ce0d3cf53dd4a2f01b0539` and changes only the
nine authorised Phase 2 contract/schema files.

Accepted contract substance:

- `wexPlatformRegistrationId` is a first-class WEX-owned identity whose format
  remains deliberately unresolved; `platformKey` is opaque host reference only;
- the Plugin + Tool creates/validates registration after approval, while the
  adapter persists/reads it without generating, replacing, or reusing it;
- the portable address is `(wexPlatformRegistrationId, allocationId)`;
- lifecycle, collision/non-reuse, parent/slot, binding, backend-neutrality,
  and no-runtime boundaries remain intact.

Independent `pnpm --filter @weerax/schemas check`, `pnpm audit:foundation`,
and `git diff --check` passed. No adapter, runtime, filesystem, PostgreSQL,
WordPress, Header, UI, or real-allocation work is present.

## Builder handoff

- Candidate branch: `feat/portable-identity-storage-contract`
- Updated candidate SHA: `50c0c9120617e4c15e47265b018833c173661771`
- Changed only ADR 0017 acceptance bookkeeping: its status, decision index,
  and affected architecture/Code Map acceptance labels.
- Contract semantics, schemas, runtime, adapters, and `main` are unchanged.
- Checks passed: `pnpm audit:foundation` and `git diff --check`.
- Unresolved issues: none for Phase 2B; Phase 3 implementation remains
  separately gated.

## Locked roadmap

- Phase 3 — local folder adapter.
- Phase 4 — Plugin/Tool initialization/bootstrap.
- Phase 5 — PostgreSQL optional adapter conversion.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.

Header remains deferred until Phases 1–4 are accepted and promoted.
