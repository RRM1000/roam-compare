import { euNetworksIntro, euRows, providerNotes, providersIntro, setupSteps } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/** Netherlands guide. Checked 10 September 2026; UK network rows come from lib/guides/shared.ts. */
export const netherlandsGuide: DestinationGuide = {
  destination: "netherlands",
  keyword: "Netherlands eSIM",
  title: "Netherlands eSIM vs UK roaming: 2026 costs from the UK",
  description:
    "The Netherlands is in every UK network's Europe zone, but only some include it. Compare live Netherlands eSIM prices with what UK roaming costs.",
  verdict: {
    heading: "Short answer: for a weekend, UK roaming is often fine. For a week or more on a network that charges, an eSIM costs less.",
    body:
      "The Netherlands is in every UK network's Europe zone. O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile include it on eligible plans, up to a roaming cap. EE, Vodafone, Three, Sky Mobile and VOXI charge a daily fee or sell passes. Two days in Amsterdam costs £5.44 on EE or £4 on Sky, so the saving from an eSIM is small on a short break and grows with every extra day.",
  },
  facts: [
    { label: "Local networks", value: "KPN, Vodafone and Odido, which used to be T-Mobile Netherlands. Nomad lists KPN and Vodafone, Airalo lists KPN, and Klook's eSIM names Vodafone and KPN." },
    { label: "Caps on included roaming", value: "O2 25GB, iD Mobile 30GB, SMARTY 12GB and giffgaff 5GB of your plan's data. Tesco Mobile sets no separate cap." },
    { label: "Public transport", value: "OVpay lets you tap in and out on Dutch trains, trams, buses and metros with a contactless bank card or phone wallet." },
    { label: "Emergency calls", value: "Dial 112." },
  ],
  networks: { intro: euNetworksIntro("The Netherlands"), rows: euRows("the Netherlands") },
  providers: {
    intro: providersIntro,
    notes: providerNotes("the Netherlands", { nomad: "KPN and Vodafone", airalo: "KPN", klook: "Vodafone and KPN" }),
  },
  sections: [
    {
      id: "weekend-or-week",
      heading: "Is an eSIM worth it for a weekend?",
      paragraphs: [
        "On a network that includes the Netherlands, a weekend costs nothing extra. On EE it's £2.72 a day and on Sky £2, so two days come to about £5. That's close to the price of a small eSIM, and roaming keeps everything on one line.",
        "Stay a week and it changes: the passes run from £12 on Three to £16.50 on EE, and at our everyday estimate of about 0.8GB a day you'll use around 6GB. The worked costs below show where an eSIM starts to save.",
      ],
    },
    {
      id: "which-networks-include-netherlands",
      heading: "Which UK networks include the Netherlands",
      paragraphs: [
        "O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile let eligible plans use their UK allowance in the Netherlands at no extra charge, up to caps of 5GB on giffgaff, 12GB on SMARTY, 25GB on O2 and 30GB on iD. EE, Vodafone, Three, Sky Mobile and VOXI charge daily or sell passes.",
      ],
    },
    {
      id: "getting-around",
      heading: "Getting around without a ticket app",
      paragraphs: [
        "OVpay means you can tap in and out on Dutch trains, trams, buses and metros with the contactless card or phone wallet you already use, without buying a ticket first. Data is still useful for journey planners such as the NS app and 9292, but you don't need it to pay.",
      ],
    },
  ],
  setup: setupSteps("the Netherlands", { checkPlanFirst: true }),
  faq: [
    {
      question: "Do I need an eSIM for the Netherlands if I have a UK phone contract?",
      answer: "Not if your network includes it and your cap covers the trip: O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile do. On EE, Vodafone, Three, Sky Mobile or VOXI you'll pay a daily fee or buy a pass, and for a week or more an eSIM usually costs less.",
    },
    {
      question: "What does roaming in Amsterdam cost for a weekend?",
      answer: "Nothing extra on networks that include the Netherlands. On EE it's £2.72 a day and on Sky £2 a day, so a two-day weekend costs about £5. Three's cheapest pass is £5 for 3 days.",
    },
    {
      question: "Can I pay for Dutch trains with my phone?",
      answer: "Yes. OVpay lets you tap in and out on trains, trams, buses and metros with a contactless bank card or phone wallet.",
    },
    {
      question: "What's the emergency number in the Netherlands?",
      answer: "112.",
    },
    {
      question: "Will a Netherlands eSIM give me a Dutch phone number?",
      answer: "The plans compared here are data only, so there's no Dutch number and no ordinary calls or texts. WhatsApp and FaceTime work over data, and your UK SIM can stay on for texts.",
    },
  ],
  related: ["germany", "france", "ireland", "spain", "italy"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
