import Playground from "@/components/playground/Playground";
import PageShell from "@/components/shared/PageShell";
import Seo from "@/components/shared/Seo";

const DEFAULT_CODE = `// Welcome to the C# playground — edit and hit Run (Ctrl+Enter).
var tasks = new List<TaskItem>
{
    new() { Id = 1, Title = "Design schema", Status = "Done" },
    new() { Id = 2, Title = "Build API", Status = "InProgress" },
    new() { Id = 3, Title = "Write tests", Status = "Todo" },
};

var pending = tasks
    .Where(t => t.Status != "Done")
    .Select(t => $"#{t.Id} {t.Title} [{t.Status}]");

foreach (var line in pending)
    Console.WriteLine(line);
`;

const PlaygroundPage = () => (
  <PageShell
    activeSection="playground"
    seo={
      <Seo
        title="C# Playground — Abdullah Sherdy"
        description="Write, edit, and run C# code right in the browser — powered by Monaco and Compiler Explorer."
        canonicalPath="/playground"
      />
    }
    mainClassName="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col px-4 pt-28 pb-12"
  >
    <header className="mb-6">
      <h1 className="text-3xl sm:text-4xl font-bold font-display mb-2">C# Playground</h1>
      <p className="text-muted-foreground max-w-2xl">
        A scratchpad for .NET experiments. The Task Tracker types (<code className="font-mono text-sm">Project</code>,{" "}
        <code className="font-mono text-sm">TaskItem</code>, <code className="font-mono text-sm">TaskResponse</code>) from
        the articles are available out of the box.
      </p>
    </header>
    <div className="min-h-[560px] flex-1">
      <Playground initialCode={DEFAULT_CODE} />
    </div>
  </PageShell>
);

export default PlaygroundPage;
