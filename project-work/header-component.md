# Header / Admin Station Shell

Status: BUILDER ACTION REQUIRED
Phase: Logo fitting into existing Header Brand compartment

## Standing sequence guardrail

Keep this order unless the Owner explicitly changes it:

```text
Header Shell
-> Logo Component
-> fit Logo into Header
-> record the proven shell/compartment/component pattern
-> only then move to the next Header child
```

Rules:
- Shell owns compartments and placement.
- Component owns its own structure/mechanics.
- WEX owns presentation.
- Data/value resolution comes through the proper schema/adapter/runtime path.

Accepted baseline: `main`
`f438b0002ecac86d113639fba4464992052a673e`.

## Builder work package

Fit the accepted Logo component into the existing Admin Station Header shell's
Brand compartment and prove that one complete shell -> compartment -> component
path works end to end.

1. Read ADR 0021, Header/Admin Shell Code Maps, Logo schema/UI/WEX source, and
   the existing Admin Station runtime before editing.
2. Preserve `.wex-admin-shell__header` as the single Header shell.
3. Add only the minimum Header-owned Brand compartment structure required to
   host Logo in the real Admin Station runtime.
4. Consume the existing accepted Logo component contract/presentation; do not
   duplicate Logo markup/presentation logic in the application.
5. Preserve the accepted 64px × 64px Brand allocation. Header owns that
   allocation; Logo owns only its internal rendering.
6. Use a controlled host-neutral Logo value/fixture for this proof. Do not add
   product branding, routes, callbacks, domain behaviour, persistence, or API
   integration yet.
7. Keep WEX Identity semantics intact: Header remains the `WEXAMH` allocation
   concept under Admin Manager `WEXAM`, but do **not** start Phase 7 host
   registration/storage/identity issuance in this package.
8. Validate Admin Station in browser across Large and Compact widths, light/dark
   theme, keyboard/accessibility boundaries relevant to Logo, and verify the
   Component Manager Logo specimen still remains independent.
9. Update focused tests and factual Code Maps only.

## Hard exclusions

No Location, Search, Navigation System, Main Action, Sidebar, Main, or Footer
component work. No broader shell abstraction. No Global Components
registration. No real-host WEX Identity Phase 7. No product/domain adapter or
API integration. No new WEX visual values.

## Stop gate

If fitting Logo requires changing the accepted Logo contract, creating a new
Header abstraction, starting real identity-host integration, or inventing new
presentation values, stop and return to Reviewer.

Run required deterministic checks and browser proof. Push one bounded topic
branch, update this same file to `AWAITING REVIEWER REVIEW` with exact SHA,
changed files, checks, browser evidence, and any deviation, then stop.
