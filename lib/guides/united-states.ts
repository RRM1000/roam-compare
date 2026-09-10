import type { DestinationGuide } from "./types.ts";

/**
 * United States guide. Written 10 September 2026 against the primary sources
 * listed at the bottom. UK network prices are not repeated here — the rows
 * point at scenarios in lib/roaming.ts so the guide, the calculator and the
 * source register can never disagree.
 */
export const unitedStatesGuide: DestinationGuide = {
  destination: "united-states",
  keyword: "USA eSIM",
  title: "USA eSIM vs UK roaming: what it costs from the UK (2026)",
  description:
    "Visiting the US from the UK? Compare live USA eSIM prices against what EE, O2, Vodafone, Three and the rest charge. We cover the 3G shutdown, VoLTE calling rules, cruise ship roaming traps, and why an eSIM beats airport Wi-Fi.",
  verdict: {
    heading: "Short answer: buy a USA eSIM before you fly, unless your plan already includes US roaming.",
    body:
      "The United States is outside every UK mobile operator's inclusive Europe zone. O2 charges £7 a day, EE charges £6 for 24 hours or sells weekly passes, Three charges £5 a day or sells passes, and iD Mobile sells data passes. For a typical one- or two-week trip, a travel eSIM with 10GB to 20GB of data costs less than two or three days of daily carrier roaming fees. Crucially, because all major US networks have retired their 2G and 3G infrastructure, UK travellers without VoLTE roaming support cannot make regular calls on local networks without a compatible setup.",
    sourceIds: ["o2-travel", "three-go-roam"],
  },
  facts: [
    {
      label: "Local networks",
      value: "AT&T, T-Mobile and Verizon. Airalo and Nomad connect via T-Mobile in the US; Klook offers AT&T and Verizon options; Saily connects through national partner networks.",
      sourceIds: ["airalo-us", "nomad-us", "klook-us"],
    },
    {
      label: "3G shutdown & VoLTE",
      value: "All three tier-1 US operators (AT&T, Verizon and T-Mobile) have completely switched off their 2G and 3G networks. Your phone must support 4G/5G VoLTE roaming to make standard voice calls or dial emergency services (911).",
      sourceIds: ["fcc-3g-sunset"],
    },
    {
      label: "5G coverage",
      value: "Widespread nationwide 5G coverage across metropolitan areas, airports and interstate corridors. Nomad, Airalo, Saily and Klook all support 5G/4G connectivity where available.",
      sourceIds: ["nomad-us", "saily-us"],
    },
    {
      label: "Phone compatibility",
      value: "US-market iPhones (iPhone 14 onwards) are eSIM-only with no physical SIM tray. UK iPhones and Androids retain physical trays, allowing you to keep your UK physical SIM active for 2FA texts while routing mobile data through a US eSIM.",
      sourceIds: ["apple-esim-travel"],
    },
    {
      label: "Cruise ship trap",
      value: "Standard UK roaming passes and land-based travel eSIMs do not cover maritime satellite networks. If departing on a Caribbean or Alaskan cruise, turn off mobile data roaming before leaving port to prevent extreme satellite fees.",
      sourceIds: ["fcc-cruise-roaming"],
    },
    {
      label: "Airport Wi-Fi",
      value: "Major US transit hubs (JFK, LAX, MCO, ORD) offer free public Wi-Fi, but connections frequently require ad viewing, portal sign-ins or SMS verification that can complicate booking airport rides upon arrival.",
      sourceIds: ["jfk-airport-wifi"],
    },
    {
      label: "UK visitors",
      value: "Over 3.8 million annual visits are made from the UK to the United States, making it the single largest long-haul travel market for British tourists and corporate travellers.",
      sourceIds: ["trade-gov-ntto-uk"],
    },
  ],
  networks: {
    intro:
      "The United States sits in every UK mobile operator's rest-of-world roaming tier. Where an operator publishes a fixed tariff or bundle pass, the row below links to their official documentation and the calculator above prices it for your journey. Where pricing depends on individual account terms, we direct you to the network's official checker.",
    rows: [
      {
        network: "ee",
        scenario: "ee-row1",
        headline: "Rest of World Zone 1 pass: £6 for 24 hours, £30 for 7 days, £50 for 15 days",
        detail: "Uses your normal UK data allowance abroad, up to a 50GB fair-use ceiling. Certain Full Works contracts include this zone as an inclusive extra; check the EE app before buying an add-on pass.",
        sourceIds: ["ee-price-guide"],
      },
      {
        network: "o2",
        scenario: "o2-travel",
        headline: "O2 Travel: £7 on each day you activate it",
        detail: "Provides unlimited data, minutes and texts, but data throughput is capped at 2Mbps — adequate for messaging and maps, but noticeably slow for high-resolution video. Ultimate plans include O2 Travel at no extra charge.",
        sourceIds: ["o2-travel"],
      },
      {
        network: "vodafone",
        scenario: null,
        headline: "Global Roam Zone B: £7.39 daily charge or included on selected Xtra contracts",
        detail: "Vodafone includes US roaming on selected 4-Xtra plans. On standard contracts, daily charges apply depending on when your plan was started; enter your mobile number in Vodafone's roaming checker to verify your exact tariff.",
        sourceIds: ["vodafone-global-roaming"],
      },
      {
        network: "three",
        scenario: "three-world-pass",
        headline: "Go Roam Around the World passes: £12.50 for 3 days, £30 for 7 days, £60 for 14 days",
        detail: "Or £5 for each calendar day you use data or calls abroad. Data usage is capped at Three's 12GB international fair-use limit, and personal hotspot tethering is strictly prohibited under Go Roam rules.",
        sourceIds: ["three-go-roam"],
      },
      {
        network: "id-mobile",
        scenario: "id-roam-beyond",
        headline: "Roam Beyond passes: £5 for 1 day (2GB), £20 for 5 days (10GB), £35 for 10 days (20GB)",
        detail: "Data-only passes that start counting down immediately upon purchase. Ordinary cellular voice calls and SMS are not included and are billed at standard international rates.",
        sourceIds: ["id-mobile-roaming"],
      },
      {
        network: "sky-mobile",
        scenario: "sky-passport",
        headline: "Roaming Passport Plus: £2 for each 24 hours you activate",
        detail: "Draws directly from your existing UK data allowance, capped at 25GB per billing cycle. Your mobile phone must support VoLTE roaming to place voice calls on US partner networks.",
        sourceIds: ["sky-roaming"],
      },
      {
        network: "giffgaff",
        scenario: null,
        headline: "Travel data add-ons: 1GB, 5GB or 10GB, valid 30 days, purchased in-app",
        detail: "The USA is one of giffgaff's fixed-price global roaming add-on destinations. Without an active add-on, standard out-of-bundle rates apply per megabyte, making unbundled use very costly.",
        sourceIds: ["giffgaff-travel-addons"],
      },
      {
        network: "smarty",
        scenario: "smarty-metered-us",
        headline: "Standard rate: 10p per megabyte, drawn from an out-of-plan balance",
        detail: "Equivalent to roughly £102.40 per gigabyte. SMARTY's default £45 worldwide financial spend cap will cut off your connection after roughly 450MB, so rely on an eSIM or Wi-Fi for mobile data.",
        sourceIds: ["smarty-roaming"],
      },
      {
        network: "voxi",
        scenario: "voxi-global",
        headline: "Global Roaming Extra: £16 for 8 days (2GB) or £26.60 for 15 days (4GB)",
        detail: "Includes an allowance of minutes and texts back to the UK and within the US. Domestic UK Endless Social and Endless Video unlimited streaming benefits do not travel abroad.",
        sourceIds: ["voxi-roaming"],
      },
      {
        network: "tesco-mobile",
        scenario: "tesco-metered-us",
        headline: "USA special rate: 1p per megabyte on Pay As You Go and Pay Monthly",
        detail: "Tesco Mobile charges a reduced 1p/MB rate in the US (roughly £10.24 per gigabyte), substantially cheaper than its standard £5/MB world rate. Pay Monthly account safety buffers may still pause data.",
        sourceIds: ["tesco-roaming"],
      },
    ],
  },
  providers: {
    intro:
      "Four providers appear in the comparison above. Saily and Nomad send us live prices; Airalo prices are checked by hand and dated; Klook displays its prices directly on its own product page. The links below mirror the comparison tool, so any affiliate partnerships are marked as sponsored in the page source.",
    notes: [
      {
        provider: "Saily",
        localNetwork: "Local partner networks",
        summary: "Quotes live prices in British pounds, so the price displayed is the final amount charged with no foreign transaction conversion fees. Allows mobile hotspot sharing without artificial restrictions.",
        watchOut: "Saily plans activate as soon as they connect to a compatible US mobile network. Install your eSIM profile before departure.",
        sourceIds: ["saily-us"],
      },
      {
        provider: "Nomad",
        localNetwork: "T-Mobile",
        summary: "Prices in US dollars, converted at a rounded Bank of England exchange rate. Operates on T-Mobile with high-speed 5G and 4G LTE coverage across the continental US, Alaska and Hawaii.",
        watchOut: "Nomad profiles must be activated within 60 days of purchase, so do not order months ahead of your trip.",
        sourceIds: ["nomad-us"],
      },
      {
        provider: "Airalo",
        localNetwork: "T-Mobile",
        summary: "We have no commercial affiliate partnership with Airalo and list it impartially. Its US range includes pure data bundles as well as voice-and-data plans that issue a temporary local US telephone number.",
        watchOut: "Its unlimited data plans throttle speeds to 1Mbps once you exceed 3GB in a single day.",
        sourceIds: ["airalo-us"],
      },
      {
        provider: "Klook",
        localNetwork: "AT&T + Verizon options",
        summary: "Provides flexible daily-allowance packages (1GB/day, 2GB/day or unlimited) with multi-carrier options on AT&T and Verizon. Prices vary across dozens of validity permutations and are confirmed on Klook's checkout page.",
        watchOut: "Delivery is via a digital QR code voucher. Ensure your smartphone is carrier-unlocked before attempting activation.",
        sourceIds: ["klook-us"],
      },
    ],
  },
  sections: [
    {
      id: "why-usa-costs-extra",
      heading: "Why the United States costs extra on almost all UK networks",
      paragraphs: [
        "With nearly four million visits a year from the UK to the US, many travellers assume their domestic mobile contracts will work across the Atlantic just as smoothly as they do in Europe. In reality, the United States is classified by all major UK mobile operators as Rest of World, placing it outside inclusive roaming zones.",
        "Daily access fees add up quickly: O2 charges £7 each day you connect, EE charges £6 for 24 hours or requires £30 to £50 bundle passes, and Three charges £5 daily or £30 for a week under its Go Roam scheme. A two-week holiday in Florida or California can easily add £70 to £100 to your mobile bill. Sizing an independent travel eSIM for £10 to £25 provides generous high-speed data while eliminating the risk of bill shock.",
      ],
      sourceIds: ["trade-gov-ntto-uk", "ee-price-guide", "o2-travel", "three-go-roam", "sky-roaming", "tesco-roaming"],
    },
    {
      id: "volte-and-3g-shutdown",
      heading: "The US 3G shutdown: why older phones cannot make calls",
      paragraphs: [
        "Between 2022 and 2024, all three tier-1 mobile operators in the United States — AT&T, T-Mobile and Verizon — permanently shut down their legacy 2G and 3G wireless networks to reallocate spectrum to 5G. As a consequence, mobile devices roaming in the US can no longer fall back to 3G circuits for voice calling.",
        "To make voice calls or send standard SMS messages over cellular towers in the US, your phone and your UK network must support 4G/5G Voice over LTE (VoLTE) roaming. If your handset is an older model or your carrier does not have an active VoLTE roaming agreement with US operators, traditional phone calls and emergency 911 dialing will fail entirely. Data-based calling over WhatsApp, FaceTime and Skype on a travel eSIM is unaffected by the shutdown.",
      ],
      sourceIds: ["fcc-3g-sunset"],
    },
    {
      id: "coverage-and-networks",
      heading: "US carrier coverage: T-Mobile, AT&T and Verizon compared",
      paragraphs: [
        "The American cellular landscape is dominated by the 'Big Three': Verizon, AT&T and T-Mobile. T-Mobile holds the lead in mid-band 5G speed and urban density, making it the preferred wholesale partner for travel eSIMs like Airalo and Nomad. AT&T and Verizon boast superior geographic reach in remote rural regions, national parks and mountainous terrain.",
        "Most travel eSIM providers land on T-Mobile's nationwide 5G/4G LTE network, which delivers stellar performance in cities such as New York, Orlando, Las Vegas, Los Angeles and Chicago. If your itinerary involves remote road trips through Utah or the Rockies, consider an eSIM bundle with AT&T or Verizon dual-network roaming access.",
      ],
      sourceIds: ["nomad-us", "airalo-us", "klook-us"],
    },
    {
      id: "cruise-ship-roaming-warning",
      heading: "The Florida cruise trap: why maritime roaming is not covered",
      paragraphs: [
        "One of the most expensive pitfalls for UK holidaymakers visiting the US is taking a cruise from ports like Miami, Fort Lauderdale or Port Canaveral. Once a cruise vessel moves roughly 12 nautical miles offshore, your phone disconnects from terrestrial cell towers and connects to maritime satellite networks such as Cellular at Sea or Wireless Maritime Services.",
        "Maritime satellite connections are not covered by any UK operator roaming pass, nor are they included in land-based USA travel eSIMs. Satellite data rates frequently reach £3 to £10 per megabyte, running up charges of hundreds of pounds in minutes. To protect yourself, always switch off Data Roaming on all SIM profiles before your cruise departs, and rely solely on the ship's onboard Wi-Fi package.",
      ],
      sourceIds: ["fcc-cruise-roaming"],
    },
    {
      id: "local-sim-vs-esim",
      heading: "Should you buy a local US SIM card instead of an eSIM?",
      paragraphs: [
        "While you can purchase prepaid physical SIM cards in US retail stores like Walmart, Target or carrier shops, the process is far less convenient than in Europe. US airport kiosks charge steep markups (often $60 to $80 for basic tourist SIMs), and many carrier packages require mandatory tax registration and recurring monthly autopay enrollment.",
        "A digital travel eSIM allows you to set up your connection before boarding your flight from London or Manchester. When you touch down in the US, your data line connects automatically, letting you book an airport Uber or message family immediately without hunting for a SIM ejection pin or queuing at an airport counter.",
      ],
      sourceIds: ["apple-esim-travel", "jfk-airport-wifi"],
    },
  ],
  setup: [
    {
      title: "1. Purchase before departure",
      body: "Choose an eSIM package that matches your planned stay and expected data usage. Complete your purchase while connected to your home Wi-Fi in the UK.",
    },
    {
      title: "2. Install the eSIM profile",
      body: "Scan the provider QR code or tap direct install in the provider app. Label the new profile 'Travel' or 'US Data' so it is distinct from your UK line.",
    },
    {
      title: "3. Keep your UK SIM active for SMS",
      body: "Leave your primary UK physical SIM switched on for calls and texts, but turn off Data Roaming on that line. This allows UK banking 2FA security texts to arrive for free.",
    },
    {
      title: "4. Turn on the eSIM upon landing",
      body: "When your aircraft touches down in the US, set your Mobile Data line to the eSIM profile and enable Data Roaming for that specific line. It will connect to a local carrier within two minutes.",
    },
  ],
  faq: [
    {
      question: "Will my UK phone work in the United States?",
      answer:
        "Yes, provided your smartphone is carrier-unlocked and supports US 4G/5G frequency bands (especially LTE bands 2, 4, 12, 66 and 5G band n41). Furthermore, your handset must support Voice over LTE (VoLTE) roaming because all US networks have retired their legacy 2G and 3G infrastructure.",
      sourceIds: ["fcc-3g-sunset"],
    },
    {
      question: "Does WhatsApp work in the USA on an eSIM?",
      answer:
        "Yes. When you install and activate an eSIM for data in the US, your WhatsApp account remains tethered to your original UK mobile number. All your existing chats, groups, call history and contacts carry over seamlessly without reconfiguration.",
      sourceIds: ["apple-esim-travel"],
    },
    {
      question: "Do UK networks charge extra to roam in the USA?",
      answer:
        "Yes. All major UK mobile providers treat the United States as Rest of World. Daily access fees range from £2/day on Sky Mobile to £7/day on O2 and £5/day on Three, while EE and iD Mobile charge through weekly data passes. Vodafone prices roaming based on your specific contract tier.",
      sourceIds: ["vodafone-global-roaming"],
    },
    {
      question: "Can I use personal hotspot and tethering with a US eSIM?",
      answer:
        "Yes. Saily, Nomad and Airalo all permit personal hotspot tethering on their US data plans, allowing you to connect laptops, tablets or family devices to your shared data allowance.",
      sourceIds: ["nomad-us", "saily-us"],
    },
    {
      question: "What happens if I take a cruise from the US?",
      answer:
        "Land-based travel eSIMs and UK operator roaming passes do not function on maritime satellite networks. When cruising off the US coast or into international waters, turn off mobile data roaming to avoid exorbitant satellite rates, and use the cruise ship's Wi-Fi network instead.",
      sourceIds: ["fcc-cruise-roaming"],
    },
    {
      question: "Is 5G included on US travel eSIMs?",
      answer:
        "Yes. Nomad, Airalo and Saily connect to US 5G networks where available (primarily T-Mobile 5G Ultra Capacity and AT&T 5G), automatically falling back to robust 4G LTE in areas without 5G signal.",
      sourceIds: ["nomad-us", "airalo-us", "saily-us"],
    },
  ],
  related: ["canada", "mexico", "turkey", "japan"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
