import type { DestinationId } from "../destinations.ts";
import type { DestinationGuide } from "./types.ts";
import { croatiaGuide } from "./croatia.ts";
import { cyprusGuide } from "./cyprus.ts";
import { franceGuide } from "./france.ts";
import { germanyGuide } from "./germany.ts";
import { greeceGuide } from "./greece.ts";
import { irelandGuide } from "./ireland.ts";
import { italyGuide } from "./italy.ts";
import { netherlandsGuide } from "./netherlands.ts";
import { polandGuide } from "./poland.ts";
import { portugalGuide } from "./portugal.ts";
import { spainGuide } from "./spain.ts";
import { switzerlandGuide } from "./switzerland.ts";

/**
 * Guides for the European destinations. Kept as its own registry so the
 * European and rest-of-world guides can be written in parallel without both
 * editing lib/guides/index.ts. Register a guide by importing it here and adding
 * it to the object below.
 */
export const europeGuides: Partial<Record<DestinationId, DestinationGuide>> = {
  croatia: croatiaGuide,
  cyprus: cyprusGuide,
  france: franceGuide,
  germany: germanyGuide,
  greece: greeceGuide,
  ireland: irelandGuide,
  italy: italyGuide,
  netherlands: netherlandsGuide,
  poland: polandGuide,
  portugal: portugalGuide,
  spain: spainGuide,
  switzerland: switzerlandGuide,
};
