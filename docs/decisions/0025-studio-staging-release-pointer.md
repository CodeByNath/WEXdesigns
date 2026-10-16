# 0025: Studio Staging Release Pointer

## Status

Proposed — authorised Phase 2E candidate; requires independent review.

## Context

ADR 0024 retains each Studio runtime as an immutable, digest-inventoried
directory. A consumer that pins a release in code needs a code deployment for
every approved UI refinement. The Owner authorised staging-only automatic
adoption of approved releases. This decision defines the WEX producer side. It
does not authorise, specify the internals of, or write to any consuming host.

## Decision

WEX publishes one small, mutable **staging pointer** next to the immutable
releases on the existing GitHub Pages origin:

`/studio-releases/staging-pointer.json`

Only the pointer moves. A release directory is never overwritten, moved or
deleted by pointer changes (ADR 0024 guard unchanged).

### Publishing is not approving

- **Publishing** a release means its `wex-studio-v1-<source-sha>/` directory is
  on `main` and deployed. It is retained and verifiable but **not** selected by
  any consumer.
- **Approving for staging** means a Reviewer-accepted change to
  `staging-pointer.json` reaches `main`. Builders may prepare a candidate
  pointer on a topic branch; only a Reviewer-instructed promotion to `main`
  approves it. Pages deploys from `main` only, so an unreviewed topic branch can
  neither publish nor approve.
- Approval is staging-only. Production is not represented by this pointer and
  stays pinned by its consumer until the Owner separately approves otherwise.

### Pointer contract `wex-studio-staging-pointer@1`

Canonical JSON (two-space indent, trailing newline, exactly these keys):

| Key | Rule |
| --- | --- |
| `schema` | `wex-studio-staging-pointer@1` |
| `contract` | `wex-studio-host@1`, the contract the named manifest must carry |
| `change` | `advance` or `rollback`; the first pointer is `advance` |
| `sequence` | integer ≥ 1; each change is exactly previous + 1 |
| `releaseId` | `wex-studio-v1-<40 hex source sha>` |
| `manifestPath` | exactly `<releaseId>/manifest.json`, relative to the pointer URL |
| `manifestDigest` | SHA-384 SRI string of the raw manifest bytes |
| `previous` | `null` at sequence 1, else `{ sequence, releaseId, manifestDigest }` of the prior pointer |

The pointer carries no absolute URL, host, credential, identity or user data.
A consumer derives the manifest URL from its own allowlisted Pages origin and
path prefix plus `manifestPath`.

### Producer verification (CI and local)

`tooling/scripts/studio-staging-pointer.mjs verify` fails the Pages workflow
before upload unless:

1. the pointer is canonical and exactly shaped (no extra fields, no absolute or
   traversing path);
2. the named release directory is complete and byte-verified (ADR 0024) and its
   raw manifest digest equals `manifestDigest`;
3. the release's source commit is an ancestor of the deploying commit, so a
   release built from an unreviewed branch cannot be selected;
4. `previous` names a release that is still retained and still verifies;
5. against the previously deployed pointer: `sequence` rises by exactly one,
   `previous` equals that pointer, the release differs, an `advance` selects a
   release descended from the previous one, and a `rollback` selects a release
   older than it. A downgrade therefore needs an explicit `rollback` change and
   a new sequence; a replayed or stale pointer cannot pass.

`verify-studio-releases.mjs` continues to forbid any change to an existing
release directory. After deploy, `verify-live` fetches the live pointer and
manifest from the Pages URL and checks the pointer is byte-identical to the
deployed one and the live manifest matches `manifestDigest`.

`propose --release <id> [--rollback]` writes the next pointer deterministically
from the current one and re-runs the same verification.

### Rollback and failure

- **Rollback** is a new pointer (`change: rollback`, sequence + 1) naming an
  earlier retained release, promoted through the same Reviewer-controlled path.
  Nothing is deleted, so rollback needs no rebuild.
- **Bad candidate:** CI fails and nothing is deployed; the previous pointer and
  all releases remain live.
- **Pages outage or unreachable pointer:** the pointer does not change; consumers
  keep their last verified release (see consumer contract).

## Threat model

| Threat | Control |
| --- | --- |
| Tampered release bytes | Per-file SHA-384 in manifest; manifest digest in pointer; consumer verifies both. Release overwrite blocked by ADR 0024 guard. |
| Pointer to attacker code | Pointer holds no URL; consumer allowlists origin and prefix; release must be on `main` and reachable from the deploying commit. |
| Unreviewed branch adopted | Pages is `main`-only; pointer change is the approval and requires Reviewer promotion. |
| Downgrade or replay | Strictly increasing sequence, `previous` chain, ancestry rule, explicit `rollback`. |
| Moving `latest` asset | No such URL exists; every asset path is under an immutable release ID. |
| Browser-chosen release | Pointer is a server-side input for the consumer; no pointer or release selector is accepted from a browser request. |
| Stale cache | Pages serves a finite cache lifetime (about ten minutes); consumer cache is bounded as below. |

**Residual trust:** anyone able to push to `main` or alter Pages settings can
move the pointer. Repository branch protection and the Reviewer gate are the
control; neither is verifiable from repository content. Pages does not provide
an `immutable` response directive; immutability comes from the retained path and
the no-overwrite guard.

## Consumer contract for a staging host

Normative requirements for any consumer adopting the pointer. The consumer
owns its implementation, auth, cache, deployment and fallback; WEX does not
write to it. The QSD-specific handoff is in the active work file.

1. **Staging only.** Production keeps a fixed reviewed pin and never reads the
   pointer unless the Owner separately approves it.
2. **Server-side fetch** of the pointer from a fixed allowlisted HTTPS Pages
   origin and `/studio-releases/` prefix. No redirects off that origin. Never
   derive the origin, pointer or release from request input.
3. **Validate** the pointer exactly as in the contract table: schema, contract,
   release-ID shape, `manifestPath` equal to `<releaseId>/manifest.json`, digest
   shape. Reject anything else.
4. **Verify the manifest** with the existing lock steps: HTTP 200, raw-byte
   SHA-384 equal to `manifestDigest`, `releaseId` and contract match, inventory
   and entry/styles present with safe relative paths. Enqueue assets with the
   recorded SRI and `crossorigin=anonymous` only after this passes.
5. **No downgrade by cache or replay:** remember the highest accepted
   `sequence`; ignore a lower one and treat an equal sequence with a different
   release as invalid. Accept a higher sequence only when `previous` matches the
   currently selected release.
6. **Bounded caching:** cache the verified result for at most 300 seconds, as the
   current lock does, and revalidate the pointer at that interval. Total
   propagation from approval to staging is therefore roughly the Pages cache
   (about 10 minutes) plus the consumer interval.
7. **Fail closed to last verified:** on pointer or manifest failure, outage or
   digest mismatch, keep serving the last release that fully verified; if none,
   enqueue nothing. Never serve unverified assets.
8. **Rollback** is whatever the pointer says: a higher-sequence `rollback`
   pointer is accepted and a consumer operator may also pin to a retained release.
9. **Preserve boundaries:** keep the one-time Logo host binding written before
   the module script, the route/auth/capability checks before any request, and
   consumer ownership of CSS and REST config. The pointer adds no data contract.

## Consequences

- Approved UI refinements reach staging by promoting a pointer change, with no
  consumer commit, manual pin edit or host rebuild.
- The consumer needs a separate, separately authorised implementation of the
  contract above; this decision does not change any consumer.
- Retention must continue: a release named by the pointer or its `previous` must
  not be removed.
- The pointer is the single mutable file under `studio-releases/`; the release
  guard exempts exactly that path.
