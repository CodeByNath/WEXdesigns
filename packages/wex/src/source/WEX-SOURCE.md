/\* ============================================================

WEX — WeeraXStudio Design System

Typography System

Version: 1.1

Architecture

\------------------------------------------------------------

1\. Core tokens

2\. Type-set tokens

3\. Usable typography styles

4\. Spacing foundation

5\. Colour foundation

6\. Interaction foundation

7\. Button foundation

8\. Global 3-tier system

9\. Recursive layout + grid foundation

Type Style Grammar

\------------------------------------------------------------

wex-type-{set}-{size}-{weight}

wex-type-{set}-{size}-{weight}-italic

Size Architecture

\------------------------------------------------------------

small

default

large

\============================================================ \*/

# WEX Typography Architecture

WEX typography is organised around four core type sets. Each core set uses the same three-size architecture: **Small / Default / Large**. Context-specific typography is mapped to these sets later rather than introducing a new scale for every UI use case.

| Core type set | Primary purpose | Size architecture | Status |
| --- | --- | --- | --- |
| Heading | Page and layout headings | Small / Default / Large | Built |
| Title | Section and component headings | Small / Default / Large | Built |
| Navigation | Menus and labels | Small / Default / Large | Built |
| Body | Paragraphs and general reading | Small / Default / Large | Built |

## Context mapping model

Context styles will reference the core type sets instead of creating independent typography systems. Initial mappings are expected to include:

- Page heading → Heading
- Layout heading → Heading
- Section heading → Title
- Component heading → Title
- Menu → Navigation
- Label → Navigation
- Paragraph → Body
- Button → context mapping to be defined
- Tagline → context mapping to be defined
- Breadcrumb, caption, helper text and other cases → defined after the core sets are stable

## Naming contract

```text
wex-type-{set}-{size}-{weight}
wex-type-{set}-{size}-{weight}-italic
```

Core sets:

```text
heading
title
navigation
body
```

Sizes:

```text
small
default
large
```

Weights:

```text
light
regular
semibold
```

Italic remains a modifier of a resolved style.

## Ecosystem size pairing rule

The WEX three-size architecture is relational across the entire typography ecosystem. When multiple core type sets appear in the same composition, their size tier must match.

```text
Heading Large   → Title Large   → Navigation Large   → Body Large
Heading Default → Title Default → Navigation Default → Body Default
Heading Small   → Title Small   → Navigation Small   → Body Small
```

Do not compile or pair mismatched tiers such as `Heading Large` with `Title Default` or `Title Small`. The same rule applies to every core set and later context mapping. Size names describe a shared hierarchy tier, not just an isolated font size.

This relationship is part of the WEX composition contract and should later be enforced by DesignMaster when selecting typography.

---

/\* ============================================================

1\. WEX CORE TYPOGRAPHY TOKENS

\============================================================ \*/

:root {

/\* ----------------------------------------------------------

Font families

\---------------------------------------------------------- \*/

\--wex-type-family-sans:

"IBM Plex Sans",

"Helvetica Neue",

Arial,

sans-serif;

/\* ----------------------------------------------------------

Font weights

\---------------------------------------------------------- \*/

\--wex-type-weight-light: 300;

\--wex-type-weight-regular: 400;

\--wex-type-weight-semibold: 600;

/\* ----------------------------------------------------------

Font styles

\---------------------------------------------------------- \*/

\--wex-type-style-normal: normal;

\--wex-type-style-italic: italic;

/\* ----------------------------------------------------------

Type scale

IBM Plex scale

Base y0 = 12px

\---------------------------------------------------------- \*/

\--wex-type-size-12: 0.75rem; /\* 12px \*/

\--wex-type-size-14: 0.875rem; /\* 14px \*/

\--wex-type-size-16: 1rem; /\* 16px \*/

\--wex-type-size-18: 1.125rem; /\* 18px \*/

\--wex-type-size-20: 1.25rem; /\* 20px \*/

\--wex-type-size-24: 1.5rem; /\* 24px \*/

\--wex-type-size-28: 1.75rem; /\* 28px \*/

\--wex-type-size-32: 2rem; /\* 32px \*/

\--wex-type-size-36: 2.25rem; /\* 36px \*/

\--wex-type-size-42: 2.625rem; /\* 42px \*/

\--wex-type-size-48: 3rem; /\* 48px \*/

\--wex-type-size-54: 3.375rem; /\* 54px \*/

\--wex-type-size-60: 3.75rem; /\* 60px \*/

\--wex-type-size-68: 4.25rem; /\* 68px \*/

\--wex-type-size-76: 4.75rem; /\* 76px \*/

\--wex-type-size-84: 5.25rem; /\* 84px \*/

\--wex-type-size-92: 5.75rem; /\* 92px \*/

/\* ----------------------------------------------------------

Line-height scale

Keep line-height values independent from individual

type styles so they can be reused by future type sets.

\---------------------------------------------------------- \*/

\--wex-type-line-height-16: 1rem;

\--wex-type-line-height-18: 1.125rem;

\--wex-type-line-height-20: 1.25rem;

\--wex-type-line-height-22: 1.375rem;

\--wex-type-line-height-24: 1.5rem;

\--wex-type-line-height-26: 1.625rem;

\--wex-type-line-height-28: 1.75rem;

\--wex-type-line-height-30: 1.875rem;

\--wex-type-line-height-32: 2rem;

\--wex-type-line-height-36: 2.25rem;

\--wex-type-line-height-40: 2.5rem;

\--wex-type-line-height-44: 2.75rem;

\--wex-type-line-height-48: 3rem;

\--wex-type-line-height-50: 3.125rem;

\--wex-type-line-height-52: 3.25rem;

\--wex-type-line-height-56: 3.5rem;

\--wex-type-line-height-60: 3.75rem;

\--wex-type-line-height-64: 4rem;

\--wex-type-line-height-72: 4.5rem;

\--wex-type-line-height-80: 5rem;

\--wex-type-line-height-88: 5.5rem;

\--wex-type-line-height-96: 6rem;

/\* ----------------------------------------------------------

Letter spacing

\---------------------------------------------------------- \*/

\--wex-type-letter-spacing-default: 0;

}

/\* ============================================================

2\. GLOBAL FONT FOUNDATION

\============================================================ \*/

html {

font-family: var(--wex-type-family-sans);

font-synthesis: none;

text-rendering: optimizeLegibility;

\-webkit-font-smoothing: antialiased;

\-moz-osx-font-smoothing: grayscale;

}

body {

font-family: inherit;

}

/\* ============================================================

3\. HEADING TYPE SET

\============================================================

Purpose:

Page headings and layout headings.

Do not use this Heading type set for headings contained

inside UI containers or component surfaces.

Architecture:

Heading

├── Small

│ ├── Light

│ ├── Regular

│ └── SemiBold

├── Default

│ ├── Light

│ ├── Regular

│ └── SemiBold

└── Large

├── Light

├── Regular

└── SemiBold

Every weight also supports italic.

\============================================================ \*/

:root {

/\* ----------------------------------------------------------

Heading Small

Size: 32px / 2rem

Line height: 40px / 2.5rem

Letter spacing: 0

\---------------------------------------------------------- \*/

\--wex-type-heading-small-font-family:

var(--wex-type-family-sans);

\--wex-type-heading-small-font-size:

var(--wex-type-size-32);

\--wex-type-heading-small-line-height:

var(--wex-type-line-height-40);

\--wex-type-heading-small-letter-spacing:

var(--wex-type-letter-spacing-default);

/\* ----------------------------------------------------------

Heading Default

Size: 36px / 2.25rem

Line height: 44px / 2.75rem

Letter spacing: 0

\---------------------------------------------------------- \*/

\--wex-type-heading-default-font-family:

var(--wex-type-family-sans);

\--wex-type-heading-default-font-size:

var(--wex-type-size-36);

\--wex-type-heading-default-line-height:

var(--wex-type-line-height-44);

\--wex-type-heading-default-letter-spacing:

var(--wex-type-letter-spacing-default);

/\* ----------------------------------------------------------

Heading Large

Size: 42px / 2.625rem

Line height: 50px / 3.125rem

Letter spacing: 0

\---------------------------------------------------------- \*/

\--wex-type-heading-large-font-family:

var(--wex-type-family-sans);

\--wex-type-heading-large-font-size:

var(--wex-type-size-42);

\--wex-type-heading-large-line-height:

var(--wex-type-line-height-50);

\--wex-type-heading-large-letter-spacing:

var(--wex-type-letter-spacing-default);

}

/\* ============================================================

4\. BASE HEADING CLASSES

\============================================================

These provide size/rhythm only.

Weight and italic variations are layered independently.

This separation is useful for:

\- CSS

\- design token export

\- component systems

\- DesignMaster agent resolution

\============================================================ \*/

/\* Heading Small \*/

.wex-type-heading-small {

font-family: var(--wex-type-heading-small-font-family);

font-size: var(--wex-type-heading-small-font-size);

line-height: var(--wex-type-heading-small-line-height);

letter-spacing: var(--wex-type-heading-small-letter-spacing);

}

/\* Heading Default \*/

