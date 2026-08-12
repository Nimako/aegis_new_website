import fs from "node:fs";
import path from "node:path";
import Script from "next/script";

function landingMarkup() {
  const source = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf8");
  const body = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";
  return body
    .replace(/<script[^>]*src="script\.js[^>]*><\/script>/i, "")
    .replace(/(?:src|href)="assets\//g, 'src="/assets/')
    .replace(/href="styles\.css[^\"]*"/g, 'href="/legacy-styles.css"')
    // Keep the legacy visual markup, but route conversion actions into the
    // real Next.js enrollment surfaces instead of dead same-page anchors.
    .replace('href="#contact">Pricing', 'href="/pricing">Pricing')
    .replace('href="#contact">Log in', 'href="/login">Log in')
    .replace('class="button button-mint button-sm" href="#contact">Get started', 'class="button button-mint button-sm" href="/get-started">Get started')
    .replace('class="button button-mint" href="#contact">Get started', 'class="button button-mint" href="/get-started">Get started')
    .replace('class="button button-yellow" href="#contact">Start free trial', 'class="button button-yellow" href="/get-started">Start free trial')
    .replace('class="button button-mint button-sm" href="#contact">Continue', 'class="button button-mint button-sm" href="/get-started">Continue')
    .replace('href="mailto:hello@aegis.ai">Get started', 'href="/get-started">Get started')
    .replace('class="button button-yellow" href="mailto:hello@aegis.ai">Talk to sales', 'class="button button-yellow" href="/contact">Talk to sales');
}

export function LegacyLanding() {
  return <>
    <link rel="stylesheet" href="/legacy-styles.css" />
    <div dangerouslySetInnerHTML={{ __html: landingMarkup() }} />
    <Script src="/legacy-script.js" strategy="afterInteractive" />
  </>;
}
