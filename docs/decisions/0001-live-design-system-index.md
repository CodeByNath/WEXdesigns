# 0001: Live Design System Index

## Status

Accepted

## Decision

Create a live WEX index in the web-runtime application before beginning shared component implementation.

The index has three main categories:

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

The index renders current WEX foundations and marks Pictograms and Motion as unresolved. It must not invent missing assets, motion values, or component presentation.

Guidelines owns readable system rules. Components is an empty registry until component work is separately authorized.

## Boundary

The index is application composition, not a shared component package. `@weerax/ui` remains component-empty. Reusable component code may enter that package only through the approved component workflow.

## Deployment

The web runtime is built with Vite and deployed from `main` through GitHub Pages after type-checking and focused tests.
