import type { DestinationGuide } from "./types.ts";

/**
 * Spain guide. Written 10 September 2026. UK network prices reflect published
 * tariffs and scenarios in lib/roaming.ts.
 */
export const spainGuide: DestinationGuide = {
  destination: "spain",
  keyword: "Spain eSIM",
  title: "Spain eSIM vs UK roaming: best travel data options (2026)",
  description:
    "Planning a trip to Spain? Compare UK mobile roaming rules from O2, EE, Vodafone and Three with prepaid Spain travel eSIMs from Airalo, Nomad, Saily and Klook to find the cheapest mobile data.",
  verdict: {
    heading: "Short answer: O2 and Tesco include free roaming; on EE, Three or Vodafone, a Spain eSIM is often cheaper.",
    body: "Because Spain is in the European Union, UK networks handle it under post-Brexit roaming rules. If you are with O2, iD Mobile, SMARTY or Tesco Mobile, your UK allowance works in Spain at no extra cost, up to fair-use caps (12GB to 30GB). However, if you are with EE (£2.47/day), Vodafone (£2.75/day or £16/8d pass) or Three (£2/day), roaming fees add up quickly over a week or fortnight. A prepaid travel eSIM starting around £3.50 gives you independent high-speed data on local networks like Movistar or Orange without risking roaming overage.",
  },
  facts: [
    {
      label: "Local networks",
      value: "Movistar (Telefónica), Orange (MasOrange), Vodafone España and Yoigo. Movistar and Orange offer the most extensive coastal and island coverage.",
    },
    {
      label: "5G coverage",
      value: "Widely deployed across mainland Spanish cities, the Balearic Islands (Mallorca, Ibiza, Menorca), and the Canary Islands on 3.5GHz and 700MHz bands.",
    },
    {
      label: "Island coverage",
      value: "The Balearics and Canary Islands share identical roaming terms and 4G/5G mobile infrastructure with mainland Spain across all major operators.",
    },
    {
      label: "EU fair-use caps",
      value: "Networks offering inclusive EU roaming enforce domestic caps: O2 limits at 25GB, iD Mobile at 30GB, SMARTY at 12GB, and giffgaff at 5GB per monthly plan.",
    },
    {
      label: "Airport Wi-Fi",
      value: "All major airports (Madrid MAD, Barcelona BCN, Malaga AGP, Palma PMI) provide free unlimited Aena public Wi-Fi via browser portal login.",
    },
    {
      label: "UK visitors",
      value: "Spain remains the UK's most visited overseas destination, with over 17 million British arrivals travelling for holidays and business every year.",
    },
  ],
  networks: {
    intro:
      "Spain is an EU destination. While EU regulations no longer legally compel UK operators to offer surcharge-free roaming post-Brexit, policies diverge dramatically: some networks maintain free roaming within limits, while others charge daily access fees.",
    rows: [
      {
        network: "ee",
        scenario: "ee-europe-new",
        headline: "Roam Abroad Pass: £2.47 per day or £15 monthly add-on for contracts joined from 7 July 2021",
        detail: "Uses your domestic UK data allowance up to a 50GB fair-use limit. Older grandfathered contracts started before 7 July 2021 retain surcharge-free EU roaming.",
      },
      {
        network: "o2",
        scenario: "o2-europe",
        headline: "O2 Europe Zone: Included at no extra charge on Pay Monthly and SIM-only tariffs",
        detail: "Roam freely using your UK minutes, texts, and data across mainland Spain, the Balearics, and the Canaries. A 25GB fair-use monthly ceiling applies, after which data costs £3.50/GB.",
      },
      {
        network: "vodafone",
        scenario: "vodafone-europe-pass",
        headline: "Vodafone Europe Pass: £16 for 8 days, £21 for 15 days, or £2.75 daily charge",
        detail: "Standard pay monthly plans without inclusive roaming pay £2.75/day or require a European Roaming Pass. A 25GB fair-use cap applies. Select Xtra plans with 4 roaming benefits include Spain free.",
      },
      {
        network: "three",
        scenario: "three-europe-pass",
        headline: "Go Roam in Europe: £2 daily charge or multi-day Go Roam passes",
        detail: "Access your UK allowance for £2 per day (passes: £5 for 3 days, £10 for 7 days, £18 for 14 days). A strict 12GB fair-use data cap applies per billing cycle, and hotspot use is prohibited on Go Roam passes.",
      },
      {
        network: "id-mobile",
        scenario: "id-europe",
        headline: "iD Roam Free: Included at no extra cost in Spain and 50 European destinations",
        detail: "Utilises your UK allowance with a fair-use data limit of up to 30GB per month (or your monthly plan limit if lower). Operates seamlessly on Spanish partner networks.",
      },
      {
        network: "sky-mobile",
        scenario: "sky-passport",
        headline: "Roaming Passport Plus: £2 per 24 hours to access your domestic allowance",
        detail: "Activates automatically when you make a call, send an SMS, or consume mobile data in Spain. Uses your UK data allowance up to a 25GB fair-use cap per billing period.",
      },
      {
        network: "giffgaff",
        scenario: "giffgaff-europe",
        headline: "EU Roaming included: Up to 5GB of your plan allowance per goodybag",
        detail: "Free roaming up to 5GB per monthly plan. If you exceed 5GB, data is charged at 10p/MB unless you renew or start a new goodybag early in your giffgaff account.",
      },
      {
        network: "smarty",
        scenario: "smarty-europe",
        headline: "EU Roaming included: Up to 12GB per month with no daily connection fees",
        detail: "Use your plan allowance freely in Spain up to a 12GB monthly cap. If you need more data, out-of-plan add-ons cost £1 per gigabyte with no expiration during your active plan.",
      },
      {
        network: "voxi",
        scenario: "voxi-europe",
        headline: "European Roaming Pass: £2.45 for 1 day, £4.50 for 2 days, £12.50 for 8 days, £17.50 for 15 days",
        detail: "VOXI requires a European pass to access mobile data in Spain. Unlimited Endless Social and Endless Video streaming passes do not function abroad; a 20GB cap applies.",
      },
      {
        network: "tesco-mobile",
        scenario: "tesco-europe",
        headline: "Home From Home: Included at no extra cost across 48 European destinations",
        detail: "Use your UK minutes, texts, and data allowance in Spain without surcharge. Clubcard deals and standard pay monthly contracts are covered by the domestic fair-use policy.",
      },
    ],
  },
  providers: {
    intro:
      "We compare four leading travel eSIM providers for Spain. Saily and Nomad stream live real-time pricing; Airalo prices are independently tracked; Klook offers daily and fixed-data packages directly on its portal.",
    notes: [
      {
        provider: "Airalo",
        localNetwork: "Orange / Movistar",
        summary: "Dependable multi-network coverage in Spain via Orange and Movistar, with fixed bundles from 1GB to 50GB and unlimited daily options.",
        bestFor: "Travelers wanting flexible fixed data or multi-week options on reliable national networks.",
        watchOut: "Unlimited data plans are subject to speed throttling down to 1Mbps once you pass 3GB of usage in a single day.",
        watchFor: "Fair use throttling on unlimited tiers after 3GB per day.",
      },
      {
        provider: "Nomad",
        localNetwork: "Movistar / Orange",
        summary: "Offers fast 4G and 5G connections on Movistar and Orange, priced in USD with transparent high-speed data allowances and hotspot capability.",
        bestFor: "Users wanting 5G speeds, hotspot tethering, and larger monthly data allotments.",
        watchOut: "Must be installed and activated within 60 days of purchase.",
        watchFor: "60-day activation window from purchase date.",
      },
      {
        provider: "Saily",
        localNetwork: "Local partner networks",
        summary: "Quotes directly in British pounds, eliminating foreign transaction fees. Offers simple setup through the Saily app with responsive customer support.",
        bestFor: "UK travellers who prefer fixed GBP checkout pricing and straightforward app-based management.",
        watchOut: "Activates immediately upon connecting to a supported Spanish network.",
        watchFor: "Immediate activation on first network connection in Spain.",
      },
      {
        provider: "Klook",
        localNetwork: "Movistar / Orange",
        summary: "Provides flexible daily allowances (1GB–3GB/day or unlimited) with QR code voucher delivery for travelers wanting daily resets.",
        bestFor: "Short holidaymakers and city breakers who want predictable daily data allowances.",
        watchOut: "Requires an unlocked handset and QR voucher redemption on reliable Wi-Fi prior to travel.",
        watchFor: "QR code redemption requires carrier-unlocked phone.",
      },
    ],
  },
  sections: [
    {
      id: "uk-roaming-rules-spain",
      heading: "Post-Brexit roaming in Spain: free on O2, costly on EE and Vodafone",
      paragraphs: [
        "Since the UK departed the European Union, UK mobile networks are no longer bound by European 'Roam Like at Home' rules. While this led to widespread fears that all roaming charges would return, the current reality for UK holidaymakers in Spain is split down the middle.",
        "Operators like O2, iD Mobile, SMARTY and Tesco Mobile have committed to inclusive EU roaming at no extra charge, making them ideal if you already subscribe to their plans. Conversely, EE, Vodafone and Three impose daily roaming charges or require multi-day passes that can add £14 to £35 to the cost of a typical holiday. If you are on one of these networks, buying an eSIM before departure often costs less than two days of carrier roaming fees.",
      ],
    },
    {
      id: "mainland-vs-islands",
      heading: "Network coverage across mainland Spain, the Balearics and the Canaries",
      paragraphs: [
        "Whether you are landing in Barcelona, Madrid, Seville, Mallorca, Ibiza, Tenerife, or Lanzarote, mobile infrastructure across Spain is modern and reliable. Movistar and Orange operate the densest mobile network grids, providing unbroken 4G and 5G coverage along the Costas and across holiday resorts.",
        "Vodafone España also offers dependable coverage in urban hubs and popular coastal zones. Travel eSIMs generally roam on either Movistar or Orange, meaning you will receive the exact same local coverage and signal priority as a native Spanish contract user.",
      ],
    },
    {
      id: "data-caps-and-fair-use",
      heading: "Beware UK fair-use roaming caps (5GB to 25GB)",
      paragraphs: [
        "Even when your UK network offers inclusive EU roaming, you rarely get to use your full domestic data allowance. Most UK providers implement strict fair-use roaming caps to prevent heavy data consumption abroad.",
        "For instance, giffgaff limits free roaming to just 5GB per monthly plan, SMARTY restricts EU data to 12GB, and O2 and Sky Mobile cap roaming at 25GB. If you stream music on the beach, upload high-resolution holiday photos, or use navigation daily, you can burn through a 5GB or 12GB cap rapidly. A secondary travel eSIM eliminates the risk of high out-of-plan overage charges.",
      ],
    },
    {
      id: "local-sim-vs-esim-spain",
      heading: "Buying a Spanish SIM in Spain vs ordering a travel eSIM",
      paragraphs: [
        "Under Spanish telecommunications law (Ley de Conservación de Datos), purchasing a physical prepaid SIM card inside Spain legally requires showing your passport and registering your personal details with the merchant. This process can involve lengthy queues at airport kiosks or searching for official operator stores in town.",
        "Prepaid travel eSIMs circumvent this hassle entirely. They can be bought online in minutes without submitting identity paperwork, installed immediately on home Wi-Fi, and configured to activate the moment your flight touches down on Spanish soil.",
      ],
    },
  ],
  setup: [
    {
      title: "Purchase and install your eSIM before flying",
      body: "Buy your Spain eSIM while connected to Wi-Fi at home. Add the eSIM profile using your provider's app or QR code, label it 'Spain eSIM', and keep data roaming turned off on the new line until departure.",
    },
    {
      title: "Prevent unexpected UK network roaming charges",
      body: "If your UK provider (such as EE, Vodafone, Three or Sky) charges daily connection fees in Europe, keep your UK SIM line on for banking SMS and OTPs, but disable 'Data Roaming' on that primary SIM card.",
    },
    {
      title: "Switch mobile data to your Spain eSIM upon arrival",
      body: "When your plane arrives in Spain, disable Airplane Mode, set your Spain eSIM as your primary Cellular Data line, and toggle on 'Data Roaming' for the eSIM profile to connect to Movistar or Orange.",
    },
  ],
  faq: [
    {
      question: "Does free EU roaming still work for UK travelers in Spain?",
      answer: "Yes, but only on certain UK mobile networks. O2, iD Mobile, SMARTY and Tesco Mobile include roaming in Spain within your domestic monthly plan up to their fair-use caps. EE, Vodafone, Three and Sky Mobile charge daily fees or require roaming passes.",
    },
    {
      question: "Which UK mobile networks charge for roaming in Spain?",
      answer: "EE charges £2.47 a day (or £15/month pass) on plans started after July 2021. Vodafone charges £2.75 a day or £16 for an 8-day pass on non-inclusive plans. Three charges £2 a day or sells Go Roam passes. Sky Mobile charges £2 per 24 hours.",
    },
    {
      question: "Do Spain travel eSIMs cover Mallorca, Ibiza and Tenerife?",
      answer: "Yes. The Balearic Islands (Mallorca, Ibiza, Menorca, Formentera) and the Canary Islands (Tenerife, Gran Canaria, Lanzarote, Fuerteventura) are political territories of Spain and use the same national telecom networks as the mainland.",
    },
    {
      question: "Will I get 5G speeds on a Spain eSIM?",
      answer: "Most modern Spain travel eSIMs offer 5G access in major cities, towns, and popular coastal strips where partner networks (like Movistar and Orange) have active 5G cells, falling back to nationwide high-speed 4G LTE elsewhere.",
    },
    {
      question: "Can I use WhatsApp and hotspot tethering on a Spain eSIM?",
      answer: "Yes. WhatsApp, FaceTime, and Google Maps work normally over mobile data. Most travel eSIM providers, including Saily and Nomad, allow personal hotspot sharing without restrictions, unlike Three's Go Roam passes which forbid tethering.",
    },
    {
      question: "Do I need a passport or ID to buy a Spain travel eSIM?",
      answer: "No. Unlike buying a physical Spanish prepaid SIM card at an airport or shop in Madrid or Barcelona, travel data eSIMs do not require identity verification or passport registration under local Spanish law.",
    },
  ],
  related: ["france", "portugal", "italy", "greece", "turkey"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
