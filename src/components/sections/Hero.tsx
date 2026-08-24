import { Download, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/AnimatedSection";
import MagneticButton from "@/components/MagneticButton";
import { heroTech, roles, resumeUrl } from "@/data/portfolio";
import { computeReviewStats } from "@/lib/reviews";
import { useReviews } from "@/hooks/useReviews";

const Hero = () => {
  const { data: reviews = [] } = useReviews();
  const stats = computeReviewStats(reviews);

  return (
  <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-4">
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
          <p className="font-mono text-xs sm:text-sm md:text-base text-primary mb-4 break-words">
            $ whoami <span className="text-muted-foreground">→</span> software engineer <span className="text-accent">&amp;&amp;</span> coding instructor
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={300}>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            Abdullah Sherdy
          </h1>
          <p className="font-display text-base sm:text-lg md:text-2xl font-medium text-muted-foreground mb-6">
            Software Engineer <span className="text-primary">|</span> Full-Stack Developer <span className="text-primary">|</span> Coding Instructor
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={450}>
          <p className="text-base md:text-lg mb-10 md:mb-12 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            .NET Backend Engineer based in Cairo, Egypt. 2+ years building production APIs
            with ASP.NET Core and Node.js — and teaching backend development to 100+ students
            at Netpoint, iSchool, DEPI, and independently.
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={600}>
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <MagneticButton asChild size="lg" className="w-full sm:w-auto">
                <a href="#contact">Hire Me</a>
              </MagneticButton>
              <MagneticButton asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <a href={resumeUrl} download className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </MagneticButton>
            </div>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <MagneticButton asChild variant="secondary" size="default" className="w-full sm:w-auto">
                <a href="#services">Learn With Me</a>
              </MagneticButton>
              <MagneticButton asChild variant="outline" size="default" className="w-full sm:w-auto">
                <a href="#projects">See My Work</a>
              </MagneticButton>
            </div>
          </div>
        </AnimatedSection>

        {stats.count > 0 && (
          <AnimatedSection animation="fade-up" delay={700}>
            <a
              href="#reviews"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-2 text-sm transition-colors hover:border-accent/60 hover:bg-accent/10"
              aria-label={
                stats.showAverage
                  ? `${stats.average.toFixed(1)} out of 5 from ${stats.count} reviews — read reviews`
                  : `${stats.count} ${stats.count === 1 ? "review" : "reviews"} — read reviews`
              }
            >
              <Star className="h-4 w-4 fill-current text-accent" aria-hidden="true" />
              {stats.showAverage ? (
                <>
                  <span className="font-semibold text-accent">{stats.average.toFixed(1)}</span>
                  <span className="text-muted-foreground">
                    from {stats.count} {stats.count === 1 ? "review" : "reviews"}
                  </span>
                </>
              ) : (
                <span className="text-muted-foreground">
                  {stats.count} {stats.count === 1 ? "review" : "reviews"}
                </span>
              )}
            </a>
          </AnimatedSection>
        )}

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
};

export default Hero;
