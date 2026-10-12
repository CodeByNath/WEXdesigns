# QSD /studio — WEX Dashboard host integration

Status: BUILDER ACTION REQUIRED — Phase 1A promotion only
Phase: WEX Phase 1A — host-portable Dashboard mounting only; identity protocol gate deferred
Actor: WEX Builder — reviewed-source promotion
Reviewer verdict: Proceed with safeguards (2026-10-12)

## Verified prerequisites and authority
Owner-approved first host: QSD `/studio/`, with existing QSD `/station/` untouched. QSD source `CodeByNath/qldscubadive` `main` = `69a106bc7be0de7325f3010664991356e0b89f18`; GitHub Actions run `38192006500` passed. QSD Studio Host topic branch retired; its work file `project-work/wex-studio-host.md` is ACCEPTED (source only). No staging deployment or live host verification. WEX `main` = `2fd8c718c2044c8965f85194fd150b55303420e0` at release; verify fresh.

Before work read `project-work/AGENTS.md`, `PROJECT-RULES.md`, WEX `docs/code-map/admin-shell.md`, ADRs/identity authority, `packages/adapters/README.md`, runtime source/tests and relevant approved WEX composition contracts. QSD code is read-only integration evidence, never WEX authority.

## QSD host contract already built (read-only)
`StudioHostModule` owns `/studio/` route, WordPress host session/capability gate, mount `#qsd-studio-host`, distinct from `/station/`. `StudioAssetGateway` consumes `studio-assets/manifest.json` with `entry`, `styles`, `version`; files are local to QSD's plugin `studio-assets/`, not GitHub Pages. Browser config: `window.QSDStudioConfig` containing `apiRoot` for `qsd/v1/studio/` and WP REST nonce. `StudioStorageController` exposes authenticated `GET storage` (status), `POST storage/init` (explicit admin action), `GET/PUT storage/identity` (one JSON identity blob). `StudioStorage` fails closed without administrator-configured `QSD_STUDIO_PRIVATE_ROOT`. Confirm actual source paths and request/response semantics rather than guessing.

## Bounded WEX Builder instruction
1. Build WEX-owned, host-portable release assets for the **existing** Admin Dashboard Header/Sidebar/Main/Footer and empty Body to mount at `#qsd-studio-host`. Preserve working Logo fitting, existing presentation tokens, Heroicons shell controls and responsive/sidebar/focus behaviour. Do not redesign or create components.
2. Adapt runtime asset URLs/base without GitHub Pages assumptions and emit a compatible, versioned manifest; document precisely how a QSD host installer can place the WEX output in its `studio-assets/` location. Do not modify QSD source from WEX.
3. **Identity integration is explicitly DEFERRED in Phase 1A.** Do not call QSD's single-blob identity endpoints; do not implement a substitute lifecycle protocol, write identities, or trigger bootstrap/initialization. Mount the already-built visual Dashboard without identity storage. Preserve existing independent Logo *presentation fitting*, but do not connect a QSD business logo or identity. Record the separate architecture mismatch for a future approved adapter-capable host contract.
4. Add deterministic checks for asset manifest, mount, unauthorized/error state, isolation/storage readback and compatibility with existing standalone WEX runtime. Run required WEX checks and record exact SHA, files and tests. No claim of QSD-host live success before authorized staging/browser validation.

## Exclusions / acceptance gates
No legacy QSD UI/CSS/templates/drawers, WordPress DB queries from WEX, QSD domain records or IDs, logo business-data plug, navigation items, new components, fake Body content, blanket data APIs, production/staging deploy, changes to `/station/`, or automatic WEX identity provisioning. WEX owns presentation and UI identity; QSD owns host routing/auth/storage infrastructure and domain data APIs. Every later business-data plug requires separate Owner instruction.

QSD staging requires separate approval, administrator-set verified private `QSD_STUDIO_PRIVATE_ROOT`, direct HTTP-denial checks, auth/REST and persistence tests. Deferred WEX responsive, keyboard and focus checks must run against actual integrated host before runtime acceptance.

## Builder handoff — 12 October 2026
Candidate branch: `feature/qsd-studio-host-phase-1a`.
Remote-verified candidate SHA: `8409ae51f74dfe9ffb22b1b284c2a44c1a5eba8f` (`feat(studio): add portable dashboard host assets`).

