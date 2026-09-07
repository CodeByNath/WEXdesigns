# WEX Design System Index

The web runtime is the live presentation shell for the WEX design system.

The frontend owns only the header, content frame, footer, theme selection, and future rendering integration. It does not hardcode the catalogue information architecture or its entries.

`@weerax/catalogue` owns the file-backed Elements, Guidelines, and Components structure. This application composes the canonical `@weerax/wex` source directly and keeps `@weerax/ui` empty until a separately approved component phase.

GitHub Pages deploys the built index from `main` after type-checking and focused tests pass.
