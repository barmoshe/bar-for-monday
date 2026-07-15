'use client';

import { useEffect, useRef, useState } from 'react';
import '../monday/marketing-base.css';
import './payments.css';

/**
 * PaymentsApp — Bar Moshe's application page for monday.com's
 * "Software Engineer, Payments Foundations Group" role (Tel Aviv, on-site).
 *
 * This is a SECOND, distinct monday.com application, living at "/" in the
 * same repo as the RevAI page (moved to /revai on 2026-07-15).
 *
 * Reinvented against monday.com's LIVE PRICING page (monday.com/pricing,
 * read in-browser 2026-07-15) — the company's real money / billing /
 * AI-credits surface, which is exactly the domain this role owns: Poppins
 * weight-400 near-black display type, indigo #6161FF pill CTAs, the
 * cyan->purple gradient keyword, the navy #181B34 "Most Popular" banner,
 * a seat selector, a Monthly/Yearly toggle, plan cards, and "AI credits"
 * chips.
 *
 * The centerpiece is a working BILLING ENGINE: the plan / seats / cycle
 * controls drive an event-driven pipeline that propagates billing state
 * (proration -> invoice -> AI-credit rebucket -> ledger -> downstream), the
 * literal shape of the role. It uses monday.com's public plan prices and is
 * clearly a model, not a claim of access to their systems.
 *
 * Mounts `.mp-root` only to inherit the marketing reset (marketing-base.css),
 * then repaints via `.mnp-root`. Motion is CSS + minimal React state, all
 * gated on prefers-reduced-motion; fully legible with no JS. No GSAP.
 */

const EMAIL =
  'mailto:1barmoshe1@gmail.com?subject=Software%20Engineer%2C%20Payments%20Foundations%20Group%20-%20Bar%20Moshe';
const CV = '/Bar_Moshe_CV_monday_payments.pdf';
const LINKEDIN = 'https://www.linkedin.com/in/barmoshe/';
const GITHUB = 'https://github.com/barmoshe';
const WHATSAPP = 'https://wa.me/972546561465';

/* ── Plan model (monday.com's public per-seat monthly prices) ─────── */
type PlanId = 'basic' | 'standard' | 'pro' | 'enterprise';
type Plan = {
  id: PlanId;
  name: string;
  monthly: number | null; // per seat / month, USD
  credits: number | null; // pooled AI credits / month
  popular?: boolean;
};
const PLANS: Plan[] = [
  { id: 'basic', name: 'Basic', monthly: 9, credits: 1000 },
  { id: 'standard', name: 'Standard', monthly: 12, credits: 2000 },
  { id: 'pro', name: 'Pro', monthly: 19, credits: 3000, popular: true },
  { id: 'enterprise', name: 'Enterprise', monthly: null, credits: null },
];
const SEAT_OPTIONS = [3, 10, 50];
const DAYS_LEFT = 18; // day 12 of a 30-day cycle
const YEAR_FACTOR = 0.82; // "SAVE 18%", matching the live toggle

const money = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: n % 1 ? 2 : 0 });
const num = (n: number) => n.toLocaleString('en-US');
const planOf = (id: PlanId) => PLANS.find((p) => p.id === id)!;
const yearlyPerSeat = (monthly: number) => Math.round(monthly * YEAR_FACTOR);

/* ── Event-driven pipeline stages (static relative offsets, hydration-safe) */
const STAGES = [
  { ev: 'subscription.updated', d: 'plan, seats and cycle captured', t: '+0ms', s: 'done' },
  { ev: 'proration.calculated', d: 'mid-cycle delta over remaining days', t: '+6ms', s: 'done' },
  { ev: 'invoice.drafted', d: 'line items and amount due today', t: '+14ms', s: 'done' },
  { ev: 'credits.rebucketed', d: 'AI-credit pool resized, quota reset', t: '+23ms', s: 'done' },
  { ev: 'ledger.posted', d: 'double-entry record written', t: '+31ms', s: 'done' },
  { ev: 'downstream.synced', d: 'entitlements and CRM notified', t: '+44ms', s: 'async' },
] as const;

/* ── JD mapping (what the demo maps to in the role) ─────────────────── */
const FOCUS = [
  { k: 'Billing engine', v: 'Subscriptions, plan changes, renewals, prorations and invoicing across thousands of accounts.' },
  { k: 'AI-credits lifecycle', v: 'Bucket creation, consumption tracking, quota enforcement, and state transitions across plan changes.' },
  { k: 'Event-driven pipelines', v: 'Propagate billing state to downstream systems reliably, not just usually.' },
  { k: 'Production debugging', v: 'When the blast radius is a customer invoice or a blocked payment, see it through to resolution.' },
];

