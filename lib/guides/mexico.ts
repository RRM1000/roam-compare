import { providerNotes, providersIntro, setupSteps, worldNetworksIntro, worldRow, worldRows } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/** Mexico guide. Checked 10 September 2026; UK network rows come from lib/guides/shared.ts. */
export const mexicoGuide: DestinationGuide = {
  destination: "mexico",
  keyword: "Mexico eSIM",
  title: "Mexico eSIM vs UK roaming: what it costs from the UK (2026)",
  description:
    "Mexico is outside every UK network's Europe zone, and Three charges more there than in the US. Compare live Mexico eSIM prices with EE, O2, Three and the rest, and see which local networks the eSIMs use.",
  verdict: {
    heading: "Short answer: buy a Mexico eSIM before you fly, and check which network it uses if you're leaving the resorts.",
    body:
      "Mexico is outside every UK network's Europe zone. EE sells passes from £6 for 24 hours, O2 Travel is £7 a day at 2Mbps, and Three puts Mexico in its pricier Around the World Extra zone, with passes from £17.50 for 3 days. For a week or two, an eSIM usually costs less. The eSIMs we could check run on AT&T or Movistar rather than Telcel, which has the widest coverage outside the cities.",
  },
  facts: [
    { label: "Local networks", value: "Telcel, AT&T and Movistar. Telcel runs the largest network, and Movistar uses AT&T's. Nomad lists AT&T and Movistar, and Airalo lists Movistar." },
    { label: "Three's zone", value: "Three charges more in Mexico than in the US or Canada: it's an Around the World Extra destination, at £42 for a 7-day pass." },
    { label: "Local SIMs", value: "Telcel SIMs are sold in its own shops and in convenience stores." },
  ],
  networks: {
    intro: worldNetworksIntro("Mexico"),
    rows: worldRows("Mexico", { ee: worldRow.eeZone1(), o2: worldRow.o2Travel(), three: worldRow.threeExtra() }),
  },
  providers: {
    intro: providersIntro,
    notes: providerNotes("Mexico", { nomad: "AT&T and Movistar", airalo: "Movistar", klook: "Movistar" }),
  },
  sections: [
    {
      id: "what-uk-networks-charge",
      heading: "What UK networks charge in Mexico",
      paragraphs: [
        "EE puts Mexico in its Rest of World Zone 1, with passes at £6 for 24 hours, £30 for 7 days and £50 for 15. O2 Travel is £7 a day with unlimited data at 2Mbps. Three puts Mexico in Around the World Extra rather than the cheaper zone it uses for the US and Canada, so a week costs £42.",
        "The worked costs below compare each with live eSIM prices for a week and a fortnight.",
      ],
    },
    {
      id: "which-network",
      heading: "Telcel, AT&T and Movistar: why the network matters",
      paragraphs: [
        "Telcel runs Mexico's largest network, and outside the cities and resort strips it's often the one with a signal. AT&T covers the cities and main tourist areas well, and Movistar runs on AT&T's network.",
        "Nomad lists AT&T and Movistar for Mexico, and Airalo lists Movistar. For Cancún, the Riviera Maya or Mexico City that's fine. For road trips into the interior, check the network before you buy, or plan on offline maps.",
      ],
    },
    {
      id: "local-sim",
      heading: "Buying a local SIM",
      paragraphs: [
        "Telcel SIMs are sold in its shops and in convenience stores, and give you a Mexican number. An eSIM is simpler if you only need data, because it's installed before you fly and working when you land.",
      ],
    },
  ],
  setup: setupSteps("Mexico"),
  faq: [
    {
      question: "Do UK networks include roaming in Mexico?",
      answer: "No. EE sells passes from £6 for 24 hours, O2 Travel is £7 a day at 2Mbps, and Three's Around the World Extra passes start at £17.50 for 3 days.",
    },
    {
      question: "Why does Three charge more in Mexico than in the US?",
      answer: "Three puts Mexico in its Around the World Extra zone and the US in Around the World. A 7-day pass is £42 in Mexico and £30 in the US.",
    },
    {
      question: "Which network has the best coverage in Mexico?",
      answer: "Telcel runs the largest network and is strongest outside the cities. The eSIMs we could check use AT&T or Movistar, which cover the cities and resort areas well.",
    },
    {
      question: "Can I use a Mexico eSIM in the US too?",
      answer: "Not always. Check the provider's coverage list, or buy a plan that names both countries.",
    },
    {
      question: "Do I get a Mexican phone number with a travel eSIM?",
      answer: "The plans compared here are data only, so there's no Mexican number. WhatsApp works over data, and your UK SIM can stay on for texts.",
    },
  ],
  related: ["united-states", "canada", "spain", "thailand", "indonesia"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
