import type { DestinationGuide } from "./types.ts";

export const thailandGuide: DestinationGuide = {
  destination: "thailand",
  keyword: "Thailand eSIM",
  title: "Thailand eSIM vs UK roaming: best travel data options (2026)",
  description:
    "Travelling to Thailand from the UK? Compare affordable travel eSIMs with UK network roaming charges. Avoid expensive daily fees and get fast 5G data across Bangkok, Phuket and the islands on AIS, TrueMove H and dtac.",
  verdict: {
    heading: "Short answer: get a Thailand eSIM before you land — local connectivity is world-class and far cheaper than UK roaming.",
    body:
      "Thailand is outside Europe, so almost all UK mobile networks charge punitive roaming rates or require costly add-on passes. EE charges £6/day for its rest-of-world pass, while other major UK carriers default to pay-as-you-go rates or require bespoke bundles. By contrast, Thailand has some of the most competitive travel eSIM prices on the planet: a 10-day to 15-day high-speed package on AIS or TrueMove H costs as little as £6 to £15, delivering full 5G speeds in Bangkok, Chiang Mai and the southern islands with zero roaming shock.",
  },
  facts: [
    {
      label: "Local networks",
      value: "AIS, TrueMove H and dtac (True and dtac operate under True Corporation). AIS and TrueMove H offer extensive nationwide 5G coverage across cities, resort islands and rural national parks.",
    },
    {
      label: "5G availability",
      value: "Thailand has one of the world's most advanced 5G networks, with near-universal high-speed coverage in Bangkok, Phuket, Koh Samui, Pattaya and Chiang Mai.",
    },
    {
      label: "Airport SIM queues",
      value: "Counters at Suvarnabhumi (BKK) and Don Mueang (DMK) sell tourist SIMs, but lines can be long and prices are often higher than pre-booked digital eSIM packages.",
    },
    {
      label: "Passport registration",
      value: "Thai regulations require passport and biometric face scans for in-person SIM purchases. An international travel eSIM bought in advance avoids airport kiosk paperwork.",
    },
    {
      label: "UK visitors",
      value: "Over 900,000 British tourists visit Thailand annually, enjoying 60-day visa-free entry under current immigration regulations.",
    },
  ],
  networks: {
    intro:
      "All UK networks treat Thailand as a rest-of-world destination. With the exception of EE's Roam Zone 1 pass, UK operators either charge metered rates or require you to check plan-specific terms in their apps.",
    rows: [
      {
        network: "ee",
        scenario: "ee-row1",
        headline: "Rest of World Zone 1 pass: £6 for 24 hours, £30 for 7 days, £50 for 15 days",
        detail: "Uses your domestic UK data allowance abroad up to a 50GB fair-use limit. Included on select premium Full Works plans, otherwise purchasable via SMS or the EE app.",
      },
      {
        network: "o2",
        scenario: null,
        headline: "Check O2 Travel bolt-on availability for Thailand",
        detail: "Standard O2 Travel covers selected countries for £7 a day, but coverage in Southeast Asia varies by tariff. Without a bolt-on, steep international out-of-bundle rates apply.",
      },
      {
        network: "vodafone",
        scenario: null,
        headline: "Check your tariff in the Vodafone roaming checker",
        detail: "Thailand is not included in standard Europe roaming. You must log into My Vodafone to see if your contract supports an 8-day or 15-day worldwide roaming pass.",
      },
      {
        network: "three",
        scenario: null,
        headline: "Check Go Roam terms in the Three mobile app",
        detail: "Three's Go Roam passes cover select destinations, but availability for Thailand depends on whether your plan includes Go Roam Around the World. Metered rates apply otherwise.",
      },
      {
        network: "id-mobile",
        scenario: null,
        headline: "Standard rest-of-world metered rates apply",
        detail: "iD Mobile does not include Thailand in its standard roaming tier. Data usage is charged from your out-of-plan credit balance, so an eSIM is strongly recommended.",
      },
      {
        network: "sky-mobile",
        scenario: null,
        headline: "Roaming Passport Plus does not cover Thailand",
        detail: "Sky Mobile's £2/day roaming pass is restricted to Europe and selected transatlantic zones. Thailand incurs out-of-plan international data rates.",
      },
      {
        network: "giffgaff",
        scenario: null,
        headline: "Check travel data add-ons in the giffgaff app",
        detail: "Standard non-EU roaming on giffgaff costs 20p per MB (equivalent to £200/GB). Check if a 30-day travel data add-on is available for Thailand in your account.",
      },
      {
        network: "smarty",
        scenario: null,
        headline: "Out-of-plan balance required: metered roaming rates",
        detail: "SMARTY operates exclusively on a prepay basis with no free data outside the EU. Usage in Thailand draws directly from your cash top-up balance.",
      },
      {
        network: "voxi",
        scenario: null,
        headline: "Check Global Roaming Extra in My VOXI",
        detail: "VOXI plans do not include Thailand in domestic endless allowances. Check whether an 8-day or 15-day Global Roaming Extra pass is available for your account.",
      },
      {
        network: "tesco-mobile",
        scenario: null,
        headline: "Standard worldwide metered rates: £5 per megabyte",
        detail: "Tesco Mobile charges its standard non-EU data rate of £5/MB. Relying on your UK SIM for maps or browsing in Thailand will quickly trigger spend caps.",
      },
    ],
  },
  providers: {
    intro:
      "Four leading travel eSIM providers offer digital data packages for Thailand. Compare live prices from Saily and Nomad, verified plans from Airalo, and flexible tourist packages on Klook.",
    notes: [
      {
        provider: "Saily",
        localNetwork: "AIS / TrueMove H",
        summary: "Quotes guaranteed GBP prices without hidden conversion charges. Delivers high-speed 5G connectivity on Thailand's premier cellular networks with full hotspot support.",
        watchOut: "Plan duration starts as soon as your handset establishes a signal on a Thai cellular tower.",
      },
      {
        provider: "Nomad",
        localNetwork: "AIS / dtac",
        summary: "Provides cost-effective data bundles priced in USD and converted transparently. Fast 4G and 5G performance across Bangkok, Phuket, Koh Tao and beyond.",
        watchOut: "Profiles must be installed and activated within 60 days of your purchase date.",
      },
      {
        provider: "Airalo",
        localNetwork: "dtac / TrueMove H",
        summary: "Airalo's popular tourist eSIMs provide generous data bundles with high-speed 5G connectivity. We list Airalo independently without commercial commission.",
        watchOut: "Unlimited tier packages throttle bandwidth to 1Mbps after using 3GB of high-speed data on any single calendar day.",
      },
      {
        provider: "Klook",
        localNetwork: "dtac / AIS",
        summary: "Offers widely popular Thai tourist eSIMs featuring generous data allowances, local network access and digital QR code vouchers for fast instant delivery.",
        watchOut: "Make sure your UK device is carrier-unlocked before trying to add a secondary eSIM line.",
      },
    ],
  },
  sections: [
    {
      id: "why-thailand-costs-extra",
      heading: "Why UK mobile networks charge high roaming fees in Thailand",
      paragraphs: [
        "Thailand is one of the top holiday destinations for UK travellers, but British mobile operators do not treat it kindly. Sitting outside Europe, roaming on a standard UK SIM card defaults to rest-of-world tiers that cost either £6 a day on EE or extortionate pay-as-you-go rates.",
        "A single week of ordinary data usage on social media, translation tools and ride apps can easily run up £40 to £50 on UK network passes, or trigger a complete connection cutoff if you hit your provider's global spend cap. A dedicated travel eSIM provides ample high-speed data for a fraction of that cost.",
      ],
    },
    {
      id: "thai-5g-performance",
      heading: "Superfast 5G: coverage across Bangkok, Chiang Mai and the islands",
      paragraphs: [
        "Thailand's mobile networks are among the fastest and most technologically advanced in Asia. AIS and TrueMove H offer extensive 5G coverage across Bangkok's elevated SkyTrain routes, shopping districts and canals, as well as northern hubs like Chiang Mai and Chiang Rai.",
        "Even when island hopping between Phuket, Koh Samui, Koh Phangan, Koh Tao or the Phi Phi Islands, mobile signal remains exceptionally strong on beaches and ferry crossings. High-speed 4G LTE covers nearly every inhabited island.",
      ],
    },
    {
      id: "airport-sims-vs-esims",
      heading: "Buying at Suvarnabhumi Airport vs installing an eSIM beforehand",
      paragraphs: [
        "When arriving at Bangkok Suvarnabhumi (BKK) or Phuket Airport (HKT), the arrivals hall is lined with official carrier kiosks. However, after a 12-hour flight from the UK, navigating queues, comparing package boards and waiting while a clerk photographs your passport can be frustrating.",
        "Pre-installing an eSIM on your phone before you depart the UK allows your device to connect to local 5G immediately upon touchdown. You can order a Grab taxi, contact your hotel or access your itinerary without waiting in airport queues or hunting for terminal Wi-Fi.",
      ],
    },
    {
      id: "essential-apps",
      heading: "Apps that make travelling Thailand easier: Grab, Bolt and Line",
      paragraphs: [
        "Having constant mobile internet in Thailand is indispensable for getting around. Grab and Bolt are the dominant ride-hailing and food delivery apps, eliminating the need to haggle with tuk-tuk drivers or navigate street language barriers.",
        "Google Maps handles Bangkok MRT and BTS metro routes reliably. Translation apps with camera scanning make ordering food at night markets and reading Thai scripts effortless, while WhatsApp and Line let you message tour guides, boat operators and local hotels without calling.",
      ],
    },
  ],
  setup: [
    {
      title: "Verify device compatibility and ensure carrier unlock",
      body: "Ensure your smartphone is unlocked and compatible with eSIM before choosing a plan.",
    },
    {
      title: "Purchase and scan your Thailand eSIM while on home Wi-Fi",
      body: "Install the digital profile using the provider's QR code or mobile app prior to departing the UK.",
    },
    {
      title: "Disable data roaming on your primary UK mobile number",
      body: "Keep your UK line on for two-factor verification texts, but turn off its data roaming to prevent inadvertent roaming charges.",
    },
    {
      title: "Activate your Thailand eSIM line on touchdown at the airport",
      body: "Upon landing in Bangkok or Phuket, switch mobile data to the Thailand eSIM line and turn on data roaming on that profile.",
    },
  ],
  faq: [
    {
      question: "Do I need a travel eSIM for Thailand, or will my UK SIM card work?",
      answer:
        "Your UK SIM will usually work, but it will be very expensive unless you have an EE pass or a specific international roaming bolt-on. A prepaid Thailand eSIM provides 5G data for roughly £6 to £15, saving you significant money over a one or two-week holiday.",
    },
    {
      question: "How good is mobile signal and 5G coverage across Thai islands?",
      answer:
        "Coverage across Thailand's islands is remarkably good. Major holiday islands like Phuket, Koh Samui, Koh Phangan, Koh Tao and Koh Chang enjoy dependable 5G and 4G LTE reception from AIS and TrueMove H.",
    },
    {
      question: "Can I buy a local SIM at Bangkok Suvarnabhumi Airport instead?",
      answer:
        "Yes, official carrier kiosks operate in the arrivals hall 24/7. However, you must queue and present your passport for biometric registration. Buying an eSIM beforehand is faster, often cheaper, and lets you connect the moment your flight lands.",
    },
    {
      question: "Can I use ride-hailing apps like Grab and Bolt with a data-only eSIM?",
      answer:
        "Yes. Grab and Bolt both work flawlessly over mobile data. You can register your account using your standard UK phone number, which continues to work fine while mobile data runs through the travel eSIM.",
    },
    {
      question: "Will WhatsApp work normally with my UK mobile phone number?",
      answer:
        "Yes. When you install an eSIM, WhatsApp will ask whether you want to keep your existing phone number. Select 'Keep' and all your UK chats, group messages, voice calls and media sharing will remain completely unchanged.",
    },
    {
      question: "Does an eSIM affect my phone's battery life in tropical weather?",
      answer:
        "An eSIM uses the same cellular radio power as a standard physical SIM card. In warm tropical climates, running GPS navigation and screen brightness on maximum can drain battery faster, so carrying a compact portable power bank is always a good idea.",
    },
  ],
  related: ["indonesia", "japan", "united-arab-emirates", "australia", "turkey"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
