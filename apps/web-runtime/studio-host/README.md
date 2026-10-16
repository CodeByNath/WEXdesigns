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

This command rebuilds the Schema and Shared UI workspace dependencies before
Vite packages the host entry. Do not invoke Vite's Studio configuration alone:
that can package stale workspace output and omit an already-approved Logo
rendering branch.

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

## Logo input boundary

Before loading the WEX entry, the host may assign one serializable object to
`globalThis.wexStudioHostOptions`. Its only currently approved shape is the
closed Logo property binding and its already-resolved source values:

```js
globalThis.wexStudioHostOptions = {
  logoImageBinding: { source: 'profile.logo', target: 'imageUrl' },
  sourceValues: { 'profile.logo': 'https://media.example/logo.svg' },
};
```

This is a one-time bundle-initialisation value, not a connector, event bus,
host API, identity protocol, or data-loading mechanism. The host retains all
record lookup and authorisation. The bundle accepts only a safe HTTPS URL; an
absent, invalid, or unsafe value keeps the label-only Logo fallback.

The `version` defaults to `0.0.0`, the current package release label. A
release process may supply a different label with
`WEX_STUDIO_ASSET_VERSION=<label>` when building; the filename hashes still
identify the exact emitted assets.

## Versioned Pages releases

The WEX producer creates a retained release with:

```sh
pnpm --filter @weerax/web-runtime build:studio-release
```

Each release is a complete, relative asset directory at
`/WEXdesigns/studio-releases/wex-studio-v1-<full-source-sha>/`. Its manifest
uses `wex-studio-host@1` and lists SHA-384 digests for every JS, CSS and font
file. A consumer must pin the release ID and manifest digest; it must not load
`main`, `latest`, or a mutable host directory. A retained release is created
only once and validates exactly on repeat builds, preserving explicit rollback.

The existing plugin-local installation above remains the historical QSD host
path until QSD separately accepts and implements its release lock/loader.

## Phase boundary

Identity integration is deferred. QSD's current single JSON-blob endpoint is
not an approved WEX identity storage adapter because it does not provide the
required atomic lifecycle operations. Do not add client-side read/modify/write
behaviour, call QSD storage endpoints, or trigger QSD storage initialization
from this bundle.

`fixture.html` configures the approved Logo input and demonstrates the
successful image mount; `error-fixture.html` covers the missing-host-mount
state. They are local browser fixtures, not QSD deployment files.