.wex-type-heading-default {

font-family: var(--wex-type-heading-default-font-family);

font-size: var(--wex-type-heading-default-font-size);

line-height: var(--wex-type-heading-default-line-height);

letter-spacing: var(--wex-type-heading-default-letter-spacing);

}

/\* Heading Large \*/

.wex-type-heading-large {

font-family: var(--wex-type-heading-large-font-family);

font-size: var(--wex-type-heading-large-font-size);

line-height: var(--wex-type-heading-large-line-height);

letter-spacing: var(--wex-type-heading-large-letter-spacing);

}

/\* ============================================================

5\. WEIGHT MODIFIERS

\============================================================ \*/

.wex-type-light {

font-weight: var(--wex-type-weight-light);

}

.wex-type-regular {

font-weight: var(--wex-type-weight-regular);

}

.wex-type-semibold {

font-weight: var(--wex-type-weight-semibold);

}

/\* ============================================================

6\. STYLE MODIFIERS

\============================================================ \*/

.wex-type-normal {

font-style: var(--wex-type-style-normal);

}

.wex-type-italic {

font-style: var(--wex-type-style-italic);

}

/\* ============================================================

7\. COMPLETE HEADING STYLE CLASSES

\============================================================

These are the canonical resolved styles.

DesignMaster should eventually resolve directly to one

of these styles rather than composing arbitrary values.

\============================================================ \*/

/\* ------------------------------------------------------------

Heading Small — Light

\------------------------------------------------------------ \*/

.wex-type-heading-small-light {

font-family: var(--wex-type-heading-small-font-family);

font-size: var(--wex-type-heading-small-font-size);

font-weight: var(--wex-type-weight-light);

font-style: var(--wex-type-style-normal);

line-height: var(--wex-type-heading-small-line-height);

letter-spacing: var(--wex-type-heading-small-letter-spacing);

}

.wex-type-heading-small-light-italic {

font-family: var(--wex-type-heading-small-font-family);

font-size: var(--wex-type-heading-small-font-size);

font-weight: var(--wex-type-weight-light);

font-style: var(--wex-type-style-italic);

line-height: var(--wex-type-heading-small-line-height);

letter-spacing: var(--wex-type-heading-small-letter-spacing);

}

/\* ------------------------------------------------------------

Heading Small — Regular

\------------------------------------------------------------ \*/

.wex-type-heading-small-regular {

font-family: var(--wex-type-heading-small-font-family);

font-size: var(--wex-type-heading-small-font-size);

font-weight: var(--wex-type-weight-regular);

font-style: var(--wex-type-style-normal);

line-height: var(--wex-type-heading-small-line-height);

letter-spacing: var(--wex-type-heading-small-letter-spacing);

}

.wex-type-heading-small-regular-italic {

font-family: var(--wex-type-heading-small-font-family);

font-size: var(--wex-type-heading-small-font-size);

font-weight: var(--wex-type-weight-regular);

font-style: var(--wex-type-style-italic);

line-height: var(--wex-type-heading-small-line-height);

letter-spacing: var(--wex-type-heading-small-letter-spacing);

}

/\* ------------------------------------------------------------

Heading Small — SemiBold

\------------------------------------------------------------ \*/

.wex-type-heading-small-semibold {

font-family: var(--wex-type-heading-small-font-family);

font-size: var(--wex-type-heading-small-font-size);

font-weight: var(--wex-type-weight-semibold);

font-style: var(--wex-type-style-normal);

line-height: var(--wex-type-heading-small-line-height);

letter-spacing: var(--wex-type-heading-small-letter-spacing);

}

.wex-type-heading-small-semibold-italic {

font-family: var(--wex-type-heading-small-font-family);

font-size: var(--wex-type-heading-small-font-size);

font-weight: var(--wex-type-weight-semibold);

font-style: var(--wex-type-style-italic);

line-height: var(--wex-type-heading-small-line-height);

letter-spacing: var(--wex-type-heading-small-letter-spacing);

}

/\* ------------------------------------------------------------

Heading Default — Light

\------------------------------------------------------------ \*/

.wex-type-heading-default-light {

font-family: var(--wex-type-heading-default-font-family);

font-size: var(--wex-type-heading-default-font-size);

font-weight: var(--wex-type-weight-light);

font-style: var(--wex-type-style-normal);

line-height: var(--wex-type-heading-default-line-height);

letter-spacing: var(--wex-type-heading-default-letter-spacing);

}

.wex-type-heading-default-light-italic {

font-family: var(--wex-type-heading-default-font-family);

font-size: var(--wex-type-heading-default-font-size);

font-weight: var(--wex-type-weight-light);

font-style: var(--wex-type-style-italic);

line-height: var(--wex-type-heading-default-line-height);

letter-spacing: var(--wex-type-heading-default-letter-spacing);

}

/\* ------------------------------------------------------------

Heading Default — Regular

\------------------------------------------------------------ \*/

.wex-type-heading-default-regular {

font-family: var(--wex-type-heading-default-font-family);

font-size: var(--wex-type-heading-default-font-size);

font-weight: var(--wex-type-weight-regular);

font-style: var(--wex-type-style-normal);

line-height: var(--wex-type-heading-default-line-height);

letter-spacing: var(--wex-type-heading-default-letter-spacing);

}

.wex-type-heading-default-regular-italic {

font-family: var(--wex-type-heading-default-font-family);

font-size: var(--wex-type-heading-default-font-size);

font-weight: var(--wex-type-weight-regular);

font-style: var(--wex-type-style-italic);

line-height: var(--wex-type-heading-default-line-height);

letter-spacing: var(--wex-type-heading-default-letter-spacing);

}

/\* ------------------------------------------------------------

Heading Default — SemiBold

\------------------------------------------------------------ \*/

.wex-type-heading-default-semibold {

font-family: var(--wex-type-heading-default-font-family);

font-size: var(--wex-type-heading-default-font-size);

font-weight: var(--wex-type-weight-semibold);

font-style: var(--wex-type-style-normal);

line-height: var(--wex-type-heading-default-line-height);

letter-spacing: var(--wex-type-heading-default-letter-spacing);

}

.wex-type-heading-default-semibold-italic {

font-family: var(--wex-type-heading-default-font-family);

font-size: var(--wex-type-heading-default-font-size);

font-weight: var(--wex-type-weight-semibold);

font-style: var(--wex-type-style-italic);

line-height: var(--wex-type-heading-default-line-height);

letter-spacing: var(--wex-type-heading-default-letter-spacing);

}

/\* ------------------------------------------------------------

Heading Large — Light

\------------------------------------------------------------ \*/

.wex-type-heading-large-light {

font-family: var(--wex-type-heading-large-font-family);

font-size: var(--wex-type-heading-large-font-size);

font-weight: var(--wex-type-weight-light);

font-style: var(--wex-type-style-normal);

line-height: var(--wex-type-heading-large-line-height);

letter-spacing: var(--wex-type-heading-large-letter-spacing);

}

.wex-type-heading-large-light-italic {

font-family: var(--wex-type-heading-large-font-family);

font-size: var(--wex-type-heading-large-font-size);

font-weight: var(--wex-type-weight-light);

font-style: var(--wex-type-style-italic);

line-height: var(--wex-type-heading-large-line-height);

letter-spacing: var(--wex-type-heading-large-letter-spacing);

}

/\* ------------------------------------------------------------

Heading Large — Regular

\------------------------------------------------------------ \*/

.wex-type-heading-large-regular {

font-family: var(--wex-type-heading-large-font-family);

font-size: var(--wex-type-heading-large-font-size);

font-weight: var(--wex-type-weight-regular);

font-style: var(--wex-type-style-normal);

line-height: var(--wex-type-heading-large-line-height);

letter-spacing: var(--wex-type-heading-large-letter-spacing);

}

.wex-type-heading-large-regular-italic {

font-family: var(--wex-type-heading-large-font-family);

font-size: var(--wex-type-heading-large-font-size);

font-weight: var(--wex-type-weight-regular);

font-style: var(--wex-type-style-italic);

line-height: var(--wex-type-heading-large-line-height);

letter-spacing: var(--wex-type-heading-large-letter-spacing);

}

/\* ------------------------------------------------------------

Heading Large — SemiBold

\------------------------------------------------------------ \*/

.wex-type-heading-large-semibold {

font-family: var(--wex-type-heading-large-font-family);

font-size: var(--wex-type-heading-large-font-size);

font-weight: var(--wex-type-weight-semibold);

font-style: var(--wex-type-style-normal);

line-height: var(--wex-type-heading-large-line-height);

letter-spacing: var(--wex-type-heading-large-letter-spacing);

}

.wex-type-heading-large-semibold-italic {

font-family: var(--wex-type-heading-large-font-family);

font-size: var(--wex-type-heading-large-font-size);

font-weight: var(--wex-type-weight-semibold);

font-style: var(--wex-type-style-italic);

line-height: var(--wex-type-heading-large-line-height);

letter-spacing: var(--wex-type-heading-large-letter-spacing);

}

/\* ============================================================

8\. TITLE TYPE SET

\============================================================

Purpose:

Section headings and component headings.

Title follows the same Small / Default / Large hierarchy,
weight system and italic emphasis model as Heading.

Architecture:

