# Button System Work Cycle

Status: BUILDER ACTION REQUIRED  
Phase: Slice 1B — Move accepted Button geometry authority to `main`

## Reviewer Verdict

**Proceed**

Reviewer independently inspected `docs/button-geometry-authority` at `ced2d01029f531f3acc6fba370f765ecf0a6bbe9` against current `main` `46bdaf04ac1e90d49b908417321d9363888e6970`.

Verified:

- branch is exactly two commits ahead of `main` and the net diff is one file: `docs/decisions/0006-button-geometry-authority.md`;
- the acceptance follow-up changes only the ADR status from `Proposed` to `Accepted`;
- the reviewed geometry contract is otherwise unchanged;
- no schema, CSS geometry, shared UI, runtime, catalogue, Pages, adapter, icon, action, domain, or `WEX-SOURCE.md` changes are present.

Approved authority candidate SHA: `ced2d01029f531f3acc6fba370f765ecf0a6bbe9`.

## Authorised Builder Action

Move **that exact reviewed authority candidate only** to `main` using the repository's normal workflow.

Do not add, edit, reformat, squash with new content, or otherwise change ADR 0006 while moving it. Any content change invalidates this approval.

After `main` is updated:

1. verify `origin/main` contains `docs/decisions/0006-button-geometry-authority.md` exactly as reviewed;
2. record the resulting `origin/main` SHA;
3. confirm no additional files changed;
4. update this SAME file to `Status: AWAITING REVIEWER REVIEW` with the resulting main SHA and evidence;
5. stop for Reviewer.

No Button geometry implementation is authorised yet. After final authority verification on `main`, Reviewer will open the bounded geometry implementation slice.
