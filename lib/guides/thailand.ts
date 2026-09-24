import { providerNotes, providersIntro, setupSteps, worldNetworksIntro, worldRow, worldRows } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/** Thailand guide. Checked 10 September 2026; UK network rows come from lib/guides/shared.ts. */
export const thailandGuide: DestinationGuide = {
  destination: "thailand",
  keyword: "Thailand eSIM",
  title: "Thailand eSIM vs UK roaming: 2026 costs from the UK",
  description:
    "Thailand is outside every UK network's Europe zone. Compare live Thailand eSIM prices with what EE, O2, Three and the rest charge to roam there.",
  verdict: {
    heading: "Short answer: buy a Thailand eSIM before you fly, unless your plan already covers Thailand.",
    body:
      "Thailand is outside every UK network's Europe zone. EE sells passes from £6 for 24 hours to £50 for 15 days, O2 Travel is £7 a day at 2Mbps, and Three sells Go Roam Around the World passes from £12.50 for 3 days. For a week or two, an eSIM with enough data usually costs less, and it skips the airport SIM counter, where you'd register with your passport.",
  },
  facts: [
    { label: "Local networks", value: "AIS and True, which merged with dtac. Nomad lists True, AIS and dtac, and Airalo lists True." },
    { label: "Local SIMs", value: "Buying a Thai SIM means registering it with your passport." },
    { label: "Getting around", value: "Grab and Bolt need data, and LINE is widely used for messages." },
  ],
  networks: {
    intro: worldNetworksIntro("Thailand"),
    rows: worldRows("Thailand", { ee: worldRow.eeZone1(), o2: worldRow.o2Travel(), three: worldRow.threeWorld() }),
  },
  providers: {
    intro: providersIntro,
    notes: providerNotes("Thailand", { nomad: "True, AIS and dtac", airalo: "True", klook: "AIS" }),
  },
  sections: [
    {
      id: "what-uk-networks-charge",
      heading: "What UK networks charge in Thailand",
      paragraphs: [
        "EE puts Thailand in Rest of World Zone 1, with passes at £6 for 24 hours, £30 for 7 days and £50 for 15. O2 Travel is £7 a day with unlimited data at 2Mbps, and Three sells Go Roam Around the World passes at £12.50 for 3 days, £30 for 7 and £60 for 14.",
        "A fortnight costs £50 to £98 on those. At our everyday estimate of about 0.8GB a day you'd use around 12GB, and the worked costs below compare that with live eSIM prices.",
      ],
    },
    {
      id: "local-sim-or-esim",
      heading: "Airport SIM or eSIM?",
      paragraphs: [
        "Thai networks sell tourist SIMs at the airport, registered with your passport. It works, but it means a queue after a long flight and a new number on your phone.",
        "An eSIM is installed at home and working when you land, so you can book a Grab from the terminal. Your UK number stays on the phone for bank texts.",
      ],
    },
    {
      id: "islands",
      heading: "Coverage on the islands",
      paragraphs: [
        "Bangkok, Chiang Mai and the main islands such as Phuket and Koh Samui are well covered. Smaller islands and boat crossings can be patchier, so download offline maps and ferry tickets before you set off.",
      ],
    },
  ],
  setup: setupSteps("Thailand"),
  faq: [
    {
      question: "Do I need a travel eSIM for Thailand, or will my UK SIM work?",
      answer: "Your UK SIM will work, but it costs extra: EE's passes start at £6 for 24 hours, O2 Travel is £7 a day at 2Mbps, and Three's passes start at £12.50 for 3 days. For a week or two, an eSIM usually costs less.",
    },
    {
      question: "Can I buy a SIM at Bangkok airport instead?",
      answer: "Yes, but you'll need your passport to register it, and it gives you a new number. An eSIM is set up before you fly.",
    },
    {
      question: "How much data do I need for two weeks in Thailand?",
      answer: "At our everyday estimate of about 0.8GB a day, around 12GB. Light use needs about 5GB, and heavy use with video or a hotspot about 28GB.",
    },
    {
      question: "Do Grab and Bolt work with a data-only eSIM?",
      answer: "Yes. Both work over any data connection, and your accounts can stay linked to your UK number.",
    },
    {
      question: "Does a Thailand travel eSIM include a Thai number?",
      answer: "The plans compared here are data only, so there's no Thai number. WhatsApp and LINE work over data, and your UK SIM can stay on for texts.",
    },
  ],
  related: ["indonesia", "japan", "australia", "united-arab-emirates", "turkey"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
