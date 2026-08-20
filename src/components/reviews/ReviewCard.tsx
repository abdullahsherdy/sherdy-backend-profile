import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import StarRating from "./StarRating";
import type { Review } from "@/lib/reviews";

// Mirrors the teal (engineering) / amber (teaching) card language from Services.tsx,
// with a persistent left accent bar as the section's signature detail.
const cardClassByCategory: Record<Review["category"], string> = {
  engineering: "border-l-2 border-l-primary/60 border-border/60 hover:border-primary/40 hover:bg-primary/5",
  teaching: "border-l-2 border-l-accent/60 border-accent/30 hover:border-accent/60 hover:bg-accent/5",
};

const accentTextByCategory: Record<Review["category"], string> = {
  engineering: "text-primary",
  teaching: "text-accent",
};

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => (
  <Card className={cn("h-full transition-colors", cardClassByCategory[review.category])}>
    <CardContent className="flex h-full flex-col p-6">
      <div className="mb-3 flex items-center justify-between gap-2">
        <StarRating value={review.rating} size={16} />
        <span className={cn("font-mono text-[10px] uppercase tracking-[0.15em]", accentTextByCategory[review.category])}>
          ✓ verified
        </span>
      </div>
      <figure className="flex flex-1 flex-col">
        <blockquote className="flex-1 text-sm leading-relaxed text-foreground/90">
          “{review.quote}”
        </blockquote>
        <figcaption className="mt-4 border-t border-border/60 pt-4">
          <span className="block font-semibold text-foreground">{review.name}</span>
          <span className="block text-xs text-muted-foreground">
            {review.role}
            {review.org ? ` · ${review.org}` : ""}
          </span>
        </figcaption>
      </figure>
    </CardContent>
  </Card>
);

export default ReviewCard;
