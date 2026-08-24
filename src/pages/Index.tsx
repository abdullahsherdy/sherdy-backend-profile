import { useState, useEffect, useMemo, useCallback, lazy, Suspense } from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import WorkExperience from "@/components/sections/WorkExperience";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import PublicWork from "@/components/sections/PublicWork";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Reviews from "@/components/sections/Reviews";
import Footer from "@/components/sections/Footer";
import LatestArticles from "@/components/sections/LatestArticles";
import Seo from "@/components/shared/Seo";
import { homePageJsonLd } from "@/lib/structuredData";
import { useDarkMode } from "@/hooks/useDarkMode";

const LearningRoadmap = lazy(() => import("@/components/LearningRoadmap"));

const Index = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [activeSection, setActiveSection] = useState<string>("projects");
  // Flipped once the lazy LearningRoadmap mounts, so the scrollspy effect re-runs
  // and observes the real #learning section (not just the Suspense placeholder).
  const [roadmapLoaded, setRoadmapLoaded] = useState(false);
  const handleRoadmapReady = useCallback(() => setRoadmapLoaded(true), []);

  // Stable across scrollspy re-renders so <Seo> doesn't rebuild the JSON-LD script on every scroll.
  const jsonLd = useMemo(() => homePageJsonLd(), []);

  // Scrollspy: highlight the current section in the nav.
  useEffect(() => {
    const sectionIds = ["projects", "skills", "learning", "work-experience", "services", "reviews", "about", "contact"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const visible = new Set<string>();

    const update = () => {
      // The last (short) section can't reach the center band, so activate it
      // whenever the page is scrolled to the very bottom.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }
      // Otherwise the topmost section (in document order) inside the band wins.
      // Picking topmost — rather than last-writer — avoids flicker when several
      // sections cross the band in one observer batch.
      const topmost = sectionIds.find((id) => visible.has(id));
      if (topmost) setActiveSection(topmost);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        update();
      },
      // fire when a section crosses the vertical center band of the viewport,
      // so tall sections still activate reliably
      { root: null, rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    elements.forEach((el) => observer.observe(el));

    // Bottom-activation depends on scroll position, which the observer alone
    // won't re-check once the sections stop crossing the band.
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [roadmapLoaded]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Seo
        title="Abdullah Sherdy — Software Engineer · Full-Stack Developer · Coding Instructor | Cairo, Egypt"
        description="Abdullah Sherdy is a .NET Backend Engineer based in Cairo, Egypt. 2+ years building production APIs with ASP.NET Core and Node.js. Available for hire: full-time, contract, and freelance. Also offering private courses, group courses, and mentorship."
        canonicalPath="/"
        jsonLd={jsonLd}
      />
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
        <PublicWork />
        <Skills />
        <Suspense fallback={<div id="learning" className="py-16 text-center text-muted-foreground">Loading roadmap…</div>}>
          <LearningRoadmap onReady={handleRoadmapReady} />
        </Suspense>
        <WorkExperience />
        <Services />
        <LatestArticles />
        <Reviews />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
