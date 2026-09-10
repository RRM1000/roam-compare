import { providerNotes, providersIntro, setupSteps, worldNetworksIntro, worldRow, worldRows } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/** Indonesia guide. Checked 10 September 2026; UK network rows come from lib/guides/shared.ts. */
export const indonesiaGuide: DestinationGuide = {
  destination: "indonesia",
  keyword: "Indonesia eSIM",
  title: "Indonesia eSIM vs UK roaming: Bali & travel data guide (2026)",
  description:
    "Indonesia is outside every UK network's Europe zone. Compare live Indonesia eSIM prices with what EE, O2, Three and the rest charge, and understand the phone registration rule before you buy a local SIM in Bali.",
  verdict: {
    heading: "Short answer: buy an Indonesia eSIM before you fly. It also avoids the phone registration a local SIM involves on long stays.",
    body:
      "Indonesia is outside every UK network's Europe zone. EE sells passes from £6 for 24 hours, O2 Travel is £7 a day at 2Mbps, and Three sells Go Roam Around the World passes from £12.50 for 3 days. For a week or two in Bali, an eSIM with enough data usually costs less. A travel eSIM roams like a UK SIM, so Indonesia's phone registration rules for local SIMs don't apply to it.",
  },
  facts: [
    { label: "Local networks", value: "Telkomsel, Indosat Ooredoo Hutchison and XL. Nomad lists Telkomsel, and Airalo uses 3, part of Indosat Ooredoo Hutchison." },
    { label: "Phone registration", value: "Phones used with a local Indonesian SIM must be registered. Tourist SIMs register your phone for 90 days when you buy them; longer stays need registering at customs, and phones worth over US$500 are taxed." },
    { label: "Roaming is exempt", value: "Visitors roaming on a foreign SIM or travel eSIM don't need to register their phone with customs." },
    { label: "Getting around", value: "Grab and Gojek, the main ride and delivery apps, need data." },
  ],
  networks: {
    intro: worldNetworksIntro("Indonesia"),
    rows: worldRows("Indonesia", { ee: worldRow.eeZone1(), o2: worldRow.o2Travel(), three: worldRow.threeWorld() }),
  },
  providers: {
    intro: providersIntro,
    notes: providerNotes("Indonesia", { nomad: "Telkomsel", airalo: "3 (Indosat Ooredoo Hutchison)", klook: null }),
  },
  sections: [
    {
      id: "what-uk-networks-charge",
      heading: "What UK networks charge in Indonesia",
      paragraphs: [
        "EE puts Indonesia in Rest of World Zone 1, with passes at £6 for 24 hours, £30 for 7 days and £50 for 15. O2 Travel is £7 a day with unlimited data at 2Mbps, and Three sells Go Roam Around the World passes at £12.50 for 3 days, £30 for 7 and £60 for 14.",
        "A fortnight in Bali costs £50 to £98 on those. The worked costs below compare them with live eSIM prices.",
      ],
    },
    {
      id: "phone-registration",
      heading: "Indonesia's phone registration rule, and why an eSIM avoids it",
      paragraphs: [
        "Indonesia requires phones used on its networks with a local SIM to be registered by their IMEI number. If you buy a tourist SIM at the airport or an official shop, the seller registers your phone for 90 days. Stays longer than that need registering at customs, and phones worth more than US$500 are taxed on the excess.",
        "A UK SIM or a travel eSIM connects to Indonesian networks as a roaming visitor, and roaming phones don't need registering. For a normal holiday, an eSIM means no paperwork at all.",
      ],
    },
    {
      id: "getting-around-bali",
      heading: "Getting around Bali and the islands",
      paragraphs: [
        "Grab and Gojek are how most visitors get around Bali and order food, and both need data. WhatsApp is widely used by drivers, villas and tour operators.",
        "Coverage is strong in south Bali and Ubud. On smaller islands and on boats between them it's patchier, so download offline maps and ferry tickets before you set off.",
      ],
    },
  ],
  setup: setupSteps("Indonesia"),
  faq: [
    {
      question: "Do I need to register my phone's IMEI in Indonesia if I use an eSIM?",
      answer: "No. Roaming visitors on a foreign SIM or travel eSIM don't need to register. The rule applies to phones used with a local Indonesian SIM.",
    },
    {
      question: "What happens if I buy a tourist SIM in Bali?",
      answer: "The seller registers your phone for 90 days using your passport. For stays longer than 90 days, you need to register at customs, and phones worth over US$500 are taxed.",
    },
    {
      question: "Do UK networks charge for roaming in Indonesia?",
      answer: "Yes. EE's passes start at £6 for 24 hours, O2 Travel is £7 a day at 2Mbps, and Three's passes start at £12.50 for 3 days.",
    },
    {
      question: "Do Grab and Gojek work with a data-only eSIM?",
      answer: "Yes. Both work over any data connection, and your accounts can stay linked to your UK number.",
    },
    {
      question: "Does an Indonesia travel eSIM include a local number?",
      answer: "The plans compared here are data only, so there's no Indonesian number. WhatsApp works over data, and your UK SIM can stay on for texts.",
    },
  ],
  related: ["thailand", "japan", "australia", "united-arab-emirates", "turkey"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
