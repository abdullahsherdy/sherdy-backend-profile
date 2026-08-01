import { GraduationCap, Server } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import MagneticButton from "@/components/MagneticButton";
import { socials } from "@/data/portfolio";

const Services = () => (
  <section id="services" className="py-16 px-4 bg-muted/50 scroll-mt-24" data-section>
    <div className="container mx-auto">
      <SectionHeading eyebrow="Work with me" title="Services" subtitle="How I can help you or your team" />
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <AnimatedSection animation="slide-in-left" delay={100}>
          <Card className="hover-scale magnetic-hover group transition-colors border-border/60 hover:border-primary/40 hover:bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <GraduationCap className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold">1:1 Private Coding Instructor</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Personalized mentorship for beginners and intermediates. Curriculum tailored to your goals (fundamentals, problem-solving, backend basics, project guidance).
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 mb-6 list-disc pl-5">
                <li>Weekly 60–90 min live sessions + homework review</li>
                <li>Structured roadmap and resources</li>
                <li>DM support between sessions</li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <MagneticButton>
                  <a
                    href={`mailto:${socials.email}?subject=1%3A1%20Private%20Coding%20Instruction%20Inquiry`}
                    className="flex items-center"
                  >
                    Book 1:1 Session
                  </a>
                </MagneticButton>
                <MagneticButton variant="outline">
                  <a href="#contact">Contact Me</a>
                </MagneticButton>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection animation="slide-in-right" delay={200}>
          <Card className="hover-scale magnetic-hover group transition-colors border-border/60 hover:border-primary/40 hover:bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Server className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold">Backend Engineering & APIs</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                End-to-end backend solutions: clean architectures, RESTful APIs, database design, performance tuning, containerization, and deployment.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["ASP.NET Core", "EF Core", "SQL Server", "Docker", "Clean Architecture"].map((tag, i) => (
                  <Badge key={i} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <MagneticButton>
                  <a href="#contact">Request a Quote</a>
                </MagneticButton>
                <MagneticButton variant="outline">
                  <a href="#projects" className="flex items-center">View Projects</a>
                </MagneticButton>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default Services;
