import type { DestinationGuide } from "./types.ts";

/**
 * France guide. Written 10 September 2026. UK network prices reflect published
 * tariffs and scenarios in lib/roaming.ts.
 */
export const franceGuide: DestinationGuide = {
  destination: "france",
  keyword: "France eSIM",
  title: "France eSIM vs UK roaming: best travel data options (2026)",
  description:
    "Visiting France? Compare UK mobile roaming charges from EE, O2, Vodafone and Three with prepaid France travel eSIMs from Airalo, Nomad, Saily and Klook for Paris, the Riviera and beyond.",
  verdict: {
    heading: "Short answer: O2 and Tesco include free roaming in France; on EE or Vodafone, an eSIM is cheaper.",
    body: "Because France is in the EU, UK networks apply their European roaming policies. If you are on O2, iD Mobile, SMARTY or Tesco Mobile, your UK allowance works in France at no extra charge up to fair-use caps (12GB to 30GB). However, customers on EE (£2.47/day), Vodafone (£2.75/day) or Three (£2/day) face daily surcharges that mount quickly on holidays or city breaks. A France travel eSIM from £3.50 delivers high-speed local data on networks like Orange or Bouygues without carrier fees or roaming cap headaches.",
  },
  facts: [
    {
      label: "Local networks",
      value: "Orange, SFR, Bouygues Telecom and Free Mobile. Orange and Bouygues consistently lead in French high-speed data coverage and reliability.",
    },
    {
      label: "5G rollout",
      value: "Extensively available across Paris, Lyon, Marseille, Nice, Bordeaux, and along major TGV rail lines, using 3.5GHz mid-band frequencies.",
    },
    {
      label: "Overseas territories",
      value: "Note that French overseas territories (like Guadeloupe, Martinique, Reunion) may be classified under different roaming zones than metropolitan France.",
    },
    {
      label: "EU fair-use caps",
      value: "Inclusive UK roaming providers apply domestic caps: O2 limits EU roaming to 25GB, iD Mobile to 30GB, SMARTY to 12GB, and giffgaff to 5GB per monthly plan.",
    },
    {
      label: "Airport and train Wi-Fi",
      value: "Paris Charles de Gaulle (CDG), Orly (ORY), and SNCF TGV high-speed trains provide free public Wi-Fi, useful for eSIM setup and ticket retrieval.",
    },
    {
      label: "UK visitors",
      value: "France is the second most popular overseas destination for British travellers, with over 10 million visits annually for tourism, city breaks and ski trips.",
    },
  ],
  networks: {
    intro:
      "France is an EU destination. While EU 'Roam Like at Home' regulations no longer legally govern UK networks post-Brexit, providers differ: several allow free roaming up to fair-use thresholds, while major networks charge daily fees.",
    rows: [
      {
        network: "ee",
        scenario: "ee-europe-new",
        headline: "Roam Abroad Pass: £2.47 per day or £15 monthly add-on for contracts joined from 7 July 2021",
        detail: "Uses your domestic UK data allowance up to a 50GB fair-use limit. Older grandfathered contracts started before 7 July 2021 retain surcharge-free EU roaming.",
      },
      {
        network: "o2",
        scenario: null,
        headline: "O2 Europe Zone: Included at no extra charge on Pay Monthly and SIM-only plans",
        detail: "Roam in France without extra charge using your UK allowance. A 25GB fair-use monthly ceiling applies; exceeding 25GB costs £3.50 per gigabyte.",
      },
      {
        network: "vodafone",
        scenario: null,
        headline: "Vodafone Europe Roaming: £2.75 daily fee or multi-day passes (£16 for 8d, £21 for 15d)",
        detail: "Standard pay monthly plans charge £2.75/day or require a European Roaming Pass. A 25GB fair-use cap applies. Select Xtra plans with 4 roaming benefits include France at no extra charge.",
      },
      {
        network: "three",
        scenario: null,
        headline: "Go Roam in Europe: £2 daily charge or discounted Go Roam multi-day passes",
        detail: "Daily charge of £2 to access your domestic allowance (or passes: £5 for 3 days, £10 for 7 days, £18 for 14 days). Data is capped at 12GB abroad per billing cycle; hotspot tethering is prohibited on passes.",
      },
      {
        network: "id-mobile",
        scenario: null,
        headline: "iD Roam Free: Included at no extra cost across France and 50 EU destinations",
        detail: "Utilises your UK allowance with a fair-use data limit of up to 30GB per month (or your monthly plan limit if lower). Connects seamlessly with French partner networks.",
      },
      {
        network: "sky-mobile",
        scenario: null,
        headline: "Roaming Passport Plus: £2 per 24 hours to access your UK allowance",
        detail: "Triggers automatically when you make a call, send an SMS, or use mobile data in France. Draws from your domestic data allowance up to a 25GB fair-use cap.",
      },
      {
        network: "giffgaff",
        scenario: null,
        headline: "EU Roaming included: Up to 5GB of your plan allowance per goodybag",
        detail: "Free roaming up to a strict 5GB fair-use ceiling per plan. Data beyond 5GB is charged at 10p/MB unless you start your next goodybag early in the giffgaff app.",
      },
      {
        network: "smarty",
        scenario: null,
        headline: "EU Roaming included: Up to 12GB per month with no daily connection fees",
        detail: "Roam in France using your normal UK allowance up to a 12GB monthly cap. If you need additional data, add-ons cost £1 per gigabyte with no expiration during your active plan.",
      },
      {
        network: "voxi",
        scenario: null,
        headline: "European Roaming Pass: £2.45 for 1 day, £4.50 for 2 days, £12.50 for 8 days, £17.50 for 15 days",
        detail: "VOXI requires a European pass to access mobile data in France. Endless Social and Endless Video streaming benefits do not apply abroad; a 20GB cap applies.",
      },
      {
        network: "tesco-mobile",
        scenario: null,
        headline: "Home From Home: Included at no extra cost across 48 European destinations",
        detail: "Use your UK minutes, texts, and data allowance in France without surcharge. Clubcard deals and standard pay monthly contracts are covered by the fair-use policy.",
      },
    ],
  },
  providers: {
    intro:
      "We compare four major travel eSIM providers for France. Saily and Nomad stream live real-time pricing; Airalo prices are independently checked; Klook offers flexible daily and fixed packages.",
    notes: [
      {
        provider: "Airalo",
        localNetwork: "Orange / Bouygues Telecom",
        summary: "Reliable high-speed coverage across France on Orange and Bouygues Telecom, featuring data plans from 1GB to 50GB and unlimited daily packages.",
        bestFor: "Travellers seeking flexible data tiers on France's top national mobile networks.",
        watchOut: "Unlimited data plans throttle speeds to 1Mbps once you pass 3GB of daily consumption.",
        watchFor: "Fair-use throttling after 3GB per day on unlimited plans.",
      },
      {
        provider: "Nomad",
        localNetwork: "Orange / SFR",
        summary: "Provides 4G and 5G connectivity on Orange and SFR, priced in USD with transparent high-speed data allowances and hotspot capability.",
        bestFor: "Heavy users needing 5G performance, mobile hotspot capability, and large data allowances.",
        watchOut: "Must be activated within 60 days of purchase date.",
        watchFor: "60-day activation validity window from purchase.",
      },
      {
        provider: "Saily",
        localNetwork: "Local partner networks",
        summary: "Displays checkout prices directly in GBP, avoiding bank foreign exchange fees. Simple in-app activation with dedicated customer support.",
        bestFor: "UK travellers who want fixed British pound pricing and quick app-based management.",
        watchOut: "Activates automatically the moment the profile connects to a French network.",
        watchFor: "Immediate activation upon first network ping in France.",
      },
      {
        provider: "Klook",
        localNetwork: "Orange / Bouygues Telecom",
        summary: "Offers flexible day-based packages (1GB–3GB/day or unlimited) delivered via QR code vouchers for convenient daily refreshes.",
        bestFor: "Weekend breaks and short holidays where daily data allocations match trip length.",
        watchOut: "Handset must be carrier-unlocked; voucher QR code should be redeemed prior to arrival.",
        watchFor: "Carrier-unlocked phone required for QR code voucher activation.",
      },
    ],
  },
  sections: [
    {
      id: "france-roaming-costs",
      heading: "Post-Brexit roaming in France: which UK networks still include it?",
      paragraphs: [
        "Since Brexit, the European Union's mandated 'Roam Like at Home' protection no longer legally binds UK telecom providers. As a result, roaming fees for a weekend in Paris or a week on the Côte d'Azur depend heavily on which UK provider you use.",
        "O2, iD Mobile, SMARTY, and Tesco Mobile still treat France as an included EU roaming destination at no additional daily fee, subject to fair-use data limits. In contrast, EE, Vodafone, Three and Sky Mobile charge daily access fees or pass rates that can add £14 to £35 to a family or solo getaway. If your UK network charges daily, an eSIM is nearly always the more cost-effective choice.",
      ],
    },
    {
      id: "french-networks-5g",
      heading: "Mobile coverage across France: cities, rural areas and the Alps",
      paragraphs: [
        "France benefits from four major nationwide mobile operators: Orange, Bouygues Telecom, SFR, and Free Mobile. In independent network audits, Orange and Bouygues consistently lead in overall data speed, network consistency, and rural 4G/5G reach.",
        "Major French cities, high-speed TGV rail corridors, and key Alpine ski valleys have dense 4G LTE and growing 5G reception. Travel eSIMs connecting via Orange or Bouygues ensure dependable performance whether you are navigating the Paris Métro, driving through Normandy, or exploring Provence.",
      ],
    },
    {
      id: "data-limits-caps",
      heading: "Understanding UK fair-use limits when visiting France",
      paragraphs: [
        "Even on UK operators that maintain free roaming in France, strict fair-use roaming allowances apply. For example, giffgaff restricts roaming data to 5GB per bundle, SMARTY limits you to 12GB, and O2 and Sky enforce a 25GB monthly ceiling.",
        "If you rely heavily on navigation apps, upload videos of sightseeing, or hotspot your laptop or tablet, you can reach these thresholds quickly. Once exceeded, overage charges can cost up to 10p per megabyte (£100 per gigabyte). Adding a prepaid travel eSIM gives you a clean, separate data allowance with zero overage risk.",
      ],
    },
    {
      id: "local-sim-tabac",
      heading: "Buying a SIM card in France vs using an instant eSIM",
      paragraphs: [
        "In France, buying a local prepaid physical SIM from a Relay station shop, tobacconist (Tabac), or mobile boutique requires presenting a valid passport under French anti-terrorism regulations. Physical SIMs also require swapping out your UK plastic SIM card.",
        "A travel eSIM eliminates the paperwork and queues entirely. You can purchase and install the digital profile in minutes from home, keep your physical UK SIM active in your phone for banking texts and two-factor authentication, and land in France fully connected.",
      ],
    },
  ],
  setup: [
    {
      title: "Order and install your France eSIM at home",
      body: "Set up your travel eSIM on home Wi-Fi before departure. Use your provider's app or scan the QR code to install the profile, label it 'France Travel', and keep roaming off on this line until travel.",
    },
    {
      title: "Turn off data roaming on your UK line",
      body: "If your UK network (such as EE, Vodafone, Three or Sky) charges daily fees in Europe, keep your primary SIM switched on for two-factor authentication SMS, but switch off 'Data Roaming' on that SIM.",
    },
    {
      title: "Activate data on your France eSIM on arrival",
      body: "Upon arrival in France (Eurostar, ferry, or flight), disable Airplane Mode, select the France eSIM for Cellular Data, and enable Data Roaming for that profile to connect to Orange or Bouygues.",
    },
  ],
  faq: [
    {
      question: "Do UK phones work in France without roaming charges?",
      answer: "Only if you are with a UK network that includes free EU roaming, such as O2, iD Mobile, SMARTY, or Tesco Mobile. EE, Vodafone, Three and Sky Mobile charge daily roaming fees (£2 to £2.75/day) or require prepaid passes.",
    },
    {
      question: "Which UK mobile networks charge daily roaming fees in France?",
      answer: "EE charges £2.47 per day on plans started after July 2021. Vodafone charges £2.75 per day or £16 for 8 days. Three charges £2 per day or sells Go Roam passes. Sky Mobile charges £2 per 24 hours.",
    },
    {
      question: "Will my France travel eSIM work on the Eurostar and in ski resorts?",
      answer: "Yes. Major French operators like Orange and Bouygues offer continuous 4G coverage throughout the Channel Tunnel rail corridor, along high-speed TGV routes, and across major Alpine ski domains like Chamonix and Les Trois Vallées.",
    },
    {
      question: "Is 5G widely available across France on travel eSIMs?",
      answer: "Yes, 5G is widely deployed across Paris, Nice, Lyon, Marseille, Toulouse, and other metropolitan hubs. Providers like Nomad and Airalo offer access to local 5G frequencies where agreements exist.",
    },
    {
      question: "Can I use WhatsApp and tether other devices with a France eSIM?",
      answer: "Yes. Voice and video calls on WhatsApp, FaceTime, and Skype operate normally on data. Most eSIM providers support personal hotspot tethering, whereas UK roaming passes from Three explicitly prohibit tethering.",
    },
    {
      question: "Do I need identification or a French address to buy a travel eSIM?",
      answer: "No. Unlike buying a physical SIM card in a French shop or Tabac which mandates passport registration under French law, international travel data eSIMs do not require identity verification.",
    },
  ],
  related: ["spain", "italy", "germany", "portugal", "netherlands"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
