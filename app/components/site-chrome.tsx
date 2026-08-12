"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "./site-shell";

export function SiteChromeFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/") return <>{children}</>;
  return <>{children}<SiteFooter /></>;
}
