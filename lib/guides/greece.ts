import { euNetworksIntro, euRows, providerNotes, providersIntro, setupSteps } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/** Greece guide. Checked 10 September 2026; UK network rows come from lib/guides/shared.ts. */
export const greeceGuide: DestinationGuide = {
  destination: "greece",
  keyword: "Greece eSIM",
  title: "Greece eSIM vs UK roaming: what it costs from the UK (2026)",
  description:
    "Greece is in every UK network's Europe zone, but only some include it. Compare EE, O2, Vodafone, Three and the rest with live Greece eSIM prices, and avoid ferry roaming and the Turkish networks near the eastern islands.",
  verdict: {
    heading: "Short answer: check your UK plan first, and watch for Turkish networks on the eastern islands.",
    body:
      "Greece is in every UK network's Europe zone. O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile include it on eligible plans, up to a roaming cap. EE, Vodafone, Three, Sky Mobile and VOXI charge a daily fee or sell passes, so on those an eSIM bought before you fly is usually cheaper. On islands close to Turkey, such as Kos and Rhodes, your phone can connect to a Turkish network, and Turkey isn't in any UK network's Europe zone.",
  },
  facts: [
    { label: "Local networks", value: "Cosmote, Vodafone and Nova. Nomad lists Nova and Vodafone, Airalo lists Nova, and Klook's Greece eSIM names Nova and Vodafone." },
    { label: "Caps on included roaming", value: "O2 25GB, iD Mobile 30GB, SMARTY 12GB and giffgaff 5GB of your plan's data. Tesco Mobile sets no separate cap." },
    { label: "The eastern islands", value: "On Kos, Rhodes, Samos and Lesvos your phone can pick up Turkish networks across the water, which UK networks charge as Turkey." },
    { label: "Ferries", value: "Out of range of land, a ferry's phone can connect to the ship's own network, which UK roaming allowances don't cover." },
    { label: "Local SIMs", value: "Greek prepaid SIMs need ID to register." },
  ],
  networks: { intro: euNetworksIntro("Greece"), rows: euRows("Greece") },
  providers: {
    intro: providersIntro,
    notes: providerNotes("Greece", { nomad: "Nova and Vodafone", airalo: "Nova", klook: "Nova and Vodafone" }),
  },
  sections: [
    {
      id: "turkish-networks",
      heading: "Turkish networks on the eastern islands",
      paragraphs: [
        "Several Greek islands sit within a few miles of the Turkish coast. On Kos, Rhodes, Samos, Lesvos and their neighbours, a Turkish network's signal can be stronger than a Greek one, and a phone left on automatic network selection can connect to it without you leaving Greece.",
        "Turkey is outside every UK network's Europe zone, so that can mean rest-of-world charges on a Greek holiday. Set your phone to choose a Greek network manually, or keep data roaming off on your UK line and use a Greece eSIM, which connects to Greek networks only.",
      ],
    },
    {
      id: "ferries",
      heading: "Island-hopping and ferry roaming",
      paragraphs: [
        "Between islands, ferries stay in range of land masts for much of the crossing, but out in open water your phone can connect to the ship's own network. That isn't covered by UK Europe roaming or a Greece eSIM, and it's billed separately.",
        "Turn data roaming off on every line for longer crossings, or use airplane mode, and switch back when you're near port.",
      ],
    },
    {
      id: "which-networks-include-greece",
      heading: "Which UK networks include Greece",
      paragraphs: [
        "O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile let eligible plans use their UK allowance in Greece at no extra charge, up to caps of 5GB on giffgaff, 12GB on SMARTY, 25GB on O2 and 30GB on iD. EE, Vodafone, Three, Sky Mobile and VOXI charge daily or sell passes.",
        "A fortnight's island-hopping at our everyday estimate of about 0.8GB a day needs around 12GB, which is past giffgaff's cap. The worked costs below show when an eSIM is cheaper.",
      ],
    },
  ],
  setup: setupSteps("Greece", { checkPlanFirst: true, extra: [{ title: "Choose a Greek network on the eastern islands", body: "On islands near Turkey, set network selection to manual and pick a Greek network, so your phone can't drift onto a Turkish one." }] }),
  faq: [
    {
      question: "Do UK phones work in Greece without roaming charges?",
      answer: "On O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile, eligible plans use their UK allowance in Greece at no extra cost, up to each network's cap. EE, Vodafone, Three, Sky Mobile and VOXI charge a daily fee or sell passes.",
    },
    {
      question: "Why did my phone connect to a Turkish network in Kos?",
      answer: "Kos, Rhodes and other eastern islands are close enough to Turkey for its networks to reach them. Turkey is outside UK networks' Europe zones, so choose a Greek network manually or use a Greece eSIM with your UK line's data roaming off.",
    },
    {
      question: "Does roaming work on Greek ferries?",
      answer: "Near land, yes. In open water your phone can connect to the ship's own network, which isn't covered by UK roaming or an eSIM. Turn data roaming off for the crossing.",
    },
    {
      question: "What does Sky Mobile charge in Greece?",
      answer: "£2 on each day you call, text or use data abroad, using your UK allowance up to Sky's 25GB roaming cap.",
    },
    {
      question: "Will a Greece eSIM give me a Greek phone number?",
      answer: "The plans compared here are data only, so there's no Greek number and no ordinary calls or texts. WhatsApp and FaceTime work over data, and your UK SIM can stay on for texts.",
    },
  ],
  related: ["turkey", "cyprus", "italy", "spain", "france"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
