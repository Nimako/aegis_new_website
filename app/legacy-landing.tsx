import fs from "node:fs";
import path from "node:path";
import Script from "next/script";

function landingMarkup() {
  const source = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf8");
  const body = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";
  const orderedBody = body
    .replace(/<header class="header"[\s\S]*?<\/header>/i, "")
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

  const sectionOrder = [
    "hero",
    "logos",
    "deployment-strip",
    "outcomes",
    "real-life",
    "intro",
    "autonomy",
    "product",
    "onboarding",
    "connectors",
    "industries",
    "cta",
  ];
  const mainMatch = orderedBody.match(/<main>[\s\S]*?<\/main>/i);
  if (!mainMatch) return orderedBody;

  let main = mainMatch[0];
  const sections = sectionOrder.map((className) => {
    const pattern = new RegExp(`<section\\b[^>]*class="[^"]*\\b${className}\\b[^"]*"[^>]*>[\\s\\S]*?<\\/section>`, "i");
    const match = main.match(pattern);
    if (!match) return "";
    main = main.replace(match[0], "");
    return match[0];
  }).filter(Boolean);
  main = main.replace("</main>", `${sections.join("\n")}\n</main>`);
  return orderedBody.replace(mainMatch[0], main);
}

export function LegacyLanding() {
  return <>
    <link rel="stylesheet" href="/legacy-styles.css" />
    <link rel="stylesheet" href="/design-tokens.css" />
    <div dangerouslySetInnerHTML={{ __html: landingMarkup() }} />
    <Script src="/legacy-script.js?v=20260812-index-order" strategy="afterInteractive" />
  </>;
}
