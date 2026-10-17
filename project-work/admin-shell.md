# Admin Shell / Admin Station Layout

Status: BLOCKED — DECISION REQUIRED: WEX pointer sequence regressed below QSD accepted baseline
Phase: 8 — Logo leading-inset source and immutable Studio delivery complete

## Completed WEX delivery — 17 October 2026

The accepted Logo source change `0a2e15ffc16790b7b117b5e7a398a32e44dddae6`
is now included in the published WEX Studio release chain.

- WEX `main`: `d82094b659a5d23900fb694f0e9e5ab7882e113d`.
- Build guard: `bace0c02f8eea0accc0a34abe50b9b3f9495f04a` disables Vite public
  copying for the host build, so an immutable release cannot embed the retained
  release tree. Release and pointer tests now validate that boundary and the
  committed pointer's predecessor.
- New immutable release:
  `wex-studio-v1-bace0c02f8eea0accc0a34abe50b9b3f9495f04a`.
- Staging pointer: sequence `2`, `advance`, with the prior verified release
  retained; manifest digest
  `sha384-3jlxXA+kdS1C6tVotcpGbVU2jDy9obPhyY/K3VE1Iw+e7qDyvQwAEEbwzflIERil`.
- Verification: 23 focused tests passed; release-tree, pointer-chain,
  foundation, and whitespace checks passed; the WEX Pages `verify-live`
  command verified the public pointer and manifest.
- Housekeeping: the publication branch was proven identical to `main` and
  removed. Remote heads are only `main` and `Project-work-instructions`.

## Boundary

WEX publication is proven. No QSD source or deployment was read or changed.
QSD staging adoption is not claimed and remains for the Owner's independent
runtime check. Historical Admin Shell phases and their review evidence remain
in this file's Git history.

## Delivery regression — Reviewer finding, 18 October 2026

**Stop — architectural risk.** Owner reports newer WEX UI changes do not appear in QSD Studio. Verified WEX `main` `74218dae988042d69c6a21c39297c66e4e0c7100` now commits a **sequence-2** staging pointer to release `wex-studio-v1-bace0c02f8eea0accc0a34abe50b9b3f9495f04a`, following recent `revert(studio)` commits `84675c6d`/`74218dae`. QSD staging's earlier server-executed diagnostic at deployed `047cdc12` proved it had durably accepted **sequence 4**, release `wex-studio-v1-dbfda088830bbb14ad38996e6d16960b0585f9b1`. QSD's approved anti-replay contract rejects pointer sequence decreases. Thus a WEX pointer restored to 2 is **not a valid rollback** for that consumer; normal source Git reversions are not equivalent to an approved pointer rollback. This is a reproducible cross-repository contract mismatch; do not blame a cache or falsely report UI delivery success.

**Next step — Reviewer/Owner decision required:** first verify the live published Pages pointer and current intended WEX UI source/release; do not blindly restore a previous pointer or change QSD's anti-replay state. Authorise a new, valid higher-sequence pointer transition (with accepted chain/rollback semantics and retained verified release) after checking WEX ADR 0025 and producer rules. If the consumer has seen sequence 4, the next WEX pointer must not be lower; check the continuity limitation and resolve through approved protocol before any publication. WEX Builder must remain WEX-only; any QSD runtime evidence is supplied by Reviewer. No production changes. Do not close until the actual QSD `/studio/` UI shows the Owner-approved result.