/* ── Selected work, framed to correctness and systems ───────────────── */
type Work = {
  name: string;
  href?: string;
  body: string;
  tags: string[];
  note?: string;
};
const WORK: Work[] = [
  {
    name: 'MIDI GPT REST API',
    href: 'https://github.com/barmoshe/AI_MIDI_API',
    body: 'A REST API where Temporal wraps each OpenAI call in retries and validation. A failed or invalid response is retried or rejected, never written through.',
    tags: ['Temporal', 'OpenAI', 'Python · Go · TS'],
  },
  {
    name: 'Cross-language data service',
    href: 'https://temporal.io/code-exchange/cross-language-data-processing-service-with-temporal',
    body: 'One Temporal workflow coordinating Go, Python and TypeScript workers, kept consistent under retries and partial failure. Featured on Temporal’s Code Exchange.',
    tags: ['Temporal', 'Distributed consistency', 'Go'],
    note: 'Externally validated',
  },
  {
    name: 'entailer',
    href: 'https://github.com/barmoshe/entailer',
    body: 'A logic-validity toolkit that checks whether statements follow and whether a set of them is consistent. The same kind of checking a billing invariant needs.',
    tags: ['TypeScript', 'Evals', 'Logic'],
  },
  {
    name: 'MDP',
    href: 'https://barmoshe.github.io/mdp/',
    body: 'A Markdown-to-document compiler, published as a versioned npm package with its own MCP server.',
    tags: ['npm', 'MCP', 'Node.js'],
  },
  {
    name: 'temporal-plugin',
    href: 'https://github.com/Base67-AI/temporal-plugin',
    body: 'Durable, resumable agent workflows for Claude Code, built on Temporal.',
    tags: ['Temporal', 'Orchestration'],
  },
  {
    name: 'Joomsy',
    body: 'Primary full-stack and DevOps engineer at a five-person startup, from design to deploy, responsible for the result in production.',
    tags: ['React', 'Node.js', 'AWS · Docker · K8s'],
    note: 'Current role, not linked',
  },
];

