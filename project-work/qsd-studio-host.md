# QSD /studio — WEX Dashboard host integration

Status: ACCEPTED — Phase 1A; authorized branch cleanup pending
Phase: 1A source closeout
Actor: Reviewer complete; separate host deployment authorization pending

## Owner contract
QSD /studio hosts WEX's existing independently styled Dashboard; /station remains untouched. WEX owns all presentation (Header, Sidebar, Main, Footer, existing Logo fitting, Heroicons), and QSD owns route, session/capability gate, protected host storage and asset-delivery infrastructure. Dashboard Body is empty; no QSD records, components, business-logo plug or direct WordPress database usage.

## Verified WEX implementation
Reviewer verdict: **Proceed with safeguards** (12 October 2026).
Builder candidate `feature/qsd-studio-host-phase-1a` = `8409ae51f74dfe9ffb22b1b284c2a44c1a5eba8f`, promoted to WEX `main`. Final main = `02bbfb0e05702ab2b8beee629d2c328644d91c15`; independent comparison confirms its only post-candidate change is factual `docs/code-map/admin-shell.md` routing metadata. GitHub Pages run `38207957530` succeeded at source SHA `8409ae5`. Builder reports TypeScript/Vite, 16 web-runtime tests, foundation validation and local responsive/keyboard fixtures passed; Reviewer inspected pushed source/diff, but did not rerun those tests or validate live QSD runtime.

WEX host bundle: `apps/web-runtime/vite.studio-host.config.ts` produces relative assets and versioned `manifest.json` (`entry`, `styles`, `version`). Installer instructions at `apps/web-runtime/studio-host/README.md`; entry mounts existing Dashboard at `#qsd-studio-host`, with no identity/storage/API calls. Standalone Admin Station remains. No QSD source was changed.

## Accepted QSD prerequisite
QSD `main` = `69a106bc7be0de7325f3010664991356e0b89f18`, GitHub Actions `38192006500` successful. QSD host assets belong under its plugin `studio-assets/`; /studio permission gate and mount supplied by QSD. QSD staging, private-root configuration, asset installation and browser checks have NOT happened.

## Outstanding separate gates
1. **Housekeeping:** WEX completed topic branch still exists. Fresh remote heads: `main`, `Project-work-instructions`, `feature/qsd-studio-host-phase-1a` (three-branch cap). Verify branch ancestry; request Owner authorization before destructive remote deletion. No new WEX topic branch until capacity is free.
2. **QSD installation/staging:** requires separate Owner-authorized phase in QSD governance. Install WEX release assets without modifying /station, configure administrator-verified private `QSD_STUDIO_PRIVATE_ROOT` if identity bootstrap will later be used, and perform real HTTP denial, authenticated/unauthenticated access, asset, responsive, keyboard/focus and error checks. Do not automatically initialize storage.
3. **Identity protocol:** DEFERRED. QSD single-blob GET/PUT storage/identity is not compatible with accepted WEX atomic reserve/transition/lookup adapter. No client-side read-modify-write workaround or new persistence protocol. Require an independently approved host adapter API before resuming identity. Each QSD business-data plug requires explicit separate Owner direction.

**Next:** Reviewer closeout complete. No implementation or deployment authorised by this file; route separate QSD staging decision through QSD's own work cycle.


## Owner-authorized branch retirement — 12 October 2026
Owner explicitly approved closing completed WEX topic branch `feature/qsd-studio-host-phase-1a`. Reviewer freshly verified `main` `02bbfb0e05702ab2b8beee629d2c328644d91c15` is **ahead by one metadata-only commit** of topic `8409ae51f74dfe9ffb22b1b284c2a44c1a5eba8f` with `behind_by=0`: all topic commits are on main. Remote heads currently main, Project-work-instructions, and that topic only.

**WEX Builder housekeeping only:** Verify remote repo and refs again; delete **only** remote `feature/qsd-studio-host-phase-1a` if it remains fully merged into `main`, then verify and record final two remote heads in this same file. This explicit Owner approval authorizes that deletion; no new topic branch, WEX source modification, deploy, QSD work, or next implementation phase. Stop after cleanup. Reviewer execution surface cannot delete remote Git refs, so this must run in Git-capable VS Code Builder.
