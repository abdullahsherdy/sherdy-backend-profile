import { Link } from "react-router-dom";
import { ArrowUp, Github, Linkedin, Youtube, Code2, Mail } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { socials, resumeUrl } from "@/data/portfolio";

// Home-section anchors mirror the primary nav; use root-relative hrefs so they
// work from any route (the footer renders on every page).
const exploreLinks = [
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#services", label: "Services" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#contact", label: "Contact" },
];

const pageLinks = [
  { to: "/articles", label: "Articles" },
  { to: "/updates", label: "Updates" },
];

const connectLinks = [
  { href: socials.github, label: "GitHub", icon: Github },
  { href: socials.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: socials.youtube, label: "YouTube", icon: Youtube },
  { href: socials.leetcode, label: "LeetCode", icon: Code2 },
  { href: `mailto:${socials.email}`, label: "Email", icon: Mail },
];

const scrollToTop = () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
};

const Footer = () => (
  <footer className="border-t border-border bg-muted/30">
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand + conversion CTAs */}
        <div className="sm:col-span-2">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-3">
            <img src="/favicon.svg" alt="" className="h-7 w-7" />
            <span className="text-lg font-bold font-display">Abdullah Sherdy</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-sm mb-5 leading-relaxed">
            Software Engineer, Full-Stack Developer &amp; Coding Instructor in Cairo, Egypt —
            building production APIs and teaching the fundamentals behind them.
          </p>
          <div className="flex flex-wrap gap-3">
            <MagneticButton asChild size="sm">
              <a href="/#contact">Hire me</a>
            </MagneticButton>
            <MagneticButton asChild variant="outline" size="sm">
              <a href={resumeUrl} download>Resume</a>
            </MagneticButton>
          </div>
        </div>

        {/* Explore — mirrors the primary nav */}
        <nav aria-label="Footer" className="text-sm">
          <p className="eyebrow mb-3">Explore</p>
          <ul className="space-y-2.5">
            {exploreLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
            {pageLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Connect */}
        <div className="text-sm">
          <p className="eyebrow mb-3">Connect</p>
          <ul className="space-y-2.5">
            {connectLinks.map((l) => {
              const isMail = l.href.startsWith("mailto:");
              return (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={isMail ? undefined : "_blank"}
                    rel={isMail ? undefined : "noopener noreferrer"}
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <l.icon className="h-4 w-4" aria-hidden="true" />
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Abdullah Sherdy. All rights reserved.
        </p>
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
          Back to top
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
