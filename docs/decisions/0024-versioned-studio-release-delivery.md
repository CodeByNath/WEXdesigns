# 0024: Versioned Studio Release Delivery

## Status

Proposed — authorised Phase 2B candidate; requires independent review.

## Decision

WEX retains each approved Studio runtime under
`/studio-releases/wex-studio-v1-<full-source-sha>/` on its existing GitHub
Pages origin. The release directory contains its relative Vite assets and a
`wex-studio-host@1` manifest naming the entry/styles, source SHA, release ID,
and SHA-384 digest for every delivered file. The manifest digest is selected
explicitly by the consumer lock; filenames are not authority.

The producer builds from a clean committed SHA, verifies final emitted bytes,
then creates the directory once. Existing release directories must verify
byte-for-byte and cannot be overwritten; the Pages workflow enforces that
guard and retains prior directories for rollback. Pages is `main`-only, so a
topic candidate is locally verified and is not an approved host release until
promotion.

The consumer contract remains `#qsd-studio-host` plus the existing one-time,
serializable Logo host options. QSD selects a reviewed release ID, manifest URL
and manifest digest; it must fail closed for an unsupported contract or digest
failure. WEX does not receive QSD data, credentials, storage or identity.

## Consequences

QSD must separately add lock, digest/SRI, CSP and staging-promotion handling.
GitHub Pages currently gives a finite cache lifetime, not an `immutable`
response directive; immutable identity comes from the retained path and
no-overwrite guard. Post-promotion browser evidence must still prove asset
MIME, CORS, CSS/font delivery and the fixed Logo in authenticated QSD staging.
