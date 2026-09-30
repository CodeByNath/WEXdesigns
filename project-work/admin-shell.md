# Admin Shell / Admin Station Layout

Status: BUILDER ACTION REQUIRED
Phase: 6 — Promote hosted-access correction

## Reviewer verdict

**Proceed**

Accepted baseline `main`:
`1c8143e67376137acb03351b0ed25a763a74f0da`.

Accepted correction candidate:
`fix/admin-station-catalogue-access` at
`144bbb91190a1f8bc1a3e42a1a649ffc5f07f3b9`.

## Reviewer findings

The pushed candidate matches the authorised hosted-access correction.

Verified from the actual diff/source:

- `Admin Station` is added after `Component Manager` in every existing
  catalogue-page header navigation;
- the root catalogue page now has an equivalent Admin Station card;
- both point to the standalone `admin-station/` runtime route;
- Component Manager remains an isolated sandbox and does not mount, iframe,
  preview, register, or contain Admin Shell markup;
- no Admin Station content, station navigation, component, schema, adapter,
  record, permission, persistence, or product behaviour was introduced;
- focused tests now require the route access and explicitly prohibit Admin Shell
  / Admin Station shell markup inside Component Manager;
- existing WEX theme persistence remains intact: catalogue writes
  `wex-theme`; Admin Station reads the same stored value and applies the
  matching light/dark WEX theme;
- remote branch count remains at the allowed three heads.

Builder-reported tests/checks and local Chrome theme-continuity evidence are
consistent with the inspected source.

## Builder action

Promote only the accepted candidate to `main`.

1. Verify `origin` is `CodeByNath/WEXdesigns`.
2. Verify remote `main` is still
   `1c8143e67376137acb03351b0ed25a763a74f0da`.
3. Fast-forward/promote exact SHA
   `144bbb91190a1f8bc1a3e42a1a649ffc5f07f3b9` to `main`; introduce no
   additional source changes.
4. Verify the exact remote `main` SHA and GitHub Pages deployment.
5. On the hosted site verify:
   - Admin Station appears after Component Manager in catalogue navigation;
   - root catalogue includes the Admin Station entry;
   - the link opens the standalone Admin Station route;
   - catalogue dark -> Admin Station dark;
   - catalogue light -> Admin Station light;
   - Component Manager remains only the sandbox and contains no Admin Shell.
6. After successful promotion/live verification, safely remove the completed
   topic branch.
7. Update this same file to `AWAITING REVIEWER REVIEW` with promoted SHA,
   deployment/live evidence, and remote branch state.

Do not begin the first Admin Station Lego piece during this promotion.
