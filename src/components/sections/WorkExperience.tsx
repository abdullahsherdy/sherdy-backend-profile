import { MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { experience, type Experience } from "@/data/portfolio";

const engineering = experience.filter((e) => e.category === "engineering");
const teaching = experience.filter((e) => e.category === "teaching");

const ExperienceCard = ({ job, idx }: { job: Experience; idx: number }) => (
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
);

const WorkExperience = () => (
  <section id="work-experience" className="py-16 px-4 scroll-mt-24" data-section>
    <div className="container mx-auto">
      <SectionHeading eyebrow="Track record" title="Work Experience" />
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <p className="eyebrow mb-6">Engineering</p>
          <div className="grid md:grid-cols-2 gap-8">
            {engineering.map((job, idx) => (
              <ExperienceCard key={job.company} job={job} idx={idx} />
            ))}
            {engineering.length < 2 && (
              <AnimatedSection animation="fade-up" delay={engineering.length * 100}>
                <a
                  href="#projects"
                  className="group flex h-full flex-col justify-center rounded-lg border border-dashed border-border/60 p-6 text-center transition-colors hover:border-primary/40 hover:bg-primary/5"
                >
                  <p className="font-medium text-foreground mb-1">More engineering in my projects</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Beyond formal roles, my backend work shows up in the build — Clean Architecture APIs, auth modules, and real-time services.
                  </p>
                  <span className="inline-flex items-center justify-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2">
                    See projects <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              </AnimatedSection>
            )}
          </div>
        </div>
        <div>
          <p className="eyebrow mb-6">Teaching &amp; Mentorship</p>
          <div className="grid md:grid-cols-2 gap-8">
            {teaching.map((job, idx) => (
              <ExperienceCard key={job.company + idx} job={job} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WorkExperience;
