import type { Metadata } from "next";
import { InfoPage } from "@/app/components/InfoPage";

export const metadata: Metadata = {
  title: "Privacy — RoamCompare",
  description: "How the private RoamCompare working build handles information.",
  alternates: { canonical: "/privacy" },
  openGraph: { title: "RoamCompare privacy", description: "Privacy information for RoamCompare.", images: [] },
  twitter: { title: "RoamCompare privacy", description: "Privacy information for RoamCompare.", images: [] },
};

export default function PrivacyPage() {
  return <InfoPage eyebrow="Privacy" title="We don’t ask who you are" updated="25 Aug 2026" intro="RoamCompare works out your comparison in your browser. There is no account, and we do not build a profile of you.">
    <section><h2>What you type in</h2><p>The sums run in your browser. If you open, share or save a comparison link, the trip settings in that link travel with it and may show up in ordinary server logs — the same as any web address. We do not turn them into an account or a profile. Your phone model and any cost you enter yourself are deliberately left out of shared links.</p></section>
    <section><h2>Cookies and analytics</h2><p>We use Google Analytics to count visits and see which pages are used, set so it cannot use cookies or tell a returning visitor from a new one — it only ever reports anonymous totals, not a visit history tied to you. As with any website you visit, Google&rsquo;s servers see the request itself, including your IP address; that is ordinary networking, not something RoamCompare chooses to hand over. We load no advertising or tag-manager scripts. If we add fuller analytics later, we will ask first. Nothing is stored in your browser until you use &ldquo;Save on this device&rdquo;. The hosting service may process ordinary technical request data needed to deliver and secure the site.</p></section>
    <section><h2>When you click through to a provider</h2><p>When you follow a provider link, that provider receives your visit and applies its own privacy and cookie policies. Some of those links are affiliate links and carry tracking information used to attribute a purchase; they are marked <code>rel=&ldquo;sponsored&rdquo;</code> in the page source, and the About page lists which providers we have a relationship with.</p></section>
    <section><h2>Saved comparisons</h2><p>“Save on this device” keeps up to five comparison links in this browser only. Nothing is sent to us to store. Remove them individually from the saved panel, or clear this site’s data in your browser.</p></section>
    <section><h2>Your choices</h2><p>Use the comparison without signing up for anything. Do not put anything sensitive into a comparison link you intend to share, and read each provider’s own privacy notice before you buy from them.</p></section>
  </InfoPage>;
}
