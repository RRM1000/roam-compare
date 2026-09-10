import type { DestinationGuide } from "./types.ts";

export const unitedArabEmiratesGuide: DestinationGuide = {
  destination: "united-arab-emirates",
  keyword: "UAE eSIM",
  title: "UAE eSIM vs UK roaming: Dubai & Abu Dhabi guide (2026)",
  description:
    "Visiting Dubai or Abu Dhabi from the UK? Compare UAE travel eSIMs with UK roaming rates across EE, O2, Sky, Three and VOXI. Learn why WhatsApp calling is blocked, avoid high airport SIM costs, and get fast 5G data on du and e&.",
  verdict: {
    heading: "Short answer: buy a UAE eSIM before arriving to dodge expensive hotel Wi-Fi and inflated airport SIM prices.",
    body:
      "The United Arab Emirates is placed in Rest of World roaming tiers by all UK mobile networks. EE charges £6 for 24 hours, O2 charges £7 daily capped at 2Mbps, Three charges £7–£8 a day or sells costly passes, and iD Mobile charges an astronomical £9.60/MB. While Sky Mobile's £2/day Roaming Passport Plus offers good value if you already have a large UK allowance, an independent UAE travel eSIM provides 5GB to 20GB of blazing-fast 5G data on Etisalat (e&) or du for £8 to £26. Keep in mind that standard VoIP calls on WhatsApp and FaceTime are blocked in the UAE, regardless of whether you roam or use an eSIM.",
  },
  facts: [
    {
      label: "Local networks",
      value: "e& (formerly Etisalat) and du. Both operate cutting-edge, ultra-fast 5G networks ranking among the fastest mobile broadband infrastructures globally.",
    },
    {
      label: "VoIP calling block",
      value: "The UAE telecommunications regulator (TDRA) blocks unlicensed VoIP calling over cellular data and Wi-Fi. WhatsApp voice and video calls, FaceTime Audio and Skype are blocked; standard text messaging works normally.",
    },
    {
      label: "Free tourist SIMs",
      value: "Immigration counters at Dubai International (DXB) often hand arriving passengers a free tourist SIM with 1GB valid for 24 hours, but topping it up locally is significantly more expensive than a prepaid eSIM.",
    },
    {
      label: "5G coverage",
      value: "Near 100% 5G network coverage across metropolitan Dubai, Abu Dhabi, Sharjah and major motorways connecting the Emirates.",
    },
    {
      label: "UK visitors",
      value: "Over 1.5 million British travellers visit the UAE each year for holidays, business conferences and flight stopovers.",
    },
  ],
  networks: {
    intro:
      "The UAE is classified as Rest of World across all 10 UK networks. Where networks publish fixed passes or metered tariffs, they are detailed below.",
    rows: [
      {
        network: "ee",
        scenario: "ee-row1",
        headline: "Rest of World Zone 1 pass: £6 for 24 hours, £30 for 7 days, £50 for 15 days",
        detail: "Draws from your UK domestic allowance up to a 50GB fair-use cap. Included on select Full Works contracts; check your plan in the EE app.",
      },
      {
        network: "o2",
        scenario: "o2-travel",
        headline: "O2 Travel: £7 on each day you use data, calls or texts",
        detail: "Unlimited data, minutes and texts, but connection speed is capped at 2Mbps — functional for Google Maps and ride apps, but slow for video and heavy browsing.",
      },
      {
        network: "vodafone",
        scenario: null,
        headline: "Check UAE roaming rates in your My Vodafone account",
        detail: "Vodafone includes the UAE only on specific premium tariffs. Otherwise, daily add-on charges or out-of-plan metered rates apply.",
      },
      {
        network: "three",
        scenario: "three-extra-pass",
        headline: "Go Roam Around the World Extra: £7/day (£8 if joined after 18 Dec 2025) or multi-day passes",
        detail: "Passes cost £17.50 for 3 days, £29.75 for 5, £42 for 7, or £84 for 14. Roaming data is capped at 12GB abroad, calendar days follow UAE time, and personal hotspots are blocked.",
      },
      {
        network: "id-mobile",
        scenario: "id-metered-world",
        headline: "Standard data rate: £9.60 per megabyte",
        detail: "Astronomical metered rate makes data roaming impossible without huge bills. Even 100MB of data would cost nearly £1,000 before spend caps halt your line.",
      },
      {
        network: "sky-mobile",
        scenario: "sky-passport",
        headline: "Roaming Passport Plus: £2 for each 24 hours activated",
        detail: "Uses your existing UK data allowance up to a 25GB billing cycle cap. Excellent value if your phone supports VoLTE and you have plenty of UK piggybank data.",
      },
      {
        network: "giffgaff",
        scenario: null,
        headline: "Check travel data add-on in the giffgaff app",
        detail: "Standard non-EU roaming costs 20p per MB (approx £200/GB). Check the giffgaff app to see if a fixed-price 30-day travel data add-on is available.",
      },
      {
        network: "smarty",
        scenario: null,
        headline: "Out-of-plan balance required: metered international rates",
        detail: "SMARTY offers no inclusive roaming outside Europe. You must top up cash credit, which is deducted per megabyte subject to the £45 worldwide spend limit.",
      },
      {
        network: "voxi",
        scenario: "voxi-metered",
        headline: "Standard roaming rate: 12p per megabyte",
        detail: "The UAE is not included in VOXI's Global Roaming Extra passes. Data is charged at 12p/MB (roughly £123 per gigabyte) directly from your credit balance.",
      },
      {
        network: "tesco-mobile",
        scenario: "tesco-metered-world",
        headline: "Standard worldwide metered rate: £5 per megabyte",
        detail: "Data costs £5/MB on Pay As You Go and Pay Monthly without a special bolt-on, making an independent eSIM essential for mobile internet.",
      },
    ],
  },
  providers: {
    intro:
      "Four major travel eSIM providers offer digital coverage in Dubai, Abu Dhabi and across the UAE. Saily and Nomad stream live prices, Airalo is checked regularly, and Klook offers flexible vouchers.",
    notes: [
      {
        provider: "Saily",
        localNetwork: "e& (Etisalat) / du",
        summary: "Quotes guaranteed prices in British pounds with no card conversion fees. Delivers high-speed 5G network access in Dubai and Abu Dhabi with mobile tethering permitted.",
        watchOut: "Plan duration starts as soon as your device connects to an Emirati mobile tower.",
      },
      {
        provider: "Nomad",
        localNetwork: "e& (Etisalat) / du",
        summary: "Priced in USD and converted to GBP at current exchange rates. Provides robust 5G and 4G LTE connections across all seven Emirates with hotspot support.",
        watchOut: "Profiles must be installed and activated on your smartphone within 60 days of purchase.",
      },
      {
        provider: "Airalo",
        localNetwork: "Etisalat (e&)",
        summary: "Offers 'Burj Mobile' packages from 1GB up to 20GB and daily unlimited options on Etisalat. Listed independently with no commercial affiliate bias.",
        watchOut: "Unlimited plans reduce download speeds to 1Mbps once 3GB has been consumed in a single calendar day.",
      },
      {
        provider: "Klook",
        localNetwork: "e& / du",
        summary: "Features budget-friendly UAE tourist eSIMs with immediate QR code delivery, popular for short Dubai layovers and extended vacations.",
        watchOut: "Handset must be factory carrier-unlocked prior to attempting profile activation.",
      },
    ],
  },
  sections: [
    {
      id: "why-uae-costs-extra",
      heading: "Why roaming in Dubai and Abu Dhabi costs extra on UK networks",
      paragraphs: [
        "The United Arab Emirates is one of the premier luxury destinations for UK tourists and business travellers, but UK mobile networks treat it as an expensive rest-of-world roaming zone. Aside from Sky Mobile's £2/day Roaming Passport Plus and EE's Zone 1 passes, roaming is heavily penalised.",
        "On Three and O2, you face daily charges of £7 or more with strict limitations like 2Mbps speed throttling or bans on hotspot tethering. On networks like iD Mobile or Tesco Mobile, metered rates are exorbitant. An affordable travel eSIM provides huge savings and full 5G speeds.",
      ],
    },
    {
      id: "voip-calling-blocks",
      heading: "The UAE VoIP block: WhatsApp calls, FaceTime and approved apps",
      paragraphs: [
        "One critical surprise for first-time visitors to Dubai and Abu Dhabi is that internet calling on apps like WhatsApp, FaceTime Audio, Facebook Messenger and Skype is blocked by the UAE telecoms regulator (TDRA).",
        "While text messaging, photos and voice notes on WhatsApp work perfectly over mobile data, voice and video calls will fail to connect. If you need to make voice calls over data, the officially licensed apps in the UAE are Botim and Voico, or you can make standard cellular calls.",
      ],
    },
    {
      id: "dxb-free-sim-trap",
      heading: "The free Dubai Airport SIM: why a travel eSIM is cheaper",
      paragraphs: [
        "Arriving at Dubai International Airport (DXB), passport control officers frequently hand international travellers a complimentary tourist SIM from du or e& containing 1GB of free data valid for 24 hours.",
        "While this freebie is convenient for the initial taxi ride, topping it up with additional data through local carrier portals is notoriously expensive compared to international travel eSIMs. Installing an eSIM before you fly ensures continuous data coverage throughout your stay at a fraction of the price.",
      ],
    },
    {
      id: "speed-and-coverage",
      heading: "5G speed and coverage: Burj Khalifa, desert safaris and highways",
      paragraphs: [
        "The UAE boasts some of the fastest mobile network speeds in the world. Both e& and du provide ubiquitous 5G across urban Dubai, Abu Dhabi, beachfronts, hotel resorts and shopping malls like Dubai Mall and Mall of the Emirates.",
        "Even on highway routes through Sharjah, Ras Al Khaimah and out into desert safari camps, mobile signal remains remarkably dependable, allowing effortless live streaming and navigation.",
      ],
    },
  ],
  setup: [
    {
      title: "Confirm your smartphone is unlocked and supports eSIM",
      body: "Ensure your device is carrier-unlocked so it can accept international digital eSIM profiles.",
    },
    {
      title: "Purchase and install your UAE eSIM before departing the UK",
      body: "Scan the QR code or use the provider app on Wi-Fi at home. Keep the line off until departure.",
    },
    {
      title: "Disable data roaming on your primary UK mobile SIM",
      body: "Turn off data roaming on your UK SIM to block unexpected daily carrier charges, while keeping SMS active for bank codes.",
    },
    {
      title: "Enable your UAE eSIM line when arriving at Dubai or Abu Dhabi airport",
      body: "Switch mobile data to the UAE eSIM line upon landing and enable data roaming on that profile.",
    },
  ],
  faq: [
    {
      question: "Can I make WhatsApp or FaceTime audio and video calls in Dubai?",
      answer:
        "No. Unlicensed internet phone calls on WhatsApp, FaceTime Audio, Skype and Messenger are blocked across all cellular and Wi-Fi networks in the UAE by the regulator. Text messages, voice notes and photos work normally. For internet calling, local apps like Botim are officially approved.",
    },
    {
      question: "Is the free SIM given at Dubai Airport better than a travel eSIM?",
      answer:
        "The free tourist SIM handed out at passport control includes only 1GB valid for 24 hours. Topping it up with extra data through local Emirati carrier packages is significantly more expensive than purchasing a prepaid 10GB or 20GB travel eSIM ahead of time.",
    },
    {
      question: "Does Sky Mobile's £2 Roaming Passport Plus work in the UAE?",
      answer:
        "Yes. Sky Mobile includes the UAE in its £2/24-hour Roaming Passport Plus pass, which uses your UK piggybank allowance up to a 25GB billing cycle cap. If you have plenty of UK data and a VoLTE-compatible handset, it is one of the rare good-value UK network options.",
    },
    {
      question: "Will my UK banking and verification texts still arrive in the UAE?",
      answer:
        "Yes. By keeping your physical UK SIM active with mobile data roaming turned off, incoming SMS verification codes for UK banks, credit cards and secure logins will still arrive without cost.",
    },
    {
      question: "Does a UAE travel eSIM include an Emirati phone number?",
      answer:
        "Standard travel eSIMs are data-only and do not include a local +971 telephone number. Ride apps like Careem and Uber, as well as food delivery apps like Talabat, work smoothly with data and can link to your UK mobile number.",
    },
    {
      question: "How fast is 5G mobile data coverage across the UAE?",
      answer:
        "Mobile speeds in the UAE are world-leading. Both e& and du consistently deliver 5G download speeds exceeding 200Mbps to 500Mbps across Dubai and Abu Dhabi, making photo uploads, navigation and cloud backups lightning fast.",
    },
  ],
  related: ["turkey", "egypt", "thailand", "japan", "united-states"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
