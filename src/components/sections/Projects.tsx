import { Github, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import MagneticButton from "@/components/MagneticButton";
import { projects, socials } from "@/data/portfolio";

const Projects = () => (
  <section id="projects" className="py-20 px-4 scroll-mt-24" data-section>
    <div className="container mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="Proof of work"
        title="Featured Projects"
        subtitle="Real-world applications showcasing backend engineering expertise"
      />

      <div className="space-y-8">
        {projects.map((project, index) => (
          <AnimatedSection key={index} animation="fade-up" delay={index * 200}>
            <Card className="hover-scale magnetic-hover group transition-all duration-300 border-border/60 hover:border-primary/40 hover:shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-sm text-primary font-medium mb-3">{project.role}</p>
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <MagneticButton variant="outline" size="sm">
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                          <Github className="h-4 w-4" />
                          <span>Code</span>
                        </a>
                      </MagneticButton>
                    )}
                    {project.demo && (
                      <MagneticButton variant="default" size="sm">
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4" />
                          <span>Demo</span>
                        </a>
                      </MagneticButton>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <span className="inline-block w-1 h-4 bg-primary rounded"></span>
                    Key Contributions & Impact
                  </h4>
                  <ul className="space-y-2 ml-3">
                    {project.impact.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6 p-4 bg-muted/40 rounded-lg border border-border/40">
                  <h4 className="text-sm font-semibold mb-2">Architecture Decision</h4>
                  <p className="text-sm text-muted-foreground italic">{project.techDecision}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="px-3 py-1">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection animation="fade-up" delay={600}>
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            View more projects and contributions on GitHub
          </p>
          <MagneticButton variant="outline">
            <a href={socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              <span>Visit GitHub Profile</span>
            </a>
          </MagneticButton>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default Projects;
