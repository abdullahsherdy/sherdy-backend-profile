import { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import WorkExperience from "@/components/sections/WorkExperience";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import PublicWork from "@/components/sections/PublicWork";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const LearningRoadmap = lazy(() => import("@/components/LearningRoadmap"));

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("projects");

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    try {
      localStorage.setItem("theme", newMode ? "dark" : "light");
    } catch {
      // Ignore localStorage errors (e.g., in private browsing)
    }
  };

  // initialize theme from localStorage, falling back to system preference
  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (stored === "dark" || (!stored && prefersDark)) {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      }
    } catch {
      // Ignore localStorage errors (e.g., in private browsing)
    }
  }, []);

  // basic scrollspy to highlight current section in nav
  useEffect(() => {
    const sectionIds = ["projects", "work-experience", "skills", "services", "learning", "about", "contact"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      // fire when a section crosses the vertical center band of the viewport,
      // so tall sections still activate reliably
      { root: null, rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:bg-background focus:text-foreground focus:px-4 focus:py-2 focus:rounded focus:ring-2 focus:ring-primary"
      >
        Skip to content
      </a>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} activeSection={activeSection} />
      <main id="main">
        <Hero />
        <Projects />
        <WorkExperience />
        <Skills />
        <Services />
        <Suspense fallback={<div id="learning" className="py-16 text-center text-muted-foreground">Loading roadmap…</div>}>
          <LearningRoadmap />
        </Suspense>
        <PublicWork />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
