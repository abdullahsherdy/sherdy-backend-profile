import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import ReviewCard from "@/components/reviews/ReviewCard";
import ReviewForm from "@/components/reviews/ReviewForm";
import { computeReviewStats } from "@/lib/reviews";
import { isReviewsConfigured } from "@/lib/supabase";
import { useReviews } from "@/hooks/useReviews";

const Reviews = () => {
  const { data: reviews = [], isLoading } = useReviews();
  const stats = useMemo(() => computeReviewStats(reviews), [reviews]);

  return (
    <section id="reviews" className="py-16 px-4 scroll-mt-24" data-section>
      <div className="container mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Social proof"
          title="Reviews"
          subtitle="What students, parents, and clients say about working and learning with me"
        />

        <AnimatedSection animation="fade-up" delay={100}>
          <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Terminal-style aggregate summary — matches the Hero's `$ whoami` motif */}
            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-primary">$</span> reviews --summary
              {stats.count > 0 ? (
                <>
                  {" "}
                  <span className="text-muted-foreground">→</span>{" "}
                  <span className="font-semibold text-accent">{stats.average.toFixed(1)}★</span>
                  {" · "}
                  <span className="text-foreground">{stats.count} verified</span>
                </>
              ) : (
                <span> → awaiting first review</span>
              )}
            </p>
            {isReviewsConfigured && <ReviewForm triggerLabel="Write a review" triggerSize="lg" />}
          </div>
        </AnimatedSection>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-52 w-full rounded-lg" />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <AnimatedSection animation="fade-up">
            <div className="rounded-lg border border-dashed border-border/60 py-16 text-center">
              <p className="text-muted-foreground">Be the first to share your experience.</p>
              {isReviewsConfigured && (
                <div className="mt-4 flex justify-center">
                  <ReviewForm triggerLabel="Write a review" triggerVariant="outline" />
                </div>
              )}
            </div>
          </AnimatedSection>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <AnimatedSection key={review.id} animation="fade-up" delay={Math.min(i * 80, 400)}>
                <ReviewCard review={review} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
