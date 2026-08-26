export type UpdateKind = "feature" | "fix" | "improvement";

export interface UpdateEntry {
  date: string;
  kind: UpdateKind;
  title: string;
  description: string;
}

export const updates: UpdateEntry[] = [
  {
    date: "2026-08-26",
    kind: "fix",
    title: "Reviews now fit properly on mobile",
    description:
      "On phones, part of each review card could get cut off at the right edge, so you couldn't read the whole quote. The reviews section is back to a clean single-column layout on mobile, so every review is fully readable.",
  },
  {
    date: "2026-08-24",
    kind: "improvement",
    title: "One consistent professional title",
    description:
      "My title now reads the same across the whole site — Software Engineer, Full-Stack Developer, and Coding Instructor — in the browser tab, the intro, the footer, the article byline, and search results, instead of switching between different labels.",
  },
  {
    date: "2026-08-24",
    kind: "improvement",
    title: "Streamlined the top navigation",
    description:
      "The standalone C# playground page was removed to keep the site focused on the work that matters. You can still edit and run the C# examples right inside the articles.",
  },
  {
    date: "2026-08-24",
    kind: "improvement",
    title: "Faster, lighter page loads",
    description:
      "The home page now ships less code up front — reviews load quietly in the background and shared libraries are cached between pages — so the site opens and moves between pages noticeably faster.",
  },
  {
    date: "2026-08-24",
    kind: "improvement",
    title: "Easier-to-read text and calmer motion",
    description:
      "Amber text now meets accessibility contrast standards so it's readable for everyone, the browser's top bar matches your light or dark choice, and if you prefer reduced motion the last few animations now hold still too.",
  },
  {
    date: "2026-08-24",
    kind: "improvement",
    title: "Sharper, theme-aware article reading",
    description:
      "Good-vs-bad code comparisons are now syntax-highlighted, self-check quiz answers render formatted text and code, and diagrams instantly follow light/dark mode when you switch themes.",
  },
  {
    date: "2026-08-24",
    kind: "improvement",
    title: "Every article points you forward",
    description:
      "Articles and the articles list now close with clear next steps — quick ways to hire me for engineering work or learn with me — plus links to follow along on YouTube and LinkedIn.",
  },
  {
    date: "2026-08-24",
    kind: "improvement",
    title: "Reach me from anywhere on the site",
    description:
      "A “Hire me” button now sits in the top navigation, and the footer has been rebuilt into a proper landing spot — quick links to every section, ways to connect, a résumé download, and a one-tap “back to top”.",
  },
  {
    date: "2026-08-24",
    kind: "improvement",
    title: "Smoother navigation & better accessibility",
    description:
      "The menu now highlights the section you're actually reading — including the contact section at the very bottom — and the mobile menu is fully keyboard- and screen-reader-friendly.",
  },
  {
    date: "2026-08-24",
    kind: "improvement",
    title: "Home page refresh — engineering front and center",
    description:
      "A polished pass over the home page: projects now open with a .NET Clean Architecture API, the software-development service highlights a focused set of specialties instead of a long catalog, the experience section points you straight to the project work, and the articles block now matches the rest of the page.",
  },
  {
    date: "2026-08-23",
    kind: "fix",
    title: "Fixed the CV download and service booking links",
    description:
      "The “Download CV” button now downloads the résumé correctly, and booking a service goes straight to WhatsApp or email — no more dead links.",
  },
  {
    date: "2026-08-23",
    kind: "improvement",
    title: "Clearer buttons in the intro",
    description:
      "The main hero button now takes you straight to the contact form, and a new “See My Work” button jumps to the projects.",
  },
  {
    date: "2026-08-23",
    kind: "improvement",
    title: "C# playground is easier to find",
    description:
      "The interactive C# playground is now linked from the top navigation and the footer, so you can open it from anywhere on the site.",
  },
  {
    date: "2026-08-23",
    kind: "improvement",
    title: "Accessibility improvements",
    description:
      "Contact form fields and the light/dark theme toggle now carry proper labels, so the site works better with screen readers and keyboard navigation.",
  },
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
