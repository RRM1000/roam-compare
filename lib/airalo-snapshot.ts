import type { DestinationId } from "./destinations.ts";
import type { Plan } from "./catalog.ts";

/**
 * Airalo prices, rechecked on 23 September 2026 against each destination page.
 *
 * These are the real GBP list prices Airalo shows a UK visitor, which is why they
 * land on exact .00/.50 amounts — they are not converted from USD, so they need no
 * FX estimate and carry no conversion caveat.
 *
 * The line-up changed since the previous snapshot. Airalo now sells fixed 3, 7, 15
 * and 30-day windows, so the old 1GB/7d, 2GB/15d and 3GB/30d plans no longer exist
 * and were removed rather than repriced.
 *
 * Every unlimited plan slows to 1Mbps after a daily amount, quoted on each page as
 * "Lower speed rate of 1 Mbps after 3 GB usage per day" — except Spain and the
 * United States, which say 5 GB.
 *
 * Airalo states no hotspot rule on the product pages, and its own FAQ treats hotspot
 * use as ordinary consumption. Tethering is recorded as allowed, with the caveat that
 * the device and the local network can still restrict it.
 */
export const AIRALO_CHECKED_AT = "2026-09-23";
export const AIRALO_REVIEW_AFTER = "2026-09-30";

type AiraloSeed = {
  id: string;
  destination: DestinationId;
  name: string;
  dataGb?: number;
  dailyDataGb?: number;
  unlimited?: boolean;
  validity: number;
  price: number;
  network: string;
  sourceUrl: string;
  speedCap?: string;
  fairUse?: string;
  note?: string;
  callingSupport?: Plan["callingSupport"];
};

function airaloPlan(seed: AiraloSeed): Plan {
  const { speedCap, fairUse, note, callingSupport, ...rest } = seed;
  return {
    ...rest,
    provider: "Airalo",
    currency: "GBP",
    speed: "The provider doesn't confirm 4G or 5G on this plan",
    speedCap: speedCap ?? "No speed limit mentioned until your data runs out",
    tethering: "allowed",
    tetheringNote: "Airalo sets no hotspot rule on this plan, though your phone or the local network still can",
    fairUse: fairUse ?? "When the data runs out you'll need to top up or buy again",
    activation: "The plan starts counting down when it first connects in the destination, not when you buy it",
    note: note ?? "You can top up",
    callingSupport: callingSupport ?? "data-only",
    checkedAt: AIRALO_CHECKED_AT,
    reviewAfter: AIRALO_REVIEW_AFTER,
  };
}

