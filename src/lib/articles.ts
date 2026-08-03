import { parseFrontmatter } from "./frontmatter";
import { readingTime } from "./readingTime";

export interface Article {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
  cover: string;
  draft: boolean;
  readingTime: string;
  content: string;
}

const modules = import.meta.glob("/src/content/articles/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function toArticle(path: string, raw: string): Article {
  const { data, content } = parseFrontmatter(raw);
  const fileSlug = path.split("/").pop()!.replace(/\.md$/, "");
  return {
    slug: (data.slug as string) || fileSlug,
    title: (data.title as string) || fileSlug,
    date: (data.date as string) || "",
    tags: (data.tags as string[]) || [],
    description: (data.description as string) || "",
    cover: (data.cover as string) || "",
    draft: data.draft === true,
    readingTime: readingTime(content),
    content,
  };
}

export const articles: Article[] = Object.entries(modules)
  .map(([path, raw]) => toArticle(path, raw))
  .filter((a) => !(import.meta.env.PROD && a.draft))
  .sort((a, b) => b.date.localeCompare(a.date));

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export const allTags: string[] = [...new Set(articles.flatMap((a) => a.tags))].sort();
