# Button System Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Slice 1B submitted — Button geometry authority proposal

## Submitted Proposal

Branch: `docs/button-geometry-authority`
Remote SHA: `88538039435fb15507cd4486a0caf389f5b8ef56` (verified with `git ls-remote`)

Changed file: `docs/decisions/0006-button-geometry-authority.md` only.

## Authority Inspected

- historical WEX Button Foundation and global-tier guidance in `packages/wex/src/source/WEX-SOURCE.md`;
- accepted ADRs `0004` and `0005`;
- verified `main` Button foundation plus current `spacing.css`, `sizing.css`, `typography.css`, and `interaction.css`.

The ADR identifies the genuine gap: existing authority provides Navigation tier typography, spacing primitives, and a 2px focus width, but no Button outer-size, padding, border-width, radius, or focus-offset decision. It treats recovery-branch geometry as non-authoritative and rejects its conflicting typography.

## Proposed Values

| Tier | Minimum block | Block / inline padding | Typography |
| --- | --- | --- | --- |
| Small | 32px | 4px / 12px | Navigation Small Semibold, 14px / 20px / 600 |
| Default | 40px | 4px / 16px | Navigation Default Semibold, 16px / 24px / 600 |
| Large | 48px | 8px / 24px | Navigation Large Semibold, 20px / 28px / 600 |

All variants share tier geometry. The proposal specifies a stable 1px border, radius 0, 2px focus outline with 2px offset, and no new primitives.

Unresolved question: none within this authority proposal; acceptance remains Reviewer-owned. No schema, CSS, shared UI, runtime, catalogue, Pages, adapter, icon, domain, or historical-source implementation change was made. `pnpm audit:foundation` passes under Node `v24.21.0` / pnpm `11.16.0`.
