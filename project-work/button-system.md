# Button System Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Slice 1A correction submitted — transient presentation state removed from schema

## Corrected Candidate

Branch: `feat/button-foundation-slice`
Remote SHA: `46bdaf04ac1e90d49b908417321d9363888e6970` (verified with `git ls-remote`)

The reviewer-requested boundary correction removes `ButtonStateSchema`, all authored `state` data, shared-UI state output, and CSS data-state selectors. The serializable definition now retains only the authored `disabled` boolean. WEX continues to own native `:hover`, `:active`, `:focus-visible`, and `:disabled` presentation. The schema is strict, so transient state cannot enter the contract.

## Exact Changed Files

- `apps/web-runtime/test/catalogue.test.mjs`
- `packages/schemas/src/components/button.schema.ts`
- `packages/schemas/src/index.ts`
- `packages/schemas/test/foundation.test.mjs`
- `packages/ui/package.json`
- `packages/ui/src/components/button.ts`
- `packages/ui/src/index.ts`
- `packages/ui/test/button.test.mjs`
- `packages/wex/src/foundations/buttons.css`
- `packages/wex/test/button-foundation.test.mjs`
- `tooling/scripts/validate-foundation.mjs`

## Verification Evidence

- `pnpm -C packages/schemas test` — pass
- `pnpm -C packages/ui test` — pass
- `pnpm -C packages/wex test` — pass
- `pnpm exec node tooling/scripts/validate-foundation.mjs` — pass
- `pnpm exec node --test apps/web-runtime/test/catalogue.test.mjs` — pass
- `pnpm check` — pass under Node `v24.21.0`, pnpm `11.16.0`

Unresolved issue: none. The successful repository check reports its existing lockfile/output warnings only. No runtime or Pages deployment was performed. Awaiting Reviewer re-inspection; do not move the candidate to `main`.
