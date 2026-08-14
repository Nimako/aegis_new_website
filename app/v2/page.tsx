import Link from "next/link";
import Image from "next/image";
import { CTA } from "../components/site-shell";
import { Icon } from "../components/ui";
import { MarketImage } from "../components/market-image";

const moments = [
  ["01", "A customer asks", "Maya needs a Friday appointment. A shop owner needs a loan. A policyholder needs a clear answer."],
  ["02", "Aegis carries it forward", "The right channel, the right source, and the right workflow stay connected."],
  ["03", "Your team sees what matters", "People step in with context—not a blank queue, a transcript, or a pile of raw data."],
];

export default function V2Page() {
  return <main className="v2-page">
    <section className="v2-hero shell">
      <div className="v2-hero-copy">
        <span className="eyebrow">Aegis v2 · Governed intelligence for real work</span>
        <h1>People ask for help.<br /><em>Your operation follows through.</em></h1>
        <p>Aegis connects the human moment to the work behind it—answering clearly, taking useful action, and bringing your team in when judgment matters.</p>
        <div className="actions"><Link className="button" href="/get-started">Build a useful workflow ↗</Link><Link className="button ghost" href="#stories">See the stories</Link></div>
        <div className="v2-hero-note"><span className="v2-note-mark"><Icon icon="lucide:check" /></span><span><b>Governed from the first message</b><small>Context, policy, and people stay close.</small></span></div>
      </div>
      <div className="v2-hero-visual">
        <div className="v2-hero-image"><MarketImage fill sizes="(max-width: 1000px) 100vw, 55vw" variant="hero" alt="A customer in Ghana speaking with a care team member" /><span className="v2-image-label"><i></i> Real work · in motion</span></div>
        <div className="v2-hero-card"><span className="v2-card-kicker">FOLLOW-UP / LIVE</span><b>Called Maya back</b><span>Friday · 2:00 PM available</span><strong><Icon icon="lucide:check" /> Booked</strong></div>
      </div>
    </section>

    <section className="v2-belief shell"><div><span className="eyebrow">The difference</span><h2>Not just a better answer.<br /><em>A better next step.</em></h2></div><p>Most assistants stop when the reply is sent. Aegis keeps the thread moving—from a customer’s first question to the approval, update, reconciliation, or human handoff that completes the work.</p></section>

    <section className="v2-moments shell"><div className="v2-section-intro"><span className="eyebrow">A simple way to see it</span><h2>Every useful workflow<br /><em>starts with a person.</em></h2></div><div className="v2-moment-grid">{moments.map(([number,title,copy])=><article key={number} className="v2-moment"><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="v2-stories" id="stories">
      <div className="shell v2-story-heading"><div><span className="eyebrow">See Aegis in the real world</span><h2>Small moments for customers.<br /><em>Clear next steps for teams.</em></h2></div><p>These are not abstract “AI use cases.” They are the moments where a helpful system earns trust: a callback, a clear answer, a review that arrives with the right context.</p></div>

      <div className="shell v2-story v2-story-first"><div className="v2-story-media"><Image fill sizes="(max-width: 1000px) 100vw, 55vw" src="/assets/v2-clinic-followup.png" alt="A clinic coordinator helping a customer complete an appointment" /><span className="v2-story-chip"><Icon icon="lucide:phone" /> Voice follow-up</span><div className="v2-call-card"><span>FOLLOW-UP CALL</span><b>BrightCare Clinic</b><small><i></i> Connected · 00:18</small><strong><Icon icon="lucide:calendar-check" /> Appointment booked</strong></div></div><div className="v2-story-copy"><span className="v2-story-kicker">For a clinic</span><h3>“A Friday slot opened.”</h3><p>Maya asked earlier. When the schedule changed, Aegis called her back, offered the slot, and kept the appointment moving.</p><div className="v2-quote">“The team only sees the outcome that needs their attention—not every conversation that led there.”</div><Link className="v2-arrow-link" href="/v2/channels">See the appointment flow <Icon icon="lucide:arrow-up-right" /></Link></div></div>

      <div className="shell v2-story v2-story-reverse"><div className="v2-story-media v2-insurance-media"><MarketImage fill sizes="(max-width: 1000px) 100vw, 55vw" variant="finance" alt="A financial-services advisor explaining a decision to a customer" /><span className="v2-story-chip"><Icon icon="lucide:message-circle" /> Approved answer</span><div className="v2-chat-card"><span>BRIGHTCARE ASSISTANT</span><b>Here’s the short answer.</b><p>Your plan includes check-ups, urgent care, and specialist visits after a referral.</p><small>Source · Family plan guide</small></div></div><div className="v2-story-copy"><span className="v2-story-kicker">For an insurer</span><h3>“What does my plan cover?”</h3><p>Aegis finds the answer in approved information, explains it in plain language, and keeps a person ready when the question needs more care.</p><div className="v2-quote">Clear enough for the customer. Traceable enough for compliance.</div><Link className="v2-arrow-link" href="/v2/financial-tooling">See the answer trail <Icon icon="lucide:arrow-up-right" /></Link></div></div>

      <div className="shell v2-story v2-story-first"><div className="v2-story-media v2-review-media"><MarketImage fill sizes="(max-width: 1000px) 100vw, 55vw" variant="operations" alt="A financial-operations team reviewing an important decision together" /><span className="v2-story-chip"><Icon icon="lucide:shield-check" /> Team review</span><div className="v2-review-card"><span>REVIEW QUEUE</span><b>Update beneficiary details</b><small>Prepared for your team · 2m ago</small><strong><Icon icon="lucide:eye" /> Review with context</strong></div></div><div className="v2-story-copy"><span className="v2-story-kicker">For your team</span><h3>“Show me what changed.”</h3><p>When the work is sensitive, Aegis does not hide the decision behind automation. It gives your team the source, the reasoning, and the boundary that needs a human say-so.</p><div className="v2-quote">Reviewable by design. Undoable when needed.</div><Link className="v2-arrow-link" href="/v2/operations-automation">See how control works <Icon icon="lucide:arrow-up-right" /></Link></div></div>
    </section>

    <section className="v2-journey shell"><div className="v2-section-intro"><span className="eyebrow">Behind every good handoff</span><h2>One connected journey.<br /><em>Five moments that matter.</em></h2></div><div className="v2-journey-line">{[["01","Apply","A customer starts on WhatsApp."],["02","Verify","Approved checks gather the facts."],["03","Pre-qualify","The agent prepares a safe next step."],["04","Disburse","Events trigger monitoring and review."],["05","Reconcile","Finance sees what does not match."]].map(([number,title,copy])=><div className="v2-journey-step" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></div>)}</div><Link className="button ghost" href="/v2/financial-tooling">Follow the financial operations journey ↗</Link></section>

    <section className="v2-human-control"><div className="shell v2-human-grid"><div><span className="eyebrow">The human boundary</span><h2>Let the system move quickly.<br /><em>Keep people close to the outcome.</em></h2></div><div><p>Choose what runs silently, what needs guidance, and what must wait for approval. The more your team trusts a workflow, the more useful autonomy becomes.</p><Link className="v2-arrow-link" href="/v2/operations-automation">Explore governed automation <Icon icon="lucide:arrow-up-right" /></Link></div></div></section>
    <CTA title={<>Build the kind of system<br /><em>people trust to help.</em></>} copy="Start with one real moment. Connect the work behind it. Grow from there." />
  </main>;
}
