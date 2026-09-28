# Admin Shell

Status: BUILDER ACTION REQUIRED
Phase: 3 — Promote Pages workflow correction and close Admin Shell

## Reviewer verdict

**Proceed with safeguards**

Accepted Admin Shell implementation:
`f75afb8524c272f62708cc64d163980176150f07`.

Current `main`:
`f75afb8524c272f62708cc64d163980176150f07`.

## Reviewer acceptance — workflow correction

Reviewer independently verified
`137d8f9db212eb9c7630fd401321f39e439e8249` is exactly one commit ahead of
current `main`, changing only `.github/workflows/deploy-pages.yml`. It builds
Schemas and Shared UI before runtime validation, preserving Node 24, pnpm
11.16.0, and the existing deployment chain. The exact dependency-build,
type-check, test, and production-build sequence passed independently; no Admin
Shell, WEX, schema, runtime presentation, or product source changed.

## Builder promotion instruction

1. Fast-forward only `137d8f9db212eb9c7630fd401321f39e439e8249` to `main`.
2. Verify `origin/main` equals that SHA and GitHub Pages succeeds for it.
3. In Chrome, validate the hosted Component Manager’s Admin Shell at Large
   1440px, Medium 1024px, Compact 767px, Fluid, light/dark, keyboard/focus,
   and Header/Sidebar/Main/Footer landmarks.
4. Confirm the hosted shell is structural before Component Manager fixture
   population and contains no domain/product behaviour.
5. Only after those checks, delete `feat/admin-shell` and verify remote heads
   are exactly `main` and `Project-work-instructions`.
6. Update this file to `AWAITING REVIEWER REVIEW` with promotion, Pages,
   browser, and branch-housekeeping evidence; stop.

## Boundary

This accepts the minimal reusable Admin Shell and the Pages tooling correction.
Runtime Admin Station integration and later pluggable components remain
separate work.

Runtime Admin Station integration and later pluggable components remain
separate work.
