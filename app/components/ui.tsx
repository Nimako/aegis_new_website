import Link from "next/link";
import { iconifyData } from "../lib/iconify-data";

export function Icon({ icon, label, className = "" }: { icon: string; label?: string; className?: string }) {
  const data = iconifyData[icon];
  if (!data) return null;
  return <svg className={className} viewBox={`0 0 ${data.width} ${data.height}`} aria-hidden={label ? undefined : true} aria-label={label} role={label ? "img" : undefined} dangerouslySetInnerHTML={{ __html: data.body }} />;
}

type ButtonLinkProps = React.ComponentProps<typeof Link> & { variant?: "primary" | "yellow" | "ghost"; size?: "default" | "small" };

export function ButtonLink({ className = "", variant = "primary", size = "default", children, ...props }: ButtonLinkProps) {
  return <Link className={`button ${variant === "primary" ? "" : variant} ${size === "small" ? "small" : ""} ${className}`.trim()} {...props}>{children}</Link>;
}

export function Card({ className = "", children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <article className={`card ${className}`.trim()} {...props}>{children}</article>;
}

export function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: React.ReactNode; copy?: string }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2 className="section-title">{title}</h2></div>{copy && <p>{copy}</p>}</div>;
}
