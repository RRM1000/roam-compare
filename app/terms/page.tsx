import type { Metadata } from "next";
import { InfoPage } from "@/app/components/InfoPage";

export const metadata: Metadata = {
  title: "Terms — RoamCompare",
  description: "Terms for using the private RoamCompare working build.",
  alternates: { canonical: "/terms" },
  openGraph: { title: "RoamCompare terms", description: "Terms for using RoamCompare.", images: [] },
  twitter: { title: "RoamCompare terms", description: "Terms for using RoamCompare.", images: [] },
};

export default function TermsPage() {
  return <InfoPage eyebrow="Terms of use" title="Check before you buy" updated="25 Aug 2026" intro="These terms cover the current working build of RoamCompare. Our results are here to help you decide — they are not a quote, and they are not a guarantee.">
    <section><h2>Our numbers are estimates</h2><p>Calculations use prices from a particular date, rounded exchange rates, assumptions about how much data you will use, and the trip details you enter. They can be wrong or go out of date. Always confirm the final price, data allowance, phone-number availability, calls and texts, how long the plan lasts, taxes, fair-use limits, activation rules and refund terms with the provider.</p></section>
    <section><h2>Phone compatibility and coverage</h2><p>The compatibility checker matches the model you pick against manufacturer information we recorded on a given date. It cannot see your actual phone, and it cannot promise a particular regional version will work. Model numbers, country of origin, network locks, provider acceptance and local coverage can differ. Confirm “Add eSIM” is available in Settings and verify the exact device with the manufacturer before purchase.</p></section>
    <section><h2>Buying from a provider</h2><p>Purchases are made with third parties under their terms. RoamCompare is not responsible for their availability, checkout, support, connectivity, refunds or changes to an offer.</p></section>
    <section><h2>Affiliate relationships</h2><p>RoamCompare may receive commission from some provider links; the About page lists which providers. It never increases the price you pay, and commission never changes the order. An affiliate relationship is not a guarantee or endorsement.</p></section>
    <section><h2>Sensible use</h2><p>Do not try to disrupt the site or misuse share links, and never rely on it for emergency communication. Always travel with a backup way to get online.</p></section>
  </InfoPage>;
}
