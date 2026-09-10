import { providerNotes, providersIntro, setupSteps, worldNetworksIntro, worldRow, worldRows } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/** UAE guide. Checked 10 September 2026; UK network rows come from lib/guides/shared.ts. */
export const unitedArabEmiratesGuide: DestinationGuide = {
  destination: "united-arab-emirates",
  keyword: "UAE eSIM",
  title: "UAE eSIM vs UK roaming: Dubai & Abu Dhabi guide (2026)",
  description:
    "The UAE is outside every UK network's Europe zone. Compare live UAE eSIM prices with what EE, O2, Three, Sky and the rest charge in Dubai and Abu Dhabi, and know which calling apps work there.",
  verdict: {
    heading: "Short answer: buy a UAE eSIM before you fly, and don't count on WhatsApp or FaceTime calls.",
    body:
      "The UAE is outside every UK network's Europe zone. Sky Mobile charges £2 a day to use your allowance, EE sells passes from £6 for 24 hours, O2 Travel is £7 a day at 2Mbps, and Three sells Around the World Extra passes from £17.50 for 3 days. iD Mobile charges £9.60 per MB, VOXI 12p and Tesco Mobile £5, so on those networks keep data roaming off. Whichever you use, voice and video calls on WhatsApp and FaceTime generally don't connect on UAE networks; messages do.",
  },
  facts: [
    { label: "Local networks", value: "e&, formerly Etisalat, and du. Nomad lists du, and Airalo and Klook use Etisalat." },
    { label: "Calling apps", value: "The UAE's regulator restricts internet calling to licensed apps. WhatsApp and FaceTime calls generally don't connect, while messages, photos and voice notes work. Licensed apps such as BOTIM do." },
    { label: "Stopovers", value: "For a day or two in Dubai, EE's £6 day pass or Sky's £2 day may be simpler than an eSIM." },
  ],
  networks: {
    intro: worldNetworksIntro("The UAE"),
    rows: worldRows("the UAE", {
      ee: worldRow.eeZone1(),
      o2: worldRow.o2Travel(),
      three: worldRow.threeExtra(),
      "id-mobile": worldRow.idMeteredWorld(),
      "sky-mobile": worldRow.skyPassport(),
      voxi: worldRow.voxiMetered("The UAE"),
      "tesco-mobile": worldRow.tescoMeteredWorld(),
    }),
  },
  providers: {
    intro: providersIntro,
    notes: providerNotes("the UAE", { nomad: "du", airalo: "Etisalat", klook: "Etisalat" }, { airaloDailyCapGb: 3 }),
  },
  sections: [
    {
      id: "what-uk-networks-charge",
      heading: "What UK networks charge in the UAE",
      paragraphs: [
        "Every UK network treats the UAE as rest of world, and the gap between them is wide. Sky Mobile's £2 a day and EE's passes, from £6 for 24 hours to £50 for 15 days, use your UK allowance. O2 Travel is £7 a day at 2Mbps, and Three puts the UAE in its Around the World Extra zone, with passes from £17.50 for 3 days.",
        "On iD Mobile, VOXI and Tesco Mobile, data is charged by the megabyte: £9.60, 12p and £5. A few minutes of maps on iD costs more than a whole eSIM, so keep data roaming off on those lines.",
      ],
    },
    {
      id: "calling-apps",
      heading: "WhatsApp, FaceTime and licensed calling apps",
      paragraphs: [
        "The UAE restricts internet voice and video calling to apps licensed by its regulator. WhatsApp and FaceTime calls generally fail to connect on UAE mobile networks and most hotel Wi-Fi, while messages, photos and voice notes work normally.",
        "Licensed apps such as BOTIM are the local alternative, and ordinary calls over your UK SIM still work at your network's roaming rates. A travel eSIM connects through UAE networks, so the same restrictions apply to it.",
      ],
    },
    {
      id: "stopovers",
      heading: "Dubai and Abu Dhabi stopovers",
      paragraphs: [
        "For a stopover of a day or two, roaming can be the simpler choice: EE's 24-hour pass is £6 and Sky Mobile charges £2 for the day. Airport and hotel Wi-Fi is widely available.",
        "For a week or more, an eSIM usually costs less than any daily or pass option. The worked costs below price a week and a fortnight.",
      ],
    },
  ],
  setup: setupSteps("the UAE"),
  faq: [
    {
      question: "Can I make WhatsApp or FaceTime calls in Dubai?",
      answer: "Generally not. The UAE restricts internet calling to licensed apps, and WhatsApp and FaceTime calls usually don't connect. Messages, photos and voice notes work, and licensed apps such as BOTIM can make calls.",
    },
    {
      question: "What does iD Mobile charge for data in the UAE?",
      answer: "£9.60 per MB. At that rate, keep data roaming off on iD in the UAE and use Wi-Fi or an eSIM.",
    },
    {
      question: "Is roaming worth it for a Dubai stopover?",
      answer: "For a day or two it can be: EE's 24-hour pass is £6 and Sky Mobile charges £2 a day. For a week or more, an eSIM usually costs less.",
    },
    {
      question: "Does VOXI's Global Roaming Extra cover the UAE?",
      answer: "No. The UAE isn't on VOXI's Global Roaming Extra list, so data is charged at 12p per MB.",
    },
    {
      question: "Does a UAE travel eSIM include a local phone number?",
      answer: "The plans compared here are data only, so there's no UAE number. Your UK SIM can stay on for calls and bank texts.",
    },
  ],
  related: ["turkey", "egypt", "thailand", "japan", "united-states"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