Title
├── Small
│ ├── Light
│ ├── Regular
│ └── SemiBold
├── Default
│ ├── Light
│ ├── Regular
│ └── SemiBold
└── Large
├── Light
├── Regular
└── SemiBold

Every weight also supports italic.

Primary emphasis:

Small   → Regular / 400
Default → Regular / 400
Large   → Light / 300

Ecosystem pairing:

Title Small   pairs with Heading / Navigation / Body Small.
Title Default pairs with Heading / Navigation / Body Default.
Title Large   pairs with Heading / Navigation / Body Large.

Do not mix hierarchy tiers inside the same composition.

\============================================================ \*/

:root {

/\* ----------------------------------------------------------

Title Small

Size: 24px / 1.5rem
Line height: 28px / 1.75rem
Primary weight: 400 / Regular
Letter spacing: 0

\---------------------------------------------------------- \*/

\--wex-type-title-small-font-family:

var(--wex-type-family-sans);

\--wex-type-title-small-font-size:

var(--wex-type-size-24);

\--wex-type-title-small-line-height:

var(--wex-type-line-height-28);

\--wex-type-title-small-letter-spacing:

var(--wex-type-letter-spacing-default);

/\* ----------------------------------------------------------

Title Default

Size: 28px / 1.75rem
Line height: 36px / 2.25rem
Primary weight: 400 / Regular
Letter spacing: 0

\---------------------------------------------------------- \*/

\--wex-type-title-default-font-family:

var(--wex-type-family-sans);

\--wex-type-title-default-font-size:

var(--wex-type-size-28);

\--wex-type-title-default-line-height:

var(--wex-type-line-height-36);

\--wex-type-title-default-letter-spacing:

var(--wex-type-letter-spacing-default);

/\* ----------------------------------------------------------

Title Large

Size: 36px / 2.25rem
Line height: 44px / 2.75rem
Primary weight: 300 / Light
Letter spacing: 0

\---------------------------------------------------------- \*/

\--wex-type-title-large-font-family:

var(--wex-type-family-sans);

\--wex-type-title-large-font-size:

var(--wex-type-size-36);

\--wex-type-title-large-line-height:

var(--wex-type-line-height-44);

\--wex-type-title-large-letter-spacing:

var(--wex-type-letter-spacing-default);

}

/\* ============================================================

9\. BASE TITLE CLASSES

\============================================================ \*/

.wex-type-title-small {

font-family: var(--wex-type-title-small-font-family);
font-size: var(--wex-type-title-small-font-size);
line-height: var(--wex-type-title-small-line-height);
letter-spacing: var(--wex-type-title-small-letter-spacing);

}

.wex-type-title-default {

font-family: var(--wex-type-title-default-font-family);
font-size: var(--wex-type-title-default-font-size);
line-height: var(--wex-type-title-default-line-height);
letter-spacing: var(--wex-type-title-default-letter-spacing);

}

.wex-type-title-large {

font-family: var(--wex-type-title-large-font-family);
font-size: var(--wex-type-title-large-font-size);
line-height: var(--wex-type-title-large-line-height);
letter-spacing: var(--wex-type-title-large-letter-spacing);

}

/\* ============================================================

10\. COMPLETE TITLE STYLE CLASSES

\============================================================

Canonical Title styles. Weight and italic behavior inherits
from the WEX core typography system used by Heading.

\============================================================ \*/

/\* Title Small — Light \*/

.wex-type-title-small-light {
font-family: var(--wex-type-title-small-font-family);
font-size: var(--wex-type-title-small-font-size);
font-weight: var(--wex-type-weight-light);
font-style: var(--wex-type-style-normal);
line-height: var(--wex-type-title-small-line-height);
letter-spacing: var(--wex-type-title-small-letter-spacing);
}

.wex-type-title-small-light-italic {
font-family: var(--wex-type-title-small-font-family);
font-size: var(--wex-type-title-small-font-size);
font-weight: var(--wex-type-weight-light);
font-style: var(--wex-type-style-italic);
line-height: var(--wex-type-title-small-line-height);
letter-spacing: var(--wex-type-title-small-letter-spacing);
}

/\* Title Small — Regular \*/

.wex-type-title-small-regular {
font-family: var(--wex-type-title-small-font-family);
font-size: var(--wex-type-title-small-font-size);
font-weight: var(--wex-type-weight-regular);
font-style: var(--wex-type-style-normal);
line-height: var(--wex-type-title-small-line-height);
letter-spacing: var(--wex-type-title-small-letter-spacing);
}

.wex-type-title-small-regular-italic {
font-family: var(--wex-type-title-small-font-family);
font-size: var(--wex-type-title-small-font-size);
font-weight: var(--wex-type-weight-regular);
font-style: var(--wex-type-style-italic);
line-height: var(--wex-type-title-small-line-height);
letter-spacing: var(--wex-type-title-small-letter-spacing);
}

/\* Title Small — SemiBold \*/

.wex-type-title-small-semibold {
font-family: var(--wex-type-title-small-font-family);
font-size: var(--wex-type-title-small-font-size);
font-weight: var(--wex-type-weight-semibold);
font-style: var(--wex-type-style-normal);
line-height: var(--wex-type-title-small-line-height);
letter-spacing: var(--wex-type-title-small-letter-spacing);
}

.wex-type-title-small-semibold-italic {
font-family: var(--wex-type-title-small-font-family);
font-size: var(--wex-type-title-small-font-size);
font-weight: var(--wex-type-weight-semibold);
font-style: var(--wex-type-style-italic);
line-height: var(--wex-type-title-small-line-height);
letter-spacing: var(--wex-type-title-small-letter-spacing);
}

/\* Title Default — Light \*/

.wex-type-title-default-light {
font-family: var(--wex-type-title-default-font-family);
font-size: var(--wex-type-title-default-font-size);
font-weight: var(--wex-type-weight-light);
font-style: var(--wex-type-style-normal);
line-height: var(--wex-type-title-default-line-height);
letter-spacing: var(--wex-type-title-default-letter-spacing);
}

.wex-type-title-default-light-italic {
font-family: var(--wex-type-title-default-font-family);
font-size: var(--wex-type-title-default-font-size);
font-weight: var(--wex-type-weight-light);
font-style: var(--wex-type-style-italic);
line-height: var(--wex-type-title-default-line-height);
letter-spacing: var(--wex-type-title-default-letter-spacing);
}

/\* Title Default — Regular \*/

.wex-type-title-default-regular {
font-family: var(--wex-type-title-default-font-family);
font-size: var(--wex-type-title-default-font-size);
font-weight: var(--wex-type-weight-regular);
font-style: var(--wex-type-style-normal);
line-height: var(--wex-type-title-default-line-height);
letter-spacing: var(--wex-type-title-default-letter-spacing);
}

.wex-type-title-default-regular-italic {
font-family: var(--wex-type-title-default-font-family);
font-size: var(--wex-type-title-default-font-size);
font-weight: var(--wex-type-weight-regular);
font-style: var(--wex-type-style-italic);
line-height: var(--wex-type-title-default-line-height);
letter-spacing: var(--wex-type-title-default-letter-spacing);
}

/\* Title Default — SemiBold \*/

.wex-type-title-default-semibold {
font-family: var(--wex-type-title-default-font-family);
font-size: var(--wex-type-title-default-font-size);
font-weight: var(--wex-type-weight-semibold);
font-style: var(--wex-type-style-normal);
line-height: var(--wex-type-title-default-line-height);
letter-spacing: var(--wex-type-title-default-letter-spacing);
}

.wex-type-title-default-semibold-italic {
font-family: var(--wex-type-title-default-font-family);
font-size: var(--wex-type-title-default-font-size);
font-weight: var(--wex-type-weight-semibold);
font-style: var(--wex-type-style-italic);
line-height: var(--wex-type-title-default-line-height);
letter-spacing: var(--wex-type-title-default-letter-spacing);
}

/\* Title Large — Light \*/

.wex-type-title-large-light {
font-family: var(--wex-type-title-large-font-family);
font-size: var(--wex-type-title-large-font-size);
font-weight: var(--wex-type-weight-light);
font-style: var(--wex-type-style-normal);
line-height: var(--wex-type-title-large-line-height);
letter-spacing: var(--wex-type-title-large-letter-spacing);
}

.wex-type-title-large-light-italic {
font-family: var(--wex-type-title-large-font-family);
font-size: var(--wex-type-title-large-font-size);
font-weight: var(--wex-type-weight-light);
font-style: var(--wex-type-style-italic);
line-height: var(--wex-type-title-large-line-height);
letter-spacing: var(--wex-type-title-large-letter-spacing);
}

/\* Title Large — Regular \*/

.wex-type-title-large-regular {
font-family: var(--wex-type-title-large-font-family);
font-size: var(--wex-type-title-large-font-size);
font-weight: var(--wex-type-weight-regular);
font-style: var(--wex-type-style-normal);
line-height: var(--wex-type-title-large-line-height);
letter-spacing: var(--wex-type-title-large-letter-spacing);
}

