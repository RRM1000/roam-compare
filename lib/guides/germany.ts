import { euNetworksIntro, euRows, providerNotes, providersIntro, setupSteps } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/** Germany guide. Checked 10 September 2026; UK network rows come from lib/guides/shared.ts. */
export const germanyGuide: DestinationGuide = {
  destination: "germany",
  keyword: "Germany eSIM",
  title: "Germany eSIM vs UK roaming: what it costs from the UK (2026)",
  description:
    "Germany is in every UK network's Europe zone, but only some include it. Compare live Germany eSIM prices with what UK networks charge to roam there.",
  verdict: {
    heading: "Short answer: check your UK plan first. If it charges a daily fee in Germany, an eSIM usually costs less.",
    body:
      "Germany is in every UK network's Europe zone. O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile include it on eligible plans, up to a roaming cap. EE, Vodafone, Three, Sky Mobile and VOXI charge a daily fee or sell passes. For a short city break the daily fees are small; for a longer trip, or a work trip with a lot of hotspot use, an eSIM bought before you travel is usually cheaper.",
  },
  facts: [
    { label: "Local networks", value: "Telekom, Vodafone, O2 Telefónica and 1&1. Nomad lists O2 and Vodafone, and Airalo and Klook both use O2." },
    { label: "Caps on included roaming", value: "O2 25GB, iD Mobile 30GB, SMARTY 12GB and giffgaff 5GB of your plan's data. Tesco Mobile sets no separate cap." },
    { label: "Local SIMs", value: "A German prepaid SIM needs an ID check before it works, often by video call or at a post office." },
    { label: "Trains", value: "Coverage on long-distance trains varies between regions, so download tickets and offline maps before you board." },
  ],
  networks: { intro: euNetworksIntro("Germany"), rows: euRows("Germany") },
  providers: {
    intro: providersIntro,
    notes: providerNotes("Germany", { nomad: "O2 and Vodafone", airalo: "O2", klook: "O2" }),
  },
  sections: [
    {
      id: "which-networks-include-germany",
      heading: "Which UK networks include Germany, and which charge",
      paragraphs: [
        "O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile let eligible plans use their UK allowance in Germany at no extra charge. EE, Vodafone, Three, Sky Mobile and VOXI charge for each day you use your phone, or sell passes.",
        "A three-day trade fair costs £8.16 on EE, £6 on Sky or £5 on a Three pass. Over a week the passes run from £12 to £16.50, which is where an eSIM usually wins. The worked costs below compare them with live eSIM prices.",
      ],
    },
    {
      id: "work-trips",
      heading: "Work trips and hotspot use",
      paragraphs: [
        "Tethering a laptop uses data far faster than a phone. At our heavy-use estimate of about 2GB a day, a working week needs around 14GB, which is past giffgaff's 5GB and SMARTY's 12GB roaming caps.",
        "The eSIMs compared here, apart from any plan that says otherwise, allow hotspot use. Check the hotspot and speed limits beside each plan in the comparison before you buy.",
      ],
    },
    {
      id: "local-sim",
      heading: "Why a German SIM takes longer to set up",
      paragraphs: [
        "German law requires an identity check before a prepaid SIM can be used. For visitors that usually means a video call with a passport or a check at a post office, which can take longer than the trip is worth.",
        "A travel eSIM is bought online and installed at home, so it's working when you land, and your UK number stays on the phone for bank texts.",
      ],
    },
  ],
  setup: setupSteps("Germany", { checkPlanFirst: true }),
  faq: [
    {
      question: "Do UK phones work in Germany without roaming charges?",
      answer: "On O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile, eligible plans use their UK allowance in Germany at no extra cost, up to each network's cap. EE, Vodafone, Three, Sky Mobile and VOXI charge a daily fee or sell passes.",
    },
    {
      question: "What does VOXI charge for roaming in Germany?",
      answer: "VOXI needs a European Roaming Pass: £2.60 for 1 day, £4.80 for 2, £15 for 8 or £20 for 15. You get your UK allowance or 20GB, whichever is smaller, and Endless social and video don't apply abroad.",
    },
    {
      question: "Why is buying a SIM card in Germany difficult?",
      answer: "German law requires an ID check, often by video call or at a post office, before a prepaid SIM works. The travel eSIMs compared here are bought online from the provider instead.",
    },
    {
      question: "Can I use a Germany eSIM as a hotspot for my laptop?",
      answer: "The eSIMs compared here generally allow hotspot use; check each plan's limits beside it in the comparison. Hotspot data on UK roaming counts towards your network's roaming cap.",
    },
    {
      question: "Will a Germany eSIM give me a German phone number?",
      answer: "The plans compared here are data only, so there's no German number and no ordinary calls or texts. WhatsApp, FaceTime and Teams work over data, and your UK SIM can stay on for texts.",
    },
  ],
  related: ["netherlands", "france", "italy", "spain", "ireland"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
