import MagneticButton from "@/components/MagneticButton";

interface ReaderCtaProps {
  heading?: string;
  subtext?: string;
  className?: string;
}

/**
 * Reader → next-step conversion band. A reader who just finished an article is the
 * warmest lead the site gets, so we offer two clear paths: hire (engineering, teal)
 * and learn (teaching, amber). Reused by the article footer and the articles list
 * so the labels/targets live in one place. Hrefs are route-safe ("/#…") because
 * these render off the home route.
 */
const ReaderCta = ({
  heading = "Let's work together — or learn together.",
  subtext = "I build production .NET APIs, and I teach the people who write them. Whether you're hiring or leveling up, here's where to start.",
  className,
}: ReaderCtaProps) => (
  <div className={className}>
    <p className="eyebrow mb-2">What next?</p>
    <h2 className="font-display text-xl sm:text-2xl font-bold mb-2 tracking-tight">{heading}</h2>
    <p className="text-sm text-muted-foreground mb-5 max-w-prose">{subtext}</p>
    <div className="flex flex-wrap gap-3">
      <MagneticButton asChild>
        <a href="/#contact">Hire me</a>
      </MagneticButton>
      <MagneticButton
        asChild
        variant="outline"
        className="border-accent/40 text-accent-text hover:border-accent/60 hover:bg-accent/5"
      >
        <a href="/#services">Learn with me</a>
      </MagneticButton>
    </div>
  </div>
);

export default ReaderCta;
