import type { DestinationGuide } from "./types.ts";

/**
 * Turkey guide. Written 10 September 2026 against the sources listed at the
 * bottom; every paragraph names the sources it leans on. UK network prices are
 * not repeated here — the rows point at scenarios in lib/roaming.ts so the
 * guide, the calculator and the source register can never disagree.
 */
export const turkeyGuide: DestinationGuide = {
  destination: "turkey",
  keyword: "Turkey eSIM",
  title: "Turkey eSIM vs UK roaming: what it costs from the UK (2026)",
  description:
    "Turkey is outside every UK network's Europe zone, so roaming costs extra on all of them. Compare live Turkey eSIM prices with what EE, O2, Vodafone, Three and the rest charge, and read the catches — including the block on buying an eSIM once you land.",
  verdict: {
    heading: "Short answer: buy a Turkey eSIM before you fly, unless your plan already includes Turkey.",
    body:
      "Turkey is not in the EU, and no UK network treats it as Europe. EE, O2, Three, iD Mobile and Sky Mobile all charge a daily fee or sell a pass; Vodafone, VOXI and giffgaff price it against your own account. For a week of everyday use, a Turkey eSIM from the providers below costs less than most of those passes, and often less than two days of roaming. The one thing that catches people out: since July 2025 the websites and apps of most international eSIM sellers are blocked inside Turkey, so you have to buy and install before you arrive.",
    sourceIds: ["o2-travel", "three-turkey", "holafly-ban", "findyouresim-ban"],
  },
  facts: [
    { label: "Local networks", value: "Turkcell, Vodafone Türkiye and Türk Telekom. Airalo, Nomad and Klook all land on Türk Telekom; Saily uses local partner networks.", sourceIds: ["airalo-turkey", "nomad-turkey", "klook-turkey"] },
    { label: "5G", value: "Switched on at the start of April 2026 in all 81 provincial centres, with nationwide coverage due by April 2028. Whether a travel eSIM gets 5G depends on the provider: Nomad lists 4G/5G for Turkey, Airalo does not mention it.", sourceIds: ["developing-telecoms-5g", "daily-sabah-5g", "nomad-turkey", "airalo-turkey"] },
    { label: "Buying in the country", value: "Blocked for most international eSIM sellers since July 2025, including Airalo, Saily, Nomad and Holafly. An eSIM installed before arrival keeps working.", sourceIds: ["holafly-ban", "findyouresim-ban"] },
    { label: "Phone registration", value: "A phone brought from abroad can be used on a Turkish SIM for 120 days, after which it must be registered — the 2026 fee is ₺54,258. Roaming on a UK SIM or a travel eSIM is not a Turkish subscription, and short trips are unaffected.", sourceIds: ["turkiye-today-imei", "simology-imei"] },
    { label: "Airport SIM cards", value: "Sold with a passport check at Istanbul Airport. Checked September 2026: Türk Telekom 20GB for ₺1,935, Turkcell 25GB for ₺2,550, Vodafone 20GB for ₺3,200 — all costing more than a comparable eSIM bought at home.", sourceIds: ["traveltomtom-airport"] },
    { label: "Airport Wi-Fi", value: "Istanbul Airport gives one free hour, via kiosks that take a passport scan or an SMS code. Enough to install an eSIM you have already bought, not enough to rely on.", sourceIds: ["roamless-wifi"] },
    { label: "UK visitors", value: "4.24 million visits from the UK in 2025, down from 4.43 million in 2024, out of nearly 64 million international arrivals.", sourceIds: ["travel-weekly-visits"] },
  ],
  networks: {
    intro:
      "Turkey sits in every UK network's rest-of-world tier. Where a network publishes a charge, the row below links to the page we read it on and the calculator above prices it for your trip. Where a network prices Turkey against your individual account, we say so rather than guess.",
    rows: [
      { network: "ee", scenario: "ee-current", headline: "Rest of World Zone 1 pass: £6 for 24 hours, £30 for 7 days, £50 for 15 days", detail: "Uses your UK allowance abroad, up to a 50GB fair-use ceiling. Some Full Works plans include this zone already; check the EE app before buying a pass.", sourceIds: [] },
      { network: "o2", scenario: "o2-travel", headline: "O2 Travel: £7 on each day you use it", detail: "Unlimited data, minutes and texts, but speeds are capped at 2Mbps — fine for maps and messaging, slow for video. Ultimate plans include O2 Travel.", sourceIds: ["o2-travel"] },
      { network: "vodafone", scenario: null, headline: "Global Roam Zone C: included on plans with roaming, otherwise a daily charge Vodafone shows against your number", detail: "Turkey is one of Vodafone's 84 Global Roam destinations. A 25GB roaming cap applies. Vodafone's charge checker prices it for your plan; we do not quote a flat rate because Vodafone's public pages no longer print one.", sourceIds: ["vodafone-global-roaming"] },
      { network: "three", scenario: "three-extra-pass-turkey", headline: "Go Roam Around the World Extra: £7 a day (£8 if you joined from 18 December 2025), or a pass from £17.50", detail: "Passes cost £17.50 for 3 days, £29.75 for 5, £42 for 7 and £84 for 14. Data is capped at 12GB abroad and hotspot use is not allowed. Charged per calendar day in Turkish time, so a late-night connection costs a full day.", sourceIds: ["three-turkey"] },
      { network: "id-mobile", scenario: "id-roam-beyond", headline: "Roam Beyond passes: £5 for 1 day and 2GB, £20 for 5 days and 10GB, £35 for 10 days and 20GB", detail: "Data only — ordinary calls and texts cost extra. The pass starts the moment you buy it.", sourceIds: [] },
      { network: "sky-mobile", scenario: "sky-passport", headline: "Roaming Passport Plus: £2 for each 24 hours you activate", detail: "Uses your UK allowance, capped at 25GB a billing period. The cheapest published daily rate on any UK network for Turkey, if your phone supports VoLTE.", sourceIds: [] },
      { network: "giffgaff", scenario: null, headline: "Travel data add-ons: 1GB, 5GB or 10GB, valid 30 days, priced in the app", detail: "Türkiye is one of 24 non-EU destinations where giffgaff sells a fixed-price data add-on. Without one, standard rest-of-world rates apply per megabyte, so buy the add-on before you use any data.", sourceIds: ["giffgaff-turkiye"] },
      { network: "smarty", scenario: "smarty-metered", headline: "Standard rate: 10p per megabyte, from an out-of-plan balance", detail: "That is roughly £100 a gigabyte, and the default £45 worldwide spend limit will cut you off long before a week of maps and photos. Treat SMARTY as Wi-Fi-and-eSIM only in Turkey.", sourceIds: [] },
      { network: "voxi", scenario: null, headline: "Global Roaming Extra lists Turkey; the pass price is shown in My VOXI", detail: "VOXI's public help pages list Turkey under Global Roaming Extra but quote the live price only inside the app, so we do not print one.", sourceIds: [] },
      { network: "tesco-mobile", scenario: "tesco-payg", headline: "Pay as you go: £5 a megabyte. Pay monthly: check your tariff", detail: "The published Region 2 PAYG data rate makes any real use unaffordable. Pay-monthly charges and safety buffers depend on your plan, so check before you rely on it.", sourceIds: [] },
    ],
  },
  providers: {
    intro:
      "Four providers appear in the comparison above. Saily and Nomad send us live prices; Airalo prices are checked by hand and dated; Klook shows its prices only on its own page. The links here are the same ones the comparison uses, so the ones we earn a commission on are marked as sponsored in the page source.",
    notes: [
      { provider: "Saily", localNetwork: "Local partner networks", summary: "Quotes real pounds, so the price you see is the price you pay. Saily's site is among those blocked inside Turkey, which is another reason to install at home.", watchOut: "Saily was named in the July 2025 block list. Buy, install and note the plan's start rule before you travel.", sourceIds: ["holafly-ban", "findyouresim-ban"] },
      { provider: "Nomad", localNetwork: "Türk Telekom (Avea)", summary: "Prices in US dollars, which we convert at a rounded Bank of England rate; expect your card to charge a little more. Lists 4G/5G and allows hotspot use in Turkey.", watchOut: "Also on the block list. Nomad plans must be activated within 60 days of purchase, so do not buy months ahead.", sourceIds: ["nomad-turkey", "holafly-ban"] },
      { provider: "Airalo", localNetwork: "Türk Telekom (Avea)", summary: "We have no affiliate relationship with Airalo and list it anyway. Its Turkey range runs from short 1GB plans to unlimited plans that slow to 1Mbps after 3GB a day.", watchOut: "Blocked inside Turkey as well. Its Turkey page does not mention 5G.", sourceIds: ["airalo-turkey", "holafly-ban"] },
      { provider: "Klook", localNetwork: "Türk Telekom", summary: "Sells daily-allowance plans (1GB or 2GB a day, or unlimited with a 15GB daily full-speed cap) for 1 to 30 days on Türk Telekom. We never show a Klook price because it changes with every combination; the link opens Klook's own page.", watchOut: "You receive a QR code on a voucher. Install it on Wi-Fi before departure and check on the voucher when the countdown starts.", sourceIds: ["klook-turkey"] },
    ],
  },
  sections: [
    {
      id: "why-turkey-costs-extra",
      heading: "Why Turkey costs extra on every UK network",
      paragraphs: [
        "Britons make more than four million visits to Turkey a year, and a lot of them expect the roaming that worked in Spain or Greece to carry over. It does not. Turkey is outside the EU, so it sits outside the Europe zones that UK networks either include or price at a couple of pounds a day. Every network puts it in a rest-of-world tier instead.",
        "What that tier costs varies more than most people expect. Sky Mobile charges £2 a day and lets you use your normal allowance. O2 charges £7 a day and caps speed at 2Mbps. Three charges £7 or £8 a day, or sells passes, with a 12GB limit and no hotspot. EE sells passes from £6 for 24 hours. SMARTY and Tesco Mobile pay-as-you-go charge per megabyte at rates that make a week's normal use cost hundreds of pounds. The table below has the detail and the source for each.",
      ],
      sourceIds: ["travel-weekly-visits", "o2-travel", "three-turkey"],
    },
    {
      id: "esim-block",
      heading: "You cannot buy most travel eSIMs once you are in Turkey",
      paragraphs: [
        "In July 2025 Turkey's telecoms regulator, the BTK, blocked access from inside the country to the websites and apps of a list of international eSIM sellers. The first list named Airalo, Saily, Holafly, Nomad, Instabridge, Mobimatter, Alosim and BNESIM, and trade coverage since has counted many more. Three of the four providers we compare are on it.",
        "The block stops new purchases and, in practice, top-ups from inside Turkey. It does not stop an eSIM that is already installed from connecting: the plan roams onto a Turkish network the same way a UK SIM does. So the rule for Turkey is simple. Buy at home, install on Wi-Fi at home, and if you think you might run out, buy a bigger plan rather than planning to top up in Bodrum.",
        "If you do land without one, Istanbul Airport's free hour of Wi-Fi is enough to install a plan you bought earlier. It is not a reliable way to buy one, because the seller's site may not load.",
      ],
      sourceIds: ["holafly-ban", "findyouresim-ban", "roamless-wifi"],
    },
    {
      id: "five-g-and-coverage",
      heading: "Coverage, 5G and which local network you will be on",
      paragraphs: [
        "Turkey has three networks: Turkcell, Vodafone Türkiye and Türk Telekom. All three switched on 5G at the start of April 2026, in every one of the country's 81 provincial centres at once, after buying spectrum in October 2025. The licence obliges them to cover the whole country by April 2028, so in 2026 expect 5G in city centres and along the coast, and 4G everywhere else — which is fast enough for everything a holiday needs.",
        "Airalo, Nomad and Klook all put you on Türk Telekom; Saily's feed describes its network as local partners. Whether you get 5G on a travel eSIM depends on the provider's roaming agreement rather than the local network: Nomad lists 4G/5G for Turkey, Airalo's Turkey page does not mention 5G at all. If 5G matters to you, tick “5G listed” in the comparison above and only plans that state it will remain.",
      ],
      sourceIds: ["developing-telecoms-5g", "daily-sabah-5g", "nomad-turkey", "airalo-turkey", "klook-turkey"],
    },
    {
      id: "imei",
      heading: "The IMEI registration rule, and why a week's holiday does not trigger it",
      paragraphs: [
        "Turkey requires phones brought in from abroad to be registered if they are used on a Turkish SIM for more than 120 days in a year. The registration fee is set annually and for 2026 is ₺54,258, about $1,260 or roughly £920 — it is designed to stop grey imports, not to catch tourists.",
        "The clock starts when the phone first connects with a Turkish SIM card. A UK SIM roaming in Turkey, or a travel eSIM roaming in the same way, is not a Turkish subscription, and reports of travellers on eSIMs being cut off are rare. For a fortnight on the coast this rule is background noise. It matters if you are staying for months and want a local Turkcell or Vodafone SIM, in which case budget for the fee or plan to swap phones.",
      ],
      sourceIds: ["turkiye-today-imei", "simology-imei"],
    },
    {
      id: "local-sim",
      heading: "Should you just buy a Turkish SIM at the airport?",
      paragraphs: [
        "You can, and you will need your passport to do it. At Istanbul Airport in September 2026 the official counters wanted ₺1,935 for a 20GB Türk Telekom data SIM, ₺2,550 for 25GB on Turkcell and ₺3,200 for 20GB with minutes on Vodafone. City-centre shops are cheaper than the airport, but the queue, the paperwork and the fact that you cannot install it before you land all count against it.",
        "The travel eSIMs above give you 10GB to 20GB for a week or a month for less than half of those figures, keep your UK number live for banking texts, and are already working when the plane doors open. A local SIM only wins if you need a Turkish phone number for local calls, or you are staying long enough to burn through a very large allowance.",
      ],
      sourceIds: ["traveltomtom-airport"],
    },
    {
      id: "apps-and-blocks",
      heading: "WhatsApp, VPNs and the occasional social media blackout",
      paragraphs: [
        "WhatsApp, FaceTime and Google Maps all work normally in Turkey on mobile data. What Turkey does do is switch off access to social media platforms for short periods around political events — X, WhatsApp and YouTube have all gone dark for around a day at a time — and restrict a long list of consumer VPN services. Do not build your trip around a VPN working, and download offline maps of the places you are going before you leave.",
        "None of this changes the eSIM decision. A travel eSIM connects to the same Turkish networks a roaming UK SIM does, so both see the same blocks when they happen.",
      ],
      sourceIds: ["techradar-blackout"],
    },
  ],
  setup: [
    { title: "Buy and install at home", body: "Every provider here lets you install now and start the plan later. Install on home Wi-Fi, keep the line switched off, and screenshot the QR code or the manual setup details in case you need to reinstall." },
    { title: "Turn off data roaming on your UK line", body: "Leave the UK SIM enabled so banking codes and calls still arrive, but switch its data roaming off. With it on, your phone can quietly use the UK line and trigger a day's charge." },
    { title: "Make the eSIM your data line before landing", body: "Set the Turkey eSIM as the mobile-data line and turn off data switching. Turn it on in airplane mode as you land and it should register with Türk Telekom or a partner within a minute or two." },
    { title: "Size the plan for the whole trip", body: "You may not be able to top up from inside Turkey, so pick the plan that covers everything. The comparison above already filters to plans big enough for your days and usage." },
  ],
  faq: [
    {
      question: "Do I need an eSIM for Turkey, or will my UK phone just work?",
      answer: "Your UK phone will work, but it will cost extra on every UK network unless your plan explicitly includes Turkey — Turkey is not in any network's Europe zone. For most people a Turkey eSIM bought before departure is cheaper than a week of daily roaming fees. Sky Mobile's £2 a day and O2's £7 a day at 2Mbps are the main cases where roaming can still make sense for a short trip.",
      sourceIds: ["o2-travel", "three-turkey"],
    },
    {
      question: "Is Turkey included in free EU roaming?",
      answer: "No. Turkey is not an EU member, and UK networks' inclusive or low-cost Europe roaming does not cover it. EE, O2, Vodafone, Three, iD, Sky, giffgaff, SMARTY, VOXI and Tesco Mobile all place Turkey in a rest-of-world zone with its own charges.",
      sourceIds: ["o2-travel", "three-turkey", "vodafone-global-roaming", "giffgaff-turkiye"],
    },
    {
      question: "Can I buy a travel eSIM once I am in Turkey?",
      answer: "Usually not. Since July 2025 Turkey blocks the websites and apps of most international eSIM sellers, including Airalo, Saily, Nomad and Holafly, from inside the country. An eSIM you installed before arriving keeps working. Buy and install before you fly, and choose a plan big enough that you will not need a top-up.",
      sourceIds: ["holafly-ban", "findyouresim-ban"],
    },
    {
      question: "Will I get 5G on a Turkey eSIM?",
      answer: "Turkey's three networks launched 5G in all 81 provincial centres at the start of April 2026, with nationwide coverage required by April 2028. Whether your eSIM uses it depends on the provider: Nomad lists 4G/5G for Turkey, Airalo's Turkey page does not mention 5G. 4G covers the coast and cities well and is fast enough for maps, video calls and streaming.",
      sourceIds: ["developing-telecoms-5g", "nomad-turkey", "airalo-turkey"],
    },
    {
      question: "Do I have to register my phone's IMEI in Turkey?",
      answer: "Only if you use a Turkish SIM card in a phone brought from abroad for more than 120 days in a year, after which registration costs ₺54,258 in 2026. Roaming on a UK SIM or a travel eSIM does not make your phone a Turkish subscriber, and a holiday of any normal length does not trigger the rule.",
      sourceIds: ["turkiye-today-imei", "simology-imei"],
    },
    {
      question: "Is a Turkish SIM card at the airport cheaper than an eSIM?",
      answer: "No. In September 2026 Istanbul Airport's official counters charged ₺1,935 to ₺3,200 for 20GB to 25GB, with a passport check, and city shops are only somewhat cheaper. The eSIMs compared above cost less than half that for the same data and are installed before you land. A local SIM is worth it mainly if you need a Turkish number.",
      sourceIds: ["traveltomtom-airport"],
    },
    {
      question: "Do WhatsApp calls and FaceTime work in Turkey?",
      answer: "Yes, on any data connection. Turkey does occasionally block social media platforms for a day or so around political events, and restricts many VPN services, but everyday messaging and app calls work normally the rest of the time. A travel eSIM and a roaming UK SIM see exactly the same blocks, because both use the same Turkish networks.",
      sourceIds: ["techradar-blackout"],
    },
    {
      question: "Will a travel eSIM give me a Turkish phone number?",
      answer: "The plans compared here are data only: no Turkish number, no ordinary calls or texts. WhatsApp and FaceTime work fine. Keep your UK SIM enabled with data roaming switched off so texts and calls to your UK number still reach you, and expect your UK network's rates if you answer a call.",
      sourceIds: ["airalo-turkey", "nomad-turkey"],
    },
  ],
  related: ["greece", "cyprus", "egypt", "united-arab-emirates", "spain"],
  writtenAt: "2026-09-10",
  updatedAt: "2026-09-10",
};
