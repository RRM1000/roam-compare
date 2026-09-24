import { providerNotes, providersIntro, setupSteps, worldNetworksIntro, worldRow, worldRows } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/** United States guide. Checked 10 September 2026; UK network rows come from lib/guides/shared.ts. */
export const unitedStatesGuide: DestinationGuide = {
  destination: "united-states",
  keyword: "USA eSIM",
  title: "USA eSIM vs UK roaming: what it costs from the UK (2026)",
  description:
    "The US is outside every UK network's Europe zone. Compare live USA eSIM prices with UK roaming, and check the 3G shutdown and cruise catches first.",
  verdict: {
    heading: "Short answer: buy a USA eSIM before you fly, unless your plan already includes the US.",
    body:
      "The US is outside every UK network's Europe zone. Sky Mobile charges £2 a day to use your allowance, EE sells passes from £6 for 24 hours, O2 Travel is £7 a day at 2Mbps, and Three sells passes from £12.50 for 3 days. SMARTY charges 10p per MB and Tesco Mobile 1p. For a week or two, an eSIM with enough data for the trip usually costs less than the passes. The worked costs below show both.",
  },
  facts: [
    { label: "Local networks", value: "AT&T, T-Mobile and Verizon. Nomad and Airalo use T-Mobile, and Klook offers AT&T or Verizon options." },
    { label: "3G is gone", value: "All three networks have switched off 3G, so ordinary calls on US networks need a phone that supports 4G voice (VoLTE) roaming." },
    { label: "US iPhones", value: "iPhones sold in the US since the iPhone 14 have no SIM tray. UK models still have one, so you can keep your UK SIM in and add an eSIM." },
    { label: "Cruises", value: "Out of range of land, your phone can connect to the ship's own network, which neither UK roaming nor a travel eSIM covers." },
    { label: "Remote areas", value: "National parks and long rural roads have gaps on every network, so download offline maps before you set off." },
  ],
  networks: {
    intro: worldNetworksIntro("The US"),
    rows: worldRows("the US", {
      ee: worldRow.eeZone1(),
      o2: worldRow.o2Travel(),
      three: worldRow.threeWorld(),
      "id-mobile": worldRow.idRoamBeyond(),
      "sky-mobile": worldRow.skyPassport(),
      smarty: worldRow.smartyMeteredUs(),
      voxi: worldRow.voxiGlobal(),
      "tesco-mobile": worldRow.tescoMeteredUs(),
    }),
  },
  providers: {
    intro: providersIntro,
    notes: providerNotes("the US", { nomad: "T-Mobile", airalo: "T-Mobile", klook: "AT&T or Verizon, by option" }, { airaloDailyCapGb: 5, extra: { Airalo: "Its US range also includes plans with calls and texts." } }),
  },
  sections: [
    {
      id: "what-uk-networks-charge",
      heading: "What UK networks charge in the US",
      paragraphs: [
        "Every UK network treats the US as rest of world. The cheapest published option is Sky Mobile's Roaming Passport Plus at £2 a day, which uses your UK allowance up to 25GB. EE sells passes at £6 for 24 hours, £30 for 7 days and £50 for 15, and Three sells Go Roam Around the World passes from £12.50 for 3 days to £60 for 14.",
        "O2 Travel is £7 a day with unlimited data, but at 2Mbps, which is slow for video. SMARTY charges 10p per MB and Tesco Mobile 1p per MB, so on SMARTY a week of normal use would pass its £45 spend limit. The worked costs below compare each with live eSIM prices.",
      ],
    },
    {
      id: "3g-and-calling",
      heading: "The 3G shutdown and ordinary calls",
      paragraphs: [
        "AT&T, T-Mobile and Verizon have all switched off 3G. A UK phone roaming in the US can only make ordinary calls over 4G, which needs both the phone and your UK network to support VoLTE roaming.",
        "Data isn't affected, so WhatsApp, FaceTime and other app calls work on a travel eSIM as normal. If you need a US number for calls and texts, Airalo's US range includes plans with them.",
      ],
    },
    {
      id: "cruises",
      heading: "Cruises from US ports",
      paragraphs: [
        "Once a ship leaves port and is out of range of land, your phone can connect to the ship's own network. That's billed separately and isn't covered by UK roaming or a land-based US eSIM.",
        "Turn data roaming off on every line before you sail, and use the ship's Wi-Fi package if you need to stay connected.",
      ],
    },
  ],
  setup: setupSteps("the US"),
  faq: [
    {
      question: "Will my UK phone work in the United States?",
      answer: "For data, yes, if it's unlocked and supports eSIM. For ordinary calls it needs to support 4G voice (VoLTE) roaming, because all three US networks have switched off 3G.",
    },
    {
      question: "Do UK networks charge extra to roam in the USA?",
      answer: "Yes. Sky Mobile charges £2 a day, EE sells passes from £6 for 24 hours, O2 Travel is £7 a day at 2Mbps, and Three's passes start at £12.50 for 3 days. SMARTY and Tesco Mobile charge by the megabyte.",
    },
    {
      question: "Can I get a US phone number with an eSIM?",
      answer: "Most travel eSIMs are data only. Airalo's US range includes plans with calls and texts; check what's included before you buy.",
    },
    {
      question: "What happens to my phone on a cruise from the US?",
      answer: "Out of range of land, it can connect to the ship's own network, which UK roaming and travel eSIMs don't cover. Turn data roaming off before you sail and use the ship's Wi-Fi.",
    },
    {
      question: "Does WhatsApp work in the USA on an eSIM?",
      answer: "Yes. WhatsApp stays linked to your UK number and works over the eSIM's data, including calls.",
    },
  ],
  related: ["canada", "mexico", "japan", "united-arab-emirates"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
