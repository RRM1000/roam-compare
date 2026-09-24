import { euNetworksIntro, euRows, providerNotes, providersIntro, setupSteps } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/** Portugal guide. Checked 10 September 2026; UK network rows come from lib/guides/shared.ts. */
export const portugalGuide: DestinationGuide = {
  destination: "portugal",
  keyword: "Portugal eSIM",
  title: "Portugal eSIM vs UK roaming: 2026 costs from the UK",
  description:
    "Portugal is in every UK network's Europe zone, but only some include it. Compare live Portugal eSIM prices with UK roaming, Madeira and the Azores too.",
  verdict: {
    heading: "Short answer: check your UK plan first. If it charges a daily fee in Portugal, an eSIM usually costs less.",
    body:
      "Portugal is in every UK network's Europe zone. O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile include it on eligible plans, up to a roaming cap. EE, Vodafone, Three, Sky Mobile and VOXI charge a daily fee or sell passes. For a week on the Algarve or a fortnight in Madeira on one of those networks, an eSIM bought before you fly is usually cheaper. The worked costs below price both.",
  },
  facts: [
    { label: "Local networks", value: "MEO, NOS and Vodafone. Nomad lists MEO, Vodafone and Sonaecom, Airalo lists NOS, and Klook's Portugal eSIM runs on MEO." },
    { label: "Caps on included roaming", value: "O2 25GB, iD Mobile 30GB, SMARTY 12GB and giffgaff 5GB of your plan's data. Tesco Mobile sets no separate cap." },
    { label: "Madeira and the Azores", value: "Both are regions of Portugal, served by the same national networks as the mainland." },
    { label: "The Spanish border", value: "Near the border your phone may roam onto a Spanish network. Spain is in the same Europe zone, so the terms don't change." },
    { label: "Local SIMs", value: "Portuguese prepaid SIMs need ID when you buy them." },
  ],
  networks: { intro: euNetworksIntro("Portugal"), rows: euRows("Portugal") },
  providers: {
    intro: providersIntro,
    notes: providerNotes("Portugal", { nomad: "MEO, Vodafone and Sonaecom", airalo: "NOS", klook: "MEO" }),
  },
  sections: [
    {
      id: "which-networks-include-portugal",
      heading: "Which UK networks include Portugal, and which charge",
      paragraphs: [
        "O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile let eligible plans use their UK allowance in Portugal at no extra charge. EE, Vodafone, Three, Sky Mobile and VOXI charge for each day you use your phone, or sell passes.",
        "For a week, those passes run from £12 on Three to £16.50 on EE. For a fortnight, Vodafone's 15-day pass at £21 is cheaper than paying daily. The worked costs below compare them with live eSIM prices.",
      ],
    },
    {
      id: "madeira-azores",
      heading: "Madeira and the Azores",
      paragraphs: [
        "Madeira and the Azores are autonomous regions of Portugal, and Portugal's national networks run there. UK networks' Europe roaming treats them as Portugal.",
        "A Portugal eSIM uses those same networks. If you're island-hopping in the Azores, download offline maps before you go, because coverage between villages and on hiking trails is thinner than in Lisbon or on the Algarve.",
      ],
    },
    {
      id: "roaming-caps",
      heading: "When included roaming isn't enough",
      paragraphs: [
        "Included roaming comes with a cap: 5GB on giffgaff, 12GB on SMARTY, 25GB on O2 and 30GB on iD Mobile, or your own allowance if that's smaller.",
        "At our everyday estimate of about 0.8GB a day, a fortnight needs around 12GB. Past giffgaff's cap it's 10p per MB, so for longer stays an eSIM with a larger allowance costs less.",
      ],
    },
  ],
  setup: setupSteps("Portugal", { checkPlanFirst: true }),
  faq: [
    {
      question: "Do UK phones work in Portugal without extra roaming charges?",
      answer: "On O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile, eligible plans use their UK allowance in Portugal at no extra cost, up to each network's cap. EE, Vodafone, Three, Sky Mobile and VOXI charge a daily fee or sell passes.",
    },
    {
      question: "Does roaming in Madeira and the Azores cost the same as mainland Portugal?",
      answer: "They're regions of Portugal, and UK networks' Europe roaming treats them as Portugal. Check an eSIM provider's coverage list names them before you rely on it there.",
    },
    {
      question: "What does EE charge for roaming in Portugal?",
      answer: "On plans taken out or upgraded from 7 July 2021, £2.72 for each day you use your phone, or £16.50 for 7 days and £30 for 15, using your UK allowance up to a 50GB fair-use ceiling.",
    },
    {
      question: "How much data do I need for a fortnight in Portugal?",
      answer: "At our everyday estimate of about 0.8GB a day, around 12GB. Light use, mostly maps and messages, needs about 5GB; heavy use with video or a hotspot, about 28GB.",
    },
    {
      question: "Will a Portugal eSIM give me a Portuguese phone number?",
      answer: "The plans compared here are data only, so there's no Portuguese number and no ordinary calls or texts. WhatsApp and FaceTime work over data, and your UK SIM can stay on for texts.",
    },
  ],
  related: ["spain", "france", "italy", "morocco", "germany"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