export const airaloPlans: Plan[] = [
  // turkey — Türk Telekom (Avea)
  airaloPlan({ id: "turkey-airalo-1gb-3d", destination: "turkey", name: "1GB", dataGb: 1, validity: 3, price: 3.5, network: "Türk Telekom (Avea)", sourceUrl: "https://www.airalo.com/turkey-esim" }),
  airaloPlan({ id: "turkey-airalo-3gb-3d", destination: "turkey", name: "3GB", dataGb: 3, validity: 3, price: 5, network: "Türk Telekom (Avea)", sourceUrl: "https://www.airalo.com/turkey-esim" }),
  airaloPlan({ id: "turkey-airalo-3gb-7d", destination: "turkey", name: "3GB", dataGb: 3, validity: 7, price: 5, network: "Türk Telekom (Avea)", sourceUrl: "https://www.airalo.com/turkey-esim" }),
  airaloPlan({ id: "turkey-airalo-5gb-7d", destination: "turkey", name: "5GB", dataGb: 5, validity: 7, price: 7, network: "Türk Telekom (Avea)", sourceUrl: "https://www.airalo.com/turkey-esim" }),
  airaloPlan({ id: "turkey-airalo-10gb-7d", destination: "turkey", name: "10GB", dataGb: 10, validity: 7, price: 11.5, network: "Türk Telekom (Avea)", sourceUrl: "https://www.airalo.com/turkey-esim" }),
  airaloPlan({ id: "turkey-airalo-5gb-15d", destination: "turkey", name: "5GB", dataGb: 5, validity: 15, price: 7.5, network: "Türk Telekom (Avea)", sourceUrl: "https://www.airalo.com/turkey-esim" }),
  airaloPlan({ id: "turkey-airalo-10gb-15d", destination: "turkey", name: "10GB", dataGb: 10, validity: 15, price: 12, network: "Türk Telekom (Avea)", sourceUrl: "https://www.airalo.com/turkey-esim" }),
  airaloPlan({ id: "turkey-airalo-20gb-15d", destination: "turkey", name: "20GB", dataGb: 20, validity: 15, price: 17, network: "Türk Telekom (Avea)", sourceUrl: "https://www.airalo.com/turkey-esim" }),
  airaloPlan({ id: "turkey-airalo-5gb-30d", destination: "turkey", name: "5GB", dataGb: 5, validity: 30, price: 8, network: "Türk Telekom (Avea)", sourceUrl: "https://www.airalo.com/turkey-esim" }),
  airaloPlan({ id: "turkey-airalo-10gb-30d", destination: "turkey", name: "10GB", dataGb: 10, validity: 30, price: 12, network: "Türk Telekom (Avea)", sourceUrl: "https://www.airalo.com/turkey-esim" }),
  airaloPlan({ id: "turkey-airalo-20gb-30d", destination: "turkey", name: "20GB", dataGb: 20, validity: 30, price: 17.5, network: "Türk Telekom (Avea)", sourceUrl: "https://www.airalo.com/turkey-esim" }),
  airaloPlan({ id: "turkey-airalo-50gb-30d", destination: "turkey", name: "50GB", dataGb: 50, validity: 30, price: 26.5, network: "Türk Telekom (Avea)", sourceUrl: "https://www.airalo.com/turkey-esim" }),
  airaloPlan({ id: "turkey-airalo-unlimited-3d", destination: "turkey", name: "Unlimited", unlimited: true, validity: 3, price: 9, network: "Türk Telekom (Avea)", sourceUrl: "https://www.airalo.com/turkey-esim", dailyDataGb: 3, speedCap: "1Mbps once you've used 3GB in a day", fairUse: "3GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "turkey-airalo-unlimited-5d", destination: "turkey", name: "Unlimited", unlimited: true, validity: 5, price: 14.5, network: "Türk Telekom (Avea)", sourceUrl: "https://www.airalo.com/turkey-esim", dailyDataGb: 3, speedCap: "1Mbps once you've used 3GB in a day", fairUse: "3GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "turkey-airalo-unlimited-7d", destination: "turkey", name: "Unlimited", unlimited: true, validity: 7, price: 19, network: "Türk Telekom (Avea)", sourceUrl: "https://www.airalo.com/turkey-esim", dailyDataGb: 3, speedCap: "1Mbps once you've used 3GB in a day", fairUse: "3GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "turkey-airalo-unlimited-10d", destination: "turkey", name: "Unlimited", unlimited: true, validity: 10, price: 26.5, network: "Türk Telekom (Avea)", sourceUrl: "https://www.airalo.com/turkey-esim", dailyDataGb: 3, speedCap: "1Mbps once you've used 3GB in a day", fairUse: "3GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "turkey-airalo-unlimited-15d", destination: "turkey", name: "Unlimited", unlimited: true, validity: 15, price: 30, network: "Türk Telekom (Avea)", sourceUrl: "https://www.airalo.com/turkey-esim", dailyDataGb: 3, speedCap: "1Mbps once you've used 3GB in a day", fairUse: "3GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "turkey-airalo-unlimited-30d", destination: "turkey", name: "Unlimited", unlimited: true, validity: 30, price: 53, network: "Türk Telekom (Avea)", sourceUrl: "https://www.airalo.com/turkey-esim", dailyDataGb: 3, speedCap: "1Mbps once you've used 3GB in a day", fairUse: "3GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  // united-states — T-Mobile
  airaloPlan({ id: "united-states-airalo-1gb-3d", destination: "united-states", name: "1GB", dataGb: 1, validity: 3, price: 3.5, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim" }),
  airaloPlan({ id: "united-states-airalo-3gb-3d", destination: "united-states", name: "3GB", dataGb: 3, validity: 3, price: 7, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim" }),
  airaloPlan({ id: "united-states-airalo-3gb-7d", destination: "united-states", name: "3GB", dataGb: 3, validity: 7, price: 7, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim" }),
  airaloPlan({ id: "united-states-airalo-5gb-7d", destination: "united-states", name: "5GB", dataGb: 5, validity: 7, price: 10, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim" }),
  airaloPlan({ id: "united-states-airalo-10gb-7d", destination: "united-states", name: "10GB", dataGb: 10, validity: 7, price: 16.5, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim" }),
  airaloPlan({ id: "united-states-airalo-5gb-15d", destination: "united-states", name: "5GB", dataGb: 5, validity: 15, price: 10, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim" }),
  airaloPlan({ id: "united-states-airalo-10gb-15d", destination: "united-states", name: "10GB", dataGb: 10, validity: 15, price: 17, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim" }),
  airaloPlan({ id: "united-states-airalo-20gb-15d", destination: "united-states", name: "20GB", dataGb: 20, validity: 15, price: 28, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim" }),
  airaloPlan({ id: "united-states-airalo-5gb-30d", destination: "united-states", name: "5GB", dataGb: 5, validity: 30, price: 10.5, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim" }),
  airaloPlan({ id: "united-states-airalo-10gb-30d", destination: "united-states", name: "10GB", dataGb: 10, validity: 30, price: 17.5, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim" }),
  airaloPlan({ id: "united-states-airalo-20gb-30d", destination: "united-states", name: "20GB", dataGb: 20, validity: 30, price: 28, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim" }),
  airaloPlan({ id: "united-states-airalo-50gb-30d", destination: "united-states", name: "50GB", dataGb: 50, validity: 30, price: 32.5, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim" }),
  airaloPlan({ id: "united-states-airalo-unlimited-3d", destination: "united-states", name: "Unlimited", unlimited: true, validity: 3, price: 9, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim", dailyDataGb: 5, speedCap: "1Mbps once you've used 5GB in a day", fairUse: "5GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "united-states-airalo-unlimited-5d", destination: "united-states", name: "Unlimited", unlimited: true, validity: 5, price: 14.5, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim", dailyDataGb: 5, speedCap: "1Mbps once you've used 5GB in a day", fairUse: "5GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "united-states-airalo-unlimited-7d", destination: "united-states", name: "Unlimited", unlimited: true, validity: 7, price: 19.5, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim", dailyDataGb: 5, speedCap: "1Mbps once you've used 5GB in a day", fairUse: "5GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "united-states-airalo-unlimited-10d", destination: "united-states", name: "Unlimited", unlimited: true, validity: 10, price: 26.5, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim", dailyDataGb: 5, speedCap: "1Mbps once you've used 5GB in a day", fairUse: "5GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "united-states-airalo-unlimited-15d", destination: "united-states", name: "Unlimited", unlimited: true, validity: 15, price: 35.5, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim", dailyDataGb: 5, speedCap: "1Mbps once you've used 5GB in a day", fairUse: "5GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "united-states-airalo-unlimited-30d", destination: "united-states", name: "Unlimited", unlimited: true, validity: 30, price: 52.5, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim", dailyDataGb: 5, speedCap: "1Mbps once you've used 5GB in a day", fairUse: "5GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "united-states-airalo-voice-1gb-3d", destination: "united-states", name: "1GB + 10 min/SMS", dataGb: 1, validity: 3, price: 5, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim", callingSupport: "calls-texts", fairUse: "Includes 10 minutes and 10 texts. Incoming calls use your minutes, and international calls aren't covered", note: "Comes with a US number, plus some minutes and texts" }),
  airaloPlan({ id: "united-states-airalo-voice-3gb-3d", destination: "united-states", name: "3GB + 30 min/SMS", dataGb: 3, validity: 3, price: 8.5, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim", callingSupport: "calls-texts", fairUse: "Includes 30 minutes and 30 texts. Incoming calls use your minutes, and international calls aren't covered", note: "Comes with a US number, plus some minutes and texts" }),
  airaloPlan({ id: "united-states-airalo-voice-3gb-7d", destination: "united-states", name: "3GB + 30 min/SMS", dataGb: 3, validity: 7, price: 9.5, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim", callingSupport: "calls-texts", fairUse: "Includes 30 minutes and 30 texts. Incoming calls use your minutes, and international calls aren't covered", note: "Comes with a US number, plus some minutes and texts" }),
  airaloPlan({ id: "united-states-airalo-voice-5gb-7d", destination: "united-states", name: "5GB + 50 min/SMS", dataGb: 5, validity: 7, price: 13.5, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim", callingSupport: "calls-texts", fairUse: "Includes 50 minutes and 50 texts. Incoming calls use your minutes, and international calls aren't covered", note: "Comes with a US number, plus some minutes and texts" }),
  airaloPlan({ id: "united-states-airalo-voice-10gb-7d", destination: "united-states", name: "10GB + 100 min/SMS", dataGb: 10, validity: 7, price: 21.5, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim", callingSupport: "calls-texts", fairUse: "Includes 100 minutes and 100 texts. Incoming calls use your minutes, and international calls aren't covered", note: "Comes with a US number, plus some minutes and texts" }),
  airaloPlan({ id: "united-states-airalo-voice-5gb-15d", destination: "united-states", name: "5GB + 50 min/SMS", dataGb: 5, validity: 15, price: 14, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim", callingSupport: "calls-texts", fairUse: "Includes 50 minutes and 50 texts. Incoming calls use your minutes, and international calls aren't covered", note: "Comes with a US number, plus some minutes and texts" }),
  airaloPlan({ id: "united-states-airalo-voice-10gb-15d", destination: "united-states", name: "10GB + 100 min/SMS", dataGb: 10, validity: 15, price: 22.5, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim", callingSupport: "calls-texts", fairUse: "Includes 100 minutes and 100 texts. Incoming calls use your minutes, and international calls aren't covered", note: "Comes with a US number, plus some minutes and texts" }),
  airaloPlan({ id: "united-states-airalo-voice-20gb-15d", destination: "united-states", name: "20GB + 200 min/SMS", dataGb: 20, validity: 15, price: 35, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim", callingSupport: "calls-texts", fairUse: "Includes 200 minutes and 200 texts. Incoming calls use your minutes, and international calls aren't covered", note: "Comes with a US number, plus some minutes and texts" }),
  airaloPlan({ id: "united-states-airalo-voice-5gb-30d", destination: "united-states", name: "5GB + 50 min/SMS", dataGb: 5, validity: 30, price: 15, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim", callingSupport: "calls-texts", fairUse: "Includes 50 minutes and 50 texts. Incoming calls use your minutes, and international calls aren't covered", note: "Comes with a US number, plus some minutes and texts" }),
  airaloPlan({ id: "united-states-airalo-voice-10gb-30d", destination: "united-states", name: "10GB + 100 min/SMS", dataGb: 10, validity: 30, price: 23.5, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim", callingSupport: "calls-texts", fairUse: "Includes 100 minutes and 100 texts. Incoming calls use your minutes, and international calls aren't covered", note: "Comes with a US number, plus some minutes and texts" }),
  airaloPlan({ id: "united-states-airalo-voice-20gb-30d", destination: "united-states", name: "20GB + 200 min/SMS", dataGb: 20, validity: 30, price: 36.5, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim", callingSupport: "calls-texts", fairUse: "Includes 200 minutes and 200 texts. Incoming calls use your minutes, and international calls aren't covered", note: "Comes with a US number, plus some minutes and texts" }),
  airaloPlan({ id: "united-states-airalo-voice-50gb-30d", destination: "united-states", name: "50GB + 500 min/SMS", dataGb: 50, validity: 30, price: 45.5, network: "T-Mobile", sourceUrl: "https://www.airalo.com/united-states-esim", callingSupport: "calls-texts", fairUse: "Includes 500 minutes and 500 texts. Incoming calls use your minutes, and international calls aren't covered", note: "Comes with a US number, plus some minutes and texts" }),
  // spain — Orange
  airaloPlan({ id: "spain-airalo-1gb-3d", destination: "spain", name: "1GB", dataGb: 1, validity: 3, price: 3.5, network: "Orange", sourceUrl: "https://www.airalo.com/spain-esim" }),
  airaloPlan({ id: "spain-airalo-3gb-3d", destination: "spain", name: "3GB", dataGb: 3, validity: 3, price: 4.5, network: "Orange", sourceUrl: "https://www.airalo.com/spain-esim" }),
  airaloPlan({ id: "spain-airalo-3gb-7d", destination: "spain", name: "3GB", dataGb: 3, validity: 7, price: 5, network: "Orange", sourceUrl: "https://www.airalo.com/spain-esim" }),
  airaloPlan({ id: "spain-airalo-5gb-7d", destination: "spain", name: "5GB", dataGb: 5, validity: 7, price: 6.5, network: "Orange", sourceUrl: "https://www.airalo.com/spain-esim" }),
  airaloPlan({ id: "spain-airalo-10gb-7d", destination: "spain", name: "10GB", dataGb: 10, validity: 7, price: 10, network: "Orange", sourceUrl: "https://www.airalo.com/spain-esim" }),
  airaloPlan({ id: "spain-airalo-5gb-15d", destination: "spain", name: "5GB", dataGb: 5, validity: 15, price: 7, network: "Orange", sourceUrl: "https://www.airalo.com/spain-esim" }),
  airaloPlan({ id: "spain-airalo-10gb-15d", destination: "spain", name: "10GB", dataGb: 10, validity: 15, price: 10.5, network: "Orange", sourceUrl: "https://www.airalo.com/spain-esim" }),
  airaloPlan({ id: "spain-airalo-20gb-15d", destination: "spain", name: "20GB", dataGb: 20, validity: 15, price: 15, network: "Orange", sourceUrl: "https://www.airalo.com/spain-esim" }),
  airaloPlan({ id: "spain-airalo-5gb-30d", destination: "spain", name: "5GB", dataGb: 5, validity: 30, price: 7, network: "Orange", sourceUrl: "https://www.airalo.com/spain-esim" }),
  airaloPlan({ id: "spain-airalo-10gb-30d", destination: "spain", name: "10GB", dataGb: 10, validity: 30, price: 11, network: "Orange", sourceUrl: "https://www.airalo.com/spain-esim" }),
  airaloPlan({ id: "spain-airalo-20gb-30d", destination: "spain", name: "20GB", dataGb: 20, validity: 30, price: 15.5, network: "Orange", sourceUrl: "https://www.airalo.com/spain-esim" }),
  airaloPlan({ id: "spain-airalo-50gb-30d", destination: "spain", name: "50GB", dataGb: 50, validity: 30, price: 30, network: "Orange", sourceUrl: "https://www.airalo.com/spain-esim" }),
  airaloPlan({ id: "spain-airalo-unlimited-3d", destination: "spain", name: "Unlimited", unlimited: true, validity: 3, price: 8.5, network: "Orange", sourceUrl: "https://www.airalo.com/spain-esim", dailyDataGb: 5, speedCap: "1Mbps once you've used 5GB in a day", fairUse: "5GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "spain-airalo-unlimited-5d", destination: "spain", name: "Unlimited", unlimited: true, validity: 5, price: 13.5, network: "Orange", sourceUrl: "https://www.airalo.com/spain-esim", dailyDataGb: 5, speedCap: "1Mbps once you've used 5GB in a day", fairUse: "5GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "spain-airalo-unlimited-7d", destination: "spain", name: "Unlimited", unlimited: true, validity: 7, price: 18.5, network: "Orange", sourceUrl: "https://www.airalo.com/spain-esim", dailyDataGb: 5, speedCap: "1Mbps once you've used 5GB in a day", fairUse: "5GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "spain-airalo-unlimited-10d", destination: "spain", name: "Unlimited", unlimited: true, validity: 10, price: 25, network: "Orange", sourceUrl: "https://www.airalo.com/spain-esim", dailyDataGb: 5, speedCap: "1Mbps once you've used 5GB in a day", fairUse: "5GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "spain-airalo-unlimited-15d", destination: "spain", name: "Unlimited", unlimited: true, validity: 15, price: 33, network: "Orange", sourceUrl: "https://www.airalo.com/spain-esim", dailyDataGb: 5, speedCap: "1Mbps once you've used 5GB in a day", fairUse: "5GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "spain-airalo-unlimited-30d", destination: "spain", name: "Unlimited", unlimited: true, validity: 30, price: 48.5, network: "Orange", sourceUrl: "https://www.airalo.com/spain-esim", dailyDataGb: 5, speedCap: "1Mbps once you've used 5GB in a day", fairUse: "5GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  // japan — Softbank
  airaloPlan({ id: "japan-airalo-1gb-3d", destination: "japan", name: "1GB", dataGb: 1, validity: 3, price: 3.5, network: "Softbank", sourceUrl: "https://www.airalo.com/japan-esim" }),
  airaloPlan({ id: "japan-airalo-3gb-3d", destination: "japan", name: "3GB", dataGb: 3, validity: 3, price: 6, network: "Softbank", sourceUrl: "https://www.airalo.com/japan-esim" }),
  airaloPlan({ id: "japan-airalo-3gb-7d", destination: "japan", name: "3GB", dataGb: 3, validity: 7, price: 6.5, network: "Softbank", sourceUrl: "https://www.airalo.com/japan-esim" }),
  airaloPlan({ id: "japan-airalo-5gb-7d", destination: "japan", name: "5GB", dataGb: 5, validity: 7, price: 8, network: "Softbank", sourceUrl: "https://www.airalo.com/japan-esim" }),
  airaloPlan({ id: "japan-airalo-10gb-7d", destination: "japan", name: "10GB", dataGb: 10, validity: 7, price: 13.5, network: "Softbank", sourceUrl: "https://www.airalo.com/japan-esim" }),
  airaloPlan({ id: "japan-airalo-5gb-15d", destination: "japan", name: "5GB", dataGb: 5, validity: 15, price: 8.5, network: "Softbank", sourceUrl: "https://www.airalo.com/japan-esim" }),
  airaloPlan({ id: "japan-airalo-10gb-15d", destination: "japan", name: "10GB", dataGb: 10, validity: 15, price: 13.5, network: "Softbank", sourceUrl: "https://www.airalo.com/japan-esim" }),
  airaloPlan({ id: "japan-airalo-20gb-15d", destination: "japan", name: "20GB", dataGb: 20, validity: 15, price: 18.5, network: "Softbank", sourceUrl: "https://www.airalo.com/japan-esim" }),
  airaloPlan({ id: "japan-airalo-5gb-30d", destination: "japan", name: "5GB", dataGb: 5, validity: 30, price: 8.5, network: "Softbank", sourceUrl: "https://www.airalo.com/japan-esim" }),
  airaloPlan({ id: "japan-airalo-10gb-30d", destination: "japan", name: "10GB", dataGb: 10, validity: 30, price: 14, network: "Softbank", sourceUrl: "https://www.airalo.com/japan-esim" }),
  airaloPlan({ id: "japan-airalo-20gb-30d", destination: "japan", name: "20GB", dataGb: 20, validity: 30, price: 19.5, network: "Softbank", sourceUrl: "https://www.airalo.com/japan-esim" }),
  airaloPlan({ id: "japan-airalo-unlimited-3d", destination: "japan", name: "Unlimited", unlimited: true, validity: 3, price: 9, network: "Softbank", sourceUrl: "https://www.airalo.com/japan-esim", dailyDataGb: 3, speedCap: "1Mbps once you've used 3GB in a day", fairUse: "3GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "japan-airalo-unlimited-5d", destination: "japan", name: "Unlimited", unlimited: true, validity: 5, price: 13.5, network: "Softbank", sourceUrl: "https://www.airalo.com/japan-esim", dailyDataGb: 3, speedCap: "1Mbps once you've used 3GB in a day", fairUse: "3GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "japan-airalo-unlimited-7d", destination: "japan", name: "Unlimited", unlimited: true, validity: 7, price: 20.5, network: "Softbank", sourceUrl: "https://www.airalo.com/japan-esim", dailyDataGb: 3, speedCap: "1Mbps once you've used 3GB in a day", fairUse: "3GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "japan-airalo-unlimited-10d", destination: "japan", name: "Unlimited", unlimited: true, validity: 10, price: 26.5, network: "Softbank", sourceUrl: "https://www.airalo.com/japan-esim", dailyDataGb: 3, speedCap: "1Mbps once you've used 3GB in a day", fairUse: "3GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "japan-airalo-unlimited-15d", destination: "japan", name: "Unlimited", unlimited: true, validity: 15, price: 37, network: "Softbank", sourceUrl: "https://www.airalo.com/japan-esim", dailyDataGb: 3, speedCap: "1Mbps once you've used 3GB in a day", fairUse: "3GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "japan-airalo-unlimited-30d", destination: "japan", name: "Unlimited", unlimited: true, validity: 30, price: 53, network: "Softbank", sourceUrl: "https://www.airalo.com/japan-esim", dailyDataGb: 3, speedCap: "1Mbps once you've used 3GB in a day", fairUse: "3GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  // united-arab-emirates — Etisalat
  airaloPlan({ id: "united-arab-emirates-airalo-1gb-3d", destination: "united-arab-emirates", name: "1GB", dataGb: 1, validity: 3, price: 3.5, network: "Etisalat", sourceUrl: "https://www.airalo.com/united-arab-emirates-esim" }),
  airaloPlan({ id: "united-arab-emirates-airalo-3gb-3d", destination: "united-arab-emirates", name: "3GB", dataGb: 3, validity: 3, price: 7, network: "Etisalat", sourceUrl: "https://www.airalo.com/united-arab-emirates-esim" }),
  airaloPlan({ id: "united-arab-emirates-airalo-3gb-7d", destination: "united-arab-emirates", name: "3GB", dataGb: 3, validity: 7, price: 7, network: "Etisalat", sourceUrl: "https://www.airalo.com/united-arab-emirates-esim" }),
  airaloPlan({ id: "united-arab-emirates-airalo-5gb-7d", destination: "united-arab-emirates", name: "5GB", dataGb: 5, validity: 7, price: 8.5, network: "Etisalat", sourceUrl: "https://www.airalo.com/united-arab-emirates-esim" }),
  airaloPlan({ id: "united-arab-emirates-airalo-10gb-7d", destination: "united-arab-emirates", name: "10GB", dataGb: 10, validity: 7, price: 14.5, network: "Etisalat", sourceUrl: "https://www.airalo.com/united-arab-emirates-esim" }),
  airaloPlan({ id: "united-arab-emirates-airalo-5gb-15d", destination: "united-arab-emirates", name: "5GB", dataGb: 5, validity: 15, price: 9, network: "Etisalat", sourceUrl: "https://www.airalo.com/united-arab-emirates-esim" }),
  airaloPlan({ id: "united-arab-emirates-airalo-10gb-15d", destination: "united-arab-emirates", name: "10GB", dataGb: 10, validity: 15, price: 15, network: "Etisalat", sourceUrl: "https://www.airalo.com/united-arab-emirates-esim" }),
  airaloPlan({ id: "united-arab-emirates-airalo-20gb-15d", destination: "united-arab-emirates", name: "20GB", dataGb: 20, validity: 15, price: 25.5, network: "Etisalat", sourceUrl: "https://www.airalo.com/united-arab-emirates-esim" }),
  airaloPlan({ id: "united-arab-emirates-airalo-5gb-30d", destination: "united-arab-emirates", name: "5GB", dataGb: 5, validity: 30, price: 9.5, network: "Etisalat", sourceUrl: "https://www.airalo.com/united-arab-emirates-esim" }),
  airaloPlan({ id: "united-arab-emirates-airalo-10gb-30d", destination: "united-arab-emirates", name: "10GB", dataGb: 10, validity: 30, price: 15.5, network: "Etisalat", sourceUrl: "https://www.airalo.com/united-arab-emirates-esim" }),
  airaloPlan({ id: "united-arab-emirates-airalo-20gb-30d", destination: "united-arab-emirates", name: "20GB", dataGb: 20, validity: 30, price: 26.5, network: "Etisalat", sourceUrl: "https://www.airalo.com/united-arab-emirates-esim" }),
  airaloPlan({ id: "united-arab-emirates-airalo-unlimited-3d", destination: "united-arab-emirates", name: "Unlimited", unlimited: true, validity: 3, price: 10, network: "Etisalat", sourceUrl: "https://www.airalo.com/united-arab-emirates-esim", dailyDataGb: 3, speedCap: "1Mbps once you've used 3GB in a day", fairUse: "3GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "united-arab-emirates-airalo-unlimited-5d", destination: "united-arab-emirates", name: "Unlimited", unlimited: true, validity: 5, price: 15, network: "Etisalat", sourceUrl: "https://www.airalo.com/united-arab-emirates-esim", dailyDataGb: 3, speedCap: "1Mbps once you've used 3GB in a day", fairUse: "3GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "united-arab-emirates-airalo-unlimited-7d", destination: "united-arab-emirates", name: "Unlimited", unlimited: true, validity: 7, price: 21.5, network: "Etisalat", sourceUrl: "https://www.airalo.com/united-arab-emirates-esim", dailyDataGb: 3, speedCap: "1Mbps once you've used 3GB in a day", fairUse: "3GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "united-arab-emirates-airalo-unlimited-10d", destination: "united-arab-emirates", name: "Unlimited", unlimited: true, validity: 10, price: 27, network: "Etisalat", sourceUrl: "https://www.airalo.com/united-arab-emirates-esim", dailyDataGb: 3, speedCap: "1Mbps once you've used 3GB in a day", fairUse: "3GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "united-arab-emirates-airalo-unlimited-15d", destination: "united-arab-emirates", name: "Unlimited", unlimited: true, validity: 15, price: 38, network: "Etisalat", sourceUrl: "https://www.airalo.com/united-arab-emirates-esim", dailyDataGb: 3, speedCap: "1Mbps once you've used 3GB in a day", fairUse: "3GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
  airaloPlan({ id: "united-arab-emirates-airalo-unlimited-30d", destination: "united-arab-emirates", name: "Unlimited", unlimited: true, validity: 30, price: 55.5, network: "Etisalat", sourceUrl: "https://www.airalo.com/united-arab-emirates-esim", dailyDataGb: 3, speedCap: "1Mbps once you've used 3GB in a day", fairUse: "3GB at full speed each day, then 1Mbps until it resets", note: "Slows down after a daily limit" }),
];
