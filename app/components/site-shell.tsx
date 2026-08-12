"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "./theme-provider";

const industries = ["Banking & Fintech", "Telecom", "Insurance", "Healthcare", "Retail", "Government", "Professional Services"];

function NavIcon({ type }: { type: "chevron" | "arrow" | "channel" | "shield" | "spark" | "audit" | "phone" | "chat" }) {
  const paths = {
    chevron: <path d="m7 9 5 5 5-5" />,
    arrow: <path d="M5 19 19 5M8 5h11v11" />,
    channel: <path d="M4 6h16v12H4zM8 4v4M16 4v4M8 12h8M8 15h5" />,
    shield: <><path d="M12 3 19 6v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" /><path d="m9 12 2 2 4-4" /></>,
    spark: <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3ZM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />,
    audit: <path d="M6 4h12v16H6zM9 8h6M9 12h6M9 16h4" />,
    phone: <path d="M7 4h3l1 4-2 2c1 2 3 3 4 4l2-2 4 1v3c0 1-1 2-2 2C10 18 6 14 6 7c0-2 0-3 1-3Z" />,
    chat: <path d="M5 5h14v10H9l-4 4V5Z" />
  };
  return <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">{paths[type]}</svg>;
}

export function Logo() { return <Link className="logo" href="/" aria-label="Aegis home"><span className="logo-shield" aria-hidden="true"><svg className="icon" viewBox="0 0 24 24"><path d="M12 2.8 19 6v5.2c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3.2Z"/><path d="m8.5 16 3.5-8 3.5 8M10 13.2h4"/></svg></span><span>AEGIS</span></Link>; }

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenMenu(null);
      setMobileOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const closeNavigation = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  return <header ref={headerRef} className={`shell header${mobileOpen ? " mobile-open" : ""}`} id="top" data-react-shell="true">
    <Logo />
    <nav className="nav" aria-label="Main navigation">
      <button className="nav-trigger" data-menu="product-menu" type="button" aria-controls="product-menu" aria-haspopup="true" aria-expanded={openMenu === "product"} onClick={() => setOpenMenu(openMenu === "product" ? null : "product")}>Product <NavIcon type="chevron" /></button>
      <button className="nav-trigger" data-menu="industries-menu" type="button" aria-controls="industries-menu" aria-haspopup="true" aria-expanded={openMenu === "industries"} onClick={() => setOpenMenu(openMenu === "industries" ? null : "industries")}>Industries <NavIcon type="chevron" /></button>
      <button className="nav-trigger" data-menu="resources-menu" type="button" aria-controls="resources-menu" aria-haspopup="true" aria-expanded={openMenu === "resources"} onClick={() => setOpenMenu(openMenu === "resources" ? null : "resources")}>Resources <NavIcon type="chevron" /></button>
      <Link href="/pricing" onClick={closeNavigation}>Pricing</Link>
    </nav>
    <div className="header-right header-actions"><button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} aria-pressed={dark}><span aria-hidden="true">{dark ? "☾" : "☼"}</span><b>{dark ? "Dark" : "Light"}</b></button><Link href="/login" onClick={closeNavigation}>Log in</Link><Link className="button button-mint button-sm small" href="/get-started" onClick={closeNavigation}>Get started <span aria-hidden="true">↗</span></Link></div>
    {openMenu === "product" && <div className="popover landing-popover mega open" id="product-menu" aria-hidden="false"><div className="mega-platform"><div className="mega-heading">Platform</div><div className="mega-items"><Link href="/product#channels"><span className="menu-symbol"><NavIcon type="channel" /></span><span><b>Channels</b><em>Reach every customer from one inbox.</em></span><strong><NavIcon type="arrow" /></strong></Link><Link href="/product#governance"><span className="menu-symbol"><NavIcon type="shield" /></span><span><b>Stay in charge</b><em>Review changes and undo them when needed.</em></span><strong><NavIcon type="arrow" /></strong></Link><Link href="/product#workflows"><span className="menu-symbol"><NavIcon type="spark" /></span><span><b>Assistants</b><em>Help with replies, calls, and everyday work.</em></span><strong><NavIcon type="arrow" /></strong></Link><Link href="/industries"><span className="menu-symbol"><NavIcon type="audit" /></span><span><b>Made for your work</b><em>Workflows shaped around your rules.</em></span><strong><NavIcon type="arrow" /></strong></Link></div></div><div className="mega-side"><div className="mega-heading">More to explore</div><Link href="/product#governance"><span className="menu-symbol"><NavIcon type="spark" /></span><span><b>Choose how it works</b><em>Run it, check first, or just ask.</em></span></Link><Link href="/resources#connectors"><span className="menu-symbol"><NavIcon type="audit" /></span><span><b>Your trusted sources</b><em>Bring the tools your team uses.</em></span></Link><Link className="mega-footer-link" href="/product">View the full platform <NavIcon type="arrow" /></Link></div></div>}
    {openMenu === "industries" && <div className="popover industry-mega open" id="industries-menu" aria-hidden="false"><div className="industry-menu-feature"><div className="industry-feature-rings" aria-hidden="true" /><span className="menu-feature-icon"><NavIcon type="channel" /></span><span className="eyebrow">Made for your work</span><h3>Start with your world</h3><p>One helpful layer for customer questions, calls, and everyday tasks.</p><Link href="/industries">Explore industries <NavIcon type="arrow" /></Link></div><div className="industry-menu-list"><div className="menu-panel-heading"><div><span className="eyebrow">Choose your work</span><p>Helpful assistants, shaped around the way your team works.</p></div><span className="menu-count">7 areas</span></div><div className="industry-menu-grid">{industries.map((item, index) => <Link key={item} href={`/industries#${item.toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-")}`}><span className="menu-item-icon"><NavIcon type={index === 0 ? "shield" : index === 1 ? "phone" : index === 2 || index === 5 ? "audit" : index === 6 ? "spark" : "channel"} /></span><span><b>{item}</b><em>{index === 0 ? "Answer questions with care." : index === 1 ? "Help more people, faster." : index === 2 ? "Make every answer clear." : index === 3 ? "Keep people informed." : index === 4 ? "Be there when needed." : index === 5 ? "Keep a clear record." : "Make work easier."}</em></span><strong>↗</strong></Link>)}</div></div></div>}
    {openMenu === "resources" && <div className="popover resources-mega open" id="resources-menu" aria-hidden="false"><Link className="resource-feature" href="/product#governance"><span className="resource-feature-top"><span className="menu-feature-icon"><NavIcon type="shield" /></span><span className="resource-tag">Trust</span></span><b>Stay in control</b><em>Clear answers, helpful actions, and a record your team can follow.</em><span className="resource-feature-link">Explore governance <NavIcon type="arrow" /></span></Link><div className="resource-menu-list"><div className="menu-panel-heading"><div><span className="eyebrow">Explore</span><p>Useful places to learn, connect, and get started.</p></div></div><Link href="/resources"><span className="menu-item-icon"><NavIcon type="channel" /></span><span><b>Platform overview</b><em>See Aegis in action.</em></span></Link><Link href="/resources#connectors"><span className="menu-item-icon"><NavIcon type="audit" /></span><span><b>Knowledge connectors</b><em>Bring your sources.</em></span></Link><Link href="/contact"><span className="menu-item-icon"><NavIcon type="chat" /></span><span><b>API documentation</b><em>Build what you need.</em></span></Link><Link href="/contact"><span className="menu-item-icon"><NavIcon type="channel" /></span><span><b>Self-hosted deployment</b><em>Keep control of your data.</em></span></Link><Link href="/resources#security"><span className="menu-item-icon"><NavIcon type="shield" /></span><span><b>Security & compliance</b><em>Know how Aegis works.</em></span></Link><div className="resource-bottom"><span><b>Ready to see it in action?</b><em>Start with a guided walkthrough.</em></span><Link href="/get-started">Get started <NavIcon type="arrow" /></Link></div></div></div>}
    <button className="menu-toggle mobile-menu" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} onClick={() => { setMobileOpen((open) => !open); setOpenMenu(null); }} type="button"><span></span><span></span></button>
  </header>;
}

export function SiteFooter() {
  return <footer className="shell footer"><Logo /><span>Governed intelligence for the real world.</span><nav aria-label="Footer navigation"><Link href="/product">Product</Link><Link href="/industries">Industries</Link><Link href="/resources#security">Security</Link><Link href="/contact">Contact</Link></nav><span className="mono">© 2026 Aegis Systems</span></footer>;
}

export function PageHero({ eyebrow, title, children, className = "" }: { eyebrow: string; title: React.ReactNode; children: React.ReactNode; className?: string }) {
  return <section className={`shell page-hero ${className}`.trim()}><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{children}</section>;
}

export function CTA({ title = <>Move faster<br /><em>without moving blind.</em></>, copy = "Start with a governed assistant and grow at the pace your team trusts." }: { title?: React.ReactNode; copy?: string }) {
  return <section className="shell cta"><span className="eyebrow">Get ahead, with guardrails</span><h2 className="section-title">{title}</h2><p>{copy}</p><div className="actions" style={{ justifyContent: "center" }}><Link className="button" href="/get-started">Get started ↗</Link><Link className="button yellow" href="/contact">Talk to sales ↗</Link></div></section>;
}
