# Admin Shell — Studio staging pointer recovery

Status: BUILDER ACTION REQUIRED — WEX historical pointer-chain restoration
Phase: Recovery R1 — republish retained canonical sequence 3 → 4 → 5, separately verified
Actor: BUILDER:CODER (WEX only)
Repository: `CodeByNath/WEXdesigns`

## Authority and verified recovery baseline
Reviewer independently verified QSD staging (read-only diagnostic CI `39064307694`): `sequence:4`, release `wex-studio-v1-dbfda088830bbb14ad38996e6d16960b0585f9b1`, digest `sha384-0+STLz7avZBN2Frh+XZBkhg6XrdkspK0OUyrrWK+/PzV0BuKtxN4XfgbSABnOZiV`, `nonMutating:true`. This is Reviewer-provided cross-repository evidence; **WEX Builder must not access QSD repo or runtime**. WEX `main` currently `74218dae`; its pointer is incorrectly rewound to sequence 2. WEX ADR 0025 permits only incremental `sequence+1`, exact previous linkage, retained immutable assets, and Reviewer-approved promotion.

Original **previously published** canonical pointer files and release manifests remain in WEX Git history:
- Sequence 3: at `f8842acb`, release `e9f782b939fb0c49b865ce597050d27eace94f0e` (previous=2).
- Sequence 4: at `58f7794e`, release `dbfda088830bbb14ad38996e6d16960b0585f9b1` (previous=3).
- Sequence 5: at `4e294395`, release `1d7784ac182e998954d28463eb4099533829904a` (previous=4, QSD's current accepted release).
All are retained in `main` release tree. Re-publishing the **unchanged historically approved pointer records** in strict order is an integrity-preserving recovery, not a new or forged release. Do not reuse these sequence numbers with different release identities.

## Exact approved WEX Builder package
1. Verify actual WEX `main`, ADR 0024/0025, pointer producer/verifier, Pages workflow, retained release digests, historical JSON contents and branch capacity (currently just `main` and `Project-work-instructions`). Use only this repository.
2. Restore sequence **3** pointer **byte-for-byte** from `f8842acb` onto current `main` via normal non-force commit; run pointer/release verification and relevant tests; promote using repository's approved workflow; confirm Pages CI and **live** pointer=3 before continuing.
3. Repeat for historical sequence **4** from `58f7794e`, then sequence **5** from `4e294395`. Each is a **separate** validated main/Pages publication with live verification and its exact immediate predecessor; do not skip, rewrite or alter the historical payloads. Stop immediately if verifier, immutable-release guard, ancestry check, Pages publish, or live state disagrees. Do not change WEX UI, definitions, QSD, production, or release-security logic.
4. After confirmed live sequence **5**, stop and report exact three WEX publication commit SHAs, CI/live evidence, and final pointer manifest/release. Update THIS file to `AWAITING REVIEWER REVIEW`. **Do not auto-advance to sequence 6 or 7.** Reviewer independently checks QSD's actual adoption and separately authorises any next WEX UI release/rollback. Browser-visible design outcome is not claimed by pointer tests alone.

This is a bounded recovery of already published releases under existing ADR 0025; no new abstraction or permanent protocol is approved. The earlier Admin Shell/Logo phases are historical and not reopened. No QSD Builder action.
