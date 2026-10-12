# QSD /studio — WEX Dashboard host integration

Status: AWAITING REVIEWER REVIEW
Phase: WEX Phase 1A — host-portable Dashboard mounting only; identity protocol gate deferred
Actor: Reviewer
Builder closeout: 2026-10-12

## Completed exact-SHA promotion

Reviewer-approved candidate `8409ae51f74dfe9ffb22b1b284c2a44c1a5eba8f`
(`feature/qsd-studio-host-phase-1a`) was confirmed as a fast-forward descendant
of prior `main` `2fd8c718c2044c8965f85194fd150b55303420e0`, with the
candidate tree matching the reviewed source tree. It is now promoted to
`main`.

Final `main`: `02bbfb0e05702ab2b8beee629d2c328644d91c15`.
Its parent is the promoted source SHA above; the only follow-up is factual
Code Map routing metadata in `docs/code-map/admin-shell.md` for the new
portable-host paths and verified-main SHA. It does not change product code,
architecture, presentation, identity, storage, QSD interaction, or scope.

The promotion-triggered GitHub Pages workflow `Deploy WEX index`, run
`38207957530`, completed successfully for source SHA `8409ae5`.

## Builder evidence

- `tsc -p apps/web-runtime/tsconfig.json --noEmit` — pass.
- Standard Vite build and Studio-host Vite build — pass; the host emits
  relative manifest asset paths.
- `node --test apps/web-runtime/test/*.test.mjs` — 16/16 pass, including
  three host manifest/mount/isolation checks.
- `node tooling/scripts/validate-foundation.mjs` — pass.
- Local Chrome fixture evidence: empty host shell mount, visible keyboard skip
  focus, desktop Sidebar toggle, 375px drawer with Escape focus return, and
  missing-mount recovery with no shell.

## Boundaries and Reviewer checks

Remote heads: `main`, `Project-work-instructions`, and the completed
topic branch only. The topic branch is fully contained in `main` but remains
intentionally: deletion is destructive and was explicitly left gated by the
Reviewer.

No QSD source, QSD deployment, storage/API/identity/bootstrap call, business
data, QSD ID, or staging/live QSD runtime action occurred. The current QSD
single JSON-blob identity API remains incompatible with WEX's required atomic
adapter lifecycle and is DEFERRED.

Before closing/deleting the topic, Reviewer must confirm the final `main`
metadata-only follow-up and independently decide the next state. Actual QSD
`/studio/` host installation remains separately authorised work; its
authenticated/unauthenticated behaviour, asset loading, WEX-only styling,
responsiveness, focus, and missing-mount recovery have not been live-validated.
