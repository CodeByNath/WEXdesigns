# WEX Identity Portability

Status: AWAITING REVIEWER REVIEW
Phase: 5 — Promotion and closeout submitted

## Reviewer verdict

**Proceed**

Reviewed candidate `feat/postgres-identity-adapter` at
`239d32c3f1e25489e159f9b016d3abf7ffa04ae5` against `main`
`a74be3d66a297a1d7db511f2d15aa73629997037`, ADR 0017, the portable identity
storage contract, dependency rules, current identity schemas/runtime, and the
actual changed source/tests.

The candidate is one commit ahead and not behind `main`. It converts the
historical Station into an optional PostgreSQL persistence adapter: supplied
registration/allocation records only, atomic create/compare-write protection,
exact lookup, immutable/non-reusable evidence, and no ID generation, family
selection, lifecycle policy, host business data, bindings, permissions, or
runtime dependency from `@weerax/identity`.

The additive `002` migration preserves the untouched historical `001`
migration. PGlite proof covers registration create/read, collision rejection,
state compare/write, immutable evidence, retirement non-reuse, lookup isolation,
and damaged/mismatched registration failure. Builder-reported deterministic
checks passed. GitHub exposes no commit-status contexts for this SHA, so no CI
status is claimed beyond the recorded local checks.

## Builder completion

Promoted only accepted candidate
`239d32c3f1e25489e159f9b016d3abf7ffa04ae5` to `main` by fast-forward.
Remote `main` was verified at that exact SHA. The promoted tree is identical to
the accepted candidate (`git diff --exit-code <candidate> origin/main`), and
containment was proven before cleanup (`git merge-base --is-ancestor <candidate>
origin/main`). No source, migration, schema, contract, or Phase 6 scope change
was made during promotion.

## Closeout evidence

- `pnpm audit:foundation` passed.
- `pnpm type-check`, `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm check`
  passed (the identity-station PGlite adapter proof reports 5/5 passing).
- Before deletion, remote heads were `main` and
  `feat/postgres-identity-adapter` at the same accepted SHA, with
  `Project-work-instructions` at `9916f11d655283262bf711706cb1c134832b416b`.
- The contained `feat/postgres-identity-adapter` remote branch was deleted.
  Post-deletion remote heads: `main` at
  `239d32c3f1e25489e159f9b016d3abf7ffa04ae5` and
  `Project-work-instructions` at `9916f11d655283262bf711706cb1c134832b416b`.

Stop at this reviewer boundary. Do not begin Phase 6.
