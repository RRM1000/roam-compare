import { euNetworksIntro, euRows, providerNotes, providersIntro, setupSteps } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/** France guide. Checked 10 September 2026; UK network rows come from lib/guides/shared.ts. */
export const franceGuide: DestinationGuide = {
  destination: "france",
  keyword: "France eSIM",
  title: "France eSIM vs UK roaming: what it costs from the UK (2026)",
  description:
    "France is in every UK network's Europe zone, but only some include it. Compare live France eSIM prices with UK roaming, including Corsica and the Alps.",
  verdict: {
    heading: "Short answer: check your UK plan first. If it charges a daily fee in France, an eSIM usually costs less.",
    body:
      "France is in every UK network's Europe zone. O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile include it on eligible plans, up to a roaming cap. EE, Vodafone, Three, Sky Mobile and VOXI charge a daily fee or sell passes. For a weekend in Paris those fees are small; over a week or two they add up, and an eSIM bought before you travel is usually cheaper. The worked costs below price both.",
  },
  facts: [
    { label: "Local networks", value: "Orange, SFR, Bouygues Telecom and Free Mobile. Nomad lists all four, and Klook's France eSIM names Orange and SFR." },
    { label: "Caps on included roaming", value: "O2 25GB, iD Mobile 30GB, SMARTY 12GB and giffgaff 5GB of your plan's data. Tesco Mobile sets no separate cap." },
    { label: "Monaco", value: "Monaco isn't in the EU. O2 includes it in its Europe Zone; check other networks before a day trip from Nice." },
    { label: "At sea", value: "Out of range of land, a ferry's phone can connect to the ship's own network, which UK roaming allowances don't cover." },
    { label: "Local SIMs", value: "French prepaid SIMs need ID when you buy them." },
  ],
  networks: { intro: euNetworksIntro("France"), rows: euRows("France", { o2: "Monaco is in O2's Europe Zone too." }) },
  providers: {
    intro: providersIntro,
    notes: providerNotes("France", { nomad: "Bouygues, Free Mobile, Orange and SFR", airalo: null, klook: "Orange and SFR" }),
  },
  sections: [
    {
      id: "which-networks-include-france",
      heading: "Which UK networks include France, and which charge",
      paragraphs: [
        "Each UK network now sets its own Europe roaming terms. O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile let eligible plans use their UK allowance in France at no extra charge. EE, Vodafone, Three, Sky Mobile and VOXI charge for each day you use your phone, or sell passes.",
        "Short trips cost little: two days on EE is £5.44 and on Sky £4. Over a week the passes run from £12 on Three to £16.50 on EE, which is where an eSIM starts to save money. The worked costs below use live eSIM prices.",
      ],
    },
    {
      id: "channel-ferries",
      heading: "Channel ferries and the ship network",
      paragraphs: [
        "Ferries carry their own mobile network for when the ship is out of range of land. If your phone connects to it, the charges come from the ship's operator, and they aren't part of your Europe allowance, your pass or a France eSIM.",
        "For the crossing, put your phone in airplane mode or turn data roaming off on every line, and switch back once you're in range of French or UK masts. Wi-Fi on board is usually a separate paid service.",
      ],
    },
    {
      id: "roaming-caps",
      heading: "When included roaming isn't enough",
      paragraphs: [
        "Included roaming comes with a cap: 5GB on giffgaff, 12GB on SMARTY, 25GB on O2 and 30GB on iD Mobile, or your own allowance if that's smaller.",
        "At our everyday estimate of about 0.8GB a day, a week needs around 6GB and a fortnight around 12GB. Past giffgaff's cap, data costs 10p per MB, so a skiing fortnight with lots of video is cheaper on an eSIM.",
      ],
    },
  ],
  setup: setupSteps("France", { checkPlanFirst: true }),
  faq: [
    {
      question: "Does my UK phone work in France without roaming charges?",
      answer: "On O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile, eligible plans use their UK allowance in France at no extra cost, up to each network's cap. EE, Vodafone, Three, Sky Mobile and VOXI charge a daily fee or sell passes.",
    },
    {
      question: "What does Three charge for roaming in France?",
      answer: "Three charges £2 a day to use your allowance in its Go Roam in Europe zone, or sells passes: £5 for 3 days, £12 for 7 and £24 for 14. You can use up to 12GB of your UK data abroad.",
    },
    {
      question: "Is roaming on a Channel ferry included?",
      answer: "No. Out of range of land, your phone can connect to the ship's own network, which isn't covered by UK Europe roaming or a France eSIM. Use airplane mode or turn data roaming off for the crossing.",
    },
    {
      question: "Is Monaco included in EU roaming?",
      answer: "Monaco isn't in the EU. O2 includes it in its Europe Zone, but check other networks, and the eSIM provider's coverage list, before a day trip.",
    },
    {
      question: "Will a France eSIM give me a French phone number?",
      answer: "The plans compared here are data only, so there's no French number and no ordinary calls or texts. WhatsApp and FaceTime work over data, and your UK SIM can stay on for texts.",
    },
  ],
  related: ["spain", "italy", "germany", "netherlands", "portugal"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
