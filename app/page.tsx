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
// RevAI" application to monday.com (Tel Aviv, hybrid). Built in monday.com's
// own visual language, read live off monday.com: white surface, Poppins,
// gradient keyword phrases clipped into giant light headlines, indigo #6161FF
// pill CTAs with arrows, pastel suite cards, a dot-grid workflow canvas with
// AI-agent nodes as the centerpiece, a rainbow-bordered AI chat input, and a
// near-black foundation close. Noindex, a shareable link for the RevAI team.
const ogTitle = "Bar Moshe × monday.com — AI Software Engineer, RevAI";
const ogDescription =
  "Bar Moshe, AI builder and full-stack engineer in Israel. MCP servers on npm, durable agent pipelines on Temporal (Code Exchange featured), LLM apps with retries and evals, and the DevOps around them.";

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

export default function MondayPage() {
  return (
    <div className={poppins.variable}>
      <MondayApp />
    </div>
  );
}
