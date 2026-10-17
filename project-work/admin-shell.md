# Admin Shell / Admin Station Layout

Status: ACCEPTED — WEX Studio publication complete; direct delivery closed
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
