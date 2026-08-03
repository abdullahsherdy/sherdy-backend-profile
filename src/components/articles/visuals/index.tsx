import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from "react";

const registry: Record<string, LazyExoticComponent<ComponentType>> = {
  "linq-pipeline": lazy(() => import("./LinqPipeline")),
  "nplus1": lazy(() => import("./NPlusOneVisual")),
};

const ArticleVisual = ({ name }: { name: string }) => {
  const Component = registry[name.trim()];
  if (!Component) return null;
  return (
    <Suspense fallback={<div className="my-8 h-56 animate-pulse rounded-xl border border-border bg-muted/40" />}>
      <Component />
    </Suspense>
  );
};

export default ArticleVisual;
