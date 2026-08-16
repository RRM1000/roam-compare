import type { Provider } from "./catalog";

export type DestinationId = "turkey" | "united-states" | "spain" | "france" | "italy" | "greece" | "portugal" | "germany" | "netherlands" | "ireland" | "cyprus" | "united-arab-emirates" | "thailand" | "japan" | "australia" | "canada" | "mexico" | "morocco" | "egypt" | "indonesia";

export type Destination = { id: DestinationId; name: string; flag: string; region: string; airaloSlug: string; sailySlug: string };

export const destinations: Destination[] = [
  { id: "turkey", name: "Turkey", flag: "🇹🇷", region: "Europe & Asia", airaloSlug: "turkey", sailySlug: "turkey" },
  { id: "united-states", name: "United States", flag: "🇺🇸", region: "North America", airaloSlug: "united-states", sailySlug: "united-states" },
  { id: "spain", name: "Spain", flag: "🇪🇸", region: "Europe", airaloSlug: "spain", sailySlug: "spain" },
  { id: "france", name: "France", flag: "🇫🇷", region: "Europe", airaloSlug: "france", sailySlug: "france" },
  { id: "italy", name: "Italy", flag: "🇮🇹", region: "Europe", airaloSlug: "italy", sailySlug: "italy" },
  { id: "greece", name: "Greece", flag: "🇬🇷", region: "Europe", airaloSlug: "greece", sailySlug: "greece" },
  { id: "portugal", name: "Portugal", flag: "🇵🇹", region: "Europe", airaloSlug: "portugal", sailySlug: "portugal" },
  { id: "germany", name: "Germany", flag: "🇩🇪", region: "Europe", airaloSlug: "germany", sailySlug: "germany" },
  { id: "netherlands", name: "Netherlands", flag: "🇳🇱", region: "Europe", airaloSlug: "netherlands", sailySlug: "netherlands" },
  { id: "ireland", name: "Ireland", flag: "🇮🇪", region: "Europe", airaloSlug: "ireland", sailySlug: "ireland" },
  { id: "cyprus", name: "Cyprus", flag: "🇨🇾", region: "Europe", airaloSlug: "cyprus", sailySlug: "cyprus" },
  { id: "united-arab-emirates", name: "United Arab Emirates", flag: "🇦🇪", region: "Middle East", airaloSlug: "united-arab-emirates", sailySlug: "united-arab-emirates" },
  { id: "thailand", name: "Thailand", flag: "🇹🇭", region: "Asia", airaloSlug: "thailand", sailySlug: "thailand" },
  { id: "japan", name: "Japan", flag: "🇯🇵", region: "Asia", airaloSlug: "japan", sailySlug: "japan" },
  { id: "australia", name: "Australia", flag: "🇦🇺", region: "Oceania", airaloSlug: "australia", sailySlug: "australia" },
  { id: "canada", name: "Canada", flag: "🇨🇦", region: "North America", airaloSlug: "canada", sailySlug: "canada" },
  { id: "mexico", name: "Mexico", flag: "🇲🇽", region: "North America", airaloSlug: "mexico", sailySlug: "mexico" },
  { id: "morocco", name: "Morocco", flag: "🇲🇦", region: "Africa", airaloSlug: "morocco", sailySlug: "morocco" },
  { id: "egypt", name: "Egypt", flag: "🇪🇬", region: "Africa", airaloSlug: "egypt", sailySlug: "egypt" },
  { id: "indonesia", name: "Indonesia", flag: "🇮🇩", region: "Asia", airaloSlug: "indonesia", sailySlug: "indonesia" },
];

export const destinationById = Object.fromEntries(destinations.map((destination) => [destination.id, destination])) as Record<DestinationId, Destination>;

export function isDestination(value: string): value is DestinationId { return Object.hasOwn(destinationById, value); }

export function getProviderUrl(provider: Provider, destination: Destination) {
  if (destination.id === "turkey") {
    if (provider === "Klook") return process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_URL ?? "https://www.klook.com/en-GB/activity/128551-turkey-esim-high-speed-internet-qr-code-voucher/";
    if (provider === "Nomad") return "https://www.nomadesim.com/turkey-eSIM";
  }
  if (provider === "Airalo") return `https://www.airalo.com/${destination.airaloSlug}-esim`;
  if (provider === "Saily") return `https://saily.com/esim-${destination.sailySlug}/`;
  if (provider === "Klook") return `https://www.klook.com/en-GB/search/result/?query=${encodeURIComponent(`${destination.name} eSIM`)}`;
  return `https://www.nomadesim.com/en/${destination.id}-eSIM`;
}
