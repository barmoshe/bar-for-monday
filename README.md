# bar-for-monday

An ad-hoc, personalized job-application page Bar Moshe built for the **AI Software
Engineer, RevAI** role at **monday.com** (Tel Aviv, hybrid), in monday.com's real
visual language, read live off monday.com: white surface, Poppins with giant
weight-400 headlines, gradient keyword phrases clipped into the type (pink
#FE81E4 → orange #FDA900, plus cooler variants), indigo #6161FF pill CTAs with
trailing arrows, a dot-grid workflow canvas with AI-agent node cards and marching
dashed connectors, thin-border work cards, and a near-black foundation close.

The centerpiece reframes monday's signature workflow-canvas graphic as the kind
of RevAI system Bar would build: a lead-qualification pipeline where agents do
the steps, humans approve the sends, and CRM + Slack stay in sync.

Copy is deliberately terse CV register: what shipped, where it runs, one line
each. Live links (MDP + MCP server, temporal-plugin, Temporal Code Exchange
pipeline, MIDI Agent, entailer, Biome Synth); employer work is named, not linked.

Not affiliated with monday.com. `robots: noindex` — a private, shareable link.
Standalone sibling repo matching the `bar-for-*` application-site pattern.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Plain CSS (scoped under `.mn-root`) + GSAP (ScrollTrigger, reveals only)
- `next/og` share card (`app/opengraph-image.tsx`)
- Motion is CSS + SVG, gated on `prefers-reduced-motion`; legible with no JS

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # eslint (jsx-a11y gate)
```
