# `@weerax/wex`

Canonical presentation authority for WeeraX Studios.

`src/source/WEX-SOURCE.md` preserves the supplied WEX v1.1 authority byte-for-byte. The files under `src/foundations/` organize its implementable CSS declarations. Accepted system-level extensions are recorded in `docs/decisions/` and implemented here without modifying the historical source artifact.

Button geometry and other decisions explicitly left unresolved remain unresolved here. Extending WEX requires an approved system-level decision; consumers must not fill gaps with local visual values.

Import the foundation bundle with:

```css
@import "@weerax/wex";
```
