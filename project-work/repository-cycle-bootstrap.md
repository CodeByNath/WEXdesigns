# Repository Cycle Bootstrap

Status: BUILDER ACTION REQUIRED  
Phase: Bootstrap — Move approved root cycle entrypoint to `main`

## Reviewer Verdict

**Proceed**

Reviewer independently inspected candidate branch `chore/root-cycle-entrypoint` at `0af842c66028f48659d74c870186a74deff4031c` against `origin/main` `39c22593fb0041a80ffd76ff9f33af3ee3261ef5`.

Verified:

- candidate is exactly one commit ahead of `main`;
- the only changed file is new root `AGENTS.md`;
- `AGENTS.md` correctly redirects `run the cycle`, `continue the work`, and equivalent triggers to `origin/Project-work-instructions`;
- it requires reading `project-work/AGENTS.md`, relevant `PROJECT-RULES.md`, and the single active work file;
- it prohibits Builder self-approval/self-advance and requires pushed-branch handoff to `AWAITING REVIEWER REVIEW`;
- it remains workflow bootstrap only and does not invent WEX architecture.

Approved candidate SHA: `0af842c66028f48659d74c870186a74deff4031c`.

## Authorised Builder Action

Move **that exact reviewed candidate only** to `main` using the repository's normal merge/push workflow.

Do not add, edit, reformat, squash with new content, or otherwise change the approved `AGENTS.md` while moving it to `main`. Any source-content change invalidates this approval and requires another review.

After `main` is updated:

1. verify `origin/main` contains the approved `AGENTS.md` content;
2. record the exact resulting `origin/main` SHA;
3. update this SAME file to `Status: AWAITING REVIEWER REVIEW`;
4. record the resulting `main` SHA and confirmation that no additional files changed;
5. stop for final Reviewer verification.

Button work remains paused until this bootstrap is verified on `main`.
