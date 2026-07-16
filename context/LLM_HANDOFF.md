# LLM Handoff

Copy this into new chats:

```text
Continue work in /Users/stripes/Documents/GitHub/pickle-score. Read context/LLM_HANDOFF.md first. Respect manual edits. Run git status --short before editing. Use port 8019 for local preview.
```

Shorthand commands: `wish`, `plan`, `start`, `prep`, `ship`, `pause`.

## Workflows

Six shorthand commands drive planning and the version lifecycle: `wish`
captures a Roadmap idea, `plan` explores and documents the feature, `start`
implements from the plan and opens the version line, `prep` makes it
release-ready, `ship` condenses it into a cut release, and `pause` checkpoints
a line mid-flight so another LLM/session can resume cold.

Always run `git status --short` first and preserve in-flight manual edits. End
every working session with two copy-paste containers: first the commit
description in list form, then `_ps-checkpoint "APP_VERSION - <commit title>"`
with the title double-quoted.

### `wish` - Capture A Roadmap Idea

- Check `WISHLIST_SEEDS` for duplicates and nearby wishes before assigning the
  next unused `WISH-###` id.
- Capture a complete seed: title, behavior-focused description, priority,
  effort, target kind/version, estimated token cost, compact implementation
  prompt, and category.
- Use sensible defaults when the request is clear. Ask concise clarifying
  questions only when ambiguity materially changes scope, priority, or
  architecture.
- Do not create a plan doc, retarget a version, or implement the wish unless
  the user explicitly asks.
- Since the Roadmap data may become visible in the app, bump the active build
  and add a public-safe `CHANGELOG` update when a wish is added to a shipped
  surface.

### `plan` - Explore And Document A Feature

- Read the Snapshot for the latest cut release and any active dev line.
- Inspect relevant code, identify risks, data-model impacts, migration needs,
  UI states, exports, and tests.
- Write or revise `context/WISH-<id>-<slug>-PLAN.md` with scope, constraints,
  implementation phases, schema changes, UX behavior, open questions, and a
  concrete test plan.
- When a Roadmap seed has a written plan, set its optional `planDoc` field.
- Planning-only edits need no `APP_VERSION` or `CHANGELOG` churn unless the
  user explicitly asks for user-visible Roadmap changes.
- Do not implement during `plan` unless the user changes the request.

### `start` - Implement A Planned Feature

- Read the Snapshot, the active plan doc, and this handoff before editing.
- If there is no clear plan doc for a substantial feature, run `plan` first
  unless the user explicitly asks for a small direct implementation.
- Open the line by bumping `APP_VERSION` to a fresh build (`1.0.0` ->
  `1.0.0.1`, or a new minor `1.1.0.1`) and starting a `CHANGELOG` entry with a
  short on-theme working title.
- New persisted fields: add defaults in `DEFAULT_STATE` and repair/defaulting
  in `normalizeState()`.
- Verify before finishing: parse check plus the changed flow.

### `prep` - Get The Version Release-Ready

- Inventory dirty files before editing. Treat manual changes as authoritative.
- Walk the line's user-facing behavior and update public surfaces:
  `CHANGELOG`, `README.md`, `WISHLIST_SEEDS`, and this handoff.
- Keep wording public-safe: describe features and changes, not tickets, prompts,
  or workflow mechanics.
- Verify the app parses and the new flows work. Leave active-dev versions in
  `x.y.z.N` form when prep is done.

### `ship` - Condense The Version

- Set `APP_VERSION` to the released semantic version, dropping any `.N` build
  segment.
- Collapse active build notes into one clean release entry in
  `assets/js/changelog.js`.
- Sync `README.md`, Roadmap shipped/retargeted state, and this handoff.
- Run final verification: `./build/check.sh`, `git diff --check`, preview on
  port 8019, smoke changed flows, stop the server, then `git status --short`.
- Leave no active dev line.

### `pause` - Checkpoint A Line Mid-Flight

- Verify the app still parses; if it does not, say so in the Resume block and
  commit title.
- Write or refresh a `## Resume` block at the top of the active plan doc:
  done so far, in progress, exact next steps, files/symbols touched,
  verification status, and open gotchas.
- Commit everything with the normal two copy-paste blocks. WIP commits are
  fine - mark them `WIP` in the title.
- Stop the local server.
- A resuming session ramps from git, not from rereading code:
  `git log --oneline -5`, `git diff main...HEAD --stat`, then the Resume block.

## Release Notes

