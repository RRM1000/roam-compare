import { euRows, providerNotes, providersIntro, setupSteps } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/** Cyprus guide. Checked 10 September 2026; UK network rows come from lib/guides/shared.ts. */
export const cyprusGuide: DestinationGuide = {
  destination: "cyprus",
  keyword: "Cyprus eSIM",
  title: "Cyprus eSIM vs UK roaming: what it costs from the UK (2026)",
  description:
    "The Republic of Cyprus is in every UK network's Europe zone; Northern Cyprus isn't. Compare EE, O2, Vodafone, Three and the rest with live Cyprus eSIM prices, and avoid roaming onto northern networks near the Green Line.",
  verdict: {
    heading: "Short answer: your Europe roaming applies in the Republic of Cyprus, but not in the north.",
    body:
      "The Republic of Cyprus is in the EU, so UK networks treat it like the rest of their Europe zone: included on O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile, and charged daily or by pass on EE, Vodafone, Three, Sky Mobile and VOXI. Northern Cyprus runs on Turkish networks and isn't covered; O2 and giffgaff both exclude it. If you're staying near Nicosia or visiting the north, that border matters more than which eSIM you pick.",
  },
  facts: [
    { label: "Local networks", value: "Cyta, Epic and PrimeTel. Nomad lists Epic and PrimeTel, Airalo lists PrimeTel, and Klook's Cyprus eSIM names Cyta and Vodafone." },
    { label: "Northern Cyprus", value: "The north uses Turkish networks, Turkcell and KKTC Telsim. O2's Europe Zone and giffgaff's EU roaming both exclude it." },
    { label: "Near the Green Line", value: "In Nicosia and near the buffer zone, your phone can connect to a northern network without you crossing." },
    { label: "Caps on included roaming", value: "O2 25GB, iD Mobile 30GB, SMARTY 12GB and giffgaff 5GB of your plan's data. Tesco Mobile sets no separate cap." },
  ],
  networks: {
    intro:
      "The Republic of Cyprus is in every UK network's Europe zone, and every row below is priced for your trip in the calculator above. Northern Cyprus isn't in any of these zones.",
    rows: euRows("the Republic of Cyprus", { o2: "Northern Cyprus isn't in the Europe Zone.", giffgaff: "Northern Cyprus isn't on giffgaff's list." }),
  },
  providers: {
    intro: providersIntro,
    notes: providerNotes("Cyprus", { nomad: "Epic and PrimeTel", airalo: "PrimeTel", klook: "Cyta and Vodafone" }),
  },
  sections: [
    {
      id: "green-line",
      heading: "The Green Line: Republic of Cyprus and Northern Cyprus",
      paragraphs: [
        "Cyprus is divided by a UN buffer zone, the Green Line. The Republic of Cyprus in the south is an EU member and its networks, Cyta, Epic and PrimeTel, are covered by UK networks' Europe roaming.",
        "Northern Cyprus uses Turkish networks, Turkcell and KKTC Telsim. O2's Europe Zone and giffgaff's EU roaming both exclude it, so on a day trip north, or near the line, your phone can run up rest-of-world charges.",
      ],
    },
    {
      id: "avoiding-accidental-roaming",
      heading: "How to avoid roaming onto a northern network",
      paragraphs: [
        "In Nicosia and along the buffer zone, northern networks can reach across the line. A phone left on automatic network selection can connect to one while you're still in the south.",
        "Set network selection to manual and choose Cyta, Epic or PrimeTel. A Cyprus eSIM uses the Republic's networks, so don't assume it works in the north; check with the provider before you cross.",
      ],
    },
    {
      id: "which-networks-include-cyprus",
      heading: "Which UK networks include the Republic of Cyprus",
      paragraphs: [
        "O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile let eligible plans use their UK allowance in the Republic of Cyprus at no extra charge, up to each network's cap. EE, Vodafone, Three, Sky Mobile and VOXI charge daily or sell passes.",
        "For a week, those passes run from £12 on Three to £16.50 on EE. The worked costs below compare them with live eSIM prices.",
      ],
    },
  ],
  setup: setupSteps("the Republic of Cyprus", { checkPlanFirst: true, extra: [{ title: "Choose a southern network near the line", body: "In Nicosia or near the buffer zone, set network selection to manual and pick Cyta, Epic or PrimeTel." }] }),
  faq: [
    {
      question: "Is Cyprus included in UK networks' EU roaming?",
      answer: "The Republic of Cyprus is. O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile include it on eligible plans, and EE, Vodafone, Three, Sky Mobile and VOXI charge daily or by pass. Northern Cyprus isn't in any of these zones.",
    },
    {
      question: "Does my UK roaming work in Northern Cyprus?",
      answer: "Not under Europe roaming. Northern Cyprus uses Turkish networks, and O2 and giffgaff both exclude it. Check your network's charges for Northern Cyprus before you use data there.",
    },
    {
      question: "How can I avoid roaming charges near the Green Line?",
      answer: "Set your phone's network selection to manual and choose Cyta, Epic or PrimeTel, so it can't connect to a northern network while you're in the south.",
    },
    {
      question: "What does Vodafone charge in the Republic of Cyprus?",
      answer: "£2.75 a day if your plan doesn't include Europe, or a European Roaming pass: £16 for 8 days or £21 for 15.",
    },
    {
      question: "Will a Cyprus eSIM give me a Cypriot phone number?",
      answer: "The plans compared here are data only, so there's no local number and no ordinary calls or texts. WhatsApp and FaceTime work over data, and your UK SIM can stay on for texts.",
    },
  ],
  related: ["greece", "turkey", "spain", "portugal", "italy"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
