# `@weerax/catalogue`

File-backed source structure for the WEX design system index.

```text
content/
├── elements/
│   ├── grid-theory/
│   ├── color/
│   ├── icons/
│   ├── pictograms/
│   ├── motion/
│   ├── spacing/
│   ├── themes/
│   └── typography/
├── guidelines/
└── components/
```

This package owns catalogue content organization, not presentation. The web runtime owns the header, content frame, footer, and future rendering integration. WEX owns presentation rules. Shared component implementation remains in `@weerax/ui` after approval.

The entry file format is intentionally unresolved. A serializable content contract must be agreed before content files are added; this package must not invent a local schema.
