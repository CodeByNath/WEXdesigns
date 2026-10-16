# WEX Studio delivery — active work

Status: BLOCKED — DECISION REQUIRED
Phase: 2B — approve immutable versioned Studio release authority
Actor: REVIEWER / OWNER — release-hosting and cross-repository contract decision

## Reviewer decision — 16 October 2026
**Verdict: Proceed with safeguards.** Codex's evidence-backed delivery-contract proposal is accepted as the *planning basis*, not as WEX architecture or authorisation to implement. The previous manual QSD Phase 1G refresh remains deferred. WEX fixed 64×64 Logo is accepted on `main` at `ec445a73dc98b94f1781096e94ccc34e48bff32c`; QSD runtime has not been verified with it.

## Verified/proposed boundary
Codex reports WEX builds relative hashed Studio assets and an entry/styles/version manifest; its current Pages deployment does not retain immutable Studio release directories. QSD's current host gateway consumes locally bundled `studio-assets/manifest.json` and does not implement remote release pinning, SRI, or integrity locks. This report was reviewed as a design proposal; no new runtime, build, or browser validation was claimed.

Proposed minimum: WEX publishes a complete immutable release directory bound to exact source SHA and release ID; a canonical manifest inventories all assets with cryptographic digests and a declared compatibility contract. QSD pins a reviewed manifest digest and release version, verifies asset integrity and permitted origin, retains Profile Logo source and host ownership, and can roll back to a retained approved version without rebuilding WEX. No mutable `latest` URL or implicit update.

## Architecture/Owner gate — no implementation yet
Resolve and record in accepted WEX authority/ADR:
1. Exact immutable release origin, browser module MIME/CORS behaviour, publication credentials/permissions, retention and immutability evidence.
2. WEX release manifest, hash/signing or integrity verification contract, compatible loader version and immutable cache policy.
3. QSD's separate ownership of release lock, CSP/SRI rules, verification failure behaviour and staging/production approvals. QSD schema/loader changes require separately authorised QSD Builder work.
4. Rollback semantics and release proof: WEX `ec445a7` fixed Logo is first acceptance candidate in authenticated QSD staging.

Codex must not implement remote delivery, publish releases, change QSD, or silently auto-update a host before this gate closes. Reviewer will authorise a bounded WEX implementation package only after the decision. All Phase 2D and Builder Phase 2B detail is preserved in this file's Git history.

Next Action: OWNER / REVIEWER architectural selection and ADR approval; Builder has no implementation authority yet.
