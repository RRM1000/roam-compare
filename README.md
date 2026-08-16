# RoamCompare

UK-first roaming and travel-eSIM comparison site built with vinext and OpenAI Sites.

## What is implemented

- allowance-matched UK roaming estimates for Turkey
- dated manual eSIM price snapshots for Turkey, the United States, Spain, Japan and the UAE
- live provider handoffs for 15 additional destinations without guessed prices
- Klook, Airalo, Nomad and Saily options, with multiple suitable plans per provider
- normal calls/SMS requirements, exact-model eSIM compatibility, filters and a three-plan shortlist
- visible hotspot/tethering rules, speed caps, fair-use limits, activation rules and sources
- browser-local saved comparisons; no account or comparison database
- private-launch robots policy, canonical destination pages and a launch-ready sitemap

Manual snapshots are removed from ranking after seven days. Provider currency is preserved and GBP is labelled as an estimate.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
npm test
npm run lint
```

## Klook affiliate links

Klook is marked as an affiliate relationship in the interface. Without an approved partner URL, the site falls back to the verified public product page and still marks the outbound link as sponsored. Configure only URLs supplied by the Klook partner programme:

```text
NEXT_PUBLIC_KLOOK_AFFILIATE_URL
NEXT_PUBLIC_KLOOK_AFFILIATE_URL_UNITED_STATES
NEXT_PUBLIC_KLOOK_AFFILIATE_URL_SPAIN
NEXT_PUBLIC_KLOOK_AFFILIATE_URL_JAPAN
NEXT_PUBLIC_KLOOK_AFFILIATE_URL_UAE
```

The first variable is the Turkey URL retained for backwards compatibility. Never place partner credentials or private tokens in source control.

## Before public launch

- configure the approved Klook tracking URLs
- add the public operator identity and monitored contact address
- refresh every manual price snapshot and roaming source
- run `npm test` and `npm run lint`
- replace the private `Disallow: /` robots policy only when the site is intentionally made public

The Sites project binding is declared in `.openai/hosting.json`. No D1 or R2 storage is currently used.
