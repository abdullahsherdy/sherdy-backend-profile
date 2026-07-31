import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { experience } from "@/data/portfolio";

const WorkExperience = () => (
  <section id="work-experience" className="py-16 px-4 scroll-mt-24" data-section>
    <div className="container mx-auto">
      <SectionHeading eyebrow="Track record" title="Work Experience" />
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {experience.map((job, idx) => (
          <AnimatedSection key={idx} animation="slide-in-left" delay={idx * 200}>
            <Card className="hover-scale magnetic-hover transition-colors border-border/60 hover:border-primary/40 hover:bg-primary/5">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-primary">{job.company}</span>
                  <span className="text-xs text-muted-foreground">&bull;</span>
                  <span className="text-sm text-muted-foreground">{job.duration}</span>
                </div>
                <p className="text-muted-foreground text-sm">{job.description}</p>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default WorkExperience;
