import type { DestinationId } from "../destinations.ts";
import { europeGuides } from "./europe.ts";
import { restOfWorldGuides } from "./rest-of-world.ts";
import { turkeyGuide } from "./turkey.ts";
import type { DestinationGuide } from "./types.ts";

export type { DestinationGuide, GuideSource } from "./types.ts";

/**
 * Written guides, keyed by destination. A destination without one still gets
 * its comparison page; it just has no editorial section, no FAQ structured
 * data and no dated source list. Add a guide by writing lib/guides/<id>.ts
 * and registering it in europe.ts or rest-of-world.ts — the tests check every
 * entry's sources and dates.
 */
export const guides: Partial<Record<DestinationId, DestinationGuide>> = {
  turkey: turkeyGuide,
  ...europeGuides,
  ...restOfWorldGuides,
};

export function getGuide(destination: DestinationId): DestinationGuide | undefined {
  return guides[destination];
}

/** FAQPage structured data built from the same entries the page renders. */
export function getGuideFaqJsonLd(guide: DestinationGuide) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
