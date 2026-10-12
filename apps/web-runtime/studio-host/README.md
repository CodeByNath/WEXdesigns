# QSD Studio host assets

Phase 1A supplies only the existing WEX Admin Dashboard shell as a portable,
relative-URL asset bundle. It mounts into QSD's host-owned
`#qsd-studio-host` element and contains the Header, Sidebar, empty Main, and
empty Footer. It does not call QSD APIs, read or write storage, initialise an
identity space, create IDs, or connect business data.

## Build and install

From the repository root, build the release assets:

```sh
pnpm --filter @weerax/web-runtime build:studio-host
```

The resulting `apps/web-runtime/studio-host-dist/` directory contains a
versioned `manifest.json` and its relative `assets/` files. Copy the contents
of that directory (not the directory itself) into QSD's plugin-local
`wp-content/plugins/qsd-platform/studio-assets/` directory, replacing an
earlier WEX asset set as one release operation. Keep every path in the
manifest unchanged and copy the complete `assets/` directory alongside it.

The manifest has QSD's required shape:

```json
{ "entry": "assets/wex-studio-host-<hash>.js", "styles": ["assets/<hash>.css"], "version": "0.0.0" }
```

`StudioAssetGateway` resolves these paths only relative to `studio-assets/`
and enqueues them on QSD's authorised `/studio/` route. The bundle does not
depend on a GitHub Pages base path.

The `version` defaults to `0.0.0`, the current package release label. A
release process may supply a different label with
`WEX_STUDIO_ASSET_VERSION=<label>` when building; the filename hashes still
identify the exact emitted assets.

## Phase boundary

Identity integration is deferred. QSD's current single JSON-blob endpoint is
not an approved WEX identity storage adapter because it does not provide the
required atomic lifecycle operations. Do not add client-side read/modify/write
behaviour, call QSD storage endpoints, or trigger QSD storage initialization
from this bundle.

`fixture.html` and `error-fixture.html` are local browser fixtures for the
successful mount and missing-host-mount states. They are not QSD deployment
files.
