import type { DestinationGuide } from "./types.ts";

export const indonesiaGuide: DestinationGuide = {
  destination: "indonesia",
  keyword: "Indonesia eSIM",
  title: "Indonesia eSIM vs UK roaming: Bali & travel data guide (2026)",
  description:
    "Heading to Bali, Jakarta or the Gili Islands from the UK? Compare Indonesia travel eSIMs with UK mobile roaming. Avoid IMEI customs registration taxes, dodge metered roaming fees, and get fast local data on Telkomsel and XL.",
  verdict: {
    heading: "Short answer: buy an Indonesia eSIM before flying to bypass airport queues and avoid Indonesia's strict IMEI customs rules.",
    body:
      "Every UK mobile operator places Indonesia into their highest rest-of-world charging category. Aside from EE's £6/day Zone 1 pass, UK networks subject travellers to exorbitant per-megabyte rates or account-specific charges. Even worse, Indonesia enforces a mandatory customs IMEI registration rule on physical SIM cards that requires registering your device at customs and potentially paying hefty import duty if staying longer than 90 days. A prepaid travel eSIM connects via international roaming agreements, completely bypassing local phone tax bureaucracy while delivering 10GB to 20GB of data on Telkomsel or XL Axiata for a fraction of UK roaming costs.",
  },
  facts: [
    {
      label: "Local networks",
      value: "Telkomsel, Indosat Ooredoo Hutchison and XL Axiata. Telkomsel has the widest coverage across Bali, Lombok, the Gili Islands, Komodo and outer archipelago regions.",
    },
    {
      label: "IMEI registration trap",
      value: "Phones using a local Indonesian physical SIM card must register their IMEI with Indonesian customs (Bea Cukai) and pay import taxes if valued over $500. Travel eSIMs roam onto local networks and avoid this tax bureaucracy.",
    },
    {
      label: "Bali digital connectivity",
      value: "Bali has extensive 4G/LTE and growing 5G in tourist hubs like Canggu, Seminyak, Ubud and Uluwatu, though remote beaches and Nusa Penida can experience variable speeds.",
    },
    {
      label: "Airport SIM prices",
      value: "SIM kiosks at Ngurah Rai (DPS) airport in Denpasar charge tourist markups often 3 to 4 times higher than local street vendors, with lengthy passport registration queues.",
    },
    {
      label: "UK visitors",
      value: "Around 250,000 British holidaymakers and remote workers visit Indonesia each year, primarily entering Bali on a 30-day Visa on Arrival (e-VOA).",
    },
  ],
  networks: {
    intro:
      "Indonesia is classified as Rest of World by all UK mobile networks. Standard roaming incurs hefty daily add-ons or expensive metered charges.",
    rows: [
      {
        network: "ee",
        scenario: "ee-row1",
        headline: "Rest of World Zone 1 pass: £6 for 24 hours, £30 for 7 days, £50 for 15 days",
        detail: "Draws from your UK domestic allowance abroad up to a 50GB fair-use cap. Included on select Full Works tariffs or purchasable as an add-on.",
      },
      {
        network: "o2",
        scenario: null,
        headline: "Check O2 Travel bolt-on availability for Indonesia",
        detail: "Indonesia is not covered by standard EU allowances. O2 Travel availability depends on your specific tariff; otherwise, expensive out-of-plan international rates apply.",
      },
      {
        network: "vodafone",
        scenario: null,
        headline: "Check your contract in the Vodafone roaming checker",
        detail: "Vodafone places Indonesia in Rest of World Zone D. Inclusive roaming applies only to specific high-end contracts; otherwise daily charges apply.",
      },
      {
        network: "three",
        scenario: null,
        headline: "Check Three Go Roam destination terms",
        detail: "Three's Go Roam passes require checking whether your account tier covers Indonesia. Metered rates can cost £3/MB or more without a dedicated roaming bolt-on.",
      },
      {
        network: "id-mobile",
        scenario: null,
        headline: "Standard rest-of-world charges: metered out-of-plan data",
        detail: "iD Mobile does not include Indonesia in standard roaming. Using mobile data will incur steep per-megabyte charges from your account balance.",
      },
      {
        network: "sky-mobile",
        scenario: null,
        headline: "Roaming Passport Plus does not cover Indonesia",
        detail: "Sky Mobile's £2/24h Roaming Passport Plus pass does not include Southeast Asia. Cellular data is billed at high international metered rates.",
      },
      {
        network: "giffgaff",
        scenario: null,
        headline: "Check giffgaff international rates or travel add-ons",
        detail: "Standard non-EU roaming costs 20p per MB (roughly £200 per gigabyte). Keep mobile data roaming switched off unless you purchase an app travel add-on.",
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
        headline: "Check Global Roaming Extra pass options in My VOXI",
        detail: "VOXI plans do not include data in Indonesia. Check your My VOXI account to see if an 8-day or 15-day worldwide add-on is eligible for your number.",
      },
      {
        network: "tesco-mobile",
        scenario: null,
        headline: "Standard worldwide metered rate: £5 per megabyte",
        detail: "Tesco Mobile charges £5/MB for data in Indonesia. Even basic social media updates or mapping can trigger immediate spend cap limits.",
      },
    ],
  },
  providers: {
    intro:
      "Four verified travel eSIM providers offer reliable coverage across Bali and Indonesia. Compare transparent pricing from Saily and Nomad, vetted bundles from Airalo, and custom packages on Klook.",
    notes: [
      {
        provider: "Saily",
        localNetwork: "Telkomsel / XL Axiata",
        summary: "Prices directly in British pounds without foreign conversion fees. Connects to Telkomsel and XL Axiata for solid coverage in Canggu, Ubud and across the archipelago.",
        watchOut: "Validity countdown initiates automatically once your handset registers on an Indonesian mobile network.",
      },
      {
        provider: "Nomad",
        localNetwork: "Telkomsel / Indosat",
        summary: "Transparent USD pricing converted at current market rates. Fast 4G LTE and 5G performance across Bali, Lombok and Jakarta with mobile hotspot sharing enabled.",
        watchOut: "Must be installed and activated on your smartphone within 60 days of purchase.",
      },
      {
        provider: "Airalo",
        localNetwork: "Telkomsel / Indosat",
        summary: "Offers the popular 'Indotel' data packages spanning 1GB to 20GB on Telkomsel. RoamCompare lists Airalo without affiliate links or commission.",
        watchOut: "Airalo unlimited packages enforce a speed cap of 1Mbps after using 3GB of full-speed data in a single calendar day.",
      },
      {
        provider: "Klook",
        localNetwork: "Telkomsel / XL Axiata",
        summary: "Features high-speed Indonesia eSIMs with flexible daily allocations or total data allowances on Indonesia's top cellular carriers.",
        watchOut: "Verify that your phone is fully unlocked from your UK carrier prior to scanning the activation QR code.",
      },
    ],
  },
  sections: [
    {
      id: "why-indonesia-costs-extra",
      heading: "Why UK mobile networks charge punitive rates in Indonesia",
      paragraphs: [
        "Indonesia is an incredible travel hub, but UK mobile networks treat it as an expensive rest-of-world territory. Outside of EE's Roam Zone 1 pass, UK networks offer almost no inclusive data allowances, subjecting British travellers to metered rates up to £5/MB.",
        "Without strict cellular settings, background app refreshes and photo cloud backups on a UK SIM card can quickly trigger standard spend caps. An affordable Indonesia travel eSIM provides all the high-speed data you need for navigation and social sharing without risking billing surprises.",
      ],
    },
    {
      id: "imei-tax-rules",
      heading: "Indonesia's strict IMEI registration law: how an eSIM avoids it",
      paragraphs: [
        "Indonesia enforces strict mobile device regulations to combat grey-market handset imports. If you buy a local Indonesian physical SIM card, your phone's unique IMEI number must be registered with Indonesian customs (Bea Cukai). Handsets valued over $500 are subject to import taxes and customs duties.",
        "Crucially, travel eSIMs operate under international roaming agreements, connecting as visiting guest subscribers rather than domestic Indonesian accounts. By using an international travel eSIM, tourists completely bypass customs queues, paperwork and device taxation.",
      ],
    },
    {
      id: "bali-coverage",
      heading: "Signal quality across Bali: Canggu, Ubud, Uluwatu and outer islands",
      paragraphs: [
        "Cellular coverage across Bali's primary tourist centres is very strong. Telkomsel and XL Axiata provide robust 4G LTE and growing 5G connectivity throughout Kuta, Seminyak, Canggu, Sanur and Ubud.",
        "When travelling further afield to Nusa Penida, Nusa Lembongan, Lombok or the Gili Islands, Telkomsel generally provides the most dependable signal on ferries and remote coastal bays, making it the preferred underlying carrier for island explorers.",
      ],
    },
    {
      id: "apps-for-bali",
      heading: "Essential apps for Indonesia: Grab, Gojek and WhatsApp",
      paragraphs: [
        "Navigating Bali and wider Indonesia without reliable mobile data is difficult. Gojek and Grab are indispensable super-apps used for ordering scooter taxis, booking rides, delivering meals and paying for services across the island.",
        "WhatsApp is ubiquitous in Indonesia: tour operators, dive schools, surf instructors, villa managers and scooter rental shops communicate almost exclusively via WhatsApp messages and voice notes. A high-speed data connection keeps you connected to local services effortlessly.",
      ],
    },
  ],
  setup: [
    {
      title: "Check phone compatibility and ensure your handset is unlocked",
      body: "Verify that your smartphone supports eSIM functionality and is not locked to a specific UK mobile network.",
    },
    {
      title: "Purchase and install your Indonesia eSIM over home Wi-Fi before flying",
      body: "Scan the provider's QR code on stable home internet. Keep the eSIM line inactive until your flight approaches Indonesia.",
    },
    {
      title: "Switch off data roaming on your primary UK SIM card",
      body: "Disable mobile data roaming on your UK line while keeping it turned on to receive incoming bank verification texts.",
    },
    {
      title: "Toggle on your Indonesia eSIM when landing in Bali or Jakarta",
      body: "Upon touchdown at Denpasar (DPS) or Jakarta (CGK), switch your mobile data setting to the Indonesia eSIM to connect immediately.",
    },
  ],
  faq: [
    {
      question: "Do I need to register my phone's IMEI with Indonesian customs if using an eSIM?",
      answer:
        "No. The Indonesian government's mandatory IMEI customs registration and device tax applies to foreign phones inserting local physical Indonesian SIM cards. Because travel eSIMs connect via international roaming protocols, they are exempt from this registration requirement.",
    },
    {
      question: "Will my UK mobile phone work in Bali without an eSIM?",
      answer:
        "Your phone will roam onto local Indonesian networks, but charges will be very high on most UK providers. Unless you are on EE with an active rest-of-world pass, using data on your UK SIM card can easily cost £5 per MB.",
    },
    {
      question: "Is mobile signal reliable on the Gili Islands, Nusa Penida and Lombok?",
      answer:
        "Yes, particularly on Telkomsel. Gili Trawangan, Gili Air, Gili Meno and coastal Lombok enjoy solid 4G LTE signal. Nusa Penida's dramatic coastal cliffs can have occasional blind spots, but towns and main roads maintain good reception.",
    },
    {
      question: "Can I order Gojek and Grab using a data-only eSIM?",
      answer:
        "Yes. Both Gojek and Grab function perfectly over cellular data. You can keep your UK mobile phone number linked to your profile to receive driver messages and notifications.",
    },
    {
      question: "Can I buy a physical SIM card at Bali Ngurah Rai Airport instead?",
      answer:
        "Yes, but airport kiosks in Denpasar charge substantial markups, often 3 to 4 times the standard price, and require queuing for passport verification. An eSIM is usually cheaper, pre-installed, and connects the minute your plane lands.",
    },
    {
      question: "Will I still receive UK two-factor authentication SMS messages?",
      answer:
        "Yes. As long as your physical UK SIM remains active with data roaming toggled off, incoming verification SMS texts from your UK bank and services will arrive normally and free of charge.",
    },
  ],
  related: ["thailand", "japan", "united-arab-emirates", "australia", "turkey"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
