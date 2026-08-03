import type { ReactNode } from "react";
import { AlertTriangle, Info, Lightbulb, Bug } from "lucide-react";

export type CalloutKind = "NOTE" | "TIP" | "WARNING" | "PITFALL";

const styles: Record<CalloutKind, { icon: typeof Info; label: string; className: string; iconClass: string }> = {
  NOTE: { icon: Info, label: "Note", className: "border-sky-500/50 bg-sky-500/5", iconClass: "text-sky-500" },
  TIP: { icon: Lightbulb, label: "Tip", className: "border-emerald-500/50 bg-emerald-500/5", iconClass: "text-emerald-500" },
  WARNING: { icon: AlertTriangle, label: "Warning", className: "border-amber-500/50 bg-amber-500/5", iconClass: "text-amber-500" },
  PITFALL: { icon: Bug, label: "Pitfall", className: "border-red-500/50 bg-red-500/5", iconClass: "text-red-500" },
};

const Callout = ({ kind, children }: { kind: CalloutKind; children: ReactNode }) => {
  const { icon: Icon, label, className, iconClass } = styles[kind];
  return (
    <aside className={`my-6 rounded-r-lg border-l-4 px-4 py-3 not-prose ${className}`}>
      <p className={`mb-1 inline-flex items-center gap-2 text-sm font-semibold ${iconClass}`}>
        <Icon className="h-4 w-4" /> {label}
      </p>
      <div className="text-sm leading-relaxed [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded">
        {children}
      </div>
    </aside>
  );
};

export default Callout;
