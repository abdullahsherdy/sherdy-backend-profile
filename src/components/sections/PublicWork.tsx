import { Github, Youtube, Code2, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { socials } from "@/data/portfolio";

const stats = [
  {
    icon: Github,
    label: "GitHub",
    value: "50+ public repos",
    detail: "Regular commits & contributions",
    href: socials.github,
  },
  {
    icon: Code2,
    label: "LeetCode",
    value: "550+ problems solved",
    detail: "Daily problem-solving practice",
    href: socials.leetcode,
  },
  {
    icon: Youtube,
    label: "YouTube",
    value: "Tech tutorials",
    detail: "Software engineering & algorithms content",
    href: socials.youtube,
  },
];

const PublicWork = () => (
  <section id="public-work" className="py-16 px-4 bg-muted/30 scroll-mt-24">
    <div className="container mx-auto max-w-5xl">
      <SectionHeading
        eyebrow="Building in public"
        title="Public Work & Contributions"
        subtitle="Sharing code and knowledge with the community"
      />

      <div className="grid sm:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <AnimatedSection key={stat.label} animation="fade-up" delay={index * 150}>
            <a
              href={stat.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full"
            >
              <Card className="h-full transition-colors border-border/60 group-hover:border-primary/40 group-hover:bg-primary/5">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="p-2.5 bg-primary/10 rounded-lg shrink-0">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1.5">
                      {stat.label}
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </p>
                    <p className="font-semibold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.detail}</p>
                  </div>
                </CardContent>
              </Card>
            </a>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default PublicWork;
