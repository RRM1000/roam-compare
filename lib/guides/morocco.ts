import { providerNotes, providersIntro, setupSteps, worldNetworksIntro, worldRow, worldRows } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/** Morocco guide. Checked 10 September 2026; UK network rows come from lib/guides/shared.ts. */
export const moroccoGuide: DestinationGuide = {
  destination: "morocco",
  keyword: "Morocco eSIM",
  title: "Morocco eSIM vs UK roaming: Marrakech & travel guide (2026)",
  description:
    "Morocco is in EE's dearer Zone 2 and off O2 Travel's list. Compare live Morocco eSIM prices with what UK networks actually charge to roam there.",
  verdict: {
    heading: "Short answer: buy a Morocco eSIM before you fly. UK roaming there is expensive, and O2 Travel doesn't cover it.",
    body:
      "Morocco is outside every UK network's Europe zone. EE puts it in Rest of World Zone 2, with passes from £8 for 24 hours to £60 for 15 days, and Three sells Go Roam Around the World passes from £12.50 for 3 days. O2 Travel's list doesn't include Morocco. The three eSIM providers whose networks we could confirm all use Orange there, so coverage is Orange's.",
  },
  facts: [
    { label: "Local networks", value: "Maroc Telecom, Orange and inwi. Nomad, Airalo and Klook all list Orange." },
    { label: "O2", value: "O2 Travel's destination list doesn't include Morocco." },
    { label: "Spain's south coast", value: "Around Tarifa and Algeciras, your phone can pick up Moroccan networks across the Strait of Gibraltar." },
    { label: "Old cities", value: "The narrow lanes of the medinas in Marrakech and Fes can weaken signal, so download offline maps first." },
  ],
  networks: {
    intro: worldNetworksIntro("Morocco"),
    rows: worldRows("Morocco", { ee: worldRow.eeZone2(), three: worldRow.threeWorld() }),
  },
  providers: {
    intro: providersIntro,
    notes: providerNotes("Morocco", { nomad: "Orange", airalo: "Orange", klook: "Orange" }),
  },
  sections: [
    {
      id: "what-uk-networks-charge",
      heading: "What UK networks charge in Morocco",
      paragraphs: [
        "Morocco is a short flight from the UK, but no UK network treats it as Europe. EE puts it in Rest of World Zone 2, its second most expensive tier, at £8 for 24 hours, £40 for 7 days and £60 for 15. Three sells Go Roam Around the World passes at £12.50 for 3 days, £30 for 7 and £60 for 14.",
        "O2 Travel, which covers most long-haul destinations for £7 a day, doesn't list Morocco, so O2 customers pay standard roaming rates there. The worked costs below compare EE and Three with live eSIM prices.",
      ],
    },
    {
      id: "one-network",
      heading: "One network, and what that means for coverage",
      paragraphs: [
        "Nomad, Airalo and Klook all list Orange for Morocco. Orange covers the cities and main routes, but in the Atlas and the desert you should expect gaps on any network.",
        "If you're heading on a trek or a desert trip, download offline maps and don't rely on your phone for navigation in remote areas.",
      ],
    },
    {
      id: "strait-of-gibraltar",
      heading: "Moroccan networks from the Spanish coast",
      paragraphs: [
        "The Strait of Gibraltar is narrow enough that, around Tarifa and Algeciras, a Moroccan network's signal can reach the Spanish side. A phone on automatic network selection can connect to it while you're still in Spain, and Morocco is charged as rest of world.",
        "If you're staying on that coast, set network selection to a Spanish network manually. On the ferry to Tangier, turn data roaming off until you arrive.",
      ],
    },
  ],
  setup: setupSteps("Morocco"),
  faq: [
    {
      question: "Is Morocco included in UK networks' European roaming?",
      answer: "No. Morocco is outside every UK network's Europe zone. EE's passes start at £8 for 24 hours, and Three's at £12.50 for 3 days.",
    },
    {
      question: "Does O2 Travel cover Morocco?",
      answer: "No. O2 Travel's destination list doesn't include Morocco, so O2's standard roaming rates apply there.",
    },
    {
      question: "Why did my phone connect to a Moroccan network in Tarifa?",
      answer: "Moroccan networks can reach across the Strait of Gibraltar. Choose a Spanish network manually on that coast, so your phone can't roam onto a Moroccan one.",
    },
    {
      question: "Which network do Morocco eSIMs use?",
      answer: "Nomad, Airalo and Klook all list Orange for Morocco.",
    },
    {
      question: "Does a Morocco travel eSIM come with a local number?",
      answer: "The plans compared here are data only, so there's no Moroccan number. WhatsApp works over data, and your UK SIM can stay on for texts.",
    },
  ],
  related: ["spain", "portugal", "egypt", "turkey", "united-arab-emirates"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
