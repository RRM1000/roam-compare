import type { Metadata } from "next";
import { InfoPage } from "@/app/components/InfoPage";

export const metadata: Metadata = {
  title: "Privacy — RoamCompare",
  description: "How the private RoamCompare working build handles information.",
  openGraph: { title: "RoamCompare privacy", description: "Privacy information for RoamCompare.", images: [] },
  twitter: { title: "RoamCompare privacy", description: "Privacy information for RoamCompare.", images: [] },
};

export default function PrivacyPage() {
  return <InfoPage eyebrow="Privacy" title="No account. No comparison profile." intro="The current private working build is designed to perform its comparison in your browser without asking for personal details.">
    <section><h2>Information you enter</h2><p>Trip length, network, usage and compatibility answers are used on your device to calculate results. They are not submitted to a RoamCompare account or database. A share link includes only the comparison settings visible in its URL; compatibility answers and custom costs are excluded.</p></section>
    <section><h2>Cookies and analytics</h2><p>RoamCompare currently does not set advertising or analytics cookies. The hosting service may process ordinary technical request data needed to deliver and secure the site.</p></section>
    <section><h2>Outbound links</h2><p>When you follow a provider link, that provider receives your visit and applies its own privacy and cookie policies. Marked affiliate links can contain tracking information used to attribute a purchase.</p></section>
    <section><h2>Data retention</h2><p>RoamCompare does not currently retain comparison inputs. If analytics, accounts, alerts or saved comparisons are added later, this notice will be updated before those features are enabled.</p></section>
    <section><h2>Your choices</h2><p>You can use the comparison without creating an account. Do not include sensitive information in a comparison URL, and review each provider’s privacy notice before leaving this site.</p></section>
  </InfoPage>;
}
