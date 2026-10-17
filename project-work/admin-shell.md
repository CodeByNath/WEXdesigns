# Admin Shell / Admin Station Layout

Status: BLOCKED — ARCHITECTURE DECISION: WEX producer pointer reset requires accepted recovery protocol
Phase: delivery regression recovery — cross-repository baseline verification before Builder

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

## Recovery investigation — 18 October 2026

Reviewer verified WEX `main` `74218dae` points at sequence **2**, but historical producer commits show an approved sequence **5** (`4e294395`, release `1d7784ac…`, previous sequence 4 `dbfda088…`) and **6** (`19f87e3a`, release `4a7fb552…`, previous sequence 5). The QSD real-server diagnostic previously showed persisted sequence **4**. Its actual *current* durable sequence has not been rechecked after 5/6 were published. QSD rejects stale or unchained pointer updates; **do not blindly publish sequence 5 or 7** or reset consumer state. All seven retained release directories still appear in WEX `main` repository tree.

**Reviewer owns cross-repository contract evidence**, not either Builder. Next: obtain a fresh read-only QSD server-side diagnostic for the current `storedSequence`/releaseId/digest (through an authorised existing diagnostic route/job; no production deployment), verify published Pages pointer and the last legitimate historical release chain, then prepare an exact phase-bounded WEX-only instruction that restores monotonic pointer ancestry with a retained verified release representing Owner-approved UI. If QSD is at sequence 4 while producer history went to 6, there is no safe one-step new pointer chain from both baselines with current single-previous pointer contract. Raise the precise architecture gate for Owner decision rather than spoofing continuity or weakening anti-replay. The intended user-visible UI state after source reversions must be identified before picking a release. No WEX or QSD source changes/rollback/production promotion are authorised by this investigation. Close only after a real `/studio/` visual proof.

## Verified QSD baseline — 18 October 2026

Reviewer completed QSD Phase 1K independent live, read-only verification: deployment run `39064307694` log of CLI `inspectStoredState()`, `nonMutating:true`, QSD persisted `sequence:4`, release `wex-studio-v1-dbfda088830bbb14ad38996e6d16960b0585f9b1`, digest `sha384-0+STLz7avZBN2Frh+XZBkhg6XrdkspK0OUyrrWK+/PzV0BuKtxN4XfgbSABnOZiV`, contract `wex-studio-host@1` (read timestamp 2026-10-17 19:53:41 UTC). QSD Builder is complete; no further QSD work assigned.

**Recovery authority gate:** WEX current producer pointer is sequence 2, while its historical approved pointer sequence 5 names QSD's sequence-4 release as predecessor and historical sequence 6 follows sequence 5. QSD's persisted sequence 4 requires pointer `previous` to match sequence 4 exactly for a *single-step* valid move, while WEX ADR 0025 and producer verification require publishing from the existing live sequence with +1 and matching predecessor. A direct pointer jump from current sequence 2 to a synthetic sequence 5 violates producer authority. There is no single approved WEX-only move satisfying both chains. Reviewer must resolve a one-time recovery protocol through WEX authority (normally an ADR amendment) rather than instruct Builder to fake sequence/previous, reset QSD, or bypass replay protection. Do not claim the dashboard fixed or hand off an impossible implementation. The verified QSD state is sufficient; do not ask Owner or QSD Builder for the same diagnostic again.
