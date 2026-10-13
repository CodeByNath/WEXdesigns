# QSD /studio — WEX Dashboard host integration

Status: BUILDER ACTION REQUIRED — Phase 1B WEX Logo consumer
Phase: 1B — QSD Profile Logo data consumption / presentation boundary
Actor: BUILDER:DESIGNER (Codex + ChatGPT); Reviewer after pushed evidence

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
