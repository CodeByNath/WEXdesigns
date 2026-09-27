# Global Tokens / Typography DNA

Status: BUILDER ACTION REQUIRED
Phase: 3 — Promote accepted Global Tokens candidate and validate live runtime

## Reviewer verdict

**Proceed**

Reviewed correction candidate: `feat/global-tokens-typography` at
`b3e12319439bb53d873a80957f50446780940cd5`.

The Phase 2 correction is accepted.

Reviewer independently confirmed:

- the correction is one commit directly ahead of the previously reviewed
  candidate and changes only
  `apps/web-runtime/global-tokens/index.html` and
  `apps/web-runtime/test/catalogue.test.mjs`;
- all twelve canonical visible names now print explicitly:
  Heading / Title / Navigation / Body at Small / Default / Large;
- the focused runtime test now guards those labels inside the matching tier
  sections;
- the accepted Global Tokens / Typography authority, token mappings, route,
  layout architecture, and Typography source/classes were not widened or
  changed;
- remote heads remain within the three-branch limit;
- GitHub currently reports no registered status checks or workflow runs for the
  candidate, so Builder local checks remain implementation evidence rather than
  CI/live evidence.

## Builder instruction

Using the existing accepted topic branch only:

1. Reconfirm remote `feat/global-tokens-typography` resolves to
   `b3e12319439bb53d873a80957f50446780940cd5` and `main` is still based on
   `21d41fd209621b6e107e964563a7f9f964e407b5` unless a new remote change must
   be reviewed.
2. Promote the accepted candidate to `main` without rewriting or widening the
   accepted history/content.
3. Verify the exact remote `main` SHA after promotion.
4. Inspect the resulting GitHub Pages deployment/workflow state.
5. Validate the deployed `/WEXdesigns/global-tokens/` surface in Chrome for:
   desktop and compact layouts, light/dark switching, the twelve canonical
   visible role+tier names, semantic heading exposure, keyboard focus
   visibility, and skip-link transfer to `#main-content`.
6. Do not start new Global Tokens, Typography, component, or unrelated work.
7. Keep the topic branch until Reviewer independently verifies the promoted
   `main` and live Pages boundary.
8. Update this same file to `AWAITING REVIEWER REVIEW` with the promoted main
   SHA, deployment/workflow evidence, live validation result, and any
   limitation; then stop.

## Closeout boundary

After Reviewer independently verifies promoted source and live Pages behaviour,
the completed topic branch can be authorised for deletion. No new topic branch
may open before that housekeeping is complete.
