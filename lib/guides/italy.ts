import { euNetworksIntro, euRows, providerNotes, providersIntro, setupSteps } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/** Italy guide. Checked 10 September 2026; UK network rows come from lib/guides/shared.ts. */
export const italyGuide: DestinationGuide = {
  destination: "italy",
  keyword: "Italy eSIM",
  title: "Italy eSIM vs UK roaming: what it costs from the UK (2026)",
  description:
    "Italy is in every UK network's Europe zone, but only some include it. Compare EE, O2, Vodafone, Three and the rest with live Italy eSIM prices, and check San Marino, the Vatican and cruise ship roaming.",
  verdict: {
    heading: "Short answer: check your UK plan first. If it charges a daily fee in Italy, an eSIM usually costs less.",
    body:
      "Italy is in every UK network's Europe zone. O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile include it on eligible plans, up to a roaming cap. EE, Vodafone, Three, Sky Mobile and VOXI charge a daily fee or sell passes. If you're with one of those, or your cap won't cover the trip, an eSIM bought before you fly is usually the cheaper option. The worked costs below price a week and a fortnight.",
  },
  facts: [
    { label: "Local networks", value: "TIM, Vodafone, WindTre and Iliad. Nomad lists Iliad and WindTre, Airalo lists WindTre, and Klook's Italy eSIM runs on Vodafone." },
    { label: "Caps on included roaming", value: "O2 25GB, iD Mobile 30GB, SMARTY 12GB and giffgaff 5GB of your plan's data. Tesco Mobile sets no separate cap." },
    { label: "San Marino and the Vatican", value: "Neither is in the EU. O2 includes both in its Europe Zone; check other networks." },
    { label: "Cruises", value: "Out of range of land, your phone can connect to the ship's own network, which UK roaming allowances don't cover." },
    { label: "Local SIMs", value: "An Italian prepaid SIM needs your passport and an Italian tax code, which shops can generate for visitors." },
  ],
  networks: { intro: euNetworksIntro("Italy"), rows: euRows("Italy", { o2: "San Marino and Vatican City are in O2's Europe Zone too." }) },
  providers: {
    intro: providersIntro,
    notes: providerNotes("Italy", { nomad: "Iliad and WindTre", airalo: "WindTre", klook: "Vodafone" }),
  },
  sections: [
    {
      id: "which-networks-include-italy",
      heading: "Which UK networks include Italy, and which charge",
      paragraphs: [
        "O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile let eligible plans use their UK allowance in Italy at no extra charge. EE, Vodafone, Three, Sky Mobile and VOXI charge for each day you use your phone, or sell passes that bring the daily cost down.",
        "For a week, the passes run from £12 on Three to £16.50 on EE. Vodafone's £16 pass lasts 8 days and its £21 pass 15, so it's competitive on a fortnight. The worked example below prices each against live eSIM prices.",
      ],
    },
    {
      id: "san-marino-vatican-cruises",
      heading: "San Marino, the Vatican and cruise ships",
      paragraphs: [
        "San Marino and Vatican City are separate countries outside the EU. O2 includes both in its Europe Zone. Other networks treat them in different ways, so if you're staying in San Marino, check your network's list before you use data.",
        "On a Mediterranean cruise, your phone can connect to the ship's own network once you're out of range of land. That isn't covered by UK Europe roaming or an Italy eSIM. Turn data roaming off at sea and switch back in port.",
      ],
    },
    {
      id: "local-sim",
      heading: "Buying a SIM in Italy",
      paragraphs: [
        "Italian networks need your passport and a codice fiscale, the Italian tax code, before they'll activate a prepaid SIM. Shops can generate a code for visitors, but it adds time at the counter.",
        "An eSIM from the providers above is bought online and installed at home, so it's working when you land, and your UK number stays on the phone for bank texts.",
      ],
    },
  ],
  setup: setupSteps("Italy", { checkPlanFirst: true }),
  faq: [
    {
      question: "Do UK phones work in Italy without extra charges?",
      answer: "On O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile, eligible plans use their UK allowance in Italy at no extra cost, up to each network's cap. EE, Vodafone, Three, Sky Mobile and VOXI charge a daily fee or sell passes.",
    },
    {
      question: "What does Vodafone charge for roaming in Italy?",
      answer: "£2.75 a day if your plan doesn't include Europe, or a European Roaming pass: £16 for 8 days or £21 for 15, covering 52 destinations. Vodafone's 25GB roaming limit applies.",
    },
    {
      question: "Is San Marino covered by EU roaming?",
      answer: "San Marino isn't in the EU. O2 includes it, and Vatican City, in its Europe Zone. Check other networks, and the eSIM provider's coverage list, if you're staying there.",
    },
    {
      question: "Do I need a codice fiscale to use an eSIM in Italy?",
      answer: "Not for the travel eSIMs compared here, which you buy from the provider online. A local Italian prepaid SIM does need one, along with your passport.",
    },
    {
      question: "Will an Italy eSIM give me an Italian phone number?",
      answer: "The plans compared here are data only, so there's no Italian number and no ordinary calls or texts. WhatsApp and FaceTime work over data, and your UK SIM can stay on for texts.",
    },
  ],
  related: ["spain", "france", "greece", "germany", "portugal"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
