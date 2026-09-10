import type { DestinationGuide } from "./types.ts";

/**
 * Germany guide. Written 10 September 2026. UK network prices reflect published
 * tariffs and scenarios in lib/roaming.ts.
 */
export const germanyGuide: DestinationGuide = {
  destination: "germany",
  keyword: "Germany eSIM",
  title: "Germany eSIM vs UK roaming: best travel data options (2026)",
  description:
    "Travelling to Germany for business or leisure? Compare UK mobile roaming rules with prepaid Germany travel eSIMs from Airalo, Nomad, Saily and Klook for Berlin, Munich, Frankfurt and Hamburg.",
  verdict: {
    heading: "Short answer: O2 and Tesco include free roaming in Germany; EE, Vodafone and Three charge daily fees.",
    body: "Germany is an EU member state, meaning UK networks handle roaming under post-Brexit European terms. If you are with O2, iD Mobile, SMARTY or Tesco Mobile, your UK allowance works in Germany without extra daily charges, up to domestic fair-use caps (5GB to 30GB). However, if your contract is with EE (£2.47/day), Vodafone (£2.75/day) or Three (£2/day), daily roaming fees can quickly add up over a business conference, city break, or Oktoberfest trip. A Germany travel eSIM from £3.50 connects directly to Telekom or O2 Germany with high-speed 5G data and zero roaming fees.",
  },
  facts: [
    {
      label: "Local networks",
      value: "Telekom (Deutsche Telekom), Vodafone Deutschland, O2 (Telefónica Germany), and 1&1. Telekom consistently ranks highest for network speed and rural railway coverage.",
    },
    {
      label: "5G rollout",
      value: "Extensive nationwide 5G deployment across Berlin, Munich, Frankfurt, Hamburg, Cologne, and along major ICE rail corridors on 3.6GHz and dynamic spectrum bands.",
    },
    {
      label: "Strict SIM registration laws",
      value: "German federal law mandates strict video-ID or postal passport verification for physical prepaid SIM cards, making airport and in-store SIM purchases time-consuming.",
    },
    {
      label: "EU fair-use caps",
      value: "Inclusive UK roaming providers apply domestic caps: O2 limits EU roaming to 25GB, iD Mobile to 30GB, SMARTY to 12GB, and giffgaff to 5GB per monthly plan.",
    },
    {
      label: "Airport and rail Wi-Fi",
      value: "Frankfurt (FRA), Munich (MUC), Berlin Brandenburg (BER), and Deutsche Bahn ICE trains offer free unlimited public Wi-Fi.",
    },
    {
      label: "UK visitors",
      value: "Over 3 million visits are made annually from the UK to Germany for trade fairs, corporate travel, Christmas markets, and cultural breaks.",
    },
  ],
  networks: {
    intro:
      "Germany is an EU destination. Following Brexit, UK mobile operators are not subject to EU roaming regulations: some networks maintain inclusive roaming within fair-use limits, while others charge daily fees.",
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
        detail: "Roam in Germany without extra charge using your UK allowance. A 25GB fair-use monthly ceiling applies; exceeding 25GB costs £3.50 per gigabyte.",
      },
      {
        network: "vodafone",
        scenario: null,
        headline: "Vodafone Europe Roaming: £2.75 daily fee or multi-day passes (£16 for 8d, £21 for 15d)",
        detail: "Standard pay monthly plans charge £2.75/day or require a European Roaming Pass. A 25GB fair-use cap applies. Select Xtra plans with 4 roaming benefits include Germany free.",
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
        headline: "iD Roam Free: Included at no extra cost across Germany and 50 EU destinations",
        detail: "Utilises your UK allowance with a fair-use data limit of up to 30GB per month (or your monthly plan limit if lower). Connects seamlessly with German partner networks.",
      },
      {
        network: "sky-mobile",
        scenario: null,
        headline: "Roaming Passport Plus: £2 per 24 hours to access your UK allowance",
        detail: "Triggers automatically when you make a call, send an SMS, or use mobile data in Germany. Draws from your domestic data allowance up to a 25GB fair-use cap.",
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
        detail: "Roam in Germany using your normal UK allowance up to a 12GB monthly cap. If you need additional data, add-ons cost £1 per gigabyte with no expiration during your active plan.",
      },
      {
        network: "voxi",
        scenario: null,
        headline: "European Roaming Pass: £2.45 for 1 day, £4.50 for 2 days, £12.50 for 8 days, £17.50 for 15 days",
        detail: "VOXI requires a European pass to access mobile data in Germany. Endless Social and Endless Video streaming benefits do not apply abroad; a 20GB cap applies.",
      },
      {
        network: "tesco-mobile",
        scenario: null,
        headline: "Home From Home: Included at no extra cost across 48 European destinations",
        detail: "Use your UK minutes, texts, and data allowance in Germany without surcharge. Clubcard deals and standard pay monthly contracts are covered by the fair-use policy.",
      },
    ],
  },
  providers: {
    intro:
      "We compare four major travel eSIM providers for Germany. Saily and Nomad stream live real-time pricing; Airalo prices are independently checked; Klook offers flexible daily and fixed packages.",
    notes: [
      {
        provider: "Airalo",
        localNetwork: "O2 / Telekom",
        summary: "Dependable coverage across Germany on O2 and Telekom, offering fixed data allowances from 1GB to 50GB and unlimited options.",
        bestFor: "Business and leisure travellers seeking stable multi-carrier connectivity across German cities.",
        watchOut: "Unlimited data plans throttle speeds to 1Mbps once you pass 3GB of daily consumption.",
        watchFor: "Fair-use throttling after 3GB per day on unlimited tiers.",
      },
      {
        provider: "Nomad",
        localNetwork: "Telekom / Vodafone Deutschland",
        summary: "Delivers high-speed 4G and 5G connections on Telekom and Vodafone, priced in USD with transparent high-speed data allowances and hotspot capability.",
        bestFor: "Heavy data users needing top-tier 5G speeds, mobile hotspot sharing, and multi-week validity.",
        watchOut: "Must be activated within 60 days of purchase date.",
        watchFor: "60-day activation window from purchase date.",
      },
      {
        provider: "Saily",
        localNetwork: "Local partner networks",
        summary: "Displays checkout prices directly in GBP, avoiding bank foreign exchange fees. Simple in-app activation with dedicated customer support.",
        bestFor: "UK travellers who want fixed British pound pricing and quick app-based management.",
        watchOut: "Activates automatically the moment the profile connects to a German network.",
        watchFor: "Immediate activation upon first network connection in Germany.",
      },
      {
        provider: "Klook",
        localNetwork: "Telekom / O2",
        summary: "Provides flexible daily-allowance bundles (1GB–3GB/day or unlimited) with QR code voucher delivery for travelers wanting daily resets.",
        bestFor: "Weekend city breaks, Christmas market tours, and short business trips.",
        watchOut: "Handset must be carrier-unlocked; voucher QR code should be redeemed prior to arrival.",
        watchFor: "Handset must be carrier-unlocked for QR voucher activation.",
      },
    ],
  },
  sections: [
    {
      id: "uk-roaming-rules-germany",
      heading: "Post-Brexit roaming in Germany: which UK networks charge daily fees?",
      paragraphs: [
        "Since the UK's departure from the EU, British mobile networks are no longer bound by EU-wide surcharge prohibitions. When visiting Germany, your roaming charges will depend entirely on your UK provider's contract terms.",
        "O2, iD Mobile, SMARTY, and Tesco Mobile include Germany roaming as standard within domestic allowances (up to fair-use data limits). In contrast, EE (£2.47/day), Vodafone (£2.75/day), Three (£2/day) and Sky Mobile (£2/24h) charge daily roaming rates. For a week attending a trade fair or holiday in Bavaria, these carrier fees can quickly add £14 to £35, making a prepaid Germany travel eSIM a significantly more affordable choice.",
      ],
    },
    {
      id: "german-network-coverage",
      heading: "Network coverage in Germany: cities, autobahns and ICE rail routes",
      paragraphs: [
        "Germany has four national mobile network operators: Telekom (Deutsche Telekom), Vodafone Deutschland, O2 (Telefónica Germany), and newer entrant 1&1. Telekom consistently wins independent network tests for overall download speeds, reliability, and coverage along railway tracks and federal motorways.",
        "Travel eSIMs from providers like Nomad and Airalo connect to Telekom and O2, ensuring fast 4G and widespread 5G access whether you are in central Berlin, exploring Munich, or travelling on high-speed ICE trains between Frankfurt and Hamburg.",
      ],
    },
    {
      id: "fair-use-limits-germany",
      heading: "Managing UK fair-use roaming limits on trips to Germany",
      paragraphs: [
        "Even on UK networks that offer inclusive EU roaming in Germany, you are restricted by domestic fair-use caps. For example, giffgaff restricts roaming data to 5GB per monthly bundle, SMARTY caps usage at 12GB, and O2 and Sky enforce a 25GB monthly ceiling.",
        "Corporate travellers running video calls on tethered laptops or tourists navigating cities on Google Maps can easily burn through 5GB or 12GB. Exceeding your allowance can result in out-of-plan data charges of around 10p per megabyte (£100 per gigabyte). A dedicated travel eSIM eliminates this risk entirely.",
      ],
    },
    {
      id: "german-id-law-esim-advantage",
      heading: "Germany's strict SIM identity laws: the travel eSIM advantage",
      paragraphs: [
        "Under Section 111 of the German Telecommunications Act (Telekommunikationsgesetz), purchasing a local physical prepaid SIM card in Germany strictly requires real-time identity verification. Tourists must present a valid passport and complete an identity check via video call (Video-Ident) or at a German post office (PostIdent).",
        "Travel eSIMs bypass this cumbersome bureaucracy completely. You can purchase and install your digital eSIM online before leaving the UK without submitting personal identification, ensuring your smartphone is connected to high-speed data the moment you touch down in Germany.",
      ],
    },
  ],
  setup: [
    {
      title: "Purchase and install your Germany eSIM at home",
      body: "Set up your travel eSIM on home Wi-Fi before heading to the airport. Scan the QR code or use the provider's app to install the profile, label it 'Germany Travel', and leave roaming switched off until departure.",
    },
    {
      title: "Turn off data roaming on your UK line",
      body: "If your UK provider (like EE, Vodafone, Three or Sky) charges daily connection fees in Europe, keep your primary SIM active for two-factor authentication SMS, but switch off 'Data Roaming' on that SIM.",
    },
    {
      title: "Activate mobile data on your Germany eSIM on arrival",
      body: "Upon arrival in Berlin, Frankfurt, Munich or Hamburg, disable Airplane Mode, set your Germany eSIM as your primary Cellular Data line, and turn on Data Roaming on that eSIM to register with Telekom or O2.",
    },
  ],
  faq: [
    {
      question: "Do UK phones work in Germany without roaming charges?",
      answer: "Yes, if you are with a UK network that includes surcharge-free EU roaming, such as O2, iD Mobile, SMARTY, or Tesco Mobile. EE, Vodafone, Three and Sky Mobile charge daily roaming fees or pass costs.",
    },
    {
      question: "Which UK mobile networks charge daily roaming fees in Germany?",
      answer: "EE charges £2.47 per day on plans started after July 2021. Vodafone charges £2.75 per day or £16 for 8 days. Three charges £2 per day or sells Go Roam passes. Sky Mobile charges £2 per 24 hours.",
    },
    {
      question: "Will a Germany travel eSIM work on ICE trains and the Autobahn?",
      answer: "Yes. Major networks like Telekom and Vodafone provide continuous 4G and 5G cellular coverage along German Autobahns and high-speed Deutsche Bahn rail corridors.",
    },
    {
      question: "Why is buying a physical SIM card difficult in Germany?",
      answer: "German telecommunications law mandates strict identity verification (Video-Ident or PostIdent) with a passport before activating any local physical prepaid SIM. Travel eSIMs bypass this requirement entirely.",
    },
    {
      question: "Can I use WhatsApp and tether other devices with a Germany eSIM?",
      answer: "Yes. WhatsApp, FaceTime, and Teams operate normally on mobile data. Providers like Saily and Nomad support personal hotspot tethering without restrictions, unlike Three Go Roam passes which ban tethering.",
    },
    {
      question: "Is 5G widely available across Germany on travel eSIMs?",
      answer: "Yes, 5G is widely available across Berlin, Frankfurt, Munich, Hamburg, Cologne, and Stuttgart. Compatible devices on supported eSIM profiles will connect to local 5G cells automatically.",
    },
  ],
  related: ["france", "netherlands", "italy", "spain", "ireland"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
