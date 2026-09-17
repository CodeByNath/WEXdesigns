# Button System Work Cycle

Status: BUILDER ACTION REQUIRED  
Phase: Slice 1 — Button Authority and WEX Foundations

## Reviewer Assignment

Reviewer authorises Builder to perform **authority-resolution work only** for Slice 1.

Builder must inspect current `main` authority and prepare the minimum Button ADR/authority proposal needed to resolve the five open decisions below. Builder may update this coordination file with its report, but must not implement Button foundations, tokens, renderer, schemas, adapters, catalogue, or runtime work until Reviewer explicitly approves the authority proposal and issues the next instruction.

Only Reviewer may approve or refuse the proposal, issue the phase verdict, authorise implementation, change phase/status, or pass new work.

## Planning Reference

Use the current approved **WEX Button System: Repository Preparation** as planning context only. Product/system authority remains historical WEX source, accepted ADRs, architecture documents, and verified `main` implementation.

## Decisions Builder Must Resolve for Review

For each item, Builder must report existing authority, unresolved gap, proposed decision, compatibility/accessibility impact, and exact files that would become authoritative:

1. Button Hover rule
2. Pressed treatment
3. Exact Light/Dark semantic mappings for Primary, Neutral, Subtle, Warning, and Danger
4. Final Button component-token names
5. Audit-transition design from blanket no-components protection to scoped authorised-component protection

Builder must reuse existing approved WEX primitives/semantics where authority already exists and identify clearly where a genuinely new Button decision is required. Do not invent new primitives merely to complete the task.

## Explicit Exclusions

- No Button renderer or `Button.tsx`.
- No framework-specific renderer.
- No Button schemas or SemanticAction migration.
- No adapters.
- No catalogue implementation.
- No web-runtime demo.
- No Link Button, Dropdown Button, or Button Group.
- No Button foundation/token implementation before Reviewer approval.

## Builder Evidence Required This Round

Return in this file or linked commit report:

- authoritative files inspected;
- proposed ADR/authority change;
- proposed resolution of all five decisions;
- unresolved questions, if any;
- changed-file list;
- commit SHA/ref for coordination/ADR proposal work;
- confirmation `WEX-SOURCE.md` remains unchanged.

Builder stops after submitting the proposal. Reviewer then independently inspects the pushed work and records one permitted verdict: `Proceed`, `Proceed with safeguards`, or `Stop — architectural risk`.
