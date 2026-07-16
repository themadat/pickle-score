const WISHLIST_SEEDS = [
  {
    title: "Seasons And Sessions",
    ticketId: "WISH-001",
    description: "Group games by season, session, or event so rankings and exports can focus on a chosen slice of play.",
    priority: "P1",
    effort: "medium",
    targetKind: "minor",
    targetVersion: "",
    tokenCostPct: 18,
    prompt: "Add a local-only season/session model with filters for rankings, games, exports, and sensible migration defaults.",
    category: "Data"
  },
  {
    title: "Head-To-Head Cards",
    ticketId: "WISH-002",
    description: "Open a player card with rating trend, recent games, partner stats, and head-to-head records against another player.",
    priority: "P2",
    effort: "medium",
    targetKind: "minor",
    targetVersion: "",
    tokenCostPct: 22,
    prompt: "Design and implement player detail cards derived from existing local game data without adding external dependencies.",
    category: "Stats"
  },
  {
    title: "Match Formats",
    ticketId: "WISH-003",
    description: "Support best-of sets and tournament-style match records while preserving quick single-game entry.",
    priority: "P2",
    effort: "large",
    targetKind: "minor",
    targetVersion: "",
    tokenCostPct: 30,
    prompt: "Extend the game model to optional match/set grouping, migrate current games safely, and keep the Record view fast.",
    category: "Scoring"
  },
  {
    title: "Shareable Recap",
    ticketId: "WISH-004",
    description: "Create a copy/share recap for the latest session with top movers, close games, pair highlights, and compact standings.",
    priority: "P3",
    effort: "small",
    targetKind: "minor",
    targetVersion: "",
    tokenCostPct: 12,
    prompt: "Add a local recap generator from existing stats with copy/share/download controls and no remote services.",
    category: "Export"
  },
  {
    title: "Flexible Player Pools",
    ticketId: "WISH-005",
    description: "Let a session start with more than four selected players, then choose or rotate the four people assigned to a game.",
    priority: "P2",
    effort: "medium",
    targetKind: "minor",
    targetVersion: "",
    tokenCostPct: 20,
    prompt: "Extend player selection from an exact four-person game picker into a larger session pool with per-game foursome selection and simple rotation helpers.",
    category: "Scoring"
  }
];
