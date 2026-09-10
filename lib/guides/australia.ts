import type { DestinationGuide } from "./types.ts";

export const australiaGuide: DestinationGuide = {
  destination: "australia",
  keyword: "Australia eSIM",
  title: "Australia eSIM vs UK roaming: best travel data options (2026)",
  description:
    "Visiting Australia from the UK? Compare Australia eSIM plans against UK carrier roaming fees. Learn about the 3G shutdown, rural Telstra coverage, and why a travel eSIM saves £100+ on long-haul trips.",
  verdict: {
    heading: "Short answer: buy an Australia travel eSIM before your flight unless your UK plan bundles long-haul roaming.",
    body:
      "Australia is classified as Rest of World by all UK mobile networks. Standard UK contracts do not include Australian roaming; carrier passes cost £6/day or up to £50 for 15 days on EE, £7/day on O2, and £5/day on Three. Because long-haul trips to Australia typically last two to four weeks, roaming fees can easily exceed £100 to £150 on your domestic mobile bill. An Australia travel eSIM from Saily, Nomad, or Airalo costs between £10 and £30 for 10GB to 20GB, running on tier-1 Australian networks like Telstra or Optus with fast 5G speeds.",
  },
  facts: [
    {
      label: "The Big Three",
      value: "Telstra, Optus, and Vodafone Australia (TPG Telecom) own and operate Australia's nationwide cellular networks.",
    },
    {
      label: "3G shutdown complete",
      value: "All Australian carriers have fully retired 3G networks. Your handset must support 4G VoLTE on Australian frequencies (Band 28 / 700MHz) to make emergency calls (000).",
    },
    {
      label: "Outback coverage",
      value: "Telstra has the undisputed largest physical footprint across the Outback, regional towns, and national parks; Optus and Vodafone are strong in urban capitals.",
    },
    {
      label: "Airport SIMs",
      value: "Sydney (SYD) and Melbourne (MEL) have local SIM counters, but lines are long after 24-hour flights and digital registration requires passport verification.",
    },
    {
      label: "UK visitors",
      value: "Over 700,000 UK travellers visit Australia annually, with average trip durations exceeding three weeks.",
    },
  ],
  networks: {
    intro:
      "Australia sits in every UK mobile operator's Rest of World tier. For trips lasting multiple weeks, standard carrier roaming is among the most expensive options.",
    rows: [
      {
        network: "ee",
        scenario: "ee-row1",
        headline: "Rest of World Zone 1 pass: £6/24h, £30/7d, or £50/15d",
        detail: "Draws from your UK data allowance up to 50GB. Included on select EE Full Works plans as an inclusive smart benefit.",
      },
      {
        network: "o2",
        scenario: null,
        headline: "O2 Travel: £7 per 24 hours of active connection",
        detail: "Provides unlimited data capped at 2Mbps, plus inclusive calls and texts. Included on O2 Ultimate contracts.",
      },
      {
        network: "vodafone",
        scenario: null,
        headline: "Global Roaming: tariff-specific pricing in the Vodafone app",
        detail: "Australia is part of Vodafone's Global Roaming Zone C. Customers without inclusive roaming must check specific daily charges in their account.",
      },
      {
        network: "three",
        scenario: null,
        headline: "Go Roam Around the World: £5 daily charge or passes",
        detail: "Three charges £5/day or sells Go Roam passes with a 12GB fair-use cap. Hotspot tethering is strictly not permitted.",
      },
      {
        network: "id-mobile",
        scenario: null,
        headline: "iD Roam Beyond pass: £5/1d up to £35/10d",
        detail: "Australia is included in iD Mobile's Roam Beyond add-on passes. Standard unmetered data costs £3/MB.",
      },
      {
        network: "sky-mobile",
        scenario: null,
        headline: "Roaming Passport Plus: £2 for 24 hours of access",
        detail: "Sky Mobile charges £2 per 24 hours to draw from your domestic UK allowance, capped at 25GB per billing period.",
      },
      {
        network: "giffgaff",
        scenario: null,
        headline: "Travel data add-on: 1GB, 5GB or 10GB in-app",
        detail: "Australia is covered by giffgaff's fixed-price global travel add-ons. Standard out-of-bundle rates cost 20p/MB.",
      },
      {
        network: "smarty",
        scenario: null,
        headline: "Out-of-plan rate: 10p per megabyte from top-up credit",
        detail: "Roughly £100 per gigabyte. SMARTY's £45 account spend cap will stop data after 450MB, making an eSIM far more economical.",
      },
      {
        network: "voxi",
        scenario: null,
        headline: "Global Roaming Extra: £16 for 8 days (2GB) or £26.60 for 15 days (4GB)",
        detail: "VOXI sells Global Roaming Extra passes for Australia. Unlimited social media streaming does not apply overseas.",
      },
      {
        network: "tesco-mobile",
        scenario: null,
        headline: "Rest of World PAYG rate: £5 per megabyte",
        detail: "Tesco Mobile PAYG charges £5/MB in Australia, making unbundled mobile browsing unsustainable on a typical holiday.",
      },
    ],
  },
  providers: {
    intro:
      "Four leading travel eSIM providers offer data for Australia. Telstra and Optus provide the fastest and most widespread physical network infrastructure.",
    notes: [
      {
        provider: "Airalo",
        localNetwork: "Optus (Kakadu Mobile)",
        summary: "Airalo's 'Kakadu Mobile' eSIM operates on Optus, offering easy in-app top-ups and reliable data in populated regions and capital cities.",
        watchOut: "Daily unlimited plans throttle to 1Mbps once 3GB is reached in a single day.",
      },
      {
        provider: "Klook",
        localNetwork: "Vodafone Australia / Optus",
        summary: "Flexible day-pass bundles and fixed allowances on Vodafone Australia and Optus networks with quick QR code setup.",
        watchOut: "Delivered via digital email voucher; ensure your device is unlocked from your UK network.",
      },
      {
        provider: "Nomad",
        localNetwork: "Optus",
        summary: "Reliable 5G and 4G connectivity across all Australian capital cities and coastal hubs on Optus. Hotspot tethering fully supported.",
        watchOut: "Plans must be activated within 60 days of purchase. Coverage in remote outback areas can be limited.",
      },
      {
        provider: "Saily",
        localNetwork: "Optus / Telstra",
        summary: "Quotes upfront GBP pricing with seamless connections on Optus and Telstra 5G networks across Sydney, Melbourne, Brisbane, and Perth.",
        watchOut: "Activates automatically upon first handshake with an Australian mobile tower; install before departure.",
      },
    ],
  },
  sections: [
    {
      id: "why-australia-costs-extra-on-uk-networks",
      heading: "Why Australian trips require dedicated data planning",
      paragraphs: [
        "Because flights from the UK to Australia take over 20 hours, the vast majority of British travellers visit for two, three, or four weeks. At carrier roaming rates of £5 to £7 per day, leaving your UK SIM on for the duration of a typical Australian holiday can easily add £100 to £200 to your phone bill.",
        "Furthermore, UK carriers cap international roaming data at 12GB to 25GB, meaning a high-usage traveler streaming video, uploading photos, and navigating across state lines could hit their limit halfway through the journey. A dedicated Australia eSIM gives you generous or unlimited data at a fraction of carrier costs.",
      ],
    },
    {
      id: "telstra-vs-optus-vs-vodafone-australia",
      heading: "Telstra vs Optus vs Vodafone: coverage across cities and the Outback",
      paragraphs: [
        "Australia's cellular landscape features three primary infrastructure providers: Telstra, Optus, and Vodafone Australia (TPG Telecom). In major urban centers—Sydney, Melbourne, Brisbane, Perth, and Adelaide—all three offer superfast 5G speeds with excellent coverage.",
        "However, Australia's interior is immense. If you are taking a road trip along the Great Ocean Road, driving into the Red Centre towards Uluru, or exploring Far North Queensland, Telstra boasts the largest coverage footprint by a wide margin. For remote journeys, pick an eSIM that roams on Telstra or consider a local Telstra prepaid SIM.",
      ],
    },
    {
      id: "australian-3g-sunset-and-volte-requirements",
      heading: "The Australian 3G shutdown: why your phone must support Band 28 VoLTE",
      paragraphs: [
        "All Australian mobile operators (Telstra, Optus, and Vodafone) have completely shut down their 3G networks. As a result, older 3G-only mobile phones or overseas handsets lacking 4G VoLTE (Voice over LTE) roaming support will not work in Australia.",
        "Crucially, under Australian telecommunications regulations, phones that cannot place emergency voice calls to 000 over 4G/VoLTE (using Band 28 / 700MHz) are blocked from registering on Australian networks. Most modern iPhones (iPhone 8 and newer) and major Android devices work without issue, but ensure VoLTE is enabled in your phone's cellular menu before traveling.",
      ],
    },
    {
      id: "why-travel-esims-beat-local-airport-sims",
      heading: "Comparing travel eSIMs against local Australian prepaid SIMs",
      paragraphs: [
        "Local Australian SIM cards from Optus or Vodafone can be purchased at Sydney Kingsford Smith (SYD) or Melbourne Tullamarine (MEL) airports. However, after a grueling long-haul journey, queuing at an airport retail kiosk, presenting your passport, and waiting for identity verification can be exhausting.",
        "Installing a travel eSIM before you board your flight in the UK ensures you have mobile data the instant your plane touches down in Australia. You can immediately order an Uber, message family, and navigate to your accommodation without waiting in line.",
      ],
    },
  ],
  setup: [
    {
      title: "Verify handset VoLTE support and buy an eSIM",
      body: "Confirm that your phone supports 4G VoLTE and Band 28 (700MHz), then purchase an Australia eSIM tailored to your stay duration.",
    },
    {
      title: "Install the profile at home on Wi-Fi",
      body: "Scan the provided QR code in your phone's cellular settings before departure so the eSIM profile is installed and ready.",
    },
    {
      title: "Switch off UK data roaming",
      body: "Turn off data roaming on your UK SIM to avoid unexpected £5 to £7 daily carrier access fees while keeping the line open for banking SMS.",
    },
    {
      title: "Turn on the Australia eSIM when landing",
      body: "Select the Australia eSIM as your active mobile data line and toggle on 'Data Roaming' for the eSIM upon arrival at the airport.",
    },
  ],
  faq: [
    {
      question: "Do UK mobile operators charge for roaming in Australia?",
      answer:
        "Yes. Australia is in the Rest of World roaming tier on all UK networks. Standard roaming costs £5 to £7 per day on Three, EE, and O2, which can quickly add up to over £100 on a multi-week trip.",
    },
    {
      question: "Will my UK smartphone work in Australia after the 3G shutdown?",
      answer:
        "Yes, provided your smartphone is carrier-unlocked and supports 4G VoLTE calling (especially LTE Band 28). All major Australian carriers have completely turned off their 3G networks.",
    },
    {
      question: "Which mobile network has the best coverage in regional Australia?",
      answer:
        "Telstra has the largest physical network footprint in Australia, providing the most dependable coverage in outback regions, national parks, and remote highway corridors. Optus and Vodafone are excellent in metropolitan areas.",
    },
    {
      question: "Can I use mobile hotspot and tethering in Australia on an eSIM?",
      answer:
        "Yes, fixed-allowance travel eSIMs from Saily, Nomad, and Airalo permit tethering, allowing you to connect laptops or other devices to your mobile data connection.",
    },
    {
      question: "What is the emergency telephone number in Australia?",
      answer:
        "The emergency number in Australia is 000 (Triple Zero) for police, ambulance, and fire services. Handsets with VoLTE emergency support can dial 000 free of charge on any available network.",
    },
  ],
  related: ["united-states", "canada", "japan", "thailand", "indonesia"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
