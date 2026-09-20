# 0010: Foundation Geometry and Interaction Recovery

## Status

Proposed

## Context and scope

The verified WEX foundations already establish a three-tier language, the
`2, 4, 8, 12, …` spacing scale, and a distinct interaction model. They do not
yet register reusable radius or outer-state geometry. Consequently, the
accepted Button foundation implements the now-conflicting `1px` border,
square corners, Button-local focus offset, and `32 / 40 / 48px` minimum heights.

This decision recovers the missing reusable WEX presentation authority. It
supersedes only the conflicting geometry portions of [0006](./0006-button-geometry-authority.md)
and the disabled-opacity sentence of [0004](./0004-core-colour-tokens.md).
It preserves [0005](./0005-button-authority.md)'s closed ordinary Button
variants, transient pressed state, and exclusion of Selected from ordinary
Buttons. It creates no runtime, schema, shared-UI, catalogue, theme-editing,
or persistence authority.

## Decision

### Reusable radius tiers

WEX registers three reusable presentation radius tiers:

| Tier | Radius |
| --- | --- |
| Small | `4px` |
| Default | `8px` |
| Large | `12px` |

Components explicitly choose a registered radius tier; they do not invent
component-local corner values. A component's size tiers do not imply a matching
radius tier. A future WEX foundation implementation owns the token names and
CSS delivery for these values.

### Stable boundary and outer-state geometry

Default structural border treatment is `1px`. Selected and Focused each use a
`2px` outer treatment. They share an outside-the-component-box ring mechanism
with a `2px` outer gap between the component boundary and the outside state
ring, so neither changes layout dimensions. Their semantic state and colour
differ; their geometry does not.

Focused is an independent accessibility overlay and can coexist with an
ordinary component state. Selected is persistent/current state, is exposed
only by components whose contract supports persistent selection, and is never
the native transient Pressed state.

### Spacing relationships

The registered visual-element allowance is `2px`, used once for each registered
visual element only where its component/foundation model explicitly adopts it.
It is not a rule to add margin or space to every raw HTML wrapper.

Button direct content elements use a `4px` relationship gap. Button containers
use `4px` block padding and `12px` inline padding. The allowance, relationship
gap, and container padding have different jobs and compose without creating a
general WEX margin API.

### Button reconciliation

This section supersedes the conflicting geometry table and border/radius/focus
paragraphs of ADR 0006. All five ordinary Button variants retain identical
geometry within a tier and keep the typography established by ADR 0006.

| Tier | Minimum block size | Ordinary Button radius | Container padding |
| --- | --- | --- | --- |
| Small | `36px` | Default (`8px`) | `4px` block / `12px` inline |
| Default | `40px` | Default (`8px`) | `4px` block / `12px` inline |
| Large | `44px` | Default (`8px`) | `4px` block / `12px` inline |

Small, Default, and Large control Button sizing and typography only; every
ordinary Button consumes the reusable Default (`8px`) radius. The Small and
Large radius tiers remain available to components that explicitly adopt them.
A full-circle or pill Button is a separate shape contract and is not implied or
authorised by any ordinary Button size tier.

Button specifically consumes the Default (`1px`) structural border in every
appearance and state; a visually borderless Button resolves that boundary to
transparent. The boundary is included in each minimum height. Button focus and
any future Button Selected treatment consume the independent reusable `2px`
outer-ring geometry with its `2px` gap, so they neither replace nor thicken the
Button boundary and never change layout dimensions. Ordinary Buttons remain
non-selectable under ADR 0005. This decision does not change Button
appearances, actions, family types, loading/shimmer, dropdown or group
behaviour.

### Interaction and disabled authority

Reusable WEX interaction roles are Default, Hover, Pressed, Selected, Focused,
and Disabled. Hover is restrained; Pressed is transient native active/tap-down;
Selected is persistent; Focused is the independent outer accessibility layer;
Disabled removes interaction. Colour-state mappings remain governed by ADRs
0004 and 0005 unless a later decision changes them.

All disabled components use `--wex-opacity-disabled: 0.2`, applied once at the
outermost disabled component to prevent compounding. This replaces the `0.1`
rule in ADR 0004. Button continues to consume the universal token and must not
define a Button-specific disabled opacity.

## Consequences and implementation gate

No CSS, tests, schemas, shared UI, runtime, catalogue, Pages, or historical
source changes are authorised by this proposal. If accepted, a separate
implementation phase must establish the reusable WEX foundation, update only
the required Button consumption, revise focused verification, and preserve the
existing dependency direction and ordinary Button state contract.

Customer/business theme editing and derivation of light/dark tonal variants
from editable base colours remain a separate future theming-authority phase.
