import { providerNotes, providersIntro, setupSteps, worldNetworksIntro, worldRow, worldRows } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/** India guide. Checked 23 September 2026; UK network rows come from lib/guides/shared.ts. */
export const indiaGuide: DestinationGuide = {
  destination: "india",
  keyword: "India eSIM",
  title: "India eSIM vs UK roaming: what it costs from the UK (2026)",
  description:
    "A local Indian SIM needs your passport, visa and a local address, and can take a day to activate. Compare live India eSIM prices with what EE, O2, Three and the rest charge to roam there from the UK.",
  verdict: {
    heading: "Short answer: buy an eSIM before you fly. India's own SIMs are cheap but slow to get, and UK roaming is dear.",
    body:
      "India is outside every UK network's Europe zone. EE sells Rest of World Zone 1 passes from £6 for 24 hours, O2 Travel is £7 a day at 2Mbps, and Three's Around the World passes start at £12.50 for 3 days. A local Indian SIM costs very little, but you need your passport, your visa and a local address, and it can take anywhere from two to twenty-four hours to activate. An eSIM bought at home works the moment you land, usually for less than a week of roaming. The worked costs below price both.",
  },
  facts: [
    { label: "Local networks", value: "Jio, Airtel and Vi carry almost all of India's traffic. Nomad and Klook both list Airtel, and Airalo lists Vi India." },
    { label: "Local SIMs need paperwork", value: "Indian rules require a passport, a valid visa and a local address for a tourist SIM, with a photograph taken in the shop." },
    { label: "Activation isn't instant", value: "A tourist SIM is usually verified before it works, which can take from a couple of hours to a day. An eSIM has no such wait." },
    { label: "5G is widespread", value: "Jio and Airtel have built out 5G across the cities. We can't confirm 5G roaming on any UK network, so plan on 4G speeds." },
    { label: "Calls over data", value: "Indian networks carry ordinary calls over 4G. Travel eSIMs here are data only, so use WhatsApp for voice and keep your UK SIM for texts." },
  ],
  networks: {
    intro: worldNetworksIntro("India"),
    rows: worldRows("India", {
      ee: worldRow.eeZone1(),
      o2: worldRow.o2Travel(),
      three: worldRow.threeWorld(),
    }),
  },
  providers: {
    intro: providersIntro,
    notes: providerNotes("India", { nomad: "Airtel", airalo: "Vi India", klook: "Airtel" }),
  },
  sections: [
    {
      id: "what-uk-networks-charge",
      heading: "What UK networks charge in India",
      paragraphs: [
        "EE puts India in Rest of World Zone 1, so you need a pass: £6 for 24 hours, £30 for 7 days or £50 for 15. O2 Travel covers India at £7 on each day you use it, with unlimited data capped at 2Mbps, and Three sells Go Roam Around the World passes at £12.50 for 3 days, £30 for 7 and £60 for 14.",
        "The other networks are less clear-cut. Vodafone prices India against your own plan in its roaming checker, and iD Mobile, Sky, giffgaff, SMARTY, VOXI and Tesco Mobile don't publish a single rate we could confirm, so those rows hand you to the network's own page rather than guess. A fortnight on any of the priced options costs more than most India eSIMs.",
      ],
    },
    {
      id: "local-sim-paperwork",
      heading: "Why a local SIM is cheap but slow",
      paragraphs: [
        "India's telecom rules treat a tourist SIM as a documented purchase: you hand over your passport and visa, give a local address, have your photograph taken and sign a form. Airport counters at Delhi and Mumbai do it in one visit, but the connection is activated only after the details are verified.",
        "That wait is the real cost. A SIM that starts working the next morning is no use for the taxi you need tonight. An eSIM installed at home covers the arrival, and you can still buy a local SIM later if you're staying for weeks.",
      ],
    },
    {
      id: "coverage-and-travel",
      heading: "Coverage on the road and on the rails",
      paragraphs: [
        "City coverage is excellent and cheap by UK standards, and Jio and Airtel reach most towns along the main routes. Long train journeys, the hills and the desert stretches are patchier, so download tickets, maps and translations before you set off.",
        "If you're travelling between states, nothing changes on a travel eSIM: Indian numbers roam nationally, and your plan's allowance follows you. Check whether the plan you pick allows hotspot use if you'll be sharing with a travelling companion.",
      ],
    },
  ],
  setup: setupSteps("India", {
    extra: [
      {
        title: "Keep your UK SIM for bank texts",
        body: "Indian services often send one-time codes to a local number, but your UK bank will text the number it has on file. Leave the UK line switched on for texts, with its data roaming off.",
      },
    ],
  }),
  faq: [
    {
      question: "Do I need a local SIM card in India?",
      answer: "No. A travel eSIM works on Indian networks without the passport, visa, local address and photograph a tourist SIM requires, and without waiting hours for activation.",
    },
    {
      question: "What does EE charge for roaming in India?",
      answer: "India is in EE's Rest of World Zone 1, so you need a pass: £6 for 24 hours, £30 for 7 days or £50 for 15, using your UK allowance up to a 50GB fair-use ceiling.",
    },
    {
      question: "Does O2 Travel cover India?",
      answer: "Yes. O2 Travel is £7 on each day you use it in India, with unlimited data at speeds capped at 2Mbps, which is fine for maps and messages but slow for video.",
    },
    {
      question: "How much data do I need for two weeks in India?",
      answer: "At our everyday estimate of about 0.8GB a day, around 12GB. Light use, mostly maps and messages, needs about 6GB; heavy use with video or a hotspot, about 28GB.",
    },
    {
      question: "Will an India eSIM give me an Indian phone number?",
      answer: "The plans compared here are data only, so there's no Indian number. WhatsApp calls work over the data, and anything that insists on an Indian number needs a local SIM with the usual paperwork.",
    },
  ],
  related: ["sri-lanka", "thailand", "vietnam", "united-arab-emirates", "indonesia"],
  writtenAt: "2026-09-23",
  updatedAt: "2026-09-23",
};
