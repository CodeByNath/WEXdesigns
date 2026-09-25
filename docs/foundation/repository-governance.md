# Repository Governance

## Scope

This Foundation rule governs repository operability: authored-file size, remote
branch capacity, and Code Map maintenance. It does not define WEX technical
contracts, product behaviour, or a replacement for architecture and accepted
decisions.

## Authored-file size

Authored Markdown and code/config files normally remain at or below 600 lines.
Only the Owner may explicitly approve a file above that working limit, and the
approval must be recorded in the active work file with the file, reason, and
removal or review point. No approval permits a new or changed authored file to
exceed 1,000 lines.

The existing current Colour, Typography, and Action/interaction authority is
approved only as an exception to the 600-line working limit. It remains subject
to the 1,000-line ceiling; the exception neither applies automatically to new
files nor authorises an unrelated expansion.

`packages/wex/src/foundations/typography.css` currently exceeds the absolute
ceiling. It is a migration gate: before Typography Pages work, replace it with
semantics-preserving modules and prove the bundle, selectors, cascade, and
focused verification have not changed. Its Code Map records the required route.

The hash-bound historical WEX source and composition architecture also exceed
the ceiling. They must not be casually edited to satisfy this rule: the Owner
must choose a separately authorised preservation or modularisation path before
their next substantive change. Until then, do not expand them.

## Remote branch capacity

There may be at most three remote branches, including `main` and
`Project-work-instructions`. Normal operation is those two permanent branches
and one authorised topic branch. Confirm remote heads before opening a topic
branch. After an accepted topic is promoted and independently verified, remove
that topic branch before opening the next one.

## Code Maps

For a demonstrated subject, its Code Map is the first operating stop before
opening large authority or implementation files. The map must put current
verification metadata and recent work first, then provide concise navigation to
the governing authority, source paths, focused checks, dependency boundary,
safe-change route, and related documents.

Code Maps are maintained navigation and operating evidence. They may point to
important guidance but do not restate or compete with product, architecture,
decision, or source authority. The owner of a changed mapped subject refreshes
its map in the same authorised work when paths, boundaries, authority, or safe
routing change.
