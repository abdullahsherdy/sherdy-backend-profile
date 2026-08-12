import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { ArrowLeft, BookOpen, X } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ArticleView from "@/components/articles/ArticleView";
import TableOfContents, { slugifyHeading, type TocEntry } from "@/components/articles/TableOfContents";
import PageTransition from "@/components/shared/PageTransition";
import Seo from "@/components/shared/Seo";
import { getArticle } from "@/lib/articles";
import { author } from "@/lib/author";
import { articlePageJsonLd } from "@/lib/structuredData";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useReadingPosition } from "@/hooks/useReadingPosition";
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
  const { savedPosition, resume, dismiss } = useReadingPosition(slug ?? "");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const toc = useMemo(() => (article ? extractToc(article.content) : []), [article]);
  const jsonLd = useMemo(() => (article ? articlePageJsonLd(article) : undefined), [article]);

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
      <AnimatePresence>
        {savedPosition && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"
          >
            <div className="flex items-center gap-2 rounded-full border border-border bg-background/95 py-1.5 pl-4 pr-1.5 shadow-lg backdrop-blur">
              <button type="button" onClick={resume} className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                <BookOpen className="h-4 w-4" /> Resume reading ({Math.round(savedPosition.ratio * 100)}%)
              </button>
              <button type="button" onClick={dismiss} aria-label="Dismiss" className="rounded-full p-1.5 text-muted-foreground hover:bg-muted">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
