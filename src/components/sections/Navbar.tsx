import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Moon, Sun, Github, Linkedin, Youtube, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { socials } from "@/data/portfolio";

const navLinks: { href: string; id: string; label: string; route?: boolean }[] = [
  { href: "/#projects", id: "projects", label: "Projects" },
  { href: "/#work-experience", id: "work-experience", label: "Experience" },
  { href: "/#skills", id: "skills", label: "Skills" },
  { href: "/#services", id: "services", label: "Services" },
  { href: "/#learning", id: "learning", label: "Learning" },
  { href: "/articles", id: "articles", label: "Articles", route: true },
  // { href: "/playground", id: "playground", label: "Playground", route: true },
  { href: "/#about", id: "about", label: "About" },
  { href: "/#reviews", id: "reviews", label: "Reviews" },
  { href: "/#contact", id: "contact", label: "Contact" },
];

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  activeSection: string;
}

const Navbar = ({ isDarkMode, toggleDarkMode, activeSection }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <AnimatedSection animation="fade-up">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/favicon.svg" alt="" className="h-8 w-8" />
            <span className="text-lg sm:text-xl font-bold font-display">Abdullah Sherdy</span>
          </a>
        </AnimatedSection>
        <AnimatedSection animation="slide-in-right" delay={300}>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) =>
              link.route ? (
                <Link
                  key={link.id}
                  to={link.href}
                  aria-current={activeSection === link.id ? "page" : undefined}
                  className={`link-underline hover:text-primary transition-colors ${activeSection === link.id ? "text-primary" : ""}`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.id}
                  href={link.href}
                  aria-current={activeSection === link.id ? "page" : undefined}
                  className={`link-underline hover:text-primary transition-colors ${activeSection === link.id ? "text-primary" : ""}`}
                >
                  {link.label}
                </a>
              )
            )}

            <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="magnetic-hover">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
          {/* Hamburger for Mobile */}
          <button
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Open menu"
            onClick={() => setIsMobileMenuOpen(true)}
            type="button"
          >
            <Menu className="h-7 w-7" />
          </button>
        </AnimatedSection>
      </div>
      {/* Mobile Aside Menu — portaled so the navbar's backdrop-filter can't trap the fixed overlay */}
      {isMobileMenuOpen &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu overlay"
              tabIndex={-1}
            />
            <aside
              className="relative z-10 w-72 max-w-[85vw] h-full bg-background border-r border-border shadow-2xl p-6 flex flex-col gap-6 overflow-y-auto animate-slide-in-left"
              aria-label="Mobile menu"
            >
              <button
                ref={closeButtonRef}
                className="absolute top-4 right-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Close menu"
                onClick={() => setIsMobileMenuOpen(false)}
                type="button"
              >
                <X className="h-6 w-6" />
              </button>
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) =>
                  link.route ? (
                    <Link
                      key={link.id}
                      to={link.href}
                      className={`hover:text-primary transition-colors text-lg ${activeSection === link.id ? "text-primary font-medium" : ""}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.id}
                      href={link.href}
                      className={`hover:text-primary transition-colors text-lg ${activeSection === link.id ? "text-primary font-medium" : ""}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  )
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => { toggleDarkMode(); setIsMobileMenuOpen(false); }}
                  className="magnetic-hover self-start mt-2"
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </nav>
              <div className="flex gap-4 mt-auto pt-6 border-t border-border">
                <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors"><Github className="h-5 w-5" /></a>
                <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></a>
                <a href={socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-muted-foreground hover:text-primary transition-colors"><Youtube className="h-5 w-5" /></a>
              </div>
            </aside>
          </div>,
          document.body
        )}
    </nav>
  );
};

export default Navbar;
