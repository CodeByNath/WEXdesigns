# 0012: Page Heading DNA v1

## Status

Accepted — authority definition only. No implementation is authorised by this
decision.

## Context and authority inspected

The accepted Owner direction authorises one demonstrated semantic role, `Page
Heading`, rather than a pre-built heading family. The historical WEX authority
maps Page Heading to the Heading type set. Its primary/default Heading
selection is Regular, and it supplies registered Large, Small, Light,
SemiBold, and Italic concerns. The root runtime page's `h1` in
[`apps/web-runtime/index.html`](../../apps/web-runtime/index.html) uses
`wex-type-heading-large-semibold`, demonstrating existing Heading Large-tier
consumption without creating a competing token system. That runtime evidence
establishes the tier only; the accepted Default weight remains the registered
primary/default Heading weight below.

The current WEX colour foundation supplies semantic text roles with light/dark
theme inversion. `text-primary` is black in the default light theme, `text-
inverse` is its inverse role, and `text-accent` is the registered accent role.
No heading-specific loading, shimmer, spacing, layout, interaction, component,
or HTML-heading-semantics authority exists.

## Decision

`Page Heading` is the sole registered Heading DNA role in v1. It has a complete
Default and sparse Attributes. Attribute names are semantic governed variants;
they are not raw-value names.

```text
Page Heading
├── Default
└── Attributes
    ├── Size
    │   └── Small
    ├── Colour
    │   ├── Light
    │   └── Accent
    ├── Weight
    │   ├── Bold
    │   └── Thin
    └── Style
        └── Italic
```

### Binding token-reference rule

The connection from WEX foundations to DNA is dynamic and tokenized. DNA owns
the approved relationship between existing WEX foundation tokens; it does not
own duplicate copies of their resolved raw values. A DNA concern therefore
references the authoritative typography, colour, weight, style, loading, or
other foundation token when one exists. It must not copy or hardcode hex
colours, font sizes, font weights, line heights, spacing, radius/border,
animation/loading, or any other governed foundation value.

```text
WEX foundation tokens
  -> Page Heading Default DNA references
  -> sparse registered Attribute overrides
  -> consuming component or composition
```

Changing an underlying foundation token changes every consuming DNA resolution
through that reference; DNA must not be manually updated with a duplicate
resolved value. An Attribute has the same rule and contains only the approved
token reference for the concern it overrides.

No new token system, raw alias, storage location, or token naming convention
is authorised by this decision. If a needed WEX foundation token or reference
mechanism is absent, that concern stops at an architecture gap rather than
being hardcoded.

### Default

Default resolves the existing WEX Page Heading mapping without authoring a new
visual value:

- Typography: Heading Large uses these registered token references:
  `--wex-type-heading-large-font-family`,
  `--wex-type-heading-large-font-size`,
  `--wex-type-heading-large-line-height`, and
  `--wex-type-heading-large-letter-spacing`.
- Weight: the registered primary/default Heading weight token,
  `--wex-type-weight-regular`.
- Style: the registered normal style token, `--wex-type-style-normal`.
- Colour: `--wex-color-text-primary`, the existing default dark foreground in
  the light theme and the theme-aware primary text role in every WEX theme.
- Theme/inversion: inherited solely from the colour role; no Page Heading
  theme values are authored.

This is the complete current DNA: no separate responsive, spacing, layout,
interaction/state, loading, or shimmer concern is registered because current
WEX authority does not establish one for Page Heading.

### Attributes

Each Attribute changes only its stated concern and inherits every other Default
concern. An Attribute must not duplicate an inherited Default value.

| Attribute | Sole delta | Existing WEX mapping |
| --- | --- | --- |
| `Small` | Typography size/rhythm | `--wex-type-heading-small-font-size` and `--wex-type-heading-small-line-height`; Default family, letter-spacing, Regular weight, normal style, colour, and every other concern remain inherited. |
| `Light` | Colour | `--wex-color-text-inverse`; its theme resolution remains owned by the existing colour foundation. |
| `Accent` | Colour | `--wex-color-text-accent`; its theme resolution remains owned by the existing colour foundation. |
| `Bold` | Weight | `--wex-type-weight-semibold`; `Bold` is the governed attribute name, not a new unregistered weight. |
| `Thin` | Weight | `--wex-type-weight-light`; `Thin` is the governed attribute name, not a new unregistered weight. |
| `Italic` | Style | `--wex-type-style-italic`. It is for text emphasis only, never decorative styling. |

## Non-matches and future roles

AI may use registered WEX DNA only. If no registered DNA or Attribute matches
the requested role, it must request an Owner decision or consult an authorised
AI/WEX engineer. It must not invent, approximate, substitute, or create a
value, token, or Attribute.

`Page Subheading`, `Layout Heading`, `Section Heading`, `Subsection Heading`,
`Group Heading`, and every other heading role remain absent until a demonstrated
need establishes a separately governed decision. Version and deprecation
machinery are likewise deferred until a demonstrated change requires them.

## Consequences and implementation boundary

This decision creates no CSS custom properties, selectors, schema, component,
component API, HTML heading ownership, margin, layout composition, runtime
rendering, catalogue content, brand customisation, loading treatment, or other
DNA family. Existing WEX foundations continue to deliver the mapped values.

A future consumer must be separately authorised and must consume these
registered concerns without creating a parallel visual-value system.