.wex-type-title-large-regular-italic {
font-family: var(--wex-type-title-large-font-family);
font-size: var(--wex-type-title-large-font-size);
font-weight: var(--wex-type-weight-regular);
font-style: var(--wex-type-style-italic);
line-height: var(--wex-type-title-large-line-height);
letter-spacing: var(--wex-type-title-large-letter-spacing);
}

/\* Title Large — SemiBold \*/

.wex-type-title-large-semibold {
font-family: var(--wex-type-title-large-font-family);
font-size: var(--wex-type-title-large-font-size);
font-weight: var(--wex-type-weight-semibold);
font-style: var(--wex-type-style-normal);
line-height: var(--wex-type-title-large-line-height);
letter-spacing: var(--wex-type-title-large-letter-spacing);
}

.wex-type-title-large-semibold-italic {
font-family: var(--wex-type-title-large-font-family);
font-size: var(--wex-type-title-large-font-size);
font-weight: var(--wex-type-weight-semibold);
font-style: var(--wex-type-style-italic);
line-height: var(--wex-type-title-large-line-height);
letter-spacing: var(--wex-type-title-large-letter-spacing);
}

/\* ============================================================

11\. SEMANTIC ALIASES

\============================================================

Optional semantic aliases.

These are useful when application code should not know

the exact underlying weight.

They can later be changed without changing consuming

components.

\============================================================ \*/

:root {

/\* Primary/default Heading selections \*/

\--wex-type-heading-small-primary-weight:

var(--wex-type-weight-regular);

\--wex-type-heading-default-primary-weight:

var(--wex-type-weight-regular);

\--wex-type-heading-large-primary-weight:

var(--wex-type-weight-regular);

/\* Primary/default Title selections \*/

\--wex-type-title-small-primary-weight:

var(--wex-type-weight-regular);

\--wex-type-title-default-primary-weight:

var(--wex-type-weight-regular);

\--wex-type-title-large-primary-weight:

var(--wex-type-weight-light);

}

/\* ============================================================

12\. OPTIONAL ELEMENT RESET

\============================================================

WEX typography styles should determine heading appearance,

rather than browser defaults.

\============================================================ \*/

h1,

h2,

h3,

h4,

h5,

h6 {

margin: 0;

font-family: inherit;

font-size: inherit;

font-weight: inherit;

line-height: inherit;

}

/* ============================================================

13. NAVIGATION TYPE SET

============================================================

Purpose:

Menus, labels and navigation-facing UI text.

Navigation shares the same Small / Default / Large size tiers
as Body, but uses SemiBold / 600 only.

Architecture:

Navigation
├── Small   → 14px / 20px
├── Default → 16px / 24px
└── Large   → 20px / 28px

Allowed weight:

SemiBold / 600 only.

Italic remains available as an emphasis modifier where required,
but Navigation does not expose Light or Regular weights.

Ecosystem pairing:

Navigation Small   pairs with Heading / Title / Body Small.
Navigation Default pairs with Heading / Title / Body Default.
Navigation Large   pairs with Heading / Title / Body Large.

============================================================ */

:root {

/* Navigation + Body shared size rhythm */

\--wex-type-shared-small-font-size:
var(--wex-type-size-14);

\--wex-type-shared-small-line-height:
var(--wex-type-line-height-20);

\--wex-type-shared-small-letter-spacing:
0.16px;

\--wex-type-shared-default-font-size:
var(--wex-type-size-16);

\--wex-type-shared-default-line-height:
var(--wex-type-line-height-24);

\--wex-type-shared-default-letter-spacing:
var(--wex-type-letter-spacing-default);

\--wex-type-shared-large-font-size:
var(--wex-type-size-20);

\--wex-type-shared-large-line-height:
var(--wex-type-line-height-28);

\--wex-type-shared-large-letter-spacing:
var(--wex-type-letter-spacing-default);

/* Navigation aliases */

\--wex-type-navigation-small-font-family:
var(--wex-type-family-sans);
\--wex-type-navigation-small-font-size:
var(--wex-type-shared-small-font-size);
\--wex-type-navigation-small-line-height:
var(--wex-type-shared-small-line-height);
\--wex-type-navigation-small-letter-spacing:
var(--wex-type-shared-small-letter-spacing);

\--wex-type-navigation-default-font-family:
var(--wex-type-family-sans);
\--wex-type-navigation-default-font-size:
var(--wex-type-shared-default-font-size);
\--wex-type-navigation-default-line-height:
var(--wex-type-shared-default-line-height);
\--wex-type-navigation-default-letter-spacing:
var(--wex-type-shared-default-letter-spacing);

\--wex-type-navigation-large-font-family:
var(--wex-type-family-sans);
\--wex-type-navigation-large-font-size:
var(--wex-type-shared-large-font-size);
\--wex-type-navigation-large-line-height:
var(--wex-type-shared-large-line-height);
\--wex-type-navigation-large-letter-spacing:
var(--wex-type-shared-large-letter-spacing);

}

.wex-type-navigation-small-semibold,
.wex-type-navigation-small-semibold-italic,
.wex-type-navigation-default-semibold,
.wex-type-navigation-default-semibold-italic,
.wex-type-navigation-large-semibold,
.wex-type-navigation-large-semibold-italic {
font-family: var(--wex-type-family-sans);
font-weight: var(--wex-type-weight-semibold);
}

.wex-type-navigation-small-semibold,
.wex-type-navigation-small-semibold-italic {
font-size: var(--wex-type-navigation-small-font-size);
line-height: var(--wex-type-navigation-small-line-height);
letter-spacing: var(--wex-type-navigation-small-letter-spacing);
}

.wex-type-navigation-default-semibold,
.wex-type-navigation-default-semibold-italic {
font-size: var(--wex-type-navigation-default-font-size);
line-height: var(--wex-type-navigation-default-line-height);
letter-spacing: var(--wex-type-navigation-default-letter-spacing);
}

.wex-type-navigation-large-semibold,
.wex-type-navigation-large-semibold-italic {
font-size: var(--wex-type-navigation-large-font-size);
line-height: var(--wex-type-navigation-large-line-height);
letter-spacing: var(--wex-type-navigation-large-letter-spacing);
}

.wex-type-navigation-small-semibold,
.wex-type-navigation-default-semibold,
.wex-type-navigation-large-semibold {
font-style: var(--wex-type-style-normal);
}

.wex-type-navigation-small-semibold-italic,
.wex-type-navigation-default-semibold-italic,
.wex-type-navigation-large-semibold-italic {
font-style: var(--wex-type-style-italic);
}


/* ============================================================

14. BODY TYPE SET

============================================================

Purpose:

Paragraphs and general reading text.

Body shares the same Small / Default / Large size tiers as
Navigation, but uses Light / 300 and Regular / 400 only.

Architecture:

Body
├── Small   → 14px / 20px
├── Default → 16px / 24px
└── Large   → 20px / 28px

Allowed weights:

Light / 300
Regular / 400

SemiBold / 600 is reserved for Navigation and should not be
compiled as a Body style.

Every allowed Body weight supports italic.

============================================================ */

:root {

\--wex-type-body-small-font-family:
var(--wex-type-family-sans);
\--wex-type-body-small-font-size:
var(--wex-type-shared-small-font-size);
\--wex-type-body-small-line-height:
var(--wex-type-shared-small-line-height);
\--wex-type-body-small-letter-spacing:
var(--wex-type-shared-small-letter-spacing);

\--wex-type-body-default-font-family:
var(--wex-type-family-sans);
\--wex-type-body-default-font-size:
var(--wex-type-shared-default-font-size);
\--wex-type-body-default-line-height:
var(--wex-type-shared-default-line-height);
\--wex-type-body-default-letter-spacing:
var(--wex-type-shared-default-letter-spacing);

\--wex-type-body-large-font-family:
var(--wex-type-family-sans);
\--wex-type-body-large-font-size:
var(--wex-type-shared-large-font-size);
\--wex-type-body-large-line-height:
var(--wex-type-shared-large-line-height);
\--wex-type-body-large-letter-spacing:
var(--wex-type-shared-large-letter-spacing);

}

.wex-type-body-small-light,
.wex-type-body-small-light-italic,
.wex-type-body-small-regular,
.wex-type-body-small-regular-italic,
.wex-type-body-default-light,
.wex-type-body-default-light-italic,
.wex-type-body-default-regular,
.wex-type-body-default-regular-italic,
.wex-type-body-large-light,
.wex-type-body-large-light-italic,
.wex-type-body-large-regular,
.wex-type-body-large-regular-italic {
font-family: var(--wex-type-family-sans);
}

.wex-type-body-small-light,
.wex-type-body-small-light-italic,
.wex-type-body-small-regular,
.wex-type-body-small-regular-italic {
font-size: var(--wex-type-body-small-font-size);
line-height: var(--wex-type-body-small-line-height);
letter-spacing: var(--wex-type-body-small-letter-spacing);
}

.wex-type-body-default-light,
.wex-type-body-default-light-italic,
.wex-type-body-default-regular,
.wex-type-body-default-regular-italic {
font-size: var(--wex-type-body-default-font-size);
line-height: var(--wex-type-body-default-line-height);
letter-spacing: var(--wex-type-body-default-letter-spacing);
}

