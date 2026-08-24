import { useMemo } from "react";
import ArticleList from "@/components/articles/ArticleList";
import ReaderCta from "@/components/articles/ReaderCta";
import SectionHeading from "@/components/SectionHeading";
import PageShell from "@/components/shared/PageShell";
import Seo from "@/components/shared/Seo";
import { articlesIndexJsonLd } from "@/lib/structuredData";

const ArticlesPage = () => {
  const jsonLd = useMemo(() => articlesIndexJsonLd(), []);

  return (
    <PageShell
      activeSection="articles"
      seo={
        <Seo
          title="Articles — Abdullah Sherdy"
          description=".NET, C#, and backend engineering articles by Abdullah Sherdy — tutorials with runnable code examples."
          canonicalPath="/articles"
          jsonLd={jsonLd}
        />
      }
    >
      <SectionHeading
        eyebrow="Writing"
        title="Articles"
        subtitle="Deep-dive .NET and backend engineering tutorials — with code you can edit and run right in the browser."
      />
      <ArticleList />
      <ReaderCta className="mt-16 rounded-xl border border-border bg-muted/30 p-6 sm:p-8" />
    </PageShell>
  );
};

export default ArticlesPage;
