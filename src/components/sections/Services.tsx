import { BookOpen, GraduationCap, Users, Server, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import MagneticButton from "@/components/MagneticButton";
import { socials } from "@/data/portfolio";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  highlights?: string[];
  tags?: string[];
  cta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

const services: Service[] = [
  {
    icon: BookOpen,
    title: "Private Courses",
    description:
      "1:1 structured courses tailored to your level and goals — programming fundamentals, problem-solving, OOP, databases, and backend development.",
    highlights: [
      "Personalized curriculum and pacing",
      "Live sessions with hands-on coding",
      "Assignments with detailed feedback",
    ],
    cta: {
      label: "Book a Course",
      href: `mailto:${socials.email}?subject=Private%20Course%20Inquiry`,
    },
    secondaryCta: { label: "Contact Me", href: "#contact" },
  },
  {
    icon: GraduationCap,
    title: "Private Mentorship",
    description:
      "Ongoing 1:1 mentorship for your learning journey or career growth — roadmap planning, code reviews, project guidance, and interview preparation.",
    highlights: [
      "Weekly check-ins and goal tracking",
      "Code and project reviews",
      "DM support between sessions",
    ],
    cta: {
      label: "Start Mentorship",
      href: `mailto:${socials.email}?subject=Private%20Mentorship%20Inquiry`,
    },
    secondaryCta: { label: "Contact Me", href: "#contact" },
  },
  {
    icon: Users,
    title: "Group Courses",
    description:
      "Cohort-based courses for small groups — learn together with structured lessons, live coding, and collaborative projects at an accessible price.",
    highlights: [
      "Small groups for real interaction",
      "Structured curriculum with projects",
      "Recorded sessions and resources",
    ],
    cta: {
      label: "Join a Cohort",
      href: `mailto:${socials.email}?subject=Group%20Course%20Inquiry`,
    },
    secondaryCta: { label: "Contact Me", href: "#contact" },
  },
  {
    icon: Server,
    title: "End-to-End Software Development",
    description:
      "Complete software solutions from idea to production — requirements, clean architecture, APIs, database design, and deployment.",
    tags: ["Front-end","Back-end","Full-stack","API Development","Database Design","Deployment", "DevOps  & CI/CD", "Cloud Services", "Testing & QA", "Performance Optimization", "Security Best Practices", "Maintenance & Support"],
    cta: { label: "Request a Quote", href: "#contact" },
    secondaryCta: { label: "View Projects", href: "#projects" },
  },
];

const Services = () => (
  <section id="services" className="py-16 px-4 bg-muted/50 scroll-mt-24" data-section>
    <div className="container mx-auto">
      <SectionHeading eyebrow="Work with me" title="Services" subtitle="How I can help you or your team" />
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {services.map((service, i) => (
          <AnimatedSection
            key={service.title}
            animation={i % 2 === 0 ? "slide-in-left" : "slide-in-right"}
            delay={100 + i * 100}
          >
            <Card className="h-full hover-scale magnetic-hover group transition-colors border-border/60 hover:border-primary/40 hover:bg-primary/5">
              <CardContent className="p-6 flex h-full flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <service.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                {service.highlights && (
                  <ul className="text-sm text-muted-foreground space-y-2 mb-6 list-disc pl-5">
                    {service.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {service.tags && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-3 mt-auto">
                  <MagneticButton>
                    <a href={service.cta.href} className="flex items-center">{service.cta.label}</a>
                  </MagneticButton>
                  <MagneticButton variant="outline">
                    <a href={service.secondaryCta.href}>{service.secondaryCta.label}</a>
                  </MagneticButton>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
