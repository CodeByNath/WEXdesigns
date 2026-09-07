# 0001: Live Design System Index

## Status

Accepted

## Decision

Create a live WEX index shell in the web-runtime application before beginning shared component implementation.

The file-backed catalogue has three main categories:

```text
Elements
Guidelines
Components
```

Elements contains the approved information architecture:

```text
Grid / Theory
Color
Icons
Pictograms
Motion
Spacing
Themes
Typography
```

The category structure belongs to `@weerax/catalogue`, not to hardcoded frontend navigation. Entry formats remain unresolved until a serializable content contract is approved.

The live frontend contains only the WEX header, an empty content frame, the footer, and theme mechanics. Future renderers will populate the frame from registered catalogue entries.

## Boundary

The index shell is application composition, not a shared component package. `@weerax/catalogue` owns content organization. `@weerax/ui` remains component-empty. Reusable component code may enter that package only through the approved component workflow.

## Deployment

The web runtime is built with Vite and deployed from `main` through GitHub Pages after type-checking and focused tests.
