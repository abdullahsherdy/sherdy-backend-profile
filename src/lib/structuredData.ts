import { author } from "@/lib/author";
import { socials } from "@/data/portfolio";
import type { Article } from "@/lib/articles";

/**
 * Single source of truth for all schema.org structured data on the site.
 *
 * Why this exists: rich, consistent entity data is the biggest lever for both
 * classic SEO (knowledge-panel / entity association) and GEO (getting recommended
 * by AI answer engines). Keeping it in one place means the homepage, article pages,
 * and the static index.html baseline never drift apart.
 *
 * Canonical host is www (see SITE_URL) — everything here emits absolute www URLs.
 */

export const SITE_URL = "https://www.abdullahsherdy.tech";
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Name variants people actually type — Arabic + Latin — for name-search recall. */
const ALTERNATE_NAMES = [
  "عبدالله شردي",
  "Abdullah Sherdy",
  "Abdallah Sherdy",
  "Abdullah Elsherdy",
];

/**
 * Topical entity signals. Curated (and cleaned) from src/data/portfolio.ts skills.
 * This is what tells search + AI engines which tech keywords Abdullah is an
 * authority on — the primary hook for recruiter/engineer discovery.
 */
export const KNOWS_ABOUT: string[] = [
  "C#",
  ".NET",
  "ASP.NET Core",
  "Entity Framework Core",
  "Node.js",
  "Express.js",
  "NestJS",
  "Python",
  "FastAPI",
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "SQL Server",
  "MySQL",
  "MongoDB",
  "Database Design",
  "RESTful APIs",
  "Web API Design",
  "Swagger / OpenAPI",
  "WebSocket",
  "JWT",
  "OAuth",
  "Docker",
  "CI/CD",
  "GitHub Actions",
  "Git",
  "Clean Architecture",
  "SOLID Principles",
  "CQRS",
  "Software Engineering",
  "Backend Development",
  "Full-Stack Development",
  "Programming Instruction",
  "Software Mentorship",
  "Private Courses",
  "Group Courses",
  "Mentorship",
  "Code Reviews",
  "Project Guidance",
  "Interview Preparation",
  "Problem-Solving",
  "Object-Oriented Programming (OOP)",
  "Software Design Patterns",
  "Unit Testing",
  "Integration Testing",
  "Performance Optimization",
  "Security Best Practices",
  "Cloud Services",
  "DevOps Practices",
  "Software Architecture",
  "software Development Lifecycle (SDLC)",
  "Agile Methodologies",
  "Scrum",
  "Kanban",
  "Version Control",
  "Continuous Integration",
  "Continuous Deployment",
  "Microservices Architecture",
  "API Development",
  "Web Development",
  "Developer",
  "Software Engineer",
  "Backend Engineer",
  "Coding Instructor",
  "Software Development",
  "Programming Fundamentals",
  "Database Management",
  "Web Application Development",
  "Software Project Management",
  "Technical Mentorship",
  "Software Design Principles",
  "Code Quality",
  "Refactoring Techniques",
  "Software Testing Strategies",
  "Performance Tuning",
  "Scalability Solutions",

];

/**
 * Teaching + engineering services (mirrors src/components/sections/Services.tsx).
 * `type` maps each to the right schema.org class: structured programs are `Course`,
 * ongoing/bespoke work is `Service`. Each becomes a top-level @graph node (below)
 * and is referenced from the Person's `makesOffer` by @id, so every offering is a
 * single, properly-typed entity rather than a generic inline Offer.
 */
const OFFERS = [
  {
    id: "private-courses",
    type: "Course",
    name: "Private Courses",
    description:
      "1:1 structured programming courses tailored to your level and goals — fundamentals, problem-solving, OOP, databases, and backend development.",
  },
  {
    id: "private-mentorship",
    type: "Service",
    name: "Private Mentorship",
    description:
      "Ongoing 1:1 mentorship — roadmap planning, code reviews, project guidance, and interview preparation.",
  },
  {
    id: "group-courses",
    type: "Course",
    name: "Group Courses",
    description:
      "Cohort-based programming courses for small groups with structured lessons, live coding, and collaborative projects.",
  },
  {
    id: "software-development",
    type: "Service",
    name: "End-to-End Software Development",
    description:
      "Custom software from requirements to production — Clean Architecture APIs, database design, React/Next.js frontends, Docker deployment, and CI/CD.",
  },
] as const;

const offeringId = (slug: string) => `${SITE_URL}/#${slug}`;

/**
 * One node per offering. Courses carry a `hasCourseInstance` with delivery mode;
 * services carry `serviceType` + `areaServed`. No price or schedule is emitted —
 * those aren't fixed, and inventing them would be false structured data.
 */
