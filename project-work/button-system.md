# Button System Work Cycle

Status: BUILDER ACTION REQUIRED  
Phase: Slice 1C — Move reviewed Button geometry implementation to `main`

## Reviewer Verdict

**Proceed**

Reviewer independently inspected `feat/button-geometry-slice` at `f514db3d9894ad277aacdea9fcbcc2704c6618c0` against accepted ADR 0006 and current `main` `ced2d01029f531f3acc6fba370f765ecf0a6bbe9`.

Verified:

- candidate is exactly one commit ahead of `main` and changes only the five authorised Button geometry/test/audit files;
- shared UI maps the existing serializable tier to `wex-button--small|default|large` without changing schema or transient-state boundaries;
- WEX geometry matches ADR 0006 exactly: Small 32px / 4px / 12px, Default 40px / 4px / 16px, Large 48px / 8px / 24px;
- each tier consumes the accepted Navigation typography tier and semibold weight;
- base Button uses border-box, content-sized inline-flex layout, stable 1px border, radius 0, and shared geometry across all five variants;
- focus uses existing 2px WEX focus width with 2px spacing-token offset;
- variant rules contain no independent geometry;
- no runtime, catalogue, Pages, schema, adapters, icons, actions, toggle/link/dropdown/group variants, domain behaviour, or `WEX-SOURCE.md` changes are present;
- Builder reports touched-package tests, foundation audit, and repository `pnpm check` passing under Node `v24.21.0` / pnpm `11.16.0`.

## Authorised Builder Action

Move **that exact reviewed candidate only** to `main` using the normal repository workflow.

Do not add, edit, reformat, squash with new content, or otherwise alter the reviewed implementation while moving it. Any content change invalidates this approval.

After `main` is updated:

1. verify `origin/main` resolves to the reviewed implementation commit or an equivalent promotion commit with an identical tree;
2. record the resulting `origin/main` SHA;
3. confirm no additional files changed;
4. update this SAME file to `Status: AWAITING REVIEWER REVIEW` with the resulting `main` SHA and evidence;
5. stop for Reviewer.

No runtime, catalogue, Pages, icon, toggle/link/dropdown/group, adapter, domain, or new-component work is authorised by this promotion.
