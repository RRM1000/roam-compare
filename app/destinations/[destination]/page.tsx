import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import CompareExperience, { type InitialComparison } from "@/app/components/CompareExperience";
import { hasPricedPlans, pricedDestinationIds } from "@/lib/catalog";
import { destinationById, isDestination } from "@/lib/destinations";

type DestinationPageProps = { params: Promise<{ destination: string }> };

export function generateStaticParams() {
  return pricedDestinationIds.map((destination) => ({ destination }));
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const requested = (await params).destination;
  if (!isDestination(requested) || !hasPricedPlans(requested)) return {};
  const destination = destinationById[requested];
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const canonical = `${protocol}://${host}/destinations/${destination.id}`;
  const title = `${destination.name} eSIM and UK roaming comparison — RoamCompare`;
  const description = `Compare dated ${destination.name} eSIM prices, hotspot rules, speed caps and fair-use limits for a trip from the UK.`;
  return { title, description, alternates: { canonical }, openGraph: { title, description, type: "website", url: canonical, images: [] }, twitter: { card: "summary", title, description, images: [] } };
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const requested = (await params).destination;
  if (!isDestination(requested) || !hasPricedPlans(requested)) notFound();
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
  return <CompareExperience initial={initial} destinationLanding />;
}
