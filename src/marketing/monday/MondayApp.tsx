'use client';

import { useRef } from 'react';
import { gsap, useGSAP, FULL_MOTION_QUERY } from '../../lib/gsap';
import './marketing-base.css';
import './monday.css';

/**
 * MondayApp — an ad-hoc, personalized application page for Bar Moshe's
 * "AI Software Engineer, RevAI" application to monday.com (Tel Aviv, hybrid).
 *
 * Rebuilt 2026-07-11 against monday.com's NEW homepage ("You lead. Agents
 * act." — the AI work platform for people and agents), read live off
 * monday.com in Chrome: white surface, Poppins weight-400 with near-black
 * giant display type (56px hero at -0.03em, section displays far larger),
 * indigo #6161FF accent END-WORDS ("Posts, campaigns and ads. Done."),
 * lilac #D9D7FF active pills, gray #F3F4F5 alternating sections and big
 * rounded containers, agent character cards in the hero, a near-black board
 * mockup with classic monday status pills, a line-art character that fills
 * with color on scroll (their astronaut moment), floating context cards,
 * a "Full control" icon grid, and a giant centered close.
 *
 * Copy grounded in the actual RevAI team (Kyle Poyar's Growth Unhinged
 * deep dive: Oran Akron's internal startup; Amanda / Jax / Oscar agents).
 *
 * Self-contained: mounts `.mp-root` only to inherit the marketing reset
 * (marketing-base.css), then overrides everything via `.mn-root`. All motion
 * gated on prefers-reduced-motion; fully legible with no JS.
 */

const EMAIL =
  'mailto:1barmoshe1@gmail.com?subject=AI%20Software%20Engineer%2C%20RevAI%20-%20Bar%20Moshe';
const CV = '/Bar_Moshe_CV_mondaycom.pdf';
const LINKEDIN = 'https://www.linkedin.com/in/barmoshe/';
const GITHUB = 'https://github.com/barmoshe';
const WHATSAPP = 'https://wa.me/972546561465';
const REVAI_ARTICLE =
  'https://www.growthunhinged.com/p/what-ai-native-gtm-looks-like-at-public-company-scale';

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

/* ── Hero pills — the skills the JD names, styled as their role tags. ── */
const HERO_TAGS = [
  { label: 'Agents', active: true },
  { label: 'MCP' },
  { label: 'RAG' },
  { label: 'Evals' },
  { label: 'Orchestration' },
  { label: 'DevOps' },
];

/* ── Original character busts (flat geometric, monday-pastel). ───────── */
function CharacterBust({
  skin = '#f3c29e',
  hair = '#3d3b66',
  shirt = '#5ad4c8',
  accent = '#ff7ab8',
  headphones = true,
}: {
  skin?: string;
  hair?: string;
  shirt?: string;
  accent?: string;
  headphones?: boolean;
}) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false" className="mn-bust">
      {/* shoulders */}
      <path d={'M18 120 C18 92 42 82 60 82 C78 82 102 92 102 120 Z'} fill={shirt} />
      <rect x="24" y="96" width="72" height="8" rx="4" fill="#ffffff" opacity="0.65" />
      {/* neck */}
      <rect x="52" y="66" width="16" height="18" rx="7" fill={skin} />
      {/* head */}
      <circle cx="60" cy="46" r="24" fill={skin} />
      {/* hair cap */}
      <path d="M36 46 a24 24 0 0 1 48 0 v-6 a24 20 0 0 0 -48 0 Z" fill={hair} />
      <path d="M36 44 q0 -20 24 -20 q24 0 24 20 l0 -4 q-2 -18 -24 -18 q-22 0 -24 18 Z" fill={hair} />
      {/* glasses */}
      <circle cx="50" cy="48" r="7.5" fill="none" stroke={accent} strokeWidth="3" />
      <circle cx="70" cy="48" r="7.5" fill="none" stroke={accent} strokeWidth="3" />
      <path d="M57.5 48 h5" stroke={accent} strokeWidth="3" />
      {/* smile */}
      <path d="M54 60 q6 5 12 0" stroke="#b0754a" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      {headphones && (
        <>
          <path d="M34 44 a26 26 0 0 1 52 0" fill="none" stroke={hair} strokeWidth="6" strokeLinecap="round" />
          <rect x="28" y="40" width="10" height="18" rx="5" fill={accent} />
          <rect x="82" y="40" width="10" height="18" rx="5" fill={accent} />
        </>
      )}
    </svg>
  );
}

