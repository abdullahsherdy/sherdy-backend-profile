import { useEffect, useRef, useState } from "react";

let mermaidId = 0;

const MermaidDiagram = ({ code }: { code: string }) => {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const isDark = document.documentElement.classList.contains("dark");
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
  }, [code]);

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
