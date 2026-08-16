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
  return <InfoPage eyebrow="Privacy" title="No account. No comparison profile." intro="The current private working build is designed to perform its comparison in your browser without asking for personal details.">
    <section><h2>Information you enter</h2><p>Ordinary calculations run in your browser. When you open, share or save a comparison URL, the trip settings visible in that URL are sent to the hosting service as part of the page request and may appear in ordinary technical logs. RoamCompare does not create an account or database profile from them. Compatibility answers and custom costs are excluded from comparison URLs.</p></section>
    <section><h2>Cookies and analytics</h2><p>RoamCompare currently does not set advertising or analytics cookies. The hosting service may process ordinary technical request data needed to deliver and secure the site.</p></section>
    <section><h2>Outbound links</h2><p>When you follow a provider link, that provider receives your visit and applies its own privacy and cookie policies. Marked affiliate links can contain tracking information used to attribute a purchase.</p></section>
    <section><h2>Saved comparisons</h2><p>If you choose “Save on this device”, up to five comparison links and their save dates are stored in this browser’s local storage. Opening one sends its visible URL settings to the hosting service like any other page request, but they are not stored in a RoamCompare account or comparison database. You can remove each one from the saved-comparisons panel or clear this site’s browser data.</p></section>
    <section><h2>Your choices</h2><p>You can use the comparison without creating an account. Do not include sensitive information in a comparison URL, and review each provider’s privacy notice before leaving this site.</p></section>
  </InfoPage>;
}
