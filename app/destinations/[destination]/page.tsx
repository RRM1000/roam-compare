import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CompareExperience, { type InitialComparison } from "@/app/components/CompareExperience";
import { destinationById, destinations, isDestination } from "@/lib/destinations";
import { fetchSailyPlans } from "@/lib/saily-live";
import { getSiteOrigin } from "@/lib/site-url";

type DestinationPageProps = { params: Promise<{ destination: string }> };

/**
 * Every destination gets a permanent page. The roaming calculation covers all
 * of them for all ten UK networks, and the live eSIM feed prices all of them,
 * so gating on the manual snapshot list would 404 pages that have real content.
 * Keeping the set fixed also stops URLs appearing and disappearing with feed
 * availability, which search engines treat far worse than a thin page.
 */
export function generateStaticParams() {
  return destinations.map((destination) => ({ destination: destination.id }));
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const requested = (await params).destination;
  if (!isDestination(requested)) return {};
  const destination = destinationById[requested];
  const canonical = `${await getSiteOrigin()}/destinations/${destination.id}`;
  const title = `${destination.name} eSIM and UK roaming comparison — RoamCompare`;
  const description = `Compare dated ${destination.name} eSIM prices, hotspot rules, speed caps and fair-use limits for a trip from the UK.`;
  return { title, description, alternates: { canonical }, openGraph: { title, description, type: "website", url: canonical, images: [] }, twitter: { card: "summary", title, description, images: [] } };
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const requested = (await params).destination;
  if (!isDestination(requested)) notFound();
  const initial: InitialComparison = {
    destination: requested,
    days: 7,
    roamingDays: 7,
    network: "",
    scenario: "",
    usage: "everyday",
    callsNeed: "no",
    roamingAllowance: "",
    sortMode: "price",
    unlimitedOnly: false,
    fiveGOnly: false,
    tetheringOnly: false,
    compared: false,
  };
  const [livePlans, origin] = [await fetchSailyPlans(), await getSiteOrigin()];
  const destination = destinationById[requested];
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "RoamCompare", item: origin },
      { "@type": "ListItem", position: 2, name: `${destination.name} eSIM and roaming`, item: `${origin}/destinations/${destination.id}` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <CompareExperience initial={initial} livePlans={livePlans ?? undefined} destinationLanding />
    </>
  );
}
