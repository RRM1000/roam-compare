import { providerNotes, providersIntro, setupSteps, worldNetworksIntro, worldRow, worldRows } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/** Egypt guide. Checked 10 September 2026; UK network rows come from lib/guides/shared.ts. */
export const egyptGuide: DestinationGuide = {
  destination: "egypt",
  keyword: "Egypt eSIM",
  title: "Egypt eSIM vs UK roaming: what it costs from the UK (2026)",
  description:
    "Egypt is in EE's dearer Zone 2. Compare live Egypt eSIM prices with what EE, O2, Three and the rest charge, including the Red Sea resorts.",
  verdict: {
    heading: "Short answer: buy an Egypt eSIM before you fly, unless your plan already covers Egypt.",
    body:
      "Egypt is outside every UK network's Europe zone. EE puts it in Rest of World Zone 2, with passes from £8 for 24 hours to £60 for 15 days. O2 Travel is £7 a day at 2Mbps, and Three sells Go Roam Around the World passes from £12.50 for 3 days. For a week at a Red Sea resort, an eSIM usually costs less. The worked costs below price a week and a fortnight.",
  },
  facts: [
    { label: "Local networks", value: "Vodafone, Orange, e& and WE. Nomad lists Orange and Vodafone, Airalo lists Vodafone, and Klook's Egypt eSIM runs on Orange." },
    { label: "Vodafone", value: "Vodafone Egypt is a separate business from Vodafone UK, so Vodafone UK customers still pay roaming there unless their plan includes it." },
    { label: "Local SIMs", value: "Buying an Egyptian SIM means registering it with your passport." },
  ],
  networks: {
    intro: worldNetworksIntro("Egypt"),
    rows: worldRows("Egypt", { ee: worldRow.eeZone2(), o2: worldRow.o2Travel(), three: worldRow.threeWorld() }),
  },
  providers: {
    intro: providersIntro,
    notes: providerNotes("Egypt", { nomad: "Orange and Vodafone", airalo: "Vodafone", klook: "Orange" }),
  },
  sections: [
    {
      id: "what-uk-networks-charge",
      heading: "What UK networks charge in Egypt",
      paragraphs: [
        "EE puts Egypt in Rest of World Zone 2, its second most expensive tier, at £8 for 24 hours, £40 for 7 days and £60 for 15. O2 Travel is £7 a day with unlimited data at 2Mbps, and Three sells Go Roam Around the World passes at £12.50 for 3 days, £30 for 7 and £60 for 14.",
        "A week at a Red Sea resort costs £30 to £49 depending on the network. The worked costs below compare that with live eSIM prices.",
      ],
    },
    {
      id: "resorts-and-the-nile",
      heading: "Resorts, Cairo and the Nile",
      paragraphs: [
        "The resort towns, Cairo and the main tourist sites are well covered. On a Nile cruise, expect signal near towns and temples and gaps in between, so download offline maps and anything you want to read before you board.",
        "Resort Wi-Fi varies a lot. An eSIM gives you a connection you control for maps, ride apps and messages.",
      ],
    },
    {
      id: "local-sim",
      heading: "Buying a local SIM",
      paragraphs: [
        "Egyptian networks sell SIMs at the airport and in their shops, registered with your passport. It works, but it means a queue after the flight and a new number. An eSIM is installed at home and working when you land, and your UK number stays on the phone for bank texts.",
      ],
    },
  ],
  setup: setupSteps("Egypt"),
  faq: [
    {
      question: "Is Egypt included in UK networks' European roaming?",
      answer: "No. EE's passes start at £8 for 24 hours, O2 Travel is £7 a day at 2Mbps, and Three's passes start at £12.50 for 3 days.",
    },
    {
      question: "Does Vodafone UK work in Egypt without roaming charges?",
      answer: "Not automatically. Vodafone Egypt is a separate business, and Vodafone UK prices Egypt against your plan in its roaming checker.",
    },
    {
      question: "Does mobile data work on a Nile cruise?",
      answer: "Near towns and temples, usually. Between them there are gaps, so download offline maps and anything you need before you board.",
    },
    {
      question: "Will I still get UK bank texts in Egypt?",
      answer: "Yes, if you keep your UK SIM switched on with its data roaming off. Incoming texts still arrive.",
    },
    {
      question: "Does an Egypt travel eSIM include a local number?",
      answer: "The plans compared here are data only, so there's no Egyptian number. WhatsApp works over data, and your UK SIM can stay on for calls and texts.",
    },
  ],
  related: ["morocco", "turkey", "united-arab-emirates", "greece", "cyprus"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
