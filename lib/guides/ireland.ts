import type { DestinationGuide } from "./types.ts";

export const irelandGuide: DestinationGuide = {
  destination: "ireland",
  keyword: "Ireland eSIM",
  title: "Ireland eSIM vs UK roaming: best travel data options (2026)",
  description:
    "Visiting Ireland from the UK? Compare Ireland eSIM deals with UK network roaming policies. Learn why most UK networks treat the Republic of Ireland like home and when an eSIM is still useful.",
  verdict: {
    heading: "Short answer: most UK travellers do not need an eSIM for Ireland, as major UK networks include roaming with no surcharges.",
    body:
      "Because of the Common Travel Area and bilateral operator agreements, the Republic of Ireland is treated as a domestic or surcharge-free zone by nearly all major UK mobile providers—including EE, O2, Vodafone, Three, Sky Mobile, and Tesco Mobile. Most UK travellers can simply use their standard domestic minutes, texts, and data allowance as if they were in the UK. An Ireland eSIM is primarily valuable for heavy data users bumping against UK carrier fair-use roaming limits (such as giffgaff's 5GB cap or SMARTY's 12GB limit), or for travellers wanting high-speed data backup on Irish networks like Vodafone Ireland, Three, or Eir.",
  },
  facts: [
    {
      label: "Local networks",
      value: "Vodafone Ireland, Three Ireland, and Eir. Travel eSIM providers typically connect via Vodafone Ireland or Three.",
    },
    {
      label: "Common Travel Area",
      value: "Most UK networks exempt the Republic of Ireland from EU roaming daily surcharges, treating usage like domestic UK allowances.",
    },
    {
      label: "5G availability",
      value: "Widespread 5G coverage across Dublin, Cork, Galway, Limerick, Waterford, and main intercity motorway corridors.",
    },
    {
      label: "Emergency services",
      value: "Dial 999 or 112 for emergency services in Ireland. Both numbers connect free of charge from any active mobile phone.",
    },
    {
      label: "UK visitors",
      value: "Over 4.5 million visits from the UK to Ireland take place annually, making it one of the UK's most frequent travel corridors.",
    },
  ],
  networks: {
    intro:
      "Unlike continental Europe where many UK networks impose £2 to £2.75 daily roaming fees, Ireland enjoys special domestic-like status across most UK networks. Check your specific carrier terms below.",
    rows: [
      {
        network: "ee",
        scenario: "ee-europe-new",
        headline: "EE treats Ireland as domestic: included with no daily fee",
        detail: "While EE charges daily Europe fees in continental EU countries, the Republic of Ireland is included in your standard domestic UK allowance. No Roam Abroad pass or £2.72 daily fee is charged.",
      },
      {
        network: "o2",
        scenario: null,
        headline: "O2 Europe Zone: included at no extra cost (up to 25GB)",
        detail: "O2 includes roaming in Ireland as part of its Europe Zone. You can use your domestic minutes, texts, and data up to 25GB with zero daily surcharges.",
      },
      {
        network: "vodafone",
        scenario: null,
        headline: "Vodafone Zone A / Ireland: inclusive roaming on all plans",
        detail: "Vodafone includes the Republic of Ireland in Zone A (domestic/included). All Pay Monthly and SIM-only customers use their UK allowance in Ireland without daily charges or passes.",
      },
      {
        network: "three",
        scenario: null,
        headline: "Three Go Roam: included in Ireland with no daily fee",
        detail: "Three waives its standard £2/day Go Roam Europe fee for the Republic of Ireland. Roaming is free of charge up to a 12GB fair-use ceiling.",
      },
      {
        network: "id-mobile",
        scenario: null,
        headline: "iD Roam Free: inclusive roaming across Ireland (up to 30GB)",
        detail: "iD Mobile includes roaming in the Republic of Ireland with no extra charges, using your plan allowance up to 30GB.",
      },
      {
        network: "sky-mobile",
        scenario: null,
        headline: "Sky Mobile: inclusive roaming in the Republic of Ireland",
        detail: "Sky Mobile does not charge the £2/day Roaming Passport Plus fee for Ireland. Domestic allowances and piggybank data work seamlessly.",
      },
      {
        network: "giffgaff",
        scenario: null,
        headline: "EU roaming included: up to 5GB fair-use data limit",
        detail: "Giffgaff plans include roaming in Ireland up to 5GB per plan. If you need more data, buying an eSIM or starting your next goodybag early is recommended.",
      },
      {
        network: "smarty",
        scenario: null,
        headline: "Inclusive roaming: up to 12GB fair-use cap",
        detail: "SMARTY includes roaming in Ireland at no extra charge, subject to its standard 12GB EU roaming limit per billing cycle.",
      },
      {
        network: "voxi",
        scenario: null,
        headline: "Inclusive roaming in the Republic of Ireland",
        detail: "VOXI includes the Republic of Ireland in its domestic roaming list without requiring an EU Roaming Pass, subject to standard fair-use rules.",
      },
      {
        network: "tesco-mobile",
        scenario: null,
        headline: "Home From Home: included with standard UK allowances",
        detail: "Tesco Mobile allows full use of UK data, minutes, and texts in Ireland under its Home From Home policy with no surcharge.",
      },
    ],
  },
  providers: {
    intro:
      "For travellers who need high-capacity data beyond UK carrier caps or independent backup connectivity, four major eSIM providers offer competitive Ireland plans.",
    notes: [
      {
        provider: "Airalo",
        localNetwork: "Three Ireland",
        summary: "Airalo's 'Clover' eSIM runs on Three Ireland's robust 4G/5G network. Quick setup and reliable urban coverage in Dublin, Cork, and Galway.",
        watchOut: "Daily unlimited plans throttle to 1Mbps after 3GB per day; standard bundles provide full speeds throughout.",
      },
      {
        provider: "Klook",
        localNetwork: "Vodafone / Eir",
        summary: "Flexible short-term daily and multi-day data passes available on reliable Irish partner networks.",
        watchOut: "Delivered via digital QR voucher code; smartphone must be unlocked from carrier restrictions.",
      },
      {
        provider: "Nomad",
        localNetwork: "Three Ireland / Vodafone",
        summary: "Fast 5G and 4G connectivity powered by top-tier Irish networks. Straightforward tethering support for laptops and tablets.",
        watchOut: "Packages must be activated within 60 days of order. Prices converted from USD.",
      },
      {
        provider: "Saily",
        localNetwork: "Vodafone Ireland / Eir",
        summary: "Fixed pricing in GBP with strong multi-network roaming across Ireland. Ideal for tourists touring the Wild Atlantic Way or Dublin.",
        watchOut: "Line activates upon first network connection in Ireland; download profile before crossing the Irish Sea.",
      },
    ],
  },
  sections: [
    {
      id: "why-most-uk-travellers-roam-free-in-ireland",
      heading: "Why most UK travellers roam free in the Republic of Ireland",
      paragraphs: [
        "Following Brexit, several UK operators reintroduced daily roaming fees of £2 to £2.75 for travel within the European Union. However, the Republic of Ireland is treated as a major exception by almost every UK mobile network due to the Common Travel Area and strong historical telecommunications agreements.",
        "Major carriers—including EE, O2, Vodafone, Three, Sky Mobile, and Tesco Mobile—explicitly exclude the Republic of Ireland from their daily EU roaming charges. That means you can generally use your UK allowance of minutes, texts, and data just as you would in Belfast, Cardiff, Edinburgh, or London.",
      ],
    },
    {
      id: "crossing-the-border-from-northern-ireland",
      heading: "Crossing the border between Northern Ireland and the Republic",
      paragraphs: [
        "If you are driving between Northern Ireland and the Republic of Ireland (for example, taking the motorway between Belfast and Dublin), your phone will seamlessly hand off between UK and Irish network towers near the border.",
        "Because both jurisdictions are treated as inclusive roaming zones on primary UK operators, you will not receive surprise bill shock when crossing County Armagh into County Louth. However, ensure data roaming is switched on in your handset settings so data continues working smoothly after your phone connects to an Irish network.",
      ],
    },
    {
      id: "irish-mobile-networks-and-rural-coverage",
      heading: "Irish mobile networks: Vodafone Ireland, Three Ireland, and Eir",
      paragraphs: [
        "Ireland has three major mobile network operators: Vodafone Ireland, Three Ireland, and Eir. Vodafone Ireland historically maintains the strongest coverage across rugged rural areas such as Connemara, County Kerry, and coastal routes along the Wild Atlantic Way.",
        "Three Ireland and Eir have built out comprehensive 5G networks in urban centres including Dublin, Cork, Galway, Limerick, and Waterford. Most international travel eSIMs roam across Vodafone Ireland or Three Ireland, delivering fast download speeds for navigation and video streaming.",
      ],
    },
    {
      id: "when-an-ireland-esim-makes-sense",
      heading: "When buying an Ireland eSIM still makes financial sense",
      paragraphs: [
        "While standard UK roaming covers most travellers, an Ireland eSIM remains a smart choice in specific scenarios. First, if your UK provider imposes a restrictive fair-use roaming cap (such as giffgaff's 5GB limit), heavy data users or remote workers can quickly exhaust their allowance and face 10p/MB penalty fees.",
        "Second, if you run a business or need redundant internet connectivity while traveling along rural touring routes, having an independent eSIM on a different local Irish carrier guarantees backup signal if your UK SIM's roaming partner experiences a dead zone.",
      ],
    },
  ],
  setup: [
    {
      title: "Check your UK provider's roaming policy",
      body: "Confirm that your UK mobile plan includes the Republic of Ireland with no daily surcharge, and note your contract's fair-use data cap (usually 5GB to 25GB).",
    },
    {
      title: "Purchase an eSIM if you need extra data",
      body: "If your domestic allowance is small or you plan heavy hotspot use, choose a 5GB to 20GB Ireland eSIM and install the profile before your trip.",
    },
    {
      title: "Enable data roaming when entering Ireland",
      body: "Whether using your UK SIM or an eSIM, ensure 'Data Roaming' is turned on in your phone's cellular settings so it can connect to Irish networks.",
    },
    {
      title: "Keep UK line active for incoming calls and texts",
      body: "Leave your domestic UK SIM switched on to receive incoming phone calls and two-factor authentication banking texts at no charge while in Ireland.",
    },
  ],
  faq: [
    {
      question: "Do UK mobile networks charge for roaming in Ireland?",
      answer:
        "Almost all major UK networks (EE, O2, Vodafone, Three, Sky Mobile, and Tesco Mobile) include roaming in the Republic of Ireland at no extra charge, exempting it from daily EU roaming surcharges under Common Travel Area agreements.",
    },
    {
      question: "Will my UK phone work automatically when crossing into Ireland?",
      answer:
        "Yes, as long as 'Data Roaming' is enabled in your phone's cellular settings. Your phone will seamlessly connect to an Irish partner network like Vodafone Ireland, Three, or Eir.",
    },
    {
      question: "Why would I buy an Ireland eSIM if UK roaming is included?",
      answer:
        "An Ireland eSIM is ideal if your UK plan has a low fair-use cap (such as giffgaff's 5GB limit), if you need tethering for work, or if you want network redundancy on remote routes along the Wild Atlantic Way.",
    },
    {
      question: "Can I use mobile hotspot and tethering in Ireland with an eSIM?",
      answer:
        "Yes, travel eSIMs from Saily, Nomad, and Airalo support tethering on standard fixed-data packages, making it easy to share data with laptops and tablets.",
    },
    {
      question: "What emergency number should I call in Ireland?",
      answer:
        "You can dial either 999 or 112 in Ireland for emergency assistance (police/Gardaí, ambulance, fire, or coast guard). Both work free of charge on any mobile device.",
    },
  ],
  related: ["netherlands", "spain", "france", "germany", "united-states"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
