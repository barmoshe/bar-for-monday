import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import MondayApp from "@/src/marketing/monday/MondayApp";

// monday.com sets everything in Poppins (read live off monday.com, 2026-07-03:
// "Poppins, Roboto, Helvetica, Arial, sans-serif" on body, 64px weight-400
// hero headlines at -1.28px tracking). Four weights, exposed as --font-mn.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-mn",
  display: "swap",
});

// Ad-hoc, personalized application page for Bar Moshe's "AI Software Engineer,
// RevAI" application to monday.com (Tel Aviv, hybrid). Rebuilt 2026-07-11 in
// monday.com's NEW agents-era visual language ("You lead. Agents act."), read
// live off monday.com in Chrome: near-black Poppins display type, indigo
// #6161FF accent end-words, lilac tag pills, agent character cards, a dark
// board mockup with classic monday status pills, a line-art figure that fills
// with color on scroll, floating RevAI context cards (Amanda / Jax / Oscar),
// and a giant centered close. Noindex, a shareable link for the RevAI team.
// Moved from "/" to "/revai" on 2026-07-15 when the root became the Payments
// Foundations Group application (a second, distinct monday.com role).
const ogTitle = "Bar Moshe × monday.com — AI Software Engineer, RevAI";
const ogDescription =
  "You lead. I build agents. Bar Moshe for monday.com's RevAI team: MCP servers on npm, durable agent pipelines on Temporal (Code Exchange featured), LLM apps with retries and evals. Every link is live.";

export const metadata: Metadata = {
  title: ogTitle,
  description: ogDescription,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Bar Moshe",
    title: ogTitle,
    description: ogDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@barmoshe1",
    creator: "@barmoshe1",
    title: ogTitle,
    description: ogDescription,
  },
};

export default function RevaiPage() {
  return (
    <div className={poppins.variable}>
      <MondayApp />
    </div>
  );
}
