# QSD /studio — WEX Dashboard host integration

Status: BUILDER ACTION REQUIRED — approved Phase 2A promotion to main
Phase: 2A — Owner-directed Dashboard UI refinement batch handoff
Actor: BUILDER:DESIGNER — promote exact reviewed corrected candidate and report CI

## Owner contract
QSD /studio hosts WEX's existing independently styled Dashboard; /station remains untouched. WEX owns presentation (Header, Sidebar, Main, Footer, existing Logo fitting, Heroicons); QSD owns route, session/capability gate, protected host storage and asset delivery. Dashboard Body is empty: no QSD records, components, business-logo plug, or direct WordPress database usage.

## Verified WEX implementation
Reviewer verdict: **Proceed with safeguards** (12 October 2026). Builder candidate `8409ae51f74dfe9ffb22b1b284c2a44c1a5eba8f` was promoted to WEX `main`. Final main is `02bbfb0e05702ab2b8beee629d2c328644d91c15`; its sole post-candidate change is factual `docs/code-map/admin-shell.md` routing metadata. GitHub Pages run `38207957530` succeeded at source SHA `8409ae5`. Builder evidence: TypeScript/Vite, 16 web-runtime tests, foundation validation, and local responsive/keyboard fixtures passed. Reviewer inspected pushed source/diff, but did not rerun tests or validate live QSD runtime.

WEX host bundle: `apps/web-runtime/vite.studio-host.config.ts` produces relative assets and versioned `manifest.json` (`entry`, `styles`, `version`). Installer instructions: `apps/web-runtime/studio-host/README.md`. The entry mounts the existing Dashboard at `#qsd-studio-host`, with no identity, storage, API, or bootstrap calls. Standalone Admin Station remains. No QSD source changed.

## Branch closeout
On 12 October 2026, the Owner-approved completed topic `feature/qsd-studio-host-phase-1a` was re-verified as fully contained in `main` (topic 0 ahead, main 1 metadata-only commit ahead) and deleted remotely. Final remote heads are only `main` (`02bbfb0e05702ab2b8beee629d2c328644d91c15`) and `Project-work-instructions`. No WEX source modification, deploy, QSD work, or next phase occurred during cleanup.

## Accepted QSD prerequisite
QSD `main` = `69a106bc7be0de7325f3010664991356e0b89f18`; GitHub Actions `38192006500` successful. QSD host assets belong under its plugin `studio-assets/`; its /studio permission gate and mount are QSD-owned. QSD staging, private-root configuration, asset installation, and browser checks have NOT happened.

## Outstanding separate gates
1. **QSD installation/staging:** requires a separate Owner-authorised QSD phase. Install WEX release assets without modifying /station; if identity bootstrap is later proposed, configure administrator-verified private `QSD_STUDIO_PRIVATE_ROOT`; then perform real HTTP denial, authenticated/unauthenticated access, asset, responsive, keyboard/focus, and error checks. Do not automatically initialize storage.
2. **Identity protocol:** **DEFERRED.** QSD's single-blob GET/PUT storage/identity is incompatible with WEX's accepted atomic reserve/transition/lookup adapter. No client-side read-modify-write workaround or new persistence protocol. An independently approved host adapter API is required before resuming identity. Each QSD business-data plug needs explicit separate Owner direction.

**Next:** WEX Phase 1A is closed. No implementation or deployment is authorised by this file; route any QSD staging decision through QSD's own work cycle.


## Owner governance update — 12 October 2026

Owner-only manual overrides and exclusive WEX design-token authority are now recorded in project-work/AGENTS.md. Next requested integration is QSD authoritative Logo -> existing Header Brand/Logo allocation, backend Claude Code and frontend Codex/ChatGPT separated. No WEX UI modifications or fabricated platform IDs. This is future work, not a reopened WEX Phase 1A; QSD staging/browser/identity gates and QSD work-cycle authority apply. Any missing atomic adapter or placement contract requires Owner/Reviewer decision.


## Phase 1B — Owner-authorised Designer handoff (2026-10-13)

Owner authorises WEX UI work now. Phase 1A remains ACCEPTED and is not reopened. **Existing QSD data producer is separate:** `GET /qsd/v1/admin/account` pairs `nodes.profile.platform_id` (QSDASTP Profile identity) with `brand.logo_url`; Builder added a contract test at QSD topic `79d597c`, pending separate Reviewer acceptance. QSD data delivery must not be blocked on WEX rendering.

**Designer objective:** Read WEX `AGENTS.md`, platform skill, accepted Logo/Header ADRs and schemas, code maps and actual `main` runtime. Determine the smallest approved WEX consumer-side change needed to pass externally supplied logo data to the existing Header Brand/Logo allocation while keeping Header ignorant of component internals. Use verified existing contracts, registered WEX values and browser/evidence checks. No new Logo/Header component, invented platform ID, QSD backend edit, inline CSS, locally chosen design values, direct DOM targeting or identity-storage workaround. WEX owns presentation/empty/error outcomes; QSD owns Profile/Logo data.

