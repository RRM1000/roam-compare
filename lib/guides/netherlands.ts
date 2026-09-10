import type { DestinationGuide } from "./types.ts";

export const netherlandsGuide: DestinationGuide = {
  destination: "netherlands",
  keyword: "Netherlands eSIM",
  title: "Netherlands eSIM vs UK roaming: best data options (2026)",
  description:
    "Visiting the Netherlands from the UK? Compare Netherlands eSIM prices against roaming rules for EE, O2, Vodafone, Three and more. Learn about KPN and Odido 5G, OVpay transit tapping, and avoiding daily EU roaming surcharges.",
  verdict: {
    heading: "Short answer: check your UK plan first; an eSIM is cheap backup or primary data if your carrier charges daily fees.",
    body:
      "Unlike long-haul destinations, the Netherlands is part of the EU. If your UK mobile provider offers inclusive EU roaming (such as O2, or certain legacy tariffs), you can use your domestic allowance up to the carrier's fair-use cap (usually 12GB to 25GB). However, if you are with EE (which charges £2.72 daily or £16.50/week without a pass), Vodafone, or VOXI where European roaming incurs extra fees, buying a travel eSIM for £4 to £12 gives you seamless high-speed data across KPN, Vodafone NL, or Odido networks without daily carrier surcharges.",
  },
  facts: [
    {
      label: "Local networks",
      value: "KPN, Vodafone Netherlands, and Odido (formerly T-Mobile Netherlands). Travel eSIMs typically connect to KPN or Vodafone NL.",
    },
    {
      label: "5G coverage",
      value: "Extensive nationwide 5G coverage across Amsterdam, Rotterdam, The Hague, Utrecht, and rural Dutch rail corridors.",
    },
    {
      label: "Public transport",
      value: "OVpay lets you tap in and out across all Dutch trains, trams, metros, and buses with contactless bank cards or Apple/Google Pay on your phone.",
    },
    {
      label: "Emergency calls",
      value: "Dial 112 for emergency services in the Netherlands. Works on any active mobile network even with data-only eSIMs.",
    },
    {
      label: "UK visitors",
      value: "Over 2.4 million visits are made annually from the UK to the Netherlands, making it one of the UK's most popular European short-break destinations.",
    },
  ],
  networks: {
    intro:
      "The Netherlands is in Europe Zone / EU roaming for all UK networks. Depending on your provider and contract start date, you may have inclusive roaming with a fair-use cap, or pay daily access fees.",
    rows: [
      {
        network: "ee",
        scenario: "ee-europe-new",
        headline: "EE Europe passes: £2.72 per day, £16.50 for 7 days, or £30 for 15 days",
        detail: "Applies to plans started or upgraded from 7 July 2021. Uses your domestic UK allowance up to a 50GB fair-use ceiling. Older plans or Roam Abroad pass add-ons may include EU roaming.",
      },
      {
        network: "o2",
        scenario: null,
        headline: "O2 Europe Zone: included at no extra charge (up to 25GB)",
        detail: "O2 includes EU roaming across standard Pay Monthly tariffs. You can use your UK minutes, texts, and data up to a 25GB fair-use limit with no daily access fee.",
      },
      {
        network: "vodafone",
        scenario: null,
        headline: "European roaming: included on Xtra plans, or £2.75 daily / multi-day passes",
        detail: "Plans with 4 Xtra benefits include European roaming. On standard plans without roaming, Vodafone charges £2.75 per day or sells an 8-day (£16) or 15-day (£21) European roaming pass with a 25GB cap.",
      },
      {
        network: "three",
        scenario: null,
        headline: "Go Roam Europe: £2 daily charge or prepaid passes, up to 12GB",
        detail: "Customers joining or upgrading after October 2021 pay a £2 daily charge to unlock UK allowances in the EU, or can purchase 3, 7, or 14-day Go Roam passes. Fair-use limit is 12GB; no hotspot tethering.",
      },
      {
        network: "id-mobile",
        scenario: null,
        headline: "iD Roam Free: inclusive roaming throughout the EU (up to 30GB)",
        detail: "iD Mobile includes roaming in 50 destinations including the Netherlands at no extra cost, subject to a fair-use cap of up to 30GB depending on your monthly plan.",
      },
      {
        network: "sky-mobile",
        scenario: null,
        headline: "Roaming Passport Plus: £2 for 24 hours of access",
        detail: "Sky Mobile charges £2 per 24 hours to access your UK data allowance in Europe, drawing from your UK piggybank or monthly allowance up to 25GB.",
      },
      {
        network: "giffgaff",
        scenario: null,
        headline: "EU roaming included: up to 5GB per plan",
        detail: "Giffgaff includes EU roaming in all plans up to a 5GB fair-use limit per plan. Once you reach 5GB, out-of-bundle rates of 10p/MB apply unless you start a new plan early.",
      },
      {
        network: "smarty",
        scenario: null,
        headline: "EU roaming included: up to 12GB fair-use allowance",
        detail: "SMARTY includes EU roaming in the Netherlands at no extra fee. You can use up to 12GB of your domestic plan data abroad.",
      },
      {
        network: "voxi",
        scenario: null,
        headline: "European Roaming Pass: £2.75/day or multi-day bundles",
        detail: "VOXI requires a European Roaming Pass (£2.75 for 1 day, £5 for 2 days, £16 for 8 days, or £21 for 15 days). Unlimited domestic social media passes do not apply abroad.",
      },
      {
        network: "tesco-mobile",
        scenario: null,
        headline: "Home From Home: inclusive EU roaming on eligible contracts",
        detail: "Tesco Mobile's Home From Home allows you to use your UK minutes, texts, and data in the Netherlands up to your plan allowance without additional charges on eligible tariffs.",
      },
    ],
  },
  providers: {
    intro:
      "Four leading travel eSIM providers cover the Netherlands. Saily and Nomad provide live pricing feeds, Airalo offers straightforward fixed tiers, and Klook sells daily and multi-day packages.",
    notes: [
      {
        provider: "Airalo",
        localNetwork: "KPN",
        summary: "Airalo's 'Hup Mobile' eSIM operates on KPN's tier-1 network, delivering fast 4G and 5G data across the country. Straightforward top-ups via the Airalo app.",
        watchOut: "Unlimited options throttle speeds to 1Mbps after 3GB of high-speed consumption in a single day.",
      },
      {
        provider: "Klook",
        localNetwork: "Vodafone / KPN",
        summary: "Provides customizable day-pass bundles (1GB/day, 2GB/day, or unlimited tiers) on Vodafone NL and KPN networks.",
        watchOut: "Delivered via QR code voucher; check your phone is carrier-unlocked before purchase.",
      },
      {
        provider: "Nomad",
        localNetwork: "KPN / Vodafone NL",
        summary: "Offers single-country Netherlands and regional Europe packages with 5G connectivity on KPN and Vodafone NL. Mobile hotspot sharing is fully enabled.",
        watchOut: "Nomad vouchers expire if not activated within 60 days of purchase; prices are converted from USD.",
      },
      {
        provider: "Saily",
        localNetwork: "KPN / Odido",
        summary: "Competitive pricing quoted directly in GBP. Saily partners with top Dutch carriers providing reliable 5G and 4G coverage in Amsterdam and across the provinces.",
        watchOut: "Activates automatically upon initial network handshake in the Netherlands; install profile before boarding.",
      },
    ],
  },
  sections: [
    {
      id: "uk-roaming-vs-esim",
      heading: "UK roaming vs buying a Netherlands eSIM: which should you choose?",
      paragraphs: [
        "Because the Netherlands is in the European Union, British travellers benefit from EU roaming policies on some UK networks. If you are with O2, iD Mobile, SMARTY, or Tesco Mobile, your domestic plan may already cover your data needs up to their fair-use thresholds (5GB to 25GB) at no extra charge.",
        "However, if you are a customer of EE, Vodafone, Three, or VOXI on a recent contract, you will likely face daily roaming surcharges ranging from £2 to £2.75 per day. Over a four-day long weekend in Amsterdam or a week touring the Dutch countryside, those carrier fees add £8 to £20 to your bill. In contrast, an independent travel eSIM costs as little as £4 for 1GB to 3GB or £8 for 10GB, delivering better speed and leaving your UK allowances untouched.",
      ],
    },
    {
      id: "dutch-mobile-networks",
      heading: "Dutch mobile networks: KPN, Vodafone, and Odido",
      paragraphs: [
        "The Netherlands boasts one of Europe's most technologically advanced mobile telecom infrastructures, dominated by three national operators: KPN, Vodafone Netherlands, and Odido (formerly T-Mobile Netherlands). Network reliability and speed are exceptionally high across both dense urban areas and rural polder regions.",
        "5G connectivity is widespread across all major cities—including Amsterdam, Rotterdam, Utrecht, and Eindhoven—and covers intercity railway corridors. Travel eSIM providers typically partner with KPN or Vodafone NL, ensuring fast and stable connections whether you are exploring museum districts or navigating canal rings.",
      ],
    },
    {
      id: "ovpay-and-transit",
      heading: "Using OVpay, transit navigation, and public Wi-Fi safety",
      paragraphs: [
        "Getting around the Netherlands is extraordinarily seamless thanks to OVpay, the nationwide transit payment system. You can tap into and out of all Dutch trains (NS), trams, metros, and buses using your contactless bank card or smartphone wallet (Apple Pay or Google Pay) without needing a dedicated OV-chipkaart.",
        "Having persistent mobile data is essential for checking real-time train departures on the NS app or 9292 transit planner. While Amsterdam Schiphol Airport (AMS) and major train stations offer free public Wi-Fi, open connections are often unsecured and slow down during commuter rush hours. A dedicated eSIM guarantees secure, encrypted mobile data everywhere.",
      ],
    },
    {
      id: "dual-sim-tips",
      heading: "Managing your dual SIM setup in the Netherlands",
      paragraphs: [
        "Modern smartphones (iPhone XS and newer, Samsung Galaxy S20+, and Google Pixel 3a+) support dual SIM functionality with an eSIM. This means you can keep your physical UK SIM active to receive incoming phone calls and two-factor authentication banking texts for free.",
        "To avoid accidental roaming fees from your UK carrier, navigate to your phone's cellular settings before landing in Amsterdam. Set your Netherlands eSIM as your primary mobile data line, disable 'Cellular Data Switching', and switch off data roaming on your UK line while leaving data roaming turned on for your eSIM.",
      ],
    },
  ],
  setup: [
    {
      title: "Buy and install before departure",
      body: "Purchase your preferred Netherlands eSIM online and scan the QR code via your smartphone's cellular settings on home Wi-Fi before heading to the airport.",
    },
    {
      title: "Turn off data roaming on your UK SIM",
      body: "Keep your primary UK line active for incoming calls and security SMS codes, but turn off data roaming on that line to prevent unexpected carrier day fees.",
    },
    {
      title: "Set eSIM as your cellular data line",
      body: "Designate the Netherlands eSIM as your default mobile data provider and enable data roaming on the eSIM profile when landing at Amsterdam Schiphol or arriving via Eurostar.",
    },
    {
      title: "Verify APN and connection",
      body: "Your phone will automatically connect to KPN, Vodafone NL, or Odido within two minutes of arrival. If data does not start immediately, restart your handset.",
    },
  ],
  faq: [
    {
      question: "Do I need an eSIM for the Netherlands if I have a UK phone contract?",
      answer:
        "It depends on your UK network. Providers like O2 and iD Mobile include EU roaming at no extra charge up to their fair-use caps. However, EE, Vodafone, Three, and VOXI charge £2 to £2.75 daily for EU roaming on newer contracts. If your carrier charges daily fees, a travel eSIM for £4 to £10 is considerably cheaper.",
    },
    {
      question: "Will I get 5G speeds in the Netherlands on a travel eSIM?",
      answer:
        "Yes, most modern travel eSIMs from providers like Nomad, Saily, and Klook support 5G connectivity on KPN and Vodafone NL in Amsterdam, Rotterdam, Utrecht, and across major rail lines.",
    },
    {
      question: "Can I use my phone's mobile hotspot with a Netherlands eSIM?",
      answer:
        "Yes, providers like Saily, Nomad, and Airalo support tethering on standard fixed-data plans, allowing you to share your internet connection with laptops, tablets, or travel companions.",
    },
    {
      question: "Does a Netherlands travel eSIM come with a local Dutch phone number?",
      answer:
        "Most travel eSIMs are data-only packages and do not come with a local Dutch telephone number (+31). You can still make voice calls and send messages via WhatsApp, FaceTime, or Skype. Keep your UK SIM active for regular SMS verification.",
    },
    {
      question: "Can I use public transport in the Netherlands using my phone?",
      answer:
        "Yes. The Dutch nationwide OVpay system allows you to tap in and tap out across all NS trains, trams, buses, and metros using your contactless smartphone wallet (Apple Pay or Google Pay) without needing a transport ticket.",
    },
  ],
  related: ["germany", "france", "ireland", "spain", "italy"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
