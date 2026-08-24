import { useEffect, useRef, useState } from "react";

let mermaidId = 0;

const MermaidDiagram = ({ code }: { code: string }) => {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));
  const ref = useRef<HTMLDivElement>(null);

  // Re-render when the site theme toggles. useDarkMode is per-instance state, not a
  // shared store, so this component can't subscribe to it — watch the root class directly.
  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "neutral",
          fontFamily: "Inter, 'Segoe UI', sans-serif",
        });
        const { svg } = await mermaid.render(`mermaid-${++mermaidId}`, code);
        if (!cancelled) setSvg(svg);
      } catch {
        if (!cancelled) setError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code, isDark]);

  if (error) {
    return <pre className="my-6 rounded-lg border border-destructive/40 bg-muted p-4 text-sm">{code}</pre>;
  }

  return (
    <div
      ref={ref}
      className="my-8 flex justify-center overflow-x-auto rounded-xl border border-border bg-card p-4 not-prose [&_svg]:max-w-full"
      role="img"
      aria-label="Diagram"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default MermaidDiagram;
