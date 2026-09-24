import { providerNotes, providersIntro, setupSteps, worldNetworksIntro, worldRow, worldRows } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/** Japan guide. Checked 10 September 2026; UK network rows come from lib/guides/shared.ts. */
export const japanGuide: DestinationGuide = {
  destination: "japan",
  keyword: "Japan eSIM",
  title: "Japan eSIM vs UK roaming: what it costs from the UK (2026)",
  description:
    "Japan sits in EE's dearest roaming band. Compare live Japan eSIM prices with what UK networks charge, and weigh them against pocket Wi-Fi hire.",
  verdict: {
    heading: "Short answer: buy a Japan eSIM before you fly. UK roaming there is expensive, slow or both.",
    body:
      "Japan is outside every UK network's Europe zone. EE charges £8 a day with 500MB of data, O2 Travel is £7 a day at 2Mbps, Three sells Around the World Extra passes from £17.50 for 3 days, iD Mobile sells Roam Beyond passes, and VOXI sells 8- and 15-day passes with 2GB or 4GB. Sky Mobile doesn't list Japan. For a week or two, an eSIM with enough data usually costs less than any of these, and it's simpler than renting pocket Wi-Fi.",
  },
  facts: [
    { label: "Local networks", value: "NTT docomo, au (KDDI), SoftBank and Rakuten. Nomad lists au and SoftBank, Airalo uses SoftBank, and Klook offers SoftBank or docomo options." },
    { label: "EE's allowance", value: "EE's Japan pass gives 500MB a day, which maps and photos can use up by lunchtime." },
    { label: "Pocket Wi-Fi", value: "Rental routers need collecting, charging and returning. An eSIM lives on your phone." },
    { label: "Transit cards", value: "Suica, PASMO and ICOCA work in Apple Wallet, independently of your data plan." },
  ],
  networks: {
    intro: worldNetworksIntro("Japan"),
    rows: worldRows("Japan", {
      ee: worldRow.eeZone3(),
      o2: worldRow.o2Travel(),
      three: worldRow.threeExtra(),
      "id-mobile": worldRow.idRoamBeyond(),
      "sky-mobile": worldRow.skyNotListed("Japan"),
      voxi: worldRow.voxiGlobal(),
      "tesco-mobile": worldRow.tescoMeteredWorld(),
    }),
  },
  providers: {
    intro: providersIntro,
    notes: providerNotes("Japan", { nomad: "au and SoftBank", airalo: "SoftBank", klook: "SoftBank or docomo, by option" }, { airaloDailyCapGb: 3 }),
  },
  sections: [
    {
      id: "what-uk-networks-charge",
      heading: "What UK networks charge in Japan",
      paragraphs: [
        "Every UK network treats Japan as rest of world, and most of the options come with a catch. EE's £8 day pass includes only 500MB of data. O2 Travel's unlimited data is capped at 2Mbps. Three's Around the World Extra passes cost £42 for a week and cap your data at 12GB with no hotspot.",
        "iD Mobile's Roam Beyond passes, from £5 for a day with 2GB to £35 for 10 days with 20GB, are the most generous, and VOXI's Global Roaming Extra gives 2GB for 8 days. Sky Mobile doesn't list Japan, and Tesco Mobile charges £5 per MB.",
      ],
    },
    {
      id: "esim-vs-pocket-wifi",
      heading: "eSIM or pocket Wi-Fi?",
      paragraphs: [
        "Renting a pocket Wi-Fi router used to be the standard advice for Japan. It still works, and one router can share data between several people, but it has to be collected and returned, charged every night, and carried everywhere.",
        "An eSIM lives on your phone and is working when you land. For one or two people it's usually cheaper and simpler; for a family sharing one connection, a router can still make sense.",
      ],
    },
    {
      id: "getting-around",
      heading: "Getting around: transit cards and translation",
      paragraphs: [
        "Suica, PASMO and ICOCA transit cards can be added to Apple Wallet and tapped at ticket gates without using data. Data is what makes the rest easy: route planning in Google Maps, and camera translation for menus and signs.",
      ],
    },
  ],
  setup: setupSteps("Japan"),
  faq: [
    {
      question: "Is an eSIM better than pocket Wi-Fi in Japan?",
      answer: "For one or two people, usually. An eSIM needs no collecting, returning or charging. A pocket Wi-Fi router can still make sense for a family sharing one connection.",
    },
    {
      question: "What does EE charge in Japan?",
      answer: "£8 for each 24 hours, including 500MB of data and unlimited minutes and texts. The data is per day, not one pot for the trip.",
    },
    {
      question: "Can I use Suica or PASMO with a Japan eSIM?",
      answer: "Yes. Transit cards in Apple Wallet work independently of your data plan, so they work alongside any eSIM.",
    },
    {
      question: "Does Sky Mobile's Roaming Passport Plus work in Japan?",
      answer: "Sky doesn't list Japan in its roaming directory. Keep data roaming off on your Sky line and use an eSIM or Wi-Fi.",
    },
    {
      question: "Does a Japan travel eSIM come with a Japanese phone number?",
      answer: "The plans compared here are data only, so there's no Japanese number. WhatsApp, FaceTime and LINE work over data, and your UK SIM can stay on for texts.",
    },
  ],
  related: ["thailand", "indonesia", "australia", "united-states", "united-arab-emirates"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
