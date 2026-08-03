import { useEffect, useState } from "react";

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (stored === "dark" || (!stored && prefersDark)) {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      }
    } catch {
      // Ignore localStorage errors (e.g., in private browsing)
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    try {
      localStorage.setItem("theme", newMode ? "dark" : "light");
    } catch {
      // Ignore localStorage errors
    }
  };

  return { isDarkMode, toggleDarkMode };
}