**Architecture gate:** Existing Logo schema is `{label}` and ADR 0022 deliberately excludes an image URL; ADR 0021 says Brand is a layout allocation, not a registered external-data slot. If consuming external image data requires changing this accepted boundary, **STOP before implementation** and return a concise source-backed decision for Owner approval rather than inventing schema or bypassing it. Read-only audit is authorised immediately. Only once existing authority permits implementation, perform bounded UI-only work, run defined checks, push a topic branch (branch-cap preflight), report SHA/evidence and stop for Reviewer. No production deployment.

**Reviewer correction:** Do not tell Owner Designer work is already authorised unless the current active work file actually says `BUILDER:DESIGNER`. Confirm branch status and active file each time before saying ready. This paragraph now supplies the explicit role and phase.


## Owner decision — Phase 1B dynamic property binding, Logo-first (2026-10-13)

**Owner APPROVED architectural direction:** WEX owns both presentation **and dynamic UI property plugs**; external platforms own their records, API, authorization, and media. The immediate forcing case is existing QSD Profile `nodes.profile.platform_id` plus `brand.logo_url` → existing WEX Header Brand/Logo allocation. A property plug resolves a source field to an approved target property without giving Header knowledge of Logo internals. Implement using TypeScript, serializable definitions/composition, registered WEX styles and safe presentation. Keep existing label-only Logo compatibility. No inline CSS, invented design values or arbitrary IDs. Do not import QSD domain logic into WEX.

**Builder: DESIGNER — authorised work in order:** (1) Read accepted ADR 0021/0022, Logo schema/UI resolver, Header allocation, runtime, maps and current tests. (2) Prepare the *smallest durable WEX authority change* needed for external image-valued property binding, recording a focused ADR amendment/new ADR and the exact schema/render/runtime boundary before changing the implementation. This Owner decision authorises that narrowly scoped amendment; no broad component-connector architecture. (3) Implement the approved-by-Owner Logo-first binding seam: external source value is resolved through an application/domain adapter boundary, the WEX component consumes the typed value, and WEX controls null/error/unsafe URL rendering according to its accepted presentation authority. (4) Test the existing `{label}` fixture compatibility, typed binding validation, Header independence, and disconnected/invalid/valid Logo values; run relevant build/checks. (5) Commit/push bounded topic SHA and report files/tests and remaining integration proof; hand off to independent Reviewer. Do **not** edit QSD source, invoke identity storage, deploy production or prebuild grid/carousel/repeater machinery.

**Sequencing:** Prior architecture stop is resolved **for this Logo-first bounded change** by Owner approval. Changes to accepted ADR/schema still require the usual documentation and Reviewer evidence; Builder cannot self-accept. Larger generic collections (loops, grids, carousels) are future forcing cases, not this phase. If a new fundamental authority conflict beyond this narrowly approved Logo/image property-binding direction arises, stop and report it. Existing QSD API pairing is a separate producer-side contract; do not block data-producer acceptance on browser rendering.


## Builder handoff — Phase 1B Logo-first binding (2026-10-13)

Remote candidate: `origin/codex/logo-property-binding` @
`3af9200f7311a4c33f2d4191df4d95d7a432377a`, published from the exact
verified candidate tree. It is based on `origin/main`
`18d670f4e918d2258ae63de3fa60c2a624a51105`.

Delivered boundary:
- ADR 0023 defines one serializable `source -> imageUrl` Logo binding, while
  preserving the existing label-only `LogoDefinition`;
- the application boundary resolves only validated HTTPS image values;
- Shared UI renders the typed image inside the existing Brand allocation, or
  retains the label fallback for disconnected, invalid, or unsafe values;
- Header remains unaware of Logo internals; no QSD API, storage, identity,
  deployment, business-data, or body change was made.

Changed paths: Logo schema/UI/render-description/WEX presentation, Admin
Station/Studio-host runtime seam, focused schema/UI/runtime tests, ADR 0023,
and Header/Admin Shell Code Maps.

Evidence:
- `pnpm check` passed: 45/45 tasks;
- `pnpm audit:foundation` and `git diff --check` passed;
- focused schema, UI, web-runtime, invalid/disconnected/valid binding tests
  passed;
- local Chrome validation confirmed the existing Header Brand label fallback in
  the Admin Station shell. The valid-image path is covered by the runtime test;
  no QSD host/staging integration is in this repository or authorised phase.

Reviewer: inspect the remote diff and exact candidate tree, confirm the closed
HTTPS/binding/render boundary and label compatibility, then issue the required
verdict. Do not treat this handoff as deployment or QSD-host proof.


## Reviewer — Phase 1B pushed candidate `3af9200f` (2026-10-13)

**Verdict: Proceed with safeguards.** Inspected main-to-topic diff and actual source: ADR 0023, closed HTTPS image property, label fallback, shared Logo renderer and WEX containment styles stay within Logo-first scope. Builder reports 45/45 `pnpm check`, foundation audit and local Chrome label fixture; Reviewer has not independently rerun tests. **Correction required:** `apps/web-runtime/src/studio-host.js` defines `mountStudioHost(options)` but immediately calls `mountStudioHost()` with no options; the actual bundled entry supplies no host-provided data or callable integration handoff. Thus the Logo still cannot receive an external source through the loaded host bundle. In the same topic, implement the smallest stable host-to-WEX input invocation that genuinely reaches `logoImageBinding`/`sourceValues`, with test showing host-supplied valid URL renders and disconnected label remains; do not add QSD API calls, IDs, storage, global connector machinery or new presentation. Clarify README and source maps as necessary, fix stale candidate SHA references, run checks, push and report. Do not declare QSD live Logo connection in this WEX phase. Return for independent review; do not promote/deploy yet.


