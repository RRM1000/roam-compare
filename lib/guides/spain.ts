import { euNetworksIntro, euRows, providerNotes, providersIntro, setupSteps } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/** Spain guide. Checked 10 September 2026; UK network rows come from lib/guides/shared.ts. */
export const spainGuide: DestinationGuide = {
  destination: "spain",
  keyword: "Spain eSIM",
  title: "Spain eSIM vs UK roaming: what it costs from the UK (2026)",
  description:
    "Spain is in every UK network's Europe zone, but only some include it. Compare what EE, O2, Vodafone, Three and the rest charge in Spain with live eSIM prices, and check the roaming caps and the Gibraltar and Andorra catches.",
  verdict: {
    heading: "Short answer: check your UK plan first. If it charges a daily fee in Spain, an eSIM usually costs less.",
    body:
      "Spain is in every UK network's Europe zone. O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile include it on eligible plans, up to a roaming cap. EE, Vodafone, Three, Sky Mobile and VOXI charge a daily fee or sell passes. If you're with one of those, or your cap is smaller than your trip needs, an eSIM bought before you fly is usually the cheaper option. The worked costs below price both for a week and a fortnight.",
  },
  facts: [
    { label: "Local networks", value: "Movistar, Orange, Vodafone and Yoigo run Spain's main networks. Nomad lists Orange and Movistar, and Airalo lists Orange." },
    { label: "Caps on included roaming", value: "O2 25GB, iD Mobile 30GB, SMARTY 12GB and giffgaff 5GB of your plan's data. Tesco Mobile sets no separate cap." },
    { label: "Gibraltar", value: "Gibraltar isn't Spain. O2 and giffgaff include it in their Europe roaming; check any other network before you cross." },
    { label: "Andorra", value: "Andorra isn't in the EU, and O2's Europe Zone doesn't list it. In the Pyrenees near the border, your phone can roam onto Andorran networks." },
    { label: "Local SIMs", value: "Buying a Spanish prepaid SIM means showing your passport, and it only works once you've swapped it in after landing." },
  ],
  networks: { intro: euNetworksIntro("Spain"), rows: euRows("Spain", { o2: "Gibraltar is in O2's Europe Zone; Andorra isn't." }) },
  providers: {
    intro: providersIntro,
    notes: providerNotes("Spain", { nomad: "Orange and Movistar", airalo: "Orange", klook: "Vodafone, Orange, Movistar and Yoigo" }, { airaloDailyCapGb: 5 }),
  },
  sections: [
    {
      id: "which-networks-include-spain",
      heading: "Which UK networks include Spain, and which charge",
      paragraphs: [
        "Since the UK left the EU, each network sets its own Europe roaming terms, and they have split. O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile let eligible plans use their UK allowance in Spain at no extra charge. EE, Vodafone, Three, Sky Mobile and VOXI charge for each day you use your phone, or sell passes that bring the daily cost down.",
        "For a week in Spain, that's nothing extra on the first group and between £12 and £16.50 on the second, depending on the network. The table below has each network's terms, and the worked example underneath prices a week and a fortnight.",
      ],
    },
    {
      id: "roaming-caps",
      heading: "When included roaming isn't enough",
      paragraphs: [
        "Included roaming comes with a cap on how much of your UK data you can use abroad. giffgaff's is 5GB, SMARTY's is 12GB, O2's is 25GB and iD Mobile's is 30GB, and on a smaller plan your own allowance is the limit.",
        "At our everyday estimate of about 0.8GB a day, a week in Spain needs around 6GB and a fortnight around 12GB. A fortnight is already past giffgaff's cap, after which data costs 10p per MB, and heavy video or hotspot use can pass SMARTY's. An eSIM for the extra data is far cheaper than paying by the megabyte.",
      ],
    },
    {
      id: "gibraltar-andorra",
      heading: "Gibraltar, Andorra and the borders",
      paragraphs: [
        "Gibraltar and Andorra aren't part of Spain, and your phone treats them as separate countries. O2 and giffgaff include Gibraltar in their Europe roaming. O2's Europe Zone doesn't list Andorra, so a drive into the Pyrenees can move you onto roaming charges without you noticing.",
        "A Spain eSIM covers Spain unless its provider says otherwise. If your trip takes in Gibraltar or Andorra, check the provider's coverage list before you buy, and keep your UK line's data roaming off near the border.",
      ],
    },
  ],
  setup: setupSteps("Spain", { checkPlanFirst: true }),
  faq: [
    {
      question: "Does free EU roaming still work in Spain on UK networks?",
      answer: "On some networks. O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile include Spain on eligible plans, with caps between 5GB and 30GB; Tesco sets no separate cap. EE, Vodafone, Three, Sky Mobile and VOXI charge a daily fee or sell passes.",
    },
    {
      question: "What does EE charge for roaming in Spain?",
      answer: "On plans taken out or upgraded from 7 July 2021, EE charges £2.72 for each day you use your phone in its Europe zone, or £16.50 for 7 days and £30 for 15. You use your UK allowance, up to a 50GB fair-use ceiling.",
    },
    {
      question: "Is Gibraltar covered by Spanish roaming?",
      answer: "Gibraltar isn't Spain. O2 and giffgaff include it in their Europe roaming, so check any other network before you go. A Spain eSIM may not cover Gibraltar either, so check the provider's list.",
    },
    {
      question: "How much data do I need for a week in Spain?",
      answer: "We estimate about 0.35GB a day for maps and messages, 0.8GB for everyday social media and browsing, and 2GB for video and hotspot use. That's roughly 3GB, 6GB or 14GB for a week.",
    },
    {
      question: "Will a Spain eSIM give me a Spanish phone number?",
      answer: "The plans compared here are data only, so there's no Spanish number and no ordinary calls or texts. WhatsApp and FaceTime work over data. Keep your UK SIM on, with its data roaming off, so texts to your UK number still arrive.",
    },
  ],
  related: ["portugal", "france", "italy", "greece", "morocco"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
