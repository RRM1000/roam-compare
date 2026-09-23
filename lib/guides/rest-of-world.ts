import type { DestinationId } from "../destinations.ts";
import type { DestinationGuide } from "./types.ts";
import { australiaGuide } from "./australia.ts";
import { canadaGuide } from "./canada.ts";
import { egyptGuide } from "./egypt.ts";
import { indiaGuide } from "./india.ts";
import { indonesiaGuide } from "./indonesia.ts";
import { japanGuide } from "./japan.ts";
import { mexicoGuide } from "./mexico.ts";
import { moroccoGuide } from "./morocco.ts";
import { sriLankaGuide } from "./sri-lanka.ts";
import { thailandGuide } from "./thailand.ts";
import { unitedArabEmiratesGuide } from "./united-arab-emirates.ts";
import { unitedStatesGuide } from "./united-states.ts";
import { vietnamGuide } from "./vietnam.ts";

/**
 * Guides for destinations outside Europe. Kept as its own registry so the
 * European and rest-of-world guides can be written in parallel without both
 * editing lib/guides/index.ts. Register a guide by importing it here and adding
 * it to the object below.
 */
export const restOfWorldGuides: Partial<Record<DestinationId, DestinationGuide>> = {
  australia: australiaGuide,
  canada: canadaGuide,
  egypt: egyptGuide,
  india: indiaGuide,
  indonesia: indonesiaGuide,
  japan: japanGuide,
  mexico: mexicoGuide,
  morocco: moroccoGuide,
  "sri-lanka": sriLankaGuide,
  thailand: thailandGuide,
  "united-arab-emirates": unitedArabEmiratesGuide,
  "united-states": unitedStatesGuide,
  vietnam: vietnamGuide,
};

