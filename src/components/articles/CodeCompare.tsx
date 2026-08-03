import { useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";

interface CompareSection {
  kind: "GOOD" | "BAD";
  label: string;
  code: string;
}

export function parseCompare(source: string): CompareSection[] {
  const sections: CompareSection[] = [];
  const parts = source.split(/^<<<\s*(GOOD|BAD)\s*(.*)$/m);
  for (let i = 1; i < parts.length; i += 3) {
    sections.push({
      kind: parts[i] as "GOOD" | "BAD",
      label: parts[i + 1].trim() || (parts[i] === "GOOD" ? "Good" : "Bad"),
      code: parts[i + 2].trim(),
    });
  }
  return sections;
}

const CodeCompare = ({ source }: { source: string }) => {
  const sections = parseCompare(source);
  const badIndex = sections.findIndex((s) => s.kind === "BAD");
  const [active, setActive] = useState(badIndex === -1 ? 0 : badIndex);

  if (sections.length === 0) return null;
  const current = sections[active];

  return (
    <div className="my-8 not-prose overflow-hidden rounded-xl border border-border">
      <div className="flex border-b border-border bg-muted/40" role="tablist" aria-label="Code comparison">
        {sections.map((section, i) => {
          const isActive = i === active;
          const good = section.kind === "GOOD";
          return (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isActive
                  ? good
                    ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5"
                    : "border-red-500 text-red-600 dark:text-red-400 bg-red-500/5"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {good ? <ThumbsUp className="h-4 w-4" /> : <ThumbsDown className="h-4 w-4" />}
              {section.label}
            </button>
          );
        })}
      </div>
      <div className={`border-l-4 ${current.kind === "GOOD" ? "border-emerald-500" : "border-red-500"} bg-[#0d1117]`}>
        <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-[#e6edf3] font-mono">{current.code}</pre>
      </div>
    </div>
  );
};

export default CodeCompare;