/* ── Board mockup rows — real work as a monday board. ────────────────── */
const BOARD_ROWS: {
  name: string;
  status: string;
  statusClass: string;
  link: string;
  href: string;
}[] = [
  {
    name: 'MDP, markdown to deck compiler',
    status: 'On npm',
    statusClass: 'green',
    link: 'barmoshe.github.io/mdp',
    href: 'https://barmoshe.github.io/mdp/',
  },
  {
    name: 'temporal-plugin for Claude Code',
    status: 'Open source',
    statusClass: 'green',
    link: 'github.com/Base67-AI',
    href: 'https://github.com/Base67-AI/temporal-plugin',
  },
  {
    name: 'Cross-language Temporal service',
    status: 'Featured',
    statusClass: 'purple',
    link: 'temporal.io/code-exchange',
    href: 'https://temporal.io/code-exchange/cross-language-data-processing-service-with-temporal',
  },
  {
    name: 'MIDI Agent, live call and response',
    status: 'Done',
    statusClass: 'green',
    link: 'github.com/barmoshe',
    href: 'https://github.com/barmoshe/midi-agent',
  },
  {
    name: 'Biome Synth, browser instrument + AI DJ',
    status: 'Playable',
    statusClass: 'orange',
    link: 'biome-synth.lovable.app',
    href: 'https://biome-synth.lovable.app/',
  },
  {
    name: 'entailer, logic-validity toolkit',
    status: 'Live',
    statusClass: 'green',
    link: 'github.com/barmoshe/entailer',
    href: 'https://github.com/barmoshe/entailer',
  },
];

/* ── Work grid: the full roster, live links. Credential = no link. ───── */
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
    desc: 'Markdown to document and deck compiler on npm. Ships an MCP server plus Claude Code and Codex plugins other people install.',
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

const REQUIREMENT_PILLS = [
  'AI agents & multi-agent',
  'MCP',
  'RAG & evals',
  'Orchestration',
  'Full stack',
  'Production ops',
];

/* ── RevAI floating context cards (from Kyle Poyar's deep dive). ─────── */
const REVAI_CARDS: { name: string; role: string; stat: string }[] = [
  {
    name: 'Amanda',
    role: 'Inbound qualifying voice agent',
    stat: 'Response time: 24 hours to 2 minutes',
  },
  {
    name: 'Jax',
    role: 'In-platform trial activation agent',
    stat: '2.5x conversion vs the control group',
  },
  {
    name: 'Oscar',
    role: 'Account research and planning agent',
    stat: 'Two weeks of rep work in 5 minutes',
  },
];

/* ── Full disclosure: the CV as their control grid. ──────────────────── */
const FACTS: { icon: string; h: string; p: string }[] = [
  {
    icon: 'code',
    h: 'Experience, building',
    p: 'Software developer at Joomsy, a five-person startup. Primary developer: full stack plus the DevOps that runs it, design to deploy.',
  },
  {
    icon: 'headset',
    h: 'Experience, users',
    p: 'Customer Support Engineer at Wochit, a cloud video editor at scale. Turning user issues into product fixes since 2021.',
  },
  {
    icon: 'cap',
    h: 'Education',
    p: 'B.Sc. Computer Science, Afeka College of Engineering. Wix DevOps workshop (EKS, Kubernetes, Terraform). Coding Academy bootcamp.',
  },
  {
    icon: 'layers',
    h: 'Stack',
    p: 'TypeScript, Python, Go. React, Next.js, Node. Temporal, MCP, OpenAI, Anthropic. AWS, Kubernetes, Terraform.',
  },
  {
    icon: 'pin',
    h: 'Logistics',
    p: 'Tel Aviv, hybrid-ready, full time. Available to start a conversation this week.',
  },
  {
    icon: 'doc',
    h: 'The paper',
    p: 'One page, in this brand.',
  },
];

function FactIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    code: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 6l-2 12" />,
    headset: <path d="M4 13a8 8 0 0 1 16 0M4 13v3a2 2 0 0 0 2 2h1v-5H5m14 0h-2v5h1a2 2 0 0 0 2-2v-3" />,
    cap: <path d="M3 10l9-5 9 5-9 5-9-5zm4 3v4c0 1 2.5 2.5 5 2.5s5-1.5 5-2.5v-4" />,
    layers: <path d="M12 3l9 5-9 5-9-5 9-5zm-9 9l9 5 9-5m-18 4l9 5 9-5" />,
    pin: <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />,
    doc: <path d="M7 3h7l4 4v14H7V3zm7 0v4h4M10 12h5m-5 4h5" />,
  };
  return (
    <svg viewBox="0 0 24 24" className="mn-fact__icon" aria-hidden="true" focusable="false">
      {paths[name]}
    </svg>
  );
}

/* ── The scroll-fill character: line art that gains color. ───────────── */
function BuilderFigure({ variant }: { variant: 'line' | 'color' }) {
  const line = variant === 'line';
  const stroke = '#c9cdd8';
  return (
    <svg viewBox="0 0 200 240" aria-hidden="true" focusable="false" className={`mn-figure mn-figure--${variant}`}>
      {/* torso / jacket */}
      <path
        d="M40 240 C40 180 62 158 100 158 C138 158 160 180 160 240 Z"
        fill={line ? 'none' : '#5a8df5'}
        stroke={line ? stroke : 'none'}
        strokeWidth="2.5"
      />
      {/* jacket stripes */}
      <path d="M56 196 l22 -14 M144 196 l-22 -14" stroke={line ? stroke : '#ffffff'} strokeWidth={line ? 2 : 6} strokeLinecap="round" fill="none" />
      {/* chest panel */}
      <rect x="84" y="196" width="32" height="22" rx="4" fill={line ? 'none' : '#ffffff'} stroke={line ? stroke : 'none'} strokeWidth="2.5" />
      {/* collar */}
      <path
        d="M74 168 a26 12 0 0 0 52 0"
        fill={line ? 'none' : '#e56ba5'}
        stroke={line ? stroke : 'none'}
        strokeWidth="2.5"
      />
      {/* neck */}
      <rect x="88" y="132" width="24" height="30" rx="10" fill={line ? 'none' : '#f3c29e'} stroke={line ? stroke : 'none'} strokeWidth="2.5" />
      {/* head */}
      <circle cx="100" cy="96" r="38" fill={line ? 'none' : '#f3c29e'} stroke={line ? stroke : 'none'} strokeWidth="2.5" />
      {/* hair */}
      <path
        d="M62 96 a38 38 0 0 1 76 0 v-10 a38 30 0 0 0 -76 0 Z"
        fill={line ? 'none' : '#4a3f88'}
        stroke={line ? stroke : 'none'}
        strokeWidth="2.5"
      />
      <path
        d="M62 92 q0 -32 38 -32 q38 0 38 32 l0 -6 q-3 -28 -38 -28 q-35 0 -38 28 Z"
        fill={line ? 'none' : '#4a3f88'}
        stroke={line ? 'none' : 'none'}
      />
      {/* goggles */}
      <circle cx="84" cy="98" r="12" fill={line ? 'none' : '#ffb45c'} stroke={line ? stroke : '#3d3b66'} strokeWidth="3" />
      <circle cx="116" cy="98" r="12" fill={line ? 'none' : '#ffb45c'} stroke={line ? stroke : '#3d3b66'} strokeWidth="3" />
      <path d="M96 98 h8" stroke={line ? stroke : '#3d3b66'} strokeWidth="3" />
      {/* smile */}
      <path d="M92 118 q8 6 16 0" stroke={line ? stroke : '#b0754a'} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* headphones */}
      <path d="M58 92 a42 42 0 0 1 84 0" fill="none" stroke={line ? stroke : '#3d3b66'} strokeWidth="7" strokeLinecap="round" />
      <rect x="50" y="86" width="14" height="26" rx="7" fill={line ? 'none' : '#e56ba5'} stroke={line ? stroke : 'none'} strokeWidth="2.5" />
      <rect x="136" y="86" width="14" height="26" rx="7" fill={line ? 'none' : '#e56ba5'} stroke={line ? stroke : 'none'} strokeWidth="2.5" />
    </svg>
  );
}

