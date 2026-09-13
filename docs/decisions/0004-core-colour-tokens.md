# 0004: Core Colour Tokens

## Status

Accepted

## Decision

Add the first semantic token layer above the approved WEX colour primitives. This layer covers backgrounds, borders, text, links, icons, focus, status, and the universal disabled opacity. Component-specific tokens remain outside this decision.

## Background rhythm

Every composition begins on Background Primary. Direct child surfaces may use Background Secondary, and their nested controls return to Background Primary:

```text
Background Primary
-> Background Secondary
-> Background Primary
-> Background Secondary
```

The role is assigned explicitly at each composition boundary. CSS must not infer the role from DOM nesting depth.

Light and dark themes invert the neutral values without changing the semantic sequence:

| Role | Light theme | Dark theme |
| --- | --- | --- |
| Background Primary | White | Black |
| Background Secondary | Light | Dark |

Accent and status backgrounds use Base for default, Dark for hover, and Light for selected. Focus does not change the background. It is a separate Accent border layer.

## Core roles

- Background: Primary, Secondary, Accent, Accent Hover, Accent Selected
- Border: Primary, Subtle, Interactive, Focus
- Text: Primary, Secondary, Placeholder, Accent, Success, Warning, Error
- Link: Primary, Secondary
- Icon: Primary, Secondary, Accent
- Status backgrounds: Warning, Success, Error, each with Default, Hover, Selected
- State: Disabled Opacity

Typography and colour remain independent axes. For example, Heading Large plus Text Primary produces the rendered Heading Primary Large treatment without creating a new combined CSS token.

## Accessibility resolutions

Semantic foreground colours resolve by theme when a fixed primitive would fail normal-text contrast:

- Text Accent uses Accent in light themes and Accent Light in dark themes.
- Text Success uses Green Dark in light themes and Green Light in dark themes.
- Text Warning uses Text Primary in light themes with Yellow supplied by an accompanying indicator or container; it uses Yellow in dark themes.
- Text Error uses Red in light themes and Red Light in dark themes.
- Link Primary uses Accent in light themes and Accent Light in dark themes.
- Link Secondary uses Accent Dark in light themes. It shares Accent Light with Link Primary in dark themes, so hierarchy must come from typography or decoration rather than an inaccessible colour.

## Disabled rule

All disabled components use `--wex-opacity-disabled: 0.1`. Apply it once to the outermost disabled component so nested content does not compound the opacity. Disabled behaviour and focus exclusion remain component responsibilities.

## Compatibility

Existing Background, Layer, Border Strong, Interactive, and Focus token names remain as aliases. Per-property disabled colour tokens and neutral interactive-surface state tokens are retired; the universal opacity rule replaces the former, and the latter belongs to future component token decisions.
