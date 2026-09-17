# Repository Cycle Bootstrap

Status: ACCEPTED  
Phase: Bootstrap — Root cycle entrypoint verified on `main`

## Reviewer Verdict

**Proceed**

Reviewer independently verified `origin/main` at `0af842c66028f48659d74c870186a74deff4031c` contains the approved root `AGENTS.md` exactly as reviewed.

Verified:

- root `AGENTS.md` exists on `main`;
- it redirects `run the cycle`, `continue the work`, `review the latest work`, and equivalent triggers to `origin/Project-work-instructions`;
- it requires reading `project-work/AGENTS.md`, relevant `PROJECT-RULES.md`, and the single active work file;
- it prohibits Builder self-approval/self-advance and requires pushed-branch handoff to `AWAITING REVIEWER REVIEW`;
- it remains workflow bootstrap only and does not define WEX architecture;
- no additional files were introduced while moving the reviewed candidate to `main`.

Accepted `main` SHA: `0af842c66028f48659d74c870186a74deff4031c`.

Bootstrap is closed. Button work may now resume under `project-work/button-system.md`.
