import { useEffect, useState } from "react";

// Match the static <meta name="theme-color"> values in index.html:
// teal primary for light, deep navy for dark.
const THEME_COLORS = { light: "#19776B", dark: "#0D1520" } as const;

/**
 * Point the browser-chrome color at the *active* theme. The two media-scoped
 * <meta name="theme-color"> tags in index.html only follow the OS preference,
 * so once the user flips the in-app toggle they go stale — we replace them with
 * a single tag that reflects the real state.
 */
function applyThemeColor(isDark: boolean) {
  if (typeof document === "undefined") return;
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.remove());
  const meta = document.createElement("meta");
  meta.setAttribute("name", "theme-color");
  meta.setAttribute("content", isDark ? THEME_COLORS.dark : THEME_COLORS.light);
  document.head.appendChild(meta);
}

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    let dark = document.documentElement.classList.contains("dark");
    try {
      const stored = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (stored === "dark" || (!stored && prefersDark)) {
        dark = true;
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      }
    } catch {
      // Ignore localStorage errors (e.g., in private browsing)
    }
    applyThemeColor(dark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    applyThemeColor(newMode);
    try {
      localStorage.setItem("theme", newMode ? "dark" : "light");
    } catch {
      // Ignore localStorage errors
    }
  };

  return { isDarkMode, toggleDarkMode };
}
