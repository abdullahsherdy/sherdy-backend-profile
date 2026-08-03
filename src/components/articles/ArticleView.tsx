import { Children, isValidElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Article } from "@/lib/articles";
import { author } from "@/lib/author";
import { slugifyHeading } from "./TableOfContents";
import CodeBlock from "./CodeBlock";
import AuthorFooter from "./AuthorFooter";
import { Globe, Youtube, Linkedin } from "lucide-react";

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node)) return extractText((node.props as { children?: ReactNode }).children);
  return "";
}

const ArticleView = ({ article }: { article: Article }) => {
  const formattedDate = article.date
    ? new Date(article.date + "T00:00:00").toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <article className="article-body">
      <header className="mb-10 not-prose">
        <h1 className="text-3xl sm:text-4xl font-bold font-display leading-tight mb-4">{article.title}</h1>
        <div className="rounded-lg border-l-4 border-primary bg-muted/40 px-4 py-3 text-sm">
          <p className="font-semibold">
            {author.name} <span className="font-normal text-muted-foreground">— {author.title}</span>
          </p>
          <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground">
            <a href={author.website} className="inline-flex items-center gap-1 hover:text-primary"><Globe className="h-3.5 w-3.5" /> abdullahsherdy.tech</a>
            <a href={author.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary"><Youtube className="h-3.5 w-3.5" /> YouTube</a>
            <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary"><Linkedin className="h-3.5 w-3.5" /> LinkedIn</a>
          </p>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {formattedDate} · {article.readingTime}
        </p>
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[[rehypeHighlight, { detect: false, ignoreMissing: true }]]}
          components={{
            h2: ({ children }) => {
              const text = extractText(children);
              return <h2 id={slugifyHeading(text)}>{children}</h2>;
            },
            h3: ({ children }) => {
              const text = extractText(children);
              return <h3 id={slugifyHeading(text)}>{children}</h3>;
            },
            pre: ({ children }) => {
              const child = Children.toArray(children)[0];
              if (!isValidElement(child)) return <pre>{children}</pre>;
              const props = child.props as {
                className?: string;
                children?: ReactNode;
                node?: { data?: { meta?: string } };
              };
              const match = /language-(\w+)/.exec(props.className ?? "");
              const language = match?.[1] ?? "text";
              const meta = props.node?.data?.meta ?? "";
              const runnable = language === "csharp" && /\brun\b/.test(meta);
              return (
                <CodeBlock language={language} runnable={runnable} code={extractText(props.children)}>
                  {children}
                </CodeBlock>
              );
            },
            table: ({ children }) => (
              <div className="overflow-x-auto">
                <table>{children}</table>
              </div>
            ),
          }}
        >
          {article.content}
        </ReactMarkdown>
      </div>

      <AuthorFooter />
    </article>
  );
};

export default ArticleView;
