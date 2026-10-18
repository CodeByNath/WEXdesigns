# Admin Shell — Studio delivery correction

Status: ACCEPTED — WEX D1; QSD sequence-6 adoption UNVERIFIED (gap risk)
Phase: Delivery D1 — CLOSED; QSD runtime/UI evidence separately outstanding
Actor: REVIEWER — consumer state and rendered UI acceptance pending
Repository: `CodeByNath/WEXdesigns`

## Reviewer verified defect — 18 October 2026
WEX `main` at `583474a1fb8a5cb7f0719db48ae5ccb03eb47149` includes recent header fix `8ec9dc6e` and compact drawer trigger marker `583474a1`. But `apps/web-runtime/public/studio-releases/staging-pointer.json` **still points at sequence 5**, release `wex-studio-v1-1d7784ac182e998954d28463eb4099533829904a`; its immutable manifest says `sourceSha:1d7784ac182e998954d28463eb4099533829904a`. Therefore newest WEX source/UI edits CANNOT appear in QSD via the current release contract. Successful `Deploy WEX index` on a CSS-only source change is NOT evidence of a newly promoted Studio release. The current pointer's previous sequence=4 is correctly restored and must not be reset. This is a WEX producer packaging/promotion omission, **not verified as a QSD connection failure**.

## Exact bounded Builder task
1. On WEX only, read ADR 0024/0025, the existing Studio release/pointer tooling, Pages workflow, actual UI commits on `main`, relevant tests and `project-work/AGENTS.md`. Do not access QSD. Keep the existing `main` + instruction branch model.
2. Using the existing approved release tooling, **build one new immutable Studio host release from current reviewed WEX `main`** incorporating the header correction and the compact drawer trigger marker, if those changes are in the compiled Studio host CSS. Verify the resulting manifest `sourceSha`, CSS, manifest checksums and immutable retention. If the compiled output does not consume these WEX styles, stop and report exact import/build disconnect; do not fake a release.
3. Publish it on `main` with the next monotonic staging pointer **sequence 6** and `previous` matching the published sequence-5 record **exactly**; use normal non-force commits, no pointer resets, modified old assets, production rollout, new design values or protocol weakening. Check ADR 0025's change/ancestry requirements and existing release-proposal commands before writing; prefer safe tooling rather than hand-crafted pointer JSON.
4. Run required WEX tests, pointer/release integrity verification, Pages CI and **live** `verify-live` proving pointer=6 and manifest points to the newly built release. Report exact commit/ref, new releaseId, sourceSha, CSS asset path/checksum, tests and workflow run. Set this file to `AWAITING REVIEWER REVIEW` and stop. Do not claim QSD visible without runtime proof.
5. Reviewer then checks resulting WEX producer evidence and QSD staging adoption/browser UI separately. No QSD Builder work until a verified QSD-specific defect is found.

**Scope exclusions:** Do not redesign Header, change UI beyond already-committed corrections, modify QSD, touch old immutable releases, bypass anti-replay, or conflate website Pages deployment with Studio release publication. Execute this bounded release packaging/promotion task without asking Owner to decide implementation minutiae. Stop only for newly evidenced architecture or tooling contradictions.

## Delivery D1 complete — 18 October 2026, BUILDER:CODER (Claude Code)

Confirmed the CSS-consumption path before building: `apps/web-runtime/src/studio-host.js` imports `admin-station.css`, which imports `packages/wex/src/index.css`, which imports both `header.css` (commit `8ec9dc6`) and `layout.css` (commit `583474a1`). Both fixes are compiled into the Studio host bundle; no import/build disconnect.

Built from WEX `main` `583474a1fb8a5cb7f0719db48ae5ccb03eb47149` (clean tracked worktree; one incidental untracked local `.pnpm-store/` cache directory, unrelated to any branch, was removed first) via `node tooling/scripts/studio-release.mjs`:

