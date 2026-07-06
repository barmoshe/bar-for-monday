'use client';

import { useRef } from 'react';
import { gsap, useGSAP, FULL_MOTION_QUERY } from '../../lib/gsap';
import './marketing-base.css';
import './monday.css';

/**
 * MondayApp — an ad-hoc, personalized application page for Bar Moshe's
 * "AI Software Engineer, RevAI" application to monday.com (Tel Aviv, hybrid).
 * Built in monday.com's REAL visual language, read live off monday.com
 * (computed styles, 2026-07-03): white surface, Poppins with giant weight-400
 * headlines at -0.02em tracking, ink #333333, a gradient keyword phrase
 * clipped into the headline (pink #FE81E4 → orange #FDA900), indigo #6161FF
 * pill CTAs with trailing arrows, a dot-grid workflow canvas with AI-agent
 * node cards and dashed connectors (their signature graphic, rebuilt as a
 * RevAI-shaped pipeline), thin-border work cards, and a near-black
 * "foundation" close. Copy is deliberately terse CV register.
 *
 * Self-contained: mounts `.mp-root` only to inherit the marketing reset /
 * focus base (carried locally as marketing-base.css), then overrides
 * everything via `.mn-root`. All motion is gated on prefers-reduced-motion
 * and the page is fully legible with no JS. Standalone sibling (the
 * ADR-0132 pattern).
 */

const EMAIL =
  'mailto:1barmoshe1@gmail.com?subject=AI%20Software%20Engineer%2C%20RevAI%20-%20Bar%20Moshe';
const CV = '/Bar_Moshe_CV_mondaycom.pdf';
const LINKEDIN = 'https://www.linkedin.com/in/barmoshe/';
const GITHUB = 'https://github.com/barmoshe';
const WHATSAPP = 'https://wa.me/972546561465';

/* ── The three-capsule mark: a nod to their logo, not a copy of it. ──── */
function Mark({ className = '' }: { className?: string }) {
  return (
    <svg className={`mn-mark ${className}`} viewBox="0 0 34 24" aria-hidden="true" focusable="false">
      <rect x="3" y="4" width="7" height="17" rx="3.5" transform="rotate(-24 6.5 12.5)" fill="#f62b54" />
      <rect x="14" y="4" width="7" height="17" rx="3.5" transform="rotate(-24 17.5 12.5)" fill="#ffcc00" />
      <circle cx="28.5" cy="17.5" r="3.5" fill="#00ca72" />
    </svg>
  );
}

/* ── One-line stack strip (their Fortune-500 logo row, as CV facts). ─── */
const STACK = [
  'TypeScript',
  'Python',
  'Go',
  'React',
  'Next.js',
  'Node.js',
  'Temporal',
  'MCP',
  'OpenAI',
  'Anthropic',
  'AWS',
  'Kubernetes',
  'Terraform',
];

/* ── Selected work: terse cards, live links. Credential = no link. ───── */
type Work = {
  tag: string;
  title: string;
  desc: string;
  href?: string;
  open?: string;
};

const WORK: Work[] = [
  {
    tag: 'MCP · NPM · OPEN SOURCE',
    title: 'MDP',
    desc: 'Markdown to document and deck compiler on npm. MCP server plus Claude Code and Codex plugins others install.',
    href: 'https://barmoshe.github.io/mdp/',
    open: 'Open',
  },
  {
    tag: 'AGENTS · ORCHESTRATION',
    title: 'temporal-plugin',
    desc: 'Temporal.io orchestration plugin for Claude Code. Durable, resumable workflows for agents.',
    href: 'https://github.com/Base67-AI/temporal-plugin',
    open: 'Code',
  },
  {
    tag: 'PIPELINES · CODE EXCHANGE',
    title: 'Cross-language Temporal service',
    desc: 'One workflow orchestrating Go, Python and TypeScript workers. Featured on Temporal Code Exchange.',
    href: 'https://temporal.io/code-exchange/cross-language-data-processing-service-with-temporal',
    open: 'Writeup',
  },
  {
    tag: 'AGENTS · REAL TIME',
    title: 'MIDI Agent',
    desc: 'Live call-and-response agent: answers a MIDI phrase with editable in-key MIDI in the DAW. Python.',
    href: 'https://github.com/barmoshe/midi-agent',
    open: 'Code',
  },
  {
    tag: 'LLM PIPELINE · RETRIES',
    title: 'MIDI GPT REST API',
    desc: 'Multi-step generation pipeline on Temporal calling OpenAI. Retries and validation at every step.',
    href: 'https://github.com/barmoshe/AI_MIDI_API',
    open: 'Code',
  },
  {
    tag: 'EVALS · OPEN SOURCE',
    title: 'entailer',
    desc: 'Logic-validity toolkit: checks whether a conclusion follows from its premises. Useful next to LLMs.',
    href: 'https://github.com/barmoshe/entailer',
    open: 'Code',
  },
  {
    tag: 'FULL STACK · LIVE',
    title: 'Biome Synth',
    desc: 'Browser instrument with an AI DJ across five states. React, Tone.js, Three.js, Canvas2D.',
    href: 'https://biome-synth.lovable.app/',
    open: 'Play',
  },
  {
    tag: 'CURRENT ROLE · PRODUCTION',
    title: 'Joomsy',
    desc: 'Primary developer at a five-person startup: full stack plus the DevOps that runs it, design to deploy. Named, not linked.',
  },
];

