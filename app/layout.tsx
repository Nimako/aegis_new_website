import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "./components/site-chrome";
import { SiteHeader, SiteFooter } from "./components/site-shell";

export const metadata: Metadata = {
  title: { default: "Aegis — Governed intelligence for the real world", template: "%s | Aegis" },
  description: "Aegis helps teams answer customers, take useful actions, and keep control of every outcome.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="light"><body><SiteChrome />{children}</body></html>;
}
