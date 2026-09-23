import type { Network } from "../roaming.ts";
import type { GuideNetworkRow, GuideProviderNote } from "./types.ts";

/**
 * Text shared by several guides, so a price or rule that changes is corrected
 * once. Every figure here matches what the scenario it names charges in
 * lib/roaming.ts, and was read on the network's or provider's own page on
 * 10 September 2026. tests/guides.test.mjs checks that each named scenario is
 * offered for the destination and prices.
 */

const NETWORK_ORDER: Network[] = ["ee", "o2", "vodafone", "three", "id-mobile", "sky-mobile", "giffgaff", "smarty", "voxi", "tesco-mobile"];

type RowOverrides = Partial<Record<Network, GuideNetworkRow>>;

function row(network: Network, scenario: string | null, headline: string, detail: string): GuideNetworkRow {
  return { network, scenario, headline, detail };
}

function ordered(rows: RowOverrides): GuideNetworkRow[] {
  return NETWORK_ORDER.map((network) => {
    const found = rows[network];
    if (!found) throw new Error(`No ${network} row`);
    return found;
  });
}

/**
 * Rows for a Europe-zone destination, priced by the zone-wide EU scenarios.
 * `handOff` names any network that doesn't list the country, which gets the same
 * "check your network" row as a destination outside Europe rather than a price
 * we can't stand behind.
 */
export function euRows(country: string, extra: Partial<Record<Network, string>> = {}, handOff: Network[] = []): GuideNetworkRow[] {
  const add = (network: Network, text: string) => (extra[network] ? `${text} ${extra[network]}` : text);
  const priced = ordered({
    ee: row("ee", "ee-europe-new", "EE Europe roaming: £2.72 a day, £16.50 for 7 days or £30 for 15 days", add("ee", `For plans taken out or upgraded from 7 July 2021. Uses your UK allowance in ${country}, up to a 50GB fair-use ceiling. On an older plan, check the EE app.`)),
    o2: row("o2", "o2-europe", "O2 Europe Zone: included, up to 25GB", add("o2", `Pay Monthly plans use their UK allowance in ${country} at no extra cost. Past 25GB of data abroad, you need to buy a Bolt On.`)),
    vodafone: row("vodafone", "vodafone-europe-pass", "£2.75 a day, or a European Roaming pass: £16 for 8 days, £21 for 15 days", add("vodafone", "Applies if your plan doesn't already include Europe. The passes cover 52 destinations, and Vodafone's 25GB roaming limit applies.")),
    three: row("three", "three-europe-pass", "Go Roam in Europe: £2 a day, or passes from £5 for 3 days", add("three", "Passes cost £5 for 3 days, £12 for 7 and £24 for 14, and let you use up to 12GB of your UK data abroad.")),
    "id-mobile": row("id-mobile", "id-europe", "iD Roam Free: included, up to 30GB", add("id-mobile", "iD's published EU limit is 30GB for customers who joined on or after 21 June 2023. On a smaller plan, your own allowance is the limit.")),
    "sky-mobile": row("sky-mobile", "sky-passport", "Roaming Passport Plus: £2 on each day you use it", add("sky-mobile", "Charged only on days you call, text or use data abroad, and uses your UK allowance up to Sky's 25GB roaming cap. Your phone may need to support VoLTE.")),
    giffgaff: row("giffgaff", "giffgaff-europe", "Included on eligible plans, up to 5GB", add("giffgaff", "You can use up to 5GB of your plan's data, or your whole allowance if it's smaller. Beyond that it's 10p per MB, and EU roaming switches off after 63 days.")),
    smarty: row("smarty", "smarty-europe", "Included, up to 12GB a month", add("smarty", "Plans with more than 12GB of data can use 12GB a plan month while roaming. Voice plans get unlimited standard calls and texts within the EU and back to the UK.")),
    voxi: row("voxi", "voxi-europe", "European Roaming Pass: £2.60 for 1 day, £4.80 for 2, £15 for 8, £20 for 15", add("voxi", "The pass starts when you buy it. You get your UK allowance or 20GB, whichever is smaller, and Endless social and video don't apply abroad.")),
    "tesco-mobile": row("tesco-mobile", "tesco-europe", "Home From Home: included on pay monthly and pay as you go", add("tesco-mobile", "Covers 48 destinations, including every EU country, with no separate data cap. A fair-use policy applies only if you spend more time abroad than in the UK.")),
  });
  if (handOff.length === 0) return priced;
  const unlisted = handOffRows(country);
  return priced.map((entry) => (handOff.includes(entry.network) ? unlisted[entry.network] : entry));
}

export const euNetworksIntro = (country: string) =>
  `${country} is in every UK network's Europe zone. Some networks include it in your plan; others charge a daily fee or sell passes. Every row below is priced for your trip in the calculator above and links to the page we read it on.`;

