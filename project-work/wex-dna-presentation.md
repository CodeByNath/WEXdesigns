# Global Tokens / Typography DNA

Status: AWAITING REVIEWER REVIEW
Phase: 3B — Promote accepted Owner correction and validate live runtime

## Reviewer verdict

**Proceed**

Accepted candidate: `feat/global-tokens-typography` at
`ca42918152a930700c2cd5f440c94d8723e31d8f`, one commit directly ahead of
promoted `main` `b3e12319439bb53d873a80957f50446780940cd5`.

## Reviewer findings

The Phase 3A Owner correction is aligned and remains presentation/authority
bounded:

- canonical presentation order is Large -> Default -> Small;
- Heading Default is the base Design Token;
- Colour, Weight, Style, Size / Large, and Size / Small are sparse attributes;
- Size attributes reference existing Heading Large/Small Typography
  classes/tokens and inherit the remainder of Heading Default;
- Typography still owns actual tier values/classes;
- ADR 0012 and the Global Tokens Code Map describe the same model;
- focused runtime tests guard tier ordering, base-token presentation, attribute
  ordering, and both Size attributes;
- candidate diff changes only ADR/Code Map, Global Tokens runtime markup, and
  focused tests;
- no WEX foundation CSS, Typography CSS, Colour CSS, token/custom-property
  storage, `catalogue.css`, schema, component API, or raw visual value changed.

GitHub exposes no candidate CI/status workflow evidence; Builder's local
`git diff --check`, focused tests, `pnpm check`, and Chrome validation remain
recorded implementation evidence, not live/deployment evidence.

## Builder instruction

Using the existing topic branch only:

1. Reconfirm remote `feat/global-tokens-typography` resolves exactly to
   `ca42918152a930700c2cd5f440c94d8723e31d8f` and `main` has not changed
   unexpectedly.
2. Promote that exact accepted candidate to `main` without widening or
   rewriting the accepted content.
3. Verify the exact remote `main` SHA.
4. Inspect the resulting GitHub Pages deployment/workflow state.
5. Validate the deployed `/WEXdesigns/global-tokens/` surface in Chrome:
   Large -> Default -> Small order; Heading Default base; Colour/Weight/Style
   then Size / Large and Size / Small; desktop/compact; light/dark; keyboard
   focus; skip-link transfer to `#main-content`.
6. Do not begin new Global Tokens, Typography, component, CSS, or unrelated
   work.
7. Keep the topic branch until Reviewer independently verifies promoted source
   and live Pages behaviour.
8. Update this same work file to `AWAITING REVIEWER REVIEW` with promoted main
   SHA, deployment/workflow evidence, live validation, and any limitation; stop.

## Closeout boundary

After final Reviewer verification, the completed topic branch may be removed and
this Global Tokens work can be closed.

## Builder handoff

- Promoted `main`: `ca42918152a930700c2cd5f440c94d8723e31d8f`; remote SHA
  verified exact. Topic branch remains for independent review.
- Pages deployment: workflow **Deploy WEX index**, run 31, completed
  successfully for that SHA at
  `https://github.com/CodeByNath/WEXdesigns/actions/runs/36293478808`.
- Fresh hosted evidence: the cache-busting live URL rendered Large -> Default
  -> Small; Heading Default base; ordered Colour, Weight, Style, Size / Large,
  and Size / Small cards; light and dark themes; and compact single-column
  wrapping. Direct hosted HTML retrieval returned the same required content.
- Browser rerun: in the dedicated live tab, Light and Dark both rendered
  correctly; compact cards wrapped cleanly; Tab focused Skip to content; and
  Enter transferred to `#main-content`. The bare Pages URL still held an older
  Chrome cache entry; the cache-busting URL served the current deployment.

Builder stopped after the required promotion and handoff. Reviewer must verify
the remaining bare-URL cache behaviour before closeout.
