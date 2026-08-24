import { BookOpen, GraduationCap, Users, Server, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import MagneticButton from "@/components/MagneticButton";
import { socials } from "@/data/portfolio";

// Set this to your Calendly (or other scheduling) link to show the "Book a Free Call" CTA.
// Blank until a real booking page exists, so no button ever points at a dead link — WhatsApp
// and Email stay the live paths (mirrors the EmailJS/Supabase "no-op when unset" pattern).
const CALENDLY_URL: string = "";

type ServiceType = "teaching" | "engineering";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  highlights?: string[];
  tags?: string[];
  inquiry: string;
  type: ServiceType;
};

const emailHref = (inquiry: string) =>
  `mailto:${socials.email}?subject=${encodeURIComponent(`${inquiry} Inquiry`)}`;

const whatsappHref = (inquiry: string) =>
  `${socials.whatsapp}?text=${encodeURIComponent(`Hi Abdullah, I'm interested in your ${inquiry} service.`)}`;

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
    inquiry: "Private Course",
    type: "teaching",
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
    inquiry: "Private Mentorship",
    type: "teaching",
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
    inquiry: "Group Course",
    type: "teaching",
  },
  {
    icon: Server,
    title: "End-to-End Software Development",
    description:
      "Custom software for startups and businesses — from requirements to production. I handle Clean Architecture APIs, database design, React/Next.js frontends, Docker deployment, and CI/CD pipelines.",
    tags: ["Clean Architecture APIs", "Database Design", "React & Next.js", "Docker & CI/CD", "Cloud Deployment", "Testing & QA"],
    inquiry: "Software Development",
    type: "engineering",
  },
];

const teachingCardClass =
  "h-full hover-scale magnetic-hover group transition-colors border-accent/30 hover:border-accent/60 hover:bg-accent/5";
const engineeringCardClass =
  "h-full hover-scale magnetic-hover group transition-colors border-border/60 hover:border-primary/40 hover:bg-primary/5";

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
            <Card className={service.type === "teaching" ? teachingCardClass : engineeringCardClass}>
              <CardContent className="p-6 flex h-full flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <service.icon
                    className={`h-5 w-5 group-hover:scale-110 transition-transform ${
                      service.type === "teaching" ? "text-accent" : "text-primary"
                    }`}
                  />
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
                  {CALENDLY_URL ? (
                    <MagneticButton asChild>
                      <a
                        href={CALENDLY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Book a Free Call
                      </a>
                    </MagneticButton>
                  ) : null}
                  <MagneticButton asChild variant={CALENDLY_URL ? "outline" : "default"}>
                    <a
                      href={whatsappHref(service.inquiry)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                  </MagneticButton>
                  <MagneticButton asChild variant="ghost">
                    <a href={emailHref(service.inquiry)}>Email</a>
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
