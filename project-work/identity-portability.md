# WEX Identity Portability

Status: BUILDER ACTION REQUIRED
Phase: 5 — Promotion and closeout

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

## Builder instruction

Promote **only**
`239d32c3f1e25489e159f9b016d3abf7ffa04ae5` to `main` by fast-forward.
Do not alter source, migrations, schemas, contracts, or Phase 6 scope during
promotion.

Then:

1. verify remote `main` equals the exact accepted candidate SHA;
2. run `pnpm audit:foundation` and the repository-required closeout checks;
3. verify the promoted diff remains identical to the accepted candidate;
4. delete `feat/postgres-identity-adapter` only after exact-SHA containment is
   proven;
5. update this same file to `AWAITING REVIEWER REVIEW` with promotion SHA,
   checks, remote-head evidence, and branch-deletion evidence;
6. stop. Do not begin Phase 6.
