export type UpdateKind = "feature" | "fix" | "improvement";

export interface UpdateEntry {
  date: string;
  kind: UpdateKind;
  title: string;
  description: string;
}

export const updates: UpdateEntry[] = [
  {
    date: "2026-08-21",
    kind: "improvement",
    title: "Redesigned the home page flow",
    description:
      "The home page now reads as one clear story — engineering work and skills first, then teaching and services, with reviews near the end — and repeated content was trimmed so it's faster to scan.",
  },
  {
    date: "2026-08-21",
    kind: "feature",
    title: "Reviews & testimonials",
    description:
      "Visitors can now leave a star-rated review — students, parents, and clients — and it appears on the site right away, in both the reviews wall and the hero.",
  },
  {
    date: "2026-08-03",
    kind: "feature",
    title: "Interactive learning toolkit in articles",
    description:
      "Articles now support Mermaid diagrams, animated concept visuals (LINQ pipeline, N+1 queries), self-check quizzes with reveal answers, good-vs-bad code comparisons, and color-coded callouts.",
  },
  {
    date: "2026-08-03",
    kind: "feature",
    title: "Standalone C# playground",
    description:
      "A dedicated /playground page with the Monaco editor and a terminal-style output pane that keeps a history of your runs — the Task Tracker types are preloaded.",
  },
  {
    date: "2026-08-03",
    kind: "improvement",
    title: "Terminal-style run output",
    description:
      "Running code from an article now shows a real terminal pane: prompt lines, timestamps, run history, exit codes, and a blinking cursor while compiling.",
  },
  {
    date: "2026-08-03",
    kind: "improvement",
    title: "Richer article motion",
    description:
      "Headings, code blocks, and tables reveal as you scroll; the reading progress bar and table-of-contents highlight follow along.",
  },
  {
    date: "2026-08-03",
    kind: "feature",
    title: "Resume reading",
    description:
      "Articles remember where you stopped. Come back and pick up from your last position with one tap.",
  },
  {
    date: "2026-08-03",
    kind: "fix",
    title: "Code execution provider",
    description:
      "Switched in-browser C# execution to the Compiler Explorer (godbolt.org) API running .NET 8, after Piston's public API became whitelist-only.",
  },
  {
    date: "2026-08-03",
    kind: "feature",
    title: "Articles section launched",
    description:
      "Markdown-driven .NET tutorials with syntax highlighting, tag filters, reading time, table of contents, per-article SEO, and runnable C# examples. First article: C#, LINQ, and EF Core Foundations.",
  },
];
