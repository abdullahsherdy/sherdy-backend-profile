import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Moon, Sun, Github, Linkedin, Youtube, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/MagneticButton";
import AnimatedSection from "@/components/AnimatedSection";
import { socials } from "@/data/portfolio";

const navLinks: { href: string; id: string; label: string; route?: boolean }[] = [
  { href: "/#projects", id: "projects", label: "Projects" },
  { href: "/#skills", id: "skills", label: "Skills" },
  { href: "/#learning", id: "learning", label: "Learning" },
  { href: "/#work-experience", id: "work-experience", label: "Experience" },
  { href: "/#services", id: "services", label: "Services" },
  { href: "/articles", id: "articles", label: "Articles", route: true },
  { href: "/#reviews", id: "reviews", label: "Reviews" },
  { href: "/#about", id: "about", label: "About" },
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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    // Capture the trigger now so the cleanup restores focus to the same node.
    const menuButton = menuButtonRef.current;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      // Trap focus inside the drawer while it's open.
      const drawer = drawerRef.current;
      if (!drawer) return;
      const focusables = drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      // Return focus to the trigger when the drawer closes.
      menuButton?.focus();
    };
  }, [isMobileMenuOpen]);

  return (
    <nav aria-label="Primary" className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <AnimatedSection animation="fade-up">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/favicon.svg" alt="" className="h-8 w-8" />
            <span className="text-lg sm:text-xl font-bold font-display">Abdullah Sherdy</span>
          </Link>
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
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"} className="magnetic-hover">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {/* Persistent conversion CTA — gated to lg+ so it doesn't crowd the md bar. */}
            <div className="hidden lg:flex">
              <MagneticButton asChild size="sm">
                <a href="/#contact">Hire me</a>
              </MagneticButton>
            </div>
          </div>
          {/* Hamburger for Mobile */}
          <button
            ref={menuButtonRef}
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
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
              aria-hidden="true"
              tabIndex={-1}
            />
            <aside
              ref={drawerRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="relative z-10 w-72 max-w-[85vw] h-full bg-background border-r border-border shadow-2xl p-6 flex flex-col gap-6 overflow-y-auto animate-slide-in-left"
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
              <MagneticButton asChild size="sm" className="mt-8 mb-2">
                <a href="/#contact" onClick={() => setIsMobileMenuOpen(false)}>Hire me</a>
              </MagneticButton>
              <nav aria-label="Mobile" className="flex flex-col gap-4">
                {navLinks.map((link) =>
                  link.route ? (
                    <Link
                      key={link.id}
                      to={link.href}
                      aria-current={activeSection === link.id ? "page" : undefined}
                      className={`hover:text-primary transition-colors text-lg ${activeSection === link.id ? "text-primary font-medium" : ""}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.id}
                      href={link.href}
                      aria-current={activeSection === link.id ? "page" : undefined}
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
                  aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
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
