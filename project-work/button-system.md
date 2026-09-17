# Button System Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Slice 1A submitted — Button contract and WEX presentation foundation

## Submitted Candidate

Branch: `feat/button-foundation-slice`
Remote SHA: `46549a79a138621295889f49288960c5c39d977a` (verified with `git ls-remote`)

Implements only the authorised Slice 1A contract: closed `primary | neutral | subtle | warning | danger` variants; ordinary default, hover, transient pressed, disabled, and focus states; WEX-owned semantic state tokens with no Button geometry; and platform-neutral shared Button presentation. `secondary`, `ghost`, persistent selection, `aria-pressed`, runtime/catalogue/adapters/domain work, and `WEX-SOURCE.md` changes are absent.

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
- `pnpm exec node --test apps/web-runtime/test/catalogue.test.mjs` — pass
- `pnpm exec node tooling/scripts/validate-foundation.mjs` — pass
- `pnpm lint` — pass (preliminary Node 22 run)
- `PATH="/opt/homebrew/opt/node@24/bin:$PATH" pnpm check` — pass, Node `v24.21.0`, pnpm `11.16.0`

Unresolved issue: none. The complete check reports pre-existing Turborepo warnings about the intentionally absent lockfile and declared task outputs; it exits successfully. No runtime or Pages deployment was performed.