## Builder correction handoff — Phase 1B (2026-10-13)

Remote candidate: `origin/codex/logo-property-binding` @
`e6fead7f776ad32c09fd10d0c1fb8224c04053c3`. The functional correction is
`dea09ca35a6c709f987924034cae432f6b81699f`; the candidate head additionally
updates the Header and Admin Shell Code Maps to record that verified source
commit and the constrained host-input seam.

Delivered correction:
- the bundled Studio entry reads one optional, serializable
  `globalThis.wexStudioHostOptions` value once before mounting;
- that input reaches only the approved
  `logoImageBinding`/`sourceValues` resolver, so a valid host-supplied
  HTTPS URL produces the existing Logo image rendering while missing or invalid
  input preserves the existing label fallback;
- ADR 0023 and Studio installer guidance constrain the value as one-time
  initialization, not a QSD API, callback, event channel, registry, identity
  protocol, storage mechanism, or general connector;
- the local browser fixture configures the input before the module entry and
  demonstrates the image element at the existing host mount. No QSD source,
  route, API, identifier, storage, visual presentation, deployment, or
  business-data body change was made.

Evidence:
- `pnpm --filter @weerax/web-runtime check` passed (18/18 web-runtime tests);
- `pnpm audit:foundation` and `git diff --check` passed;
- local browser fixture at the WEX dev host showed
  `#qsd-studio-host[data-wex-studio-host="mounted"]` and a visible Logo
  image with source `https://example.test/qsd-profile-logo.svg`;
- local Git candidate commits were published through the connected
  `CodeByNath/WEXdesigns` account, then fetched and verified at the remote
  SHA/tree above.

Reviewer: independently inspect the remote diff and candidate tree, including
that the bundle entry invokes `mountStudioHost(readStudioHostOptions())`,
the valid-image fixture path, disconnected fallback preservation, and the
absence of QSD/API/storage/identity/connector machinery. Issue the next
verdict only; do not promote or deploy this candidate.


## Independent Reviewer verdict — Phase 1B (2026-10-13)

**Proceed with safeguards.** Reviewed pushed remote candidate `e6fead7f776ad32c09fd10d0c1fb8224c04053c3` against `main` baseline `18d670f4e918d2258ae63de3fa60c2a624a51105`, including correction diff after `3af9200f`. Verified Studio entry consumes preloaded `globalThis.wexStudioHostOptions` once, validates the closed `source -> imageUrl` binding, resolves HTTPS values to existing shared Logo image description, and keeps label-only fallback. Existing Header/Logo component boundaries retained; no QSD API, storage, identity, or deployment work in candidate. ADR 0023 and installer reference describe the seam. Builder reports web-runtime 18/18, foundation audit, and local browser fixture; Reviewer inspected remote source but did not independently rerun checks or verify real QSD image networking. Fixture URL `example.test` is not proof of actual QSD image delivery. **Accept the bounded WEX-side Phase 1B source candidate only.** Do not claim live integration; separately authorise/promote source under existing governance and coordinate QSD host preloading of approved values followed by deployed browser verification. No new Designer implementation requested. This review records verdict, not a merge or deployment.


## Reviewer next-action assignment — accepted-source promotion (2026-10-13)

**NEXT OWNER: BUILDER:DESIGNER (Codex), not QSD Coder.** Reviewer has completed and accepted Phase 1B source at `codex/logo-property-binding` SHA `e6fead7f776ad32c09fd10d0c1fb8224c04053c3` with safeguards. Independently rechecked remote GitHub comparison: against `main` `18d670f4e918d2258ae63de3fa60c2a624a51105`, candidate is **3 ahead, 0 behind**, 21 changed files. This assignment explicitly authorises **promotion of only that exact accepted candidate to WEX main**, following existing Git protection/check rules; no other source implementation, QSD edits, deployment or new phase. Verify remote heads and CI/protection, then use a non-force-push fast-forward merge or repository-required approved PR path. Stop and report any changed base, failing required checks, or protection gate; do not bypass. Verify final main SHA and successful WEX workflows. After proving candidate contained in main, perform safe remote topic deletion only if Git-capable and governance permits; otherwise report remaining branch for a capable executor without deleting unverified work. Record exact promotion/workflow/branch results in THIS file, set AWAITING REVIEWER REVIEW, and stop. Reviewer then closes Phase 1B; QSD actual Profile input injection is **separate integration validation**, using already completed QSD producer, not repeat backend construction. No source change is authorised by this coordination record except accepted candidate promotion.


## Builder promotion handoff — Phase 1B (2026-10-13)

The Reviewer-accepted exact candidate
`e6fead7f776ad32c09fd10d0c1fb8224c04053c3` was non-force fast-forwarded
from WEX `main` `18d670f4e918d2258ae63de3fa60c2a624a51105` to that exact
SHA. Fetch verification proves the candidate is an ancestor of `main` and
the two refs have an identical tree at the promoted head.

