import { euNetworksIntro, euRows, providerNotes, providersIntro, setupSteps } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/** Switzerland guide. Checked 23 September 2026; UK network rows come from lib/guides/shared.ts. */
export const switzerlandGuide: DestinationGuide = {
  destination: "switzerland",
  keyword: "Switzerland eSIM",
  title: "Switzerland eSIM vs UK roaming: the 2026 cost from the UK",
  description:
    "Switzerland is outside the EU but inside most UK networks' Europe zones, and giffgaff's EU roaming leaves it out. Compare EE, O2, Vodafone, Three and the rest with live Switzerland eSIM prices before you book the train.",
  verdict: {
    heading: "Short answer: check your UK plan, because Switzerland is the one European country some networks leave out.",
    body:
      "EE, O2, Vodafone, Three, VOXI and Tesco Mobile all put Switzerland in their Europe zone, so it costs the same as Spain or France on those networks. giffgaff's EU roaming excludes it, and we could not confirm it on iD Mobile, SMARTY or Sky, so on those four you should check before you travel rather than assume. If your network charges a daily fee, or leaves Switzerland out altogether, an eSIM bought before you fly is usually cheaper. The worked costs below price both.",
  },
  facts: [
    { label: "Local networks", value: "Swisscom, Sunrise and Salt. Nomad lists Salt and Sunrise, Airalo lists Sunrise, and Klook's Switzerland eSIM runs on Swisscom or Sunrise." },
    { label: "Not in the EU", value: "Switzerland is outside the EU and the EEA, so nothing obliges a UK network to include it. Most do anyway; giffgaff's EU list doesn't." },
    { label: "Trains and tunnels", value: "Coverage along the main lines is good, but long tunnels and side valleys drop out. Download tickets and maps before you set off." },
    { label: "Mountains", value: "Ski areas and high passes rely on Swisscom more than the other two. Check which network an eSIM uses if you're heading above the treeline." },
    { label: "Borders", value: "Near Basel, Geneva or Lugano your phone can hop onto a French, German or Italian network. Those are in the same Europe zone, so the terms don't change." },
  ],
  networks: {
    intro: euNetworksIntro("Switzerland"),
    rows: euRows(
      "Switzerland",
      { ee: "EE's own price guide lists Switzerland with the EU and EEA, so no rest-of-world pass is needed." },
      ["id-mobile", "sky-mobile", "giffgaff", "smarty"],
    ),
  },
  providers: {
    intro: providersIntro,
    notes: providerNotes("Switzerland", { nomad: "Salt and Sunrise", airalo: "Sunrise", klook: "Swisscom or Sunrise, by option" }),
  },
  sections: [
    {
      id: "europe-zone-but-not-eu",
      heading: "In the Europe zone, but not in the EU",
      paragraphs: [
        "UK networks build their own Europe zones, and most of them put Switzerland in alongside the EU countries. EE lists it with the EU and EEA in its price guide, O2 includes it in the Europe Zone, Vodafone counts it among the destinations its European passes cover, and Three, VOXI and Tesco Mobile list it too.",
        "giffgaff is the clear exception: Switzerland isn't on its EU roaming list, so your allowance doesn't travel there and you'd need one of its travel data add-ons instead. We couldn't confirm Switzerland on iD Mobile, SMARTY or Sky Mobile either, so treat those as unknown until you've checked your own account.",
      ],
    },
    {
      id: "trains-and-mountains",
      heading: "Trains, tunnels and mountain coverage",
      paragraphs: [
        "Swiss rail is where most visitors use their phones, and the main lines are well covered. Long base tunnels and the deeper valleys are not, so save your tickets offline rather than relying on a QR code loading as the inspector arrives.",
        "Higher up, coverage thins out. Swisscom has the widest reach in the mountains, and travel eSIMs usually ride on Salt or Sunrise, so if you're skiing or walking above the villages, expect gaps and download your maps first.",
      ],
    },
    {
      id: "local-sims",
      heading: "Why a local Swiss SIM rarely makes sense",
      paragraphs: [
        "Swiss prepaid SIMs must be registered with ID, and Switzerland is an expensive place to buy data: a tourist bundle typically costs several times what the same allowance costs on a travel eSIM.",
        "For a week or two, the realistic choice is between your UK network's Europe terms and an eSIM. The comparison above prices both for the trip you're actually taking.",
      ],
    },
  ],
  setup: setupSteps("Switzerland", { checkPlanFirst: true }),
  faq: [
    {
      question: "Is Switzerland included in UK Europe roaming?",
      answer: "On EE, O2, Vodafone, Three, VOXI and Tesco Mobile, yes: Switzerland sits in the same Europe zone as EU countries. giffgaff's EU roaming excludes it, and we couldn't confirm it on iD Mobile, SMARTY or Sky Mobile, so check those before you travel.",
    },
    {
      question: "Does giffgaff work in Switzerland?",
      answer: "Your phone will connect, but Switzerland isn't on giffgaff's EU roaming list, so your allowance doesn't cover it. Buy one of giffgaff's travel data add-ons before you use any data, or use an eSIM.",
    },
    {
      question: "What does EE charge for roaming in Switzerland?",
      answer: "EE's price guide lists Switzerland with the EU and EEA, so its Europe terms apply: on plans taken out or upgraded from 7 July 2021, £2.72 for each day you use your phone, or £16.50 for 7 days and £30 for 15.",
    },
    {
      question: "How much data do I need for a week in Switzerland?",
      answer: "At our everyday estimate of about 0.8GB a day, around 6GB. Mostly maps, tickets and messages needs about 3GB; heavy video or hotspot use, about 14GB.",
    },
    {
      question: "Will an eSIM work on Swiss trains and in the mountains?",
      answer: "On the main rail lines, yes. Travel eSIMs here usually run on Salt or Sunrise, which cover the cities and valleys well but thin out on high passes and in long tunnels, so download maps and tickets before you set off.",
    },
  ],
  related: ["france", "italy", "germany", "croatia", "poland"],
  writtenAt: "2026-09-23",
  updatedAt: "2026-09-23",
};
