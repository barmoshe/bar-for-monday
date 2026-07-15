import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import PaymentsApp from "@/src/marketing/monday-payments/PaymentsApp";

// monday.com sets everything in Poppins (read live off monday.com/pricing,
// 2026-07-15: "Poppins, Arial, sans-serif" on body, weight-400 near-black
// display at ~-0.03em tracking). Four weights, exposed as --font-mn.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-mn",
  display: "swap",
});

// Ad-hoc, personalized application page for Bar Moshe's "Software Engineer,
// Payments Foundations Group" application to monday.com (Tel Aviv, on-site) —
// a SECOND, distinct monday.com role. Built 2026-07-15 against monday.com's
// live PRICING page (their real money / billing / AI-credits surface, which
// is the exact domain this role owns): white Poppins display type, indigo
// #6161FF pill CTAs, the cyan->purple gradient keyword, the navy "Most
// Popular" banner, a seat selector, a Monthly/Yearly toggle, plan cards, and
// "AI credits" chips. Centerpiece: a working billing engine whose controls
// drive an event-driven pipeline (proration -> invoice -> credit rebucket ->
// ledger -> downstream). Noindex; the RevAI role page lives at /revai.
const ogTitle =
  "Bar Moshe × monday.com — Software Engineer, Payments Foundations Group";
const ogDescription =
  "Bar Moshe's application for Software Engineer, Payments Foundations Group at monday.com. A working billing model (proration, invoicing, AI-credit rebucket, event-driven propagation), plus Temporal, retries and evals work. Every project link is live.";

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

export default function PaymentsPage() {
  return (
    <div className={poppins.variable}>
      <PaymentsApp />
    </div>
  );
}
