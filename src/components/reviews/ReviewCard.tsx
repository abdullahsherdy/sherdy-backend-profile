import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import StarRating from "./StarRating";
import { formatReviewDate, type Review } from "@/lib/reviews";

// Mirrors the teal (engineering) / amber (teaching) card language from Services.tsx,
// with a persistent left accent bar as the section's signature detail.
const cardClassByCategory: Record<Review["category"], string> = {
  engineering: "border-l-2 border-l-primary/60 border-border/60 hover:border-primary/40 hover:bg-primary/5",
  teaching: "border-l-2 border-l-accent/60 border-accent/30 hover:border-accent/60 hover:bg-accent/5",
};

// The initial-avatar carries the same category signal as the left bar.
const avatarClassByCategory: Record<Review["category"], string> = {
  engineering: "bg-primary/10 text-primary",
  teaching: "bg-accent/10 text-accent",
};

/** First letters of up to two words — "Sara Ali" → "SA", "Mohamed" → "M". */
const initialsOf = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("") || "★";

interface ReviewCardProps {
  review: Review;
  /** Renders the promoted "lead" review larger, for the top of a tab. */
  featured?: boolean;
}

const ReviewCard = ({ review, featured = false }: ReviewCardProps) => {
  const date = formatReviewDate(review.createdAt);
  return (
    <Card className={cn("h-full transition-colors", cardClassByCategory[review.category])}>
      <CardContent className={cn("flex h-full flex-col", featured ? "p-8" : "p-6")}>
        <div className="mb-3">
          <StarRating value={review.rating} size={featured ? 20 : 16} />
        </div>
        <figure className="flex flex-1 flex-col">
          <blockquote
            className={cn(
              "flex-1 leading-relaxed text-foreground/90",
              featured ? "text-base md:text-lg" : "text-sm"
            )}
          >
            “{review.quote}”
          </blockquote>
          <figcaption className="mt-4 flex items-center gap-3 border-t border-border/60 pt-4">
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                avatarClassByCategory[review.category]
              )}
              aria-hidden="true"
            >
              {initialsOf(review.name)}
            </span>
            <span className="min-w-0">
              <span className="block truncate font-semibold text-foreground">{review.name}</span>
              <span className="block truncate text-xs text-muted-foreground">
                {review.role}
                {review.org ? ` · ${review.org}` : ""}
              </span>
            </span>
            {date && (
              <time dateTime={review.createdAt} className="ml-auto shrink-0 text-xs text-muted-foreground">
                {date}
              </time>
            )}
          </figcaption>
        </figure>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
