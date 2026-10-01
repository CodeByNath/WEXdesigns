# Platform Identity System

Status: AWAITING REVIEWER REVIEW
Phase: 5 — Promotion complete; independent closeout required

## Reviewer verdict

**Proceed**

Reviewer independently inspected candidate
`feat/wex-ui-identity-schemas` at
`802f31c2f7ef58dee16dcfc9e600841d1eee59ba`.

Verified:

- remote `main` remains exactly
  `394fb687c0ef972b2b833d2505933ffb1fde90dc`;
- candidate is exactly one commit ahead of `main` and zero behind;
- the diff is limited to the authorised three files;
- allocation IDs accept only the closed `WEXAM` / `WEXAMH` families,
  exact five-character unambiguous suffixes, and correctly resolve the shared
  prefix;
- root versus direct-child placement is explicit and rejects half-defined
  parent relationships;
- platform binding is strict and serializable, with the platform record
  reference kept opaque rather than interpreted;
- callbacks/handlers/permissions/payloads/resolvers and undeclared binding
  fields are rejected;
- `EntityIdentifier` and `SemanticAction` were not modified;
- focused tests cover the required identity, placement, binding, and existing
  foundation contracts.

No browser, deployment, persistence, minting, lookup, adapter, or runtime
boundary applies to this schema-only phase. GitHub exposes no CI run for the
candidate; Builder-reported required local checks are consistent with the
inspected source and test scope.

## Builder instruction

Promote only the exact accepted candidate
`802f31c2f7ef58dee16dcfc9e600841d1eee59ba` to `main` without widening
scope.

Required transaction:

1. verify `origin` is `CodeByNath/WEXdesigns`;
2. fast-forward `main` to the exact accepted candidate;
3. run:
   - `pnpm --filter @weerax/schemas check`;
   - `pnpm audit:foundation`;
   - `git diff --check`;
4. push `main` and verify remote `main` is exactly the accepted SHA;
5. delete remote `feat/wex-ui-identity-schemas` after the promotion is
   verified safe;
6. update this same work file to `AWAITING REVIEWER REVIEW` with the exact
   remote `main` SHA, check results, and remote-head evidence;
7. stop for Reviewer.

Do not begin Identity Station runtime, minting, persistence, reverse lookup,
adapters, Header identity allocation, migration, or UI integration.

After promotion and independent closeout, Header may resume from its existing
deferred work file; do not create a replacement Header work area.

## Builder handoff

Promotion completed without scope expansion.

- `origin` verified as `CodeByNath/WEXdesigns`.
- Remote `main` is exactly `802f31c2f7ef58dee16dcfc9e600841d1eee59ba`.
- Required checks passed: `pnpm --filter @weerax/schemas check`,
  `pnpm audit:foundation`, and `git diff --check`.
- Remote-head evidence after cleanup: only `main` at
  `802f31c2f7ef58dee16dcfc9e600841d1eee59ba` and
  `Project-work-instructions` at
  `51ad01764f675840da6171e2aceea8b4ebcc57d5` remain; remote
  `feat/wex-ui-identity-schemas` was deleted after the verified promotion.

No browser, deployment, persistence, minting, lookup, adapter, runtime, or UI
work was performed. Reviewer must independently verify promotion and branch
closeout before accepting or deferring this work area.