/* ── Tiny inline icons ──────────────────────────────────────────────── */
function Arrow() {
  return (
    <svg className="mnp-cta__arrow" width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <path d="M3.5 8.5h9M9 5l3.5 3.5L9 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Ext() {
  return (
    <svg className="mnp-wcard__ext" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M5 3.5h6.5V10M11 4L4 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Mark() {
  return (
    <span className="mnp-mark" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

/* ── The billing engine (the centerpiece) ───────────────────────────── */
function BillingEngine() {
  const [seats, setSeats] = useState(10);
  const [cycle, setCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [plan, setPlan] = useState<PlanId>('pro');
  const [proration, setProration] = useState(0);
  const [runKey, setRunKey] = useState(0);
  const prevPlan = useRef<PlanId>('pro');

  // On a plan change, prorate the switch across the remaining days of the
  // cycle (monthly daily rate). Any control change re-runs the pipeline.
  function changePlan(next: PlanId) {
    const a = planOf(prevPlan.current);
    const b = planOf(next);
    if (a.monthly != null && b.monthly != null) {
      const daily = (m: number) => m / 30;
      setProration(Math.round((daily(b.monthly) - daily(a.monthly)) * seats * DAYS_LEFT * 100) / 100);
    } else {
      setProration(0);
    }
    prevPlan.current = next;
    setPlan(next);
    setRunKey((k) => k + 1);
  }
  function changeSeats(n: number) {
    setSeats(n);
    setRunKey((k) => k + 1);
  }
  function changeCycle(c: 'monthly' | 'yearly') {
    setCycle(c);
    setRunKey((k) => k + 1);
  }

  const p = planOf(plan);
  const isEnterprise = p.monthly == null;
  const perSeat = isEnterprise ? null : cycle === 'yearly' ? yearlyPerSeat(p.monthly!) : p.monthly!;
  const strikeMonthly = !isEnterprise && cycle === 'yearly' ? p.monthly! : null;
  const recurring = perSeat == null ? null : cycle === 'yearly' ? perSeat * seats * 12 : perSeat * seats;
  const dueToday = recurring == null ? null : Math.max(0, recurring + proration);

  const bucket = p.credits; // pooled AI credits / month
  const usedPct = 0.34; // illustrative consumption at rebucket time
  const used = bucket == null ? null : Math.round(bucket * usedPct);

  return (
    <div className="mnp-engine">
      {/* LEFT — controls + event pipeline */}
      <div className="mnp-panel" data-reveal>
        <div className="mnp-panel__bar">
          <span className="mnp-dot" style={{ background: 'var(--mnp-green)' }} />
          <b>billing.engine</b>
          <span className="mnp-badge">live model</span>
        </div>
        <div className="mnp-panel__body">
          <div className="mnp-controls">
            <div>
              <span className="mnp-control__label">Plan</span>
              <div className="mnp-plans" role="group" aria-label="Choose a plan">
                {PLANS.map((pl) => {
                  const ps = pl.monthly == null ? null : cycle === 'yearly' ? yearlyPerSeat(pl.monthly) : pl.monthly;
                  return (
                    <button
                      key={pl.id}
                      type="button"
                      className="mnp-plan"
                      aria-pressed={plan === pl.id}
                      onClick={() => changePlan(pl.id)}
                    >
                      {pl.popular && <span className="mnp-plan__tag">Most Popular</span>}
                      <span className="mnp-plan__name">{pl.name}</span>
                      <span className="mnp-plan__price">
                        {ps == null ? 'Custom' : money(ps)}
                        {ps != null && <small> /seat/mo</small>}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 22 }}>
              <div>
                <span className="mnp-control__label">Team size</span>
                <div className="mnp-seg" role="group" aria-label="Team size">
                  {SEAT_OPTIONS.map((n) => (
                    <button key={n} type="button" aria-pressed={seats === n} onClick={() => changeSeats(n)}>
                      {n} seats
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="mnp-control__label">Billing cycle</span>
                <div className="mnp-seg" role="group" aria-label="Billing cycle">
                  <button type="button" aria-pressed={cycle === 'monthly'} onClick={() => changeCycle('monthly')}>
                    Monthly
                  </button>
                  <button type="button" aria-pressed={cycle === 'yearly'} onClick={() => changeCycle('yearly')}>
                    Yearly<span className="mnp-save">SAVE 18%</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* the propagation — re-keyed so the entrance replays on change */}
          <div className="mnp-pipe" key={runKey} aria-live="polite" style={{ marginTop: 22 }}>
            {STAGES.map((st, i) => (
              <div className="mnp-stage" key={st.ev} style={{ animationDelay: `${i * 80}ms` }}>
                <span className="mnp-stage__node">
                  <span className="mnp-stage__dot" />
                </span>
                <span>
                  <span className="mnp-stage__event">{st.ev}</span>
                  <span className="mnp-stage__desc">{st.d}</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className={`mnp-stage__pill ${st.s === 'async' ? 'mnp-pill--now' : 'mnp-pill--done'}`}>
                    {st.s === 'async' ? 'async' : 'done'}
                  </span>
                  <span className="mnp-stage__t">{st.t}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — invoice + AI credits */}
      <div className="mnp-panel" data-reveal>
        <div className="mnp-panel__bar">
          <span className="mnp-dot" style={{ background: 'var(--mnp-cyan)' }} />
          <b>invoice · due today</b>
          <span className="mnp-badge">{proration !== 0 ? 'prorated' : 'reconciled'}</span>
        </div>
        <div className="mnp-panel__body">
          <div className="mnp-invoice">
            <div className="mnp-row">
              <span>{p.name} plan × {seats} seats</span>
              <span>{isEnterprise ? "Let's talk" : `${money(perSeat!)} /seat/mo`}</span>
            </div>
            {strikeMonthly != null && (
              <div className="mnp-row mnp-row--strike">
                <span>Monthly rate</span>
                <span>{money(strikeMonthly)} /seat/mo</span>
              </div>
            )}
            <div className="mnp-row">
              <span>{cycle === 'yearly' ? 'Billed annually' : 'Billed monthly'}</span>
              <span>{recurring == null ? '—' : cycle === 'yearly' ? `${money(recurring)} /yr` : `${money(recurring)} /mo`}</span>
            </div>
            <div className="mnp-row mnp-row--credit">
              <span>AI credits pooled</span>
              <span>{bucket == null ? 'Custom' : `${num(bucket)} /mo`}</span>
            </div>

            <span className={`mnp-proration ${proration === 0 ? 'is-none' : ''}`}>
              {proration === 0
                ? `No plan change this cycle · ${DAYS_LEFT} of 30 days left`
                : `${proration > 0 ? '+' : ''}${money(proration)} prorated · ${DAYS_LEFT} of 30 days left`}
            </span>

            <div className="mnp-hr" />
            <div className="mnp-total">
              <span className="mnp-total__k">Due today</span>
              <span className={`mnp-total__v ${'is-pulse'}`} key={`due-${runKey}`}>
                {dueToday == null ? "Let's talk" : money(dueToday)}
              </span>
            </div>

            <div className="mnp-credits">
              <div className="mnp-credits__top">
                <b>AI-credit bucket</b>
                <span>
                  {used == null ? 'custom' : <><span className="mnp-credits__num">{num(used)}</span> / {num(bucket!)} used</>}
                </span>
              </div>
              <div className="mnp-meter">
                <i style={{ width: `${bucket == null ? 100 : Math.round(usedPct * 100)}%` }} />
              </div>
              <div className="mnp-credits__foot">
                Rebucketed on every plan change: pool resized, consumption re-based, quota re-enforced.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Reveal-on-scroll (no dependency) ───────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.mnp-root [data-reveal]'));
    if (!('IntersectionObserver' in window) || els.length === 0) {
      els.forEach((el) => el.setAttribute('data-in', 'true'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute('data-in', 'true');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Page ───────────────────────────────────────────────────────────── */
export default function PaymentsApp() {
  useReveal();

  return (
    <div className="mp-root mnp-root">
      {/* NAV */}
      <header className="mnp-nav">
        <div className="mnp-shell mnp-nav__in">
          <a className="mnp-brand" href="#top" aria-label="bar for monday.com">
            <Mark />
            <span>
              bar<span className="mnp-brand__for">.for</span> monday
            </span>
            <span className="mnp-brand__tag">for the Payments Foundations Group</span>
          </a>
          <nav className="mnp-nav__links" aria-label="Sections">
            <a href="#engine">Billing engine</a>
            <a href="#work">Work</a>
            <a href="#paper">On paper</a>
          </nav>
          <div className="mnp-nav__cta">
            <a className="mnp-cta mnp-cta--ghost" href={GITHUB} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="mnp-cta mnp-cta--fill" href={EMAIL}>
              Email me <Arrow />
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main id="top">
        <section className="mnp-hero">
          <div className="mnp-shell mnp-hero__in">
            <span className="mnp-eyebrow" data-reveal>
              Application · Software Engineer, Payments Foundations Group
            </span>
            <h1 className="mnp-display" data-reveal>
              I build systems that
              <br />
              <span className="mnp-grad">stay correct</span> when things fail.
            </h1>
            <p className="mnp-lead mnp-hero__lead" data-reveal>
              I&rsquo;m Bar Moshe, an AI builder and full-stack engineer. I ship LLM and systems work
              from intake to deploy, and I put determinism and checks around the parts that can fail.
              This is my application for the Software Engineer role on the Payments Foundations Group.
            </p>
            <div className="mnp-hero__ctas" data-reveal>
              <a className="mnp-cta mnp-cta--fill" href={EMAIL}>
                Email me <Arrow />
              </a>
              <a className="mnp-cta mnp-cta--ghost" href="#engine">
                See the billing engine
              </a>
            </div>
            <div className="mnp-stack" data-reveal>
              {['TypeScript', 'Node.js', 'Event-driven pipelines', 'Determinism + evals', 'Distributed consistency'].map(
                (s) => (
                  <span className="mnp-chip" key={s}>
                    <i />
                    {s}
                  </span>
                ),
              )}
            </div>
            <p className="mnp-hero__note" data-reveal>
              Every project link below is live.
            </p>
          </div>
        </section>

        {/* CENTERPIECE */}
        <section id="engine" className="mnp-section mnp-section--soft">
          <div className="mnp-shell">
            <div className="mnp-section__head">
              <span className="mnp-eyebrow" data-reveal>
                A working model
              </span>
              <h2 className="mnp-h2" data-reveal>
                A billing model, <span className="mnp-grad">end to end</span>.
              </h2>
              <p className="mnp-lead" data-reveal>
                Change the plan, the seat count or the cycle. The state propagates through proration,
                invoice, AI-credit rebucket, ledger and downstream. I built it to match what this role
                owns, using monday.com&rsquo;s public plan prices.
              </p>
            </div>

            <BillingEngine />

            <p className="mnp-caption" data-reveal>
              Prices are monday.com&rsquo;s public per-seat plans; the pipeline, proration and
              rebucket logic are my own model. It is a systems demonstration, not a claim of access
              to monday.com&rsquo;s billing.
            </p>

            <div className="mnp-focus" style={{ marginTop: 34 }}>
              {FOCUS.map((f) => (
                <div className="mnp-fcard" key={f.k} data-reveal>
                  <h3>{f.k}</h3>
                  <p>{f.v}</p>
                  <span className="mnp-fcard__jd">what I&rsquo;d own here →</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="mnp-section">
          <div className="mnp-shell">
            <div className="mnp-section__head">
              <span className="mnp-eyebrow" data-reveal>
                Selected work · every link live
              </span>
              <h2 className="mnp-h2" data-reveal>
                The systems work this role leans on.
              </h2>
              <p className="mnp-lead" data-reveal>
                Determinism around failure, consistency across services, and the checking a ledger
                needs. This is the part of my background that transfers directly.
              </p>
            </div>

            <div className="mnp-work">
              {WORK.map((w) => {
                const inner = (
                  <>
                    <div className="mnp-wcard__top">
                      <h3>{w.name}</h3>
                      {w.href ? <Ext /> : null}
                    </div>
                    <p>{w.body}</p>
                    <div className="mnp-tags">
                      {w.tags.map((t) => (
                        <span className="mnp-tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                    {w.note ? <span className="mnp-wcard__note">{w.note}</span> : null}
                  </>
                );
                return w.href ? (
                  <a className="mnp-wcard" href={w.href} target="_blank" rel="noreferrer" key={w.name} data-reveal>
                    {inner}
                  </a>
                ) : (
                  <div className="mnp-wcard" key={w.name} data-reveal>
                    {inner}
                  </div>
                );
              })}
            </div>

            {/* ON PAPER */}
            <div id="paper" className="mnp-facts">
              <div className="mnp-fact" data-reveal>
                <h4>Experience</h4>
                <ul>
                  <li>
                    Freelance AI Builder<span>2026 — now · intake to deploy</span>
                  </li>
                  <li>
                    Software developer, Joomsy<span>2025 — now · primary full-stack + DevOps</span>
                  </li>
                  <li>
                    Customer Support Engineer, Wochit<span>2021 — now · users&rsquo; failures into fixes</span>
                  </li>
                </ul>
              </div>
              <div className="mnp-fact" data-reveal>
                <h4>Education</h4>
                <ul>
                  <li>
                    B.Sc. Computer Science<span>Afeka College of Engineering</span>
                  </li>
                  <li>
                    DevOps workshop<span>Wix · EKS, Kubernetes, Terraform</span>
                  </li>
                  <li>
                    FullStack bootcamp<span>Coding Academy · Node, React</span>
                  </li>
                </ul>
              </div>
              <div className="mnp-fact" data-reveal>
                <h4>Reading this straight</h4>
                <ul>
                  <li>
                    I have not run a payments system in production. What I bring is the systems half
                    this role leans on: determinism around failure, distributed consistency, evals.
                    The billing domain I would ramp into fast.
                  </li>
                  <li>
                    <a href={CV} target="_blank" rel="noreferrer">
                      Download the one-page CV (PDF) →
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CLOSE */}
        <section className="mnp-close">
          <div className="mnp-shell mnp-close__in">
            <h2 className="mnp-display" data-reveal>
              I&rsquo;d like to <span className="mnp-grad">build this</span> with you.
            </h2>
            <div className="mnp-hero__ctas" data-reveal>
              <a className="mnp-cta mnp-cta--fill" href={EMAIL}>
                Email me <Arrow />
              </a>
              <a className="mnp-cta mnp-cta--ghost" href={WHATSAPP} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mnp-footer">
        <div className="mnp-shell">
          <div className="mnp-footer__grid">
            <div>
              <div className="mnp-brand" style={{ marginBottom: 12 }}>
                <Mark />
                <span>
                  bar<span className="mnp-brand__for">.for</span> monday
                </span>
              </div>
              <p style={{ fontSize: 14, color: 'var(--mnp-soft)', maxWidth: 320, lineHeight: 1.6 }}>
                A job application for the Payments Foundations Group, built in monday.com&rsquo;s
                pricing brand. Written and shipped by Bar Moshe.
              </p>
            </div>
            <div>
              <h5>Contact</h5>
              <a href={EMAIL}>Email</a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
            <div>
              <h5>Proof &amp; application</h5>
              <a href={GITHUB} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={CV} target="_blank" rel="noreferrer">
                CV, one-page PDF
              </a>
              <a href="/revai">The RevAI role page →</a>
            </div>
          </div>
          <p className="mnp-footer__legal">
            Not affiliated with monday.com. Built independently by Bar Moshe as a job application;
            monday.com, the monday.com logo, and its plan names belong to monday.com Ltd. Plan prices
            shown are public and used to illustrate a self-built billing model.
          </p>
        </div>
      </footer>
    </div>
  );
}
