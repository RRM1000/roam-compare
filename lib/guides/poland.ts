import { euNetworksIntro, euRows, providerNotes, providersIntro, setupSteps } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/** Poland guide. Checked 23 September 2026; UK network rows come from lib/guides/shared.ts. */
export const polandGuide: DestinationGuide = {
  destination: "poland",
  keyword: "Poland eSIM",
  title: "Poland eSIM vs UK roaming: what it costs from the UK (2026)",
  description:
    "Poland is in every UK network's Europe zone, but only some include it. Compare live Poland eSIM prices with UK roaming for Kraków, Warsaw and the Tatras.",
  verdict: {
    heading: "Short answer: check your UK plan first. If it charges a daily fee in Poland, an eSIM usually costs less.",
    body:
      "Poland is an EU country, so it sits in every UK network's Europe zone. O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile include it on eligible plans, up to a roaming cap. EE, Vodafone, Three, Sky Mobile and VOXI charge a daily fee or sell passes. For a long weekend in Kraków that difference is small; for a fortnight it isn't. The worked costs below price both.",
  },
  facts: [
    { label: "Local networks", value: "Orange, Play, Plus and T-Mobile. Nomad lists Plus, Orange and Play, Airalo lists P4, the company behind Play, and Klook's Poland eSIM runs on Orange." },
    { label: "Caps on included roaming", value: "O2 25GB, iD Mobile 30GB, SMARTY 12GB and giffgaff 5GB of your plan's data. Tesco Mobile sets no separate cap." },
    { label: "Local SIMs need registering", value: "Polish prepaid SIMs have had to be registered to an identity document since 2017. A passport is accepted, but it means a shop counter and a form." },
    { label: "5G in the cities", value: "Warsaw, Kraków, Gdańsk and Wrocław have wide 5G. We can't confirm 5G roaming on any UK network, so plan on 4G speeds." },
    { label: "The Tatras and the east", value: "Coverage follows the valleys and main roads. On the mountain trails and in the far east it drops out, so download maps first." },
  ],
  networks: { intro: euNetworksIntro("Poland"), rows: euRows("Poland") },
  providers: {
    intro: providersIntro,
    notes: providerNotes("Poland", { nomad: "Plus, Orange and Play", airalo: "P4", klook: "Orange" }),
  },
  sections: [
    {
      id: "which-networks-include-poland",
      heading: "Which UK networks include Poland, and which charge",
      paragraphs: [
        "O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile let eligible plans use their UK allowance in Poland at no extra charge, up to each network's roaming cap. EE, Vodafone, Three, Sky Mobile and VOXI charge for each day you use your phone, or sell passes.",
        "For a week, those passes run from £12 on Three to £16.50 on EE. Sky charges £2 on each day you actually use your phone, which suits a trip where you're offline most of the time. The worked costs below compare each with live eSIM prices.",
      ],
    },
    {
      id: "sim-registration",
      heading: "Local SIMs have to be registered",
      paragraphs: [
        "Poland has required prepaid SIMs to be registered to an identity document since 2017. As a visitor you can register one with your passport, but it means finding an operator's shop, queueing and handing over your details.",
        "An eSIM skips that: you buy it at home, install it on Wi-Fi and land connected. Convenience is the main reason to choose one over a Polish prepaid SIM, because Polish data is cheap by UK standards once you have a local SIM in hand.",
      ],
    },
    {
      id: "roaming-caps",
      heading: "When included roaming isn't enough",
      paragraphs: [
        "Included roaming comes with a cap: 5GB on giffgaff, 12GB on SMARTY, 25GB on O2 and 30GB on iD Mobile, or your own allowance if that's smaller.",
        "At our everyday estimate of about 0.8GB a day, a fortnight needs around 12GB, which is past giffgaff's cap and at the edge of SMARTY's. Beyond giffgaff's 5GB it's 10p per MB, so for longer stays an eSIM with a bigger allowance costs less than the overage.",
      ],
    },
  ],
  setup: setupSteps("Poland", { checkPlanFirst: true }),
  faq: [
    {
      question: "Can I use my UK phone in Poland without extra charges?",
      answer: "On O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile, eligible plans use their UK allowance in Poland at no extra cost, up to each network's cap. EE, Vodafone, Three, Sky Mobile and VOXI charge a daily fee or sell passes.",
    },
    {
      question: "Do I need to register a Polish SIM card?",
      answer: "Yes. Prepaid SIMs in Poland have had to be registered to an identity document since 2017, and a passport is accepted. A travel eSIM needs no registration.",
    },
    {
      question: "What does Three charge for roaming in Poland?",
      answer: "Go Roam in Europe: £2 for each day you use your phone, or a pass at £5 for 3 days, £12 for 7 and £24 for 14, letting you use up to 12GB of your UK data abroad.",
    },
    {
      question: "How much data do I need for a week in Poland?",
      answer: "At our everyday estimate of about 0.8GB a day, around 6GB. Light use, mostly maps and messages, needs about 3GB; heavy use with video or a hotspot, about 14GB.",
    },
    {
      question: "Will a Poland eSIM give me a Polish phone number?",
      answer: "The plans compared here are data only, so there's no Polish number and no ordinary calls or texts. WhatsApp and FaceTime work over the data, and your UK SIM can stay on for texts from your bank.",
    },
  ],
  related: ["germany", "croatia", "switzerland", "france", "netherlands"],
  writtenAt: "2026-09-23",
  updatedAt: "2026-09-23",
};
