import AnimatedSection from "@/components/AnimatedSection";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

const SectionHeading = ({ eyebrow, title, subtitle }: SectionHeadingProps) => (
  <AnimatedSection animation="fade-up">
    <div className="text-center mb-12">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-tight">{title}</h2>
      {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
    </div>
  </AnimatedSection>
);

export default SectionHeading;
