import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { List, X } from "lucide-react";

export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const TableOfContents = ({ entries }: { entries: TocEntry[] }) => {
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const elements = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (obs) => {
        for (const entry of obs) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  const list = (
    <ul className="space-y-1 text-sm">
      {entries.map((entry) => (
        <li key={entry.id} className={entry.level === 3 ? "pl-4" : ""}>
          <a
            href={`#${entry.id}`}
            onClick={() => setMobileOpen(false)}
            className={`relative block py-1 pl-3 border-l-2 transition-colors leading-snug ${
              activeId === entry.id
                ? "border-primary text-primary font-medium"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {activeId === entry.id && (
              <motion.span
                layoutId="toc-indicator"
                className="absolute -left-0.5 top-0 bottom-0 w-0.5 bg-primary"
              />
            )}
            {entry.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop sticky sidebar */}
      <nav aria-label="Table of contents" className="hidden xl:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">On this page</p>
        {list}
      </nav>

      {/* Mobile floating button + panel */}
      <div className="xl:hidden">
        <button
          type="button"
          aria-label={mobileOpen ? "Close table of contents" : "Open table of contents"}
          onClick={() => setMobileOpen((v) => !v)}
          className="fixed bottom-5 right-5 z-40 rounded-full bg-primary text-primary-foreground p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <List className="h-5 w-5" />}
        </button>
        {mobileOpen && (
          <div className="fixed bottom-20 right-5 z-40 w-72 max-w-[85vw] max-h-[60vh] overflow-y-auto rounded-xl border border-border bg-background p-4 shadow-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">On this page</p>
            {list}
          </div>
        )}
      </div>
    </>
  );
};

export default TableOfContents;
