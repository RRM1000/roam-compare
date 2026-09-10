import type { DestinationGuide } from "./types.ts";

export const mexicoGuide: DestinationGuide = {
  destination: "mexico",
  keyword: "Mexico eSIM",
  title: "Mexico eSIM vs UK roaming: best travel data plans (2026)",
  description:
    "Heading to Mexico from the UK? Compare Mexico eSIM plans against UK carrier roaming charges. Get reliable 5G on Telcel and AT&T Mexico across Cancun, Mexico City, and Oaxaca without costly out-of-bundle roaming bills.",
  verdict: {
    heading: "Short answer: purchase a Mexico eSIM before travelling to stay connected without runaway roaming bills.",
    body:
      "Mexico is placed firmly in the Rest of World roaming tier by every UK mobile operator. UK networks do not include Mexico roaming: EE charges £6 for 24 hours or up to £50 for 15 days, O2 charges £7 daily, Three charges £5 daily with strict hotspot bans, and standard pay-as-you-go rates can reach £5 to £10 per megabyte. A Mexico travel eSIM from providers like Saily, Airalo, or Nomad costs between £6 and £20 for 5GB to 20GB, running on Mexico's dominant Telcel or AT&T Mexico networks with fast 5G and 4G coverage.",
  },
  facts: [
    {
      label: "Dominant network",
      value: "Telcel covers over 90% of Mexico's population, offering by far the strongest coverage in rural areas, Yucatan beach towns, and highways.",
    },
    {
      label: "Secondary carriers",
      value: "AT&T Mexico and Movistar operate reliable high-speed networks across major metropolitan areas, colonial hubs, and key tourist corridors.",
    },
    {
      label: "5G deployment",
      value: "Telcel has rolled out 5G across more than 100 Mexican cities, including Mexico City, Guadalajara, Monterrey, Cancun, and Puerto Vallarta.",
    },
    {
      label: "Airport SIM stalls",
      value: "Cancun (CUN) and Mexico City (MEX) airport kiosks often charge inflated tourist prices (up to $40-$50 USD for basic 2GB SIM cards).",
    },
    {
      label: "UK visitors",
      value: "Over 500,000 British holidaymakers and travellers visit Mexico each year, primarily heading to Quintana Roo and Mexico City.",
    },
  ],
  networks: {
    intro:
      "Mexico sits in every UK mobile operator's Rest of World tier. Without a pass or bundle, standard pay-as-you-go data rates outside Europe are steep.",
    rows: [
      {
        network: "ee",
        scenario: "ee-row1",
        headline: "Rest of World Zone 1 pass: £6/24h, £30/7d, or £50/15d",
        detail: "Covers Mexico using your domestic UK allowance up to 50GB. Included on select Full Works plans as an inclusive extra.",
      },
      {
        network: "o2",
        scenario: null,
        headline: "O2 Travel: £7 per 24 hours of active mobile usage",
        detail: "Provides unlimited data at capped 2Mbps speeds, plus voice calls and texts. Included on O2 Ultimate contracts.",
      },
      {
        network: "vodafone",
        scenario: null,
        headline: "Global Roaming: tariff-dependent pricing in My Vodafone",
        detail: "Mexico is listed in Vodafone's Global Roaming Zone C. Standard plans without inclusive global roaming incur daily fees quoted in the app.",
      },
      {
        network: "three",
        scenario: null,
        headline: "Go Roam Around the World: £5 daily charge or passes",
        detail: "Three charges £5/day or sells Go Roam passes with a 12GB roaming ceiling. Personal hotspot tethering is strictly prohibited.",
      },
      {
        network: "id-mobile",
        scenario: null,
        headline: "iD Roam Beyond pass: £5 for 1 day up to £35 for 10 days",
        detail: "Mexico is included in iD Mobile's Roam Beyond pass range. Without an add-on pass, standard rates cost £3/MB.",
      },
      {
        network: "sky-mobile",
        scenario: null,
        headline: "Roaming Passport Plus: £2 for 24 hours of connection",
        detail: "Sky Mobile charges £2 per 24 hours to draw from your domestic UK allowance, capped at 25GB per monthly billing cycle.",
      },
      {
        network: "giffgaff",
        scenario: null,
        headline: "Travel data add-on: purchase in-app before departure",
        detail: "Mexico is supported by giffgaff's international travel data add-on packs. Standard out-of-bundle rates are 20p/MB.",
      },
      {
        network: "smarty",
        scenario: null,
        headline: "Out-of-plan rate: 10p per megabyte from top-up credit",
        detail: "Equals roughly £100 per gigabyte; the default £45 spend limit will cut off service within minutes of casual map and social media use.",
      },
      {
        network: "voxi",
        scenario: null,
        headline: "Global Roaming Extra: £16 for 8 days (2GB) or £26.60 for 15 days (4GB)",
        detail: "VOXI requires a Global Roaming Extra pass for Mexico. Domestic endless data passes do not apply outside the UK.",
      },
      {
        network: "tesco-mobile",
        scenario: null,
        headline: "Rest of World PAYG rate: £5 per megabyte",
        detail: "Tesco Mobile PAYG customers face steep £5/MB charges in Mexico. Pay Monthly users should check tariff caps carefully.",
      },
    ],
  },
  providers: {
    intro:
      "Four major travel eSIM providers offer coverage for Mexico. Telcel and AT&T Mexico provide the primary underlying cellular infrastructure.",
    notes: [
      {
        provider: "Airalo",
        localNetwork: "AT&T Mexico / Movistar (Chorro Fon)",
        summary: "Airalo's 'Chorro Fon' eSIM operates on AT&T Mexico and Movistar. In-app top-ups and reliable urban speeds in Mexico City, Guadalajara, and Cancun.",
        watchOut: "Unlimited plans are throttled to 1Mbps after 3GB of daily data consumption.",
      },
      {
        provider: "Klook",
        localNetwork: "Telcel / Movistar",
        summary: "Offers convenient day-pass and multi-day packages on Mexican mobile networks with instant QR code delivery.",
        watchOut: "Delivered as a digital voucher; verify your smartphone is unlocked before ordering.",
      },
      {
        provider: "Nomad",
        localNetwork: "AT&T Mexico / Movistar",
        summary: "Affordable data bundles with fast 4G and 5G connections in major metropolitan areas. Full hotspot sharing supported.",
        watchOut: "Must be activated within 60 days of purchase. Coverage in remote jungle areas can be weaker than Telcel.",
      },
      {
        provider: "Saily",
        localNetwork: "Telcel / AT&T Mexico",
        summary: "Straightforward pricing in GBP with reliable roaming onto Telcel and AT&T networks across Cancun, Riviera Maya, and Mexico City.",
        watchOut: "Activates upon initial connection to a Mexican cellular tower; set up before boarding your flight.",
      },
    ],
  },
  sections: [
    {
      id: "why-mexico-costs-extra",
      heading: "Why UK roaming in Mexico is expensive",
      paragraphs: [
        "While US mobile operators frequently include Mexico roaming in domestic plans, UK mobile networks classify Mexico as Rest of World. There are no statutory roaming caps for British phone contracts in North America, leaving customers exposed to heavy surcharges.",
        "A typical two-week holiday in Quintana Roo or Baja California can easily add £70 to £100 in daily carrier passes, or hundreds of pounds if your phone runs out of bundle on standard pay-as-you-go rates. An independent travel eSIM keeps your costs predictable, starting from under £10 for a week of maps, messaging, and translation.",
      ],
    },
    {
      id: "telcel-vs-att-mexico",
      heading: "Network coverage: Telcel vs AT&T Mexico vs Movistar",
      paragraphs: [
        "Telcel is Mexico's telecommunications heavyweight, boasting by far the most extensive cellular network across the country. In regional towns, coastal highways, and archaeological ruins such as Chichen Itza or Palenque, Telcel is frequently the only network with usable mobile reception.",
        "AT&T Mexico and Movistar offer competitive 5G and 4G performance within large cities including Mexico City, Monterrey, Guadalajara, and central resort strips. Saily and Klook connect to Telcel, making them especially attractive for travelers planning road trips outside major cities.",
      ],
    },
    {
      id: "resort-and-coastal-connectivity",
      heading: "Staying connected in Cancun, Tulum, and Los Cabos",
      paragraphs: [
        "Resort destinations like Cancun's Hotel Zone, Playa del Carmen, Tulum, and Cabo San Lucas have robust 5G and 4G coverage. However, resort Wi-Fi is frequently spotty on the beach or around hotel grounds, and public Wi-Fi networks in beach clubs are often unencrypted.",
        "Having reliable personal mobile data is invaluable for hailing Ubers or Didi rides, navigating local colectivos, checking ferry schedules to Cozumel or Isla Mujeres, and using Google Translate in local restaurants.",
      ],
    },
    {
      id: "avoiding-airport-sim-traps",
      heading: "Why buying an eSIM beats airport SIM stalls in Mexico",
      paragraphs: [
        "Arriving at Cancun International (CUN) or Mexico City Benito Juarez (MEX), arriving tourists are confronted by convenience stalls and SIM card kiosks selling local physical SIM cards. These airport stalls routinely overcharge tourists, asking $40 to $60 USD for basic 2GB to 3GB packages that retail for $10 in downtown convenience stores (OXXO).",
        "By setting up a travel eSIM before departure, you bypass the airport markup completely, avoid lengthy passport queues at local phone shops, and have instant cellular data the moment you exit the aircraft.",
      ],
    },
  ],
  setup: [
    {
      title: "Select and install your Mexico eSIM",
      body: "Choose an eSIM package tailored to your trip duration and scan the QR code via your smartphone's settings while connected to Wi-Fi at home.",
    },
    {
      title: "Disable data roaming on your UK SIM",
      body: "Keep your primary UK mobile line active for incoming calls and security SMS codes, but turn off data roaming on that line to avoid automatic daily roaming charges.",
    },
    {
      title: "Designate the Mexico eSIM for mobile data",
      body: "In your phone's cellular menu, set the Mexico eSIM as your active mobile data line and toggle on 'Data Roaming' for the eSIM.",
    },
    {
      title: "Connect upon arrival in Mexico",
      body: "Switch off airplane mode once you land. Your device will automatically connect to Telcel, AT&T Mexico, or Movistar within a minute or two.",
    },
  ],
  faq: [
    {
      question: "Do UK phone networks include free roaming in Mexico?",
      answer:
        "No. All UK mobile networks classify Mexico as Rest of World. EE charges £6/day or sells passes, O2 charges £7/day, Three charges £5/day, and standard pay-as-you-go rates can exceed £5 per megabyte.",
    },
    {
      question: "Which mobile network has the best coverage in Mexico?",
      answer:
        "Telcel has the largest coverage footprint in Mexico, providing superior reception in smaller towns, along highway corridors, and across the Yucatan Peninsula. AT&T Mexico is also strong in major urban hubs.",
    },
    {
      question: "Can I use WhatsApp and mobile hotspot on a Mexico eSIM?",
      answer:
        "Yes, all travel eSIMs support WhatsApp messaging and VoIP calls, and fixed-data packages from Saily, Nomad, and Airalo permit personal hotspot sharing with other devices.",
    },
    {
      question: "Is it safe to buy a SIM card at Cancun or Mexico City airports?",
      answer:
        "While safe, airport SIM kiosks charge inflated prices up to four times standard street rates. Installing an eSIM before you travel provides cheaper rates and immediate connectivity upon arrival.",
    },
    {
      question: "Do I get a Mexican telephone number with a travel eSIM?",
      answer:
        "Most travel eSIMs are data-only and do not include a Mexican (+52) telephone number. You can make app-based calls via WhatsApp or Skype, while your UK SIM remains available for incoming 2FA texts.",
    },
  ],
  related: ["united-states", "canada", "spain", "thailand", "indonesia"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
