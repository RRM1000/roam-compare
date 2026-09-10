import type { DestinationGuide } from "./types.ts";

export const cyprusGuide: DestinationGuide = {
  destination: "cyprus",
  keyword: "Cyprus eSIM",
  title: "Cyprus eSIM vs UK roaming: best travel data options (2026)",
  description:
    "Visiting Cyprus from the UK? Compare Cyprus eSIM plans with UK roaming charges. Understand how EU roaming rules apply in the south and how to avoid costly rest-of-world charges in Northern Cyprus.",
  verdict: {
    heading: "Short answer: your UK EU roaming rules apply in southern Cyprus, but beware Northern Cyprus where rest-of-world charges hit.",
    body:
      "The Republic of Cyprus is an EU member state, meaning UK mobile networks treat it under standard European roaming tiers—inclusive on O2 and iD Mobile, or subject to daily surcharges on EE (£2.72/day), Vodafone (£2.75/day), and Three (£2/day). Crucially, Northern Cyprus (north of the UN Buffer Zone) is not covered by EU roaming; UK carriers treat it as Rest of World with severe out-of-bundle rates reaching £5 to £9 per megabyte. A travel eSIM provides cheap, predictable high-speed data across coastal holiday resorts and prevents accidental cross-border roaming bills.",
  },
  facts: [
    {
      label: "Local networks",
      value: "Cyta (Cytamobile-Vodafone), Epic (formerly MTN), and PrimeTel. Travel eSIMs generally connect via Cyta or Epic.",
    },
    {
      label: "Northern Cyprus warning",
      value: "Northern Cyprus uses Turkish mobile networks (Turkcell and KKTC Telsim). EU roaming passes and allowances do not apply north of the Green Line.",
    },
    {
      label: "5G coverage",
      value: "Widespread 5G available across Nicosia, Limassol, Larnaca, Paphos, and popular southeastern resort towns like Ayia Napa.",
    },
    {
      label: "Airport connectivity",
      value: "Larnaca (LCA) and Paphos (PFO) airports offer free Wi-Fi, but registration portals can delay booking rides after landing.",
    },
    {
      label: "UK visitors",
      value: "Over 1.3 million UK holidaymakers visit Cyprus each year, making British tourists the single largest national group on the island.",
    },
  ],
  networks: {
    intro:
      "In the Republic of Cyprus (southern Cyprus), UK operators apply their standard European roaming terms. North of the Green Line, Rest of World pricing applies.",
    rows: [
      {
        network: "ee",
        scenario: "ee-europe-new",
        headline: "EE Europe passes: £2.72 per day, £16.50 for 7 days, or £30 for 15 days",
        detail: "Applies to contracts taken out or upgraded since 7 July 2021. Covers the Republic of Cyprus under EE's 50GB fair-use policy. Northern Cyprus is in Zone 1 (rest-of-world).",
      },
      {
        network: "o2",
        scenario: null,
        headline: "O2 Europe Zone: included at no extra cost (up to 25GB)",
        detail: "O2 includes the Republic of Cyprus in its Europe Zone with no daily surcharge, up to 25GB. Northern Cyprus triggers O2 Travel (£7/day).",
      },
      {
        network: "vodafone",
        scenario: null,
        headline: "European roaming: included on Xtra plans, or £2.75/day",
        detail: "Vodafone includes Cyprus on plans with inclusive roaming; standard contracts pay £2.75 daily or use 8-day (£16) / 15-day (£21) passes with a 25GB limit.",
      },
      {
        network: "three",
        scenario: null,
        headline: "Go Roam Europe: £2/day or bundle passes, up to 12GB",
        detail: "Three charges £2 per calendar day or sells Go Roam passes for southern Cyprus up to 12GB. Northern Cyprus falls under Go Roam Extra at £7-£8 daily.",
      },
      {
        network: "id-mobile",
        scenario: null,
        headline: "iD Roam Free: inclusive EU roaming (up to 30GB)",
        detail: "iD Mobile covers the Republic of Cyprus under standard inclusive roaming up to 30GB. Northern Cyprus is excluded.",
      },
      {
        network: "sky-mobile",
        scenario: null,
        headline: "Roaming Passport Plus: £2 for 24 hours of access",
        detail: "Sky Mobile charges £2 per 24 hours to use your domestic UK allowance in Cyprus, capped at 25GB per billing period.",
      },
      {
        network: "giffgaff",
        scenario: null,
        headline: "EU roaming included: up to 5GB fair-use limit",
        detail: "Giffgaff provides up to 5GB of inclusive EU roaming in southern Cyprus per plan. 10p/MB applies afterwards.",
      },
      {
        network: "smarty",
        scenario: null,
        headline: "EU roaming included: up to 12GB allowance",
        detail: "SMARTY includes southern Cyprus in its EU roaming destinations up to 12GB with no daily access fees.",
      },
      {
        network: "voxi",
        scenario: null,
        headline: "European Roaming Pass: £2.75/day or multi-day passes",
        detail: "VOXI requires a European Roaming Pass for Cyprus. Passes run from 1 to 15 days; unlimited social media is domestic only.",
      },
      {
        network: "tesco-mobile",
        scenario: null,
        headline: "Home From Home: inclusive EU roaming on eligible tariffs",
        detail: "Tesco Mobile includes the Republic of Cyprus under Home From Home rules with no additional fees on eligible plans.",
      },
    ],
  },
  providers: {
    intro:
      "Four leading travel eSIM providers cover Cyprus. Check whether a plan covers only the Republic of Cyprus or includes regional coverage.",
    notes: [
      {
        provider: "Airalo",
        localNetwork: "Cyta",
        summary: "Airalo's 'Cytamobile' eSIM provides seamless access to Cyta's extensive coastal 5G network in Paphos, Limassol, and Ayia Napa.",
        watchOut: "Plans do not include cellular coverage in Northern Cyprus (TRNC); 3GB daily limit on unlimited plans.",
      },
      {
        provider: "Klook",
        localNetwork: "Cyta / Epic",
        summary: "Offers single-country and regional Europe eSIM packages with flexible day allowances on Cyta and Epic.",
        watchOut: "Delivered electronically via voucher QR code; handset must be carrier unlocked.",
      },
      {
        provider: "Nomad",
        localNetwork: "Cyta (Cytamobile-Vodafone)",
        summary: "High-speed 5G/4G connectivity via Cyta, Cyprus's largest telecommunications operator. Tethering and hotspot sharing supported.",
        watchOut: "Valid for activation up to 60 days after purchase. Coverage strictly limited to southern networks.",
      },
      {
        provider: "Saily",
        localNetwork: "Cyta / Epic",
        summary: "Clean GBP pricing with excellent signal on Cyta and Epic networks across southern coastal resorts and mountain regions.",
        watchOut: "Plan begins upon connecting to a Cypriot cell tower; install QR profile before landing.",
      },
    ],
  },
  sections: [
    {
      id: "the-green-line-and-northern-cyprus-trap",
      heading: "The Green Line divide: Republic of Cyprus vs Northern Cyprus",
      paragraphs: [
        "Cyprus is geographically divided between the internationally recognised Republic of Cyprus in the south and the de facto Turkish Republic of Northern Cyprus (TRNC) in the north, separated by a United Nations buffer zone known as the Green Line.",
        "This geopolitical partition has enormous ramifications for mobile roaming. In the south, standard EU roaming regulations apply. But in Northern Cyprus, cell towers connect to Turkish operators (Turkcell Northern Cyprus and KKTC Telsim). UK networks treat Northern Cyprus as Rest of World, exposing unsuspecting holidaymakers to charges of £5 to £9 per megabyte if their phone connects across the border.",
      ],
    },
    {
      id: "cypriot-mobile-networks-and-coverage",
      heading: "Cypriot mobile networks: Cyta, Epic, and PrimeTel",
      paragraphs: [
        "In the Republic of Cyprus, telecommunications are led by Cyta (operating the Cytamobile-Vodafone brand), Epic, and PrimeTel. Cyta commands the broadest geographic coverage, extending deep into the Troodos mountain villages and along rural coastal cliffs.",
        "5G connectivity is well developed across all major urban and tourist centers, including Limassol, Larnaca, Paphos, Ayia Napa, and Protaras. International travel eSIMs primarily partner with Cyta and Epic, delivering dependable speeds for maps, photo uploads, and streaming.",
      ],
    },
    {
      id: "uk-roaming-vs-cyprus-esim-cost-comparison",
      heading: "UK roaming vs Cyprus eSIM: which offers better value?",
      paragraphs: [
        "If you are on an O2 or iD Mobile contract that includes free EU roaming, visiting southern Cyprus will cost you nothing extra as long as you remain within your fair-use allowance (up to 25GB or 30GB).",
        "However, on EE, Vodafone, Three, and VOXI, a standard 7 to 14-day beach holiday will incur £14 to £38 in carrier roaming surcharges. Sizing a 5GB or 10GB Cyprus eSIM for £6 to £12 eliminates daily fees and provides an isolated data connection that will not rack up huge unexpected charges if you take a day trip to Northern Cyprus.",
      ],
    },
    {
      id: "how-to-prevent-accidental-border-roaming",
      heading: "How to prevent accidental cross-border roaming",
      paragraphs: [
        "If you visit divided Nicosia or travel near the UN Buffer Zone, powerful cellular transmitters from Northern Cyprus can reach across the border. If your phone is set to automatic network selection, it might seamlessly latch onto a Turkish cell tower without your knowledge.",
        "To protect yourself, go to your phone's cellular settings and switch network selection from 'Automatic' to 'Manual', choosing Cyta or Epic. This ensures your handset will never connect to Northern Cyprus towers unless you deliberately select them.",
      ],
    },
  ],
  setup: [
    {
      title: "Choose and install your eSIM before flying",
      body: "Select a Cyprus eSIM plan suited to your holiday duration and scan the activation QR code at home on stable Wi-Fi before departure.",
    },
    {
      title: "Set network selection to manual near the border",
      body: "If staying near Nicosia or exploring the border regions, manually lock your phone's network to Cyta or Epic to avoid connecting to Northern Cyprus towers.",
    },
    {
      title: "Turn off data roaming on your UK line",
      body: "Disable data roaming on your UK carrier SIM to eliminate accidental daily charges, while leaving voice and SMS active for banking verification codes.",
    },
    {
      title: "Activate the Cyprus eSIM upon arrival",
      body: "Switch your cellular data line to the Cyprus eSIM when landing at Larnaca or Paphos airport. Data roaming must be turned on for the eSIM profile.",
    },
  ],
  faq: [
    {
      question: "Is Cyprus included in UK free EU mobile roaming?",
      answer:
        "The Republic of Cyprus (southern Cyprus) is an EU member state and is covered under UK networks' European roaming tiers. Some networks (like O2 and iD Mobile) include it for free, while others (EE, Vodafone, Three) charge £2 to £2.75 daily.",
    },
    {
      question: "Does an EU roaming pass work in Northern Cyprus?",
      answer:
        "No. Northern Cyprus is outside the EU roaming area and uses Turkish cellular networks. UK networks treat Northern Cyprus as Rest of World, where standard roaming fees can cost £5 to £9 per megabyte.",
    },
    {
      question: "How can I avoid roaming charges near the Cyprus Green Line?",
      answer:
        "Switch your mobile phone's network selection setting from Automatic to Manual, and select a southern operator such as Cyta or Epic. This prevents your handset from latching onto Turkish transmitters.",
    },
    {
      question: "Will I get 5G coverage on Cyprus beach resorts?",
      answer:
        "Yes, 5G coverage is widespread across major resort destinations including Ayia Napa, Protaras, Limassol, and Paphos on Cyta and Epic networks.",
    },
    {
      question: "Can I use WhatsApp and tethering on a Cyprus eSIM?",
      answer:
        "Yes. All travel eSIM providers featured here support WhatsApp and internet messaging, and standard plans permit mobile hotspot sharing with other devices.",
    },
  ],
  related: ["greece", "turkey", "spain", "portugal", "italy"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
