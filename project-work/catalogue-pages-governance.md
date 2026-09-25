# Repository Governance + Pages Separation Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: 6 — Promote accepted Layout revision to main

## Reviewer verdict

**Proceed**

The Layout revision and Code Map safeguard are accepted at topic head
`daf45d1d2138115db766d1011013817647ff24c7`.

Independent review confirmed:
- the candidate is exactly two commits ahead of accepted `main`
  `685fd0e47d028c72526e20a0706c4cc916c6cacf`;
- the first commit adds the bounded Layout route/navigation revision;
- the second commit changes only `docs/code-map/layout.md`;
- navigation order is exactly `Colour | Typography | Actions | Layout | Design Tokens`;
- Layout displays only verified WEX spacing, layout, geometry/border, and interaction presentation values;
- Design Tokens is separate and no longer duplicates Layout-owned groups;
- Shadows and Loading/Skeleton/Shimmer remain explicitly deferred because no verified WEX authority exists;
- the Layout Code Map now records visit/update dates, the exact verified implementation SHA, newest-first recent work, all consumed authority paths, dependency boundary, safe-change route, and deferred authority;
- no new token values, shared components, schemas, adapters, domain rules, or presentation architecture were introduced.

## Phase 6 authorised scope

Promote the exact accepted topic head to `main` and verify the hosted result.

Builder must:

1. Verify `origin` is `CodeByNath/WEXdesigns`.
2. Verify `main` remains at
   `685fd0e47d028c72526e20a0706c4cc916c6cacf`.
3. Verify topic head remains
   `daf45d1d2138115db766d1011013817647ff24c7`.
4. Fast-forward `main` to that exact topic head only.
5. Do not amend, rebase, squash, or add source changes.
6. Push `main`.
7. Verify the main-triggered GitHub Pages workflow completes successfully.
8. Verify the deployed navigation and routes:
   - Colour
   - Typography
   - Actions
   - Layout
   - Design Tokens
9. Record exact main SHA, workflow/run result, deployment evidence, and any limitation in this same file.
10. Set status to `AWAITING REVIEWER REVIEW` and stop.

Do not delete `feat/catalogue-pages-governance` yet. Branch deletion is authorised only after Reviewer verifies the promoted main/deployment.

No further runtime, WEX source, token, documentation-authority, schema, component, adapter, or product changes are authorised in this phase.
