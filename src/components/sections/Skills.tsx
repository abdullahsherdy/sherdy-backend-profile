import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { skills, focusAreas } from "@/data/portfolio";

const Skills = () => (
  <section id="skills" className="py-16 px-4 scroll-mt-24" data-section>
    <div className="container mx-auto">
      <SectionHeading eyebrow="Toolbox" title="Technical Skills" subtitle="Backend depth, full-stack range" />

      <AnimatedSection animation="fade-up" delay={200}>
        <div className="max-w-2xl mx-auto mb-12">
          <h3 className="font-display text-xl font-semibold text-center mb-8 text-primary">Focus Areas</h3>
          <ul className="space-y-4">
            {focusAreas.map((area) => (
              <li key={area.skill} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-mono text-sm font-medium text-foreground shrink-0 sm:w-56">{area.skill}</span>
                <span className="text-sm text-muted-foreground">{area.context}</span>
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(skills).map(([category, skillList], categoryIndex) => (
          <AnimatedSection key={category} animation="fade-up" delay={categoryIndex * 150}>
            <Card className="hover-scale magnetic-hover transition-colors border-border/60 hover:border-primary/40 hover:bg-primary/5">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-primary capitalize">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, index) => (
                    <Badge key={index} variant="outline" className="font-mono text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
