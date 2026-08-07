import { Github, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import MagneticButton from "@/components/MagneticButton";
import { socials } from "@/data/portfolio";

const About = () => (
  <section id="about" className="py-16 px-4 scroll-mt-24" data-section>
    <div className="container mx-auto">
      <SectionHeading eyebrow="Behind the code" title="About Me" />
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <AnimatedSection animation="slide-in-left" delay={200}>
          <Card className="hover-scale magnetic-hover transition-colors border-border/60 hover:border-primary/40 hover:bg-primary/5">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Background</h3>
              <p className="text-muted-foreground mb-4">
                Computer Science &amp; AI graduate (Helwan University) specializing in backend
                development and system architecture, and delivering full-stack products with React
                and Next.js. I build robust, scalable applications and teach the fundamentals behind them.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{socials.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <span className="break-all">{socials.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <a
                    href={socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {socials.phone} (WhatsApp)
                  </a>
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
                  <h4 className="font-medium">B.S. Computer Science &amp; Artificial Intelligence</h4>
                  <p className="text-muted-foreground">Helwan University · 2022 – 2026</p>
                </div>
                <div>
                  <h4 className="font-medium">.NET Web Development Graduate</h4>
                  <p className="text-muted-foreground">Digital Egypt Pioneers Initiative (DEPI)</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 sm:gap-4 mt-6">
                <MagneticButton asChild variant="outline" size="sm">
                  <a href={socials.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </MagneticButton>
                <MagneticButton asChild variant="outline" size="sm">
                  <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </MagneticButton>
                <MagneticButton asChild variant="outline" size="sm">
                  <a href={socials.youtube} target="_blank" rel="noopener noreferrer">
                    <Youtube className="mr-2 h-4 w-4" />
                    My Channel
                  </a>
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
