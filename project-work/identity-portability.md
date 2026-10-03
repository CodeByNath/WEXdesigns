# WEX Identity Portability

Status: BUILDER ACTION REQUIRED
Phase: 2A — Complete platform/system identity registration contract

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

## Required Phase 2A correction

On the same topic branch, docs/schema/tests only:

1. Make the host/platform WEX registration identity a first-class WEX-owned
   identity contract.
2. Define that the Plugin + Tool, not the host and not the storage adapter,
   creates/validates this registration identity.
3. Define its lifecycle guarantees needed now:
   - created only after explicit approval;
   - stable/immutable for that WEX identity space;
   - durable;
   - not silently replaced/reused;
   - read back when reopening the existing space.
4. Keep `platformKey` as an opaque host-system reference only. It must not
   become the WEX registration identity or carry host business data.
5. Make the portable allocation address clearly:
   **WEX platform/space registration identity + WEX allocation ID**.
6. Do not invent a new platform-ID prefix/family unless existing repository
   authority already defines one. If no prefix is authorised, keep the concrete
   identifier format deliberately unresolved while still defining ownership and
   lifecycle.
7. Ensure initialization flow distinguishes:
   absent space -> approval required -> create WEX registration identity ->
   persist registration -> ready.
8. Storage adapters persist/read the supplied registration identity; they never
   generate or replace it.
9. Add focused schema validation/tests only where a serializable shape is
   required. Do not put issuance logic into schemas.

Do not widen scope into adapter implementation, Plugin runtime, filesystem,
PostgreSQL, WordPress, Header, real allocations, or UI.

Run `pnpm --filter @weerax/schemas check`, `pnpm audit:foundation`, and
`git diff --check`. Push the corrected candidate, update this same file to
`AWAITING REVIEWER REVIEW`, and stop.

## Locked roadmap

- Phase 3 — local folder adapter.
- Phase 4 — Plugin/Tool initialization/bootstrap.
- Phase 5 — PostgreSQL optional adapter conversion.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.

Header remains deferred until Phases 1–4 are accepted and promoted.