/* ── On paper: the CV, compressed. ───────────────────────────────────── */
const CV_LINES: { h: string; lines: string[] }[] = [
  {
    h: 'Experience',
    lines: [
      'Software developer, Joomsy (2025-present). Primary developer, full stack + DevOps, team of five.',
      'Customer Support Engineer, Wochit (2021-present). Cloud video editor at scale; user issues into product fixes.',
    ],
  },
  {
    h: 'Education',
    lines: [
      'B.Sc. Computer Science, Afeka College of Engineering.',
      'Wix DevOps workshop (EKS, Kubernetes, Terraform). Coding Academy full-stack bootcamp.',
    ],
  },
];

/* ── The centerpiece: their workflow canvas, RevAI-shaped. ───────────── */
function WorkflowCanvas() {
  return (
    <div className="mn-flow" role="img" aria-label="A revenue workflow: a new lead triggers an AI qualification agent, branches on fit into outreach drafting or a nurture flow, and notifies the team">
      <svg className="mn-flow__svg" viewBox="0 0 960 400" focusable="false" aria-hidden="true">
        {/* wires */}
        <path className="mn-flow__wire" d="M256 88 H 330" />
        <path className="mn-flow__wire" d="M436 116 V 168" />
        <path className="mn-flow__wire" d="M492 196 H 560 V 116 H 620" />
        <path className="mn-flow__wire" d="M492 196 H 560 V 288 H 620" />
        <path className="mn-flow__wire" d="M836 116 V 176" />
        <path className="mn-flow__wire" d="M836 288 V 228" />

        {/* yes / no chips */}
        <g className="mn-flow__chip">
          <rect x="540" y="100" width="42" height="22" rx="11" />
          <text x="561" y="115">Yes</text>
        </g>
        <g className="mn-flow__chip">
          <rect x="540" y="272" width="40" height="22" rx="11" />
          <text x="560" y="287">No</text>
        </g>

        {/* n1 trigger */}
        <g className="mn-flow__node" data-node>
          <rect className="mn-flow__card" x="60" y="60" width="196" height="56" rx="10" />
          <rect className="mn-flow__icon mn-flow__icon--indigo" x="74" y="74" width="28" height="28" rx="8" />
          <path className="mn-flow__glyph" d="M90 80l-6 9h5l-2 8 7-10h-5l1-7z" />
          <text className="mn-flow__label" x="112" y="84">New lead</text>
          <text className="mn-flow__sub" x="112" y="100">signs up</text>
        </g>

        {/* n2 qualify agent */}
        <g className="mn-flow__node" data-node>
          <rect className="mn-flow__card" x="330" y="60" width="212" height="56" rx="10" />
          <rect className="mn-flow__icon mn-flow__icon--pink" x="344" y="74" width="28" height="28" rx="14" />
          <circle className="mn-flow__glyph-dot" cx="353" cy="86" r="2.4" />
          <circle className="mn-flow__glyph-dot" cx="363" cy="86" r="2.4" />
          <path className="mn-flow__glyph-line" d="M352 93c2 2.5 10 2.5 12 0" />
          <text className="mn-flow__label" x="382" y="84">Qualify lead</text>
          <text className="mn-flow__sub" x="382" y="100">score + enrich</text>
          <g className="mn-flow__badge" data-badge>
            <rect x="466" y="52" width="66" height="20" rx="10" />
            <text x="499" y="66">AI agent</text>
          </g>
        </g>

        {/* condition */}
        <g className="mn-flow__node" data-node>
          <rect className="mn-flow__cond" x="380" y="172" width="112" height="48" rx="24" />
          <text className="mn-flow__label mn-flow__label--center" x="436" y="200">Good fit?</text>
        </g>

        {/* n3 outreach agent */}
        <g className="mn-flow__node" data-node>
          <rect className="mn-flow__card" x="620" y="88" width="216" height="56" rx="10" />
          <rect className="mn-flow__icon mn-flow__icon--yellow" x="634" y="102" width="28" height="28" rx="8" />
          <path className="mn-flow__glyph" d="M640 122l10-10 4 4-10 10h-4v-4zM652 110l3-3 4 4-3 3-4-4z" />
          <text className="mn-flow__label" x="672" y="112">Draft outreach</text>
          <text className="mn-flow__sub" x="672" y="128">human approves</text>
          <g className="mn-flow__badge" data-badge>
            <rect x="760" y="80" width="66" height="20" rx="10" />
            <text x="793" y="94">AI agent</text>
          </g>
        </g>

        {/* n4 nurture */}
        <g className="mn-flow__node" data-node>
          <rect className="mn-flow__card" x="620" y="260" width="216" height="56" rx="10" />
          <rect className="mn-flow__icon mn-flow__icon--green" x="634" y="274" width="28" height="28" rx="8" />
          <path className="mn-flow__glyph" d="M641 282h14v10l-7 5-7-5v-10z" />
          <text className="mn-flow__label" x="672" y="284">Nurture flow</text>
          <text className="mn-flow__sub" x="672" y="300">stay warm</text>
        </g>

        {/* n5 notify */}
        <g className="mn-flow__node" data-node>
          <rect className="mn-flow__card" x="726" y="176" width="196" height="52" rx="10" />
          <rect className="mn-flow__icon mn-flow__icon--indigo" x="740" y="188" width="28" height="28" rx="8" />
          <path className="mn-flow__glyph" d="M754 194a6 6 0 0 0-6 6v5l-3 4h18l-3-4v-5a6 6 0 0 0-6-6zM752 211a2.5 2.5 0 0 0 5 0" />
          <text className="mn-flow__label" x="778" y="198">Notify team</text>
          <text className="mn-flow__sub" x="778" y="214">CRM + Slack sync</text>
        </g>
      </svg>
    </div>
  );
}

