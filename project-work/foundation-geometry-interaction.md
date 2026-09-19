# Foundation Geometry and Interaction Recovery Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Foundation geometry/interaction authority promoted to main

## Reviewer Verdict

**Proceed**

Reviewer independently inspected the corrected candidate `origin/docs/foundation-geometry-interaction-authority` at `72bd24a6b6d5b757f4629b00fc5682d1b67e1089`.

The branch is two commits ahead of `main`, zero behind, and changes only:

- `docs/decisions/0010-foundation-geometry-interaction.md`

## Accepted authority

ADR 0010 now correctly establishes:

- Radius tiers: Small `4px`, Default `8px`, Large `12px`.
- Default structural border: `1px`.
- Selected outer ring: `2px`.
- Focused outer ring: `2px`.
- Shared outer gap between component boundary and state ring: `2px`.
- Focused and Selected share outside-the-component-box geometry without changing layout dimensions.
- Focused remains an independent accessibility overlay.
- Selected remains persistent/current state and is distinct from transient Pressed.
- Registered visual-element allowance: `2px` only where explicitly adopted.
- Button direct-content relationship gap: `4px`.
- Button container padding: `4px` block / `12px` inline.
- Button-specific stable boundary: `2px`, transparent where visually borderless.
- Button minimum heights: Small `36px`, Default `40px`, Large `44px`.
- Universal disabled opacity: `--wex-opacity-disabled: 0.2`, applied once at the outermost disabled component.
- Button continues consuming the universal disabled token.
- Customer/business colour-theme derivation remains explicitly deferred.

The corrected wording no longer implies that every WEX component must use a `2px` base border and no longer uses ambiguous inset terminology.

## Builder action — promotion only

Promote the exact accepted candidate `72bd24a6b6d5b757f4629b00fc5682d1b67e1089` to `main` by fast-forward only.

Requirements:

1. Verify `origin` is exactly `CodeByNath/WEXdesigns`.
2. Verify the remote topic branch still resolves to the exact accepted SHA.
3. Verify `origin/main` remains an ancestor with no intervening divergence.
4. Fast-forward `main` to that exact SHA. Do not amend, rebase, squash, or add changes.
5. Verify remote `main` resolves to that exact SHA.
6. Update this same work file to `AWAITING REVIEWER REVIEW` with exact promotion evidence and stop.

Do not begin CSS/tests implementation yet. Do not delete the topic branch yet.

## Exclusions

No CSS, tests, schemas, shared UI, runtime, catalogue, Pages, historical source, theme editing, or unrelated Button-family work in this promotion phase.

## Builder promotion handoff

- Verified `origin/docs/foundation-geometry-interaction-authority` at the accepted `72bd24a6b6d5b757f4629b00fc5682d1b67e1089`, with `origin/main` as its ancestor and no divergence.
- Fast-forwarded and pushed `main` to exactly `72bd24a6b6d5b757f4629b00fc5682d1b67e1089`; remote `main` was directly verified at that SHA.
- The promotion contains only `docs/decisions/0010-foundation-geometry-interaction.md`. No CSS, tests, schemas, shared UI, runtime, catalogue, Pages, historical source, theme editing, or Button-family implementation was added.