- For app behavior changes, bump the fourth `APP_VERSION` build number in
  `index.html` and update the `CHANGELOG` constant in `assets/js/changelog.js`.
- When finalizing a release, set `APP_VERSION` to the released semantic version
  and collapse same-line build notes into that release entry.
- Entry shape: `{ version, date, title, summary, highlights, updateSections }`.
  Feature releases may also add `banner` and `cta` when the app grows a
  What's New surface.
- Keep `highlights` short: max 4 bullets, each under 100 characters.
- Release notes are public-facing: describe shipped behavior, not internal
  tickets or LLM workflow.
- Manual or unexpected edits are authoritative; identify their user-facing
  effect and include it in the current release notes when relevant.

## Snapshot

- Pickle Score is a local-first HTML/CSS/JS app with no build step. The app is
  currently centered on `index.html`; companion files in `assets/js/` hold icon
  constants (`PS_ICONS`), release notes (`CHANGELOG`), and roadmap seeds
  (`WISHLIST_SEEDS`) for future app surfaces and planning.
- Main file: `index.html`. `STORAGE_KEY = "pickle-score-state-v1"`, version in
  `APP_VERSION`.
- Docs: `README.md` (public/run/build), this handoff (all dev + LLM context),
  `AGENTS.md` + `CLAUDE.md` (thin auto-loaded summaries).
- Current version: `APP_VERSION = "1.0.0.11"` - active build line,
  "Channel Pills": beta and alpha deploy URLs show a matching channel pill next
  to the version in the top bar and settings footer. The pill is inferred from
  `/beta/` or `/alpha/` URL path segments; production/root stays untagged.
- User data lives in browser localStorage. Export/import support uses text,
  CSV, and JSON backup flows. The app should continue to run over `file://`.
- No backend, bundler, package manager, or runtime dependencies.
- GitHub Pages deploys require repository Pages Source = GitHub Actions and
  the `github-pages` environment must allow `main`, `beta`, and `alpha` to
  deploy. `.github/workflows/deploy.yml` queues all three in one global Pages
  concurrency group, stages a full `_site` artifact, preserves other published
  channel folders from the `gh-pages` snapshot branch, saves the refreshed
  snapshot back to `gh-pages`, then deploys with `actions/deploy-pages`.
- Latest public releases: 1.0.0 "First Serve". Active build: 1.0.0.11
  "Channel Pills".

## Rules

**Process**

- Run `git status --short` before editing.
- Manual edits are authoritative. Preserve dirty work unless the user explicitly
  asks to revert it.
- Edit surgically, especially in `index.html`; do not reformat the file.
- App behavior changes usually require `APP_VERSION`/`CHANGELOG` updates.
  Docs-only, handoff-only, or planning-only edits do not need release churn.
- When a change affects dev rules, repo context, or future handoff instructions,
  update this file. Keep `README.md` for public/run/build info.
- Keep `AGENTS.md` and `CLAUDE.md` lean; this handoff stays the source of truth.

**Code**

- Keep the app no-build and dependency-free: plain HTML/CSS/JavaScript,
  classic scripts only, no bundlers, ES modules, backend, or runtime
  dependencies.
- Prefer small readable functions over new abstractions.
- Use semantic HTML and accessible labels for new controls.
- Keep features offline and local-only unless the user explicitly asks for an
  online integration. Destructive UI actions go through `window.confirm` or a
  project confirm helper if one is introduced.

**Persistence & Migration**

- New persisted fields: add defaults in `DEFAULT_STATE` and repair/defaulting
  in `normalizeState()`.
- Preserve `pickle-score-state-v1`. Never overwrite existing players, games,
  settings, or backup data unless the user explicitly resets/imports.
- JSON restore should continue to accept the current `{ app, version,
  exportedAt, data }` shape and the raw `{ players, games, settings }` shape.

**Roadmap (`WISHLIST_SEEDS`, in `assets/js/roadmap.js`)**

- Item shape: `title`, `ticketId`, optional `planDoc`, `description`,
  `priority`, `effort`, `targetKind`, `targetVersion`, `tokenCostPct`,
  `prompt`, `category`.
- `priority`: `P0`-`P3`. `effort`: `small` | `medium` | `large` | `x-large`.
- `targetKind`: `exact` with a `targetVersion`, or a bucket: `major` |
  `minor` | `patch`.
- `description` states behavior and scope; `prompt` is a compact, minimal-token
  implementation prompt for an LLM.

## Quick Commands