export default function MondayApp() {
  const scope = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!matchMedia(FULL_MOTION_QUERY).matches) return;

      /* their entrance: rise the hero */
      gsap.from('.mn-hero [data-rise]', {
        y: 26,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.09,
        delay: 0.05,
      });

      /* scroll fade-ups everywhere */
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

      /* board rows slide in one by one */
      gsap.from('.mn-board__row', {
        x: -18,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        scrollTrigger: { trigger: '.mn-board', start: 'top 80%' },
      });

      /* their astronaut moment: the line-art figure fills with color */
      gsap.fromTo(
        '.mn-figure--color',
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: '.mn-context__stage',
            start: 'top 85%',
            end: 'center 45%',
            scrub: 0.4,
          },
        },
      );

      /* floating context cards drift gently */
      gsap.utils.toArray<HTMLElement>('.mn-context__card').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -10 : 10,
          duration: 2.6 + i * 0.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
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
          <a className="mn-brand" href="#main" aria-label="Bar for monday.com">
            <Mark />
            <span className="mn-brand__name">
              bar<span className="mn-brand__dot">.for</span><span className="mn-brand__bold">monday</span>
            </span>
          </a>
          <nav className="mn-nav__links" aria-label="Sections">
            <a className="mn-nav__link" href="#board">Board</a>
            <a className="mn-nav__link" href="#work">Work</a>
            <a className="mn-nav__link" href="#revai">RevAI</a>
            <a className="mn-nav__link" href="#facts">CV</a>
          </nav>
          <div className="mn-nav__cta">
            <a className="mn-btn mn-btn--outline mn-btn--sm" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a className="mn-btn mn-btn--primary mn-btn--sm" href={EMAIL}>
              Email me <span className="mn-btn__arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        {/* ── Hero: their split hero, agents-era ─────────────── */}
        <section className="mn-hero">
          <div className="mn-hero__grid">
            <div className="mn-hero__copy">
              <h1 className="mn-title" data-rise>
                You lead.
                <br />
                I build agents.
              </h1>
              <p className="mn-lede" data-rise>
                People and agents driving results together: that is the new
                monday.com. I&rsquo;m Bar Moshe, and building agents that act is
                the work I do. Applying for AI Software Engineer on the RevAI team.
              </p>
              <ul className="mn-tags" data-rise aria-label="What I work with">
                {HERO_TAGS.map((t) => (
                  <li key={t.label} className={`mn-tag${t.active ? ' mn-tag--active' : ''}`}>
                    {t.active && (
                      <svg viewBox="0 0 16 16" className="mn-tag__check" aria-hidden="true" focusable="false">
                        <circle cx="8" cy="8" r="8" fill="#6161ff" />
                        <path d="M4.5 8.2l2.3 2.3 4.7-5" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                    {t.label}
                  </li>
                ))}
              </ul>
              <div className="mn-hero__cta" data-rise>
                <a className="mn-btn mn-btn--primary" href="#work">
                  See the work <span className="mn-btn__arrow" aria-hidden="true">→</span>
                </a>
              </div>
              <p className="mn-hero__meta" data-rise>
                No cover letter needed <span aria-hidden="true">✦</span> every link on this page is live
              </p>
            </div>

            {/* their hero: character cards flanking a person card */}
            <div className="mn-hero__stage" data-rise aria-label="Agent cards around Bar's card" role="img">
              <div className="mn-agentcard mn-agentcard--left">
                <span className="mn-agentcard__label">MIDI Agent</span>
                <CharacterBust skin="#e8b48c" hair="#7a4a2b" shirt="#ffd66b" accent="#5ad4c8" />
              </div>
              <div className="mn-agentcard mn-agentcard--center">
                <span className="mn-agentcard__label">Bar, AI Engineer</span>
                <CharacterBust skin="#f3c29e" hair="#2e2c4f" shirt="#6161ff" accent="#fe81e4" />
                <div className="mn-agentcard__input" aria-hidden="true">
                  <span className="mn-agentcard__prompt">
                    Build me a revenue agent<span className="mn-caret" />
                  </span>
                  <span className="mn-agentcard__send">↑</span>
                </div>
              </div>
              <div className="mn-agentcard mn-agentcard--right">
                <span className="mn-agentcard__label">Deck Compiler</span>
                <CharacterBust skin="#caa17c" hair="#191a2e" shirt="#b98cf5" accent="#ffb45c" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Board: "Posts, campaigns and ads. Done." layout ── */}
        <section id="board" className="mn-section">
          <div className="mn-wrap mn-split">
            <div className="mn-split__copy" data-reveal>
              <h2 className="mn-h2">
                Agents, pipelines, MCP servers. <span className="mn-accent">Shipped.</span>
              </h2>
              <p className="mn-split__p">
                Everything on this board is real: public repos, live demos, and
                an npm package other people&rsquo;s agents install.
              </p>
              <a className="mn-btn mn-btn--primary" href={GITHUB} target="_blank" rel="noopener noreferrer">
                Open GitHub <span className="mn-btn__arrow" aria-hidden="true">→</span>
              </a>
            </div>

            <div className="mn-split__stage" data-reveal>
              <div className="mn-board" role="table" aria-label="Bar's shipped work, as a monday board">
                <div className="mn-board__title">
                  <Mark className="mn-board__mark" />
                  Bar&rsquo;s shipped work
                </div>
                <div className="mn-board__head" role="row">
                  <span role="columnheader">Name</span>
                  <span role="columnheader">Status</span>
                  <span role="columnheader">Link</span>
                </div>
                {BOARD_ROWS.map((r) => (
                  <a
                    key={r.name}
                    className="mn-board__row"
                    role="row"
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="mn-board__name" role="cell">{r.name}</span>
                    <span className={`mn-board__status mn-board__status--${r.statusClass}`} role="cell">
                      {r.status}
                    </span>
                    <span className="mn-board__link" role="cell">{r.link}</span>
                  </a>
                ))}
                <div className="mn-board__ask" aria-hidden="true">
                  <span className="mn-board__plus">+</span>
                  <span className="mn-board__placeholder">Which of these should I open first?</span>
                  <span className="mn-board__model">Claude Code</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Work grid: "An agent for every use case" ───────── */}
        <section id="work" className="mn-section mn-section--soft">
          <div className="mn-wrap">
            <h2 className="mn-display mn-display--center" data-reveal>
              A build for every requirement
            </h2>
            <p className="mn-display__sub" data-reveal>
              The role asks for agents, MCP, RAG, evals and orchestration in
              production. Each one maps to something below you can open.
            </p>
            <ul className="mn-reqs" data-reveal aria-label="What the role asks for">
              {REQUIREMENT_PILLS.map((r, i) => (
                <li key={r} className={`mn-tag${i === 0 ? ' mn-tag--active' : ''}`}>{r}</li>
              ))}
            </ul>

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
          </div>
        </section>

        {/* ── RevAI, in context: their "Work in context" moment ── */}
        <section id="revai" className="mn-section">
          <div className="mn-wrap">
            <div className="mn-context__head">
              <h2 className="mn-display" data-reveal>
                RevAI,
                <br />
                in context
              </h2>
              <div className="mn-context__intro" data-reveal>
                <p>
                  <strong>An application is only as good as its context.</strong>{' '}
                  So I read up. RevAI is monday.com&rsquo;s internal startup
                  rethinking go-to-market with AI agents: voice qualification
                  with latency budgets, guardrails, human hand-offs, and A/B
                  tests against manual outreach. That is exactly the engineering
                  I practice in the open.
                </p>
                <a className="mn-textlink" href={REVAI_ARTICLE} target="_blank" rel="noopener noreferrer">
                  Read the Growth Unhinged deep dive <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <div className="mn-context__stage" data-reveal>
              <div className="mn-context__figure" aria-hidden="true">
                <BuilderFigure variant="line" />
                <BuilderFigure variant="color" />
              </div>
              {REVAI_CARDS.map((c, i) => (
                <div key={c.name} className={`mn-context__card mn-context__card--${i + 1}`}>
                  <span className="mn-context__name">{c.name}</span>
                  <span className="mn-context__role">{c.role}</span>
                  <span className="mn-context__stat">{c.stat}</span>
                </div>
              ))}
            </div>
            <p className="mn-context__caption" data-reveal>
              Amanda, Jax and Oscar are the RevAI team&rsquo;s agents in
              production. I want to build the next one.
            </p>
          </div>
        </section>

        {/* ── Full disclosure: their "Full control" grid, as a CV ── */}
        <section id="facts" className="mn-section mn-section--soft">
          <div className="mn-wrap">
            <h2 className="mn-display" data-reveal>
              Full
              <br />
              disclosure
            </h2>
            <div className="mn-facts">
              {FACTS.map((f) => (
                <div key={f.h} className="mn-fact" data-reveal>
                  <FactIcon name={f.icon} />
                  <h3 className="mn-fact__h">{f.h}</h3>
                  <p className="mn-fact__p">
                    {f.p}
                    {f.icon === 'doc' && (
                      <>
                        {' '}
                        <a className="mn-textlink" href={CV} target="_blank" rel="noopener noreferrer">
                          Download the CV <span aria-hidden="true">→</span>
                        </a>
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Close: their giant centered "Let work flow" ────── */}
        <section className="mn-close">
          <div className="mn-close__inner" data-reveal>
            <p className="mn-close__eyebrow">AI Software Engineer, RevAI</p>
            <h2 className="mn-close__title">Let&rsquo;s get to work.</h2>
            <p className="mn-close__sub">
              1barmoshe1@gmail.com · Tel Aviv, hybrid-ready
            </p>
            <div className="mn-close__cta">
              <a className="mn-btn mn-btn--primary" href={EMAIL}>
                Email me <span className="mn-btn__arrow" aria-hidden="true">→</span>
              </a>
              <a className="mn-btn mn-btn--outline" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                WhatsApp <span className="mn-btn__arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer: their white multi-column footer, small ──── */}
      <footer className="mn-footer">
        <div className="mn-footer__inner">
          <div className="mn-footer__brand">
            <Mark />
            <span className="mn-brand__name">
              bar<span className="mn-brand__dot">.for</span><span className="mn-brand__bold">monday</span>
            </span>
          </div>
          <div className="mn-footer__cols">
            <div className="mn-footer__col">
              <h3 className="mn-footer__h">Contact</h3>
              <a href={EMAIL}>Email</a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
            <div className="mn-footer__col">
              <h3 className="mn-footer__h">Proof</h3>
              <a href="https://barmoshe.github.io/mdp/" target="_blank" rel="noopener noreferrer">MDP</a>
              <a href="https://github.com/Base67-AI/temporal-plugin" target="_blank" rel="noopener noreferrer">temporal-plugin</a>
              <a href="https://temporal.io/code-exchange/cross-language-data-processing-service-with-temporal" target="_blank" rel="noopener noreferrer">Code Exchange</a>
              <a href="https://biome-synth.lovable.app/" target="_blank" rel="noopener noreferrer">Biome Synth</a>
            </div>
            <div className="mn-footer__col">
              <h3 className="mn-footer__h">Application</h3>
              <a href={CV} target="_blank" rel="noopener noreferrer">CV, one page PDF</a>
              <a href={REVAI_ARTICLE} target="_blank" rel="noopener noreferrer">About RevAI</a>
            </div>
          </div>
        </div>
        <div className="mn-footer__legal">
          <span>
            An application page Bar Moshe built for the AI Software Engineer,
            RevAI role. Not affiliated with monday.com.
          </span>
          <span>Tel Aviv · 2026</span>
        </div>
      </footer>
    </div>
  );
}