The promotion-triggered GitHub Actions workflow **Deploy WEX index** completed
successfully: run `38356455181` (push event, head SHA `e6fead7`,
conclusion `success`). This is WEX Pages workflow evidence only; no QSD
deployment, host injection, or live QSD integration was performed or claimed.

Remote heads after promotion:
- `main` @ `e6fead7f776ad32c09fd10d0c1fb8224c04053c3`;
- `codex/logo-property-binding` @ the same SHA, now fully contained in
  `main`;
- `Project-work-instructions` remained the coordination branch.

Safe topic deletion is still required by normal branch-capacity closeout, but
was not performed: this execution surface can use the connected `CodeByNath`
account for non-force ref updates, yet exposes no safe authenticated remote
branch-deletion operation. The terminal Git credential previously identified
as `WeeraX` cannot be used to delete the branch on the connected account.
A Git-capable `CodeByNath` executor should delete only
`codex/logo-property-binding` after Reviewer confirms this containment
evidence. No source content changed during promotion/closeout.

Reviewer: verify the exact `main` SHA, successful workflow and safe-deletion
limitation; then close Phase 1B or assign only the capable branch-housekeeping
operation. Do not infer QSD live integration from this WEX source promotion.


## Reviewer promotion verification and next owner — 2026-10-13

**Phase 1B implementation: ACCEPTED.** Independently verified GitHub `main` is exactly `e6fead7f776ad32c09fd10d0c1fb8224c04053c3`, identical to topic `codex/logo-property-binding`. GitHub Actions `Deploy WEX index` completed **successfully** for this exact main SHA (run `38356455181`). This verifies source promotion/Pages workflow, not QSD API-to-Logo staging runtime. The approved typed image binding, label fallback and existing Header shell boundaries remain the accepted scope.

**NEXT OWNER: BUILDER:DESIGNER (Codex), housekeeping only.** On a Git-capable authenticated `CodeByNath` terminal, verify both remote refs still point to the same SHA, then delete only remote `codex/logo-property-binding` using a non-force ref deletion, fetch/prune and verify that the remote now contains only `main` and `Project-work-instructions`. Preserve any old local branches, especially `feat/postgres-identity-adapter` and `feat/wex-dna-presentation`; they are NOT part of this cleanup. Update this SAME handover with deletion evidence and `AWAITING REVIEWER REVIEW`. No UI edits, additional commits to main, QSD changes or deployment. This Reviewer surface lacks an authenticated branch-delete action, so branch deletion was not falsely claimed. After closure, QSD host injection/staging verification requires its separately governed integration phase; producer implementation already exists and must not be repeated.


## Builder housekeeping handoff — Phase 1B branch deletion (2026-10-13)

With explicit Owner approval in-session, the contained topic branch
`codex/logo-property-binding` was deleted from `origin`
(`CodeByNath/WEXdesigns`) using a non-force `git push origin --delete`.

Evidence:
- before deletion, `git ls-remote --heads origin` showed
  `codex/logo-property-binding` and `main` both at
  `e6fead7f776ad32c09fd10d0c1fb8224c04053c3`;
- after `git fetch --prune origin`, remote heads are only `main` @
  `e6fead7f776ad32c09fd10d0c1fb8224c04053c3` and
  `Project-work-instructions`;
- local branches, including `feat/postgres-identity-adapter` and
  `feat/wex-dna-presentation`, were left untouched. No source, QSD, UI, or
  deployment change was made.

Reviewer: verify the remote heads and close Phase 1B. QSD host injection and
staging verification remain a separately governed integration phase.


## Reviewer final closeout — 2026-10-13

Independently verified GitHub remote heads: only `main` @ `e6fead7f776ad32c09fd10d0c1fb8224c04053c3` and `Project-work-instructions`; `codex/logo-property-binding` is absent. Previously verified WEX Pages run `38356455181` succeeded on the accepted exact main SHA. **Phase 1B accepted and closed for WEX source, promotion and topic housekeeping.** There is NO pending Codex or WEX Builder task. This does not establish that QSD's real Profile logo is wired into `/studio` or visible in staging. **NEXT OWNER: Reviewer/coordinator** to verify QSD repository's current integration authority and, only if separately authorised there, route actual host input/staging validation to its assigned actor. Do not rebuild QSD's already established data producer; do not reopen Phase 1B or begin Dashboard refinements before live Logo is verified.

## Phase 1C — Owner reports persistent text Logo (14 October 2026)

**Reviewer verdict: Proceed with safeguards.** Owner explicitly rejects visual acceptance: the Dashboard displays the literal text `Logo`, no image. Supersedes prior chat claims that Logo is ready; Phase 1B source acceptance remains historical, not proof of displayed image.

**Observed source evidence:** `apps/web-runtime/src/admin-station-runtime.js` uses `const logoFixture = { label: 'Logo' }`; standalone `admin-station.js` invokes `initialiseAdminStation(shell)` without image properties. Separate QSD host `studio-host.js` reads optional one-time `globalThis.wexStudioHostOptions`; absent, malformed, or unprovided HTTPS `sourceValues` intentionally falls back to text. WEX does not itself fetch the QSD Profile API. The fixture test uses `example.test`, not a deployed business image.

