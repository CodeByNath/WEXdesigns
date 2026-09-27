# Global Tokens / Typography DNA

Status: BUILDER ACTION REQUIRED
Phase: 3D — Final two-line presentation correction, then promote and verify hosted result

## Reviewer verdict

**Proceed with safeguards**

Previously accepted candidate:
`feat/global-tokens-typography` at
`5ff024f94d555648136839e27044b77bb90655ff`.

The Owner has now approved one final, already-pending presentation-only
correction before promotion: remove the two presentation lines currently
pending in the Builder working tree.

## Authorised final correction

The Builder may commit the Owner-requested **two-line removal** before
promotion, subject to all of these safeguards:

- the change is limited to those two already-pending presentation lines on the
  Global Tokens runtime page;
- no WEX foundation CSS, Typography/Colour source, token definitions/storage,
  ADR model, schema, component API, or unrelated presentation may change;
- do not add replacement copy, new layout, new styling, or other cleanup;
- if focused runtime tests explicitly assert either removed line, update only
  those exact assertions as required;
- the resulting topic candidate must otherwise remain identical to the
  previously accepted `5ff024f94d555648136839e27044b77bb90655ff`.

## Builder instruction

Using the existing topic branch only:

1. Commit the Owner-approved two-line presentation removal already pending in
   the working tree.
2. Verify the diff from `5ff024f94d555648136839e27044b77bb90655ff` contains
   only those two removals plus any strictly necessary focused-test assertion
   adjustment.
3. Run the focused runtime tests and `git diff --check`. Run `pnpm check`
   if any test file changes.
4. Push the corrected topic branch and verify its exact remote SHA.
5. Promote that corrected exact SHA to `main` without widening or rewriting it.
6. Verify the exact remote `main` SHA and resulting GitHub Pages deployment.
7. Validate the hosted `/WEXdesigns/global-tokens/` page in Chrome for:
   Registered-attributes-only presentation; Heading Default base; correct
   seven-attribute order; visibly white Colour / Light specimen;
   desktop/compact; light/dark; keyboard focus; skip-link transfer.
8. Do not begin any new work or unrelated cleanup.
9. Keep the topic branch until Reviewer verifies promoted source and hosted
   behaviour.
10. Update this same work file to `AWAITING REVIEWER REVIEW` with the corrected
    candidate SHA, promoted main SHA, exact two-line diff evidence, checks,
    Pages evidence, hosted browser result, and any limitation; stop.

## Closeout boundary

This Owner-approved two-line removal is part of the current Global Tokens
closeout, not a new workstream. After Reviewer verifies the promoted source and
hosted page, the topic branch can be removed and this work closed.
