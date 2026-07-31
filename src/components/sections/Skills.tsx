import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import SkillBar from "@/components/SkillBar";
import { skills, skillLevels } from "@/data/portfolio";

const Skills = () => (
  <section id="skills" className="py-16 px-4 bg-muted/50 scroll-mt-24" data-section>
    <div className="container mx-auto">
      <SectionHeading eyebrow="Toolbox" title="Technical Skills" />

      <AnimatedSection animation="fade-up" delay={200}>
        <div className="max-w-2xl mx-auto mb-12">
          <h3 className="text-xl font-semibold text-center mb-8 text-primary">Expertise Level</h3>
          {skillLevels.map((skill, index) => (
            <SkillBar
              key={index}
              skill={skill.skill}
              percentage={skill.percentage}
              delay={index * 200}
            />
          ))}
        </div>
      </AnimatedSection>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(skills).map(([category, skillList], categoryIndex) => (
          <AnimatedSection key={category} animation="fade-up" delay={categoryIndex * 150}>
            <Card className="hover-scale magnetic-hover transition-colors border-border/60 hover:border-primary/40 hover:bg-primary/5">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-primary capitalize">
                  {category.replace(/([A-Z])/g, " $1").trim()}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, index) => (
                    <Badge key={index} variant="outline">
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
