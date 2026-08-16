export type EsimSupport = "supported" | "variant-dependent" | "unsupported";
export type LockStatus = "unknown" | "unlocked" | "locked";
export type EsimReadiness = "unknown" | "ready" | "check" | "blocked";

export type EsimSource = {
  label: string;
  url: string;
  checkedAt: string;
  reviewAfter: string;
};

export const ESIM_COMPATIBILITY_REVIEW_AFTER = "2026-09-16";

export const esimSources = {
  apple: {
    label: "Apple Support — Dual SIM with eSIM",
    url: "https://support.apple.com/en-gb/109322",
    checkedAt: "2026-08-16",
    reviewAfter: ESIM_COMPATIBILITY_REVIEW_AFTER,
  },
  samsung: {
    label: "Samsung UK — Galaxy eSIM and supported devices",
    url: "https://www.samsung.com/uk/support/mobile-devices/galaxy-esim-and-supported-network-carriers/",
    checkedAt: "2026-08-16",
    reviewAfter: ESIM_COMPATIBILITY_REVIEW_AFTER,
  },
  samsungA57: {
    label: "Samsung UK — Galaxy A57 5G specifications",
    url: "https://www.samsung.com/uk/smartphones/galaxy-a/galaxy-a57-5g-awesome-gray-256gb-sm-a576bzadeub/",
    checkedAt: "2026-08-16",
    reviewAfter: ESIM_COMPATIBILITY_REVIEW_AFTER,
  },
  samsungA37: {
    label: "Samsung UK — Galaxy A37 5G specifications",
    url: "https://www.samsung.com/uk/smartphones/galaxy-a/galaxy-a37-5g-awesome-charcoal-256gb-sm-a376bzageub/",
    checkedAt: "2026-08-16",
    reviewAfter: ESIM_COMPATIBILITY_REVIEW_AFTER,
  },
  google: {
    label: "Google Pixel Help — Get a SIM or eSIM",
    url: "https://support.google.com/pixelphone/answer/7086887?hl=en-GB",
    checkedAt: "2026-08-16",
    reviewAfter: ESIM_COMPATIBILITY_REVIEW_AFTER,
  },
  sony: {
    label: "Sony UK — SIM, eSIM and SD card support by Xperia model",
    url: "https://www.sony.co.uk/electronics/support/mobile-phones-tablets-mobile-phones/xperia-1-vii-256gb/articles/00300757",
    checkedAt: "2026-08-16",
    reviewAfter: ESIM_COMPATIBILITY_REVIEW_AFTER,
  },
  sony10vii: {
    label: "Sony UK — Xperia 10 VII specifications",
    url: "https://www.sony.co.uk/electronics/support/mobile-phones-tablets-mobile-phones/xperia-10-vii/specifications",
    checkedAt: "2026-08-16",
    reviewAfter: ESIM_COMPATIBILITY_REVIEW_AFTER,
  },
  sony1viii: {
    label: "Sony UK — Xperia 1 VIII specifications",
    url: "https://www.sony.co.uk/electronics/support/mobile-phones-tablets-mobile-phones/xperia-1-viii-1tb/specifications",
    checkedAt: "2026-08-16",
    reviewAfter: ESIM_COMPATIBILITY_REVIEW_AFTER,
  },
} as const satisfies Record<string, EsimSource>;

export type EsimSourceId = keyof typeof esimSources;

export type EsimDevice = {
  id: string;
  manufacturer: "Apple" | "Samsung" | "Google" | "Sony";
  model: string;
  aliases: readonly string[];
  support: EsimSupport;
  caveat: string;
  sourceId: EsimSourceId;
};

const appleRegionalCaveat = "Apple supports eSIM on this family, but devices bought in China mainland, Hong Kong or Macao can differ. Confirm the country-specific model before buying.";
const appleUnsupportedCaveat = "Apple's eSIM guidance starts with iPhone XS, iPhone XS Max and iPhone XR. This earlier model is not listed as eSIM-capable.";
const samsungRegionalCaveat = "Samsung lists this family for eSIM but says support can differ by country of origin. Confirm the exact regional model in Settings before buying.";
const googleSupportedCaveat = "Google lists Pixel 4 and later phones as eSIM-capable. Carrier support and the phone's network-lock status still matter.";
const sonySupportedCaveat = "Sony confirms eSIM for this exact model number. Xperia phones with the same commercial name but another regional model number can differ.";
const sonyUnsupportedCaveat = "Sony's model-specific SIM table says this exact model number does not support eSIM.";

