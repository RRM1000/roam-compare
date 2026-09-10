import type { DestinationGuide } from "./types.ts";

export const canadaGuide: DestinationGuide = {
  destination: "canada",
  keyword: "Canada eSIM",
  title: "Canada eSIM vs UK roaming: best travel data options (2026)",
  description:
    "Visiting Canada from the UK? Compare Canada eSIM deals against roaming rates from EE, O2, Vodafone, Three and others. Discover why buying an eSIM saves £50+ on Rogers, Bell and Telus networks.",
  verdict: {
    heading: "Short answer: buy a Canada travel eSIM before you fly to avoid steep rest-of-world carrier charges.",
    body:
      "Canada is classified as Rest of World by every UK mobile network. Roaming costs extra across the board: EE charges £6 for 24 hours or up to £50 for 15 days, O2 charges £7 daily, Three charges £5 daily with no tethering, and standard out-of-bundle rates on networks like SMARTY or giffgaff can exceed £100 per gigabyte. For a one- or two-week holiday in Toronto, Vancouver, or Banff, a Canada travel eSIM costing between £6 and £20 delivers 5GB to 20GB on Canada's top national networks (Bell, Telus, and Rogers), keeping you connected for less than two days of carrier passes.",
  },
  facts: [
    {
      label: "Big Three networks",
      value: "Bell Mobility, Telus, and Rogers Wireless dominate Canadian mobile infrastructure, providing comprehensive national coverage.",
    },
    {
      label: "Vast geography",
      value: "Canada spans six time zones; while metropolitan areas and highway corridors have 5G, vast wilderness areas in national parks have zero mobile signal.",
    },
    {
      label: "3G shutdown",
      value: "Canadian carriers have retired 3G and CDMA legacy networks; handsets must support 4G VoLTE and LTE bands 4/7/12/13.",
    },
    {
      label: "Airport Wi-Fi",
      value: "Major hubs including Toronto Pearson (YYZ), Vancouver (YVR), and Montreal (YUL) provide free Wi-Fi, but connections can be slow during border security queues.",
    },
    {
      label: "UK visitors",
      value: "Around 800,000 UK residents travel to Canada each year for tourism, family visits, and business.",
    },
  ],
  networks: {
    intro:
      "Canada sits in every UK network's Rest of World tier. Without an active roaming pass, standard pay-as-you-go data rates outside Europe are steep.",
    rows: [
      {
        network: "ee",
        scenario: "ee-row1",
        headline: "Rest of World Zone 1 pass: £6/24h, £30/7d, or £50/15d",
        detail: "Uses your domestic UK allowance up to a 50GB fair-use ceiling. Selected Full Works plans include this zone as an inclusive benefit.",
      },
      {
        network: "o2",
        scenario: null,
        headline: "O2 Travel: £7 on days you make calls, send texts or use data",
        detail: "Provides unlimited data at speeds capped at 2Mbps, plus inclusive calls and texts back to the UK and within Canada. Included on Ultimate plans.",
      },
      {
        network: "vodafone",
        scenario: null,
        headline: "Global Roaming: check your tariff in the Vodafone app",
        detail: "Canada is in Vodafone's Global Roaming Zone C. Plans with global roaming include it; otherwise, Vodafone charges a daily fee displayed against your number.",
      },
      {
        network: "three",
        scenario: null,
        headline: "Go Roam Around the World: £5/day or prepaid passes",
        detail: "Three charges £5 per day (or sells 3, 7, or 14-day passes) with a 12GB fair-use limit. Personal hotspot and tethering are strictly not allowed.",
      },
      {
        network: "id-mobile",
        scenario: null,
        headline: "iD Roam Beyond pass: £5/day (2GB) up to £35/10d (20GB)",
        detail: "Canada is included in iD Mobile's Roam Beyond add-on passes. Standard unbundled rates cost an exorbitant £3/MB.",
      },
      {
        network: "sky-mobile",
        scenario: null,
        headline: "Roaming Passport Plus: £2 for 24 hours of access",
        detail: "Sky Mobile charges £2 per 24-hour window, drawing from your domestic data allowance up to a 25GB monthly billing limit.",
      },
      {
        network: "giffgaff",
        scenario: null,
        headline: "Travel data add-on: 1GB, 5GB or 10GB purchased in-app",
        detail: "Canada is eligible for giffgaff's fixed-price global data add-ons. Standard unbundled data costs 20p/MB (roughly £200/GB).",
      },
      {
        network: "smarty",
        scenario: null,
        headline: "Standard out-of-bundle rate: 10p per megabyte",
        detail: "Equivalent to roughly £100 per gigabyte. SMARTY's £45 spend cap will disconnect service after around 450MB, making an eSIM essential.",
      },
      {
        network: "voxi",
        scenario: null,
        headline: "Global Roaming Extra: £16 for 8 days (2GB) or £26.60 for 15 days (4GB)",
        detail: "VOXI sells fixed Global Roaming Extra bundles for Canada. Domestic endless streaming benefits do not travel abroad.",
      },
      {
        network: "tesco-mobile",
        scenario: null,
        headline: "Standard Rest of World PAYG rate: £5 per megabyte",
        detail: "Tesco Mobile charges standard Region 2 rates on PAYG (£5/MB), making unmetered mobile data virtually unusable without Wi-Fi or an eSIM.",
      },
    ],
  },
  providers: {
    intro:
      "Four leading travel eSIM providers serve UK visitors to Canada. Bell, Telus, and Rogers provide the physical cellular infrastructure.",
    notes: [
      {
        provider: "Airalo",
        localNetwork: "Rogers / Bell (Tuque Mobile)",
        summary: "Airalo's 'Tuque Mobile' eSIM links to Rogers and Bell networks. Easy in-app top-ups and reliable data in major cities.",
        watchOut: "Unlimited plans throttle speeds to 1Mbps once 3GB is consumed in a 24-hour cycle.",
      },
      {
        provider: "Klook",
        localNetwork: "Bell / Telus",
        summary: "Offers daily-allowance and fixed data packages on Bell and Telus with fast QR code setup.",
        watchOut: "Delivered via email voucher; ensure your device is unlocked from your UK carrier.",
      },
      {
        provider: "Nomad",
        localNetwork: "Telus / Bell",
        summary: "High-speed 5G/4G connectivity on Telus and Bell's shared radio network. Full hotspot sharing supported for remote work and navigation.",
        watchOut: "Must be activated within 60 days of purchase; prices converted from USD.",
      },
      {
        provider: "Saily",
        localNetwork: "Rogers / Bell",
        summary: "Quotes fixed pricing in GBP with direct connection to Rogers and Bell national 5G networks. Excellent reliability across urban and provincial Canada.",
        watchOut: "Plan validity timer begins as soon as the eSIM connects to a Canadian cell tower; configure before departure.",
      },
    ],
  },
  sections: [
    {
      id: "why-canada-is-rest-of-world-on-uk-networks",
      heading: "Why Canada sits outside inclusive UK roaming zones",
      paragraphs: [
        "Even though Canada is a premier long-haul destination for British visitors, all UK mobile networks classify Canada as Rest of World. Unlike EU travel where roaming is frequently included or capped at low daily rates, Canadian mobile networks charge international carriers substantial wholesale data fees.",
        "Connecting without a dedicated roaming pass can lead to immediate bill shock. With unbundled rates ranging from 20p to £5 per megabyte on pay-as-you-go tariffs, streaming a single music album or downloading offline maps can exceed your carrier spend cap in minutes. A prepaid travel eSIM removes this financial hazard completely.",
      ],
    },
    {
      id: "canadian-mobile-carriers-rogers-bell-telus",
      heading: "Canadian mobile carriers: Rogers, Bell, and Telus",
      paragraphs: [
        "The Canadian telecommunications market is dominated by the 'Big Three': Rogers Wireless, Bell Mobility, and Telus Mobility. Bell and Telus operate an extensive shared radio access network, meaning their geographic coverage is virtually identical, while Rogers maintains its own robust national cellular network.",
        "5G coverage is widespread throughout metropolitan corridors such as the Greater Toronto Area, Vancouver, Montreal, Calgary, Ottawa, and Edmonton. International travel eSIMs partner with these tier-1 carriers, giving UK visitors access to the same high-speed mobile networks used by Canadian residents.",
      ],
    },
    {
      id: "connectivity-in-national-parks-and-wilderness",
      heading: "Staying connected in Banff, Jasper, and the Canadian Rockies",
      paragraphs: [
        "If you are embarking on a road trip through Alberta, British Columbia, or eastern maritime provinces, mobile coverage requires realistic expectations. While town centres like Banff, Canmore, Jasper, and Whistler have excellent 5G and 4G reception, mountainous stretches of the Icefields Parkway and backcountry wilderness have zero mobile signal.",
        "Always download Google Maps offline and keep park trail maps saved locally before leaving your hotel. When hiking or exploring remote provincial parks, carry a satellite communicator if traveling outside cellular coverage zones.",
      ],
    },
    {
      id: "comparing-esims-with-canadian-airport-sims",
      heading: "Why travel eSIMs beat buying a local SIM in Canada",
      paragraphs: [
        "Buying a physical SIM card at Toronto Pearson or Vancouver Airport is notoriously expensive and inconvenient. Canadian domestic mobile plans are among the priciest in the developed world, with airport kiosks frequently charging $50 to $70 CAD plus tax for basic tourist starter packs with mandatory passport registration.",
        "In contrast, an eSIM can be bought online for £6 to £20, installed in minutes from the comfort of home, and delivers instant connectivity the second your flight touches down on the runway.",
      ],
    },
  ],
  setup: [
    {
      title: "Buy your Canada eSIM before departing",
      body: "Choose an eSIM package that matches your planned data consumption and scan the activation QR code onto your unlocked phone on home Wi-Fi.",
    },
    {
      title: "Switch off UK data roaming",
      body: "In your phone's cellular settings, turn data roaming off on your UK SIM card to prevent automatic background data from triggering daily £6-£7 carrier fees.",
    },
    {
      title: "Assign eSIM as your data connection",
      body: "Select the Canada eSIM as your preferred cellular data line and ensure 'Data Roaming' is toggled on for the eSIM profile.",
    },
    {
      title: "Connect on arrival",
      body: "Once your plane lands in Canada, turn off airplane mode. Your handset will register with Rogers, Bell, or Telus within a couple of minutes.",
    },
  ],
  faq: [
    {
      question: "Do UK phone networks charge for roaming in Canada?",
      answer:
        "Yes. Canada is placed in the Rest of World roaming tier by all UK mobile networks. EE charges £6/day or sells weekly passes, O2 charges £7/day, Three charges £5/day, and PAYG data rates without a pass can cost £3 to £5 per megabyte.",
    },
    {
      question: "Will my UK phone work in Canada?",
      answer:
        "Yes, provided your smartphone is carrier-unlocked and supports 4G LTE bands (specifically bands 4, 7, 12, and 13) and VoLTE calling, as Canadian networks have largely decommissioned legacy 3G infrastructure.",
    },
    {
      question: "Which Canadian mobile network is best for tourists?",
      answer:
        "Rogers, Bell, and Telus all offer excellent nationwide coverage. Bell and Telus have outstanding coverage across western Canada and the Rockies, while Rogers is particularly strong in Ontario, Quebec, and major urban centres.",
    },
    {
      question: "Can I use mobile hotspot and tethering in Canada with an eSIM?",
      answer:
        "Yes, travel eSIMs from Saily, Nomad, and Airalo support tethering on standard fixed-data allowances, allowing you to share internet with your laptop or travel partners.",
    },
    {
      question: "Do I get a Canadian phone number with a travel eSIM?",
      answer:
        "Most travel eSIMs provide data only and do not include a local Canadian (+1) phone number. You can make app-based voice and video calls via WhatsApp, FaceTime, or Zoom, and keep your UK SIM active for banking 2FA texts.",
    },
  ],
  related: ["united-states", "australia", "mexico", "japan", "germany"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
