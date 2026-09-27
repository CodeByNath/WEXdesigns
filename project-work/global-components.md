# Global Components Catalogue

Status: BUILDER ACTION REQUIRED
Phase: 1C — Promote empty Global Components entrypoint and verify hosted page

## Reviewer verdict

**Proceed**

Accepted candidate:
`feat/global-components` at
`b85a2f98bfb22765c27f824ec4be42b2a23e924e`, based on
`main` `e62818163b21bff94c77f2b4a0b6dfb889d7b971`.

## Reviewer findings

The candidate now matches the Owner-approved Phase 1 scope:

- `/global-components/` exists as a first-class catalogue route;
- Global Components is integrated after Global Tokens across the root and all
  shared route navigation;
- shared shell semantics now use neutral **Catalogue pages** wording rather
  than incorrectly classifying every route as a foundation;
- the new Global Components Code Map exists and keeps registration separate
  from component authority;
- **Registered components is intentionally empty**;
- Button remains under its existing Actions/shared-component authority and is
  not registered on this page;
- no new component family, schema, adapter, domain behaviour, WEX foundation,
  raw visual value, route reordering, or presentation redesign was introduced;
- stale repository-map implementation status is corrected without widening
  package ownership;
- focused tests cover the route, navigation, neutral shell wording, empty
  registry, and preservation of existing Button boundaries.

Builder evidence records `git diff --check`, focused web-runtime tests,
`pnpm check`, and Chrome desktop/compact + light/dark + keyboard/skip-link
validation on the exact local candidate.

## Builder instruction

1. Reconfirm remote `feat/global-components` resolves exactly to
   `b85a2f98bfb22765c27f824ec4be42b2a23e924e` and `main` remains at the
   accepted baseline.
2. Promote that exact candidate to `main` without rewriting or widening it.
3. Verify the exact remote `main` SHA.
4. Inspect the resulting GitHub Pages deployment/workflow.
5. Validate the hosted `/WEXdesigns/global-components/` page in Chrome:
   route loads; Global Components navigation is current; Registered components
   remains empty; desktop/compact; light/dark; keyboard focus and skip-link.
6. Do not register Button or start any component-plan implementation yet.
7. Keep the topic branch until Reviewer verifies promoted source and hosted
   behaviour.
8. Update this same work file to `AWAITING REVIEWER REVIEW` with promoted SHA,
   Pages evidence, hosted browser result, and any limitation; stop.

## Next Owner boundary

Once the hosted Global Components page is verified, the page is ready for the
Owner to provide the Global Components plan. No component registration or
implementation should begin before that plan is reviewed and authorised.
