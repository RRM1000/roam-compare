# RoamCompare

UK-first roaming and travel-eSIM comparison site. Built with vinext and deployed as a Cloudflare Worker.

## What is implemented

- allowance-matched UK roaming estimates for 171 network-and-destination combinations, every one traceable to a
  charge the operator publishes — all 26 destinations on EE, and 145 combinations across the other nine networks.
  Where an operator no longer publishes a rate, the site hands off to their own checker instead of quoting a number.
- live Saily prices in GBP for all 26 destinations, fetched per request from the Saily partners API
- dated manual eSIM price snapshots for Turkey, the United States, Spain, Japan and the UAE
- live provider handoffs for the remaining Airalo, Klook and Nomad catalogues without guessed prices
- Klook, Airalo, Nomad and Saily options, with multiple suitable plans per provider
- normal calls/SMS requirements, exact-model eSIM compatibility, filters and a three-plan shortlist
- visible hotspot/tethering rules, speed caps, fair-use limits, activation rules and sources
- browser-local saved comparisons; no account or comparison database
- public robots policy advertising the sitemap, canonical destination pages and indexable metadata

Saily rows are labelled "Live price" and are exact GBP amounts from the provider, not FX estimates. Manual snapshots carry the date they were checked; a daily job opens an issue when one is due a recheck, and the site shows the date rather than a warning. Provider currency is preserved and GBP is labelled as an estimate. The test command also fails when a manual data review is overdue.

## Destination guides

Every destination has a comparison page at `/destinations/<id>`, and all 26 carry a written guide
from `lib/guides/` under the comparison: verdict, key facts, a table of what all ten UK networks
charge, worked 7- and 14-day costs, provider notes, prose sections, setup steps and a FAQ, plus
`FAQPage` and `Article` structured data and guide-specific title and description tags.

A guide is data, not markup (`lib/guides/types.ts`), and the rules the tests enforce are:

- network rows point at scenario ids in `lib/roaming.ts` rather than repeating prices, so the
  guide, the calculator and the source register cannot disagree; a row with a scenario must be
  offered for that destination and must price
- text shared between guides (the EU zone terms, O2 Travel, Three's passes, provider notes, setup
  steps) lives in `lib/guides/shared.ts`, so a price change is corrected once
- where a guide carries a `sources` list, as Turkey does, every citation must resolve and every
  source must be cited, and `npm run data:check` flags sources when they fall due; sources are kept
  in the data but not rendered on the page
- provider links reuse `getPlanUrl`/`getProviderUrl`, so tracked links are disclosed as sponsored
  exactly as they are in the comparison, and Airalo stays unmarked
- the worked examples are computed at render time from the same live plans the comparison uses;
  when neither feed answers and the hand-checked prices are due, the guide says so rather than
  ranking a stale price

To add or refresh a guide: research it against the networks' and providers' own pages, write
`lib/guides/<id>.ts`, register it in `lib/guides/europe.ts` or `lib/guides/rest-of-world.ts`, and
run `npm test`. When a UK network publishes a charge the engine doesn't price yet, add the scenario
to `lib/roaming.ts` first, so the guide row and the calculator stay in step.

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

## Nomad live pricing

Nomad's affiliate programme runs through Impact, which publishes the full product
catalogue with prices and a ready-made tracking URL per item. `lib/nomad-live.ts` reads
catalog `29881` from the Impact partner API, giving live prices for all 26 destinations
and removing Nomad from the manual snapshot burden.

```text
IMPACT_ACCOUNT_SID
IMPACT_AUTH_TOKEN
```

Both are required together and are **server-only**. Without them Nomad falls back to the
dated snapshots in `lib/catalog.ts`.

Two things worth knowing. The catalogue is **USD only** — `Currency`, `CurrencyCode` and
`currency` query parameters were all tested and ignored — so Nomad prices are converted at
the rounded reference rate and labelled as estimates, unlike Saily's real GBP.

And the destination is read from each item's **tracking URL**, not its name. Product names
arrive in at least six shapes (`Local Turkey - 30 Days - 10 GB`, `Local Jersey - 3 GB - 30
Days` with the order reversed, `Anguilla_10GB_30Day`, `Gabon 3 GB 30 Days`, `Nomad -
Pakistan- 30 Days - 5 GB`), so parsing a country from them is fragile. Every tracking URL
carries the real landing page in its `u` parameter, which is consistent.

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
`aid` appended to any Klook product URL. One id therefore covers all 26 destinations:

```text
NEXT_PUBLIC_KLOOK_AFFILIATE_ID
```

Every destination has a confirmed country-specific Klook eSIM product page in `klookProductUrls`
(checked for a 200 and a matching country title on 18 August 2026, and on 23 September 2026 for the
six added then). Klook blocks scripted requests, so the later six were found through Klook's own
search results, which carry `/activity/` URLs, and confirmed by loading each page. Klook rows never show a price:
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

Done:
- `SAILY_AFF_ID`, `SAILY_OFFER_ID`, `IMPACT_ACCOUNT_SID` and `IMPACT_AUTH_TOKEN` are set as Worker secrets; both live feeds confirmed working in production
- `npm test` and `npm run lint` pass, and `npm run data:check` passes outright — no unconfirmed source left
- a daily scheduled workflow rechecks freshness and opens an issue if anything falls overdue
- domain connected: `NEXT_PUBLIC_SITE_URL=https://roamcompare.co.uk`, canonicals and the sitemap confirmed pointing at it
- Klook approved the domain: `NEXT_PUBLIC_KLOOK_AFFILIATE_ID=132809`
- Google Analytics, gated behind Consent Mode defaulted to denied (see the Analytics component in `app/layout.tsx`) — a stopgap until a consent banner exists

Still open:
- a monitored contact address, published somewhere on the site
- a real consent banner, so Analytics can move past the denied-by-default stopgap
- submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools (the site is now indexable)

## Deployment

The site is a Cloudflare Worker. `npm run build` emits both the bundle and a complete
Worker config at `dist/server/wrangler.json`, so deploying is:

```bash
npm run deploy
```

Pushing to `main` does the same through `.github/workflows/deploy.yml`, after lint and
tests pass. It needs two repository secrets:

| Secret | Where to get it |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → My Profile → API Tokens → *Edit Cloudflare Workers* template |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → Workers & Pages → Account ID |

**Environment variables split two ways, and getting this wrong fails silently.**

Anything prefixed `NEXT_PUBLIC_` is inlined into the bundle at *build* time, so it must be
set as a repository **variable** for the workflow (`NEXT_PUBLIC_SITE_URL`,
`NEXT_PUBLIC_KLOOK_AFFILIATE_ID`, `NEXT_PUBLIC_NOMAD_AFFILIATE_URL`). Setting one only as a
Worker secret leaves it `undefined` in the shipped code.

Everything else is read at *runtime* and belongs in the Worker, set once with:

```bash
wrangler secret put SAILY_AFF_ID --config dist/server/wrangler.json
wrangler secret put SAILY_OFFER_ID --config dist/server/wrangler.json
```

`.openai/hosting.json` remains from the earlier OpenAI Sites deployment. No D1 or R2 storage
is currently used, and the `/_vinext/image` route is unused — nothing in the app renders an
image through it, so the `ASSETS` and `IMAGES` bindings it would need are not declared.
