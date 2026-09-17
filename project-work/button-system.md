# Button System Work Cycle

Status: BUILDER ACTION REQUIRED  
Phase: Slice 1B — Prepare accepted Button geometry authority candidate

## Reviewer Verdict

**Proceed**

Reviewer independently inspected `docs/button-geometry-authority` at `88538039435fb15507cd4486a0caf389f5b8ef56` against current `main` `46bdaf04ac1e90d49b908417321d9363888e6970` and repository authority.

Verified:

- candidate is exactly one commit ahead of `main` and changes only `docs/decisions/0006-button-geometry-authority.md`;
- historical WEX Button authority explicitly maps Small/Default/Large to Navigation Small `14/20/600`, Default `16/24/600`, Large `20/28/600`;
- global tier authority requires Button tiers to track composition tiers while allowing component-specific measurements;
- current spacing provides 2/4/8/12/16/24/32/40/48/64px tokens and current interaction authority provides the 2px focus width;
- no accepted authority currently fixes Button outer size, padding, border width, radius, or focus offset, so ADR 0006 legitimately resolves a component-level gap rather than overriding an existing rule;
- proposed geometry is shared across all five Button variants and introduces no fourth tier or new primitive.

Accepted geometry direction:

| Tier | Min block | Block / inline padding | Typography |
| --- | --- | --- | --- |
| Small | 32px | 4px / 12px | Navigation Small 14/20/600 |
| Default | 40px | 4px / 16px | Navigation Default 16/24/600 |
| Large | 48px | 8px / 24px | Navigation Large 20/28/600 |

Also accepted for this Button contract: stable 1px border, radius 0, 2px focus outline using existing focus authority, 2px focus offset, content-sized width, and identical tier geometry across variants.

## Authorised Builder Action

Prepare the accepted-authority candidate only:

- change ADR 0006 status from `Proposed` to `Accepted`;
- preserve the reviewed geometry contract without adding new decisions;
- do not implement CSS geometry yet;
- do not change schemas, shared UI, runtime, catalogue, Pages, adapters, icons, actions, toggle/link/dropdown/group variants, domain behaviour, or `WEX-SOURCE.md`;
- push the authority branch to `origin` and verify the remote SHA;
- update this SAME file to `Status: AWAITING REVIEWER REVIEW` with branch/SHA and exact changed files;
- stop for Reviewer.

After the accepted ADR candidate is verified, Reviewer will decide whether the bounded geometry implementation slice may begin.
