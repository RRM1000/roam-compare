import { providerNotes, providersIntro, setupSteps, worldNetworksIntro, worldRow, worldRows } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/** Vietnam guide. Checked 23 September 2026; UK network rows come from lib/guides/shared.ts. */
export const vietnamGuide: DestinationGuide = {
  destination: "vietnam",
  keyword: "Vietnam eSIM",
  title: "Vietnam eSIM vs UK roaming: what it costs from the UK (2026)",
  description:
    "Vietnam isn't even on O2 Travel's list, and EE charges rest-of-world pass rates. Compare live Vietnam eSIM prices with what UK networks charge, and check the passport rule on local SIMs before you fly.",
  verdict: {
    heading: "Short answer: buy an eSIM before you fly. Vietnam is one of the few destinations O2 Travel doesn't cover at all.",
    body:
      "Vietnam sits outside every UK network's Europe zone, and it isn't on O2 Travel's destination list, so O2 customers fall back to standard roaming rates rather than the £7 daily cap. EE sells Rest of World Zone 1 passes from £6 for 24 hours and Three's Around the World passes start at £12.50 for 3 days. Local SIMs are cheap, but every one has to be registered to your passport. An eSIM installed at home costs less than a week of passes and works the moment you land. The worked costs below price both.",
  },
  facts: [
    { label: "Local networks", value: "Viettel, Vinaphone and MobiFone cover the country. Nomad lists Vietnamobile, MobiFone and Vinaphone, Airalo lists VNPT, which runs Vinaphone, and Klook's Vietnam eSIM runs on Viettel." },
    { label: "O2 Travel doesn't list Vietnam", value: "The £7-a-day bolt-on covers a long list of destinations, and Vietnam isn't among them, so check O2's standard rate for your plan before you use data." },
    { label: "SIM registration is mandatory", value: "Vietnamese SIMs must be registered to a passport, and unregistered numbers are cut off. Airport and shop counters do it while you wait." },
    { label: "Airport SIM prices", value: "Tourist SIMs at Hanoi and Ho Chi Minh City airports typically run from about 150,000 to 350,000 dong, roughly £4.50 to £10.50." },
    { label: "Coverage", value: "Cities, the coast and the main highways are well covered. The northern mountains around Ha Giang and Sapa are patchy, so download maps." },
  ],
  networks: {
    intro: worldNetworksIntro("Vietnam"),
    rows: worldRows("Vietnam", {
      ee: worldRow.eeZone1(),
      three: worldRow.threeWorld(),
    }),
  },
  providers: {
    intro: providersIntro,
    notes: providerNotes("Vietnam", { nomad: "Vietnamobile, MobiFone and Vinaphone", airalo: "VNPT", klook: "Viettel" }),
  },
  sections: [
    {
      id: "what-uk-networks-charge",
      heading: "What UK networks charge in Vietnam",
      paragraphs: [
        "EE puts Vietnam in Rest of World Zone 1, so you buy a pass: £6 for 24 hours, £30 for 7 days or £50 for 15. Three sells Go Roam Around the World passes at £12.50 for 3 days, £30 for 7 and £60 for 14, using up to 12GB of your UK data, with hotspot use not allowed.",
        "O2 is the one to watch. Vietnam isn't on O2 Travel's list, so the £7-a-day cap doesn't apply and your plan's standard roaming rate does. Vodafone prices Vietnam against your own account in its checker, and iD Mobile, Sky, giffgaff, SMARTY, VOXI and Tesco Mobile publish no rate we could confirm, so those rows send you to the network rather than guess a number.",
      ],
    },
    {
      id: "local-sims-and-registration",
      heading: "Local SIMs, passports and registration",
      paragraphs: [
        "Every Vietnamese SIM has to be registered to an identity document, and for a visitor that means your passport. Counters at Noi Bai and Tan Son Nhat airports will do it on the spot, and a tourist package with a generous data allowance costs only a few pounds.",
        "The trade-off is the queue, the paperwork and the risk of buying an unregistered SIM from a street stall that stops working days later. An eSIM avoids all three, and you keep your UK number reachable at the same time.",
      ],
    },
    {
      id: "coverage-and-travel",
      heading: "Coverage from Hanoi to the Mekong",
      paragraphs: [
        "The cities, the coastal route and the main highways are well served, and data is fast and cheap on local networks. Ha Long Bay boat trips, the Ha Giang loop and the hills around Sapa all have gaps, so download offline maps and book confirmations before you leave a town.",
        "If you're crossing into Cambodia or Laos on the same trip, check the eSIM's coverage list first: a Vietnam-only plan stops at the border, and a regional Asia plan may be the cheaper way to cover the whole route.",
      ],
    },
  ],
  setup: setupSteps("Vietnam", {
    extra: [
      {
        title: "Check your O2 rate before you land",
        body: "Because Vietnam isn't on O2 Travel's list, an O2 line uses standard roaming rates there. Check the rate in the My O2 app and keep data roaming off on that line unless you've decided to pay it.",
      },
    ],
  }),
  faq: [
    {
      question: "Does O2 Travel work in Vietnam?",
      answer: "No. Vietnam isn't on O2 Travel's destination list, so the £7-a-day bolt-on doesn't apply and your plan's standard roaming rates do. Check the rate in My O2 before you use any data.",
    },
    {
      question: "What does EE charge for roaming in Vietnam?",
      answer: "Vietnam is in EE's Rest of World Zone 1, so you need a pass: £6 for 24 hours, £30 for 7 days or £50 for 15, using your UK allowance up to a 50GB fair-use ceiling.",
    },
    {
      question: "Do I need my passport to buy a SIM in Vietnam?",
      answer: "Yes. Vietnamese SIMs must be registered to an identity document, and unregistered numbers get cut off. A travel eSIM needs no registration at all.",
    },
    {
      question: "How much data do I need for two weeks in Vietnam?",
      answer: "At our everyday estimate of about 0.8GB a day, around 12GB. Light use, mostly maps and messages, needs about 6GB; heavy use with video or a hotspot, about 28GB.",
    },
    {
      question: "Will a Vietnam eSIM work in Cambodia or Laos?",
      answer: "Not unless the plan says so. A Vietnam-only eSIM stops at the border, so for a multi-country trip check the coverage list or pick a regional Asia plan.",
    },
  ],
  related: ["thailand", "indonesia", "india", "sri-lanka", "japan"],
  writtenAt: "2026-09-23",
  updatedAt: "2026-09-23",
};
