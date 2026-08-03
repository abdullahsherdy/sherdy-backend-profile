import { Children, isValidElement, cloneElement, type ReactNode, type ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { motion, useReducedMotion } from "framer-motion";
import type { Article } from "@/lib/articles";
import { author } from "@/lib/author";
import { slugifyHeading } from "./TableOfContents";
import CodeBlock from "./CodeBlock";
import AuthorFooter from "./AuthorFooter";
import MermaidDiagram from "./MermaidDiagram";
import Quiz from "./Quiz";
import CodeCompare from "./CodeCompare";
import Callout, { type CalloutKind } from "./Callout";
import ArticleVisual from "./visuals";
import { Globe, Youtube, Linkedin } from "lucide-react";

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node)) return extractText((node.props as { children?: ReactNode }).children);
  return "";
}

const CALLOUT_RE = /^\[!(NOTE|TIP|WARNING|PITFALL)\]\s*/;

function stripCalloutMarker(node: ReactNode): ReactNode {
  let stripped = false;
  const walk = (n: ReactNode): ReactNode => {
    if (stripped) return n;
    if (typeof n === "string") {
      if (CALLOUT_RE.test(n)) {
        stripped = true;
        return n.replace(CALLOUT_RE, "");
      }
      return n;
    }
    if (Array.isArray(n)) return n.map(walk);
    if (isValidElement(n)) {
      const el = n as ReactElement<{ children?: ReactNode }>;
      return cloneElement(el, undefined, walk(el.props.children));
    }
    return n;
  };
  return walk(node);
}

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.45, ease: "easeOut" as const },
};

const ArticleView = ({ article }: { article: Article }) => {
  const reduceMotion = useReducedMotion();
  const rv = reduceMotion ? {} : reveal;

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
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold font-display leading-tight mb-4"
        >
          {article.title}
        </motion.h1>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="rounded-lg border-l-4 border-primary bg-muted/40 px-4 py-3 text-sm"
        >
          <p className="font-semibold">
            {author.name} <span className="font-normal text-muted-foreground">— {author.title}</span>
          </p>
          <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground">
            <a href={author.website} className="inline-flex items-center gap-1 hover:text-primary"><Globe className="h-3.5 w-3.5" /> abdullahsherdy.tech</a>
            <a href={author.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary"><Youtube className="h-3.5 w-3.5" /> YouTube</a>
            <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary"><Linkedin className="h-3.5 w-3.5" /> LinkedIn</a>
          </p>
        </motion.div>
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
              return (
                <motion.h2 id={slugifyHeading(text)} {...rv}>
                  {children}
                </motion.h2>
              );
            },
            h3: ({ children }) => {
              const text = extractText(children);
              return (
                <motion.h3 id={slugifyHeading(text)} {...rv}>
                  {children}
                </motion.h3>
              );
            },
            blockquote: ({ children }) => {
              const text = extractText(children);
              const match = CALLOUT_RE.exec(text.trimStart());
              if (match) {
                return <Callout kind={match[1] as CalloutKind}>{stripCalloutMarker(children)}</Callout>;
              }
              return <blockquote>{children}</blockquote>;
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
              const code = extractText(props.children);

              if (language === "mermaid") return <MermaidDiagram code={code} />;
              if (language === "quiz") return <Quiz source={code} />;
              if (language === "compare") return <CodeCompare source={code} />;
              if (language === "visual") return <ArticleVisual name={code} />;

              const meta = props.node?.data?.meta ?? "";
              const runnable = language === "csharp" && /\brun\b/.test(meta);
              return (
                <motion.div {...rv}>
                  <CodeBlock language={language} runnable={runnable} code={code}>
                    {children}
                  </CodeBlock>
                </motion.div>
              );
            },
            table: ({ children }) => (
              <motion.div {...rv} className="overflow-x-auto">
                <table>{children}</table>
              </motion.div>
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
