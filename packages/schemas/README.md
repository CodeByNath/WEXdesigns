# `@weerax/schemas`

Framework-neutral, serializable runtime and TypeScript contracts for WeeraX Studios.

This foundation exposes only serializable identity, semantic action, and WEX tier
primitives required by the architecture. Portable WEX Identity records validate
WEX-owned platform registration, initialization state, allocation lifecycle evidence,
and allocation lookup keys; they do not issue IDs, persist data, resolve domain
references, or implement storage adapters. The WEX Form configuration contract
(`wex-form-configuration@1`, ADR 0039) defines the configuration, receipt and the
host storage adapter interface; hosts implement the adapter. It has no React, Vite, DOM, CSS,
adapter, or UI dependency.
