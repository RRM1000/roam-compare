import type { Metadata } from "next";
import { InfoPage } from "@/app/components/InfoPage";

export const metadata: Metadata = {
  title: "About and affiliate disclosure — RoamCompare",
  description: "How RoamCompare compares UK roaming and travel eSIM options, including its affiliate disclosure.",
  openGraph: { title: "About RoamCompare", description: "Independent UK roaming and travel eSIM comparisons.", images: [] },
  twitter: { title: "About RoamCompare", description: "Independent UK roaming and travel eSIM comparisons.", images: [] },
};

export default function AboutPage() {
  return <InfoPage eyebrow="About the comparison" title="Useful maths, visible assumptions." intro="RoamCompare is being built to help UK travellers compare the cost of keeping their home SIM active abroad with buying a travel eSIM.">
    <section><h2>What we do</h2><p>We size data against trip length and usage, calculate a comparable trip total, and show more than one suitable plan where useful. We link back to the network or provider so you can verify the live offer.</p></section>
    <section><h2>What we do not do</h2><p>RoamCompare is not a mobile network, eSIM provider or reseller. We do not issue SIMs, take payment, inspect your phone, or guarantee coverage. Prices and eligibility can change between our check and checkout.</p></section>
    <section><h2>Affiliate disclosure</h2><p>Some outbound links are affiliate links. If you buy after following a marked link, RoamCompare may earn a commission at no extra cost to you. Klook is currently marked as an affiliate partner. Commission does not change the calculated ordering or make a plan eligible.</p></section>
    <section><h2>How data is handled</h2><p>Until approved APIs are connected, eSIM catalogue prices are manually checked snapshots and roaming rules come from linked network guidance. We do not scrape blocked sites or invent missing live prices. Klook therefore shows “check price”.</p></section>
    <section><h2>Before public launch</h2><p>The current site is a private working build. A public contact route, formal review schedule and provider API monitoring will be added before the service is opened more widely.</p></section>
  </InfoPage>;
}
