# WEX Identity Portability

Status: AWAITING REVIEWER REVIEW
Phase: 3P — Accepted local-folder adapter promoted

## Reviewer verdict

**Proceed with safeguards**

Reviewer independently inspected
`feat/local-folder-identity-adapter` at
`fa66bf6ce3c24d8d83c373f3025f429d1533d847`.

Phase 3 is accepted.

Accepted implementation:

- local-folder storage remains persistence-only and does not own WEX identity
  semantics;
- detection is side-effect free;
- fresh create vs reopen behavior is correct;
- platform registration is supplied by WEX and persisted/read without minting or
  replacement;
- allocation reserve/read/transition is scoped to the registered WEX space;
- concurrent reservation collisions are rejected;
- temp-file + rename persistence avoids valid-looking partial records;
- filesystem containment rejects symlink/redirection escape;
- partial/corrupt/incompatible WEX remnants fail closed and cannot be silently
  reinitialized;
- restart/readback is proven;
- immutable allocation evidence cannot change;
- assigned evidence cannot roll back to reserved;
- retired evidence cannot roll back or be revised/removed;
- rejected rollback attempts leave the persisted record unchanged;
- no host business/domain data, Plugin bootstrap, PostgreSQL, WordPress, Header,
  real allocation, or UI scope was added.

Builder-reported checks passed:
`pnpm --filter @weerax/adapters check`,
`pnpm --filter @weerax/schemas check`,
`pnpm audit:foundation`,
`pnpm check`, and `git diff --check`.

## Builder handoff — Phase 3P

Verified `origin` is `https://github.com/CodeByNath/WEXdesigns.git`.
`main` fast-forwarded from
`50c0c9120617e4c15e47265b018833c173661771` to the exact accepted candidate
`fa66bf6ce3c24d8d83c373f3025f429d1533d847`; remote `main` was verified at that
same SHA.

Post-promotion evidence passed:

- `pnpm --filter @weerax/adapters check` (8 tests);
- `pnpm --filter @weerax/schemas check` (10 tests);
- `pnpm audit:foundation`;
- `pnpm check` (40 tasks); and
- `git diff --check`.

After `main` verification, remote
`feat/local-folder-identity-adapter` was deleted. Remote heads are now only:

- `main` — `fa66bf6ce3c24d8d83c373f3025f429d1533d847`
- `Project-work-instructions` — `65c9b7ff6ad07152e3bedf5c41c4e3fc5d823306`

No browser validation applies: the promoted phase changes only framework-neutral
storage-adapter code and its tests. No deviations or unresolved Builder issues.
Do not begin Phase 4 pending Reviewer review.

## Locked roadmap

- Phase 4 — Plugin/Tool initialization/bootstrap.
- Phase 5 — PostgreSQL optional adapter conversion.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.

Header remains deferred until Phases 1–4 are accepted and promoted.

No Builder may alter the accepted ownership model without Owner + Reviewer
architecture approval.
