import Link from "next/link";
import { PageHero } from "../components/site-shell";

export default function LoginPage(){return <main className="login-page"><div className="shell login-layout"><PageHero className="login-hero" eyebrow="Workspace access" title={<>Welcome back.<br /><em>Continue your work.</em></>}><p>Sign in to manage conversations, assistants, approvals, and policy in one workspace.</p></PageHero><section className="login-card-section"><div className="card login-card"><div className="notice">Set up your workspace to get started.</div><div className="actions"><Link className="button" href="/get-started">Start onboarding ↗</Link><Link className="button ghost" href="/">Back home</Link></div></div></section></div></main>}