/** Rows shared by destinations outside Europe. */
export const worldRow = {
  eeZone1: () => row("ee", "ee-row1", "EE Rest of World Zone 1 pass: £6 for 24 hours, £30 for 7 days, £50 for 15 days", "Uses your UK allowance, up to a 50GB fair-use ceiling. Full Works and some older plans may already cover this zone, so check the EE app first."),
  eeZone2: () => row("ee", "ee-row2", "EE Rest of World Zone 2 pass: £8 for 24 hours, £40 for 7 days, £60 for 15 days", "Uses your UK allowance, up to a 50GB fair-use ceiling. Passes run from the moment you buy them, so time the purchase for when you land."),
  o2Travel: () => row("o2", "o2-travel", "O2 Travel: £7 on each day you use it", "Unlimited data, minutes and texts, with speeds capped at 2Mbps: fine for maps and messages, slow for video. Ultimate and some other plans already include it."),
  threeWorld: () => row("three", "three-world-pass", "Go Roam Around the World passes: £12.50 for 3 days, £30 for 7, £60 for 14", "Or £5 a day on plans taken out between October 2021 and 17 December 2025; check My3 for the rate on newer plans. Up to 12GB of your UK data abroad, and hotspot use isn't allowed."),
  threeExtra: () => row("three", "three-extra-pass", "Go Roam Around the World Extra passes: £17.50 for 3 days, £29.75 for 5, £42 for 7, £84 for 14", "Or £7 a day, rising to £8 on plans taken out from 18 December 2025. Up to 12GB of your UK data abroad, and hotspot use isn't allowed."),
  eeZone3: () => row("ee", "ee-row3", "EE Rest of World Zone 3 pass: £8 for 24 hours, including 500MB", "Includes unlimited minutes and texts, but the data is 500MB a day rather than one pot for the trip."),
  idRoamBeyond: () => row("id-mobile", "id-roam-beyond", "Roam Beyond passes: £5 for 1 day and 2GB, £20 for 5 days and 10GB, £35 for 10 days and 20GB", "Data-only passes that start straight away and don't renew. Ordinary calls and texts cost extra."),
  idMeteredWorld: () => row("id-mobile", "id-metered-world", "Standard rate: £9.60 per MB", "At that rate a few minutes of maps costs more than a whole eSIM, and a safety cap may cut you off. Keep data roaming off on iD here."),
  skyPassport: () => row("sky-mobile", "sky-passport", "Roaming Passport Plus: £2 on each day you use it", "Uses your UK allowance, capped at 25GB per billing period. Your phone may need to support VoLTE."),
  skyNotListed: (country: string) => row("sky-mobile", null, `Sky doesn't list ${country} in its roaming directory`, "Without Roaming Passport Plus, keep data roaming off on your Sky line and use Wi-Fi or an eSIM."),
  smartyMeteredUs: () => row("smarty", "smarty-metered-us", "Standard rate: 10p per MB, from an out-of-plan add-on", "That's about £100 a gigabyte, and SMARTY's default £45 worldwide spend limit stops you well before a week's use. Calls and texts cost extra."),
  voxiGlobal: () => row("voxi", "voxi-global", "Global Roaming Extra: £16 for 8 days with 2GB, £26.60 for 15 days with 4GB", "Includes some minutes and texts to the UK and within the country you're in. Incoming calls come out of those minutes."),
  voxiMetered: (country: string) => row("voxi", "voxi-metered", "Standard rate: 12p per MB", `${country} isn't on VOXI's Global Roaming Extra list, so data is charged by the megabyte, about £120 a gigabyte.`),
  tescoMeteredUs: () => row("tesco-mobile", "tesco-metered-us", "US data rate: 1p per MB", "About £10 a gigabyte. Calls and texts are charged separately, and a safety buffer may pause your data."),
  tescoMeteredWorld: () => row("tesco-mobile", "tesco-metered-world", "Standard rate: £5 per MB", "At that rate any real use is unaffordable, and a safety buffer will stop your data. Keep data roaming off on Tesco here."),
};

/**
 * Rows for a destination outside Europe. Networks without a verified charge for
 * this country get a hand-off row that says what to check, never a guessed price.
 */
function handOffRows(country: string): Required<RowOverrides> {
  return {
    ee: row("ee", null, "Check the EE app for this destination", `We couldn't confirm which EE zone ${country} is in.`),
    o2: row("o2", null, `${country} isn't on O2 Travel's list`, `O2 Travel's £7-a-day bolt-on doesn't cover ${country}, so O2's standard roaming rates apply. Check the rate for your plan before you use data.`),
    vodafone: row("vodafone", null, "Priced against your plan in Vodafone's roaming checker", `Vodafone's public pages don't print one rate for ${country}. Its roaming checker shows the charge for your number, and some plans include it.`),
    three: row("three", null, `Check Three's destination checker for ${country}`, "Three's Go Roam zones and passes vary by destination."),
    "id-mobile": row("id-mobile", null, `Check iD Mobile's roaming page for ${country}`, "iD sells Roam Beyond data passes for some destinations outside Europe. We couldn't confirm which applies here, so check before you rely on it."),
    "sky-mobile": row("sky-mobile", null, `Check Sky's destination list for ${country}`, "Roaming Passport Plus costs £2 on each day you use it in the destinations Sky covers. We couldn't confirm this one."),
    giffgaff: row("giffgaff", null, `Check giffgaff's roaming page for ${country}`, "giffgaff sells fixed-price travel data add-ons for some destinations outside the EU. Buy one before you use any data, because standard roaming rates apply without it."),
    smarty: row("smarty", null, "Outside the EU, you need an out-of-plan add-on", "SMARTY charges roaming outside the EU from an out-of-plan add-on balance, at the rates in its price guide. Plan on Wi-Fi or an eSIM for data."),
    voxi: row("voxi", null, `Check whether ${country} is on VOXI's Global Roaming Extra list`, "VOXI sells 8- and 15-day Global Roaming Extra passes for listed destinations. Elsewhere it charges by the megabyte."),
    "tesco-mobile": row("tesco-mobile", null, `Check Tesco Mobile's roaming charges for ${country}`, "Outside its Home From Home destinations, Tesco Mobile charges roaming by the megabyte. Pay-monthly charges and spend safeguards depend on your tariff."),
  };
}