```sh
rg -n "APP_VERSION|STORAGE_KEY" index.html
rg -n "version:" assets/js/changelog.js
rg -n "ticketId" assets/js/roadmap.js
rg -n "function normalizeState|function saveState|function renderAll" index.html
./build/check.sh
git diff --check
python3 -m http.server 8019
```

## Code Map

- `index.html` constants: `APP_VERSION`, `STORAGE_KEY`, `DEFAULT_STATE`.
- State lifecycle: `loadState`, `normalizeState`, `saveState`, `saveAndRender`.
- Draft/game flow: `togglePlayerInDraft`, `openMatchups`, `matchupOptions`,
  `chooseMatchup`, `syncScoreFromQuick`, `saveGame`, `playSameTeamsAgain`,
  `chooseDifferentMatchup`, `loadRematch`, `deleteGame`.
- Roster: `addPlayersFromText`, `renamePlayer`, `hidePlayer`,
  `activePlayers`, `usedPlayerIds`.
- Rankings: `buildStats`, `buildPairStats`, `renderRankings`.
- Export/import: `buildTextExport`, `buildCsvExport`, `exportState`,
  `restoreBackup`, `wipeData`.
- UI rendering: `renderAll`, `renderMiniStats`, `renderModes`, `renderTeams`,
  `renderScore`, `renderRoster`, `renderGames`, `renderData`.

## Verify

- Parse check: `./build/check.sh`.
- Whitespace: `git diff --check`.
- Preview: run `python3 -m http.server 8019`, open
  `http://127.0.0.1:8019/index.html`, then stop the server before final reply.
- Smoke test after meaningful changes: add players, switch singles/doubles,
  select teams, save a game, undo/delete a game, check rankings and pairs,
  export text/CSV/JSON, restore a JSON backup only after confirming overwrite,
  toggle theme, reload and confirm localStorage state persists.

## App Shape

Runtime flow: `state = loadState()` -> `init()` -> `normalizeState()` /
`bindEvents()` / `applyTheme()` / `renderAll()`.

State basics:

```js
{
  appVersion,
  players: [{ id, name, active }],
  games: [{ id, playedAt, mode, teamA, teamB, teamANames, teamBNames, scoreRecorded, winner, scoreA, scoreB }],
  lastTeams,
  settings: { theme },
  draft: { mode, selectedPlayers, teamA, teamB, focus, winner, scoreMode, winScore, loserScore, scoreA, scoreB }
}
```

Important invariants:

- `mode` is `singles` or `doubles`; team size derives from it.
- Draft teams contain active player ids that exist in `state.players`.
- Scores are integer-ish numbers clamped between 0 and 99.
- Scoreless wins use `scoreRecorded: false`, `winner: "A" | "B"`, and
  `scoreA`/`scoreB` as `null`; stats count the win with zero point
  differential.
- Score mode cannot be tied; save is disabled while score mode is tied or teams
  are incomplete. Win Only mode saves once both teams are filled.
- Games keep `teamANames` and `teamBNames` snapshots so old games remain
  readable after roster edits.
- Hidden players remain available to historical games and can be restored.
- Rating calculations are derived from chronological game order; do not persist
  computed ranking fields unless there is a clear feature need.

## Current Surface

- Players: sorted player selection, search-as-you-type, quick add, and Go once
  four players are selected.
- Matchups: three doubles pairing choices for the selected four-player group.
- Score: compact iPhone-first scoring, Score / Win Only mode, winner selection,
  loser-score shortcuts, manual score adjustment, clear/swap/rematch.
- Next: after saving, Same Teams starts another game, Different Matchup returns
  to the same group's matchup choices, and New Group returns to player select.
- Rank: top-level stats, player ratings, win/loss, point differential, best
  doubles pairs.
- Games: reverse-chronological game list, undo last, delete individual games.
- Data: roster management, bulk name import, text/CSV/JSON export, JSON restore,
  wipe flow, share/copy/download helpers.
- Theme: local light/dark toggle saved in settings, available in the Settings
  dialog.
- Install: Settings opens Add as App with device-matched directions and
  persists light/dark install icon preference through `psInstallIconVariant`;
  web manifests and generated icon assets are present for add-to-home and
  favicon surfaces.
- Settings: top-bar Settings dialog exposes theme controls, Add as App, Data tab
  handoff, and app/version metadata.

## UX Preferences

- Compact, practical, court-first.
- Fast thumb-friendly entry beats decorative UI.
- Keep the first screen as the usable scorekeeper, not a landing page.
- Mobile is the primary environment; desktop should still scan cleanly.
- Public release notes describe user-facing features.
