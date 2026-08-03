const GODBOLT_URL = "https://godbolt.org/api/compiler/dotnet80csharpcoreclr/compile";
const TIMEOUT_MS = 20_000;

export interface RunResult {
  ok: boolean;
  stdout: string;
  stderr: string;
  message?: string;
}

const SUPPORT_TYPES = `
public sealed class Project
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public List<TaskItem> Tasks { get; set; } = new();
}

public sealed class TaskItem
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Status { get; set; } = "Todo";
    public DateTime? DueDate { get; set; }
    public Project Project { get; set; } = null!;
}

public sealed record TaskResponse(int Id, string Title, string Status, string ProjectName);
`;

export function wrapInProgram(code: string): string {
  if (/\bstatic\s+(async\s+)?(void|int|Task)\s+Main\s*\(/.test(code)) return code;
  const indented = code
    .split("\n")
    .map((line) => (line.trim() ? "        " + line : line))
    .join("\n");
  return `using System;
using System.Collections.Generic;
using System.Linq;

public static class Playground
{
    public static void Main()
    {
${indented}
    }
}
${SUPPORT_TYPES}`;
}

interface GodboltLine {
  text: string;
}

function joinLines(lines: GodboltLine[] | undefined): string {
  return (lines ?? []).map((l) => l.text).join("\n");
}

export async function runCSharp(code: string): Promise<RunResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(GODBOLT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        source: wrapInProgram(code),
        lang: "csharp",
        allowStoreCodeDebug: false,
        options: {
          userArguments: "",
          compilerOptions: { executorRequest: true },
          filters: { execute: true },
          executeParameters: { args: [], stdin: "" },
        },
      }),
    });

    if (!response.ok) {
      return {
        ok: false,
        stdout: "",
        stderr: "",
        message: `Execution service returned ${response.status}. Try again in a moment.`,
      };
    }

    const data = await response.json();
    const buildStderr = joinLines(data.buildResult?.stderr);
    if (data.didExecute === false || (data.buildResult && data.buildResult.code !== 0)) {
      return { ok: false, stdout: "", stderr: buildStderr || "Compilation failed." };
    }
    return {
      ok: data.code === 0,
      stdout: joinLines(data.stdout),
      stderr: joinLines(data.stderr),
    };
  } catch (err) {
    const aborted = err instanceof DOMException && err.name === "AbortError";
    return {
      ok: false,
      stdout: "",
      stderr: "",
      message: aborted
        ? "Execution timed out after 20 seconds."
        : "Could not reach the execution service. Check your connection and retry — or copy the code and run it locally.",
    };
  } finally {
    clearTimeout(timer);
  }
}
