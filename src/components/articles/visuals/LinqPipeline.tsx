import { useCallback, useState } from "react";
import { ReactFlow, Background, type Node, type Edge, type NodeMouseHandler } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

interface StepInfo {
  title: string;
  detail: string;
}

const steps: Record<string, StepInfo> = {
  delegates: { title: "Delegates", detail: "A type that holds a reference to a method — behavior as data. Func<T, bool> is the shape Where() accepts." },
  lambdas: { title: "Lambdas", detail: "Inline anonymous method syntax: t => t.Status == \"Todo\" creates a delegate (or an expression tree)." },
  linq: { title: "LINQ", detail: "Extension methods (Where, Select, OrderBy…) that accept your lambdas and build a query description." },
  trees: { title: "Expression Trees", detail: "Expression<Func<T, bool>> is a data structure describing the code — not compiled code. This is what makes translation possible." },
  efcore: { title: "EF Core", detail: "Walks the expression tree of an IQueryable chain and writes SQL from it. Loading strategy decides how many queries run." },
  sql: { title: "SQL", detail: "SELECT t.Id, t.Title… FROM Tasks WHERE Status = 'Todo' — filtering happens in the database, not in memory." },
};

const nodeStyle = {
  background: "hsl(var(--card))",
  color: "hsl(var(--foreground))",
  border: "1.5px solid hsl(var(--primary))",
  borderRadius: 10,
  fontSize: 13,
  fontWeight: 600,
  padding: "8px 14px",
  width: "auto" as const,
};

const nodes: Node[] = [
  { id: "delegates", position: { x: 0, y: 60 }, data: { label: "Delegates" }, style: nodeStyle },
  { id: "lambdas", position: { x: 150, y: 0 }, data: { label: "Lambdas" }, style: nodeStyle },
  { id: "linq", position: { x: 300, y: 60 }, data: { label: "LINQ" }, style: nodeStyle },
  { id: "trees", position: { x: 430, y: 0 }, data: { label: "Expression Trees" }, style: nodeStyle },
  { id: "efcore", position: { x: 620, y: 60 }, data: { label: "EF Core" }, style: nodeStyle },
  { id: "sql", position: { x: 780, y: 0 }, data: { label: "SQL" }, style: { ...nodeStyle, border: "1.5px solid #10b981" } },
];

const edgeDefaults = { animated: true, style: { stroke: "hsl(var(--primary))", strokeWidth: 2 } };
const edges: Edge[] = [
  { id: "e1", source: "delegates", target: "lambdas", ...edgeDefaults },
  { id: "e2", source: "lambdas", target: "linq", ...edgeDefaults },
  { id: "e3", source: "linq", target: "trees", ...edgeDefaults },
  { id: "e4", source: "trees", target: "efcore", ...edgeDefaults },
  { id: "e5", source: "efcore", target: "sql", ...edgeDefaults, style: { stroke: "#10b981", strokeWidth: 2 } },
];

const LinqPipeline = () => {
  const [selected, setSelected] = useState<StepInfo>(steps.delegates);

  const onNodeClick: NodeMouseHandler = useCallback((_, node) => {
    setSelected(steps[node.id]);
  }, []);

  return (
    <figure className="my-8 not-prose rounded-xl border border-border bg-card overflow-hidden">
      <div className="h-56">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          fitView
          nodesDraggable={false}
          nodesConnectable={false}
          zoomOnScroll={false}
          panOnDrag={false}
          preventScrolling={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={20} />
        </ReactFlow>
      </div>
      <figcaption className="border-t border-border bg-muted/30 px-4 py-3 text-sm">
        <span className="font-semibold text-primary">{selected.title}:</span>{" "}
        <span className="text-muted-foreground">{selected.detail}</span>
        <span className="mt-1 block text-xs text-muted-foreground/70">Tap a node to see how each piece enables the next.</span>
      </figcaption>
    </figure>
  );
};

export default LinqPipeline;
