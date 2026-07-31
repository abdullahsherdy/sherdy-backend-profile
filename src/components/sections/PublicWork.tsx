import { Github, Youtube, Server, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import MagneticButton from "@/components/MagneticButton";
import { socials } from "@/data/portfolio";

const stats = [
  {
    icon: Github,
    title: "GitHub",
    primary: "15+",
    primaryLabel: "Public Repositories",
    secondary: "Active",
    secondaryLabel: "Regular commits & contributions",
    href: socials.github,
    cta: "View Profile",
    ctaIcon: Github,
  },
  {
    icon: Server,
    title: "LeetCode",
    primary: "100+",
    primaryLabel: "Problems Solved",
    secondary: "Consistent",
    secondaryLabel: "Daily problem-solving practice",
    href: socials.leetcode,
    cta: "View Profile",
    ctaIcon: ExternalLink,
  },
  {
    icon: Youtube,
    title: "YouTube",
    primary: "Educational",
    primaryLabel: "Content Creator",
    secondary: "Tech Tutorials",
    secondaryLabel: "Backend & algorithms content",
    href: socials.youtube,
    cta: "Visit Channel",
    ctaIcon: Youtube,
  },
];

const PublicWork = () => (
  <section className="py-20 px-4 bg-muted/30">
    <div className="container mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="Building in public"
        title="Public Work & Contributions"
        subtitle="Building in public and sharing knowledge with the community"
      />

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <AnimatedSection key={stat.title} animation="fade-up" delay={(index + 1) * 200}>
            <Card className="hover-scale magnetic-hover transition-all duration-300 border-border/60 hover:border-primary/40 h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{stat.title}</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-3xl font-bold text-primary">{stat.primary}</p>
                    <p className="text-sm text-muted-foreground">{stat.primaryLabel}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{stat.secondary}</p>
                    <p className="text-sm text-muted-foreground">{stat.secondaryLabel}</p>
                  </div>
                </div>
                <MagneticButton variant="outline" className="w-full mt-6">
                  <a href={stat.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <stat.ctaIcon className="h-4 w-4" />
                    <span>{stat.cta}</span>
                  </a>
                </MagneticButton>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection animation="fade-up" delay={800}>
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6 text-center">
            <p className="text-lg font-medium mb-2">
              <span className="text-primary">Committed to continuous learning</span> and contributing to the developer community
            </p>
            <p className="text-muted-foreground text-sm">
              Regular code contributions, problem-solving practice, and knowledge sharing through educational content
            </p>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  </section>
);

export default PublicWork;
