import { lazy, Suspense, useCallback, useRef, useState } from "react";
import { Loader2, Play, RotateCcw } from "lucide-react";
import { runCSharp, type RunResult } from "./runCode";

const MonacoEditor = lazy(() => import("@monaco-editor/react"));

interface PlaygroundProps {
  initialCode: string;
}

const Playground = ({ initialCode }: PlaygroundProps) => {
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState<RunResult | null>(null);
  const [running, setRunning] = useState(false);
  const codeRef = useRef(code);
  codeRef.current = code;

  const run = useCallback(async () => {
    setRunning(true);
    setResult(null);
    const res = await runCSharp(codeRef.current);
    setResult(res);
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
          onClick={() => { setCode(initialCode); setResult(null); }}
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

      <div className="min-h-[280px] flex-1 overflow-hidden rounded-lg border border-border">
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

      <div
        className="max-h-48 min-h-[72px] overflow-y-auto rounded-lg border border-border bg-[#0d1117] p-3 font-mono text-sm text-white/90 whitespace-pre-wrap"
        aria-live="polite"
        aria-label="Program output"
      >
        {running && <span className="text-white/50">Compiling and running…</span>}
        {!running && !result && <span className="text-white/40">Output appears here. Hit Run.</span>}
        {result && (
          <>
            {result.message && (
              <div className="text-amber-300">
                {result.message}{" "}
                <button type="button" onClick={run} className="underline hover:text-amber-100">Retry</button>
              </div>
            )}
            {result.stdout && <div>{result.stdout}</div>}
            {result.stderr && <div className="text-red-400">{result.stderr}</div>}
            {!result.message && !result.stdout && !result.stderr && (
              <span className="text-white/50">(program produced no output)</span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Playground;
