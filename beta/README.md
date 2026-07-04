# Pickle Score

Pickle Score is a local-first pickleball scorekeeper for recording singles and
doubles games, managing a roster, ranking players with a lightweight rating,
surfacing best pairs, and exporting or restoring match history. It is built to
open quickly on a phone at the court: plain HTML/CSS/JavaScript, no build step,
no backend, browser localStorage, and JSON/text/CSV export.

## Releases

| Version | Date | Title | Summary |
|---|---:|---|---|
| 1.0.0 | 2026-07-04 | First Serve | Initial local scorekeeper with roster management, game logging, rankings, pair stats, export/import, light/dark theme, and install icon setup. |

## Quick Start

Open the app directly:

```sh
open index.html
```

Or serve it locally for browser testing:

```sh
python3 -m http.server 8019
```

Then visit `http://127.0.0.1:8019/index.html`. Use port `8019` by convention
so preview startup and cleanup stay predictable. If that port is occupied, use
the next nearby port, note it, and stop the server when checks are done.

## Deployments

GitHub Pages should be configured with **Source: GitHub Actions**. The
`github-pages` environment must allow `main`, `beta`, and `alpha` to deploy;
use either **No restriction** or selected branch rules for all three branches.

The deploy workflow runs for `main`, `beta`, and `alpha`, queues them through
one global Pages concurrency group, assembles a full Pages artifact, and
replaces only the current channel:

- `main` publishes to `/`.
- `beta` publishes to `/beta/`.
- `alpha` publishes to `/alpha/`.

The app has no build output folder. The workflow stages the checked-out source
into `_site`, preserves the other deployed channel folders from the latest
`gh-pages` snapshot, saves the updated snapshot back to `gh-pages`, and then
uploads the artifact. Pages source should stay set to GitHub Actions so the
`gh-pages` push is only state storage, not the publishing mechanism.

## Build The Icon Assets

The repo ships with generated PNG icons and the dual-theme `favicon.svg`
already committed in `assets/icons/`, so day-to-day work needs no build. Run
the build script only after editing the two brand SVGs in `assets/icons/`:

```sh
./build/generate-icons.sh
```

Inputs:

- `assets/icons/pickle-score-light.svg` - light variant of the brand icon.
- `assets/icons/pickle-score-dark.svg` - dark variant of the brand icon.

The script writes ten PNGs into `assets/icons/` (`apple-touch-icon[-dark].png`,
`icon-{192,512}[-dark].png`, `favicon-{16,32}[-dark].png`) using `qlmanage` on
macOS. It then invokes `build/generate-favicon.py` to combine both palettes
into a single `assets/icons/favicon.svg` that swaps fills with
`prefers-color-scheme`.

If `qlmanage` hangs, reset QuickLook and rerun:

```sh
killall -9 QuickLookUIService quicklookd
./build/generate-icons.sh
```

Commit regenerated PNGs and `favicon.svg` alongside SVG source edits.

## Repo Layout

```text
index.html                 Core app: markup, styles, state, and UI logic.
assets/js/changelog.js     Release notes data and conventions.
assets/js/roadmap.js       Roadmap wish seeds for future planning.
assets/icons/              Favicon, install PNGs, and source SVG brand art.
manifest.webmanifest       PWA manifest for the light icon set.
manifest-dark.webmanifest  PWA manifest for the dark icon set.
build/                     Optional parse check and macOS icon build pipeline.
context/                   LLM handoff and in-flight plan docs.
.github/workflows/         GitHub Pages deploy workflow.
```

## Development

All development context - architecture notes, persistence rules, roadmap
format, code map, verification steps, and release-note conventions - lives in
`context/LLM_HANDOFF.md`. Start there for code work.

It also defines the working shorthands: `wish` (capture a Roadmap idea),
`plan` (explore and document a feature), `start` (implement from an existing
plan), `prep` (make a version release-ready), `ship` (condense and cut the
release), and `pause` (checkpoint a session for another LLM).
