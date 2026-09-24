import type { Metadata } from "next";
import { InfoPage } from "@/app/components/InfoPage";

export const metadata: Metadata = {
  title: "Terms — RoamCompare",
  description: "The terms that cover RoamCompare: every price here is an estimate rather than a quote, and what you buy is covered by the provider’s own terms.",
  alternates: { canonical: "/terms" },
  openGraph: { title: "RoamCompare terms", description: "Terms for using RoamCompare.", images: [] },
  twitter: { title: "RoamCompare terms", description: "Terms for using RoamCompare.", images: [] },
};

export default function TermsPage() {
  return <InfoPage eyebrow="Terms of use" title="Check before you buy" updated="24 Sept 2026" intro="These terms cover your use of RoamCompare. Our results are here to help you decide — they are not a quote, and they are not a guarantee.">
    <section><h2>Our numbers are estimates</h2><p>Calculations use prices from a particular date, rounded exchange rates, assumptions about how much data you will use, and the trip details you enter. They can be wrong or go out of date. Always confirm the final price, data allowance, phone-number availability, calls and texts, how long the plan lasts, taxes, fair-use limits, activation rules and refund terms with the provider.</p><p>The same goes for roaming. What your network actually bills you is set by your contract and your network&rsquo;s own price list, not by our estimate, and we are not responsible for roaming charges you run up. If you are unsure whether roaming costs extra on your plan, assume it does and check with your network before you travel.</p></section>
    <section><h2>Phone compatibility and coverage</h2><p>The compatibility checker matches the model you pick against manufacturer information we recorded on a given date. It cannot see your actual phone, and it cannot promise a particular regional version will work. Model numbers, country of origin, network locks, provider acceptance and local coverage can differ. Confirm “Add eSIM” is available in Settings and verify the exact device with the manufacturer before purchase.</p></section>
    <section><h2>Buying from a provider</h2><p>Purchases are made with third parties under their terms. RoamCompare is not responsible for their availability, checkout, support, connectivity, refunds or changes to an offer.</p></section>
    <section><h2>Affiliate relationships</h2><p>RoamCompare may receive commission from some provider links; the About page lists which providers. It never increases the price you pay, and commission never changes the order. An affiliate relationship is not a guarantee or endorsement.</p></section>
    <section><h2>The site itself</h2><p>RoamCompare is provided free and as it is. We work to keep it accurate and available, but we do not promise it will always be online, error-free or up to date, and we may change or withdraw any part of it at any time.</p></section>
    <section><h2>What we are responsible for</h2><p>If something on this site is wrong and you lose money buying from a provider or roaming on your network, that loss falls under the provider&rsquo;s or network&rsquo;s terms, not ours — we publish estimates and links, we do not sell you anything. To the extent the law allows, we accept no liability for losses from relying on the site. Nothing in these terms excludes or limits liability that cannot lawfully be excluded or limited, including for death or personal injury caused by negligence, or for fraud.</p></section>
    <section><h2>Changes and law</h2><p>We may update these terms; the date above tells you when we last did. Using the site after a change means the current version applies. These terms are governed by the law of England and Wales, and the courts of England and Wales have jurisdiction.</p></section>
    <section><h2>Sensible use</h2><p>Do not try to disrupt the site or misuse share links, and never rely on it for emergency communication. Always travel with a backup way to get online.</p></section>
  </InfoPage>;
}
