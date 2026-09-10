import { providerNotes, providersIntro, setupSteps, worldNetworksIntro, worldRow, worldRows } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/** Canada guide. Checked 10 September 2026; UK network rows come from lib/guides/shared.ts. */
export const canadaGuide: DestinationGuide = {
  destination: "canada",
  keyword: "Canada eSIM",
  title: "Canada eSIM vs UK roaming: what it costs from the UK (2026)",
  description:
    "Canada is outside every UK network's Europe zone. Compare live Canada eSIM prices with what EE, O2, Three and the rest charge, and plan for coverage gaps in the Rockies and national parks.",
  verdict: {
    heading: "Short answer: buy a Canada eSIM before you fly, unless your plan already covers Canada.",
    body:
      "Canada is outside every UK network's Europe zone. EE sells passes from £6 for 24 hours to £50 for 15 days, O2 Travel is £7 a day at 2Mbps, and Three sells Go Roam Around the World passes from £12.50 for 3 days to £60 for 14. For a week or two, an eSIM with enough data usually costs less. If your trip crosses into the US, check the eSIM covers both.",
  },
  facts: [
    { label: "Local networks", value: "Rogers, Bell and Telus. Bell and Telus share much of their network. Nomad lists Telus and Bell, and Airalo lists Bell." },
    { label: "Coverage gaps", value: "Mountain highways and national parks have long stretches with no signal on any network." },
    { label: "Crossing into the US", value: "A Canada eSIM may not work in the US. Check the provider's coverage list, or buy a plan that names both." },
  ],
  networks: {
    intro: worldNetworksIntro("Canada"),
    rows: worldRows("Canada", { ee: worldRow.eeZone1(), o2: worldRow.o2Travel(), three: worldRow.threeWorld() }),
  },
  providers: {
    intro: providersIntro,
    notes: providerNotes("Canada", { nomad: "Telus and Bell", airalo: "Bell", klook: null }),
  },
  sections: [
    {
      id: "what-uk-networks-charge",
      heading: "What UK networks charge in Canada",
      paragraphs: [
        "EE puts Canada in its Rest of World Zone 1, with passes at £6 for 24 hours, £30 for 7 days and £50 for 15. Three sells Go Roam Around the World passes at £12.50 for 3 days, £30 for 7 and £60 for 14, with up to 12GB of your UK data and no hotspot. O2 Travel is £7 a day with unlimited data at 2Mbps.",
        "For a fortnight that's £50 to £98, depending on the network. The worked costs below compare it with live eSIM prices.",
      ],
    },
    {
      id: "rockies-and-parks",
      heading: "Staying connected in the Rockies and national parks",
      paragraphs: [
        "Towns such as Banff, Jasper and Whistler have good coverage, but the highways between them and the backcountry often have none on any network.",
        "Download offline maps and trail guides before you set off, and don't rely on your phone for navigation or emergencies in remote areas.",
      ],
    },
    {
      id: "crossing-into-the-us",
      heading: "Combining Canada with the US",
      paragraphs: [
        "Many trips take in both countries. A Canada eSIM may not work south of the border, so check the provider's coverage list, or look for a plan that names both. Your UK network treats them as separate destinations, too, though EE, O2 and Three price the US on the same terms as Canada.",
      ],
    },
  ],
  setup: setupSteps("Canada"),
  faq: [
    {
      question: "Do UK networks charge for roaming in Canada?",
      answer: "Yes. EE sells passes from £6 for 24 hours, O2 Travel is £7 a day at 2Mbps, and Three's Go Roam Around the World passes start at £12.50 for 3 days.",
    },
    {
      question: "Will my UK phone work in Canada?",
      answer: "If it's unlocked and supports eSIM, a travel eSIM will work for data. For ordinary calls over your UK SIM, check your network's Canada terms.",
    },
    {
      question: "Is there mobile coverage in Banff and the Rockies?",
      answer: "In the towns, yes. Highways between them and the backcountry often have no signal on any network, so download offline maps before you go.",
    },
    {
      question: "Will a Canada eSIM work in the US too?",
      answer: "Not always. Check the provider's coverage list, or buy a plan that names both countries.",
    },
    {
      question: "Do I get a Canadian phone number with a travel eSIM?",
      answer: "The plans compared here are data only, so there's no Canadian number. WhatsApp and FaceTime work over data, and your UK SIM can stay on for texts.",
    },
  ],
  related: ["united-states", "mexico", "australia", "japan", "ireland"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
