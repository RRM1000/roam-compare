import type { DestinationGuide } from "./types.ts";

/**
 * Portugal guide. Written 10 September 2026. UK network prices reflect published
 * tariffs and scenarios in lib/roaming.ts.
 */
export const portugalGuide: DestinationGuide = {
  destination: "portugal",
  keyword: "Portugal eSIM",
  title: "Portugal eSIM vs UK roaming: best travel data options (2026)",
  description:
    "Visiting Portugal, Madeira or the Azores? Compare UK roaming charges across EE, O2, Vodafone and Three with Portugal travel eSIMs from Airalo, Nomad, Saily and Klook for Lisbon, Porto and the Algarve.",
  verdict: {
    heading: "Short answer: O2 and Tesco include free roaming in Portugal; EE and Vodafone charge daily fees.",
    body: "Portugal is an EU destination, so UK operators apply European roaming rules. O2, iD Mobile, SMARTY and Tesco Mobile include Portugal, Madeira and the Azores in your domestic UK monthly allowance with no daily connection fees, though fair-use limits apply (5GB to 30GB). However, if your contract is with EE (£2.47/day), Vodafone (£2.75/day) or Three (£2/day), daily roaming charges quickly mount over an Algarve holiday or city break in Lisbon. A Portugal travel eSIM starting around £3.50 connects you directly to MEO, NOS or Vodafone Portugal with fast 4G/5G speeds and zero carrier roaming fees.",
  },
  facts: [
    {
      label: "Local networks",
      value: "MEO (Altice), NOS, and Vodafone Portugal. MEO and NOS offer exceptionally high 5G and 4G coverage across mainland Portugal, Madeira, and the Azores.",
    },
    {
      label: "5G rollout",
      value: "Available extensively throughout Lisbon, Porto, Braga, Coimbra, and along the entire Algarve coastline on 3.6GHz and 700MHz spectrum.",
    },
    {
      label: "Madeira and Azores",
      value: "Both autonomous island regions share identical mobile network infrastructure and UK roaming rules with mainland Portugal.",
    },
    {
      label: "EU fair-use caps",
      value: "Inclusive UK roaming providers apply domestic caps: O2 limits EU roaming to 25GB, iD Mobile to 30GB, SMARTY to 12GB, and giffgaff to 5GB per monthly plan.",
    },
    {
      label: "Airport Wi-Fi",
      value: "Lisbon Portela (LIS), Porto Francisco Sá Carneiro (OPO), and Faro (FAO) airports provide free unlimited ANA airport Wi-Fi.",
    },
    {
      label: "UK visitors",
      value: "Over 3 million visits are made annually from the UK to Portugal, drawn by the Algarve beaches, golf resorts, and historic cities.",
    },
  ],
  networks: {
    intro:
      "Portugal is an EU destination. While EU regulations no longer legally govern UK mobile networks post-Brexit, providers differ: several allow free roaming up to fair-use thresholds, while major networks charge daily fees.",
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
        detail: "Roam in Portugal, Madeira and the Azores without extra charge using your UK allowance. A 25GB fair-use monthly ceiling applies; exceeding 25GB costs £3.50 per gigabyte.",
      },
      {
        network: "vodafone",
        scenario: null,
        headline: "Vodafone Europe Roaming: £2.75 daily fee or multi-day passes (£16 for 8d, £21 for 15d)",
        detail: "Standard pay monthly plans charge £2.75/day or require a European Roaming Pass. A 25GB fair-use cap applies. Select Xtra plans with 4 roaming benefits include Portugal free.",
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
        headline: "iD Roam Free: Included at no extra cost across Portugal and 50 EU destinations",
        detail: "Utilises your UK allowance with a fair-use data limit of up to 30GB per month (or your monthly plan limit if lower). Connects seamlessly with Portuguese partner networks.",
      },
      {
        network: "sky-mobile",
        scenario: null,
        headline: "Roaming Passport Plus: £2 per 24 hours to access your UK allowance",
        detail: "Triggers automatically when you make a call, send an SMS, or use mobile data in Portugal. Draws from your domestic data allowance up to a 25GB fair-use cap.",
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
        detail: "Roam in Portugal using your normal UK allowance up to a 12GB monthly cap. If you need additional data, add-ons cost £1 per gigabyte with no expiration during your active plan.",
      },
      {
        network: "voxi",
        scenario: null,
        headline: "European Roaming Pass: £2.45 for 1 day, £4.50 for 2 days, £12.50 for 8 days, £17.50 for 15 days",
        detail: "VOXI requires a European pass to access mobile data in Portugal. Endless Social and Endless Video streaming benefits do not apply abroad; a 20GB cap applies.",
      },
      {
        network: "tesco-mobile",
        scenario: null,
        headline: "Home From Home: Included at no extra cost across 48 European destinations",
        detail: "Use your UK minutes, texts, and data allowance in Portugal without surcharge. Clubcard deals and standard pay monthly contracts are covered by the fair-use policy.",
      },
    ],
  },
  providers: {
    intro:
      "We compare four major travel eSIM providers for Portugal. Saily and Nomad stream live real-time pricing; Airalo prices are independently checked; Klook offers flexible daily and fixed packages.",
    notes: [
      {
        provider: "Airalo",
        localNetwork: "MEO / NOS",
        summary: "High-speed mobile data across Portugal, Madeira and the Azores on MEO and NOS, with bundles from 1GB to 50GB and unlimited options.",
        bestFor: "Travellers visiting Lisbon, Porto or relaxing along the Algarve coastline.",
        watchOut: "Unlimited data plans throttle speeds to 1Mbps once you pass 3GB of daily consumption.",
        watchFor: "Fair-use speed reduction to 1Mbps after 3GB per day on unlimited plans.",
      },
      {
        provider: "Nomad",
        localNetwork: "MEO / Vodafone Portugal",
        summary: "Provides 4G and 5G connectivity on MEO and Vodafone, priced in USD with transparent high-speed data allowances and hotspot capability.",
        bestFor: "Digital nomads and holidaymakers needing 5G performance, mobile hotspot capability, and large data allowances.",
        watchOut: "Must be activated within 60 days of purchase date.",
        watchFor: "60-day activation window from purchase.",
      },
      {
        provider: "Saily",
        localNetwork: "Local partner networks",
        summary: "Displays checkout prices directly in GBP, avoiding bank foreign exchange fees. Simple in-app activation with dedicated customer support.",
        bestFor: "UK travellers who want fixed British pound pricing and quick app-based management.",
        watchOut: "Activates automatically the moment the profile connects to a Portuguese network.",
        watchFor: "Immediate activation upon first network connection in Portugal.",
      },
      {
        provider: "Klook",
        localNetwork: "MEO / NOS",
        summary: "Offers flexible day-based packages (1GB–3GB/day or unlimited) with QR code voucher delivery for convenient daily refreshes.",
        bestFor: "Weekend breaks and short holidays where daily data allocations match trip length.",
        watchOut: "Handset must be carrier-unlocked; voucher QR code should be redeemed prior to arrival.",
        watchFor: "Handset must be unlocked for QR code voucher activation.",
      },
    ],
  },
  sections: [
    {
      id: "uk-roaming-rules-portugal",
      heading: "Post-Brexit roaming in Portugal: free on O2, pricey on EE and Vodafone",
      paragraphs: [
        "Following Brexit, UK mobile operators are free to set their own roaming policies across European destinations, including Portugal. This creates a sharp divide between networks for UK tourists heading to Lisbon, Porto, or the Algarve.",
        "O2, iD Mobile, SMARTY, and Tesco Mobile continue to include Portugal roaming within domestic plan allowances without daily connection fees. However, EE (£2.47/day), Vodafone (£2.75/day), Three (£2/day) and Sky Mobile (£2/24h) charge daily fees that accumulate quickly over a 7-day or 14-day holiday. If your carrier charges daily fees, a prepaid travel eSIM is usually substantially cheaper.",
      ],
    },
    {
      id: "network-coverage-portugal-islands",
      heading: "Mobile coverage across mainland Portugal, Madeira and the Azores",
      paragraphs: [
        "Portugal boasts high-speed telecommunications infrastructure operated primarily by MEO, NOS, and Vodafone Portugal. Coverage in urban hubs like Lisbon and Porto is exceptional, and 5G networks extend seamlessly along the entire southern Algarve coastline and major motorway routes.",
        "Crucially, the autonomous island archipelagos of Madeira and the Azores share the same national mobile operators and roaming agreements as the mainland. Travel eSIMs connecting via MEO or NOS provide full, robust coverage whether you are hiking volcanic trails in São Miguel or touring Funchal.",
      ],
    },
    {
      id: "fair-use-limits-portugal",
      heading: "Navigating UK fair-use roaming limits on your Portuguese trip",
      paragraphs: [
        "Even on UK providers that offer surcharge-free roaming in Portugal, you cannot use your full domestic data allowance without limits. Operators enforce fair-use roaming policies to manage data wholesale costs.",
        "Under these policies, giffgaff limits roaming to 5GB per goodybag, SMARTY caps data at 12GB, and O2 and Sky enforce a 25GB monthly ceiling. Streaming holiday videos, using navigation while driving, and remote work hotspotting can easily deplete these allowances. Exceeding your limit triggers expensive per-megabyte charges, which a secondary travel eSIM safely prevents.",
      ],
    },
    {
      id: "local-sim-vs-esim-portugal",
      heading: "Buying a Portuguese SIM at Lisbon or Faro vs getting an eSIM",
      paragraphs: [
        "Purchasing a physical prepaid SIM card upon landing at Lisbon Portela or Faro Airport requires queuing at an operator kiosk or airport convenience store, presenting your passport for identity verification, and swapping out your UK SIM.",
        "A travel eSIM offers a seamless digital alternative. You can purchase and set up your eSIM profile at home before departure, retain your UK SIM for banking texts and two-factor authentication, and connect instantly to local high-speed mobile data the moment your flight lands in Portugal.",
      ],
    },
  ],
  setup: [
    {
      title: "Order and install your Portugal eSIM at home",
      body: "Set up your travel eSIM on home Wi-Fi before heading to the airport. Use the provider's app or scan the QR code to install the profile, label it 'Portugal Travel', and keep roaming off on this profile until departure.",
    },
    {
      title: "Disable data roaming on your UK SIM",
      body: "If your UK provider (such as EE, Vodafone, Three or Sky) charges daily connection fees in Europe, keep your primary SIM active for two-factor authentication SMS, but switch off 'Data Roaming' on that SIM.",
    },
    {
      title: "Enable mobile data on your Portugal eSIM on arrival",
      body: "Upon landing in Lisbon, Porto, Faro or Funchal, turn off Airplane Mode, select the Portugal eSIM for Cellular Data, and enable Data Roaming for that profile to connect to MEO or NOS.",
    },
  ],
  faq: [
    {
      question: "Do UK phones work in Portugal without extra roaming charges?",
      answer: "Yes, provided you are on a UK network that includes free EU roaming, such as O2, iD Mobile, SMARTY, or Tesco Mobile. EE, Vodafone, Three and Sky Mobile levy daily charges or require roaming passes.",
    },
    {
      question: "Which UK mobile networks charge daily roaming fees in Portugal?",
      answer: "EE charges £2.47 per day on plans started after July 2021. Vodafone charges £2.75 per day or £16 for 8 days. Three charges £2 per day or sells Go Roam passes. Sky Mobile charges £2 per 24 hours.",
    },
    {
      question: "Does a Portugal travel eSIM cover Madeira and the Azores?",
      answer: "Yes. Madeira, Porto Santo, and the nine islands of the Azores are autonomous regions of Portugal and use the same national mobile networks (MEO, NOS, Vodafone) as mainland Portugal.",
    },
    {
      question: "Is 5G widely available across Portugal on travel eSIMs?",
      answer: "Yes, 5G is widely deployed across Lisbon, Porto, Coimbra, Braga, and the entire Algarve resort coastline. Supported eSIM profiles will connect to local 5G cells automatically.",
    },
    {
      question: "Can I use WhatsApp and tether other devices with a Portugal eSIM?",
      answer: "Yes. WhatsApp, FaceTime, and Google Maps work normally over mobile data. Most travel eSIM providers allow mobile hotspot sharing, unlike Three Go Roam passes which ban tethering.",
    },
    {
      question: "Do I need a passport or Portuguese tax ID to buy an eSIM?",
      answer: "No. Unlike purchasing a local physical SIM card in a shop in Lisbon, travel data eSIMs do not require passport verification or Portuguese tax number registration.",
    },
  ],
  related: ["spain", "france", "italy", "morocco", "germany"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