- **New release**: `wex-studio-v1-583474a1fb8a5cb7f0719db48ae5ccb03eb47149`, manifest digest `sha384-KaKuzmkI0BUA8rVQeJ6ZX/d1/Bd0RYcALzqEiU+WFWw4Ji2MwzTbw9/fRiRoeDNB`. Verified byte-for-byte via `verifyReleaseDirectory`. Committed to `main` at `f88c675` (75 files, additive only — no existing release directory touched).
- **Pointer**: proposed and verified via `studio-staging-pointer.mjs propose`/`verify` — sequence 6, `previous` exactly matches the retained sequence-5 record (release `1d7784ac…`, digest `sha384-v2ZHYL6F…`). Committed to `main` at `f066614`.
- **Checks**: `pnpm --filter @weerax/web-runtime test` 27/27 pass (run both before and after the pointer commit). `node tooling/scripts/verify-studio-releases.mjs --base 583474a1…` exit 0. `node tooling/scripts/studio-staging-pointer.mjs verify --base f88c675…` exit 0.
- **Push**: `git push origin main` — fast-forward `583474a1 → f066614`, no force, no history rewrite.
- **Pages CI**: workflow run `39106331238` (head `f066614`) completed successfully (confirmed via the public Actions API, read-only, no `gh` auth used).
- **Live verification**: `node tooling/scripts/studio-staging-pointer.mjs verify-live --url https://codebynath.github.io/WEXdesigns/` → `verified live staging pointer and manifest`. Live pointer confirmed `sequence:6`, releaseId `wex-studio-v1-583474a1fb8a5cb7f0719db48ae5ccb03eb47149`.

WEX `main` is now at `f066614`, live sequence 6. No sequence 7 advance was made. No QSD repo/runtime was accessed from this Builder role; this is WEX producer-side evidence only, not a QSD adoption claim. No Header redesign, no UI change beyond the two already-committed/reviewed fixes, no existing release directory modified, no anti-replay bypass.

**Reviewer**: independently verify the pushed commits/live state and separately check QSD's actual adoption of sequence 6.

## Reviewer D1 acceptance — 18 October 2026

**Verdict: Proceed with safeguards.** Independent diff `583474a1..f066614` changes only 76 files under `apps/web-runtime/public/studio-releases/`: one new retained release directory and staging pointer; no older release or source UI edits. `main` head `f066614aef8a09eb02be6f2f4d1b3a911357c11b` has sequence **6** with predecessor exactly sequence 5, new release `wex-studio-v1-583474a1fb8a5cb7f0719db48ae5ccb03eb47149`, manifest `sourceSha=583474a1…`, and stylesheet `assets/wex-studio-host-DRXeqtAx.css`. Authenticated Pages deploy job `117612857009` from run `39106331238` succeeded and explicitly logged successful staging pointer verification and **live** pointer+manifest verification. The new release now includes the source revision with the approved header/UI corrections. **WEX D1 accepted and closed.** QSD's acceptance of sequence 6 and actual rendered dashboard are not established by this producer-side evidence; keep end-to-end integration open until separately verified. Do not start another WEX Builder job solely to investigate a hypothesised consumer problem.

## Reviewer QSD integration check — 18 October 2026

Connected Browser tab `https://www.staging2.qldscubadive.com.au/studio/` returned Studio page with Logo and sidebar controls, but its text context exposes neither loaded release identity nor visual CSS state. Independent QSD staging source `StudioStagingPointer::resolvePin()` shows a strict `chainsFromStored()` check: an incoming pointer sequence 6 with `previous:5` **will be rejected if persisted state remains sequence 4**. Last QSD durable read at 2026-10-17 19:53 UTC was sequence 4. WEX has since published 5 and then 6; no fresh QSD durable reading proves whether QSD ever adopted 5 during the interval. Thus the source-to-release producer is fixed, **consumer delivery is conditional and still not accepted**. Do not falsely assert QSD is on 6 or visually corrected. Next read-only QSD stored-state observation must establish sequence and releaseId; if state=4, a bounded approved catch-up strategy is needed that preserves exact historical manifest integrity and no anti-replay weakening. Don't repeat WEX release packaging or change QSD speculatively.
