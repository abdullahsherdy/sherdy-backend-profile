import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Database, Play, RotateCcw, Server } from "lucide-react";

type Mode = "nplus1" | "joined";

const TASK_COUNT = 5;

const NPlusOneVisual = () => {
  const [mode, setMode] = useState<Mode>("nplus1");
  const [firing, setFiring] = useState(false);
  const [queries, setQueries] = useState<number[]>([]);
  const reduceMotion = useReducedMotion();
  const timers = useRef<number[]>([]);

  const reset = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setQueries([]);
    setFiring(false);
  };

  useEffect(() => reset, []);

  const fire = () => {
    reset();
    setFiring(true);
    const total = mode === "nplus1" ? TASK_COUNT + 1 : 1;
    const gap = reduceMotion ? 0 : 450;
    for (let i = 0; i < total; i++) {
      timers.current.push(
        window.setTimeout(() => {
          setQueries((prev) => [...prev, i]);
          if (i === total - 1) setFiring(false);
        }, i * gap)
      );
    }
  };

  const labels =
    mode === "nplus1"
      ? ["SELECT * FROM Tasks", ...Array.from({ length: TASK_COUNT }, (_, i) => `SELECT * FROM Projects WHERE Id = ${i + 1}`)]
      : ["SELECT t.*, p.Name FROM Tasks t JOIN Projects p ON …"];

  return (
    <figure className="my-8 not-prose rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
        <div className="flex rounded-md border border-border p-0.5" role="tablist" aria-label="Query strategy">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "nplus1"}
            onClick={() => { setMode("nplus1"); reset(); }}
            className={`rounded px-3 py-1 text-xs font-medium transition-colors ${mode === "nplus1" ? "bg-red-500/15 text-red-600 dark:text-red-400" : "text-muted-foreground hover:text-foreground"}`}
          >
            Lazy loading (N+1)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "joined"}
            onClick={() => { setMode("joined"); reset(); }}
            className={`rounded px-3 py-1 text-xs font-medium transition-colors ${mode === "joined" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "text-muted-foreground hover:text-foreground"}`}
          >
            Projection / Include (1 query)
          </button>
        </div>
        <div className="ml-auto flex gap-1">
          <button
            type="button"
            onClick={fire}
            disabled={firing}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            <Play className="h-3 w-3" /> Load {TASK_COUNT} tasks
          </button>
          <button
            type="button"
            onClick={reset}
            aria-label="Reset animation"
            className="inline-flex items-center rounded-md border border-border px-2 py-1 text-xs hover:bg-muted"
          >
            <RotateCcw className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-5">
        <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
          <Server className="h-8 w-8 text-primary" />
          API
        </div>
        <div className="relative min-h-[120px] overflow-hidden rounded-lg bg-muted/30 p-2">
          <AnimatePresence>
            {queries.map((q) => (
              <motion.div
                key={`${mode}-${q}`}
                initial={reduceMotion ? { opacity: 0 } : { x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
                className={`mb-1 truncate rounded px-2 py-0.5 font-mono text-[11px] ${
                  mode === "nplus1" && q > 0
                    ? "bg-red-500/10 text-red-600 dark:text-red-400"
                    : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                }`}
              >
                {labels[q]}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
          <motion.div animate={firing && !reduceMotion ? { scale: [1, 1.15, 1] } : { scale: 1 }} transition={{ repeat: firing ? Infinity : 0, duration: 0.5 }}>
            <Database className={`h-8 w-8 ${mode === "nplus1" && queries.length > 2 ? "text-red-500" : "text-emerald-500"}`} />
          </motion.div>
          DB
        </div>
      </div>

      <figcaption className="border-t border-border bg-muted/30 px-4 py-2.5 text-sm text-muted-foreground">
        Round trips: <span className={`font-bold ${mode === "nplus1" && queries.length > 1 ? "text-red-500" : "text-emerald-500"}`}>{queries.length}</span>
        {mode === "nplus1"
          ? ` — one query for the list, then one more per task. With 100 tasks that's 101 queries.`
          : ` — the JOIN happens in the database; one round trip no matter how many rows.`}
      </figcaption>
    </figure>
  );
};

export default NPlusOneVisual;
