import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ArticleView from "@/components/articles/ArticleView";
import TableOfContents, { slugifyHeading, type TocEntry } from "@/components/articles/TableOfContents";
import PageTransition from "@/components/shared/PageTransition";
import Seo from "@/components/shared/Seo";
import { getArticle } from "@/lib/articles";
import { author } from "@/lib/author";
import { useDarkMode } from "@/hooks/useDarkMode";
import "@/styles/article.css";

function extractToc(content: string): TocEntry[] {
  const entries: TocEntry[] = [];
  let inFence = false;
  for (const line of content.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!match) continue;
    const text = match[2].replace(/[*_`]/g, "").trim();
    entries.push({ id: slugifyHeading(text), text, level: match[1].length as 2 | 3 });
  }
  return entries;
}

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticle(slug) : undefined;
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const toc = useMemo(() => (article ? extractToc(article.content) : []), [article]);
  const jsonLd = useMemo(
    () =>
      article
        ? {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            datePublished: article.date,
            keywords: article.tags.join(", "),
            author: {
              "@type": "Person",
              name: author.name,
              url: author.website,
              sameAs: [author.linkedin, author.youtube],
            },
          }
        : undefined,
    [article]
  );

  if (!article) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-4 px-4">
        <h1 className="text-2xl font-bold font-display">Article not found</h1>
        <Link to="/articles" className="text-primary hover:underline inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to all articles
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Seo
        title={`${article.title} — ${author.name}`}
        description={article.description}
        canonicalPath={`/articles/${article.slug}`}
        ogType="article"
        jsonLd={jsonLd}
      />
      {!reduceMotion && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-[60] h-1 origin-left bg-primary"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />
      )}
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} activeSection="articles" />
      <PageTransition>
        <main className="container mx-auto px-4 pt-28 pb-20">
          <Link to="/articles" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>
          <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_16rem] xl:gap-12">
            <div className="mx-auto w-full max-w-[72ch]">
              <ArticleView article={article} />
            </div>
            <TableOfContents entries={toc} />
          </div>
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default ArticlePage;