function slug(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\+/g, " plus ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function makeDevice(
  manufacturer: EsimDevice["manufacturer"],
  model: string,
  support: EsimSupport,
  caveat: string,
  sourceId: EsimSourceId,
  aliases: readonly string[] = [],
): EsimDevice {
  return {
    id: `${slug(manufacturer)}-${slug(model)}`,
    manufacturer,
    model,
    aliases,
    support,
    caveat,
    sourceId,
  };
}

const appleModels: ReadonlyArray<readonly [string, readonly string[]]> = [
  ["iPhone XS", []],
  ["iPhone XS Max", []],
  ["iPhone XR", []],
  ["iPhone 11", []],
  ["iPhone 11 Pro", []],
  ["iPhone 11 Pro Max", []],
  ["iPhone SE (2nd generation)", ["iPhone SE 2", "iPhone SE 2020"]],
  ["iPhone 12 mini", []],
  ["iPhone 12", []],
  ["iPhone 12 Pro", []],
  ["iPhone 12 Pro Max", []],
  ["iPhone 13 mini", []],
  ["iPhone 13", []],
  ["iPhone 13 Pro", []],
  ["iPhone 13 Pro Max", []],
  ["iPhone SE (3rd generation)", ["iPhone SE 3", "iPhone SE 2022"]],
  ["iPhone 14", []],
  ["iPhone 14 Plus", []],
  ["iPhone 14 Pro", []],
  ["iPhone 14 Pro Max", []],
  ["iPhone 15", []],
  ["iPhone 15 Plus", []],
  ["iPhone 15 Pro", []],
  ["iPhone 15 Pro Max", []],
  ["iPhone 16", []],
  ["iPhone 16 Plus", []],
  ["iPhone 16 Pro", []],
  ["iPhone 16 Pro Max", []],
  ["iPhone 16e", ["iPhone 16 e"]],
  ["iPhone 17", []],
  ["iPhone Air", ["iPhone 17 Air"]],
  ["iPhone 17 Pro", []],
  ["iPhone 17 Pro Max", []],
  ["iPhone 17e", ["iPhone 17 e"]],
];

const appleUnsupportedModels: ReadonlyArray<readonly [string, readonly string[]]> = [
  ["iPhone SE (1st generation)", ["iPhone SE 1", "iPhone SE 2016"]],
  ["iPhone 7", []],
  ["iPhone 7 Plus", []],
  ["iPhone 8", []],
  ["iPhone 8 Plus", []],
  ["iPhone X", []],
];

