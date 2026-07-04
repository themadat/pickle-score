# Pickle Score - Agent Instructions

Local-first, no-build pickleball scoring app: `index.html` contains the markup,
styles, app state, and UI logic. Companion project files live in `assets/js/`
for release notes and roadmap seeds, `assets/icons/` for install art, `build/`
for optional checks/icon generation, and `context/` for LLM handoff state.

This file is the thin, always-loaded summary for Codex. `CLAUDE.md` imports it.
`context/LLM_HANDOFF.md` is the source of truth - read it before implementing
anything beyond a tiny docs-only tweak.

## Session Start

1. `git status --short` - manual edits are authoritative; preserve dirty work.
2. Read `context/LLM_HANDOFF.md` - workflows (`wish` / `plan` / `start` /
   `prep` / `ship` / `pause`), invariants, code map, verify steps.
3. If resuming an in-flight line: `git log --oneline -5`,
   `git diff main...HEAD --stat`, then the `## Resume` block in the active
   `context/*-PLAN.md`.

## Token Discipline

- Search first (`rg -n "pattern" index.html assets/js/`), then read tight
  ranges. Avoid pasting large chunks of app code or generated assets into chat.
- `index.html` landmarks: head/styles at the top, HTML body starts near line
  740, main inline script starts near line 890.
- Edit surgically. Do not reformat `index.html` or generated icon assets.

## Core Rules

- App-behavior changes bump the 4th `APP_VERSION` segment in `index.html`
  during active development and add a `CHANGELOG` build note in
  `assets/js/changelog.js`. Docs-only edits need no release churn.
- New persisted fields: defaults in `DEFAULT_STATE`, repair/defaulting in
  `normalizeState()`. Preserve the `pickle-score-state-v1` localStorage schema.
- Preview: `python3 -m http.server 8019` -> `http://127.0.0.1:8019/index.html`;
  stop the server before the final reply.
- Parse-check: `./build/check.sh`.
- End every working session with two copy-paste blocks: a commit description
  list, then `_ps-checkpoint "APP_VERSION - <title>"`.
