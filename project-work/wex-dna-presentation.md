# Global Tokens / Typography DNA

Status: BUILDER ACTION REQUIRED
Phase: 4B — Promote complete Typography DNA and verify hosted result

## Reviewer verdict

**Proceed**

Accepted candidate: `feat/global-tokens-remaining` at
`0fb41926c3ca4ace21e083ce62b0c06f242cbdc4`, one commit directly ahead of
`main` `21983ed56c442f41c4496e1677bdf6fa8c46189f`.

## Reviewer findings

Phase 4 correctly applies the learned WEX Design Token model to all four
Typography roles:

- every role begins with its mandatory `<Role> Default` base atom;
- Heading and Title expose Colour / Light, Colour / Accent, Bold, Thin,
  Italic, Large, Small;
- Navigation exposes Colour / Light, Colour / Accent, Italic, Large, Small
  only; no unsupported or duplicate Weight variation is introduced;
- Body exposes Colour / Light, Colour / Accent, Thin, Italic, Large, Small;
  no unsupported Body Bold/Semibold is introduced;
- every Size attribute uses the existing same-role Large/Small Typography
  class while preserving the Default atom's remaining concerns;
- Light remains bound to existing `--wex-color-white`; Accent remains bound to
  existing `--wex-color-text-accent`;
- ADR 0012 and the Global Tokens Code Map now describe Default atom + sparse
  role-valid attributes consistently;
- focused tests guard base atoms, attribute ordering/mappings, and absence of
  unsupported Weight attributes;
- candidate changes only runtime markup, ADR/Code Map, and focused tests. No
  WEX Typography/Colour foundation CSS, token storage, raw visual value,
  schema, component API, or presentation CSS changed.

Builder evidence records `git diff --check`, focused tests, `pnpm check`, and
Chrome desktop/compact + light/dark + keyboard/skip-link validation on the
exact local candidate. Production Pages remains the post-promotion boundary.

## Builder instruction

1. Reconfirm remote `feat/global-tokens-remaining` resolves exactly to
   `0fb41926c3ca4ace21e083ce62b0c06f242cbdc4` and `main` has not changed
   unexpectedly.
2. Promote that exact candidate to `main` without widening or rewriting it.
3. Verify the exact remote `main` SHA.
4. Inspect the resulting GitHub Pages deployment/workflow.
5. Validate hosted `/WEXdesigns/global-tokens/` in Chrome:
   all four role sections; each Default base first; exact role-valid
   attributes; White Light specimens; Accent; Size Large/Small;
   desktop/compact; light/dark; keyboard focus; skip-link transfer.
6. Do not begin global component work yet.
7. Keep the topic branch until Reviewer independently verifies promoted source
   and hosted behaviour.
8. Update this same work file to `AWAITING REVIEWER REVIEW` with promoted SHA,
   Pages/workflow evidence, hosted browser evidence, and any limitation; stop.

## Closeout boundary

After final Reviewer verification, remove the completed topic branch and close
the Global Tokens / Typography DNA work. The next work area may then begin the
global/shared component layer.
