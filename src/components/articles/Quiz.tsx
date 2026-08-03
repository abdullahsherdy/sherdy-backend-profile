import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronDown, HelpCircle } from "lucide-react";

interface QuizItem {
  question: string;
  answer: string;
}

export function parseQuiz(source: string): QuizItem[] {
  const items: QuizItem[] = [];
  for (const block of source.split(/\n\s*\n/)) {
    const qMatch = /^Q:\s*([\s\S]*?)(?=\nA:)/m.exec(block);
    const aMatch = /\nA:\s*([\s\S]*)$/m.exec(block);
    if (qMatch && aMatch) {
      items.push({ question: qMatch[1].trim(), answer: aMatch[1].trim() });
    }
  }
  return items;
}

const Quiz = ({ source }: { source: string }) => {
  const items = parseQuiz(source);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  if (items.length === 0) return null;

  const toggle = (i: number) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="my-8 not-prose rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-5 py-3">
        <p className="font-display font-bold inline-flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" /> Check yourself
        </p>
        <span className="text-xs text-muted-foreground">
          {revealed.size}/{items.length} revealed
        </span>
      </div>
      <ol className="divide-y divide-border">
        {items.map((item, i) => {
          const open = revealed.has(i);
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={open}
                className="flex w-full items-start gap-3 px-5 py-4 text-left text-sm hover:bg-muted/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${open ? "bg-emerald-500/15 text-emerald-500" : "bg-muted text-muted-foreground"}`}>
                  {open ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </span>
                <span className="flex-1 font-medium">{item.question}</span>
                <ChevronDown className={`mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="border-l-2 border-emerald-500/60 bg-emerald-500/5 mx-5 mb-4 rounded-r px-4 py-3 text-sm text-muted-foreground whitespace-pre-wrap">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Quiz;
