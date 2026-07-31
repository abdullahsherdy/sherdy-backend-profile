import { Github, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import MagneticButton from "@/components/MagneticButton";
import { socials } from "@/data/portfolio";

const About = () => (
  <section id="about" className="py-16 px-4 bg-muted/50 scroll-mt-24" data-section>
    <div className="container mx-auto">
      <SectionHeading eyebrow="Behind the code" title="About Me" />
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <AnimatedSection animation="slide-in-left" delay={200}>
          <Card className="hover-scale magnetic-hover transition-colors border-border/60 hover:border-primary/40 hover:bg-primary/5">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Background</h3>
              <p className="text-muted-foreground mb-4">
                Computer Science undergraduate at Helwan University with a passion for backend development
                and system architecture. I specialize in building robust, scalable applications using modern technologies.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{socials.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>{socials.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>{socials.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection animation="slide-in-right" delay={400}>
          <Card className="hover-scale magnetic-hover transition-colors border-border/60 hover:border-primary/40 hover:bg-primary/5">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Education & Certifications</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Computer Science Student</h4>
                  <p className="text-muted-foreground">Helwan University</p>
                </div>
                <div>
                  <h4 className="font-medium">.NET Web Development Graduate</h4>
                  <p className="text-muted-foreground">Digital Egypt Pioneers</p>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <MagneticButton variant="outline" size="sm">
                  <Github className="mr-2 h-4 w-4" />
                  <a href={socials.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                </MagneticButton>
                <MagneticButton variant="outline" size="sm">
                  <Linkedin className="mr-2 h-4 w-4" />
                  <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </MagneticButton>
                <MagneticButton variant="outline" size="sm">
                  <Youtube className="mr-2 h-4 w-4" />
                  <a href={socials.youtube} target="_blank" rel="noopener noreferrer">My Channel</a>
                </MagneticButton>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default About;
