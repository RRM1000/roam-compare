import type { Metadata } from "next";
import { InfoPage } from "@/app/components/InfoPage";

export const metadata: Metadata = {
  title: "About and affiliate disclosure — RoamCompare",
  description: "How RoamCompare compares UK roaming and travel eSIM options, including its affiliate disclosure.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About RoamCompare", description: "Independent UK roaming and travel eSIM comparisons.", images: [] },
  twitter: { title: "About RoamCompare", description: "Independent UK roaming and travel eSIM comparisons.", images: [] },
};

export default function AboutPage() {
  return <InfoPage eyebrow="About the comparison" title="What RoamCompare does" intro="RoamCompare helps UK travellers work out whether it is cheaper to use their own network abroad or buy a travel eSIM — and what each option actually gives them.">
    <section><h2>What we do</h2><p>You tell us where you are going, for how long, how heavily you use your phone and which UK network you are on. We estimate how much data you will need, work out what your own network would charge, and compare that against travel eSIMs big enough for the trip. Hotspot rules, speed caps, fair-use limits and activation rules sit beside every plan, and every price links back to the provider so you can check it yourself.</p></section>
    <section><h2>What we do not do</h2><p>We are not a mobile network or an eSIM seller. We do not issue SIMs, take payment, look at your phone or promise you will get a signal. Prices and eligibility can change between our check and your checkout.</p></section>
    <section><h2>Affiliate disclosure</h2><p>Some outbound links are affiliate links. If you buy after following one, RoamCompare may earn a commission at no extra cost to you. We currently have affiliate relationships with Klook and Saily. Tracking applies only when approved partner identifiers are configured. Airalo and Nomad are listed with no affiliate relationship at all. On the five destinations where we hold hand-checked prices from every provider, they usually come out cheapest and we say so. Everywhere else Saily&rsquo;s live feed is currently our only priced source, so Saily wins there by default rather than on merit — we would rather tell you that than let it look like a verdict. Saily links are the tracking URLs returned by Saily&rsquo;s own partners API. Commission never changes the order, and never makes a plan eligible that would not otherwise be.</p></section>
    <section><h2>Where our numbers come from</h2><p>Saily prices come from Saily&rsquo;s own partner feed in pounds, refreshed at least every three hours. If that feed is unreachable we fall back to our dated hand-checked Saily prices and label them with the date we checked. Airalo and Nomad prices are checked by hand and dated on screen; if one has not been rechecked within seven days we stop ranking it rather than quietly show you a stale number. Roaming costs are worked out from each network’s published charges, and the date we checked them is shown in the methodology — always confirm in your own network’s checker before you travel. Phone compatibility comes from manufacturer information recorded on 16 Aug 2026, and links to its source rather than guessing about regional versions. We never scrape sites that ask us not to, and we never invent a price we cannot verify — which is why Klook shows “check price” instead of a number.</p></section>
    <section><h2>This is a working build</h2><p>RoamCompare is not open to the public yet. A contact address, a fixed schedule for rechecking prices, and monitoring for the provider feeds will all be in place before it is.</p></section>
  </InfoPage>;
}
