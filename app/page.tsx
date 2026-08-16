import type { Metadata } from "next";
import { headers } from "next/headers";
import CompareExperience, { type CallsNeed, type InitialComparison, type SortMode } from "@/app/components/CompareExperience";
import { tripLengths, type Usage } from "@/lib/catalog";
import { destinationById, isDestination, type DestinationId } from "@/lib/destinations";
import { getDefaultScenario, getScenarioOptions, isNetwork, type Network } from "@/lib/roaming";

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
      : getDefaultScenario(network, destination)
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

  return { destination, days, roamingDays, network, scenario, usage, callsNeed, roamingAllowance, sortMode, unlimitedOnly, fiveGOnly, tetheringOnly, compared: first(params.compare) === "1" && network !== "" };
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const initial = resolveComparison((await searchParams) ?? {});
  if (!initial.compared) return {};
  const destination = destinationById[initial.destination];
  const title = `${initial.days} ${initial.days === 1 ? "day" : "days"} in ${destination.name} — RoamCompare`;
  const description = `Compare ${destination.name} roaming for a UK mobile with travel eSIM options sized for a ${initial.days}-day trip.`;
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const socialImage = `${protocol}://${host}/og-premium.png`;
  return {
    title,
    description,
    openGraph: { title, description, type: "website", images: [{ url: socialImage, width: 1536, height: 1024, alt: "RoamCompare — know the roaming cost before take-off" }] },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
    alternates: { canonical: `${protocol}://${host}/` },
  };
}

export default async function HomePage({ searchParams }: PageProps) {
  const initial = resolveComparison((await searchParams) ?? {});
  return <CompareExperience initial={initial} />;
}
