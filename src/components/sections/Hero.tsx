import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/AnimatedSection";
import MagneticButton from "@/components/MagneticButton";
import { heroTech, roles } from "@/data/portfolio";

const Hero = () => (
  <section className="pt-32 pb-20 px-4">
    <div className="container mx-auto text-center">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection animation="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/30 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            <span className="text-sm font-medium">Available for work</span>
            <span className="hidden sm:inline font-mono text-xs text-muted-foreground border-l border-success/30 pl-2 ml-1">
              {roles.join(" · ")}
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={150}>
          <p className="font-mono text-sm md:text-base text-primary mb-4">
            $ whoami <span className="text-muted-foreground">→</span> software engineer <span className="text-accent">&amp;&amp;</span> coding instructor
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={300}>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            Abdullah Sherdy
          </h1>
          <p className="font-display text-lg md:text-2xl font-medium text-muted-foreground mb-6">
            Software Engineer <span className="text-primary">|</span> Full-Stack Developer <span className="text-primary">|</span> Coding Instructor
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={450}>
          <p className="text-base md:text-lg mb-12 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Backend-focused engineer building production APIs with .NET and Node.js —
            expanding into React and Next.js for end-to-end delivery — and teaching the
            fundamentals behind them.
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={600}>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton size="lg">
              <a href="#projects">View My Work</a>
            </MagneticButton>
            <MagneticButton variant="outline" size="lg">
              <a href="#services">Learn With Me</a>
            </MagneticButton>
            <MagneticButton variant="ghost" size="lg">
              <a href="#contact">Get In Touch</a>
            </MagneticButton>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={800}>
          <div className="mt-16 pt-8 border-t border-border/40">
            <p className="eyebrow mb-4">Core Technologies</p>
            <div className="flex flex-wrap justify-center gap-3">
              {heroTech.map((tech) => (
                <Badge key={tech} variant="secondary" className="px-3 py-1 font-mono text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default Hero;