Changed WEX scope only: reusable existing Admin Station presentation runtime and static empty shell; `#qsd-studio-host` mount/error states; relative-URL Vite asset bundle and versioned `manifest.json`; installer guidance at `apps/web-runtime/studio-host/README.md`; host manifest/isolation tests. The ordinary runtime test command now builds the host bundle first. No QSD source, business data, WordPress, identity/storage, API, bootstrap, IDs, or deployment changes.

Evidence on this candidate tree:
- `tsc -p apps/web-runtime/tsconfig.json --noEmit` — pass.
- Vite standard build and `vite build --config apps/web-runtime/vite.studio-host.config.ts` — pass; manifest emits relative `assets/wex-studio-host-<hash>.js` and CSS paths.
- `node --test apps/web-runtime/test/*.test.mjs` — 16/16 pass, including 3 host contract/isolation checks.
- `node tooling/scripts/validate-foundation.mjs` — pass.
- Local Chrome fixture: mount-only empty shell; keyboard skip focus; desktop Sidebar toggle; 375px drawer opens and Escape restores focus; missing mount shows no shell.

Unverified and deliberately pending: actual authenticated QSD `/studio/` runtime, host installer execution, staging, deployment, QSD business-data and identity integration. Reviewer must audit the source candidate before any integration/deployment action.


## Reviewer decision — identity API incompatibility (12 October 2026)

**Verdict: Proceed with safeguards.** Builder correctly stopped before modifying source. Verified WEX accepted local-folder identity adapter contract declares `detectSpace`, `createSpace`, `readRegistration`, atomic `reserve`, guarded `transition`, and exact `lookup`, including locking/atomic filesystem writes. QSD `main` `69a106b` provides only status/init and a single `GET/PUT storage/identity` JSON blob with non-atomic `file_put_contents`; it cannot fulfill the accepted adapter contract. No source candidate exists; no implementation review is claimed.

**Bounded decision:** defer WEX identity integration and explicitly *narrow* this phase to WEX-owned Dashboard bundle/manifest, `#qsd-studio-host` mounting, existing shell layout and Sidebar/focus responsiveness, and authorised-host presentation/error handling. Body empty; no persistence/identity calls, registration, bootstrap or WEX UI IDs. WEX does not inherit QSD presentation or WordPress query logic. This uses no new identity abstraction. Validate standalone WEX and host-mount fixture deterministically; record live runtime as pending. Builder can now proceed on existing approved Phase 1A scope, one topic branch, and hand off pushed SHA for review.

**Future architecture gate (NOT authorised to implement):** a QSD host-side adapter-capable API must preserve WEX identity atomic reserve, transition, lookup and registration invariants with secure storage/host approval. Do not merely rename the blob API or implement client-side read/modify/write. Scope/accept that protocol through repository authority and a separate QSD phase before identity integration resumes; retain previous QSD private-root and staging-runtime gates. Do not modify QSD source here or deploy.


## Reviewer review — Phase 1A candidate (12 October 2026)

**Verdict: Proceed with safeguards.** Independently inspected remote `feature/qsd-studio-host-phase-1a` at `8409ae51f74dfe9ffb22b1b284c2a44c1a5eba8f` against WEX `main` `2fd8c718c2044c8965f85194fd150b55303420e0`. Source adds a host-specific Vite manifest/relative bundle, mounts the existing empty Header/Sidebar/Main/Footer at `#qsd-studio-host`, reuses approved WEX theme/Logo/Sidebar presentation, and makes no QSD, business-data, identity or storage calls. Current independent evidence is pushed diff/source; build, 16 tests and browser checks are Builder-reported, not independently rerun. Actual QSD `/studio/` runtime remains untested.

**Next Builder action — promotion only:** verify approved origin, remote HEADs (max three), exact candidate tree and required checks; promote ONLY the reviewed `8409ae5` source to WEX `main` through repo-approved fast-forward workflow, verify pushed main SHA and CI/Pages, record any factual Code Map metadata update separately if required. Verify topic branch is fully contained before safe cleanup; branch deletion remains an explicitly gated destructive action. Update THIS file with main SHA, CI result, remote head state and limitations; stop for Reviewer. No code expansion, staging deploy, QSD writes or identity/data plugs.

**Runtime safeguard:** when QSD installation is separately authorized, verify asset loading, WEX-only styling, authenticated/unauthenticated access, existing shell responsiveness/keyboard/focus and missing-mount recovery; do not claim host runtime validated based on local fixtures. The incompatible QSD identity blob interface remains DEFERRED.
