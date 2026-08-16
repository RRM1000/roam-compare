export type Usage = "light" | "everyday" | "heavy";
export type Currency = "EUR" | "USD";
export type Provider = "Airalo" | "Klook" | "Nomad" | "Saily";
export type CallingSupport = "data-only" | "calls-texts" | "check-plan";

export type Plan = {
  id: string;
  provider: Provider;
  name: string;
  dataGb?: number;
  dailyDataGb?: number;
  unlimited?: boolean;
  validity: number;
  price: number | null;
  currency?: Currency;
  speed: string;
  network: string;
  note: string;
  callingSupport: CallingSupport;
  catalogueOnly?: boolean;
};

export const DATA_CHECKED = "15 August 2026";
export const CALLS_CHECKED = "16 August 2026";
export const usagePerDay: Record<Usage, number> = { light: 0.35, everyday: 0.8, heavy: 2 };
export const tripLengths = [...Array.from({ length: 30 }, (_, index) => index + 1), 45, 60, 90];
export const gbpRates: Record<Currency, number> = { EUR: 0.85, USD: 0.75 };

export const providerDetails: Record<Provider, { accent: string; initials: string; affiliate: boolean; summary: string }> = {
  Airalo: { accent: "#a82350", initials: "AI", affiliate: false, summary: "Local, regional and global eSIM catalogues" },
  Klook: { accent: "#b33b27", initials: "KL", affiliate: true, summary: "Travel eSIM options alongside activities" },
  Nomad: { accent: "#2943aa", initials: "NO", affiliate: false, summary: "Fixed-data and unlimited travel plans" },
  Saily: { accent: "#4b28ae", initials: "SA", affiliate: false, summary: "Travel data plans with security features" },
};

const turkeyDataOnlyPlans: Array<Omit<Plan, "callingSupport">> = [
  { id: "airalo-1", provider: "Airalo", name: "1GB", dataGb: 1, validity: 7, price: 4, currency: "USD", speed: "4G / 5G", network: "Türk Telekom (Avea)", note: "Top-ups available" },
  { id: "airalo-2", provider: "Airalo", name: "2GB", dataGb: 2, validity: 15, price: 5.5, currency: "USD", speed: "4G / 5G", network: "Türk Telekom (Avea)", note: "Top-ups available" },
  { id: "airalo-3", provider: "Airalo", name: "3GB", dataGb: 3, validity: 30, price: 6.5, currency: "USD", speed: "4G / 5G", network: "Türk Telekom (Avea)", note: "Top-ups available" },
  { id: "airalo-5", provider: "Airalo", name: "5GB", dataGb: 5, validity: 30, price: 10, currency: "USD", speed: "4G / 5G", network: "Türk Telekom (Avea)", note: "Top-ups available" },
  { id: "airalo-10", provider: "Airalo", name: "10GB", dataGb: 10, validity: 30, price: 15.5, currency: "USD", speed: "4G / 5G", network: "Türk Telekom (Avea)", note: "Top-ups available" },
  { id: "airalo-20", provider: "Airalo", name: "20GB", dataGb: 20, validity: 30, price: 22.5, currency: "USD", speed: "4G / 5G", network: "Türk Telekom (Avea)", note: "Top-ups available" },
  { id: "airalo-unlimited", provider: "Airalo", name: "Unlimited", unlimited: true, validity: 10, price: 35, currency: "USD", speed: "4G / 5G", network: "Türk Telekom (Avea)", note: "Fair-use limits may apply" },
  { id: "klook-1gb-daily", provider: "Klook", name: "1GB per day", dailyDataGb: 1, validity: 30, price: null, speed: "5G / 4G", network: "Türk Telekom", note: "Choose 1–30 days on Klook" },
  { id: "klook-2gb-daily", provider: "Klook", name: "2GB per day", dailyDataGb: 2, validity: 30, price: null, speed: "5G / 4G", network: "Türk Telekom", note: "Better for video and hotspot use" },
  { id: "klook-unlimited", provider: "Klook", name: "Unlimited daily data", unlimited: true, validity: 30, price: null, speed: "5G / 4G", network: "Türk Telekom", note: "Fair-use speed limits may apply" },
  { id: "nomad-1", provider: "Nomad", name: "1GB", dataGb: 1, validity: 7, price: 3.46, currency: "EUR", speed: "4G / 5G", network: "Avea", note: "Hotspot supported" },
  { id: "nomad-3", provider: "Nomad", name: "3GB", dataGb: 3, validity: 30, price: 5.19, currency: "EUR", speed: "4G / 5G", network: "Avea", note: "Hotspot supported" },
  { id: "nomad-5", provider: "Nomad", name: "5GB", dataGb: 5, validity: 30, price: 7.79, currency: "EUR", speed: "4G / 5G", network: "Avea", note: "Sale price when checked" },
  { id: "nomad-10", provider: "Nomad", name: "10GB", dataGb: 10, validity: 30, price: 11.25, currency: "EUR", speed: "4G / 5G", network: "Avea", note: "Hotspot supported" },
  { id: "nomad-20", provider: "Nomad", name: "20GB", dataGb: 20, validity: 30, price: 17.31, currency: "EUR", speed: "4G / 5G", network: "Avea", note: "Hotspot supported" },
  { id: "nomad-50", provider: "Nomad", name: "50GB", dataGb: 50, validity: 30, price: 26.84, currency: "EUR", speed: "4G / 5G", network: "Avea", note: "Hotspot supported" },
  { id: "nomad-unlimited-5", provider: "Nomad", name: "Unlimited", unlimited: true, validity: 5, price: 14.72, currency: "EUR", speed: "4G / 5G", network: "Avea", note: "High-speed allowance resets daily" },
  { id: "nomad-unlimited-10", provider: "Nomad", name: "Unlimited", unlimited: true, validity: 10, price: 24.24, currency: "EUR", speed: "4G / 5G", network: "Avea", note: "High-speed allowance resets daily" },
  { id: "saily-1", provider: "Saily", name: "1GB", dataGb: 1, validity: 7, price: 3.49, currency: "EUR", speed: "3G / 4G / 5G", network: "Partner networks", note: "No hotspot restrictions" },
  { id: "saily-3", provider: "Saily", name: "3GB", dataGb: 3, validity: 30, price: 5.99, currency: "EUR", speed: "3G / 4G / 5G", network: "Partner networks", note: "No hotspot restrictions" },
  { id: "saily-5", provider: "Saily", name: "5GB", dataGb: 5, validity: 30, price: 8.99, currency: "EUR", speed: "3G / 4G / 5G", network: "Partner networks", note: "No hotspot restrictions" },
  { id: "saily-10", provider: "Saily", name: "10GB", dataGb: 10, validity: 30, price: 13.99, currency: "EUR", speed: "3G / 4G / 5G", network: "Partner networks", note: "No hotspot restrictions" },
  { id: "saily-20", provider: "Saily", name: "20GB", dataGb: 20, validity: 30, price: 20.49, currency: "EUR", speed: "3G / 4G / 5G", network: "Partner networks", note: "No hotspot restrictions" },
];

// Every priced Turkey plan above was verified as data-only. Keep this explicit so
// future voice/text plans must opt into a different status rather than inheriting one.
export const plans: Plan[] = turkeyDataOnlyPlans.map((plan) => ({ ...plan, callingSupport: "data-only" }));
