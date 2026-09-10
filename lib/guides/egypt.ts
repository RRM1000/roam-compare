import type { DestinationGuide } from "./types.ts";

export const egyptGuide: DestinationGuide = {
  destination: "egypt",
  keyword: "Egypt eSIM",
  title: "Egypt eSIM vs UK roaming: best travel data options (2026)",
  description:
    "Travelling to Egypt from the UK? Compare affordable travel eSIMs with UK mobile roaming across Cairo, Luxor, Hurghada and Sharm El Sheikh. Avoid £5/MB roaming fees and get fast 4G and 5G data on Vodafone Egypt and Orange.",
  verdict: {
    heading: "Short answer: install an Egypt eSIM before you depart — UK roaming charges are severe and airport kiosk queues are notorious.",
    body:
      "Egypt sits firmly in every UK mobile operator's rest-of-world roaming tier. EE charges £8 for 24 hours under its Zone 2 pass, while other UK networks charge punitive rates up to £5 per megabyte or require custom add-ons. By contrast, a digital Egypt travel eSIM provides 5GB to 20GB of reliable high-speed data on Vodafone Egypt or Orange Egypt for £8 to £25. It works instantly as you land at Cairo, Hurghada or Sharm El Sheikh, bypassing aggressive airport sales pitches and lengthy passport bureaucracy.",
  },
  facts: [
    {
      label: "Local networks",
      value: "Vodafone Egypt, Orange Egypt, e& Egypt (Etisalat) and WE (Telecom Egypt). Vodafone Egypt and Orange maintain the strongest network coverage across tourist hubs and Nile cruise corridors.",
    },
    {
      label: "5G roll-out",
      value: "Egypt launched commercial 5G services in early 2025 across central Cairo, Giza, Alexandria and major Red Sea resort areas, with 4G LTE ubiquitous elsewhere.",
    },
    {
      label: "Airport SIM registration",
      value: "Airport kiosks at Cairo (CAI) and Hurghada (HRG) have long queues, require passport scans and often apply inflated tourist prices compared to pre-bought digital eSIMs.",
    },
    {
      label: "Nile cruise coverage",
      value: "Mobile data coverage along the Nile between Luxor and Aswan is generally robust near towns and temples, though river bends in remote valleys may experience temporary dips.",
    },
    {
      label: "UK visitors",
      value: "Over 1 million British travellers visit Egypt annually for Nile cruises, ancient archaeological wonders and Red Sea diving holidays.",
    },
  ],
  networks: {
    intro:
      "Egypt is classified as Rest of World across all UK mobile networks. EE charges its Zone 2 pass rates, while other major UK carriers rely on metered billing or individual account checkers.",
    rows: [
      {
        network: "ee",
        scenario: "ee-row2",
        headline: "Rest of World Zone 2 pass: £8 for 24 hours, £40 for 7 days, £60 for 15 days",
        detail: "Draws from your UK domestic data allowance up to a 50GB fair-use ceiling. Includes standard UK calls and SMS; passes run continuously once activated.",
      },
      {
        network: "o2",
        scenario: null,
        headline: "Check O2 Travel bolt-on availability for Egypt",
        detail: "Egypt is outside O2's inclusive Europe zone. Consult the O2 roaming checker to see if your tariff supports O2 Travel, otherwise expensive non-EU roaming rates apply.",
      },
      {
        network: "vodafone",
        scenario: null,
        headline: "Check your contract in the Vodafone roaming checker",
        detail: "Vodafone places Egypt in Rest of World Zone D. Despite Vodafone having a major domestic Egyptian network, UK customers pay daily fees or metered rates unless on premium Xtra plans.",
      },
      {
        network: "three",
        scenario: null,
        headline: "Check Go Roam eligibility in the Three mobile app",
        detail: "Three's Go Roam passes do not cover Egypt under standard terms. International roaming without an add-on draws from credit at high per-megabyte rates.",
      },
      {
        network: "id-mobile",
        scenario: null,
        headline: "Standard rest-of-world charges: metered out-of-plan data",
        detail: "iD Mobile excludes Egypt from inclusive roaming. Using cellular data abroad will incur steep per-megabyte charges from your account balance.",
      },
      {
        network: "sky-mobile",
        scenario: null,
        headline: "Roaming Passport Plus does not cover Egypt",
        detail: "Sky Mobile's £2/24h Roaming Passport Plus pass excludes North Africa. Mobile data usage is billed at standard international out-of-bundle rates.",
      },
      {
        network: "giffgaff",
        scenario: null,
        headline: "Check travel data add-ons in the giffgaff app",
        detail: "Standard non-EU roaming costs 20p per MB (approx £200/GB). Check whether an international travel data add-on is available for Egypt in your giffgaff app.",
      },
      {
        network: "smarty",
        scenario: null,
        headline: "Out-of-plan balance required: metered international rates",
        detail: "SMARTY has no inclusive international roaming outside Europe. You must top up cash credit, which is consumed quickly under standard pay-as-you-go rates.",
      },
      {
        network: "voxi",
        scenario: null,
        headline: "Check Global Roaming Extra options in My VOXI",
        detail: "VOXI plans do not include data in Egypt. Check your My VOXI account to see if an 8-day or 15-day worldwide add-on is eligible for your number.",
      },
      {
        network: "tesco-mobile",
        scenario: null,
        headline: "Standard worldwide metered rate: £5 per megabyte",
        detail: "Tesco Mobile charges £5/MB for data in Egypt. Even basic navigation or messaging will rapidly exhaust default spending caps.",
      },
    ],
  },
  providers: {
    intro:
      "Four reputable travel eSIM providers offer reliable coverage across Egypt. Saily and Nomad send live price updates, Airalo is checked regularly, and Klook offers flexible package options.",
    notes: [
      {
        provider: "Saily",
        localNetwork: "Vodafone Egypt / Orange",
        summary: "Quotes prices directly in British pounds without extra currency fees. Delivers high-speed connectivity across Cairo, Alexandria, Hurghada and Sharm El Sheikh with hotspot support.",
        watchOut: "Plan countdown begins immediately upon first handshake with an Egyptian cellular mast.",
      },
      {
        provider: "Nomad",
        localNetwork: "Orange Egypt / WE",
        summary: "Priced in USD and converted to GBP at official exchange rates. Reliable 4G LTE and 5G connections in major cities and Red Sea resort destinations.",
        watchOut: "Profiles must be installed and activated on your smartphone within 60 days of purchase.",
      },
      {
        provider: "Airalo",
        localNetwork: "Orange Egypt",
        summary: "Offers 'Giza Mobile' prepaid data bundles from 1GB to 20GB on Orange Egypt. We maintain no commercial affiliate relationship with Airalo and list them independently.",
        watchOut: "Unlimited data plans throttle connection speeds to 1Mbps once 3GB is exceeded in a single calendar day.",
      },
      {
        provider: "Klook",
        localNetwork: "Orange Egypt",
        summary: "Provides flexible Egypt tourist eSIM vouchers with instant QR code delivery, ideal for Red Sea divers and Nile river cruisers.",
        watchOut: "Ensure your smartphone is unlocked from your UK mobile network before departure.",
      },
    ],
  },
  sections: [
    {
      id: "why-egypt-costs-extra",
      heading: "Why UK mobile networks charge expensive roaming fees in Egypt",
      paragraphs: [
        "Egypt is a major holiday magnet for British visitors, yet UK telecommunications operators place it in their top rest-of-world roaming categories. Many travellers assume Vodafone UK will work seamlessly in Egypt since Vodafone is also Egypt's biggest network, but UK subscribers still pay steep roaming fees.",
        "With EE charging £8 daily (£40 for a week) and other networks billing up to £5 per megabyte, leaving your UK data on can result in substantial bill shock. A prepaid travel eSIM provides high-speed data at a fraction of the cost.",
      ],
    },
    {
      id: "nile-and-resort-coverage",
      heading: "Network coverage: Cairo, Red Sea resorts, Luxor and Nile cruises",
      paragraphs: [
        "Major tourist areas in Egypt enjoy strong mobile connectivity. Cairo, Giza, Alexandria, Hurghada and Sharm El Sheikh are covered by modern 4G and growing 5G infrastructure on Vodafone and Orange.",
        "On multi-day Nile cruises between Luxor and Aswan, cellular coverage remains continuous while passing through river towns and major monuments like Karnak and Edfu. Only occasional narrow valley bends have patchy signal.",
      ],
    },
    {
      id: "airport-sim-hassles",
      heading: "Why buying a local SIM at Cairo or Hurghada Airport can be stressful",
      paragraphs: [
        "After landing at Cairo (CAI) or Hurghada (HRG), baggage claim areas feature official carrier kiosks. However, queues are often chaotic, foreign passports must be scanned, and pricing can be confusing with unexpected tourist taxes and activation delays.",
        "Installing an eSIM on home Wi-Fi before departure avoids this ordeal entirely. You can turn on mobile data while taxiing to the gate, allowing you to arrange airport transfers or coordinate with your hotel immediately.",
      ],
    },
    {
      id: "apps-for-egypt",
      heading: "Helpful travel apps for Egypt: Uber, Careem and offline guides",
      paragraphs: [
        "Having reliable cellular data in Egypt significantly enhances your trip. Uber and Careem operate extensively in Cairo, Alexandria and Giza, eliminating the need to negotiate unmetered taxi fares or handle street currency disputes.",
        "Google Maps provides reliable walking routes in urban centres, though downloading offline maps is helpful around archaeological sites. WhatsApp is widely used to communicate with Nile cruise directors, private Egyptologists and drivers.",
      ],
    },
  ],
  setup: [
    {
      title: "Confirm your phone supports eSIM and is carrier unlocked",
      body: "Check that your smartphone is compatible with eSIM profiles and is not carrier-locked to a specific UK provider.",
    },
    {
      title: "Purchase and install your Egypt eSIM on home Wi-Fi before departure",
      body: "Scan the QR code or use the provider app while still in the UK to pre-configure the data profile on your device.",
    },
    {
      title: "Disable mobile data roaming on your UK primary SIM card",
      body: "Keep your UK line on for incoming banking security texts, but turn off its data roaming to prevent inadvertent charges.",
    },
    {
      title: "Switch mobile data to your Egypt eSIM upon touching down",
      body: "Select the Egypt eSIM as your primary mobile data line upon landing in Cairo or Hurghada and toggle data roaming on.",
    },
  ],
  faq: [
    {
      question: "Is Egypt included in UK mobile networks' European roaming?",
      answer:
        "No. Egypt is in North Africa and is classified as Rest of World by all UK networks. Roaming incurs daily passes or metered per-megabyte rates. A prepaid travel eSIM is much more economical for holidays and Nile cruises.",
    },
    {
      question: "Can I buy a physical SIM card at Cairo or Hurghada Airport instead?",
      answer:
        "Yes, official carrier kiosks exist in airport arrival halls. However, lines can be long, passport registration is mandatory, and airport kiosks frequently charge inflated tourist rates. A digital eSIM can be set up at home before you fly.",
    },
    {
      question: "Does mobile data work during a Nile cruise between Luxor and Aswan?",
      answer:
        "Yes. Both Vodafone Egypt and Orange provide reliable cellular coverage along the populated Nile corridor. Signal is strong near major towns, temples and docking stations, with only occasional dips in remote river bends.",
    },
    {
      question: "Do ride-hailing apps like Uber and Careem work in Egypt?",
      answer:
        "Yes. Uber and Careem are widely used throughout Cairo, Giza and Alexandria. Having mobile data through your travel eSIM lets you book air-conditioned rides with upfront pricing and GPS tracking.",
    },
    {
      question: "Will I still receive UK two-factor verification texts in Egypt?",
      answer:
        "Yes. As long as you keep your physical UK SIM active with mobile data roaming switched off, incoming SMS verification codes from UK banks and online services will continue to arrive free of charge.",
    },
    {
      question: "Does an Egypt travel eSIM include a local Egyptian phone number?",
      answer:
        "Standard travel eSIM packages are data-only and do not include a local Egyptian voice number. You can make app calls over data using WhatsApp, FaceTime or Skype, while maintaining your standard UK mobile number.",
    },
  ],
  related: ["morocco", "turkey", "united-arab-emirates", "greece", "cyprus"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
