import { useState } from "react";
import { motion } from "framer-motion";
import { articles, allTags } from "@/lib/articles";
import ArticleCard from "./ArticleCard";
import TagChip from "./TagChip";

const ArticleList = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const visible = activeTag ? articles.filter((a) => a.tags.includes(activeTag)) : articles;

  return (
    <div>
      {/* A single-tag filter is meaningless — only offer it once there's more than one tag. */}
      {allTags.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter articles by tag">
          <TagChip tag="all" active={activeTag === null} onClick={() => setActiveTag(null)} />
          {allTags.map((tag) => (
            <TagChip
              key={tag}
              tag={tag}
              active={activeTag === tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            />
          ))}
        </div>
      )}
      {visible.length === 0 ? (
        <p className="text-muted-foreground py-12 text-center">No articles for this tag yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <ArticleCard article={article} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleList;