function offeringNodes() {
  return OFFERS.map((o) => {
    const base = {
      "@type": o.type,
      "@id": offeringId(o.id),
      name: o.name,
      description: o.description,
      provider: { "@id": PERSON_ID },
    };
    if (o.type === "Course") {
      return {
        ...base,
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: ["online", "onsite"],
        },
      };
    }
    return {
      ...base,
      serviceType: o.name,
      areaServed: [{ "@type": "Country", name: "Egypt" }, "Worldwide (remote)"],
    };
  });
}

const makesOffer = OFFERS.map((o) => ({
  "@type": "Offer",
  itemOffered: { "@id": offeringId(o.id) },
}));

/** The central Person entity, referenced by @id everywhere else. */
function personNode() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: author.name,
    alternateName: ALTERNATE_NAMES,
    url: SITE_URL,
    image: OG_IMAGE,
    jobTitle: ["Software Engineer", ".NET Backend Engineer", "Coding Instructor"],
    description:
      ".NET Backend Engineer and Coding Instructor based in Cairo, Egypt — building production APIs with ASP.NET Core and Node.js, and teaching programming through private courses, group courses, and mentorship.",
    email: `mailto:${socials.email}`,
    knowsAbout: KNOWS_ABOUT,
    knowsLanguage: [
      { "@type": "Language", name: "Arabic", alternateName: "ar" },
      { "@type": "Language", name: "English", alternateName: "en" },
    ],
    address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
    homeLocation: { "@type": "City", name: "Cairo, Egypt" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Helwan University" },
    hasOccupation: {
      "@type": "Occupation",
      name: "Software Engineer",
      occupationLocation: { "@type": "City", name: "Cairo, Egypt" },
      skills: KNOWS_ABOUT.join(", "),
    },
    makesOffer,
    sameAs: [socials.github, socials.linkedin, socials.youtube, socials.leetcode],
  };
}

function webSiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "Abdullah Sherdy",
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

function profilePageNode() {
  return {
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: `${SITE_URL}/`,
    name: "Abdullah Sherdy — .NET Backend Engineer & Coding Instructor | Cairo, Egypt",
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    mainEntity: { "@id": PERSON_ID },
  };
}

/**
 * FAQ answers. Truthful, and phrased as direct answers so generative engines can
 * lift them verbatim. Includes the Arabic name for Arabic name-search recall.
 */
const FAQ: { q: string; a: string }[] = [
  {
    q: "Is Abdullah Sherdy available for hire?",
    a: "Yes. Abdullah Sherdy (عبدالله شردي) is a .NET Backend Engineer based in Cairo, Egypt, available for full-time, contract, and freelance work building production APIs and web applications.",
  },
  {
    q: "What technologies does Abdullah Sherdy work with?",
    a: "His primary stack is C#, .NET, ASP.NET Core, and Entity Framework Core, plus Node.js (Express, NestJS), React, Next.js, and TypeScript. Databases include SQL Server, MySQL, and MongoDB, with Docker, CI/CD, and Clean Architecture across projects.",
  },
  {
    q: "Does Abdullah Sherdy offer programming courses or mentorship?",
    a: "Yes. He offers private 1:1 courses, group (cohort) courses, and ongoing private mentorship covering programming fundamentals, OOP, databases, and backend and .NET development.",
  },
  {
    q: "Where is Abdullah Sherdy based, and does he work remotely?",
    a: "He is based in Cairo, Egypt, and works both on-site and remotely with clients and teams worldwide.",
  },
];

function faqNode() {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: FAQ.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

function breadcrumbNode(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** Full homepage @graph: Person + WebSite + ProfilePage + Course/Service offerings + FAQ. */
export function homePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personNode(),
      webSiteNode(),
      profilePageNode(),
      ...offeringNodes(),
      faqNode(),
    ],
  };
}

/** Article page @graph: Article + BreadcrumbList. */
export function articlePageJsonLd(article: Article) {
  const url = `${SITE_URL}/articles/${article.slug}`;
  const image = article.cover
    ? (/^https?:\/\//.test(article.cover) ? article.cover : `${SITE_URL}${article.cover.startsWith("/") ? "" : "/"}${article.cover}`)
    : OG_IMAGE;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: article.title,
        description: article.description,
        datePublished: article.date,
        dateModified: article.dateModified,
        inLanguage: "en",
        keywords: article.tags.join(", "),
        articleSection: article.tags[0] ?? "Software Engineering",
        image,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
      },
      breadcrumbNode([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Articles", url: `${SITE_URL}/articles` },
        { name: article.title, url },
      ]),
    ],
  };
}

/** Articles index @graph: CollectionPage + BreadcrumbList. */
export function articlesIndexJsonLd() {
  const url = `${SITE_URL}/articles`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#collection`,
        url,
        name: "Articles — Abdullah Sherdy",
        description:
          ".NET, C#, and backend engineering articles by Abdullah Sherdy — tutorials with runnable code examples.",
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
      },
      breadcrumbNode([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Articles", url },
      ]),
    ],
  };
}
