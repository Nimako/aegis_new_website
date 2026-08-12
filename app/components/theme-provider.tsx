"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";
type ThemeContextValue = { theme: Theme; setTheme: (theme: Theme) => void; toggleTheme: () => void };
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem("aegis-theme");
    const initial: Theme = stored === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = initial;
    setThemeState(initial);

    const onThemeChange = (event: Event) => {
      const next = (event as CustomEvent<Theme>).detail;
      if (next !== "light" && next !== "dark") return;
      document.documentElement.dataset.theme = next;
      setThemeState(next);
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === "aegis-theme") onThemeChange(new CustomEvent("aegis-theme-change", { detail: event.newValue === "dark" ? "dark" : "light" }));
    };
    window.addEventListener("aegis-theme-change", onThemeChange);
    window.addEventListener("storage", onStorage);
    return () => { window.removeEventListener("aegis-theme-change", onThemeChange); window.removeEventListener("storage", onStorage); };
  }, []);

  const value = useMemo<ThemeContextValue>(() => ({
    theme,
    setTheme: (next) => {
      document.documentElement.dataset.theme = next;
      window.localStorage.setItem("aegis-theme", next);
      setThemeState(next);
      window.dispatchEvent(new CustomEvent("aegis-theme-change", { detail: next }));
    },
    toggleTheme: () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      window.localStorage.setItem("aegis-theme", next);
      setThemeState(next);
      window.dispatchEvent(new CustomEvent("aegis-theme-change", { detail: next }));
    },
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme must be used inside ThemeProvider");
  return value;
}
