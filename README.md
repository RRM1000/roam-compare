# RoamCompare

UK-first roaming and travel-eSIM comparison site built with vinext and OpenAI Sites.

## What is implemented

- allowance-matched, official-source UK roaming estimates for Turkey, the United States, Spain, Japan and the UAE
- live Saily prices in GBP for all 20 destinations, fetched per request from the Saily partners API
- dated manual eSIM price snapshots for Turkey, the United States, Spain, Japan and the UAE
- live provider handoffs for the remaining Airalo, Klook and Nomad catalogues without guessed prices
- Klook, Airalo, Nomad and Saily options, with multiple suitable plans per provider
- normal calls/SMS requirements, exact-model eSIM compatibility, filters and a three-plan shortlist
- visible hotspot/tethering rules, speed caps, fair-use limits, activation rules and sources
- browser-local saved comparisons; no account or comparison database
- private-launch robots policy, canonical destination pages and a launch-ready sitemap

Saily rows are labelled "Live price" and are exact GBP amounts from the provider, not FX estimates. Manual snapshots are removed from ranking after seven days. Provider currency is preserved and GBP is labelled as an estimate. The test command also fails when a manual data review is overdue.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
npm test
npm run lint
npm run data:check
```

## Saily live pricing

Saily plans come from the Saily partners API (`GET https://web.saily.com/v3/partners/plans`, spec at
<https://partners.saily.com>). Passing our affiliate identifiers makes the API return each plan's
`destination_url` as a ready-made tracking link, so affiliate URLs are never assembled locally.

```text
SAILY_AFF_ID
SAILY_OFFER_ID
```

Both are required together and are **server-only** — never prefix them with `NEXT_PUBLIC_`. Set them as
Worker variables in the deployment, and in a gitignored `.env.local` for local development. Without them
the site silently falls back to the dated manual Saily snapshots and emits no affiliate link.

Responses are cached for three hours, in-isolate and at the edge. Only single-destination plans are used;
regional and global bundles are skipped because they are not like-for-like rows. Checkout links are
accepted only when they are HTTPS on `go.saily.site`, mirroring the Klook URL check.

One operational caveat: `web.saily.com` sits behind Cloudflare, which rejects requests from Node's
`fetch` regardless of headers, and rejects any request with no `User-Agent`. The integration works from
the Cloudflare Workers runtime (verified against workerd) and from `curl` with a browser-shaped agent, but
a plain `node` script cannot smoke-test it. `npm test` therefore exercises the response mapper against a
captured fixture rather than the network.

## Nomad affiliate links

Nomad (a LotusFlare brand) is pre-wired but dormant. With no environment variable set, Nomad links
point at its public pages, no `rel="sponsored"` is emitted, and no affiliate badge is shown — the
badge is derived from the configuration, so the site can never claim a relationship that does not exist.

```text
NEXT_PUBLIC_NOMAD_AFFILIATE_URL
NEXT_PUBLIC_NOMAD_AFFILIATE_URL_UNITED_STATES
NEXT_PUBLIC_NOMAD_AFFILIATE_URL_SPAIN
NEXT_PUBLIC_NOMAD_AFFILIATE_URL_JAPAN
NEXT_PUBLIC_NOMAD_AFFILIATE_URL_UAE
```

Set the first alone if the programme issues one link rather than per-destination links. Values are
accepted only over HTTPS on a host listed in `NOMAD_TRACKING_HOSTS` in `lib/destinations.ts`; anything
else falls back to the public page. **If the approved link runs through an affiliate network's own click
domain, add that host to `NOMAD_TRACKING_HOSTS` — otherwise the link is rejected and silently ignored.**

## Klook affiliate links

Klook runs its own affiliate programme at <https://affiliate.klook.com>, and attributes clicks on an
`aid` appended to any Klook product URL. One id therefore covers all 20 destinations:

```text
NEXT_PUBLIC_KLOOK_AFFILIATE_ID
```

Every destination has a confirmed country-specific Klook eSIM product page in `klookProductUrls`
(all checked for a 200 and a matching country title on 18 August 2026). Klook rows never show a price:
a single destination has hundreds of priced permutations of validity, daily-vs-total data and package
size, so the row stays a labelled handoff and the price is read at Klook.

Per-destination URL overrides remain available for cases where a specific tracking link must be used
instead of the product page. They take precedence, and are accepted only over HTTPS on Klook's domain:

```text
NEXT_PUBLIC_KLOOK_AFFILIATE_URL
NEXT_PUBLIC_KLOOK_AFFILIATE_URL_UNITED_STATES
NEXT_PUBLIC_KLOOK_AFFILIATE_URL_SPAIN
NEXT_PUBLIC_KLOOK_AFFILIATE_URL_JAPAN
NEXT_PUBLIC_KLOOK_AFFILIATE_URL_UAE
```

The first variable is the Turkey URL retained for backwards compatibility. Configured links are accepted only when they use HTTPS on Klook’s domain; invalid values fall back to the verified public product page. Never place partner credentials or private tokens in source control.

## Before public launch

- configure the approved Klook tracking URLs
- set `SAILY_AFF_ID` and `SAILY_OFFER_ID` as deployment variables and confirm a live click is attributed
- add the public operator identity and monitored contact address
- refresh every manual price snapshot and roaming source
- run `npm test` and `npm run lint`
- replace the private `Disallow: /` robots policy only when the site is intentionally made public

The Sites project binding is declared in `.openai/hosting.json`. No D1 or R2 storage is currently used.
