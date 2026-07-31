import type { LucideIcon } from "lucide-react";

export const socials = {
  github: "https://github.com/abdullahsherdy",
  linkedin: "https://www.linkedin.com/in/abdullah-sherdy/",
  youtube: "https://www.youtube.com/channel/UCOP9CFwH4OVHHQaznTgNDsw",
  leetcode: "https://leetcode.com/u/abdallahsherdy",
  email: "abdullah.sherdy.work@gmail.com",
  phone: "+20 010 2186 2880",
  location: "Cairo, Egypt",
};

export const heroTech = [
  "C#",
  "ASP.NET Core",
  "SQL Server",
  "EF Core",
  "Docker",
  "RESTful APIs",
  "Clean Architecture",
  "Git",
];

export const skills = {
  backend: ["C#", "ASP.NET Core", "Python", "PHP", "Java", "JS"],
  devops: ["Git", "Cloud", "Docker"],
  database: ["MSSQL", "Oracle", "EF Core", "MongoDB"],
  principles: ["OOP", "SOLID", "RESTful API", "Clean Architecture"],
  workflow: ["Agile/Scrum", "Trello", "Git-Flow"],
};

export const skillLevels = [
  { skill: "C# & ASP.NET Core", percentage: 90 },
  { skill: "Database Design", percentage: 85 },
  { skill: "RESTful APIs", percentage: 88 },
  { skill: "Docker & DevOps", percentage: 75 },
  { skill: "System Architecture", percentage: 80 },
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
    title: "The Book Haven – Library Management System",
    description:
      "Full-stack library management system with role-based access control (Admin, Author, Member), loan tracking, penalty calculation, and comprehensive book management.",
    role: "Full-Stack Developer",
    impact: [
      "Implemented role-based authorization with ASP.NET Identity",
      "Designed normalized database schema reducing data redundancy by 40%",
      "Built automated penalty calculation system for overdue loans",
    ],
    techDecision:
      "Used ASP.NET MVC with EF Core for rapid development while maintaining clean separation of concerns",
    tech: ["ASP.NET MVC", "C#", "EF Core", "SQL Server", "Bootstrap"],
    github: "https://github.com/abdullahsherdy/The-Book-Haven",
    demo: null,
  },
  {
    title: "FixMate – Vehicle Service Booking Platform",
    description:
      "Clean architecture-based RESTful API for vehicle service booking, managing service requests, status tracking, and mechanic assignment with real-time updates.",
    role: "Backend Engineer",
    impact: [
      "Architected solution using Clean Architecture principles with CQRS pattern",
      "Implemented repository pattern with Unit of Work for maintainable data access",
      "Containerized application with Docker for consistent deployment",
    ],
    techDecision:
      "Adopted Clean Architecture to ensure testability, maintainability, and independence from frameworks",
    tech: ["ASP.NET Core Web API", "C#", "Clean Architecture", "SQL Server", "Docker", "Swagger"],
    github: null,
    demo: null,
  },
];

export interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

export const experience: Experience[] = [
  {
    title: "Backend Engineer Intern",
    company: "Code Casa",
    duration: "2024",
    description: "Developed a large-scale web application",
  },
  {
    title: "Online Coding Instructor",
    company: "Private Group Related to freelance camp initiative",
    duration: "Feb 2025 - Present",
    description: "Teaching programming to students aged 14–24",
  },
];

export const roles = ["Software Engineer", "Backend Engineer", "Coding Instructor"];
