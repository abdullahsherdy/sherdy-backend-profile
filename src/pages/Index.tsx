import { useState, useEffect } from "react";
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
import LearningRoadmap from "@/components/LearningRoadmap";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");

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
    const sectionIds = ["about", "projects", "services", "learning", "skills", "contact"];
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
      { root: null, threshold: 0.4 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} activeSection={activeSection} />
      <Hero />
      <Projects />
      <WorkExperience />
      <Skills />
      <Services />
      <LearningRoadmap />
      <PublicWork />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
