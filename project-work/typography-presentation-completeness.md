# Typography Presentation Completeness Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Mandatory branch housekeeping before next workstream

## Reviewer verdict

**Proceed**

Typography Presentation completeness is accepted on `origin/main` at `2e0ac6e313d24b424dd1933f85eaf203f6f3eb04`, with successful Pages deployment and live verification already recorded.

No further Typography source work is authorised.

## Mandatory housekeeping gate

Remote branch audit currently shows four branches:

```text
main
Project-work-instructions
feat/typography-presentation-completeness
review/button-local-recovery
```

The new Owner rule is a maximum of **3 remote branches total**, including `main` and `Project-work-instructions`. Normal operating shape is therefore:

```text
main
Project-work-instructions
one active topic branch
```

No new topic branch may be opened while that would exceed three remote branches.

### Builder housekeeping action

1. Verify configured `origin` is `CodeByNath/WEXdesigns`.
2. Delete `origin/feat/typography-presentation-completeness` only after verifying it is identical to promoted `main`.
3. Audit `origin/review/button-local-recovery` before deletion. It is currently 47 commits behind `main` and one old recovery commit ahead. Confirm every unique Button artifact/decision represented by that recovery commit is present or superseded by accepted `main` authority and implementation. If any unique required work is not safely represented on `main`, stop and report it rather than deleting.
4. If proven obsolete/superseded, delete `origin/review/button-local-recovery`.
5. Verify final remote branch set is exactly `main` + `Project-work-instructions` before opening the next topic branch.
6. Record exact deletion/ref evidence in this file and stop for Reviewer.

## Owner directives queued for the next workstream

After housekeeping is independently verified, open one new controlled workstream covering repository governance + Pages separation.

Required scope:
- separate GitHub Pages surfaces for Colour, Typography, Actions, and Design Tokens; Components deferred;
- remove the temporary static Outer states section rather than replacing it with another local component;
- audit/update root `AGENTS.md`, project-work guidance, Code Map navigation, and stale verification metadata;
- authored files normally max 600 lines; only Owner may approve >600; absolute maximum 1000 lines with no exception;
- Owner-approved existing 600-line exemptions: current Colour, Typography, and Action/interaction authority files only; exemption does **not** waive the 1000-line ceiling and does not automatically apply to new files;
- current `typography.css` is ~1559 lines, so it violates the 1000-line absolute ceiling and must be safely modularised in that governance workstream without changing typography semantics;
- Colour, Typography, and Actions must each have a high-value Code Map that agents/humans read before source: latest work at top, important operating/spec guidance, source/authority/tests, **Last visited** and **Last updated** dates, with newest work first;
- Code Maps remain navigation/operating evidence, not a competing architecture authority.

Do not start that workstream until branch housekeeping is complete and reviewed.
