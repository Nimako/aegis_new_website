import { PageHero } from "../components/site-shell";
import { ContactForm } from "../components/contact-form";
export default function ContactPage(){return <main><PageHero eyebrow="Contact" title={<>Bring us the <em>hard part.</em></>}><p>Tell us where your team needs a helpful layer, and we’ll help map the first governed workflow.</p></PageHero><section className="shell page-content"><ContactForm /></section></main>}
