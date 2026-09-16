# Button System Work Cycle

Status: BUILDER ACTION REQUIRED  
Phase: Slice 1 — Button Authority and WEX Foundations

## Planning Reference

Use the current approved **WEX Button System: Repository Preparation** supplied with this work cycle as the planning authority. Do not copy it into this branch. This file coordinates the work; WEX historical source, accepted ADRs, architecture documents, and verified `main` implementation remain product/system authority.

## Accepted Slice 1 Scope

- Establish Button ADR authority.
- Resolve the Button Hover rule.
- Resolve Pressed treatment.
- Define Light/Dark semantic mappings for Primary, Neutral, Subtle, Warning, and Danger.
- Approve Button component-token naming.
- Add and register Button geometry tokens.
- Add the shared Content Shimmer foundation.
- Preserve the historical WEX source unchanged.
- Transition the blanket no-components audit into scoped authorised-component protection.
- Add focused foundation, token, and hardcoding tests.

## Explicit Exclusions

- No Button renderer or `Button.tsx`.
- No framework-specific renderer.
- No Button schemas or SemanticAction migration.
- No adapters.
- No catalogue implementation.
- No web-runtime demo.
- No Link Button, Dropdown Button, or Button Group.

## Current Authority Blockers

Verified `main` does not currently resolve the five decisions below. Builder must record decision requirements and stop before WEX implementation. Do not invent answers merely to continue.

Builder must stop before implementation if any of these are still unresolved:

1. Hover authority
2. Pressed treatment
3. exact appearance/state semantic mappings
4. final component-token names
5. audit-transition design

An architectural requirement must be accepted through the appropriate ADR/authority path before implementation proceeds. Continue using this work file for decision and correction rounds.

## Required Implementation Evidence

When Slice 1 is eventually authorised and implemented, Builder must provide:

- commit SHA;
- changed-file list;
- test/check commands and results;
- confirmation that the historical WEX authority hash remains unchanged;
- confirmation that dependency boundaries remain valid;
- confirmation that no raw or unregistered Button presentation values were introduced.

Builder stops at the Slice 1 boundary. Reviewer then independently inspects the pushed source, diff, and evidence and issues one permitted verdict.
