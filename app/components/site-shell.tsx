import Link from "next/link";

const industries = ["Banking & Fintech", "Telecom", "Insurance", "Healthcare", "Retail", "Government"];

export function Logo() { return <Link className="logo" href="/" aria-label="Aegis home"><span className="logo-mark" aria-hidden="true">A</span><span>AEGIS</span></Link>; }

export function SiteHeader() {
  return <header className="shell header">
    <Logo />
    <nav className="nav" aria-label="Main navigation">
      <details><summary>Product⌄</summary><div className="popover"><Link href="/product">Platform overview</Link><Link href="/product#channels">Channels</Link><Link href="/product#governance">Stay in charge</Link></div></details>
      <details><summary>Industries⌄</summary><div className="popover">{industries.map((item) => <Link key={item} href={`/industries#${item.toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-")}`}>{item}</Link>)}</div></details>
      <details><summary>Resources⌄</summary><div className="popover"><Link href="/resources">Resource hub</Link><Link href="/resources#connectors">Knowledge connectors</Link><Link href="/resources#security">Security & compliance</Link></div></details>
      <Link href="/pricing">Pricing</Link>
    </nav>
    <div className="header-actions"><Link href="/login">Log in</Link><Link className="button small" href="/get-started">Get started <span aria-hidden="true">↗</span></Link></div>
    <button className="mobile-menu" aria-label="Open navigation" type="button">☰</button>
  </header>;
}

export function SiteFooter() {
  return <footer className="shell footer"><Logo /><span>Governed intelligence for the real world.</span><nav aria-label="Footer navigation"><Link href="/product">Product</Link><Link href="/industries">Industries</Link><Link href="/resources#security">Security</Link><Link href="/contact">Contact</Link></nav><span className="mono">© 2026 Aegis Systems</span></footer>;
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children: React.ReactNode }) {
  return <section className="shell page-hero"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{children}</section>;
}

export function CTA({ title = <>Move faster<br /><em>without moving blind.</em></>, copy = "Start with a governed assistant and grow at the pace your team trusts." }: { title?: React.ReactNode; copy?: string }) {
  return <section className="shell cta"><span className="eyebrow">Get ahead, with guardrails</span><h2 className="section-title">{title}</h2><p>{copy}</p><div className="actions" style={{ justifyContent: "center" }}><Link className="button" href="/get-started">Get started ↗</Link><Link className="button yellow" href="/contact">Talk to sales ↗</Link></div></section>;
}
