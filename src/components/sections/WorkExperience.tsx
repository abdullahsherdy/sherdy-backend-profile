import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { experience } from "@/data/portfolio";

const WorkExperience = () => (
  <section id="work-experience" className="py-16 px-4 bg-muted/50 scroll-mt-24" data-section>
    <div className="container mx-auto">
      <SectionHeading eyebrow="Track record" title="Work Experience" />
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {experience.map((job, idx) => (
          <AnimatedSection key={idx} animation="fade-up" delay={idx * 100}>
            <Card className="h-full hover-scale magnetic-hover transition-colors border-border/60 hover:border-primary/40 hover:bg-primary/5">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                <p className="font-medium text-primary mb-1">{job.company}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 text-sm text-muted-foreground">
                  <span className="font-mono text-xs">{job.duration}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {job.location}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {job.bullets.map((bullet, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default WorkExperience;
