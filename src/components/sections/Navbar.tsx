import { useState } from "react";
import { Moon, Sun, Github, Linkedin, Youtube, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { socials } from "@/data/portfolio";

const navLinks = [
  { href: "#about", id: "about", label: "About" },
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#services", id: "services", label: "Services" },
  { href: "#learning", id: "learning", label: "Learning" },
  { href: "#skills", id: "skills", label: "Skills" },
  { href: "#contact", id: "contact", label: "Contact" },
];

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  activeSection: string;
}

const Navbar = ({ isDarkMode, toggleDarkMode, activeSection }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <AnimatedSection animation="fade-up">
          <h1 className="text-xl font-bold">Abdullah Sherdy</h1>
        </AnimatedSection>
        <AnimatedSection animation="slide-in-right" delay={300}>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                aria-current={activeSection === link.id ? "page" : undefined}
                className={`link-underline hover:text-primary transition-colors ${activeSection === link.id ? "text-primary" : ""}`}
              >
                {link.label}
              </a>
            ))}
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
      {/* Mobile Aside Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu overlay"
            tabIndex={-1}
          />
          <aside
            className="relative ml-0 w-64 max-w-[80vw] h-full bg-background shadow-lg p-6 flex flex-col gap-6 animate-slide-in-left"
            style={{ zIndex: 101 }}
            aria-label="Mobile menu"
          >
            <button
              className="absolute top-4 right-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Close menu"
              onClick={() => setIsMobileMenuOpen(false)}
              type="button"
            >
              <X className="h-6 w-6" />
            </button>
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="link-underline hover:text-primary transition-colors text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => { toggleDarkMode(); setIsMobileMenuOpen(false); }}
                className="magnetic-hover self-start mt-2"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </nav>
            <div className="flex gap-3 mt-8">
              <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github className="h-5 w-5" /></a>
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
              <a href={socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube className="h-5 w-5" /></a>
            </div>
          </aside>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
