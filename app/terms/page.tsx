import type { Metadata } from "next";
import { InfoPage } from "@/app/components/InfoPage";

export const metadata: Metadata = {
  title: "Terms — RoamCompare",
  description: "Terms for using the private RoamCompare working build.",
  openGraph: { title: "RoamCompare terms", description: "Terms for using RoamCompare.", images: [] },
  twitter: { title: "RoamCompare terms", description: "Terms for using RoamCompare.", images: [] },
};

export default function TermsPage() {
  return <InfoPage eyebrow="Terms of use" title="Compare, then verify." intro="These terms cover the current private working build of RoamCompare. By using it, you agree to treat results as decision support rather than a guaranteed quote.">
    <section><h2>Indicative information</h2><p>Calculations use dated prices, rounded exchange rates, selected usage assumptions and the trip details you enter. They can be wrong or become outdated. Always confirm the final price, data allowance, phone-number availability, calls and texts, validity, taxes, fair-use limits, activation rules and refund terms with the provider.</p></section>
    <section><h2>Compatibility and coverage</h2><p>The compatibility tool checks your selected model against dated manufacturer information; it does not inspect your phone or guarantee that a particular regional variant will work. Model numbers, country of origin, network locks, provider acceptance and local coverage can differ. Confirm “Add eSIM” is available in Settings and verify the exact device with the manufacturer before purchase.</p></section>
    <section><h2>Third-party services</h2><p>Purchases are made with third parties under their terms. RoamCompare is not responsible for their availability, checkout, support, connectivity, refunds or changes to an offer.</p></section>
    <section><h2>Affiliate relationships</h2><p>RoamCompare may receive commission from marked links. This does not increase the displayed price or alter calculated ordering. An affiliate relationship is not a guarantee or endorsement.</p></section>
    <section><h2>Responsible use</h2><p>Do not attempt to disrupt the service, misuse share links, or rely on the site for emergency communications. Keep a backup way to connect while travelling.</p></section>
  </InfoPage>;
}
