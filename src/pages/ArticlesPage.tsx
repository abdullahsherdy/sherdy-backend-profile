import { useMemo } from "react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ArticleList from "@/components/articles/ArticleList";
import PageTransition from "@/components/shared/PageTransition";
import Seo from "@/components/shared/Seo";
import { articlesIndexJsonLd } from "@/lib/structuredData";
import { useDarkMode } from "@/hooks/useDarkMode";

const ArticlesPage = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const jsonLd = useMemo(() => articlesIndexJsonLd(), []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Seo
        title="Articles — Abdullah Sherdy"
        description=".NET, C#, and backend engineering articles by Abdullah Sherdy — tutorials with runnable code examples."
        canonicalPath="/articles"
        jsonLd={jsonLd}
      />
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} activeSection="articles" />
      <PageTransition>
        <main className="container mx-auto px-4 pt-28 pb-20">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold font-display mb-3">Articles</h1>
            <p className="text-muted-foreground max-w-2xl">
              Deep-dive .NET and backend engineering tutorials — with code you can edit and run right in the browser.
            </p>
          </header>
          <ArticleList />
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default ArticlesPage;
