# QSD Studio host assets

Phase 1A originally supplied the portable shell with empty Main and Footer.
The current WEX-owned bundle also mounts the standalone Services preview and
Owner-directed Drawer presentation, including combo activity tabs. It mounts
into the host-owned `#qsd-studio-host` element. It does not call QSD APIs, read
or write business records, initialise an identity space, create IDs, or connect
business data. Product copy and the Combo flag remain local preview fixtures.

Current source, release evidence and boundaries are indexed in the
[Drawer product preview Code Map](../../../docs/code-map/admin-drawer-product-preview.md).

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

## Logo and primary-action input boundary

Before loading the WEX entry, the host may assign one serializable object to
`globalThis.wexStudioHostOptions`. Its approved shape is the closed Logo and
Header primary-action property bindings and their already-resolved source
values:

```js
globalThis.wexStudioHostOptions = {
  logoImageBinding: { source: 'profile.logo', target: 'imageUrl' },
  primaryActionIcon: 'primary',
  primaryActionImageBinding: { source: 'profile.primary-action-image', target: 'imageUrl' },
  sourceValues: {
    'profile.logo': 'https://media.example/logo.svg',
    'profile.primary-action-image': 'https://media.example/action.svg',
  },
};
```

This is a one-time bundle-initialisation value, not a connector, event bus,
host API, identity protocol, or data-loading mechanism. The host retains all
record lookup and authorisation. The bundle accepts only safe HTTPS image URLs.
An absent, invalid, or unsafe Logo value keeps the label-only Logo fallback;
an absent, invalid, or unsafe primary-action image keeps its built-in plus icon.

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

`fixture.html` configures the approved Logo and primary-action inputs and
demonstrates the image paths; `error-fixture.html` covers the missing-host-mount
state. They are local browser fixtures, not QSD deployment files.

## Previewing source and a published release

The local development fixture is `/WEXdesigns/studio-host/fixture.html` on the
Vite server (port 5174 in the current session). Open Add new → Add New → See all
product sections to reach Full Presentation. The default fixture is Combo;
select Description, Snapshot, Meeting, Itinerary, Info or FAQ / Booking to inspect
the two activity tabs. Single rendering is verified with explicit non-combo test
inputs; no product-type editor or preview switch has been added.

The fixture HTML is not a deployed Pages route. The published `/admin-station/`
catalogue route is also distinct from the portable Studio host entry and is not
proof of that entry's Drawer behavior. To inspect an exact published bundle, a
local preview wrapper can supply `#qsd-studio-host` and load the selected immutable
manifest's `styles` and module `entry` from its release directory. Use the existing
release/pointer tooling to verify the selected manifest and assets first. Such a
wrapper is a local inspection aid, not a QSD deployment or a new host contract.
The 2026-11-20 browser inspection used a temporary wrapper for pointer 422;
its localhost address and process are session-specific, not durable release URLs.