export default function MondayApp() {
  const scope = useRef<HTMLDivElement | null>(null);

  /* Their entrance language: rise the hero, fade-up sections, pop the
     canvas nodes in order once the canvas scrolls into view. */
  useGSAP(
    () => {
      if (!matchMedia(FULL_MOTION_QUERY).matches) return;

      gsap.from('.mn-hero [data-rise]', {
        y: 26,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.09,
        delay: 0.05,
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

      gsap.from('[data-node]', {
        y: 18,
        opacity: 0,
        scale: 0.96,
        transformOrigin: '50% 50%',
        duration: 0.55,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.mn-flow', start: 'top 78%' },
      });
    },
    { scope },
  );

  return (
    <div className="mp-root mn-root" ref={scope}>
      <a className="mn-skip" href="#main">Skip to content</a>

      {/* ── Top navigation ──────────────────────────────────── */}
      <header className="mn-nav">
        <div className="mn-nav__inner">
          <a className="mn-brand" href="#main" aria-label="Bar Moshe">
            <Mark />
            <span className="mn-brand__name">
              bar<span className="mn-brand__bold">moshe</span>
            </span>
          </a>
          <span className="mn-nav__tag">for monday.com</span>
          <nav className="mn-nav__links" aria-label="Sections">
            <a className="mn-nav__link" href="#pipeline">Pipeline</a>
            <a className="mn-nav__link" href="#work">Work</a>
            <a className="mn-nav__link" href="#paper">CV</a>
          </nav>
          <div className="mn-nav__cta">
            <a className="mn-btn mn-btn--primary mn-btn--sm" href={EMAIL}>
              Email me <span className="mn-btn__arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        {/* ── Hero: their centered giant headline + gradient phrase ── */}
        <section className="mn-hero">
          <div className="mn-hero__inner">
            <p className="mn-eyebrow" data-rise>
              Application · AI Software Engineer, RevAI
            </p>
            <h1 className="mn-title" data-rise>
              Bar Moshe
              <br />
              <span className="mn-grad">AI builder &amp; full-stack engineer</span>
            </h1>
            <p className="mn-lede" data-rise>
              LLM apps, MCP servers, agents, durable pipelines on Temporal, and the
              DevOps around them. Shipped and public: npm, GitHub, Temporal Code Exchange.
            </p>
            <div className="mn-hero__cta" data-rise>
              <a className="mn-btn mn-btn--primary" href="#work">
                See the work <span className="mn-btn__arrow" aria-hidden="true">→</span>
              </a>
              <a className="mn-btn mn-btn--outline" href={CV} target="_blank" rel="noopener noreferrer">
                Download CV
              </a>
            </div>
            <p className="mn-hero__meta" data-rise>
              Tel Aviv <span aria-hidden="true">✦</span> hybrid <span aria-hidden="true">✦</span> full time
            </p>
          </div>

          {/* their trust strip, as one line of CV facts */}
          <div className="mn-stack" data-rise aria-label="Stack">
            <p className="mn-stack__label">Stack</p>
            <ul className="mn-stack__row">
              {STACK.map((s) => (
                <li key={s} className="mn-stack__item">{s}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Centerpiece: their workflow canvas, RevAI-shaped ── */}
        <section id="pipeline" className="mn-section mn-section--grid">
          <div className="mn-wrap">
            <h2 className="mn-h2" data-reveal>
              What I build: <span className="mn-grad mn-grad--cool">agent pipelines</span>
            </h2>
            <div data-reveal>
              <WorkflowCanvas />
            </div>
            <p className="mn-flow__caption" data-reveal>
              Agents do the steps, humans approve. Each part maps to work below.
            </p>
          </div>
        </section>

        {/* ── Work + CV, consolidated ─────────────────────────── */}
        <section id="work" className="mn-section mn-section--soft">
          <div className="mn-wrap">
            <h2 className="mn-h2" data-reveal>
              Selected work, <span className="mn-grad mn-grad--warm">live where possible</span>
            </h2>
            <div className="mn-work">
              {WORK.map((w) =>
                w.href ? (
                  <a
                    key={w.title}
                    className="mn-card"
                    href={w.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-reveal
                  >
                    <span className="mn-card__tag">{w.tag}</span>
                    <h3 className="mn-card__title">{w.title}</h3>
                    <p className="mn-card__desc">{w.desc}</p>
                    <span className="mn-card__link">
                      {w.open} <span aria-hidden="true">→</span>
                    </span>
                  </a>
                ) : (
                  <article key={w.title} className="mn-card mn-card--static" data-reveal>
                    <span className="mn-card__tag">{w.tag}</span>
                    <h3 className="mn-card__title">{w.title}</h3>
                    <p className="mn-card__desc">{w.desc}</p>
                  </article>
                ),
              )}
            </div>

            <div id="paper" className="mn-cv" data-reveal>
              {CV_LINES.map((col) => (
                <div key={col.h} className="mn-cv__col">
                  <h3 className="mn-cv__h">{col.h}</h3>
                  <ul className="mn-cv__list">
                    {col.lines.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="mn-cv__col mn-cv__col--cta">
                <h3 className="mn-cv__h">Full CV</h3>
                <p className="mn-cv__note">One page, PDF.</p>
                <a className="mn-btn mn-btn--dark mn-btn--sm" href={CV} target="_blank" rel="noopener noreferrer">
                  Download <span className="mn-btn__arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Close: their near-black foundation section ─────── */}
        <section className="mn-close">
          <div className="mn-close__inner" data-reveal>
            <p className="mn-close__eyebrow">AI Software Engineer, RevAI</p>
            <h2 className="mn-close__title">Let&rsquo;s talk.</h2>
            <p className="mn-close__sub">
              1barmoshe1@gmail.com · Tel Aviv, hybrid-ready.
            </p>
            <div className="mn-close__cta">
              <a className="mn-btn mn-btn--light" href={EMAIL}>
                Email me <span className="mn-btn__arrow" aria-hidden="true">→</span>
              </a>
              <a className="mn-btn mn-btn--ghostlight" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              <a className="mn-btn mn-btn--ghostlight" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a className="mn-btn mn-btn--ghostlight" href={GITHUB} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a className="mn-btn mn-btn--ghostlight" href={CV} target="_blank" rel="noopener noreferrer">
                CV
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="mn-footer">
        <div className="mn-footer__inner">
          <span>
            An application page Bar Moshe built for the AI Software Engineer, RevAI role.
            Not affiliated with monday.com.
          </span>
          <span>Tel Aviv · 2026</span>
        </div>
      </footer>
    </div>
  );
}