.wex-type-body-large-light,
.wex-type-body-large-light-italic,
.wex-type-body-large-regular,
.wex-type-body-large-regular-italic {
font-size: var(--wex-type-body-large-font-size);
line-height: var(--wex-type-body-large-line-height);
letter-spacing: var(--wex-type-body-large-letter-spacing);
}

.wex-type-body-small-light,
.wex-type-body-default-light,
.wex-type-body-large-light,
.wex-type-body-small-light-italic,
.wex-type-body-default-light-italic,
.wex-type-body-large-light-italic {
font-weight: var(--wex-type-weight-light);
}

.wex-type-body-small-regular,
.wex-type-body-default-regular,
.wex-type-body-large-regular,
.wex-type-body-small-regular-italic,
.wex-type-body-default-regular-italic,
.wex-type-body-large-regular-italic {
font-weight: var(--wex-type-weight-regular);
}

.wex-type-body-small-light,
.wex-type-body-small-regular,
.wex-type-body-default-light,
.wex-type-body-default-regular,
.wex-type-body-large-light,
.wex-type-body-large-regular {
font-style: var(--wex-type-style-normal);
}

.wex-type-body-small-light-italic,
.wex-type-body-small-regular-italic,
.wex-type-body-default-light-italic,
.wex-type-body-default-regular-italic,
.wex-type-body-large-light-italic,
.wex-type-body-large-regular-italic {
font-style: var(--wex-type-style-italic);
}


/* ============================================================

15. ICON SIZE SYSTEM

============================================================

Icons are visual symbols used to represent ideas, objects or
actions. They communicate messages at a glance, afford
interactivity and draw attention to important information.

Typography pairing guidance:

16px icons are optimised to pair with 14px IBM Plex text.
20px icons are optimised to pair with 16px IBM Plex text.
24px and 32px icons are available when larger icons are needed.

Components typically use 16px icons. 20px, 24px and 32px icons
may also be used within the UI. Icon size should remain
consistent within the same design context.

============================================================ */

:root {

\--wex-icon-size-16: 1rem;
\--wex-icon-size-20: 1.25rem;
\--wex-icon-size-24: 1.5rem;
\--wex-icon-size-32: 2rem;

\--wex-icon-size-component-default:
var(--wex-icon-size-16);

}

/* ============================================================

16. NAVIGATION + BODY SEMANTIC ALIASES

============================================================ */

:root {

\--wex-type-navigation-small-primary-weight:
var(--wex-type-weight-semibold);
\--wex-type-navigation-default-primary-weight:
var(--wex-type-weight-semibold);
\--wex-type-navigation-large-primary-weight:
var(--wex-type-weight-semibold);

\--wex-type-body-small-primary-weight:
var(--wex-type-weight-regular);
\--wex-type-body-default-primary-weight:
var(--wex-type-weight-regular);
\--wex-type-body-large-primary-weight:
var(--wex-type-weight-regular);

}

# WEX Spacing Foundation

WEX uses a 4px-based spacing system with a 2px micro increment. Spacing is intentional and relational: it creates perceived relationships between elements, establishes hierarchy, and preserves white space so interfaces remain legible and calm.

## Spacing scale

| Token | px | rem | Intended role |
| --- | ---: | ---: | --- |
| `--wex-space-2` | 2px | 0.125rem | Micro adjustment |
| `--wex-space-4` | 4px | 0.25rem | Tight spacing |
| `--wex-space-8` | 8px | 0.5rem | Closely related elements |
| `--wex-space-12` | 12px | 0.75rem | Compact grouping |
| `--wex-space-16` | 16px | 1rem | Default spacing |
| `--wex-space-24` | 24px | 1.5rem | Group separation |
| `--wex-space-32` | 32px | 2rem | Section spacing |
| `--wex-space-40` | 40px | 2.5rem | Large separation |
| `--wex-space-48` | 48px | 3rem | Layout spacing |
| `--wex-space-64` | 64px | 4rem | Major separation |

Semantic spacing aliases are intentionally not frozen in v0.5. They should be defined later from real section, layout, and component patterns so token names reflect actual usage rather than abstract guesses.

## Designing with space

Every part of a UI should be intentional, including the empty space between elements. The amount of space between items creates relationships and hierarchy.

### Creating relationships

Elements that are near each other are perceived as meaningfully related. As more space is added between elements, their perceived relationship weakens.

Repeated spacing patterns also create relationships. Elements arranged with the same spacing pattern are perceived as related pieces with equal weight.

Space can define groups of associated information without requiring lines, borders, or other graphical dividers.

### Creating hierarchy

Elements with more surrounding space tend to be perceived as more important than elements with less surrounding space.

Higher-level headings and major content groups may receive more surrounding space to create focus and prominence. Subordinate content should generally receive less separation.

Elements placed too close together can be overlooked as individual items. Important content may require additional surrounding space so it can attract focus.

### White space

Empty space, or white space, is a functional part of the system. It can separate sections, create focus, and support information processing.

Individual areas of a UI may be dense when appropriate, but an entire page should not be uniformly crowded. Layouts should preserve enough white space for the eye to rest and for content groups to remain understandable.

## DesignMaster spacing contract

Typography tier and spacing relationship are independent decisions.

```text
Typography tier:
Small / Default / Large

Spacing relationship:
proximity / grouping / separation / hierarchy
```

The typography size-pairing rule remains strict across the WEX ecosystem, but spacing does not use a fixed one-to-one mapping such as Large = 32px. A Large typography composition can still use 4px, 8px, or 12px spacing between tightly related elements.

DesignMaster should select spacing according to the relationship between elements, using only values from the WEX spacing scale.

General rule:

```text
Less space  → stronger relationship
More space  → weaker relationship or stronger hierarchy
Repeated spacing → equal conceptual relationship
More surrounding space → greater visual prominence
```

DesignMaster must not invent arbitrary spacing values outside the WEX spacing scale unless a future WEX specification explicitly defines an exception.

/* ============================================================

17. WEX SPACING TOKENS

============================================================ */

:root {

--wex-space-2: 0.125rem;  /* 2px */
--wex-space-4: 0.25rem;   /* 4px */
--wex-space-8: 0.5rem;    /* 8px */
--wex-space-12: 0.75rem;  /* 12px */
--wex-space-16: 1rem;     /* 16px */
--wex-space-24: 1.5rem;   /* 24px */
--wex-space-32: 2rem;     /* 32px */
--wex-space-40: 2.5rem;   /* 40px */
--wex-space-48: 3rem;     /* 48px */
--wex-space-64: 4rem;     /* 64px */

}


# WEX Colour Foundation

WEX adopts Carbon Design System's neutral gray and blue colour families for its core UI palette. WEX intentionally keeps the theme model smaller than Carbon: one Light theme and one Dark theme.

Carbon's neutral gray family provides UI structure and layering. Carbon's core blue family is used for primary interaction. WEX follows the same principle: neutral colours build structure, blue communicates interaction, and additional support colours should be used only for meaningful status or feedback.

## Theme model

WEX uses two themes:

- **WEX Light** — based on Carbon White theme logic.
- **WEX Dark** — based on Carbon Gray 100 theme logic.

Semantic token names do not change between themes. Only their resolved values change.

## Colour composition rules

1. DesignMaster must use semantic WEX colour tokens and must not hard-code colour values in generated UI.
2. Neutral colours build structure, depth, text hierarchy and boundaries.
3. Blue communicates interaction: primary actions, links, focus and selected states.
4. Accent colours must not be introduced decoratively.
5. Layering communicates depth. Light layers alternate between White and Gray 10. Dark layers become progressively lighter from Gray 100 through Gray 70.
6. Pure black is available as a primitive but is not the default dark-theme background. Gray 100 is the standard WEX Dark base.

## Primitive neutral palette

```css
:root {
  --wex-color-white: #ffffff;
  --wex-color-gray-10: #f4f4f4;
  --wex-color-gray-20: #e0e0e0;
  --wex-color-gray-30: #c6c6c6;
  --wex-color-gray-40: #a8a8a8;
  --wex-color-gray-50: #8d8d8d;
  --wex-color-gray-60: #6f6f6f;
  --wex-color-gray-70: #525252;
  --wex-color-gray-80: #393939;
  --wex-color-gray-90: #262626;
  --wex-color-gray-100: #161616;
  --wex-color-black: #000000;
}
```

## Primitive blue palette

WEX uses Carbon's blue family without modification.

```css
:root {
  --wex-color-blue-10: #edf5ff;
  --wex-color-blue-20: #d0e2ff;
  --wex-color-blue-30: #a6c8ff;
  --wex-color-blue-40: #78a9ff;
  --wex-color-blue-50: #4589ff;
  --wex-color-blue-60: #0f62fe;
  --wex-color-blue-70: #0043ce;
  --wex-color-blue-80: #002d9c;
  --wex-color-blue-90: #001d6c;
  --wex-color-blue-100: #001141;
}
```

## Semantic colour contract

Components and generated layouts consume these role-based tokens rather than primitive palette values.

