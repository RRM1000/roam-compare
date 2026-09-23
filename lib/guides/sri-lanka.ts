import { providerNotes, providersIntro, setupSteps, worldNetworksIntro, worldRow, worldRows } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/** Sri Lanka guide. Checked 23 September 2026; UK network rows come from lib/guides/shared.ts. */
export const sriLankaGuide: DestinationGuide = {
  destination: "sri-lanka",
  keyword: "Sri Lanka eSIM",
  title: "Sri Lanka eSIM vs UK roaming: the 2026 cost from the UK",
  description:
    "Sri Lanka has some of the cheapest tourist SIMs anywhere, and EE charges its dearest pass rate to roam there. Compare live Sri Lanka eSIM prices with UK roaming, and decide before you reach the arrivals hall.",
  verdict: {
    heading: "Short answer: UK roaming is poor value here. An eSIM is the easy choice, and an airport SIM is the cheap one.",
    body:
      "Sri Lanka is in EE's Rest of World Zone 3, its dearest band: £8 for 24 hours, and that pass includes only 500MB a day. O2 Travel covers Sri Lanka at £7 a day at 2Mbps, and Three's Around the World passes start at £12.50 for 3 days. Against that, the tourist SIMs sold in the arrivals hall at Colombo are genuinely cheap — Dialog and Mobitel packages with 20GB or more for around £4. An eSIM costs more than that but has you online before you clear customs, with no counter and no passport copy. The worked costs below price the roaming options against live eSIM prices.",
  },
  facts: [
    { label: "Local networks", value: "Dialog, Mobitel, Hutch and Airtel. Nomad and Airalo both list Mobitel and Hutch, and Klook's Sri Lanka eSIM runs on Mobitel." },
    { label: "EE's dearest zone", value: "Sri Lanka is in EE's Rest of World Zone 3, where the pass is £8 for 24 hours and includes 500MB a day rather than one pot for the trip." },
    { label: "Airport SIMs are cheap", value: "At Bandaranaike arrivals, Dialog and Mobitel tourist packages with 20GB or more sell for roughly £4, with your passport shown at the counter." },
    { label: "Coverage", value: "The coast, the cities and the hill country towns are well covered. Yala, Wilpattu and the inland reserves have gaps." },
    { label: "Data is cheap locally", value: "Top-ups cost little, so if you stay a month a local SIM wins comfortably on price. For a fortnight, convenience decides it." },
  ],
  networks: {
    intro: worldNetworksIntro("Sri Lanka"),
    rows: worldRows("Sri Lanka", {
      ee: worldRow.eeZone3(),
      o2: worldRow.o2Travel(),
      three: worldRow.threeWorld(),
    }),
  },
  providers: {
    intro: providersIntro,
    notes: providerNotes("Sri Lanka", { nomad: "Mobitel and Hutch", airalo: "Mobitel and Hutch", klook: "Mobitel" }),
  },
  sections: [
    {
      id: "what-uk-networks-charge",
      heading: "What UK networks charge in Sri Lanka",
      paragraphs: [
        "EE's price guide puts Sri Lanka in Rest of World Zone 3, the most expensive band: £8 for 24 hours, and the pass includes 500MB a day plus unlimited minutes and texts. A week of that is £56 for 3.5GB, which is more than any eSIM in the comparison above.",
        "O2 Travel covers Sri Lanka at £7 on each day you use it, with unlimited data capped at 2Mbps. Three sells Go Roam Around the World passes from £12.50 for 3 days. Vodafone prices Sri Lanka against your own account, and the smaller networks publish no rate we could confirm, so those rows hand you to their own pages.",
      ],
    },
    {
      id: "local-sims",
      heading: "The airport SIM is the cheapest option, if you want the queue",
      paragraphs: [
        "Sri Lanka is one of the few places where we'd tell you the local SIM is the best-value answer. The operator counters in the arrivals hall at Colombo sell tourist packages with large data allowances for a few pounds, registered against your passport on the spot.",
        "What you pay for that price is time: a counter, a form and a wait after a long flight, and a number that only works in Sri Lanka. An eSIM costs more but is already working when you switch your phone on, so the honest answer depends on whether your priority is the fare or the queue.",
      ],
    },
    {
      id: "coverage-and-travel",
      heading: "Coverage from the coast to the hill country",
      paragraphs: [
        "The south and west coasts, Colombo, Kandy and the hill country towns are well covered, and the train to Ella keeps a signal for most of the route. The national parks and the far north are thinner, so download maps and safari bookings in advance.",
        "If you're on a travel eSIM, check whether hotspot use is allowed before you rely on sharing it with a driver or a travelling companion, and remember that Sri Lankan networks carry ordinary calls over 4G, so app calls are the practical way to talk.",
      ],
    },
  ],
  setup: setupSteps("Sri Lanka", {
    extra: [
      {
        title: "Decide before the arrivals hall",
        body: "If you want the cheap local SIM, have your passport ready and budget twenty minutes at the counter. If you'd rather land connected, install the eSIM at home and walk past it.",
      },
    ],
  }),
  faq: [
    {
      question: "What does EE charge for roaming in Sri Lanka?",
      answer: "Sri Lanka is in EE's Rest of World Zone 3, so a pass costs £8 for 24 hours and includes 500MB of data a day, along with unlimited minutes and texts.",
    },
    {
      question: "Is a local SIM cheaper than an eSIM in Sri Lanka?",
      answer: "Usually yes. Tourist packages at Colombo airport give 20GB or more for around £4, registered to your passport. An eSIM costs more but works the moment you land, with no counter and no paperwork.",
    },
    {
      question: "Does O2 Travel cover Sri Lanka?",
      answer: "Yes, at £7 on each day you use it, with unlimited data at speeds capped at 2Mbps. That is fine for maps and messaging but slow for video.",
    },
    {
      question: "How much data do I need for two weeks in Sri Lanka?",
      answer: "At our everyday estimate of about 0.8GB a day, around 12GB. Light use, mostly maps and messages, needs about 6GB; heavy use with video or a hotspot, about 28GB.",
    },
    {
      question: "Will a Sri Lanka eSIM give me a local phone number?",
      answer: "The plans compared here are data only, so there's no Sri Lankan number. WhatsApp calls work over the data, and guesthouses and drivers generally use WhatsApp anyway.",
    },
  ],
  related: ["india", "thailand", "vietnam", "indonesia", "united-arab-emirates"],
  writtenAt: "2026-09-23",
  updatedAt: "2026-09-23",
};
