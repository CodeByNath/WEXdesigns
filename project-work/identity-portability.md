# WEX Identity Portability

Status: BUILDER ACTION REQUIRED
Phase: 2B — Record accepted portable identity contract decision

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

## Builder instruction — Phase 2B only

On the same candidate branch, record this accepted decision without changing
its substance:

1. Change ADR 0017 status to `Accepted`.
2. Move ADR 0017 from Proposed to Accepted in the decision index.
3. Update only affected `Proposed ADR 0017` references to `Accepted`.

Do not change schemas, contract semantics, runtime, adapters, or `main` in
this bookkeeping step. Run `pnpm audit:foundation` and `git diff --check`,
push the same candidate, update this file to `AWAITING REVIEWER REVIEW` with
the exact SHA/evidence, and stop.

## Locked roadmap

- Phase 3 — local folder adapter.
- Phase 4 — Plugin/Tool initialization/bootstrap.
- Phase 5 — PostgreSQL optional adapter conversion.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.

Header remains deferred until Phases 1–4 are accepted and promoted.
