# WEX Identity Portability

Status: AWAITING REVIEWER REVIEW
Phase: 3A — Hardened local-folder adapter candidate submitted

## Builder handoff

The Reviewer’s two Phase 3 filesystem-boundary findings were corrected on the
existing candidate branch:

- Branch: `feat/local-folder-identity-adapter`
- Corrected candidate SHA: `7778d2839ee0fbc3932b989ba4afa8db220a7e1e`
- Prior reviewed SHA: `714e4c72a117950754f847644688b2aa9129a254`

The adapter now rejects symlinked/non-regular registration, allocation, and
lock entries; resolves the allocation directory and proves it remains inside
the configured identity-space directory before persistence; and validates
write targets before atomic temp-file + rename operations.

Detection is still side-effect free. A missing directory or an empty directory
is `absent`, while a partial, corrupt, or incompatible non-empty WEX space
fails closed. `createSpace()` refuses to initialise over those remnants, and
public registration reads also fail closed rather than treating them as absent.

Changed files in this correction:

- `packages/adapters/src/local-folder-identity-adapter.ts`
- `packages/adapters/test/local-folder-identity-adapter.test.mjs`

Deterministic test coverage now includes an allocation-directory symlink escape
with no outside write, partial allocation remnants without registration,
corrupt registration failure, normal fresh creation, and reopen/readback.

Checks passed:

- `pnpm --filter @weerax/adapters check` — 7/7 tests
- `pnpm --filter @weerax/schemas check` — 10/10 tests
- `pnpm audit:foundation`
- `pnpm check` — 40 tasks successful
- `git diff --check`

No ID generation, family/lifecycle semantics, Plugin/Tool bootstrap,
PostgreSQL, WordPress, Header, or UI scope was added. No unresolved Phase 3A
issue is known. Reviewer must independently inspect the pushed candidate and
record the next decision here.

## Locked roadmap

- Phase 4 — Plugin/Tool initialization/bootstrap.
- Phase 5 — PostgreSQL optional adapter conversion.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.

Header remains deferred until Phases 1–4 are accepted and promoted.
