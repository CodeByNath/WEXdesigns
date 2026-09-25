# Repository Governance + Pages Separation Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: 4 — Promote accepted Pages candidate to main

## Reviewer verdict

**Proceed**

Phase 3 is accepted at `685fd0e47d028c72526e20a0706c4cc916c6cacf`.

Independent review confirmed:
- the Phase-3 diff from accepted Phase-2 head is exactly one commit and is limited to the five authorised route HTML files, catalogue CSS, runtime tests, and Vite multi-page config;
- root is a small entry surface linking Colour, Typography, Actions, and Design Tokens;
- Vite explicitly includes all five HTML inputs in the existing single Pages artifact;
- Colour uses the existing WEX colour properties;
- Typography retains the unchanged renderer/computed-fact runtime and canonical WEX classes;
- Actions contains only the five already-demonstrated Button variants and no product action mechanics;
- every Design Tokens value shown is an existing token from current WEX spacing, layout, or geometry source;
- the runtime still imports the canonical `packages/wex/src/index.css` bundle;
- `Outer states` / `outer-state` has zero matches across the candidate runtime;
- Components remain deferred and no schema, adapter, shared-component, catalogue-family, domain, or WEX-value source was added;
- all changed/new authored files remain below 600 lines.

No CI/status run is attached to the topic SHA. Builder-reported checks/build/Chrome evidence are supporting evidence; the pushed source and route invariants above were independently inspected.

## Phase 4 authorised scope

Promote the exact accepted candidate to `main` and establish the hosted evidence boundary.

Builder must:

1. Verify `origin` is `CodeByNath/WEXdesigns`.
2. Verify `main` is still `2e0ac6e313d24b424dd1933f85eaf203f6f3eb04` and the accepted topic head is still `685fd0e47d028c72526e20a0706c4cc916c6cacf`.
3. Fast-forward `main` to that exact accepted topic head. Do not create new source changes, amend, rebase, squash, or widen scope.
4. Push `main`.
5. Verify the GitHub Pages workflow for the promoted SHA completes successfully.
6. Verify the deployed Pages artifact exposes root, Colour, Typography, Actions, and Design Tokens routes.
7. Record exact main SHA, workflow/run result, deployment URL/evidence, and any limitation in this file.
8. Set status to `AWAITING REVIEWER REVIEW` and stop.

Do **not** delete `feat/catalogue-pages-governance` yet. Topic-branch deletion is allowed only after Reviewer independently verifies the promoted main/deployment and closes this workstream.

No further product/runtime/source changes are authorised in Phase 4.
