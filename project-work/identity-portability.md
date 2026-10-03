# WEX Identity Portability

Status: BUILDER ACTION REQUIRED
Phase: 3P — Promote accepted local-folder adapter

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

## Builder instruction — Phase 3P only

Promote the exact accepted candidate
`fa66bf6ce3c24d8d83c373f3025f429d1533d847` to `main` using the repository's
normal non-destructive promotion workflow.

Required evidence:

1. verify `origin` is `CodeByNath/WEXdesigns`;
2. verify current `origin/main` is
   `50c0c9120617e4c15e47265b018833c173661771`;
3. fast-forward only the accepted candidate to `main`;
4. verify remote `main` equals the exact accepted candidate SHA;
5. rerun/verify the Phase 3 checks;
6. remove the completed topic branch only after `main` is verified;
7. verify remote heads return to only `main` and
   `Project-work-instructions`;
8. update this same file to `AWAITING REVIEWER REVIEW` with exact evidence;
9. stop.

Do not begin Phase 4 during promotion.

## Locked roadmap

- Phase 4 — Plugin/Tool initialization/bootstrap.
- Phase 5 — PostgreSQL optional adapter conversion.
- Phase 6 — component targeting/inspection proof.
- Phase 7 — separately authorised real-host integration proof.

Header remains deferred until Phases 1–4 are accepted and promoted.

No Builder may alter the accepted ownership model without Owner + Reviewer
architecture approval.