**BUILDER:DESIGNER instruction — one bounded package:** (1) Identify/reproduce the precise WEX Dashboard URL/entry and inspect computed Logo DOM; distinguish standalone Pages from QSD `/studio/`. (2) Check the real host input before WEX entry load and whether it resolves `logoImageBinding` / `sourceValues`; verify actual image URL, HTTP accessibility, image load and the live rendered `img`. (3) Correct **only WEX-owned** missing propagation/fallback/entry issues proven by evidence, preserving ADR 0021–0023, WEX styles, label-only compatibility and Header separation. No placeholder fake image, hardcoded business URL, fabricated platform ID, QSD edits, WordPress API calls, storage, identity, new component or design tokens. (4) Run focused tests, `pnpm check`, foundation audit, and responsive Chrome proof; commit/push candidate and update this same file with exact SHA and results; stop for independent Reviewer. **Acceptance requires real rendered image, not merely test existence.**

**Stop gate:** If actual failure is QSD host preloading/media/deployment, report exact missing host input/asset/HTTP evidence and stop. WEX Builder cannot modify QSD; a separate Owner-authorised QSD work cycle must own that correction. Do not claim completion, deploy or open Dashboard refinements before visible image evidence.


## Phase 1C Designer report — 14 October 2026
Designer reports **no WEX source changes** and clean tree. Staging supplies pre-module `wexStudioHostOptions`, HTTPS WebP returns HTTP 200, and deployed bundle includes Logo resolver; fresh reload still renders only literal `Logo` fallback and produces no console error. These are Builder-reported staging observations, **not independently reproduced Reviewer evidence**. Do not accept the Logo as visually complete or assign another speculative WEX UI correction.

**Next bounded integration investigation:** Host-capable QSD actor must compare exact deployed entry/manifest hash and execution order, inspect `wexStudioHostOptions.logoImageBinding` and matching `sourceValues` at WEX module evaluation, trace resolver output and image-element insertion, and check media/network/DOM results on the actual staging route. Distinguish a QSD host injection/asset mismatch from a WEX consumer bug based on observed values; fix only within owning repo after its own approved phase. No identity/storage work, no visual redesign, no production deployment. Keep Phase 1C open until screenshot/DOM evidence proves the real Logo image visible in the Header.


## Owner reassignment — WEX correction, 14 October 2026

**Verdict: Proceed with safeguards.** Owner explicitly confirms the remaining correction belongs to WEX, not QSD. Previous QSD staging deployment rebuilt its bundle at WEX accepted `e6fead7`, yet Owner screenshot still shows blue literal `Logo` in Header. Reopen ONLY WEX consumer-side Phase 1C. No QSD source/backend assignment from this work file.

**BUILDER:DESIGNER — one correction package:** Inspect `main` Code Maps, ADR 0021–0023, `LogoImagePropertyBindingSchema`, `LogoImageUrlSchema`, `apps/web-runtime/src/logo-property-binding.js`, `studio-host.js`, `admin-station-runtime.js`, UI render description/materializer and tests. Reproduce the host-shaped binding object and exact source-map key/value under real module initialization. Trace parsed binding -> resolved `logoProperties` -> emitted image description -> actual DOM; specifically test a valid real-format HTTPS WebP URL, missing/invalid input and the label fallback. Identify why the accepted host-shaped input still resolves to text and implement the smallest **evidence-backed WEX-owned** correction. Do not silently change external QSD field names or data ownership. Preserve current label-only compatibility and WEX/Header separation. Do not add a new component, connector, identity/storage layer, CSS values or invented fallback image.

**Proof:** focused tests plus `pnpm check` and foundation audit; Chrome/local host fixture with pre-entry `wexStudioHostOptions` and a real served image, DOM showing `<img>` in Header rather than blue text; record entry and binding payload shape (no secrets), network image load and responsive regression. Push only corrected WEX source on an authorised topic branch (remote head cap: three) and update this same file to `AWAITING REVIEWER REVIEW` with exact SHA, diff and tests. Stop for independent review; no QSD editing or staging/production deployment. If exact live payload differs from documented contract and needs host changes, return a precise evidence-backed interface discrepancy, not an unproven fix. **Visual Logo acceptance remains OPEN.**


## Owner withdrawal of WEX Designer task — 14 October 2026
Owner expressly cancels the previous WEX `BUILDER:DESIGNER` Logo correction assignment (commit `0f8fb3a`). **Do not execute that instruction.** Exact live Console data shows `window.wexStudioHostOptions.sourceValues["profile.logo"]` contains literal Markdown link markup `[https://...](https://... "https://...")`, not the bare HTTPS URL WEX accepts; DOM query `.wex-logo img` returns null. WEX's strict fallback is expected for this input. QSD `project-work/wex-studio-host.md` now assigns `BUILDER:CODER` to trace/correct that host value at its source (QSD coordination commit `792f16c`). No WEX source work, topic branch, deploy, or Logo acceptance authorised here. Resume only if correct raw input is later proven to fail WEX rendering. Older Designer instructions above are superseded.


## Owner browser proof — 14 October 2026 (supersedes Markdown hypothesis)
**Verdict: Proceed with safeguards.** Owner's authenticated screenshot at `https://www.staging2.qldscubadive.com.au/studio/` shows live `sourceValues['profile.logo']` first character code **104** ('h'), `startsWithHttps:true`, `imgExists:false`, `imgLoaded:false`; Header still shows literal text `Logo`. Thus copied Markdown was a chat artefact, NOT proven host data corruption. Earlier QSD sanitization is separate and does not solve the visual failure. The screenshot does not alone establish entire URL validity or exact consumer failure, so diagnose before fixing.

