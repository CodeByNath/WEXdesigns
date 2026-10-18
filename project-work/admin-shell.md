# Admin Shell — Studio delivery correction

Status: BUILDER ACTION REQUIRED — package latest WEX UI into QSD-consumable Studio release
Phase: Delivery D1 — build, retain, publish and verify one current WEX Studio release
Actor: BUILDER:CODER (WEX only)
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