```css
:root,
[data-wex-theme="light"] {
  --wex-color-background: var(--wex-color-white);

  --wex-color-layer-01: var(--wex-color-gray-10);
  --wex-color-layer-02: var(--wex-color-white);
  --wex-color-layer-03: var(--wex-color-gray-10);

  --wex-color-text-primary: var(--wex-color-gray-100);
  --wex-color-text-secondary: var(--wex-color-gray-70);
  --wex-color-text-disabled: var(--wex-color-gray-30);
  --wex-color-text-inverse: var(--wex-color-white);

  --wex-color-icon-primary: var(--wex-color-gray-100);
  --wex-color-icon-secondary: var(--wex-color-gray-70);
  --wex-color-icon-disabled: var(--wex-color-gray-30);
  --wex-color-icon-inverse: var(--wex-color-white);

  --wex-color-border-subtle: var(--wex-color-gray-20);
  --wex-color-border-strong: var(--wex-color-gray-50);
  --wex-color-border-disabled: var(--wex-color-gray-20);

  --wex-color-interactive-primary: var(--wex-color-blue-60);
  --wex-color-interactive-hover: var(--wex-color-blue-70);
  --wex-color-interactive-active: var(--wex-color-blue-80);
  --wex-color-interactive-disabled: var(--wex-color-gray-30);

  --wex-color-link-primary: var(--wex-color-blue-60);
  --wex-color-link-hover: var(--wex-color-blue-70);

  --wex-color-focus: var(--wex-color-blue-60);
  --wex-color-focus-inverse: var(--wex-color-white);
}

[data-wex-theme="dark"] {
  --wex-color-background: var(--wex-color-gray-100);

  --wex-color-layer-01: var(--wex-color-gray-90);
  --wex-color-layer-02: var(--wex-color-gray-80);
  --wex-color-layer-03: var(--wex-color-gray-70);

  --wex-color-text-primary: var(--wex-color-gray-10);
  --wex-color-text-secondary: var(--wex-color-gray-30);
  --wex-color-text-disabled: var(--wex-color-gray-70);
  --wex-color-text-inverse: var(--wex-color-gray-100);

  --wex-color-icon-primary: var(--wex-color-gray-10);
  --wex-color-icon-secondary: var(--wex-color-gray-30);
  --wex-color-icon-disabled: var(--wex-color-gray-70);
  --wex-color-icon-inverse: var(--wex-color-gray-100);

  --wex-color-border-subtle: var(--wex-color-gray-70);
  --wex-color-border-strong: var(--wex-color-gray-50);
  --wex-color-border-disabled: var(--wex-color-gray-80);

  --wex-color-interactive-primary: var(--wex-color-blue-50);
  --wex-color-interactive-hover: var(--wex-color-blue-40);
  --wex-color-interactive-active: var(--wex-color-blue-60);
  --wex-color-interactive-disabled: var(--wex-color-gray-70);

  --wex-color-link-primary: var(--wex-color-blue-40);
  --wex-color-link-hover: var(--wex-color-blue-30);

  --wex-color-focus: var(--wex-color-blue-40);
  --wex-color-focus-inverse: var(--wex-color-gray-100);
}
```

## DesignMaster colour contract

```text
Do not generate:
background: #ffffff;
color: #161616;

Generate:
background: var(--wex-color-background);
color: var(--wex-color-text-primary);
```

DesignMaster selects a semantic role. The active WEX theme resolves the value.

```text
Neutral → structure
Blue    → interaction
Layer   → depth
Theme   → value resolution
```

Support/status colours such as error, warning, success and information remain intentionally outside this version and should be added as semantic roles when those UI contexts are defined.

# WEX Interaction Foundation

WEX adopts Carbon Design System's interaction logic while intentionally reducing the number of interaction tokens and component-specific exceptions. The goal is a compact, predictable state model that DesignMaster can resolve consistently across components.

## Universal interaction states

Interactive WEX components use the following core states:

- **Default** — resting state.
- **Hover** — pointer is positioned over the interactive target.
- **Active** — press, click or tap-down state.
- **Disabled** — unavailable and non-interactive.
- **Focus** — accessibility indicator applied independently of hover and active.

**Selected** is contextual rather than universal. It should only be exposed by components that represent a persistent choice, active destination, selected option or similar selectable state.

```text
DEFAULT
   ↓
HOVER
   ↓
ACTIVE

DISABLED = interaction removed
FOCUS = accessibility layer applied independently
SELECTED = contextual only
```

## Interaction rules

1. Hover should create a noticeable but restrained change.
2. Active should be stronger than hover.
3. Disabled components must not expose hover, active or focus interaction.
4. Focus is not a hover colour. It is an accessibility layer and must remain visually distinguishable from the component state beneath it.
5. Selected is not generated for every component. DesignMaster may select it only when the component's behavior includes persistent selection.
6. WEX uses existing palette steps instead of Carbon's additional half-step hover primitives. This keeps the colour system smaller.
7. Light interactive neutral surfaces move darker on hover and active.
8. Dark interactive neutral surfaces move lighter on hover and active.

## Primary blue interaction

WEX uses the existing Carbon blue primitives for primary interaction.

```text
Default  → Blue 60
Hover    → Blue 70
Active   → Blue 80
Disabled → neutral disabled treatment
```

## Interactive neutral surface

WEX exposes one semantic neutral interaction surface family rather than creating hover and selected tokens for every structural layer.

Light theme:

```text
Default  → Gray 10
Hover    → Gray 20
Active   → Gray 30
Selected → Gray 20
```

Dark theme:

```text
Default  → Gray 90
Hover    → Gray 80
Active   → Gray 70
Selected → Gray 80
```

Structural layer tokens remain structural. A non-interactive card or panel does not receive interactive surface states simply because it uses a layer colour.

## Text and icon emphasis on interaction

For interactive rows, menu items, selectable items and similar neutral controls, secondary content may elevate to primary emphasis on hover or selection.

```text
Default:
text-secondary
icon-secondary

Hover / Selected:
text-primary
icon-primary
```

## Focus

WEX uses a 2px focus treatment.

```css
:root {
  --wex-focus-width: 2px;
}
```

Theme mappings:

```text
Light → Blue 60
Dark  → White
```

The focus indicator is applied independently from Default, Hover, Active and Selected states.

## Interaction semantic tokens

```css
:root,
[data-wex-theme="light"] {
  --wex-color-interactive-primary: var(--wex-color-blue-60);
  --wex-color-interactive-hover: var(--wex-color-blue-70);
  --wex-color-interactive-active: var(--wex-color-blue-80);
  --wex-color-interactive-disabled: var(--wex-color-gray-30);

  --wex-color-surface-interactive: var(--wex-color-gray-10);
  --wex-color-surface-hover: var(--wex-color-gray-20);
  --wex-color-surface-active: var(--wex-color-gray-30);
  --wex-color-surface-selected: var(--wex-color-gray-20);

  --wex-color-focus: var(--wex-color-blue-60);
}

[data-wex-theme="dark"] {
  --wex-color-interactive-primary: var(--wex-color-blue-50);
  --wex-color-interactive-hover: var(--wex-color-blue-40);
  --wex-color-interactive-active: var(--wex-color-blue-60);
  --wex-color-interactive-disabled: var(--wex-color-gray-70);

  --wex-color-surface-interactive: var(--wex-color-gray-90);
  --wex-color-surface-hover: var(--wex-color-gray-80);
  --wex-color-surface-active: var(--wex-color-gray-70);
  --wex-color-surface-selected: var(--wex-color-gray-80);

  --wex-color-focus: var(--wex-color-white);
}
```

## DesignMaster interaction contract

DesignMaster selects a component state rather than inventing a new colour treatment.

```text
state:
default | hover | active | disabled | focus | selected
```

`selected` is valid only for selectable components. `focus` may coexist with a valid interactive state because it is an accessibility overlay.

---

# WEX Button Foundation

WEX buttons use the compact WEX interaction model and the existing Small / Default / Large ecosystem tiers. The button system intentionally exposes fewer variants and sizes than Carbon so that hierarchy remains clear and DesignMaster has a smaller decision space.

## Button variants

WEX defines four button variants:

- **Primary** — main action in an action context.
- **Secondary** — supporting or alternative action.
- **Ghost** — low-emphasis action without a persistent resting container.
- **Danger** — destructive or irreversible action.

WEX does not define a separate Tertiary button variant. Lower-emphasis actions should use Ghost unless a future component specification defines another need.

## Button hierarchy rules

1. Use one Primary button per action context.
2. Supporting actions should be Secondary or Ghost.
3. Danger is used only for destructive or irreversible actions.
4. Avoid multiple equal-emphasis Primary actions in the same action group.
5. Button groups should remain small and focused. Prefer two or three related actions rather than large collections of equal-weight buttons.

Recommended combinations:

```text
Primary + Secondary
Primary + Ghost
Primary + Danger
```

Avoid:

```text
Primary + Primary
many equal-emphasis actions
```

## Button size architecture

Buttons follow the same WEX ecosystem tier as typography.

| Button tier | Typography | Icon pairing |
| --- | --- | --- |
| Small | Navigation Small — 14px / 20px / 600 | 16px icon |
| Default | Navigation Default — 16px / 24px / 600 | 20px icon |
| Large | Navigation Large — 20px / 28px / 600 | 24px icon |

The ecosystem size-pairing rule applies to buttons:

