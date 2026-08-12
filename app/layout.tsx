import type { Metadata } from "next";
import "./globals.css";
import { SiteChromeFrame } from "./components/site-chrome";
import { SiteHeader } from "./components/site-shell";
import { ThemeProvider } from "./components/theme-provider";

export const metadata: Metadata = {
  title: { default: "Aegis — Governed intelligence for the real world", template: "%s | Aegis" },
  description: "Aegis helps teams answer customers, take useful actions, and keep control of every outcome.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="light" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `try { const theme = localStorage.getItem("aegis-theme"); if (theme === "light" || theme === "dark") document.documentElement.dataset.theme = theme; } catch (_) {}` }} /></head><body><ThemeProvider><SiteHeader /><SiteChromeFrame>{children}</SiteChromeFrame></ThemeProvider></body></html>;
}
