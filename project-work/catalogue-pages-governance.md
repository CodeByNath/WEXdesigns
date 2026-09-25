# Repository Governance + Pages Separation Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: 5 — Add Layout page before final closeout

## Reviewer verdict

**Proceed**

Phase 4 promotion remains accepted at `main`
`685fd0e47d028c72526e20a0706c4cc916c6cacf`.

Owner has added one bounded presentation change before branch closeout. Do not delete
`feat/catalogue-pages-governance` yet.

## Phase 5 authorised scope

Change the foundation navigation/order to exactly:

`Colour | Typography | Actions | Layout | Design Tokens`

Builder must:

1. Continue only on `feat/catalogue-pages-governance`; branch capacity is already satisfied.
2. Add an independent `Layout` route immediately before Design Tokens in root and page navigation.
3. Move the current **Spacing**, **Layout**, and **Geometry** groups out of Design Tokens and into Layout.
4. Layout may organise verified WEX presentation authority into clear subsections for:
   - spacing / gaps;
   - layout/grid;
   - geometry / radius;
   - borders;
   - interaction presentation;
   - shadows;
   - loading / skeleton / shimmer.
5. **Do not invent missing authority.** A subsection may render only values/rules already verified in current WEX source, accepted ADRs, or mapped authority. If Shadows or Loading/Skeleton/Shimmer (or any other named subsection) has no existing WEX authority, do not create local CSS/tokens/examples to fill it. Record that category as an authority gap/deferred capability in the handoff instead.
6. Design Tokens must remain a separate page and must no longer duplicate the Layout-owned spacing/layout/geometry content. It may show other already-authorised token material only; do not invent a new token taxonomy.
7. Preserve Colour, Typography, and Actions behaviour exactly.
8. Preserve canonical `@weerax/wex` bundle, shared header/footer/theme mechanics, accessibility, responsive behaviour, and main-only Pages deployment.
9. Components remain deferred. No new shared UI component, schema, adapter, domain logic, token value, or presentation architecture is authorised.
10. Keep every new/changed authored file <=600 lines.

## Required evidence

- authority audit for every proposed Layout subsection, explicitly marking present vs absent authority;
- `pnpm audit:foundation`;
- runtime type-check, tests, and production build;
- `pnpm check`;
- `git diff --check`;
- exact changed-file line counts;
- built-output proof for root + Colour + Typography + Actions + Layout + Design Tokens;
- Chrome/local-candidate verification of navigation order, Light/Dark theme, keyboard/skip-link, responsive layout, and absence of duplicated Layout-owned groups on Design Tokens;
- explicit proof that no new raw visual/token values were invented.

Builder commits/pushes the bounded change, updates this same file to
`AWAITING REVIEWER REVIEW` with exact SHA/evidence and any authority gaps, then stops.

Do not promote to `main` or delete the topic branch until Reviewer accepts this revision.
