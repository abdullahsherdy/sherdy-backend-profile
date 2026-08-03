import type { LucideIcon } from "lucide-react";

export const socials = {
  github: "https://github.com/abdullahsherdy",
  linkedin: "https://www.linkedin.com/in/abdullah-sherdy/",
  youtube: "https://www.youtube.com/channel/UCOP9CFwH4OVHHQaznTgNDsw",
  leetcode: "https://leetcode.com/u/abdallahsherdy",
  email: "abdullah.sherdy.work@gmail.com",
  phone: "+20 010 2186 2880",
  whatsapp: "https://wa.me/201021862880",
  location: "Cairo, Egypt",
};

export const heroTech = [
  "C#",
  "ASP.NET Core",
  "Node.js",
  "React",
  "Next.js",
  "TypeScript",
  "SQL Server",
  "EF Core",
  "Docker",
  "Clean Architecture",
];

export const skills = {
  backend: ["C#", "ASP.NET Core", "Node.js (Express, NestJS)", "Python", "FastAPI"],
  frontend: ["React", "Next.js", "TypeScript"],
  database: ["MSSQL", "MySQL", "MongoDB", "EF Core"],
  "APIs & auth": ["RESTful APIs", "Swagger/OpenAPI", "WebSocket", "JWT", "OAuth"],
  devops: ["Git", "GitOps", "Docker", "CI/CD (GitHub Actions)"],
  workflow: ["Agile/Scrum", "Git-Flow", "Clean Architecture", "SOLID"],
};

export const focusAreas = [
  { skill: "C# & ASP.NET Core", context: "Primary stack — production APIs, Clean Architecture, CQRS" },
  { skill: "Node.js (Express, NestJS)", context: "Second backend stack for REST services" },
  { skill: "Database Design", context: "Normalized schemas, EF Core, MSSQL, MySQL & MongoDB" },
  { skill: "React & Next.js", context: "Full-stack apps with TypeScript on top of backend depth" },
  { skill: "Teaching & Mentorship", context: "Instructor at Netpoint, Code School, iSchool; DEPI mentor" },
];

export interface Project {
  title: string;
  description: string;
  role: string;
  impact: string[];
  techDecision: string;
  tech: string[];
  github: string | null;
  demo: string | null;
}

export const projects: Project[] = [
  {
    title: "Wasla — Real-Time Egyptian Sign Language & Emotion Recognition",
    description:
      "Graduation project: a multi-threaded real-time computer vision pipeline (MediaPipe + Keras) recognizing Egyptian Sign Language and emotions, served through a desktop app and a FastAPI/WebSocket service.",
    role: "Backend & ML Engineer",
    impact: [
      "Designed a multi-threaded inference pipeline with bounded, drop-oldest queues to decouple camera capture latency from model inference",
      "Exposed a stable predict_frame() API contract (label, confidence, emotion) so a separate team could integrate without breaking changes",
      "Served the model over FastAPI + WebSocket: decoded base64 JPEG frames, ran inference, streamed back predictions with latency metrics",
      "Evaluated 3 model architectures (baseline MLP, augmented MLP, Bi-LSTM) with ablation tables and confusion matrices to justify the production choice",
    ],
    techDecision:
      "Chose a bounded-queue threading model over synchronous inference to keep the UI responsive under variable camera and model latency",
    tech: ["Python", "MediaPipe", "TensorFlow/Keras", "OpenCV", "FastAPI", "WebSocket"],
    github: "https://github.com/abdullahsherdy/ESL-software-ml",
    demo: null,
  },
  {
    title: "FixMate — Vehicle Service Booking Platform",
    description:
      "Clean architecture-based RESTful API for vehicle service booking, managing service requests, status tracking, and mechanic assignment.",
    role: "Backend Engineer",
    impact: [
      "Architected with Clean Architecture (Domain, Application, Infrastructure, API layers) for independently testable concerns",
      "Built end-to-end booking workflows with JWT-based authentication and role-based authorization",
      "Containerized with Docker and documented via Swagger/OpenAPI",
    ],
    techDecision:
      "Adopted Clean Architecture to ensure testability, maintainability, and independence from frameworks",
    tech: ["ASP.NET Core 8", "C#", "EF Core", "Clean Architecture", "Docker", "JWT", "Swagger"],
    github: "https://github.com/abdullahsherdy/FixMate",
    demo: null,
  },
  {
    title: "GenzApp — Authentication Module",
    description:
      "Freelance engagement: designed and implemented the authentication module for a client application.",
    role: "Backend Developer (auth module)",
    impact: [
      "Implemented OAuth-based authentication flows for secure third-party sign-in",
      "Delivered the module as an independent, integrable unit within the client's existing stack",
    ],
    techDecision:
      "Scoped strictly to the auth boundary so the module could ship without coupling to the client's product roadmap",
    tech: ["OAuth", "JWT", "RESTful APIs"],
    github: null,
    demo: "https://genzapp.com",
  },
];

export interface Experience {
  title: string;
  company: string;
  duration: string;
  location: string;
  bullets: string[];
}

export const experience: Experience[] = [
  {
    title: "Technical Instructor / Backend Mentor",
    company: "Netpoint Software Solutions",
    duration: "Jun 2026 – Present",
    location: "Cairo, Egypt",
    bullets: [
      "Designed and delivered an 8-session .NET backend internship program for fresh graduates",
      "Guided participants through curriculum design and capstone project development",
      "Contributed to backend software solutions alongside training work",
    ],
  },
  {
    title: "Coding Instructor",
    company: "iSchool",
    duration: "Part-time Jun – Nov 2025 · Contract Dec 2025 – Present",
    location: "Cairo / Remote",
    bullets: [
      "Delivered interactive coding sessions for beginner and intermediate students across multiple age groups",
      "Collaborated with design teams to tailor curriculum content to student needs",
    ],
  },
  {
    title: "Part-Time Coding Instructor",
    company: "Code School",
    duration: "Oct 2025 – Present",
    location: "Cairo / Remote",
    bullets: [
      "Delivered project-based programming sessions for school-age students, building algorithmic thinking through Python and web-technology projects",
    ],
  },
  {
    title: "Private Coding Instructor & Mentor",
    company: "Independent",
    duration: "Ongoing",
    location: "Online / In-person",
    bullets: [
      "Teach programming fundamentals: syntax, OOP, data structures, and algorithms",
      "Design dedicated custom learning plans based on each student's level and learning behaviour",
    ],
  },
  {
    title: "Lead Instructor",
    company: "Mo5am El Freelance (Freelance Initiative)",
    duration: "Jan 2025 – Jul 2025",
    location: "Port Said, Egypt",
    bullets: [
      "Led a 7-month program training young learners in programming and freelancing workflows; multiple participants landed their first freelance work",
    ],
  },
  {
    title: "Technical Mentor — Backend Track (.NET)",
    company: "Digital Egypt Pioneers Initiative (DEPI)",
    duration: "May 2024 – Dec 2024",
    location: "Cairo, Egypt",
    bullets: [
      "Mentored student cohorts on backend development, REST API design, and Clean Architecture",
      "Ran structured code reviews that directly improved code quality and debugging skills",
    ],
  },
];

export const roles = ["Software Engineer", "Full-Stack Developer", "Coding Instructor"];
