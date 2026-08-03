import { lazy, Suspense, useState, type ReactNode } from "react";
import { Check, Copy, Play } from "lucide-react";

const PlaygroundModal = lazy(() => import("@/components/playground/PlaygroundModal"));

interface CodeBlockProps {
  language: string;
  runnable: boolean;
  code: string;
  children: ReactNode;
}

const CodeBlock = ({ language, runnable, code, children }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const [playgroundOpen, setPlaygroundOpen] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  return (
    <div className="group/code relative my-6 rounded-lg border border-border bg-[#0d1117] overflow-hidden not-prose">
      <div className="flex items-center justify-between px-4 py-1.5 border-b border-white/10 bg-white/5">
        <span className="text-xs font-mono text-white/50">{language}</span>
        <div className="flex items-center gap-1">
          {runnable && (
            <button
              type="button"
              onClick={() => setPlaygroundOpen(true)}
              className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs text-emerald-300 hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-300"
            >
              <Play className="h-3.5 w-3.5" /> Try it
            </button>
          )}
          <button
            type="button"
            onClick={copy}
            aria-label="Copy code"
            className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs text-white/60 hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-white/40"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">{children}</pre>
      {playgroundOpen && (
        <Suspense fallback={null}>
          <PlaygroundModal initialCode={code} open={playgroundOpen} onClose={() => setPlaygroundOpen(false)} />
        </Suspense>
      )}
    </div>
  );
};

export default CodeBlock;