**BUILDER:DESIGNER — WEX-only correction:** At WEX accepted main, trace `studio-host.js` read of `wexStudioHostOptions`, `resolveLogoImagePropertyBinding` and URL schema, `mountAdminStation`/Admin Station init, `createLogoRenderDescription`, and DOM materialization. Reproduce with exact host-shaped object and real plain HTTPS .webp URL under deployed entry timing. Log/test where properties are dropped or validation fails (without disclosing secrets), inspect whether `<img>` created or fallback chosen, and whether module loaded twice/stale artefact. Implement only the demonstrated WEX-owned correction. Ensure test fails before fix, passes after; verify real rendered `img`, loaded asset, responsive nonregression; run focused tests, `pnpm check`, foundation audit. No new component, WEX values, QSD edits, hardcoded URL, identity/storage or production change. Respect 3-branch cap. Push WEX candidate, record exact SHA/test/DOM evidence in SAME work file, stop for independent Reviewer. If a full URL or live timing discrepancy proves the fault is outside WEX, stop with exact evidence instead of a speculative patch. **Owner visual acceptance remains open.**


## Builder handoff — Phase 1C Studio-host dependency build (14 October 2026)

Remote candidate: `origin/codex/studio-host-build-deps` @
`17e4ca2afd043d9462420d00ff8d3bdee4e86438`, based exactly on WEX `main`
`e6fead7f776ad32c09fd10d0c1fb8224c04053c3`.

Evidence-backed WEX defect: live staging supplied the documented pre-module
binding shape (`source: "profile.logo"`, target `imageUrl`, matching
`profile.logo` plain HTTPS WebP) and loaded the accepted host-option resolver,
but its emitted bundle contained a label-only Logo render function. The
configured `build:studio-host` previously invoked Vite without rebuilding
workspace Schema/UI output, permitting that mixed-version asset.

Delivered bounded correction:
- `build:studio-host` now builds `@weerax/schemas`, then `@weerax/ui`,
  before Vite packages the portable entry;
- regression proof checks the emitted entry contains both the Logo image branch
  and `wexStudioHostOptions`, and locks the dependency-build command;
- the local-only Studio fixture accepts an HTTPS `logoUrl` query input for
  non-hardcoded real-media validation. Production entry contract, Logo
  schema/property boundary, Header, styles, label fallback and QSD ownership
  are unchanged.

Evidence:
- focused Studio-host check passed (4/4); full `pnpm check` passed (45/45);
  Foundation audit and `git diff --check` passed;
- local Chrome fixture used the staging WebP through the real host-shaped
  binding: mounted state, one visible `img`, no text fallback, HTTPS source,
  successful natural image size `400×364`; at 390px it remained loaded at
  `64×58` with no Header overflow;
- staging inspection found the current page still renders literal `Logo`.
  This candidate is WEX source only; it has not been deployed to QSD/staging.
  No QSD source, API, storage, identity, production deployment, visual value
  or component change was made.

Reviewer: inspect the remote diff/tree and verify the stale-workspace-output
diagnosis, build order and emitted-bundle assertions. Do not treat local
real-image evidence as QSD deployment proof; require separately authorised
post-promotion QSD asset installation/staging verification before visual
acceptance.


## Reviewer assessment — 14 Oct 2026
**Verdict: Proceed with safeguards.** Independently compared `e6fead7..17e4ca2` on `codex/studio-host-build-deps`: only runtime build script, Studio fixture/README and tests changed. Source confirms deterministic `schemas -> ui -> Vite` build order. Emitted-entry assertions check `wex-logo__image` and `wexStudioHostOptions`; fixture supports real HTTPS media. ADR 0023 boundary, no new presentation values, and QSD ownership preserved. Builder reports focused 4/4, full `pnpm check` 45/45, Chrome loaded image (400×364; 390px responsive), but these test/browser reports are not independently rerun here. **Accept WEX source correction for promotion only, NOT real QSD visual acceptance.**

**BUILDER:DESIGNER next bounded action:** Fast-forward or otherwise governed promote exact reviewed candidate `17e4ca2afd043d9462420d00ff8d3bdee4e86438` to WEX `main` following repository process; verify resulting remote SHA and CI. No source additions, QSD writes or deployment. Remove completed WEX topic branch after verified promotion to restore branch capacity. Update this same file with exact main SHA, CI and branch cleanup evidence; stop for Reviewer. **After promotion**, QSD requires a separately authorised host asset rebuild/install from the new WEX `main` and authenticated browser proof of `img.complete && img.naturalWidth > 0`. Do not call Logo finished until this external integration succeeds.

## Builder promotion handoff — Phase 1C (14 October 2026)

The Reviewer-accepted exact candidate
`17e4ca2afd043d9462420d00ff8d3bdee4e86438` was non-force
fast-forwarded from WEX `main`
`e6fead7f776ad32c09fd10d0c1fb8224c04053c3` to that exact SHA.
Fetch verification confirms `origin/main` has the identical candidate tree
`13949f35b176aa1f0eb4afeaccdd2000e165ad77`.

