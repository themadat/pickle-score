const CHANGELOG = [
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
