import { providerNotes, providersIntro, setupSteps, worldNetworksIntro, worldRow, worldRows } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/** Australia guide. Checked 10 September 2026; UK network rows come from lib/guides/shared.ts. */
export const australiaGuide: DestinationGuide = {
  destination: "australia",
  keyword: "Australia eSIM",
  title: "Australia eSIM vs UK roaming: 2026 costs from the UK",
  description:
    "Australia is outside every UK network's Europe zone. Compare live Australia eSIM prices with what EE, O2, Three and the rest charge to roam there.",
  verdict: {
    heading: "Short answer: for anything longer than a few days, an Australia eSIM costs less than UK roaming.",
    body:
      "Australia is outside every UK network's Europe zone. EE sells passes from £6 for 24 hours to £50 for 15 days, O2 Travel is £7 a day at 2Mbps, and Three sells Go Roam Around the World passes from £12.50 for 3 days to £60 for 14. Trips to Australia tend to be long, and three weeks needs more than one pass on any of them. An eSIM sized for the whole trip is usually cheaper.",
  },
  facts: [
    { label: "Local networks", value: "Telstra, Optus and TPG, which runs Vodafone. Nomad lists Optus and Telstra, and Airalo lists Optus." },
    { label: "3G is gone", value: "Australia's networks switched off 3G in 2023 and 2024. Phones that can't make 4G voice calls, including calls to 000, may not work there." },
    { label: "Outside the cities", value: "Telstra has the widest coverage in regional and remote areas, so on outback roads a plan that can use Telstra helps." },
    { label: "Emergency calls", value: "Dial 000." },
  ],
  networks: {
    intro: worldNetworksIntro("Australia"),
    rows: worldRows("Australia", { ee: worldRow.eeZone1(), o2: worldRow.o2Travel(), three: worldRow.threeWorld() }),
  },
  providers: {
    intro: providersIntro,
    notes: providerNotes("Australia", { nomad: "Optus and Telstra", airalo: "Optus", klook: "Optus" }),
  },
  sections: [
    {
      id: "long-trips",
      heading: "Why long trips make roaming expensive",
      paragraphs: [
        "Most people fly to Australia for weeks, not days. On EE, three weeks of passes costs £80, on Three £87.50, and on O2 Travel £147. Each of those uses your UK data allowance, and Three's passes cap you at 12GB abroad.",
        "At our everyday estimate of about 0.8GB a day, three weeks needs around 17GB. An eSIM with that much data is usually well below the cost of the passes; the worked costs below price a week and a fortnight with live prices.",
      ],
    },
    {
      id: "check-your-phone",
      heading: "Check your phone works on Australia's 4G-only networks",
      paragraphs: [
        "Telstra, Optus and TPG have all switched off 3G. A phone that can't make voice calls over 4G, including emergency calls to 000, may not work on Australian networks at all.",
        "Recent iPhones and major Android models support 4G calling, but older and some imported handsets don't. Check your model before you travel, especially if you're taking an old phone as a spare.",
      ],
    },
    {
      id: "outback-coverage",
      heading: "Coverage outside the cities",
      paragraphs: [
        "All three networks cover the cities well. Telstra reaches furthest into regional and remote areas, and Nomad lists Telstra alongside Optus for Australia.",
        "On long drives, expect stretches with no signal on any network. Download offline maps and tell someone your route before heading into remote country.",
      ],
    },
  ],
  setup: setupSteps("Australia", { extra: [{ title: "Check 4G calling is on", body: "In your phone's settings, make sure 4G or VoLTE calling is enabled, so you can make calls, including to 000, on Australia's 4G-only networks." }] }),
  faq: [
    {
      question: "Do UK networks charge for roaming in Australia?",
      answer: "Yes. EE sells passes from £6 for 24 hours to £50 for 15 days, O2 Travel is £7 a day at 2Mbps, and Three's Go Roam Around the World passes run from £12.50 for 3 days to £60 for 14.",
    },
    {
      question: "Will my UK phone work in Australia after the 3G shutdown?",
      answer: "If it can make voice calls over 4G, yes. Phones that can't, including for calls to 000, may not work on Australian networks. Check your model before you go.",
    },
    {
      question: "Which network has the best coverage in regional Australia?",
      answer: "Telstra has the widest coverage outside the cities. Nomad lists Telstra and Optus for Australia; Airalo lists Optus.",
    },
    {
      question: "What's the emergency number in Australia?",
      answer: "000.",
    },
    {
      question: "Does an Australia travel eSIM include a local number?",
      answer: "The plans compared here are data only, so there's no Australian number. WhatsApp and FaceTime work over data, and your UK SIM can stay on for texts.",
    },
  ],
  related: ["united-states", "canada", "japan", "thailand", "indonesia"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