```text
Small composition   → Small button
Default composition → Default button
Large composition   → Large button
```

DesignMaster must not automatically mix button tiers within the same action group. Any future exception must be defined explicitly by WEX.

## Button anatomy

```text
Button
├── Label
├── Container
└── Icon (optional)
```

Default WEX button anatomy uses a text label and may include an optional icon. Text + icon buttons should preserve a consistent icon size for their WEX tier. Icon-only buttons are treated as a separate component context and should center the icon.

## Button content guidance

Use clear action-oriented labels. Prefer concise verb-led language such as:

```text
Save changes
Create project
Delete item
```

Avoid vague labels that name an object without clearly communicating the action.

## Button state architecture

Every WEX button variant uses the same state model:

```text
Default
Hover
Active
Disabled
Focus
```

Selected is not part of the Button state model.

## Primary button

Primary is the highest-emphasis action and uses the WEX blue interaction family.

```text
Light:
Default  → Blue 60
Hover    → Blue 70
Active   → Blue 80
Disabled → Gray 30
Label    → White

Dark:
Default  → Blue 50
Hover    → Blue 40
Active   → Blue 60
Disabled → Gray 70
Label    → Gray 100 / dark inverse text
```

Primary button focus uses the global WEX focus treatment rather than introducing a button-specific focus colour.

## Secondary button

Secondary uses a neutral high-emphasis treatment so that Primary remains visually dominant. Secondary should not introduce another competing blue fill.

The exact component-level border/fill implementation may be refined when WEX component geometry is defined, but it must use existing WEX semantic colour roles and the universal interaction direction:

```text
Light neutral interaction → darker on Hover / Active
Dark neutral interaction  → lighter on Hover / Active
```

## Ghost button

Ghost has no persistent resting container. Hover and Active use the semantic interactive neutral surface tokens.

```text
Default → transparent / no persistent fill
Hover   → surface-hover
Active  → surface-active
```

Text and icon colour remain semantic and theme-resolved.

## Danger button

Danger is reserved for destructive actions. Its state architecture is defined now, but its exact colour values remain intentionally unresolved until WEX adds the Carbon red/support palette.

DesignMaster must not approximate Danger using arbitrary red values. Until the destructive palette is formally added, Danger is a defined semantic variant with unresolved colour primitives.

## Button token contract

Button components should consume semantic roles rather than primitives.

```text
variant:
primary | secondary | ghost | danger

size:
small | default | large

state:
default | hover | active | disabled | focus
```

Example DesignMaster selection:

```json
{
  "component": "button",
  "variant": "primary",
  "size": "default",
  "state": "default",
  "icon": true
}
```

DesignMaster resolves this selection through WEX typography, icon, spacing, colour and interaction tokens. It must not invent font sizes, icon sizes, spacing values or raw colours.



# WEX Global 3-Tier System

Small / Default / Large is a global WEX sizing contract. It describes the scale of an entire design context, not only an isolated typography or component size.

## Global size architecture

Every scalable WEX object should support exactly three tiers where size variants are applicable:

```text
Small
Default
Large
```

The same tier should transfer through a composition so related elements remain proportionally and hierarchically aligned.

```text
Small ecosystem
→ Heading Small
→ Title Small
→ Navigation Small
→ Body Small
→ Button Small
→ Component Small
→ Small-tier icon treatment

Default ecosystem
→ Heading Default
→ Title Default
→ Navigation Default
→ Body Default
→ Button Default
→ Component Default
→ Default-tier icon treatment

Large ecosystem
→ Heading Large
→ Title Large
→ Navigation Large
→ Body Large
→ Button Large
→ Component Large
→ Large-tier icon treatment
```

## Global tier inheritance

1. Every scalable WEX object uses Small / Default / Large.
2. A parent component, pattern, section, or composition establishes its tier.
3. Child elements inherit that tier by default.
4. Do not mix tiers inside the same component or composition.
5. A tier mismatch is allowed only when an explicit WEX component specification defines the exception.
6. Size tier controls relationships and hierarchy; it does not imply arbitrary mathematical scaling.
7. Each component defines what Small / Default / Large means for its own measurements while preserving the shared ecosystem tier.

## Component transfer rule

A component tier transfers to its internal WEX choices unless the component specification says otherwise.

```text
Component Small
→ Title Small
→ Body Small
→ Navigation Small
→ Button Small
→ Small-tier icon treatment

Component Default
→ Title Default
→ Body Default
→ Navigation Default
→ Button Default
→ Default-tier icon treatment

Component Large
→ Title Large
→ Body Large
→ Navigation Large
→ Button Large
→ Large-tier icon treatment
```

Incorrect by default:

```text
Component Large + Title Large + Body Small
Component Large + Button Default
Component Small + Navigation Large
```

## DesignMaster tier contract

DesignMaster should make a tier decision at the composition or parent-component level and propagate that choice downward.

Example decision:

```json
{
  "tier": "large"
}
```

The agent should then resolve child styles and component variants from the Large WEX tier instead of choosing unrelated sizes independently.

DesignMaster must not invent additional size labels such as `compact`, `medium`, `xl`, or `jumbo` unless a future WEX specification explicitly introduces a non-tier dimension for a specific purpose.

Spacing remains relational and does not automatically inherit a fixed numeric value from the tier. A Large component may still use small spacing values between tightly related elements when that relationship calls for it.



# WEX Layout + Grid Foundation

WEX uses a recursive layout system. The outer frame decides how much space is available to its direct children. Each child then owns the separation and allocation of its own internal space. This continues through nested containers down to the final element.

The layout system is structural only. It does not define colour.

## Prime layout rules

These rules apply before any component-specific layout decision.

```text
1. Every WEX element has min-width: 0.

2. The parent owns space allocation for its direct children.

3. The parent owns separation between its direct children.

4. Separation is created with gap and padding, not margins.

5. A child must stay inside the space allocated by its parent.

6. A child may become a layout parent for its own contents.

7. The same ownership model repeats recursively down to the final element.
```

This creates one predictable chain:

```text
Page frame
→ decides page width + page padding + major regions

Major region
→ receives its allocation
→ decides its own inner grid / gap / padding

Component
→ receives its allocation
→ decides its own inner separation

Subcomponent
→ receives its allocation
→ decides its own inner separation

Element
→ fits the allocation it receives
→ min-width: 0
```

No child should create external separation by pushing against siblings with margins. If two elements need space between them, their parent owns that spacing.

## Margin rule

Margins are not part of the WEX layout system.

```text
Do not use margin for:
- sibling separation
- component spacing
- section spacing
- page centering
- grid alignment
- responsive spacing
```

Use instead:

```text
gap     → separation between children
padding → separation inside a container
width / max-width → allocation limits
parent grid/flex alignment → positioning and centering
```

A base WEX implementation should remove default margins and allow the parent layout to control spacing.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  min-width: 0;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
ol,
dl,
figure,
blockquote {
  margin: 0;
}
```

## Main page frame

The WEX page frame establishes the first space allocation decision.

```text
WEX Page Frame
├── Header
├── Main
│   └── Main Layout Grid
└── Footer
```

The page frame owns:

```text
- available content width
- outer page padding
- main grid alignment
- major region allocation
- responsive width band
```

The page frame does not decide the internal spacing of every descendant. Once a region receives its space, that region becomes responsible for its own internal allocation.

## Main grid

The primary WEX page grid uses twelve equal columns.

```text
Columns: 12
Grid gap: 8px
Minimum child width: 0px
Page alignment: centred by parent layout
```

The 12-column grid is the allocation framework. A region receives a span and then independently manages its internal contents.

Examples:

```text
12           → full width
8 + 4        → primary + secondary
6 + 6        → equal split
4 + 4 + 4    → three equal regions
3 + 3 + 3 + 3 → four equal regions
```

Grid and flex children must use `min-width: 0` so content can shrink inside its allocated track instead of forcing the page wider than the viewport.

## Four responsive layout bands

WEX uses four main page-width bands.

| Layout band | Viewport | Main frame behaviour |
| --- | --- | --- |
| **Wide Desktop** | `> 1440px` | Main content is capped at **1440px** and centred by the outer frame |
| **Laptop** | `1025px–1440px` | Main content is capped at **1200px**; intended for smaller desktop/laptop screens |
| **Compact / Tablet** | `768px–1024px` | Main content becomes fluid within the viewport; regions reallocate their column spans as needed |
| **Mobile** | `0px–767px` | Main content is fully fluid; parent regions may stack and allocate full-width spans |

The significant thresholds are therefore:

```text
1440px
1024px
767px
0px minimum
```

`0px` is not merely a viewport endpoint. It also reflects the WEX prime sizing rule: any layout participant must be allowed to shrink to `min-width: 0` unless a future WEX specification defines a true intrinsic minimum.

## Why the 1200px laptop frame exists

The 1200px ceiling below 1440px is intentional.

```text
Large desktop
viewport > 1440
→ content max 1440

