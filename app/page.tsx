import type { Metadata } from "next";
import CompareExperience, { type CallsNeed, type InitialComparison, type SortMode } from "@/app/components/CompareExperience";
import { tripLengths, type Usage } from "@/lib/catalog";
import { destinationById, isDestination, type DestinationId } from "@/lib/destinations";
import { getScenarioOptions, isNetwork, type Network } from "@/lib/roaming";
import { fetchSailyPlans } from "@/lib/saily-live";
import { getFaqJsonLd } from "@/lib/faq";
import { getSiteOrigin } from "@/lib/site-url";

type SearchParams = Record<string, string | string[] | undefined>;
type PageProps = { searchParams?: Promise<SearchParams> };

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function resolveComparison(params: SearchParams): InitialComparison {
  const requestedDestination = first(params.destination) ?? "turkey";
  const destination: DestinationId = isDestination(requestedDestination) ? requestedDestination : "turkey";
  const requestedDays = Number(first(params.days));
  const days = tripLengths.includes(requestedDays) ? requestedDays : 7;
  const requestedRoamingDays = Number(first(params.roamingDays));
  const roamingDays = Number.isInteger(requestedRoamingDays) && requestedRoamingDays >= 0 && requestedRoamingDays <= days ? requestedRoamingDays : days;
  const requestedNetwork = first(params.network) ?? "";
  const network: Network | "" = isNetwork(requestedNetwork) ? requestedNetwork : "";
  const requestedUsage = first(params.usage) ?? "";
  const usage: Usage = requestedUsage === "light" || requestedUsage === "heavy" ? requestedUsage : "everyday";
  const requestedScenario = first(params.scenario) ?? "";
  const scenario = network
    ? getScenarioOptions(network, destination).some((option) => option.value === requestedScenario)
      ? requestedScenario
      : ""
    : "";
  const requestedCalls = first(params.calls) ?? "";
  const callsNeed: CallsNeed = requestedCalls === "yes" || requestedCalls === "unsure" ? requestedCalls : "no";
  const requestedAllowance = first(params.allowance) ?? "";
  const parsedAllowance = Number(requestedAllowance);
  const roamingAllowance = requestedAllowance !== "" && Number.isFinite(parsedAllowance) && parsedAllowance >= 0 ? String(parsedAllowance) : "";
  const requestedSort = first(params.sort) ?? "";
  const sortMode: SortMode = requestedSort === "data" || requestedSort === "validity" ? requestedSort : "price";
  const unlimitedOnly = first(params.unlimited) === "1";
  const fiveGOnly = first(params.fiveG) === "1";
  const tetheringOnly = first(params.tethering) === "1";

  return { destination, days, roamingDays, network, scenario, usage, callsNeed, roamingAllowance, scenarioDropped: requestedScenario !== "" && scenario === "", sortMode, unlimitedOnly, fiveGOnly, tetheringOnly, compared: first(params.compare) === "1" };
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const initial = resolveComparison((await searchParams) ?? {});
  if (!initial.compared) return {};
  const destination = destinationById[initial.destination];
  const title = `${initial.days} ${initial.days === 1 ? "day" : "days"} in ${destination.name} — RoamCompare`;
  const description = `Compare ${destination.name} roaming for a UK mobile with travel eSIM options sized for a ${initial.days}-day trip.`;
  const origin = await getSiteOrigin();
  const socialImage = `${origin}/og-premium.jpg`;
  return {
    title,
    description,
    openGraph: { title, description, type: "website", images: [{ url: socialImage, width: 1536, height: 1024, alt: "RoamCompare — know the roaming cost before take-off" }] },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
    alternates: { canonical: `${origin}/` },
  };
}

export default async function HomePage({ searchParams }: PageProps) {
  const sailyPlans = fetchSailyPlans();
  const initial = resolveComparison((await searchParams) ?? {});
  const [livePlans, origin] = [await sailyPlans, await getSiteOrigin()];
  // Built from lib/faq.ts, the same source the visible accordion renders from.
  const structuredData = [
    getFaqJsonLd(),
    { "@context": "https://schema.org", "@type": "Organization", name: "RoamCompare", url: origin, description: "Compares UK mobile roaming charges with travel eSIMs." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <CompareExperience initial={initial} livePlans={livePlans ?? undefined} />
    </>
  );
}
