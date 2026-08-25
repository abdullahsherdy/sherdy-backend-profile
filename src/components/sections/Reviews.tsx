import { useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import ReviewCard from "@/components/reviews/ReviewCard";
import ReviewForm from "@/components/reviews/ReviewForm";
import { computeReviewStats, type Review } from "@/lib/reviews";
import { isReviewsConfigured } from "@/lib/supabase";
import { useReviews } from "@/hooks/useReviews";

type ReviewTab = "all" | "engineering" | "teaching";

// Maps the site's engineering/teaching split onto audience-facing labels.
// `short` keeps the mobile tab bar to a single row; the full label shows from `sm` up.
const TABS: { value: ReviewTab; label: string; short: string }[] = [
  { value: "all", label: "All", short: "All" },
  { value: "engineering", label: "Clients & Engineering", short: "Clients" },
  { value: "teaching", label: "Students & Parents", short: "Students" },
];

// Strongest review = highest rating, then longest (most substantive) quote.
const pickLead = (list: Review[]): Review =>
  list.reduce(
    (best, r) =>
      r.rating > best.rating || (r.rating === best.rating && r.quote.length > best.quote.length) ? r : best,
    list[0]
  );

const Reviews = () => {
  const { data: reviews = [], isLoading } = useReviews();
  const [tab, setTab] = useState<ReviewTab>("all");
  const stats = useMemo(() => computeReviewStats(reviews), [reviews]);

  const forTab = (value: ReviewTab): Review[] =>
    value === "all" ? reviews : reviews.filter((r) => r.category === value);

  // Promote the strongest review as a wider lead card, then the rest in the grid.
  const renderList = (list: Review[]) => {
    if (list.length === 0) {
      return <p className="py-12 text-center text-muted-foreground">No reviews in this category yet.</p>;
    }
    const lead = pickLead(list);
    const rest = list.filter((r) => r.id !== lead.id);
    return (
      <>
        <AnimatedSection animation="fade-up">
          <ReviewCard review={lead} featured />
        </AnimatedSection>
        {rest.length > 0 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((review, i) => (
              <AnimatedSection key={review.id} animation="fade-up" delay={Math.min(i * 80, 400)}>
                <ReviewCard review={review} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <section id="reviews" className="py-16 px-4 bg-muted/30 scroll-mt-24" data-section>
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
              {stats.count === 0 ? (
                <span> → awaiting first review</span>
              ) : (
                <>
                  {" "}
                  <span className="text-muted-foreground">→</span>{" "}
                  {stats.showAverage && (
                    <>
                      <span className="font-semibold text-accent-text">{stats.average.toFixed(1)}★</span>
                      {" · "}
                    </>
                  )}
                  <span className="text-foreground">{stats.count} {stats.count === 1 ? "review" : "reviews"}</span>
                </>
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
          <Tabs value={tab} onValueChange={(v) => setTab(v as ReviewTab)}>
            <div className="mb-8 flex justify-center">
              {/* Full-width 3-up segmented control on mobile (short labels, one row),
                  compact centered pill with full labels from sm up. */}
              <TabsList className="grid w-full grid-cols-3 gap-1 sm:inline-flex sm:w-auto">
                {TABS.map((t) => (
                  <TabsTrigger key={t.value} value={t.value} className="px-2 text-xs sm:px-3 sm:text-sm">
                    <span className="sm:hidden">{t.short}</span>
                    <span className="hidden sm:inline">{t.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {TABS.map((t) => (
              <TabsContent key={t.value} value={t.value}>
                {renderList(forTab(t.value))}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </section>
  );
};

export default Reviews;