Smaller desktop / laptop
viewport <= 1440 and > 1024
→ content max 1200
```

This prevents the main layout from feeling stretched on smaller laptops and creates usable breathing room around the page while retaining the full 12-column structure.

WEX uses **1200px**, not 1280px, for this band because the smaller ceiling provides a clearer compact-laptop state and leaves more room for the viewport around the main frame.

## Layout tokens

```css
:root {
  --wex-layout-columns: 12;
  --wex-layout-grid-gap: var(--wex-space-8);

  --wex-layout-max-wide: 90rem;       /* 1440px */
  --wex-layout-max-laptop: 75rem;     /* 1200px */

  --wex-layout-page-padding: var(--wex-space-24);
  --wex-layout-page-padding-compact: var(--wex-space-16);
}
```

## Margin-free page implementation

The page is centred by its parent rather than by `margin-inline: auto`.

```css
.wex-page-frame {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  justify-items: center;
  width: 100%;
  min-width: 0;
}

.wex-layout {
  display: grid;
  grid-template-columns: repeat(var(--wex-layout-columns), minmax(0, 1fr));
  gap: var(--wex-layout-grid-gap);

  width: 100%;
  max-width: var(--wex-layout-max-wide);
  min-width: 0;
  padding-inline: var(--wex-layout-page-padding);
}

@media (max-width: 1440px) {
  .wex-layout {
    max-width: var(--wex-layout-max-laptop);
  }
}

@media (max-width: 1024px) {
  .wex-layout {
    max-width: 100%;
  }
}

@media (max-width: 767px) {
  .wex-layout {
    max-width: 100%;
    padding-inline: var(--wex-layout-page-padding-compact);
  }
}
```

## Recursive allocation model

Every WEX container follows the same rule.

```text
Parent decides:
- how much width the child receives
- where the child sits
- gap between sibling children
- padding between its boundary and its children

Child decides:
- how its received space is divided internally
- its own grid/flex structure
- its own internal gap
- its own internal padding
```

Example:

```text
Page frame
12-column main grid
│
├── Main content: 8 columns
│   │
│   └── Card group
│       parent owns card-to-card gap
│       │
│       └── Card
│           parent owns card padding
│           │
│           ├── Card heading
│           └── Card body
│
└── Secondary region: 4 columns
    │
    └── Region owns its own internal allocation
```

The page does not reach down and assign every internal gap. Ownership transfers inward one level at a time.

## Responsive reallocation

Breakpoints change available space, not the WEX Small / Default / Large design tier.

```text
Viewport changes
→ parent receives different available width
→ parent may reallocate child spans
→ child receives new allocation
→ child resolves its own internal layout
```

For example:

```text
Wide / Laptop
8 columns + 4 columns

Compact
7 columns + 5 columns
or
12 columns + 12 columns
when the content requires stacking

Mobile
12 columns
12 columns
```

The exact reallocation belongs to the parent whose children no longer fit. The outer page frame should not dictate arbitrary internal component layouts.

## Breakpoint ownership

WEX global page bands are:

```text
> 1440
1025–1440
768–1024
0–767
```

A nested component may respond to the actual width it receives, but it must not invent a new global page breakpoint simply to achieve a visual preference.

Local responsive behaviour should be driven by the component's allocated space and intrinsic content needs.

## Relationship to the WEX global tier system

Responsive layout and WEX tier remain separate systems.

```text
Responsive layout
→ how much space is available
→ how that space is allocated

WEX tier
→ Small / Default / Large
→ the intended scale of the design/component ecosystem
```

A 1024px viewport does not automatically convert a Large WEX composition to Default. A 767px viewport does not automatically convert Default to Small.

The tier changes only when the design specification explicitly chooses a different tier.

## DesignMaster layout contract

DesignMaster should resolve layout from outside to inside.

```text
1. Determine viewport layout band.

2. Establish the main page frame.

3. Apply the page width ceiling for that band.

4. Establish the 12-column grid.

5. Allocate major regions to grid spans.

6. For each region:
   let that region decide its own internal allocation.

7. Continue recursively through containers and components.

8. Use gap for sibling separation.

9. Use padding for internal boundary separation.

10. Keep every element min-width: 0.

11. Do not use margin to create layout spacing.
```

DesignMaster must not:

```text
- invent arbitrary page widths
- exceed 1440px main content width on wide screens
- keep 1440px content width on smaller laptops
- invent a different global column count
- invent arbitrary global breakpoints
- use margins to create sibling or section separation
- allow children to force their parent wider than the allocated space
- omit min-width: 0 from layout participants
- let an outer container dictate unnecessary deep descendant spacing
- confuse viewport bands with Small / Default / Large tiers
- import Admin Station colour or presentation rules into layout
```

The governing principle is:

```text
OUTER DECIDES ALLOCATION.
INNER DECIDES ITS OWN SEPARATION.
SPACE OWNERSHIP MOVES INWARD ONE LEVEL AT A TIME.
MIN-WIDTH IS 0.
MARGINS DO NOT CONTROL WEX LAYOUT.
```


# WEX Composition Authority Contract

WEX is the visual and structural authority for generated UI. A consuming application, schema, domain adapter, or agent may describe what a component is and what it contains, but it must not redefine WEX presentation values.

This contract is designed to work with the companion document:

```text
DesignMaster UI Composition Architecture
```

The two documents have separate responsibilities:

```text
Domain / application
→ identity, data, permissions, validation, commands

Composition definition
→ component type, tier, content, state, allowed structural variant

WEX
→ typography, colour, spacing, sizing, interaction, layout, responsive behaviour
```

## Definition-versus-presentation rule

A component definition may specify semantic structure such as:

```json
{
  "type": "overview",
  "id": "CZC12345",
  "tier": "default",
  "variant": "two-column",
  "fields": [],
  "actions": []
}
```

A component definition must not specify presentation primitives such as:

```json
{
  "fontSize": "15px",
  "color": "#161616",
  "background": "#ffffff",
  "gap": "13px",
  "padding": "22px",
  "marginTop": "17px",
  "width": "487px",
  "breakpoint": "930px",
  "borderRadius": "7px"
}
```

Those decisions belong to WEX or to a registered WEX component specification.

## Global component tier rule

Every scalable shared component uses the WEX global tier system:

```text
Small
Default
Large
```

Do not introduce parallel density or size systems such as:

```text
compact
dense
comfortable
medium
wide-as-size
```

A structural variant is allowed only when it changes real composition or interaction rather than visual scale.

```text
Allowed structural variants:
two-column
stacked
selectable
editable

Not allowed as alternate size languages:
compact
dense
comfortable
```

## Recursive component layout rule

The recursive WEX layout rule applies inside shared components exactly as it applies to pages.

```text
Outer component
→ allocates space to direct children

Child container
→ receives that allocation
→ decides its own internal allocation and separation

Continue inward
→ until the final element
```

No definition may reach through multiple levels and hard-code descendant spacing or widths.

## Prime component layout constraints

Every WEX layout participant and shared component must obey:

```css
min-width: 0;
margin: 0;
```

`margin: 0` here expresses the WEX layout rule: margins do not create component or page separation.

Use:

```text
Parent gap
→ sibling separation

Parent padding
→ boundary-to-child separation

Grid / flex allocation
→ width and alignment
```

Do not use margins as a spacing API between WEX components.

## Hardcoding prohibition

DesignMaster must not hard-code visual values when a WEX primitive, semantic token, tier, component rule, grid rule, or spacing value already governs that decision.

DesignMaster must not generate:

```text
raw hex / rgb / hsl colours
arbitrary font sizes or line heights
arbitrary spacing values
layout margins
arbitrary component widths
arbitrary global breakpoints
unregistered size names
unregistered interaction colours
independent component CSS copies for each domain record type
```

DesignMaster should instead resolve:

```text
colour      → WEX semantic colour token
typography  → WEX type style
tier        → Small / Default / Large
spacing     → WEX spacing scale + relationship rule
layout      → parent allocation + 12-column / recursive layout contract
state       → WEX interaction state
button      → registered WEX button variant + tier
component   → registered shared component type
```

## Shared component authority

A domain name does not create a new visual component.

```text
ServiceOverview
CategoryOverview
SupplierOverview
```

should normally resolve to the same registered presentation type:

```text
moduleOverview
```

The domain owns what the record means. The shared component owns how that class of information is presented.

A new shared component type should be created only when the interaction structure is genuinely different and cannot be represented by an existing registered component type or a controlled structural variant.

## DesignMaster component resolution order

When building a component, DesignMaster should resolve decisions in this order:

```text
1. Identify domain intent and record identity.
2. Select an existing registered shared component type.
3. Select WEX tier: Small / Default / Large.
4. Select only an allowed structural variant when required.
5. Map authoritative data into the component definition.
6. Apply permissions, state and semantic actions.
7. Let the WEX component own presentation and direct-child layout.
8. Recurse inward using the same allocation rule.
9. Use WEX tokens and registered rules only.
10. Create a new component type only when interaction structure is genuinely new.
```

The governing composition principle is:

```text
DEFINITION SAYS WHAT.
DOMAIN SAYS WHAT IS ALLOWED.
WEX SAYS HOW.
DESIGNMASTER COMPOSES; IT DOES NOT INVENT VISUAL VALUES.
```


/* ============================================================

END — WEX Typography + Icons + Spacing + Colour + Interaction + Buttons + Global Tier + Recursive Layout + Composition Contract v1.1

============================================================ */
