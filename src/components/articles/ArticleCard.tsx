import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";
import type { Article } from "@/lib/articles";
import TagChip from "./TagChip";

const ArticleCard = ({ article }: { article: Article }) => {
  const reduceMotion = useReducedMotion();
  const formattedDate = article.date
    ? new Date(article.date + "T00:00:00").toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative h-full rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg hover:border-primary/40"
    >
      <div className="flex flex-wrap gap-2 mb-4">
        {article.tags.map((tag) => (
          <TagChip key={tag} tag={tag} />
        ))}
      </div>
      <h3 className="text-lg font-bold font-display leading-snug mb-2 group-hover:text-primary transition-colors">
        <Link to={`/articles/${article.slug}`} className="focus:outline-none focus:underline">
          <span className="absolute inset-0" aria-hidden="true" />
          {article.title}
        </Link>
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{article.description}</p>
      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto">
        {formattedDate && (
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" /> {formattedDate}
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> {article.readingTime}
        </span>
        <span className="ml-auto inline-flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          Read <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </motion.article>
  );
};

export default ArticleCard;
