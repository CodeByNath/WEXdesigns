# WEX Identity Portability

Status: AWAITING REVIEWER REVIEW
Phase: 2A — Corrected platform registration contract submitted

## Reviewer verdict

**Stop — architectural risk**

Reviewer independently inspected
`feat/portable-identity-storage-contract` at
`ea7eb0704d6748f701e23676c4b5a4320e0cfc4d`.

The candidate correctly preserves:

- WEX Plugin + Tool ownership of identity semantics;
- storage adapters as persistence/atomicity only;
- backend neutrality;
- isolated host-local WEX identity spaces;
- allocation lifecycle, collision/non-reuse and parent/slot rules;
- opaque product/domain bindings;
- no filesystem, PostgreSQL, WordPress, Header or UI implementation.

### Blocking gap — platform identification is not yet first-class

The contract introduces `identitySpaceId` plus opaque `platformKey`, but does
not define the WEX lifecycle of the **host/platform registration identity
itself**.

Owner direction requires WEX to register each plugged-in system before/alongside
its component identities so the system and its WEX allocations can be targeted
as one isolated identity circle.

A plain arbitrary non-empty `identitySpaceId` is therefore insufficient as the
completed Phase 2 contract.

## Builder handoff

- Candidate branch: `feat/portable-identity-storage-contract`
- Corrected candidate SHA: `b50e84b429966f4f8457abcd1c2fd6624a10af13`
- Makes `wexPlatformRegistrationId` a first-class WEX-owned registration
  identity; its format remains deliberately unresolved with no new prefix.
- The contract now requires: absent -> approval-required -> Plugin + Tool
  creates/validates registration -> adapter persists supplied registration ->
  ready; reopening reads back the same durable identity.
- `platformKey` remains an opaque host-system reference. Allocation address is
  `(wexPlatformRegistrationId, allocationId)`; adapters never generate,
  replace, or reuse either identity.
- Changed only Phase 2 contract docs/navigation, neutral schema exports, and
  focused tests. No adapter/runtime/filesystem/PostgreSQL/WordPress/Header/UI
  work or real allocation was added.
- Checks passed: `pnpm --filter @weerax/schemas check`,
  `pnpm audit:foundation`, and `git diff --check`.
- Unresolved decision: ADR 0017 remains Proposed pending Reviewer acceptance.

## Locked roadmap

- Phase 3 — local folder adapter.
- Phase 4 — Plugin/Tool initialization/bootstrap.
- Phase 5 — PostgreSQL optional adapter conversion.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.

Header remains deferred until Phases 1–4 are accepted and promoted.
