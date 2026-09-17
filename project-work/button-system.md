# Button System Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Slice 1C submitted — accepted Button geometry implementation

## Submitted Candidate

Branch: `feat/button-geometry-slice`
Remote SHA: `f514db3d9894ad277aacdea9fcbcc2704c6618c0` (verified with `git ls-remote`)

The candidate applies ADR 0006 only: tier classes map the existing serializable tier to Small 32px / 4px / 12px, Default 40px / 4px / 16px, and Large 48px / 8px / 24px geometry; each maps to the existing Navigation typography tier. It applies a stable 1px border, radius 0, existing 2px focus width with 2px offset, and shared geometry across all five variants. No schema or transient presentation input changed.

## Exact Changed Files

- `packages/ui/src/components/button.ts`
- `packages/ui/test/button.test.mjs`
- `packages/wex/src/foundations/buttons.css`
- `packages/wex/test/button-foundation.test.mjs`
- `tooling/scripts/validate-foundation.mjs`

## Verification Evidence

- `pnpm -C packages/ui test` — pass
- `pnpm -C packages/wex test` — pass
- `pnpm exec node tooling/scripts/validate-foundation.mjs` — pass
- `pnpm check` — pass under Node `v24.21.0`, pnpm `11.16.0`

Unresolved issue: none. The complete check reports its existing Turborepo lockfile/output warnings only. No runtime or Pages deployment was performed.
