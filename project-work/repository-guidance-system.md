# Repository Guidance System Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Button Code Map integration

## Reviewer Verdict

**Proceed**

WEX Foundation Code Maps are accepted on `main`.

Reviewer independently verified:

- current `main` is exactly `d02a5f33d224c74b1df6dce8ef3e89a2bbd370c2`;
- the promoted files match the accepted Phase 1 candidate;
- no additional changes were introduced during promotion;
- the accepted maps remain navigation evidence and preserve ADR 0009 boundaries.

Accepted Foundation maps:

- `docs/code-map/colour.md`
- `docs/code-map/typography-font-delivery.md`
- `docs/code-map/spacing.md`
- `docs/code-map/interaction-focus.md`
- `docs/code-map/layout.md`
- `docs/code-map/sizing-tier-system.md`

## Phase 2 — Button Code Map integration

Before creating the next branch, close the completed Phase 1 branch:

1. Verify `origin/main` still contains `docs/wex-foundation-code-maps` at `d02a5f33d224c74b1df6dce8ef3e89a2bbd370c2`.
2. Delete remote `docs/wex-foundation-code-maps` only after that verification.
3. Do not delete `review/button-local-recovery`; it remains retained historical recovery evidence.

Then create exactly one new topic branch from current `main`:

`docs/button-code-map-integration`

On that branch:

1. Audit the current accepted `docs/code-map/button-system.md`, Button ADRs, current Button schema/shared UI/WEX/test locations, and the newly accepted Foundation maps.
2. Update only `docs/code-map/button-system.md` unless a broken navigation link in `docs/code-map/README.md` is proven to require correction.
3. Link Button to the accepted Foundation maps it demonstrably consumes:
   - Colour;
   - Typography/font delivery;
   - Spacing;
   - Interaction/focus;
   - Sizing/tier system;
   - Layout only if current Button authority/source demonstrates a real dependency or routing need.
4. Do not duplicate token values, padding measurements, typography sizes, colour values, border/radius values, focus values, or other contracts into the Button map.
5. Preserve Button-specific ADR authority for Button-local geometry/state/action/runtime rules.
6. Refresh Button map verification metadata against the current `main` SHA.
7. Run link verification, `git diff --check`, and relevant focused repository checks.
8. Commit/push the single topic branch, verify its remote SHA, update this same work file to `AWAITING REVIEWER REVIEW`, and stop.

## Exclusions

Do not modify WEX source, Button source, schemas, shared UI, adapters, applications, Foundation maps/rules, ADRs, CI/tooling, GitHub Pages runtime, or external repositories.