const samsungModels: ReadonlyArray<readonly [string, readonly string[]]> = [
  ["Galaxy S20", ["Samsung S20"]],
  ["Galaxy S20+", ["Samsung S20 Plus", "Galaxy S20 Plus"]],
  ["Galaxy S20 Ultra", ["Samsung S20 Ultra"]],
  ["Galaxy S21", ["Samsung S21"]],
  ["Galaxy S21+", ["Samsung S21 Plus", "Galaxy S21 Plus"]],
  ["Galaxy S21 Ultra", ["Samsung S21 Ultra"]],
  ["Galaxy S22", ["Samsung S22"]],
  ["Galaxy S22+", ["Samsung S22 Plus", "Galaxy S22 Plus"]],
  ["Galaxy S22 Ultra", ["Samsung S22 Ultra"]],
  ["Galaxy S23", ["Samsung S23"]],
  ["Galaxy S23+", ["Samsung S23 Plus", "Galaxy S23 Plus"]],
  ["Galaxy S23 Ultra", ["Samsung S23 Ultra"]],
  ["Galaxy S23 FE", ["Samsung S23 FE"]],
  ["Galaxy S24", ["Samsung S24"]],
  ["Galaxy S24+", ["Samsung S24 Plus", "Galaxy S24 Plus"]],
  ["Galaxy S24 Ultra", ["Samsung S24 Ultra"]],
  ["Galaxy S24 FE", ["Samsung S24 FE"]],
  ["Galaxy S25", ["Samsung S25"]],
  ["Galaxy S25+", ["Samsung S25 Plus", "Galaxy S25 Plus"]],
  ["Galaxy S25 Ultra", ["Samsung S25 Ultra"]],
  ["Galaxy S25 Edge", ["Samsung S25 Edge"]],
  ["Galaxy S25 FE", ["Samsung S25 FE"]],
  ["Galaxy S26", ["Samsung S26"]],
  ["Galaxy S26+", ["Samsung S26 Plus", "Galaxy S26 Plus"]],
  ["Galaxy S26 Ultra", ["Samsung S26 Ultra"]],
  ["Galaxy Z Fold", ["Samsung Fold"]],
  ["Galaxy Z Fold2", ["Samsung Fold 2", "Galaxy Z Fold 2"]],
  ["Galaxy Z Fold3", ["Samsung Fold 3", "Galaxy Z Fold 3"]],
  ["Galaxy Z Fold4", ["Samsung Fold 4", "Galaxy Z Fold 4"]],
  ["Galaxy Z Fold5", ["Samsung Fold 5", "Galaxy Z Fold 5"]],
  ["Galaxy Z Fold6", ["Samsung Fold 6", "Galaxy Z Fold 6"]],
  ["Galaxy Z Fold7", ["Samsung Fold 7", "Galaxy Z Fold 7"]],
  ["Galaxy Z Flip", ["Samsung Flip"]],
  ["Galaxy Z Flip 5G", ["Samsung Flip 5G"]],
  ["Galaxy Z Flip3", ["Samsung Flip 3", "Galaxy Z Flip 3"]],
  ["Galaxy Z Flip4", ["Samsung Flip 4", "Galaxy Z Flip 4"]],
  ["Galaxy Z Flip5", ["Samsung Flip 5", "Galaxy Z Flip 5"]],
  ["Galaxy Z Flip6", ["Samsung Flip 6", "Galaxy Z Flip 6"]],
  ["Galaxy Z Flip7", ["Samsung Flip 7", "Galaxy Z Flip 7"]],
  ["Galaxy Z Flip7 FE", ["Samsung Flip 7 FE", "Galaxy Z Flip 7 FE"]],
  ["Galaxy Z TriFold", ["Samsung TriFold", "Galaxy Tri Fold"]],
  ["Galaxy A35", ["Samsung A35"]],
  ["Galaxy A36", ["Samsung A36"]],
  ["Galaxy A54", ["Samsung A54"]],
  ["Galaxy A55", ["Samsung A55"]],
  ["Galaxy A56", ["Samsung A56"]],
  ["Galaxy XCover7", ["Samsung XCover 7"]],
  ["Galaxy XCover7 Pro", ["Samsung XCover 7 Pro"]],
];

const googleSupportedModels: ReadonlyArray<readonly [string, readonly string[]]> = [
  ["Pixel 4", ["Google Pixel 4"]],
  ["Pixel 4 XL", ["Google Pixel 4 XL"]],
  ["Pixel 4a", ["Google Pixel 4a"]],
  ["Pixel 4a (5G)", ["Google Pixel 4a 5G"]],
  ["Pixel 5", ["Google Pixel 5"]],
  ["Pixel 5a", ["Google Pixel 5a", "Pixel 5a 5G"]],
  ["Pixel 6", ["Google Pixel 6"]],
  ["Pixel 6a", ["Google Pixel 6a"]],
  ["Pixel 6 Pro", ["Google Pixel 6 Pro"]],
  ["Pixel 7", ["Google Pixel 7"]],
  ["Pixel 7a", ["Google Pixel 7a"]],
  ["Pixel 7 Pro", ["Google Pixel 7 Pro"]],
  ["Pixel Fold", ["Google Pixel Fold"]],
  ["Pixel 8", ["Google Pixel 8"]],
  ["Pixel 8a", ["Google Pixel 8a"]],
  ["Pixel 8 Pro", ["Google Pixel 8 Pro"]],
  ["Pixel 9", ["Google Pixel 9"]],
  ["Pixel 9a", ["Google Pixel 9a"]],
  ["Pixel 9 Pro", ["Google Pixel 9 Pro"]],
  ["Pixel 9 Pro XL", ["Google Pixel 9 Pro XL"]],
  ["Pixel 9 Pro Fold", ["Google Pixel 9 Pro Fold"]],
  ["Pixel 10", ["Google Pixel 10"]],
  ["Pixel 10 Pro", ["Google Pixel 10 Pro"]],
  ["Pixel 10 Pro XL", ["Google Pixel 10 Pro XL"]],
  ["Pixel 10 Pro Fold", ["Google Pixel 10 Pro Fold"]],
  ["Pixel 10a", ["Google Pixel 10a"]],
];

