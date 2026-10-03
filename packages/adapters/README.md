# `@weerax/adapters`

Framework-neutral boundary for WEX storage and future domain ownership adapters.

Adapters may depend on `@weerax/schemas`. They must not depend on React, Preact,
UI components, WEX presentation, DOM APIs, or application shells.

The local-folder WEX Identity reference adapter persists only supplied
registration and allocation records under one configured WEX identity-space
directory. It does not issue IDs, decide lifecycle semantics, resolve domain
data, or implement Plugin + Tool initialization.
