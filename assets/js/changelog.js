const CHANGELOG = [
  {
    version: "1.0.0.4",
    date: "2026-07-04",
    title: "Win Call",
    summary: "Matchup choices are easier to read and games can be saved as win-only results.",
    highlights: [
      "Made matchup cards bigger with side-by-side partner names.",
      "Added a Score or Win Only toggle on the scoring screen.",
      "Saved scoreless wins with a winner and no point totals.",
      "Kept rankings, history, text export, and CSV export aware of scoreless wins."
    ],
    updateSections: [
      {
        heading: "Matchups",
        items: [
          "Expanded matchup cards to use more of the screen with larger player-name tiles.",
          "Placed doubles partners side by side inside each team choice."
        ]
      },
      {
        heading: "Scoring",
        items: [
          "Added Win Only mode for recording a winner without entering a score.",
          "Scoreless wins count in records and ratings without adding point differential."
        ]
      }
    ]
  },
  {
    version: "1.0.0.3",
    date: "2026-07-04",
    title: "Court Flow",
    summary: "The app now opens on player selection before matchup and score entry.",
    highlights: [
      "Reduced the top toolbar to the Settings button.",
      "Made Players the opening screen with search-as-you-type filtering.",
      "Sorted player selection by games played, then alphabetically.",
      "Added the three possible doubles matchup choices before scoring."
    ],
    updateSections: [
      {
        heading: "Flow",
        items: [
          "Changed the default app path to Players, then Matchups, then Score.",
          "The Go action requires exactly four selected players before showing pairings."
        ]
      },
      {
        heading: "Selection",
        items: [
          "Player chips now show game counts and selected state.",
          "Four-player selections generate all three doubles pairings for quick score entry."
        ]
      }
    ]
  },
  {
    version: "1.0.0.2",
    date: "2026-07-04",
    title: "Symbol Serve",
    summary: "Command buttons now use the shared Visit Tracker-style symbol set.",
    highlights: [
      "Added a focused Pickle Score icon constant file copied from Visit Tracker.",
      "Changed app, tab, scoring, roster, data, and dialog commands to symbols.",
      "Kept accessible labels and tooltips on symbol-only controls."
    ],
    updateSections: [
      {
        heading: "Symbols",
        items: [
          "Added assets/js/icons.js with the command symbols Pickle Score needs.",
          "Loaded the symbol set before the main app script so render paths can share one icon map."
        ]
      },
      {
        heading: "Controls",
        items: [
          "Converted command buttons to icon-only controls while preserving aria labels and title text.",
          "Kept player names, score values, and choice labels readable where text is the data itself."
        ]
      }
    ]
  },
  {
    version: "1.0.0.1",
    date: "2026-07-04",
    title: "Home Court",
    summary: "Top-bar polish adds the app icon, install flow, settings, and version surfaces.",
    highlights: [
      "Added the Pickle Score icon to the top bar.",
      "Added Add as App with light/dark icon selection and device directions.",
      "Added a Settings dialog for theme, install, data, and app version.",
      "Added visible version pills tied to APP_VERSION."
    ],
    updateSections: [
      {
        heading: "App Shell",
        items: [
          "Added dynamic install icon links before page load so chosen home-screen icons are used earlier.",
          "Added top-bar Add as App and Settings buttons alongside the theme toggle."
        ]
      },
      {
        heading: "Install And Settings",
        items: [
          "Added a compact Add as App dialog with persisted light/dark icon choice and device-matched install instructions.",
          "Added a Settings dialog with theme controls, Add as App access, Data tab handoff, and version metadata."
        ]
      }
    ]
  },
  {
    version: "1.0.0",
    date: "2026-07-04",
    title: "First Serve",
    summary: "Pickle Score starts as a local-first scorekeeper for quick court-side game logging.",
    banner: "Track games, rankings, pairs, and backups from one local scorekeeper.",
    cta: "Serve It Up!",
    highlights: [
      "Record singles and doubles games with fast score controls.",
      "Manage players, rankings, pair stats, and recent game history.",
      "Export text, CSV, and JSON backups without a backend.",
      "Install-ready icons, manifests, and release workflow are in place."
    ],
    updateSections: [
      {
        heading: "Scoring",
        items: [
          "Added singles/doubles draft modes, team slots, winner selection, loser-score shortcuts, and manual score adjustment.",
          "Added clear, swap, rematch, undo-last, and per-game delete flows."
        ]
      },
      {
        heading: "Roster And Rankings",
        items: [
          "Added quick player entry, roster search, bulk import, hide/show management, and historical name snapshots.",
          "Added lightweight player ratings, win/loss records, point differential, and best-pair summaries."
        ]
      },
      {
        heading: "Local Data",
        items: [
          "Stored all data in browser localStorage under pickle-score-state-v1.",
          "Added text, CSV, JSON backup, restore, copy, download, and share flows."
        ]
      },
      {
        heading: "Project Setup",
        items: [
          "Added AI handoff docs, release notes, roadmap seeds, parse check, GitHub Pages deploy workflow, manifests, and icon build pipeline."
        ]
      }
    ]
  }
];
