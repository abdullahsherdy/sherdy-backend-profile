import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ArticleCard from "@/components/articles/ArticleCard";
import { articles } from "@/lib/articles";

const LatestArticles = () => {
  if (articles.length === 0) return null;

  return (
    <section id="articles" className="py-16 px-4 scroll-mt-24" data-section>
      <div className="container mx-auto">
        <SectionHeading
          eyebrow="From the blog"
          title="Latest Articles"
          subtitle="Deep-dive .NET tutorials with runnable code examples."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/articles"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            All articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;
