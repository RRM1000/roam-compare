import { providerNotes, providersIntro } from "./shared.ts";
import type { DestinationGuide } from "./types.ts";

/**
 * Ireland guide. Checked 10 September 2026. Unlike the other EU guides, Ireland
 * has its own scenarios in lib/roaming.ts, because EE, Vodafone, Three and SMARTY
 * all make an exception for it in their published terms.
 */
export const irelandGuide: DestinationGuide = {
  destination: "ireland",
  keyword: "Ireland eSIM",
  title: "Ireland eSIM vs UK roaming: do you need one? (2026)",
  description:
    "Several UK networks include Ireland outright, and the rest charge. Compare live Ireland eSIM prices with what your own network charges to roam there.",
  verdict: {
    heading: "Short answer: on most UK networks, you don't need an eSIM for the Republic of Ireland.",
    body:
      "EE, Vodafone and Three all include the Republic of Ireland, even though they charge elsewhere in Europe. O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile include it too, and SMARTY lifts its usual 12GB roaming cap there. VOXI doesn't need a roaming pass there either. An eSIM is mainly worth it if your plan's data is small, you're on giffgaff and need more than 5GB, or you're on Sky Mobile, whose Ireland terms we couldn't confirm.",
  },
  facts: [
    { label: "No daily charge", value: "EE, Vodafone, Three and VOXI, which charge elsewhere in Europe, all include the Republic of Ireland." },
    { label: "Caps", value: "giffgaff 5GB, Three 12GB, VOXI 20GB, O2 25GB and iD Mobile 30GB of your plan's data. SMARTY's 12GB roaming cap doesn't apply in Ireland." },
    { label: "Local networks", value: "Vodafone, Three and Eir. Nomad lists Three and Eir, and Airalo lists Three." },
    { label: "The border", value: "Near the border your phone can switch between UK and Irish networks. On the networks above, that doesn't change what you pay." },
    { label: "Emergency calls", value: "112 and 999 both work in the Republic of Ireland." },
  ],
  networks: {
    intro:
      "The Republic of Ireland is in every UK network's Europe zone, and several networks that charge elsewhere in Europe make an exception for it. Every priced row below links to the page that says so.",
    rows: [
      { network: "ee", scenario: "ee-ireland", headline: "Included: the Republic of Ireland uses your UK allowance", detail: "EE's roaming terms say calls, texts and data used in the Republic of Ireland come out of your UK allowance, without the daily charge EE applies elsewhere in Europe." },
      { network: "o2", scenario: "o2-europe", headline: "O2 Europe Zone: included, up to 25GB", detail: "Ireland is in O2's Europe Zone, so Pay Monthly plans use their UK allowance there. Past 25GB of data abroad, you need to buy a Bolt On." },
      { network: "vodafone", scenario: "vodafone-ireland", headline: "Included on every plan", detail: "Vodafone says all Pay monthly and Pay as you go plans already include the Republic of Ireland, along with the Isle of Man, Iceland and Norway." },
      { network: "three", scenario: "three-ireland", headline: "Included: no charge to unlock your allowance", detail: "Three doesn't charge to use your UK calls, texts and data in the Republic of Ireland. Its Ireland page lists up to 12GB of your plan's data." },
      { network: "id-mobile", scenario: "id-europe", headline: "iD Roam Free: included, up to 30GB", detail: "iD's published EU limit is 30GB for customers who joined on or after 21 June 2023. On a smaller plan, your own allowance is the limit." },
      { network: "sky-mobile", scenario: null, headline: "Check Sky's destination list for Ireland", detail: "Roaming Passport Plus costs £2 on each day you use it in the destinations Sky covers. We couldn't confirm whether Sky charges for the Republic of Ireland." },
      { network: "giffgaff", scenario: "giffgaff-europe", headline: "Included on eligible plans, up to 5GB", detail: "Ireland is on giffgaff's EU roaming list. Beyond 5GB of your plan's data, it's 10p per MB." },
      { network: "smarty", scenario: "smarty-ireland", headline: "Included, with no roaming cap", detail: "SMARTY's 12GB roaming limit doesn't apply in the Republic of Ireland, so you can use your full UK allowance." },
      { network: "voxi", scenario: "voxi-ireland", headline: "Included without a pass, up to 20GB", detail: "VOXI says you don't need a European Roaming Pass in the Republic of Ireland. You can use your plan's data or 20GB, whichever is less, plus unlimited minutes and texts." },
      { network: "tesco-mobile", scenario: "tesco-europe", headline: "Home From Home: included", detail: "Tesco Mobile lists the Republic of Ireland among its 48 Home From Home destinations, on pay monthly and pay as you go." },
    ],
  },
  providers: {
    intro: providersIntro,
    notes: providerNotes("Ireland", { nomad: "Three and Eir", airalo: "Three", klook: "Three" }),
  },
  sections: [
    {
      id: "why-ireland-is-different",
      heading: "Why Ireland is different from the rest of Europe",
      paragraphs: [
        "Most UK networks that brought back roaming charges for Europe made an exception for the Republic of Ireland. EE's roaming terms, Vodafone's roaming page and Three's Ireland page all say you can use your UK allowance there at no extra cost, and VOXI says you don't need its European Roaming Pass. SMARTY goes further and lifts its usual 12GB roaming cap.",
        "That makes the choice about data, not daily fees. If your UK plan has plenty of data, it will almost certainly cover a trip to Dublin or the west coast without an eSIM.",
      ],
    },
    {
      id: "when-an-esim-makes-sense",
      heading: "When an Ireland eSIM still makes sense",
      paragraphs: [
        "giffgaff includes Ireland but only up to 5GB of your plan's data, after which it's 10p per MB. At our everyday estimate of about 0.8GB a day, a week needs around 6GB, so a longer stay can pass that. A small eSIM is cheaper than paying by the megabyte.",
        "We couldn't confirm Sky Mobile's terms for Ireland. If you're on Sky, check the app before you use data, or use an eSIM and keep your UK line's data roaming off.",
      ],
    },
    {
      id: "crossing-the-border",
      heading: "Crossing the border from Northern Ireland",
      paragraphs: [
        "Near the border, your phone can switch between UK and Irish networks without you noticing. On the networks that include the Republic of Ireland, that makes no difference to your bill.",
        "Your UK SIM does need data roaming switched on to use an Irish network. If you're on a network whose Ireland terms you're unsure of, check before you turn it on.",
      ],
    },
  ],
  setup: [
    { title: "Check your plan's roaming cap", body: "Your network's app shows whether Ireland is included and how much of your data you can use there." },
    { title: "If it's included, turn on data roaming", body: "Your UK SIM needs data roaming switched on to use Irish networks. On the networks that include Ireland, that costs nothing extra." },
    { title: "If you need more data, add an eSIM", body: "Install it at home on Wi-Fi, set it as your data line when you arrive, and turn off data roaming on your UK line so the two don't compete." },
  ],
  faq: [
    {
      question: "Do UK networks charge for roaming in Ireland?",
      answer: "Most don't. EE, Vodafone, Three and VOXI include the Republic of Ireland even though they charge elsewhere in Europe, and O2, iD Mobile, giffgaff, SMARTY and Tesco Mobile include it as part of their Europe roaming. We couldn't confirm Sky Mobile.",
    },
    {
      question: "Does EE charge for roaming in the Republic of Ireland?",
      answer: "No. EE's roaming terms say calls, texts and data used in the Republic of Ireland come out of your UK allowance, unlike the daily charge it applies elsewhere in its Europe zone.",
    },
    {
      question: "Is there a data cap on roaming in Ireland?",
      answer: "It depends on the network: 5GB on giffgaff, 12GB on Three, 20GB on VOXI, 25GB on O2 and 30GB on iD Mobile. SMARTY's 12GB cap doesn't apply in Ireland, and Tesco Mobile sets no separate cap.",
    },
    {
      question: "Do I need to change anything on my phone in Ireland?",
      answer: "Turn on data roaming for your UK SIM, because it connects to Irish networks. On the networks that include Ireland, that doesn't cost extra.",
    },
    {
      question: "What's the emergency number in Ireland?",
      answer: "112 and 999 both work in the Republic of Ireland.",
    },
  ],
  related: ["netherlands", "spain", "france", "germany", "portugal"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
