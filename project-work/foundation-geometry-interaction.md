# Foundation Geometry and Interaction Recovery Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Authority proposal pushed — recover missing WEX geometry and interaction foundations

## Why this work exists

The live System Settings/Button showcase exposed that reusable WEX geometry and state rules previously discussed were not carried into repository authority. Current accepted ADRs instead leave Button at `1px` border, `0` radius, Button-local focus offset, and universal disabled opacity `0.1`.

This phase repairs authority only. Do not edit WEX CSS, schemas, shared UI, runtime, catalogue, Pages, or tests yet.

## Authorised branch

Create exactly one active topic branch from current `main`:

`docs/foundation-geometry-interaction-authority`

## Builder scope

Read current Foundation docs, Code Maps, historical WEX source, ADRs 0004–0006, Button source/tests, and the prior design-decision evidence supplied by the user.

Draft a new ADR that supersedes only the conflicting portions required to establish:

### Radius foundation

- Small: `4px`
- Default: `8px`
- Large: `12px`

Radius is reusable WEX presentation authority; components consume the registered tier rather than inventing local radii.

### Border and outer-state geometry

- Default structural border: `1px`
- Selected outer treatment: `2px`
- Focused outer treatment: `2px`
- Outer state gap/inset: `2px`
- Focused and Selected use one outer-ring geometry mechanism outside the component box, preserve layout dimensions, and differ by semantic state/colour rather than box model.
- Focus is independent and may coexist with ordinary component state.
- Selected is persistent/current state; native Pressed is transient and must not be treated as Selected.

### Spacing relationships

- Registered visual-element allowance: `2px` once per registered visual element where that model is explicitly used; not automatically on every raw HTML wrapper.
- Relationship gap between Button content elements: `4px`.
- Recover Button container padding decision: `4px` block / `12px` inline.
- The ADR must explain how element allowance + relationship gap compose without turning margin into a WEX spacing API.

### Button geometry reconciliation

Explicitly supersede the conflicting Button geometry in ADR 0006 where required:
- Button tier radii consume Radius Small / Default / Large.
- Stable Button boundary is `2px` in every appearance/state, transparent where visually borderless.
- Button minimum heights resolve to Small `36px`, Default `40px`, Large `44px` under the recovered geometry.
- Do not change Button appearances, semantic actions, family types, loading/shimmer, dropdown/group behaviour, or other unrelated Button contracts in this phase.

### Interaction roles

Preserve distinct reusable WEX roles:
- Default
- Hover
- Pressed
- Selected
- Focused
- Disabled

Pressed remains transient interaction. Selected remains persistent. Focused remains an independent outer accessibility treatment.

### Disabled

Change universal disabled opacity authority from `10%` to `20%`:
- `--wex-opacity-disabled: 0.2`
- apply once at the outermost disabled component;
- Button continues consuming the universal token rather than owning a separate disabled value.

## Explicitly deferred

Customer/business theme editing and derivation of Light/Dark tonal variants from editable base colours is a separate future theming-authority phase. Do not mix it into this geometry/interaction ADR.

## Evidence / handoff

This phase is documentation/authority only.

- Run `git diff --check`.
- Verify links and supersession references.
- Push the single topic branch.
- Update this same work file to `AWAITING REVIEWER REVIEW` with exact branch/SHA, changed files, and any unresolved authority conflict.
- Stop. Do not implement CSS or tests until Reviewer accepts the authority proposal.

## Builder handoff

- Candidate: `origin/docs/foundation-geometry-interaction-authority` at `654f6eb57192793c92c85ec68ec5d4a08dab77dd`.
- Changed only: `docs/decisions/0010-foundation-geometry-interaction.md` (new proposed ADR).
- Evidence: `git diff --check` passed; all links to ADRs 0004–0006 were verified; the proposal keeps WEX presentation authority and records only the authorised radius, stable-boundary/outer-ring, spacing-relationship, Button reconciliation, interaction-role, and universal disabled-opacity decisions.
- No unresolved ADR conflict was identified. Exact CSS tokens/delivery and all CSS, test, schema, runtime, catalogue, Pages, and theme-editing work remain deliberately gated behind Reviewer acceptance and a later implementation phase.
