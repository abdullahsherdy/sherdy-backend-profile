import { lazy, Suspense, useCallback, useRef, useState } from "react";
import { Loader2, Play, RotateCcw } from "lucide-react";
import { runCSharp } from "./runCode";
import Terminal, { type TerminalEntry } from "./Terminal";

const MonacoEditor = lazy(() => import("@monaco-editor/react"));

interface PlaygroundProps {
  initialCode: string;
}

let entryId = 0;

const Playground = ({ initialCode }: PlaygroundProps) => {
  const [code, setCode] = useState(initialCode);
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [running, setRunning] = useState(false);
  const codeRef = useRef(code);
  codeRef.current = code;

  const run = useCallback(async () => {
    setRunning(true);
    const id = ++entryId;
    const timestamp = new Date().toLocaleTimeString();
    setEntries((prev) => [...prev, { id, timestamp, running: true }]);
    const result = await runCSharp(codeRef.current);
    setEntries((prev) => prev.map((e) => (e.id === id ? { id, timestamp, result } : e)));
    setRunning(false);
  }, []);

  const isDark = document.documentElement.classList.contains("dark");

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={run}
          disabled={running}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
          {running ? "Running…" : "Run"}
        </button>
        <button
          type="button"
          onClick={() => { setCode(initialCode); setEntries([]); }}
          className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
        <span className="ml-auto text-xs text-muted-foreground hidden sm:block">Ctrl+Enter to run</span>
      </div>

      <p className="text-xs text-muted-foreground">
        Code compiles and runs on{" "}
        <a href="https://godbolt.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
          Compiler Explorer
        </a>{" "}
        (open-source, public, .NET 8). Don't paste secrets.
      </p>

      <div className="min-h-[240px] flex-1 overflow-hidden rounded-lg border border-border">
        <Suspense fallback={<div className="flex h-full items-center justify-center text-sm text-muted-foreground">Loading editor…</div>}>
          <MonacoEditor
            height="100%"
            language="csharp"
            theme={isDark ? "vs-dark" : "light"}
            value={code}
            onChange={(v) => setCode(v ?? "")}
            onMount={(editor, monaco) => {
              editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, run);
            }}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "'Cascadia Code', 'JetBrains Mono', Consolas, monospace",
              scrollBeyondLastLine: false,
              tabSize: 4,
              automaticLayout: true,
            }}
          />
        </Suspense>
      </div>

      <Terminal entries={entries} onRetry={run} className="max-h-56 min-h-[110px]" />
    </div>
  );
};

export default Playground;