const googleVariantModels: ReadonlyArray<readonly [string, readonly string[], string]> = [
  ["Pixel 2", ["Google Pixel 2"], "Only Pixel 2 phones bought with Google Fi service support eSIM."],
  ["Pixel 2 XL", ["Google Pixel 2 XL"], "Only Pixel 2 XL phones bought with Google Fi service support eSIM."],
  ["Pixel 3", ["Google Pixel 3"], "Pixel 3 eSIM support depends on where and from which carrier the phone was bought."],
  ["Pixel 3 XL", ["Google Pixel 3 XL"], "Pixel 3 XL eSIM support depends on where and from which carrier the phone was bought."],
  ["Pixel 3a", ["Google Pixel 3a"], "Pixel 3a phones bought with Verizon service or in Japan do not support eSIM."],
  ["Pixel 3a XL", ["Google Pixel 3a XL"], "Pixel 3a XL eSIM support depends on where and from which carrier the phone was bought."],
];

const sonySupportedModels: ReadonlyArray<readonly [string, readonly string[]]> = [
  ["Xperia 1 VII (XQ-FS54)", ["Xperia 1 VII", "XQ-FS54"]],
  ["Xperia 10 VI (XQ-ES54)", ["Xperia 10 VI", "XQ-ES54"]],
  ["Xperia 1 VI (XQ-EC54)", ["Xperia 1 VI", "XQ-EC54"]],
  ["Xperia 10 V (XQ-DC54)", ["Xperia 10 V", "XQ-DC54"]],
  ["Xperia 5 V (XQ-DE54)", ["Xperia 5 V", "XQ-DE54"]],
  ["Xperia 1 V (XQ-DQ54)", ["Xperia 1 V", "XQ-DQ54"]],
  ["Xperia 10 IV (XQ-CC54)", ["Xperia 10 IV", "XQ-CC54"]],
  ["Xperia 5 IV (XQ-CQ54)", ["Xperia 5 IV", "XQ-CQ54"]],
  ["Xperia 1 IV (XQ-CT54)", ["Xperia 1 IV", "XQ-CT54"]],
];

const sonyUnsupportedModels: ReadonlyArray<readonly [string, readonly string[]]> = [
  ["Xperia 1 VII (XQ-FS72)", ["XQ-FS72"]],
  ["Xperia 1 VI (XQ-EC72)", ["XQ-EC72"]],
  ["Xperia 10 IV (XQ-CC72)", ["XQ-CC72"]],
  ["Xperia PRO-I (XQ-BE52)", ["Xperia PRO-I", "XQ-BE52"]],
  ["Xperia 10 III (XQ-BT52)", ["Xperia 10 III", "XQ-BT52"]],
  ["Xperia 5 III (XQ-BQ52)", ["Xperia 5 III", "XQ-BQ52"]],
  ["Xperia 1 III (XQ-BC52)", ["Xperia 1 III", "XQ-BC52"]],
  ["Xperia 1 II (XQ-AT51)", ["Xperia 1 II", "XQ-AT51"]],
  ["Xperia 1 II Dual SIM (XQ-AT52)", ["XQ-AT52"]],
  ["Xperia 5 II (XQ-AS52)", ["Xperia 5 II", "XQ-AS52"]],
  ["Xperia 10 II (XQ-AU51)", ["Xperia 10 II", "XQ-AU51"]],
];

