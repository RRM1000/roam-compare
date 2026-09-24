import { isDestination } from "@/lib/destinations";
import { fetchNomadPlans } from "@/lib/nomad-live";
import { fetchSailyPlans } from "@/lib/saily-live";

/**
 * Live plans for one destination, fetched when a reader switches country.
 *
 * Pages used to embed every destination's live plans so the switch needed no
 * request. That came to ~670KB per page, and serialising it cost roughly 30ms
 * of CPU on every render, which is what pushed the Worker past its limits and
 * returned 503s after a handful of page loads. Now each page carries only its
 * own country, and this route fills in the rest on demand. Both feeds are
 * already cached per isolate and at the edge, so this is a filter, not a fetch.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ destination: string }> }) {
  const { destination } = await params;
  if (!isDestination(destination)) {
    return Response.json({ error: "Unknown destination" }, { status: 404, headers: { "x-robots-tag": "noindex" } });
  }
  const [saily, nomad] = await Promise.all([fetchSailyPlans(), fetchNomadPlans()]);
  const plans = [...(saily ?? []), ...(nomad ?? [])].filter((plan) => plan.destination === destination);
  return Response.json(plans, {
    headers: {
      "cache-control": "public, max-age=300",
      "x-robots-tag": "noindex",
    },
  });
}
