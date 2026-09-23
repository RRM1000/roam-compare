import { euNetworksIntro, euRows, providerNotes, providersIntro, setupSteps } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/** Croatia guide. Checked 23 September 2026; UK network rows come from lib/guides/shared.ts. */
export const croatiaGuide: DestinationGuide = {
  destination: "croatia",
  keyword: "Croatia eSIM",
  title: "Croatia eSIM vs UK roaming: what it costs from the UK (2026)",
  description:
    "Croatia is in every UK network's Europe zone, but the old coast road to Dubrovnik isn't. Compare EE, O2, Vodafone, Three and the rest with live Croatia eSIM prices for Split, Dubrovnik and the islands.",
  verdict: {
    heading: "Short answer: check your UK plan, and watch what your phone connects to on the drive south.",
    body:
      "Croatia is an EU country, so it's in every UK network's Europe zone. O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile include it on eligible plans, up to a roaming cap; EE, Vodafone, Three, Sky Mobile and VOXI charge a daily fee or sell passes. The catch here is geography rather than price: the old coast road to Dubrovnik crosses into Bosnia and Herzegovina, which is outside the Europe zone on every one of them. The worked costs below price a week and a fortnight both ways.",
  },
  facts: [
    { label: "Local networks", value: "A1, Hrvatski Telekom and Telemach. Nomad lists Telemach and A1, Airalo lists Telemach, and Klook's Croatia eSIM runs on A1." },
    { label: "Caps on included roaming", value: "O2 25GB, iD Mobile 30GB, SMARTY 12GB and giffgaff 5GB of your plan's data. Tesco Mobile sets no separate cap." },
    { label: "The Neum corridor", value: "The old coast road to Dubrovnik passes through a short stretch of Bosnian territory at Neum, where your phone can latch onto a Bosnian network at non-Europe rates." },
    { label: "The Pelješac Bridge", value: "Open since July 2022 and toll-free, it carries the main route past Neum without leaving Croatia. Most hire cars and coaches now use it." },
    { label: "Islands and ferries", value: "Hvar, Brač and Korčula are well covered in the towns, but mid-crossing on a ferry you may drop out or pick up only a distant mainland signal." },
  ],
  networks: { intro: euNetworksIntro("Croatia"), rows: euRows("Croatia") },
  providers: {
    intro: providersIntro,
    notes: providerNotes("Croatia", { nomad: "Telemach and A1", airalo: "Telemach", klook: "A1 HR" }),
  },
  sections: [
    {
      id: "which-networks-include-croatia",
      heading: "Which UK networks include Croatia, and which charge",
      paragraphs: [
        "O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile let eligible plans use their UK allowance in Croatia at no extra charge, up to each network's roaming cap. EE, Vodafone, Three, Sky Mobile and VOXI charge for each day you use your phone, or sell passes.",
        "For a week, the passes run from £12 on Three to £16.50 on EE, and Vodafone's 15-day pass at £21 covers a fortnight for less than paying £2.75 a day. The worked costs below compare each with live eSIM prices.",
      ],
    },
    {
      id: "neum-corridor",
      heading: "Neum, the Pelješac Bridge and a bill you didn't expect",
      paragraphs: [
        "Croatia's coast is split in two by a short stretch of Bosnia and Herzegovina at Neum. If you drive the old coast road to Dubrovnik you pass through it, and phones connect to a Bosnian network on the way. Bosnia is outside every UK network's Europe zone, and outside a Croatia-only eSIM, so data used there is charged at rest-of-world rates.",
        "Since July 2022 the Pelješac Bridge has carried the main route past Neum without leaving Croatia, and it's toll-free, so most hire cars and coaches now use it. If your route does go through Neum, turn data roaming off for that stretch, or check that your eSIM covers Bosnia before you set out.",
      ],
    },
    {
      id: "islands-and-ferries",
      heading: "Islands, ferries and the national parks",
      paragraphs: [
        "The main islands have good coverage in the towns and along the coast roads, and Croatian networks reach the popular national parks. Crossing on a ferry, expect the signal to come and go, and don't count on it to load a ticket you haven't already downloaded.",
        "If you're island-hopping, an eSIM with a single allowance for the whole trip is simpler than daily passes: you pay for the data you use rather than for each day you switch the phone on.",
      ],
    },
  ],
  setup: setupSteps("Croatia", {
    checkPlanFirst: true,
    extra: [
      {
        title: "Plan for the Bosnian stretch",
        body: "If your route to Dubrovnik goes through Neum rather than over the Pelješac Bridge, switch data roaming off for that stretch. Neither your Europe roaming nor a Croatia eSIM covers a Bosnian network.",
      },
    ],
  }),
  faq: [
    {
      question: "Is Croatia included in UK Europe roaming?",
      answer: "Yes. Croatia is an EU country and sits in every UK network's Europe zone. O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile include it on eligible plans up to a cap; EE, Vodafone, Three, Sky Mobile and VOXI charge a daily fee or sell passes.",
    },
    {
      question: "Will my phone roam onto a Bosnian network near Dubrovnik?",
      answer: "It can, if you take the old coast road through the Neum corridor. Bosnia is outside the Europe zone and outside a Croatia-only eSIM, so turn data roaming off there or take the toll-free Pelješac Bridge instead.",
    },
    {
      question: "What does O2 charge for roaming in Croatia?",
      answer: "Nothing extra on Pay Monthly plans: Croatia is in O2's Europe Zone, so you use your UK allowance, and past 25GB of data abroad you need to buy a Bolt On.",
    },
    {
      question: "How much data do I need for a week in Croatia?",
      answer: "At our everyday estimate of about 0.8GB a day, around 6GB. Light use, mostly maps and messages, needs about 3GB; heavy use with video or a hotspot, about 14GB.",
    },
    {
      question: "Do Croatia eSIMs cover the islands?",
      answer: "They run on Croatian networks such as Telemach and A1, which cover the main islands' towns and coast roads. Coverage thins on ferry crossings and in the hills, so download maps and tickets before you leave.",
    },
  ],
  related: ["italy", "greece", "switzerland", "poland", "turkey"],
  writtenAt: "2026-09-23",
  updatedAt: "2026-09-23",
};