export const esimDevices: readonly EsimDevice[] = [
  ...appleModels.map(([model, aliases]) => makeDevice("Apple", model, "variant-dependent", appleRegionalCaveat, "apple", aliases)),
  ...appleUnsupportedModels.map(([model, aliases]) => makeDevice("Apple", model, "unsupported", appleUnsupportedCaveat, "apple", aliases)),
  ...samsungModels.map(([model, aliases]) => makeDevice("Samsung", model, "variant-dependent", samsungRegionalCaveat, "samsung", aliases)),
  makeDevice("Samsung", "Galaxy A57 5G (SM-A576B)", "supported", "Samsung's UK specification lists an embedded SIM for this exact UK model prefix.", "samsungA57", ["Samsung A57", "Galaxy A57", "SM-A576B"]),
  makeDevice("Samsung", "Galaxy A37 5G (SM-A376B)", "supported", "Samsung's UK specification lists an embedded SIM for this exact UK model prefix.", "samsungA37", ["Samsung A37", "Galaxy A37", "SM-A376B"]),
  ...googleSupportedModels.map(([model, aliases]) => makeDevice("Google", model, "supported", googleSupportedCaveat, "google", aliases)),
  ...googleVariantModels.map(([model, aliases, caveat]) => makeDevice("Google", model, "variant-dependent", caveat, "google", aliases)),
  makeDevice("Google", "Pixel (2016)", "unsupported", "Google says the original 2016 Pixel does not support eSIM.", "google", ["Google Pixel 2016", "Original Pixel"]),
  ...sonySupportedModels.map(([model, aliases]) => makeDevice("Sony", model, "supported", sonySupportedCaveat, "sony", aliases)),
  makeDevice("Sony", "Xperia 10 VII (UK specification)", "supported", "Sony's UK specification lists nano-SIM and eSIM support. Imported variants can differ.", "sony10vii", ["Xperia 10 VII"]),
  makeDevice("Sony", "Xperia 1 VIII (UK specification)", "supported", "Sony's UK specification lists nano-SIM plus eSIM and dual-eSIM support. Imported variants can differ.", "sony1viii", ["Xperia 1 VIII"]),
  ...sonyUnsupportedModels.map(([model, aliases]) => makeDevice("Sony", model, "unsupported", sonyUnsupportedCaveat, "sony", aliases)),
];

const devicesById = new Map(esimDevices.map((device) => [device.id, device]));

function normalise(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\+/g, " plus ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

const searchIndex = esimDevices.map((device) => ({
  device,
  values: [device.model, `${device.manufacturer} ${device.model}`, ...device.aliases].map(normalise),
}));

function searchScore(values: readonly string[], query: string, queryTokens: readonly string[]) {
  let best = Number.POSITIVE_INFINITY;

  for (const value of values) {
    if (value === query) best = Math.min(best, 0);
    else if (value.startsWith(query)) best = Math.min(best, 10);
    else if (value.includes(` ${query}`)) best = Math.min(best, 20);
    else if (value.includes(query)) best = Math.min(best, 30);
  }

  const searchableTokens = values.join(" ").split(" ");
  const tokenMatches = queryTokens.every((queryToken) => searchableTokens.some((candidate) => candidate.startsWith(queryToken)));
  if (tokenMatches) best = Math.min(best, 40);

  return best;
}

export function getEsimDevice(id: string) {
  return devicesById.get(id);
}

export function searchEsimDevices(query: string, limit = 12): EsimDevice[] {
  const normalisedQuery = normalise(query);
  if (!normalisedQuery) return [];

  const cappedLimit = Math.max(0, Math.min(12, Math.floor(Number.isFinite(limit) ? limit : 12)));
  if (cappedLimit === 0) return [];

  const queryTokens = normalisedQuery.split(" ");
  return searchIndex
    .map(({ device, values }) => ({ device, score: searchScore(values, normalisedQuery, queryTokens) }))
    .filter(({ score }) => Number.isFinite(score))
    .sort((left, right) => left.score - right.score || left.device.manufacturer.localeCompare(right.device.manufacturer) || left.device.model.localeCompare(right.device.model, "en-GB", { numeric: true }))
    .slice(0, cappedLimit)
    .map(({ device }) => device);
}

export function getEsimReadiness(device: EsimDevice | undefined, lockStatus: LockStatus): EsimReadiness {
  if (lockStatus === "locked") return "blocked";
  if (!device) return "unknown";
  if (device.support === "unsupported") return "blocked";
  if (device.support === "variant-dependent") return "check";
  return lockStatus === "unlocked" ? "ready" : "check";
}
