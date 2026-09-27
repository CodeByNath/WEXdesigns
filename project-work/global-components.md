# Global Components Catalogue

Status: AWAITING REVIEWER REVIEW
Phase: 1B — Shell semantics correction, then promote empty Global Components entrypoint

## Reviewer verdict

**Proceed with safeguards**

Accepted candidate direction:
`feat/global-components` at
`6f35b0de00940902d2a298c91724950b8362a2b5`, based on
`main` `e62818163b21bff94c77f2b4a0b6dfb889d7b971`.

## Reviewer correction of prior scope

The Owner authorised creation of the **Global Components page and ecosystem
entrypoint**, ready for future component registration. The Owner did **not**
authorise registering Button on that page in this phase.

Therefore the empty **Registered components** section is correct. Button remains
an already-proven shared component system under its existing authority and
Actions presentation, but it is not registered into the new Global Components
catalogue until a later explicitly authorised component-registration phase.

## Reviewer findings

The candidate correctly:

- completed prior topic-branch housekeeping before opening the new branch;
- adds `/global-components/` to Vite and all shared navigation routes;
- adds the root ecosystem entry after Global Tokens;
- creates a dedicated Global Components Code Map;
- leaves the Registered components section empty;
- does not move/redesign Button, add component families, change schemas,
  adapters, domain behaviour, WEX foundations, or raw visual values;
- updates stale repository-map implementation status without widening package
  ownership;
- adds focused route/navigation/empty-registry tests;
- preserves the existing Actions/Button presentation untouched.

One shell semantics issue remains: shared navigation and the root surface still
use the label **Foundation pages**, but the ecosystem now includes
**Global Components**, which is explicitly not a foundation.

## Builder handoff

Corrected candidate: `feat/global-components` at
`b85a2f98bfb22765c27f824ec4be42b2a23e924e` (based on accepted `main`
`e62818163b21bff94c77f2b4a0b6dfb889d7b971`).

This correction changes only the six shared-route navigation ARIA labels, root
catalogue label/description, and the focused runtime test:
`apps/web-runtime/{index,colour/index,typography/index,actions/index,layout/index,global-tokens/index,global-components/index}.html`
and `apps/web-runtime/test/catalogue.test.mjs`. Route order, styles, registry
content, Actions, and Button authority remain untouched.

Passed: `git diff --check`; `pnpm --filter @weerax/web-runtime test` (9 tests);
and `pnpm check` (foundation audit plus 35 tasks). Chrome validated the exact
local candidate at desktop and compact widths in light and dark themes; its AX
tree exposes the neutral `Catalogue pages` navigation label, the empty
Registered components section, and the skip link moves keyboard focus to
`#main-content`. Candidate browser validation is local because Pages deploys
from `main` only.

## Builder correction

Using the same `feat/global-components` branch only:

1. Keep the Global Components registry empty.
2. Do **not** add Button or any other component to the page.
3. Correct only the stale shared catalogue-shell wording/ARIA that describes
   the complete route set as "Foundation pages". Use a neutral ecosystem/
   catalogue label that accurately covers foundations, tokens, and components.
4. Do not redesign the shell or alter route order.
5. Update only focused tests required by that wording correction.
6. Run focused web-runtime tests, `git diff --check`, `pnpm check`, and the
   same Chrome desktop/compact + light/dark + keyboard/skip-link validation.
7. Push the corrected candidate, update this same file to
   `AWAITING REVIEWER REVIEW` with exact SHA/evidence, and stop.

## Boundary

This phase creates the Global Components **catalogue entrypoint only**. Component
registration begins later and requires explicit Owner/Reviewer authorisation.