The promotion-triggered GitHub Actions workflow **Deploy WEX index** completed
successfully: [run 38506288740](https://github.com/CodeByNath/WEXdesigns/actions/runs/38506288740)
(push event, exact head SHA `17e4ca2`, conclusion `success`).
This is WEX build/Pages evidence only; no QSD deployment, host asset install,
or live staging visual acceptance was performed or claimed.

The candidate topic `codex/studio-host-build-deps` remains fully contained
in `main` at the same SHA. Its deletion was attempted only after promotion
and CI success, but the terminal's distinct `WeeraX` credential received
GitHub HTTP 403. The connected `CodeByNath` account can update refs but this
surface exposes no ref-deletion operation. A Git-capable `CodeByNath`
executor must delete only this verified contained branch, then fetch/prune and
record the resulting remote heads. No source content changed during promotion.

Reviewer: verify exact `main` SHA, successful workflow and the deletion
limitation; close WEX Phase 1C source/promotion or assign solely that bounded
housekeeping action. QSD asset rebuild/install and authenticated `img.complete
&& img.naturalWidth > 0` proof remain separately authorised external work.


## Reviewer promotion verification — 14 October 2026
**Verdict: Proceed with safeguards.** Independently compared reviewed candidate `17e4ca2afd043d9462420d00ff8d3bdee4e86438` with WEX remote `main`: **identical, zero commits difference**. Promotion accepted for WEX source; Builder reports successful Pages workflow `38506288740` at that SHA. Remote heads still `main`, `Project-work-instructions`, `codex/studio-host-build-deps` (three-branch cap full). Failed deletion is a GitHub credential/permission issue, not a code failure. **BUILDER:DESIGNER housekeeping only:** using a Git-capable authorised `CodeByNath` executor, delete ONLY the verified fully-contained `codex/studio-host-build-deps` remote branch, then fetch/prune and report remaining exact remote heads; if permission remains unavailable, stop and report the blocker. No source modification or new branch. Keep real Logo visual acceptance open: QSD host assets still require separate governed installation and live authenticated image proof. Do not begin Dashboard refinements on source promotion alone.

## Builder branch-housekeeping report — 14 October 2026

No WEX source, main ref, deployment, QSD asset, or browser-runtime change was
made in this housekeeping attempt. Remote heads were verified as
`main` and `codex/studio-host-build-deps` both at
`17e4ca2afd043d9462420d00ff8d3bdee4e86438`, with the topic zero commits
ahead/behind `main`; `Project-work-instructions` remains separate.

Deletion was attempted only for that contained topic after successful promotion
and workflow `38506288740`. The terminal remains unauthorised (`WeeraX`
credential: GitHub HTTP 403). The browser surface signed into the connected
`CodeByNath` account was also used on the repository Branches page and
returned **“Branch could not be deleted.”** No detailed remote reason was
provided. The branch remains present.

Reviewer: inspect repository protection/permissions or assign a repository
administrator to remove only `codex/studio-host-build-deps`; do not reopen
source work or call visual Logo acceptance complete. QSD asset installation and
authenticated image proof remain separately governed.


## Reviewer final housekeeping assessment — 14 Oct 2026
**Verdict: Proceed with safeguards.** Independently verified remote branch list still contains `main`, `Project-work-instructions`, and `codex/studio-host-build-deps`. Builder reports command-line GitHub HTTP 403 and web UI “Branch could not be deleted”; no exposed integration here can delete the remote ref. The promoted WEX correction remains on `main` at reviewed `17e4ca2`. Close source/promotion review as accepted; **do not reassign deletion to Codex with the same denied credentials**. Owner/repository administrator must inspect GitHub branch rules and permissions and remove only the verified-contained topic branch `codex/studio-host-build-deps` when allowed. No force push, deletion of permanent branches, source rework, or QSD action through WEX. Visual Logo acceptance stays open pending independently governed QSD asset install and authenticated browser image proof.


## Reviewer cycle — 15 October 2026: Owner reports local UI refinements
Remote WEX heads verified: only `main` and `Project-work-instructions`; remote `main` remains `17e4ca2afd043d9462420d00ff8d3bdee4e86438`. Completed `codex/studio-host-build-deps` topic is gone. Thus **no pushed UI refinement candidate exists to audit**. Earlier branch deletion blocker is resolved; historical Logo work accepted visually on QSD staging (separate QSD record).

**BUILDER:DESIGNER — next bounded handoff:** Preserve Owner's existing local UI edits. Inspect local working tree, current branch and changes against WEX `main`, active WEX layout/presentation authority and agreed Owner-directed Dashboard refinement scope. Do not overwrite/discard uncommitted work. If changes fit the authorised visual iteration and no architecture/new-token/schema/identity/domain gate is crossed, create the one permitted topic branch, commit logically and push exact candidate to `CodeByNath/WEXdesigns`; verify remote SHA. Run relevant WEX checks and capture Header/Sidebar/Main/Footer responsive, focus/accessibility and interaction evidence. Update THIS work file with actual changed files, exact branch/SHA, check output, limitations and `AWAITING REVIEWER REVIEW`, then stop. If local edits require a new WEX visual value/contract or otherwise exceed approved scope, stop at the specific gate and report it, without inventing values or promoting/deploying. No QSD edits or deployment. Reviewer cannot accept changes that exist only locally.


## Reviewer UI refinement audit — 15 October 2026
**Verdict: Proceed with safeguards.** Owner confirmed they visually tested each adjustment and explicitly authorised promotion if WEX CSS/authority conditions pass. Reviewed pushed `codex/split-window-icons` against `main`: nine changed files, limited to Admin Station shell/Sidebar/runtime, WEX Header/Layout CSS, tests and foundation audit. Source inspection found **no inline `style` attributes, JS style assignments, raw colour literals or new global WEX token declarations**. Presentation rules use registered `var(--wex-...)` references; existing local sidebar geometry variables are recomposed from existing spacing tokens. The expanded/hover/compact sidebar and focus/inert behaviour are within the existing shell boundary; no schemas, adapters, domain records or shared components changed. This is source audit, not an independent runtime test; Owner reports manual visual tests. Branch is one commit ahead of WEX `main` and is not yet formally handed off.

**BUILDER:DESIGNER promotion instruction:** Verify exact remote SHA of `codex/split-window-icons`, execute `pnpm check`, foundation audit, typecheck and applicable Sidebar responsive/keyboard tests; report failures before attempting promotion. If all pass and the candidate remains unchanged, promote **that exact reviewed commit** to WEX `main` using permitted non-force workflow; verify remote SHA and CI. Do not add unreviewed changes or deploy QSD. Update SAME active file with SHA, test/CI evidence and branch outcome, stop for Reviewer. If any check fails, stop and submit bounded correction; do not self-approve. UI scope acceptance is for WEX source only, not automatic QSD staging installation.


## Reviewer check failure — 15 October 2026
**Verdict: Proceed with safeguards — no main promotion yet.** Builder reports `pnpm check` failed on UI candidate `ef684955`: TypeScript TS7006, implicit `any` parameter `hovered` in `apps/web-runtime/src/admin-station-sidebar.js` `setHoverRail(hovered)`. Independently verified untyped declaration in the pushed branch. `main` remains unmodified; Builder reports no ref or coordination changes and pre-existing untracked `.pnpm-store/` preserved.

**BUILDER:DESIGNER — bounded correction:** Add an explicit boolean JSDoc param annotation for `setHoverRail(hovered)`, preserving its existing behaviour. Check other new JS params for typecheck issues without widening UI scope. Run `pnpm check` plus required foundation audit/Sidebar checks. Commit/push correction on the SAME `codex/split-window-icons` topic, record exact new candidate SHA and check evidence in this same work file, set `AWAITING REVIEWER REVIEW`, and stop. Do NOT promote original `ef684955` or new corrected SHA to `main` until independent Reviewer verifies the correction and passes the promotion gate. No new tokens, CSS, interaction changes, QSD edits or deploy.


## Builder correction handoff — Phase 2A (15 October 2026)

Remote candidate: `origin/codex/split-window-icons` @
`943e7bea2e102e76475784114e311eac5ca37259`; final tree
`e3a31d7d9f20b5b1c0e29c4375a60a2ab8c6f567`.

Scope: the only net correction to reviewed candidate `ef684955` is an explicit
`@param {boolean} hovered` JSDoc annotation in
`apps/web-runtime/src/admin-station-sidebar.js`. This preserves all UI
behaviour, tokens, CSS, QSD boundaries, and the reviewed nine-file UI scope.

Evidence: `pnpm check` passed 45/45; `pnpm audit:foundation`,
`pnpm type-check`, focused Header/Sidebar tests (15/15), and `git diff
--check` passed. The remote final tree was fetched and exactly matched the
locally tested tree.

Publication note: the terminal `WeeraX` credential was denied push (HTTP
403). The connected `CodeByNath` GitHub account published the correction with
guarded ref updates. An initial API blob encoding mismatch created intermediate
commit `ca41b02`; it was immediately restored non-force in `943e7be`.
Reviewer must inspect the final net diff/tree and this two-commit history.
No promotion, deployment, QSD write, or presentation change occurred.


## Reviewer decision — 15 October 2026 (corrected candidate)
**Verdict: Proceed with safeguards.** Independently compared remote `943e7bea2e102e76475784114e311eac5ca37259` to originally approved `ef684955`. Net correction is only a `@param {boolean} hovered` JSDoc at `setHoverRail` in Admin Sidebar; original visuals, CSS, tokens, schemas and contracts unchanged. Remote comparison shows two intermediate commits with net change restricted to that file; Builder's handoff explains an API encoding correction. Builder supplied successful `pnpm check` 45/45, `pnpm audit:foundation`, `pnpm type-check`, 15/15 Header/Sidebar checks and clean diff; tests were not independently rerun by Reviewer. Owner previously tested visual behaviour and authorised promotion conditioned on checks.

**BUILDER:DESIGNER:** promote exactly `943e7bea2e102e76475784114e311eac5ca37259` (tree `e3a31d7d9f20b5b1c0e29c4375a60a2ab8c6f567`) to WEX `main` using approved non-force process. Verify remote main SHA and CI/workflow results, write exact promotion/verification evidence in this SAME file and stop. If GitHub refuses or CI fails, stop and report; do not force push or fabricate success. Do not deploy QSD or begin new scope. Reviewer performs final promotion acceptance from pushed evidence.
