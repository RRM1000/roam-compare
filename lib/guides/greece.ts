import type { DestinationGuide } from "./types.ts";

/**
 * Greece guide. Written 10 September 2026. UK network prices reflect published
 * tariffs and scenarios in lib/roaming.ts.
 */
export const greeceGuide: DestinationGuide = {
  destination: "greece",
  keyword: "Greece eSIM",
  title: "Greece eSIM vs UK roaming: best travel data options (2026)",
  description:
    "Travelling to Greece or the Greek Islands? Compare UK mobile roaming rules with prepaid Greece travel eSIMs from Airalo, Nomad, Saily and Klook for Athens, Santorini, Mykonos and Crete.",
  verdict: {
    heading: "Short answer: O2 and Tesco include free roaming in Greece; on EE or Vodafone, an eSIM saves money.",
    body: "Greece is an EU member state, so UK operators apply European roaming rules. O2, iD Mobile, SMARTY and Tesco Mobile include Greece in your domestic UK monthly allowance with no daily connection fees, though fair-use limits apply (5GB to 30GB). However, if you are with EE (£2.47/day), Vodafone (£2.75/day) or Three (£2/day), daily roaming charges quickly mount over an island-hopping holiday. A Greece travel eSIM starting around £3.50 connects you directly to Cosmote or Vodafone Greece with fast 4G/5G speeds and zero carrier roaming fees.",
  },
  facts: [
    {
      label: "Local networks",
      value: "Cosmote, Vodafone Greece and Nova (formerly Wind). Cosmote offers the widest coverage across remote Aegean and Ionian islands and mountainous regions.",
    },
    {
      label: "5G rollout",
      value: "Extensive across Athens, Thessaloniki, Heraklion (Crete), Rhodes, Corfu, and major tourist islands like Santorini and Mykonos on 3.5GHz bands.",
    },
    {
      label: "Ferry and island roaming",
      value: "Mobile reception remains strong on ferry routes close to shore, but switches off in open waters. Cosmote and Vodafone cover even small Cycladic islands.",
    },
    {
      label: "EU fair-use caps",
      value: "Inclusive UK roaming providers enforce domestic caps: O2 limits EU roaming to 25GB, iD Mobile to 30GB, SMARTY to 12GB, and giffgaff to 5GB per monthly plan.",
    },
    {
      label: "Airport Wi-Fi",
      value: "Athens International (ATH), Heraklion (HER), and Rhodes (RHO) offer free unlimited high-speed public Wi-Fi.",
    },
    {
      label: "UK visitors",
      value: "Over 4.5 million visits are made annually from the UK to Greece, making it one of Britain's favourite Mediterranean summer destinations.",
    },
  ],
  networks: {
    intro:
      "Greece is an EU destination. Following Brexit, UK mobile providers are not bound by EU roaming caps: some networks maintain inclusive roaming within fair-use limits, while others charge daily fees.",
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
        detail: "Roam across Greece and the Greek Islands without extra charge using your UK allowance. A 25GB fair-use monthly ceiling applies; exceeding 25GB costs £3.50 per gigabyte.",
      },
      {
        network: "vodafone",
        scenario: null,
        headline: "Vodafone Europe Roaming: £2.75 daily fee or multi-day passes (£16 for 8d, £21 for 15d)",
        detail: "Standard pay monthly plans charge £2.75/day or require a European Roaming Pass. A 25GB fair-use cap applies. Select Xtra plans with 4 roaming benefits include Greece free.",
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
        headline: "iD Roam Free: Included at no extra cost across Greece and 50 EU destinations",
        detail: "Utilises your UK allowance with a fair-use data limit of up to 30GB per month (or your monthly plan limit if lower). Connects seamlessly with Greek partner networks.",
      },
      {
        network: "sky-mobile",
        scenario: null,
        headline: "Roaming Passport Plus: £2 per 24 hours to access your UK allowance",
        detail: "Triggers automatically when you make a call, send an SMS, or use mobile data in Greece. Draws from your domestic data allowance up to a 25GB fair-use cap.",
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
        detail: "Roam in Greece using your normal UK allowance up to a 12GB monthly cap. If you need additional data, add-ons cost £1 per gigabyte with no expiration during your active plan.",
      },
      {
        network: "voxi",
        scenario: null,
        headline: "European Roaming Pass: £2.45 for 1 day, £4.50 for 2 days, £12.50 for 8 days, £17.50 for 15 days",
        detail: "VOXI requires a European pass to access mobile data in Greece. Endless Social and Endless Video streaming benefits do not apply abroad; a 20GB cap applies.",
      },
      {
        network: "tesco-mobile",
        scenario: null,
        headline: "Home From Home: Included at no extra cost across 48 European destinations",
        detail: "Use your UK minutes, texts, and data allowance in Greece without surcharge. Clubcard deals and standard pay monthly contracts are covered by the fair-use policy.",
      },
    ],
  },
  providers: {
    intro:
      "We compare four major travel eSIM providers for Greece. Saily and Nomad stream live real-time pricing; Airalo prices are independently checked; Klook offers flexible daily and fixed packages.",
    notes: [
      {
        provider: "Airalo",
        localNetwork: "Cosmote / Vodafone Greece",
        summary: "Reliable high-speed coverage across mainland Greece and Aegean islands via Cosmote and Vodafone, with plans from 1GB to 50GB and unlimited options.",
        bestFor: "Travellers visiting Athens or island-hopping across the Cyclades and Dodecanese.",
        watchOut: "Unlimited plans throttle data speeds to 1Mbps after 3GB of daily consumption.",
        watchFor: "Daily 3GB high-speed limit on unlimited data tiers.",
      },
      {
        provider: "Nomad",
        localNetwork: "Cosmote / Vodafone Greece",
        summary: "Delivers fast 4G and 5G connectivity on Cosmote and Vodafone, priced in USD with transparent high-speed data allowances and hotspot capability.",
        bestFor: "Travellers needing 5G performance, mobile hotspot sharing, and multi-week data options.",
        watchOut: "Must be activated within 60 days of purchase.",
        watchFor: "60-day activation window from purchase date.",
      },
      {
        provider: "Saily",
        localNetwork: "Local partner networks",
        summary: "Displays checkout prices directly in GBP, avoiding bank foreign exchange fees. Simple in-app activation with dedicated customer support.",
        bestFor: "UK travellers who want fixed British pound pricing and quick app-based management.",
        watchOut: "Activates automatically the moment the profile connects to a Greek network.",
        watchFor: "Immediate activation upon first network connection in Greece.",
      },
      {
        provider: "Klook",
        localNetwork: "Cosmote",
        summary: "Provides flexible daily-allowance bundles (1GB–3GB/day or unlimited) on Greece's top network Cosmote with QR code delivery.",
        bestFor: "Holidaymakers who prefer predictable daily data allocations while exploring Greek islands.",
        watchOut: "Handset must be carrier-unlocked; redeem voucher on Wi-Fi prior to travel.",
        watchFor: "Handset carrier unlock required for QR code activation.",
      },
    ],
  },
  sections: [
    {
      id: "uk-roaming-rules-greece",
      heading: "Post-Brexit roaming in Greece: free on O2, daily charges on EE and Vodafone",
      paragraphs: [
        "Since the UK left the European Union, UK mobile networks are no longer bound to provide surcharge-free roaming in Greece. This makes your mobile costs highly dependent on your UK network contract.",
        "O2, iD Mobile, SMARTY, and Tesco Mobile include roaming in Greece as standard within domestic allowances (up to fair-use caps). However, EE, Vodafone, Three and Sky Mobile charge daily fees or require passes that quickly add £14 to £35 to a 7 or 14-day holiday. If your UK network charges a daily rate, buying a prepaid Greece travel eSIM is usually much cheaper.",
      ],
    },
    {
      id: "island-coverage-ferries",
      heading: "Mobile coverage across the Greek Islands: Crete, Cyclades and Ionian",
      paragraphs: [
        "Greece has three primary mobile network operators: Cosmote, Vodafone Greece, and Nova. Cosmote has the largest network grid and the most reliable island infrastructure, maintaining fast 4G and 5G coverage across Crete, Rhodes, Corfu, Santorini, Mykonos, and dozens of smaller Cycladic and Dodecanese islands.",
        "While island-hopping on ferries, cellular coverage generally remains strong when passing within range of coastal masts, though deep open-water crossings will experience brief signal gaps. Most travel eSIMs link directly to Cosmote or Vodafone Greece, ensuring maximum coverage during your stay.",
      ],
    },
    {
      id: "fair-use-limits-greece",
      heading: "How UK fair-use roaming limits affect your Greek holiday",
      paragraphs: [
        "Even when your UK mobile contract includes free roaming in Greece, you do not receive unlimited data abroad. Networks enforce strict domestic fair-use caps: giffgaff caps roaming at 5GB, SMARTY at 12GB, and O2 and Sky at 25GB per billing period.",
        "Holiday activities like navigating winding island roads on Google Maps, posting holiday photos to social media, and streaming beach playlists can easily exhaust a 5GB or 12GB cap before your trip ends. Out-of-plan data charges can run up to 10p per megabyte (£100 per gigabyte), making a dedicated travel eSIM a smart financial safeguard.",
      ],
    },
    {
      id: "buying-sim-in-greece",
      heading: "Buying a Greek SIM at the airport vs getting an eSIM in advance",
      paragraphs: [
        "Buying a physical SIM card in Greece legally requires visiting an official Cosmote, Vodafone, or Nova shop with your original passport and completing biometric registration forms. Airport kiosks in Athens or Heraklion often charge inflated tourist prices with long queues during peak summer travel periods.",
        "Travel eSIMs offer an immediate digital alternative. You can purchase your eSIM online from the UK, install it in minutes on home Wi-Fi, and enjoy high-speed mobile data the moment your plane lands in Greece, without standing in line or handing over your passport.",
      ],
    },
  ],
  setup: [
    {
      title: "Purchase and install your Greece eSIM before flying",
      body: "Set up your travel eSIM on home Wi-Fi before heading to the airport. Scan the QR code or install via the provider's app, name the profile 'Greece Travel', and keep roaming off on this profile until departure.",
    },
    {
      title: "Disable data roaming on your UK SIM",
      body: "If your UK provider (like EE, Vodafone, Three or Sky) charges daily fees in Europe, leave your primary SIM active for incoming SMS and banking verification, but turn off 'Data Roaming' on that SIM.",
    },
    {
      title: "Switch mobile data to your Greece eSIM upon arrival",
      body: "When landing in Athens, Heraklion, Rhodes or Santorini, turn off Airplane Mode, select the Greece eSIM for Cellular Data, and turn on Data Roaming on that eSIM to register with Cosmote or Vodafone.",
    },
  ],
  faq: [
    {
      question: "Do UK mobile phones work in Greece without extra fees?",
      answer: "Yes, if you use a UK provider that includes surcharge-free EU roaming, such as O2, iD Mobile, SMARTY, or Tesco Mobile. If you are on EE, Vodafone, Three or Sky Mobile, daily roaming fees or pass costs apply.",
    },
    {
      question: "Which UK mobile networks charge daily roaming fees in Greece?",
      answer: "EE charges £2.47 per day on plans started after July 2021. Vodafone charges £2.75 per day or £16 for 8 days. Three charges £2 per day or sells Go Roam passes. Sky Mobile charges £2 per 24 hours.",
    },
    {
      question: "Will a Greece travel eSIM work across remote Greek islands?",
      answer: "Yes. Major networks like Cosmote and Vodafone Greece cover inhabited Greek islands in the Cyclades, Dodecanese, Ionian, and Sporades with dependable 4G and growing 5G reception.",
    },
    {
      question: "Is 5G coverage available on travel eSIMs in Greece?",
      answer: "Yes, 5G is widely available across Athens, Thessaloniki, Patras, and popular tourist island hubs like Heraklion, Chania, Rhodes, and Mykonos on supported handsets.",
    },
    {
      question: "Can I use WhatsApp and tether other devices with a Greece eSIM?",
      answer: "Yes. WhatsApp, FaceTime, and Google Maps work normally over mobile data. Most travel eSIM providers support personal hotspot tethering without restrictions, unlike Three Go Roam passes which prohibit tethering.",
    },
    {
      question: "Do I need a passport or Greek tax number to buy an eSIM?",
      answer: "No. Unlike purchasing a local physical SIM card in a Greek shop, prepaid travel data eSIMs do not require passport verification or local tax registration under Greek law.",
    },
  ],
  related: ["turkey", "cyprus", "italy", "spain", "france"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
