import type { DestinationGuide } from "./types.ts";

/**
 * Italy guide. Written 10 September 2026. UK network prices reflect published
 * tariffs and scenarios in lib/roaming.ts.
 */
export const italyGuide: DestinationGuide = {
  destination: "italy",
  keyword: "Italy eSIM",
  title: "Italy eSIM vs UK roaming: best travel data options (2026)",
  description:
    "Heading to Italy? Compare UK mobile roaming costs across EE, O2, Vodafone and Three with travel eSIMs from Airalo, Nomad, Saily and Klook for Rome, Venice, Florence and the Amalfi Coast.",
  verdict: {
    heading: "Short answer: O2 and Tesco include free roaming in Italy; EE, Vodafone and Three charge extra.",
    body: "Italy is an EU country, meaning UK operators treat it under post-Brexit roaming terms. Customers on O2, iD Mobile, SMARTY and Tesco Mobile enjoy inclusive roaming using their domestic UK allowance, subject to fair-use data caps (5GB to 30GB). If your contract is with EE (£2.47/day), Vodafone (£2.75/day) or Three (£2/day), daily fees can quickly add £14 to £38 to a holiday. A prepaid Italy travel eSIM from £3.50 connects directly to major Italian networks like TIM or Vodafone Italia with zero carrier roaming fees.",
  },
  facts: [
    {
      label: "Local networks",
      value: "TIM (Telecom Italia), Vodafone Italia, WindTre and Iliad. TIM and Vodafone offer the strongest coverage in rural Tuscany, the Amalfi Coast and the Dolomites.",
    },
    {
      label: "5G rollout",
      value: "Active in all primary metropolitan areas including Rome, Milan, Florence, Naples, Turin and Bologna, operating primarily on 3.7GHz frequencies.",
    },
    {
      label: "Island coverage",
      value: "Sicily, Sardinia, Capri and Ischia are fully covered by standard Italian national mobile networks with seamless 4G/5G connectivity.",
    },
    {
      label: "EU fair-use caps",
      value: "Inclusive UK roaming plans apply domestic caps: O2 caps at 25GB, iD Mobile at 30GB, SMARTY at 12GB, and giffgaff limits roaming to 5GB per monthly plan.",
    },
    {
      label: "Airport Wi-Fi",
      value: "Rome Fiumicino (FCO), Milan Malpensa (MXP), and Venice Marco Polo (VCE) offer free high-speed public Wi-Fi without time restrictions.",
    },
    {
      label: "UK visitors",
      value: "Over 5 million visits are made each year from the UK to Italy for summer holidays, cultural city breaks and ski trips.",
    },
  ],
  networks: {
    intro:
      "Italy is an EU destination. UK mobile operators handle roaming differently following Brexit: some continue to offer free inclusive roaming up to strict fair-use limits, while others enforce daily roaming fees.",
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
        detail: "Roam in Italy without extra charge using your UK allowance. A 25GB fair-use monthly ceiling applies; exceeding 25GB costs £3.50 per gigabyte.",
      },
      {
        network: "vodafone",
        scenario: null,
        headline: "Vodafone Europe Roaming: £2.75 daily fee or multi-day passes (£16 for 8d, £21 for 15d)",
        detail: "Standard pay monthly plans charge £2.75/day or require a European Roaming Pass. A 25GB fair-use cap applies. Select Xtra plans with 4 roaming benefits include Italy free.",
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
        headline: "iD Roam Free: Included at no extra cost across Italy and 50 EU destinations",
        detail: "Utilises your UK allowance with a fair-use data limit of up to 30GB per month (or your monthly plan limit if lower). Connects seamlessly with Italian partner networks.",
      },
      {
        network: "sky-mobile",
        scenario: null,
        headline: "Roaming Passport Plus: £2 per 24 hours to access your UK allowance",
        detail: "Triggers automatically when you make a call, send an SMS, or use mobile data in Italy. Draws from your domestic data allowance up to a 25GB fair-use cap.",
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
        detail: "Roam in Italy using your normal UK allowance up to a 12GB monthly cap. If you need additional data, add-ons cost £1 per gigabyte with no expiration during your active plan.",
      },
      {
        network: "voxi",
        scenario: null,
        headline: "European Roaming Pass: £2.45 for 1 day, £4.50 for 2 days, £12.50 for 8 days, £17.50 for 15 days",
        detail: "VOXI requires a European pass to access mobile data in Italy. Endless Social and Endless Video streaming benefits do not apply abroad; a 20GB cap applies.",
      },
      {
        network: "tesco-mobile",
        scenario: null,
        headline: "Home From Home: Included at no extra cost across 48 European destinations",
        detail: "Use your UK minutes, texts, and data allowance in Italy without surcharge. Clubcard deals and standard pay monthly contracts are covered by the fair-use policy.",
      },
    ],
  },
  providers: {
    intro:
      "We compare four major travel eSIM providers for Italy. Saily and Nomad stream live real-time pricing; Airalo prices are independently checked; Klook offers flexible daily and fixed packages.",
    notes: [
      {
        provider: "Airalo",
        localNetwork: "TIM / Vodafone Italia",
        summary: "High-speed coverage across Italy on TIM and Vodafone Italia, featuring fixed data bundles from 1GB to 50GB and unlimited daily plans.",
        bestFor: "Travellers wanting reliable mobile data across Italian cities, historical centres and islands.",
        watchOut: "Unlimited data plans throttle speeds to 1Mbps once you pass 3GB of daily consumption.",
        watchFor: "Fair-use throttling after 3GB per day on unlimited plans.",
      },
      {
        provider: "Nomad",
        localNetwork: "TIM / Vodafone Italia",
        summary: "Delivers 4G and 5G connectivity on TIM and Vodafone, priced in USD with transparent high-speed data allowances and hotspot capability.",
        bestFor: "Power users needing fast 5G data, mobile hotspot tethering, and larger multi-week allowances.",
        watchOut: "Must be activated within 60 days of purchase date.",
        watchFor: "60-day activation window from date of purchase.",
      },
      {
        provider: "Saily",
        localNetwork: "Local partner networks",
        summary: "Displays checkout prices directly in GBP, avoiding bank foreign exchange fees. Simple in-app activation with dedicated customer support.",
        bestFor: "UK travellers who want fixed British pound pricing and quick app-based management.",
        watchOut: "Activates automatically the moment the profile connects to an Italian network.",
        watchFor: "Immediate activation upon first network connection in Italy.",
      },
      {
        provider: "Klook",
        localNetwork: "TIM / WindTre",
        summary: "Provides flexible daily-allowance bundles (1GB–3GB/day or unlimited) with QR code voucher delivery for travelers wanting daily resets.",
        bestFor: "Sightseers and city breakers looking for convenient daily data refreshes.",
        watchOut: "Requires a carrier-unlocked phone and QR voucher setup prior to arrival.",
        watchFor: "Handset must be carrier-unlocked for QR voucher activation.",
      },
    ],
  },
  sections: [
    {
      id: "uk-roaming-rules-italy",
      heading: "Post-Brexit roaming in Italy: which UK networks charge daily fees?",
      paragraphs: [
        "Since the UK left the European Union, UK mobile networks are no longer required to provide free roaming across EU destinations. If you are travelling to Italy, your costs will vary significantly depending on which mobile provider you use.",
        "O2, iD Mobile, SMARTY, and Tesco Mobile maintain inclusive roaming for Italy within your existing monthly plan, subject to domestic fair-use caps. In contrast, EE (£2.47/day), Vodafone (£2.75/day), Three (£2/day) and Sky Mobile (£2/24h) charge daily fees. For a 10-day trip exploring Florence, Venice and Rome, network roaming passes can add £20 to £30 to your expenses, whereas a 10GB Italy travel eSIM costs a fraction of that amount.",
      ],
    },
    {
      id: "coverage-across-italy",
      heading: "Network coverage: Northern cities, Tuscany, the South and the Islands",
      paragraphs: [
        "Italy has four nationwide infrastructure operators: TIM, Vodafone Italia, WindTre, and Iliad. TIM and Vodafone operate the most extensive rural and coastal cell grids, providing reliable connectivity through winding Tuscan roads, the Amalfi coast, and alpine valleys.",
        "Major Italian tourist hotspots and high-speed Frecciarossa rail corridors enjoy fast 4G and widespread 5G coverage. Travel eSIM profiles from Airalo and Nomad connect via TIM and Vodafone, giving you premium signal strength whether you are visiting the Colosseum or relaxing in Sicily.",
      ],
    },
    {
      id: "fair-use-roaming-caps",
      heading: "Watch out for UK fair-use roaming caps in Italy",
      paragraphs: [
        "Even when your UK network offers surcharge-free roaming, you cannot use an unlimited UK data allowance in Italy. All UK operators enforce fair-use roaming limits to control international data costs.",
        "For example, giffgaff limits inclusive roaming to 5GB per bundle, SMARTY limits data to 12GB, and O2 and Sky enforce a 25GB monthly ceiling. If you exceed your cap while travelling, networks will throttle your data or bill steep out-of-bundle rates of around 10p per megabyte. An independent travel eSIM avoids these limitations entirely.",
      ],
    },
    {
      id: "local-italian-sim-codice-fiscale",
      heading: "Buying a SIM in Italy: the Codice Fiscale hurdle vs instant eSIMs",
      paragraphs: [
        "Buying a physical Italian prepaid SIM card in an operator shop (TIM, Vodafone, or WindTre) in Italy legally requires presenting a physical passport and providing an Italian tax identification code (Codice Fiscale). While store clerks can sometimes generate a provisional code for tourists, the bureaucratic process can take 30 to 45 minutes of paperwork.",
        "A travel eSIM bypasses Italian SIM registration rules completely. You can purchase and install your eSIM online before departing the UK, avoiding airport lines and language barriers, with instant data connectivity the moment you step off the plane.",
      ],
    },
  ],
  setup: [
    {
      title: "Purchase and install your Italy eSIM at home",
      body: "Set up your travel eSIM on home Wi-Fi before your flight. Install the eSIM profile via the provider's app or scan the QR code, label it 'Italy Travel', and keep roaming off on this profile until departure.",
    },
    {
      title: "Turn off data roaming on your UK line",
      body: "If your UK network (such as EE, Vodafone, Three or Sky) charges daily fees in Europe, keep your primary SIM switched on for two-factor authentication SMS, but switch off 'Data Roaming' on that SIM.",
    },
    {
      title: "Turn on mobile data on your Italy eSIM on arrival",
      body: "When landing in Rome, Milan, Venice or Naples, turn off Airplane Mode, select the Italy eSIM for Cellular Data, and enable Data Roaming for that profile to connect to TIM or Vodafone.",
    },
  ],
  faq: [
    {
      question: "Do UK mobile phones work in Italy without extra charges?",
      answer: "Only if you subscribe to a UK network offering inclusive EU roaming, such as O2, iD Mobile, SMARTY, or Tesco Mobile. EE, Vodafone, Three and Sky Mobile charge daily roaming fees or pass costs.",
    },
    {
      question: "Which UK mobile networks charge daily roaming fees in Italy?",
      answer: "EE charges £2.47 per day on plans started after July 2021. Vodafone charges £2.75 per day or £16 for 8 days. Three charges £2 per day or sells Go Roam passes. Sky Mobile charges £2 per 24 hours.",
    },
    {
      question: "Will my Italy travel eSIM work in Sicily, Sardinia and Venice?",
      answer: "Yes. Sicily, Sardinia, Capri, Ischia, and the Venetian Lagoon use the same national mobile networks (TIM, Vodafone, WindTre) as the mainland, with solid 4G and 5G coverage throughout.",
    },
    {
      question: "Do I need a Codice Fiscale (tax code) to buy an Italy travel eSIM?",
      answer: "No. While buying a physical local SIM in an Italian shop requires a passport and an Italian tax code (Codice Fiscale), prepaid travel data eSIMs do not require tax code registration or identity checks.",
    },
    {
      question: "Can I use WhatsApp and tether other devices with an Italy eSIM?",
      answer: "Yes. WhatsApp, FaceTime, and Google Maps work seamlessly over eSIM data. Providers like Saily and Nomad permit personal hotspot tethering, whereas Three Go Roam passes strictly ban tethering.",
    },
    {
      question: "Is 5G widely available across Italy on travel eSIMs?",
      answer: "Yes, 5G coverage is active across Rome, Milan, Florence, Naples, Bologna, Turin and other urban regions. If your handset is 5G compatible and the eSIM profile supports it, you will connect to local 5G cells.",
    },
  ],
  related: ["spain", "france", "greece", "portugal", "germany"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
