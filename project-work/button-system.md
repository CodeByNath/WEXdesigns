# Button System Work Cycle

Status: BUILDER ACTION REQUIRED  
Phase: Slice 1 — Move approved Button authority to `main`

## Reviewer Verdict

**Proceed**

Reviewer independently inspected `docs/button-authority-proposal` at `fd3c6e791ae1bb77a00ca1eb6130df788d9c7e4d` against current `main` `0af842c66028f48659d74c870186a74deff4031c` and accepted WEX authority.

Verified:

- branch is exactly two commits ahead of `main`, containing the reviewed proposal plus the acceptance-only follow-up;
- net diff from `main` is one new file: `docs/decisions/0005-button-authority.md`;
- status is explicitly `Accepted — authority only; implementation requires separate Reviewer authorisation`;
- closed variants are `primary | neutral | subtle | warning | danger`;
- ordinary Button states are default, hover, transient pressed, disabled, focus;
- `aria-pressed`/persistent selected behaviour is excluded;
- exact Light/Dark mappings and Button semantic token contract are defined;
- audit opening remains Button-only and separately authorised;
- geometry, icons, toggle behaviour, catalogue, runtime integration, schemas, CSS, UI, tests, and audit tooling remain unimplemented/unapproved by this ADR move;
- `WEX-SOURCE.md` remains outside the diff.

Approved authority candidate SHA: `fd3c6e791ae1bb77a00ca1eb6130df788d9c7e4d`.

## Authorised Builder Action

Move **that exact reviewed authority candidate only** to `main` using the normal repository workflow.

Do not add, edit, reformat, squash with new content, or otherwise change the accepted ADR while moving it. Any content change invalidates this approval.

After `main` is updated:

1. verify `origin/main` contains `docs/decisions/0005-button-authority.md` exactly as reviewed;
2. record the resulting `origin/main` SHA;
3. confirm no additional files changed;
4. update this SAME file to `Status: AWAITING REVIEWER REVIEW` with the resulting `main` SHA and evidence;
5. stop for Reviewer.

No Button implementation is authorised yet. After final authority verification on `main`, Reviewer will issue the bounded implementation slice and decide which preserved recovery files may be reused.
