import type { Provider } from "../catalog.ts";
import type { DestinationId } from "../destinations.ts";
import type { Network } from "../roaming.ts";

/**
 * A dated, linkable source. Every fact a guide states must trace to one of
 * these, in the same way every price on the comparison traces to a checked
 * page. `checkedAt` is the day the page was read; `reviewAfter` is the day the
 * freshness check starts asking for it to be reread.
 */
export type GuideSource = {
  id: string;
  label: string;
  url: string;
  publisher: string;
  checkedAt: string;
  reviewAfter: string;
  /** Official pages (regulator, operator, provider) outrank trade press. */
  kind: "official" | "operator" | "provider" | "press";
};

export type GuideFact = { label: string; value: string; sourceIds?: string[] };

export type GuideNetworkRow = {
  network: Network;
  /** The scenario value from lib/roaming.ts that prices this, or null when the network hands off. */
  scenario: string | null;
  headline: string;
  detail: string;
  sourceIds?: string[];
};

export type GuideProviderNote = {
  provider: Provider;
  /** Which local network the provider's plan lands on, in the provider's own words. */
  localNetwork: string;
  summary: string;
  watchOut?: string;
  bestFor?: string;
  watchFor?: string;
  sourceIds?: string[];
};

export type GuideSection = { id: string; heading: string; paragraphs: string[]; sourceIds?: string[] };

export type GuideFaq = { question: string; answer: string; sourceIds?: string[] };

export type DestinationGuide = {
  destination: DestinationId;
  /** Title-tag keyword phrase, e.g. "Turkey eSIM". */
  keyword: string;
  title: string;
  description: string;
  /** The one-paragraph answer a searcher wants before anything else. */
  verdict: { heading: string; body: string; sourceIds?: string[] };
  facts: GuideFact[];
  networks: { intro: string; rows: GuideNetworkRow[] };
  providers: { intro: string; notes: GuideProviderNote[] };
  sections: GuideSection[];
  setup: Array<{ title: string; body: string }>;
  faq: GuideFaq[];
  sources?: GuideSource[];
  /** Destinations worth linking to from this page, by id. */
  related: DestinationId[];
  writtenAt: string;
  updatedAt: string;
};

