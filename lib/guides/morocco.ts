import type { DestinationGuide } from "./types.ts";

export const moroccoGuide: DestinationGuide = {
  destination: "morocco",
  keyword: "Morocco eSIM",
  title: "Morocco eSIM vs UK roaming: Marrakech & travel guide (2026)",
  description:
    "Travelling to Morocco from the UK? Compare prepaid Morocco travel eSIMs with UK mobile roaming. Avoid expensive daily passes and £5/MB metered rates, and get reliable 4G and 5G mobile data across Marrakech, Taghazout and the Atlas Mountains.",
  verdict: {
    heading: "Short answer: buy a Morocco eSIM before you travel — UK roaming charges are severe and airport Wi-Fi is unreliable.",
    body:
      "Although Morocco is only a three-hour flight from London, no UK mobile operator includes it in European roaming. EE places Morocco into Rest of World Zone 2 at £8 for 24 hours, while other UK networks charge punitive metered rates of up to £5/MB or force you to rely on account-specific roaming checkers. Buying a dedicated Morocco travel eSIM before you board gives you 5GB to 20GB of fast 4G/5G data on Maroc Telecom, inwi or Orange Maroc for £8 to £25 — keeping you connected in the bustling souks of Marrakech, along surf coastlines and across the Atlas Mountains without bill shock.",
  },
  facts: [
    {
      label: "Local networks",
      value: "Maroc Telecom (IAM), inwi and Orange Maroc. Maroc Telecom holds the largest market share and the most extensive rural and mountain coverage.",
    },
    {
      label: "5G roll-out",
      value: "Morocco is preparing for the 2030 FIFA World Cup with widespread 5G infrastructure roll-outs in Casablanca, Rabat, Marrakech and Tangier alongside robust nationwide 4G LTE.",
    },
    {
      label: "Airport SIM registration",
      value: "Counters at Marrakech Menara (RAK) and Casablanca (CMN) offer tourist SIMs, but cash scams, passport registration queues and unactivated cards are frequently reported.",
    },
    {
      label: "Medina navigation",
      value: "Narrow medina alleyways in Marrakech and Fes can weaken cellular signals; downloading offline Google Maps before exploring old city quarters is strongly recommended.",
    },
    {
      label: "UK visitors",
      value: "Over 700,000 British tourists visit Morocco each year, enjoying year-round sunshine and visa-free travel for up to 90 days.",
    },
  ],
  networks: {
    intro:
      "Morocco is classified as Rest of World across all UK networks. EE charges its Zone 2 pass rate, while all other major networks default to metered pricing or account-level terms.",
    rows: [
      {
        network: "ee",
        scenario: "ee-row2",
        headline: "Rest of World Zone 2 pass: £8 for 24 hours, £40 for 7 days, £60 for 15 days",
        detail: "Draws from your domestic UK data allowance up to a 50GB fair-use limit. Passes activate immediately upon purchase and include standard UK calls and SMS.",
      },
      {
        network: "o2",
        scenario: null,
        headline: "Check O2 Travel bolt-on availability for Morocco",
        detail: "Morocco is outside O2's Europe Zone. Check the O2 roaming checker to see if your tariff qualifies for O2 Travel, otherwise expensive non-EU roaming rates apply.",
      },
      {
        network: "vodafone",
        scenario: null,
        headline: "Check your plan in the Vodafone roaming checker",
        detail: "Morocco is placed in Vodafone's Rest of World roaming tiers. Roaming is included only on select high-tier Xtra contracts; otherwise daily fees apply.",
      },
      {
        network: "three",
        scenario: null,
        headline: "Check Go Roam eligibility in the Three app",
        detail: "Three does not include Morocco in standard Go Roam Europe. Without an applicable worldwide roaming add-on, out-of-bundle rates apply.",
      },
      {
        network: "id-mobile",
        scenario: null,
        headline: "Standard rest-of-world charges: metered out-of-plan data",
        detail: "iD Mobile excludes Morocco from inclusive European roaming. Data usage is billed per megabyte from your credit balance, making an eSIM far safer.",
      },
      {
        network: "sky-mobile",
        scenario: null,
        headline: "Roaming Passport Plus does not cover Morocco",
        detail: "Sky Mobile's £2/24h Roaming Passport Plus does not include North Africa. Standard international out-of-bundle roaming charges apply.",
      },
      {
        network: "giffgaff",
        scenario: null,
        headline: "Check travel data add-ons in the giffgaff app",
        detail: "Standard non-EU roaming costs 20p per MB (approx £200/GB). Check whether a 30-day travel data add-on is available for Morocco in the giffgaff app.",
      },
      {
        network: "smarty",
        scenario: null,
        headline: "Out-of-plan balance required: metered roaming rates",
        detail: "SMARTY does not provide inclusive roaming in Morocco. Out-of-bundle data is charged against your cash balance subject to the default £45 spend limit.",
      },
      {
        network: "voxi",
        scenario: null,
        headline: "Check Global Roaming Extra options in My VOXI",
        detail: "VOXI plans do not include roaming in Morocco. Log into My VOXI to check whether an 8-day or 15-day Global Roaming Extra pass is available for your SIM.",
      },
      {
        network: "tesco-mobile",
        scenario: null,
        headline: "Standard worldwide metered rate: £5 per megabyte",
        detail: "Tesco Mobile bills data in Morocco at £5/MB. Relying on UK data roaming will rapidly exhaust safety buffers and spend limits.",
      },
    ],
  },
  providers: {
    intro:
      "Four reputable travel eSIM providers cover Morocco with digital data profiles. Compare live pricing from Saily and Nomad, verified plans from Airalo, and flexible options on Klook.",
    notes: [
      {
        provider: "Saily",
        localNetwork: "Maroc Telecom / inwi",
        summary: "Quotes straightforward prices in GBP with no overseas transaction fees. Connects to Maroc Telecom and inwi for strong connectivity in Marrakech, Agadir and Taghazout.",
        watchOut: "Validity begins as soon as your device registers on a compatible Moroccan mobile network.",
      },
      {
        provider: "Nomad",
        localNetwork: "Orange Maroc / inwi",
        summary: "Transparent USD pricing converted at official market rates. Offers reliable 4G LTE data across Morocco's main cities and travel corridors with hotspot capability.",
        watchOut: "Purchased profiles must be installed and activated on your smartphone within 60 days.",
      },
      {
        provider: "Airalo",
        localNetwork: "Orange Maroc",
        summary: "Provides 'Choukran' prepaid data bundles from 1GB to 10GB on Orange Maroc. We review and list Airalo independently with zero affiliate bias.",
        watchOut: "Airalo unlimited data plans throttle download speeds to 1Mbps after using 3GB on any single calendar day.",
      },
      {
        provider: "Klook",
        localNetwork: "Orange Maroc",
        summary: "Sells convenient high-speed Morocco eSIM vouchers with instant QR code delivery and reliable connectivity in major tourist centres.",
        watchOut: "Make sure your handset is unlocked from your UK network before attempting installation.",
      },
    ],
  },
  sections: [
    {
      id: "why-morocco-costs-extra",
      heading: "Why UK mobile networks charge rest-of-world rates in Morocco",
      paragraphs: [
        "Despite its close geographical proximity to Spain and southern Europe, Morocco is located in North Africa and is excluded from all UK networks' low-cost European roaming policies. Every UK mobile provider treats Morocco as a rest-of-world territory.",
        "EE charges £8 a day for its Rest of World Zone 2 pass (£40 for a week), while pay-as-you-go providers charge up to £5 per megabyte. A travel eSIM provides an independent data line connecting directly to Morocco's top networks for a fraction of the cost.",
      ],
    },
    {
      id: "coverage-marrakech-and-beyond",
      heading: "Network coverage: Marrakech medinas, coastal surf spots and the desert",
      paragraphs: [
        "In modern city quarters like Gueliz in Marrakech, Casablanca and Rabat, 4G and 5G signals are fast and reliable. However, the thick stone walls of ancient medinas in Marrakech and Fes can block high-frequency cellular signals.",
        "Maroc Telecom provides the most dependable coverage along remote roads through the High Atlas Mountains, Ouarzazate and desert dunes around Merzouga. If heading on mountain treks or Sahara excursions, Maroc Telecom-backed plans are optimal.",
      ],
    },
    {
      id: "airport-sim-pitfalls",
      heading: "Airport SIM cards in Marrakech and Casablanca: common pitfalls",
      paragraphs: [
        "Arriving at Marrakech Menara (RAK) or Casablanca (CMN), you will encounter kiosks offering free or discounted SIM cards. However, tourists often report aggressive upselling, long queues, and cards that fail to activate after leaving the airport.",
        "Pre-installing a travel eSIM removes the stress. Your phone connects to Moroccan 4G the moment you step off the plane, allowing you to arrange a taxi or navigate to your riad immediately.",
      ],
    },
    {
      id: "useful-apps",
      heading: "Navigating Morocco: Careem, InDrive, translation and offline maps",
      paragraphs: [
        "Mobile internet is invaluable in Morocco. Ride apps like InDrive and Careem operate in major cities, offering fixed, transparent fares and eliminating stressful negotiations with taxi drivers at train stations and airports.",
        "Google Maps is essential for navigating labyrinthine souks, though downloading offline area maps beforehand guarantees navigation even in narrow covered markets. WhatsApp is the primary communication channel for booking desert tours, riad hosts and drivers.",
      ],
    },
  ],
  setup: [
    {
      title: "Confirm your smartphone is unlocked and eSIM compatible",
      body: "Ensure your smartphone is not network-locked so it can install a secondary international profile.",
    },
    {
      title: "Purchase and install your Morocco eSIM on home Wi-Fi before flying",
      body: "Scan the QR code or use the provider app while connected to your home Wi-Fi. Label the line 'Morocco' and keep it turned off.",
    },
    {
      title: "Turn off mobile data roaming on your primary UK SIM card",
      body: "Disable data roaming on your UK line to avoid unexpected roaming fees while leaving SMS enabled for bank codes.",
    },
    {
      title: "Activate your Morocco eSIM line when landing at the airport",
      body: "Switch your mobile data connection to the Morocco eSIM upon arrival in Marrakech, Agadir or Casablanca and turn on data roaming.",
    },
  ],
  faq: [
    {
      question: "Is Morocco included in UK networks' European roaming?",
      answer:
        "No. Morocco is in North Africa and is not an EU member. Every UK mobile network places Morocco into a rest-of-world tier with steep daily fees or high per-megabyte charges. A travel eSIM avoids these costs entirely.",
    },
    {
      question: "Can I buy a physical SIM card at Marrakech Airport instead?",
      answer:
        "Yes, kiosks operate in Marrakech Menara Airport arrivals. However, queues can be long and travellers frequently encounter unactivated cards or cash markups. A prepaid eSIM is cheaper, pre-configured, and connects immediately upon landing.",
    },
    {
      question: "How good is mobile phone signal in the Atlas Mountains and Sahara Desert?",
      answer:
        "Coverage along primary mountain passes and paved roads is surprisingly good, particularly on Maroc Telecom. In deep valleys or remote desert dunes signal will drop, so downloading offline maps beforehand is strongly advised.",
    },
    {
      question: "Do WhatsApp and ride-hailing apps like Careem work in Morocco?",
      answer:
        "Yes. WhatsApp messaging, voice calls and video calls work smoothly across Moroccan cellular networks. Ride-hailing apps like Careem and InDrive operate in major cities like Casablanca and Marrakech.",
    },
    {
      question: "Will I still receive UK bank security texts while using an eSIM in Morocco?",
      answer:
        "Yes. If you keep your UK physical SIM card enabled with data roaming turned off, incoming SMS verification codes will still arrive normally and free of charge.",
    },
    {
      question: "Does a Morocco travel eSIM come with a local phone number?",
      answer:
        "Most Morocco travel eSIMs are data-only and do not provide a local +212 Moroccan phone number. You can make app calls via WhatsApp or FaceTime, and standard UK phone calls can still be routed through your UK SIM if required.",
    },
  ],
  related: ["egypt", "turkey", "spain", "portugal", "united-arab-emirates"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
