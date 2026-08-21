import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ArticleCard from "@/components/articles/ArticleCard";
import { articles } from "@/lib/articles";

const LatestArticles = () => {
  if (articles.length === 0) return null;

  return (
    <section id="articles" className="py-16">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-up">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display mb-2">Latest Articles</h2>
              <p className="text-muted-foreground">Deep-dive .NET tutorials with runnable code examples.</p>
            </div>
            <Link to="/articles" className="hidden sm:inline-flex items-center gap-1 text-sm text-primary hover:underline">
              All articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </AnimatedSection>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        <Link to="/articles" className="sm:hidden mt-6 inline-flex items-center gap-1 text-sm text-primary hover:underline">
          All articles <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default LatestArticles;