export function worldRows(country: string, rows: RowOverrides): GuideNetworkRow[] {
  return ordered({ ...handOffRows(country), ...rows });
}

export const worldNetworksIntro = (country: string) =>
  `${country} is outside every UK network's Europe zone. Where a network publishes a charge for ${country}, the row is priced in the calculator above and links to the network's page. Where it prices against your account, we say so rather than guess.`;

export const providersIntro =
  "Four providers appear in the comparison above. Saily and Nomad send us live prices, Airalo's are checked by hand, and Klook shows its prices only on its own page. Links we could earn a commission on are marked as sponsored in the page source.";

type ProviderNetworks = {
  /** As listed on Nomad's page for this country. */
  nomad: string;
  /** Airalo's primary network, or null when its page doesn't name one. */
  airalo: string | null;
  /** From Klook's product page name, or null when it doesn't name one. */
  klook: string | null;
};

/**
 * Provider notes. Only Airalo plans we have checked by hand carry a confirmed
 * daily unlimited cap, so `airaloDailyCapGb` is set only for those destinations.
 */
export function providerNotes(country: string, networks: ProviderNetworks, options: { airaloDailyCapGb?: number; extra?: Partial<Record<"Saily" | "Nomad" | "Airalo" | "Klook", string>> } = {}): GuideProviderNote[] {
  const plus = (provider: "Saily" | "Nomad" | "Airalo" | "Klook", text: string) => (options.extra?.[provider] ? `${text} ${options.extra[provider]}` : text);
  return [
    {
      provider: "Saily",
      localNetwork: "local partner networks",
      summary: plus("Saily", "Quotes real pounds, so the price you see is the price you pay. Saily says it doesn't restrict hotspot use, though your phone or the local network may."),
      watchOut: "Check when the plan starts counting down before you install it.",
    },
    {
      provider: "Nomad",
      localNetwork: networks.nomad,
      summary: plus("Nomad", `Prices in US dollars, which we convert at a rounded Bank of England rate, so your card may charge a little more. Nomad lists ${networks.nomad} for ${country} and says its eSIMs support hotspot use.`),
      watchOut: "Nomad plans have to be activated within 60 days of purchase, so don't buy months ahead.",
    },
    {
      provider: "Airalo",
      localNetwork: networks.airalo ?? "the network shown at checkout",
      summary: plus("Airalo", `We have no affiliate relationship with Airalo and list it anyway.${networks.airalo ? ` Its ${country} eSIM lists ${networks.airalo} as the main network.` : ""}`),
      watchOut: options.airaloDailyCapGb ? `Its unlimited plans slow to 1Mbps once you've used ${options.airaloDailyCapGb}GB in a day.` : "If you pick an unlimited plan, check its daily full-speed limit before you buy.",
    },
    {
      provider: "Klook",
      localNetwork: networks.klook ?? "the network named on Klook's page",
      summary: plus("Klook", "Klook's price changes with every combination of days and data, so we don't show one. The link opens Klook's own page for this country."),
      watchOut: "You get a QR code on a voucher. Install it on Wi-Fi before you travel and check when the countdown starts.",
    },
  ];
}

/** Setup steps for any destination. EU guides start by checking the UK plan, because it may already cover the trip. */
export function setupSteps(country: string, options: { checkPlanFirst?: boolean; extra?: Array<{ title: string; body: string }> } = {}) {
  return [
    ...(options.checkPlanFirst ? [{ title: "Check your UK plan first", body: `If your network includes ${country} and its roaming cap covers your trip, you may not need an eSIM at all. Your network's app shows both.` }] : []),
    { title: "Buy and install at home", body: "Install the eSIM on home Wi-Fi before you travel and keep the new line switched off until you land. Save the QR code or setup details in case you need to reinstall." },
    { title: "Turn off data roaming on your UK line", body: "Leave your UK SIM on so calls and bank texts still reach you, but switch its data roaming off so it can't run up charges." },
    { title: "Make the eSIM your data line", body: "Set the eSIM as the line for mobile data, turn off automatic data switching, and turn on data roaming for the eSIM only." },
    ...(options.extra ?? []),
  ];
}
