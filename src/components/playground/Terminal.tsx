import { useEffect, useRef } from "react";
import type { RunResult } from "./runCode";

export interface TerminalEntry {
  id: number;
  timestamp: string;
  result?: RunResult;
  running?: boolean;
}

interface TerminalProps {
  entries: TerminalEntry[];
  onRetry?: () => void;
  className?: string;
}

const Terminal = ({ entries, onRetry, className = "" }: TerminalProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "nearest" });
  }, [entries]);

  return (
    <div
      className={`overflow-y-auto rounded-lg border border-border bg-[#0d1117] font-mono text-sm ${className}`}
      aria-live="polite"
      aria-label="Run terminal"
    >
      <div className="sticky top-0 flex items-center gap-1.5 border-b border-white/10 bg-[#161b22] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-white/40">.NET 8 · Compiler Explorer</span>
      </div>
      <div className="p-3 space-y-3">
        {entries.length === 0 && (
          <div className="text-white/40">
            <span className="text-emerald-400">$</span> Ready. Hit Run (Ctrl+Enter) to execute.
            <span className="terminal-cursor" />
          </div>
        )}
        {entries.map((entry) => (
          <div key={entry.id}>
            <div className="text-white/50">
              <span className="text-emerald-400">$</span> dotnet run{" "}
              <span className="text-white/30">— {entry.timestamp}</span>
            </div>
            {entry.running && (
              <div className="text-white/60 pl-4">
                Compiling and running…<span className="terminal-cursor" />
              </div>
            )}
            {entry.result && (
              <div className="pl-4 whitespace-pre-wrap">
                {entry.result.message && (
                  <div className="text-amber-300">
                    {entry.result.message}{" "}
                    {onRetry && (
                      <button type="button" onClick={onRetry} className="underline hover:text-amber-100">
                        Retry
                      </button>
                    )}
                  </div>
                )}
                {entry.result.stdout && <div className="text-white/90">{entry.result.stdout}</div>}
                {entry.result.stderr && <div className="text-red-400">{entry.result.stderr}</div>}
                {!entry.result.message && !entry.result.stdout && !entry.result.stderr && (
                  <div className="text-white/50">(program produced no output)</div>
                )}
                {!entry.result.message && (
                  <div className={entry.result.ok ? "text-emerald-400/70" : "text-red-400/70"}>
                    Process exited with code {entry.result.ok ? 0 : 1}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Terminal;
