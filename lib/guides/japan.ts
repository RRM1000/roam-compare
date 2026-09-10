import type { DestinationGuide } from "./types.ts";

export const japanGuide: DestinationGuide = {
  destination: "japan",
  keyword: "Japan eSIM",
  title: "Japan eSIM vs UK roaming: best travel data options (2026)",
  description:
    "Travelling to Japan from the UK? Compare prepaid travel eSIMs with UK roaming rates across EE, O2, Three and more. Avoid daily fees, patchy pocket Wi-Fi rentals and find the best local coverage on SoftBank, NTT Docomo and au.",
  verdict: {
    heading: "Short answer: buy a Japan eSIM before you fly to avoid pricey daily passes and the hassle of pocket Wi-Fi.",
    body:
      "Japan sits in every UK mobile network's rest-of-world roaming tier. EE charges £8 a day for only 500MB, O2 charges £7 daily capped at 2Mbps, and Three charges £7–£8 a day with no hotspot support. Standalone travel eSIMs give you 10GB–20GB of 5G/4G data on NTT Docomo or SoftBank for £13–£19 for a fortnight — far cheaper than UK roaming passes, and much more convenient than carrying, charging and returning a rented pocket Wi-Fi router.",
  },
  facts: [
    {
      label: "Local networks",
      value: "NTT Docomo, SoftBank, au (KDDI) and Rakuten Mobile. SoftBank and NTT Docomo provide the widest high-speed 4G and 5G coverage across urban centres and rural shinkansen routes.",
    },
    {
      label: "5G availability",
      value: "5G is widespread across Tokyo, Osaka, Kyoto and major transit hubs. Most travel eSIMs connect to 5G or high-speed LTE on SoftBank or Docomo without extra fees.",
    },
    {
      label: "Pocket Wi-Fi vs eSIM",
      value: "Pocket Wi-Fi rentals used to be the default for Japan tourists, but require airport pickup and drop-off, daily charging and carrying a heavy spare device. An eSIM activates instantly on your phone with zero extra hardware.",
    },
    {
      label: "Transit cards & Apple Pay",
      value: "Digital IC transit cards (Suica, Pasmo, ICOCA) work seamlessly in Apple Wallet or Google Wallet alongside a travel eSIM, allowing tap-and-go metro entry even when offline.",
    },
    {
      label: "UK visitors",
      value: "Over 400,000 British travellers visit Japan each year, taking advantage of visa-free tourism for stays up to 90 days.",
    },
  ],
  networks: {
    intro:
      "Japan is classified as Rest of World by all UK networks. Standard roaming requires either expensive daily add-on passes or exorbitant out-of-plan metered rates.",
    rows: [
      {
        network: "ee",
        scenario: "ee-row3",
        headline: "Rest of World Zone 3 pass: £8 per 24 hours, includes 500MB",
        detail: "Pass includes unlimited UK calls and texts, but data is strictly limited to 500MB per 24-hour block rather than a pooled trip allowance. Speeds match your UK tariff.",
      },
      {
        network: "o2",
        scenario: "o2-travel",
        headline: "O2 Travel: £7 on each day you use data, calls or texts",
        detail: "Provides unlimited data, minutes and texts, but download speeds are throttled to 2Mbps — adequate for Google Maps and train navigation, but sluggish for video or uploads.",
      },
      {
        network: "vodafone",
        scenario: null,
        headline: "Global Roam Zone D: priced per plan in your My Vodafone account",
        detail: "Vodafone includes roaming on select high-tier Xtra contracts, but otherwise applies daily roaming add-ons or out-of-bundle charges. Check the Vodafone roaming checker before departure.",
      },
      {
        network: "three",
        scenario: "three-extra-pass",
        headline: "Go Roam Around the World Extra: £7/day (£8 if joined after 18 Dec 2025) or multi-day passes",
        detail: "Passes cost £17.50 for 3 days, £29.75 for 5, £42 for 7 or £84 for 14. Roaming data is strictly capped at 12GB per billing cycle, days reset in Japanese local time, and mobile tethering is prohibited.",
      },
      {
        network: "id-mobile",
        scenario: "id-roam-beyond",
        headline: "Roam Beyond pass: £5 for 1 day (2GB), £20 for 5 days (10GB), £35 for 10 days (20GB)",
        detail: "Passes are data-only and activate immediately upon purchase. Voice calls and SMS messages outside WhatsApp or FaceTime will incur out-of-plan charges.",
      },
      {
        network: "sky-mobile",
        scenario: null,
        headline: "Japan not included in Roaming Passport Plus",
        detail: "Sky Mobile's £2/day Roaming Passport Plus does not cover Japan. Using data or cellular services will draw standard metered rest-of-world charges.",
      },
      {
        network: "giffgaff",
        scenario: null,
        headline: "Out-of-plan balance required or app travel add-on",
        detail: "Without an active travel add-on, roaming costs 20p per MB (over £200/GB). Check the giffgaff app for country-specific add-ons before boarding your flight.",
      },
      {
        network: "smarty",
        scenario: null,
        headline: "Out-of-plan balance: metered international charges apply",
        detail: "SMARTY has no inclusive roaming outside the EU. Roaming in Japan requires topping up your cash balance, subject to a £45 account spend cap.",
      },
      {
        network: "voxi",
        scenario: "voxi-global",
        headline: "Global Roaming Extra: £16 for 8 days (2GB) or £26.60 for 15 days (4GB)",
        detail: "Includes a bundle of minutes and texts back to the UK and within Japan. Domestic Endless Social and Endless Video streaming perks do not work abroad.",
      },
      {
        network: "tesco-mobile",
        scenario: "tesco-metered-world",
        headline: "Pay As You Go rate: £5 per megabyte",
        detail: "Standard worldwide metered rates make non-eSIM cellular data prohibitively expensive. A single gigabyte would cost over £5,000 without strict data roaming blocks.",
      },
    ],
  },
  providers: {
    intro:
      "Four leading travel eSIM providers cover Japan with digital profiles that download in minutes. Saily and Nomad stream live pricing to our comparison, Airalo is verified regularly, and Klook offers flexible daily packages.",
    notes: [
      {
        provider: "Saily",
        localNetwork: "SoftBank",
        summary: "Charges directly in GBP with no overseas currency fees. Connects to SoftBank's reliable nationwide 4G and 5G network, supporting personal hotspot sharing for laptops and tablets.",
        watchOut: "Plan validity begins the moment your device first handshakes with a Japanese mobile mast.",
      },
      {
        provider: "Nomad",
        localNetwork: "SoftBank / KDDI",
        summary: "Lists competitive dollar-based pricing converted to GBP at current bank rates. Delivers fast 4G LTE and 5G speeds across major Japanese cities with tethering permitted.",
        watchOut: "Purchased eSIM profiles must be installed and activated within 60 days of checkout.",
      },
      {
        provider: "Airalo",
        localNetwork: "SoftBank",
        summary: "Offers Moshi Moshi fixed packages from 1GB to 20GB as well as daily unlimited options on SoftBank. We maintain no affiliate bias with Airalo and list them independently.",
        watchOut: "Airalo's unlimited data packages throttle transfer speeds to 1Mbps once you pass 3GB of consumption in a day.",
      },
      {
        provider: "Klook",
        localNetwork: "NTT Docomo / SoftBank",
        summary: "Popular among Asia travellers for flexible 1GB/day, 2GB/day or unlimited daily packages on NTT Docomo and SoftBank. Vouchers provide instant QR code delivery.",
        watchOut: "Requires an unlocked handset; ensure your phone carrier unlock is finalized before scanning.",
      },
    ],
  },
  sections: [
    {
      id: "why-japan-costs-extra",
      heading: "Why UK mobile networks charge steep fees in Japan",
      paragraphs: [
        "Japan is one of the most technologically advanced destinations in the world, but it sits squarely in the highest rest-of-world roaming bracket for every UK mobile carrier. Unlike European destinations where roaming is capped or free, taking a UK contract to Tokyo or Kyoto triggers steep daily surcharges.",
        "EE limits travellers to 500MB per £8 day pass, O2 caps speeds at an agonising 2Mbps, and Three forbids mobile hotspot usage while charging up to £8 daily. A dedicated travel eSIM connects you straight to NTT Docomo or SoftBank without paying daily penalties to your UK provider.",
      ],
    },
    {
      id: "esim-vs-pocket-wifi",
      heading: "eSIM vs pocket Wi-Fi in Japan: which is better?",
      paragraphs: [
        "For over a decade, renting a pocket Wi-Fi router was the standard advice for visiting Japan. Tourists would collect a bulky battery-powered unit at Narita or Haneda airport, carry it everywhere in a daypack, remember to charge it every evening, and queue to return it before their return flight.",
        "Travel eSIMs have made pocket Wi-Fi obsolete for most solo travellers and couples. An eSIM lives digitally inside your existing smartphone, requires zero extra battery packs, connects instantly to 5G, and cannot be lost or left behind in a ramen restaurant.",
      ],
    },
    {
      id: "coverage-and-trains",
      heading: "Network coverage: Shinkansen, subway tunnels and rural areas",
      paragraphs: [
        "Japan's cellular coverage is extraordinary. Both SoftBank and NTT Docomo provide continuous high-speed connectivity along the Tokaido Shinkansen bullet train line between Tokyo, Nagoya, Kyoto and Osaka, even while travelling at 285 km/h.",
        "Subway platforms and underground shopping arcades in Tokyo, Osaka and Sapporo are thoroughly equipped with microcells. Even when hiking in Hakone or visiting historic temples in Nara, you will typically maintain a solid 4G or 5G connection.",
      ],
    },
    {
      id: "transit-and-apps",
      heading: "Navigating Japan: Suica cards, Google Maps and translation",
      paragraphs: [
        "Having constant mobile internet in Japan is vital for real-time navigation. Google Maps provides pinpoint transit directions, including the exact train carriage to board, transfer platform numbers, and stairwell exits.",
        "Translation apps like Google Translate or DeepL with live camera translation are invaluable for reading menus, signs and train tickets. Digital IC transit cards like Suica and Pasmo integrate into Apple Wallet and Google Wallet, functioning seamlessly alongside your travel eSIM data connection.",
      ],
    },
  ],
  setup: [
    {
      title: "Confirm phone compatibility and unlock status",
      body: "Check that your smartphone is carrier-unlocked and supports eSIM technology before purchasing a plan.",
    },
    {
      title: "Install your eSIM over home Wi-Fi before departure",
      body: "Scan the provided QR code or use your provider's app on stable home Wi-Fi. Label the new line 'Japan' and keep it turned off until travel day.",
    },
    {
      title: "Turn off data roaming on your primary UK SIM",
      body: "Keep your UK line active for incoming calls and banking security texts, but switch off its mobile data roaming to avoid accidental carrier fees.",
    },
    {
      title: "Switch mobile data to your eSIM upon landing",
      body: "When your flight touches down at Narita, Haneda or Kansai, turn on your Japan eSIM line and enable its data roaming to connect immediately.",
    },
  ],
  faq: [
    {
      question: "Is a travel eSIM better than renting a pocket Wi-Fi in Japan?",
      answer:
        "Yes, for almost all travellers. An eSIM installs directly on your phone, needs no physical collection or return at the airport, requires no daily charging of a separate unit, and is significantly cheaper than pocket Wi-Fi rentals for 1 to 2 people.",
    },
    {
      question: "Does my UK phone need to be unlocked to use a Japan eSIM?",
      answer:
        "Yes. Your phone must be network-unlocked to install any secondary eSIM profile. Most UK handsets bought outright or on recent contracts are unlocked by default, but check with your carrier if unsure.",
    },
    {
      question: "Will my physical UK SIM card still receive bank verification texts?",
      answer:
        "Yes. If you leave your UK SIM active with mobile data roaming switched off, standard incoming SMS text messages (such as bank two-factor authentication codes) will still arrive free of charge.",
    },
    {
      question: "Can I use Apple Pay Suica or Pasmo transit cards alongside a Japan eSIM?",
      answer:
        "Yes. Digital transit cards in Apple Wallet or Google Wallet operate independently of your cellular data plan. You can tap through ticket barriers at subway and train stations effortlessly while your eSIM handles internet data.",
    },
    {
      question: "Does a travel eSIM come with a local Japanese phone number?",
      answer:
        "Most tourist eSIMs for Japan are data-only and do not include a Japanese voice telephone number. You can make crystal-clear calls via WhatsApp, FaceTime, Skype or line messaging over the high-speed data connection.",
    },
    {
      question: "Will a Japan travel eSIM work on high-speed Shinkansen bullet trains?",
      answer:
        "Yes. SoftBank and NTT Docomo have extensive cellular base stations along major Shinkansen corridors, providing continuous 4G and 5G coverage through most journeys between Tokyo, Kyoto and Osaka.",
    },
  ],
  related: ["thailand", "indonesia", "united-arab-emirates", "united-states", "australia"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
