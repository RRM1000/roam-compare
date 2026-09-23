import { pricedDestinationIds } from "./catalog";
import { destinations } from "./destinations";
import { networkNames, pricedRoamingCoverage } from "./roaming";

export type FaqEntry = { question: string; answer: string };

/**
 * The FAQ, as plain strings, so the visible accordion and the FAQPage structured
 * data are generated from one source.
 *
 * Google requires structured data to match what the page actually shows. Keeping
 * two copies would drift the moment either is edited, and a mismatch is treated
 * as spam rather than as a mistake.
 */
export function getFaq(): FaqEntry[] {
  const destinationCount = destinations.length;
  const networkCount = Object.keys(networkNames).length;
  const pricedCount = pricedDestinationIds.length;
  const coverage = pricedRoamingCoverage();

  return [
    {
      question: "Do you work out what my own network would charge?",
      answer:
        `On EE, for all ${destinationCount} destinations. Across the other nine networks, for ${coverage.others} more network-and-destination combinations. ` +
        "Everywhere else we send you to your network’s own checker rather than invent a number — usually because the network has stopped publishing a rate, or prices it against your individual account. " +
        "Pick the tariff that applies to you and we work out the daily fees, the cheapest combination of passes, or the per-megabyte rate from your network’s published charges. " +
        "We only claim a saving when roaming would actually cover your whole trip and everything else you asked for.",
    },
    {
      question: "Are these prices live?",
      answer:
        "Saily’s and Nomad’s are — they come from each provider’s own feed and are marked “Live price”. Saily quotes real pounds; Nomad quotes US dollars, which we convert. " +
        "Airalo prices are checked by hand and carry the date we checked them. They are already in pounds, so they need no conversion. " +
        "Klook never shows a price here, because we cannot read one reliably; that link takes you to their own page.",
    },
    {
      question: "Why does one provider show several plans?",
      answer:
        "Because more than one can fit your trip — a bigger allowance, a longer run before it expires, or unlimited data. " +
        "We show each provider’s best few for your trip and tuck the rest — including any that cost more without giving you more — behind one “show more” button. Pin up to three to compare side by side.",
    },
    {
      question: "Where do I find hotspot and speed limits?",
      answer:
        "Open “Hotspot, speed & other limits” on any plan. It covers whether you can use the phone as a hotspot, what happens when you hit a speed cap, " +
        "what the fair-use rules are, when the plan starts counting down, and which local network you will be on. " +
        "If it says “check plan”, the provider’s own wording was not clear enough for us to promise you either way.",
    },
    {
      question: "Can I make normal calls on these?",
      answer:
        "Usually not. Most travel eSIMs give you data only — WhatsApp and FaceTime work, but your phone number does not. " +
        "If you need real calls and texts, answer “Yes” in the form and we will only recommend a plan that we have confirmed includes them.",
    },
    {
      question: "Will an eSIM work on my phone?",
      answer:
        "Search for your exact model and we will check it against manufacturer guidance. Two things we cannot check for you: " +
        "whether your phone is locked to a UK network, and which regional version you own — some models sold in certain countries have no eSIM at all. Confirm both before buying.",
    },
    {
      question: "How many destinations do you cover?",
      answer:
        `${destinationCount} destinations — ${destinations.map((destination) => destination.name).join(", ")} — and all ${networkCount} UK networks. ` +
        `Saily and Nomad price every destination live; ${pricedCount} of them also carry hand-checked Airalo prices.`,
    },
  ];
}

/** FAQPage structured data, built from the same entries the page renders. */
export function getFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: getFaq().map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
