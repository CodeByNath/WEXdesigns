# Header / Admin Station Shell

Status: ACCEPTED
Phase: Header shell correction and isolated Logo foundation — promoted and closed

## Reviewer verdict

**Proceed**

Accepted candidate: `feat/header-shell-logo` at
`ddbdf89208bf8bca077ae01cf4b86da1d03e77e5`.

Reviewer verified against current `main`
`01c0bd6fa1c2f7837f5dc6c0dffc5b2a72a40a9e`:

- reusable Header schema/UI/specimen removed;
- existing `.wex-admin-shell__header` is the single Header shell;
- no parallel `.wex-admin-header` shell remains;
- Logo is the first reusable Header child and is isolated in Component Manager;
- Component Manager provides only the controlled 64px × 64px Brand allocation
  context and does not render the Header shell;
- ADR 0021 supersedes the reusable-Header direction;
- no Admin Station Logo fitting, Phase 7 identity-host work, other Header-child
  implementation, product rule, or new WEX visual value was introduced;
- candidate is two commits ahead and zero behind `main`;
- GitHub exposes no commit-status contexts, so only the recorded local checks and
  browser proof are claimed.

## Standing sequence guardrail

Keep this order for this work area on every future cycle unless the Owner
explicitly changes it:

```text
Header Shell
-> Logo Component
-> fit Logo into Header
-> record the proven shell/compartment/component pattern
-> only then move to the next Header child
```

Do not pre-build Location, Search, Navigation System, Main Action, or a broader
shell abstraction before the Logo path is proven end to end.

Rule:
- Shell owns compartments and placement.
- Component owns its own structure/mechanics.
- WEX owns presentation.
- Data/value resolution comes through the proper schema/adapter/runtime path.

## Builder instruction

Promote **only**
`ddbdf89208bf8bca077ae01cf4b86da1d03e77e5` to `main` by fast-forward.

Then, in the same closeout transaction:

1. verify remote `main` equals the accepted candidate SHA;
2. run `pnpm check`, `pnpm audit:foundation`, focused package checks, and
   `git diff --check`;
3. verify the promoted tree/diff is identical to the accepted candidate;
4. delete `feat/header-shell-logo` only after containment is proven;
5. refresh factual Code Map verification metadata only where required;
6. update this same file to `ACCEPTED` with final `main` SHA, checks,
   remote-head evidence, and branch-deletion evidence;
7. stop.

Do **not** begin Logo fitting, WEX Identity Phase 7, or the next Header child in
this promotion cycle.

## Closeout

Accepted candidate `ddbdf89208bf8bca077ae01cf4b86da1d03e77e5` was
fast-forwarded to `main`. Its tree was verified identical to remote `main`
before the permitted factual Code Map SHA refresh. Final `main` is
`f438b0002ecac86d113639fba4464992052a673e`; its only follow-up content is that
verification metadata.

Post-promotion `pnpm check`, `pnpm audit:foundation`, focused WEX and
web-runtime checks, and `git diff --check` passed. `feat/header-shell-logo` was
proven contained, then deleted locally and from origin. Remote heads are now
only `main` and `Project-work-instructions`.

This work area is closed. The required next boundary is Logo fitting into the
Header Brand compartment; do not open it without separately authorised work.
