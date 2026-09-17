# Button System Work Cycle

Status: BUILDER ACTION REQUIRED  
Phase: Slice 1B — Button geometry authority resolution

## Reviewer Verdict

**Proceed**

Reviewer independently verified `origin/main` is exactly `46bdaf04ac1e90d49b908417321d9363888e6970`, the reviewed Slice 1A candidate. The promotion introduced no additional content beyond the accepted 11-file Button foundation diff.

Slice 1A is accepted on `main`: the Button schema uses only `primary | neutral | subtle | warning | danger` plus authored `disabled`; transient hover/pressed/focus remain WEX/native presentation behaviour; shared UI remains platform-neutral; the foundation audit preserves the Button-only boundary.

## Authorised Builder Action

Perform **authority-resolution only** for Button geometry. Do not implement geometry yet.

Create a dedicated topic branch from current `origin/main` and prepare a Proposed/Draft Button geometry ADR that resolves the minimum presentation contract needed for Small, Default, and Large Buttons.

Inspect and cite current repository authority before proposing values, including:

- historical WEX Button/Interaction source;
- accepted Button ADR 0005;
- current spacing, sizing, typography, border/radius, and interaction foundations/ADRs;
- verified Button foundation now on `main`.

The proposal must explicitly resolve:

- Small / Default / Large minimum block size;
- vertical and horizontal padding per tier;
- typography mapping per tier;
- border width and radius treatment;
- focus outline width/offset interaction where geometry-specific;
- whether tier geometry is identical across all five Button variants;
- any genuine authority gap rather than inventing new primitives locally.

## Exclusions

No schema changes, CSS geometry implementation, shared UI changes, runtime preview, catalogue, GitHub Pages work, adapters, icons, toggle/link/dropdown/group variants, domain behaviour, or `WEX-SOURCE.md` edits. Do not revive values from `review/button-local-recovery` merely because they already exist; treat that branch as evidence only and compare it against repository authority.

## Handoff

Push the geometry-authority proposal branch to `origin`, verify the remote SHA, then update this SAME file to `Status: AWAITING REVIEWER REVIEW` with branch/SHA, changed files, authority inspected, proposed tier values, unresolved questions, and confirmation that implementation remains unchanged. Stop for Reviewer.
