import { type ReactNode } from "react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PageTransition from "@/components/shared/PageTransition";
import { useDarkMode } from "@/hooks/useDarkMode";

interface PageShellProps {
  /** The page's own <Seo> element — kept in the page so each passes its own props. */
  seo?: ReactNode;
  /** Nav section id to highlight (empty = no active link). */
  activeSection?: string;
  /** Chrome rendered between the navbar and <main> (fixed-position bars, prompts). */
  beforeMain?: ReactNode;
  /** Override the <main> classes; defaults to the standard content container. */
  mainClassName?: string;
  children: ReactNode;
}

const DEFAULT_MAIN = "container mx-auto px-4 pt-28 pb-20";

/**
 * Standard chrome for every non-home route: background, skip-link, Navbar (with
 * the shared dark-mode hook), page transition, <main id="main">, and Footer.
 * Extracted so the shell — and the route-level skip target — lives in one place
 * instead of being hand-repeated (and forgotten on 404 / article-not-found).
 */
const PageShell = ({
  seo,
  activeSection = "",
  beforeMain,
  mainClassName = DEFAULT_MAIN,
  children,
}: PageShellProps) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {seo}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:bg-background focus:text-foreground focus:px-4 focus:py-2 focus:rounded focus:ring-2 focus:ring-primary"
      >
        Skip to content
      </a>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} activeSection={activeSection} />
      {beforeMain}
      <PageTransition>
        <main id="main" className={mainClassName}>
          {children}
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default PageShell;
