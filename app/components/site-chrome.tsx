"use client";

import { usePathname } from "next/navigation";
import { SiteHeader, SiteFooter } from "./site-shell";

export function SiteChrome() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <><SiteHeader /><SiteFooter /></>;
}
