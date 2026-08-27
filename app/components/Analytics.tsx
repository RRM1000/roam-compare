/**
 * Google Analytics, loaded only when a measurement ID is configured — absent
 * in local development, present once NEXT_PUBLIC_GA_MEASUREMENT_ID is set as
 * a deployment variable.
 *
 * Consent Mode is declared "denied" for every category before gtag.js loads,
 * and nothing here ever calls `gtag('consent', 'update', ...)` to grant it.
 * In that state Google does not set the _ga cookie or any other client
 * identifier, and cannot tell one visit from a returning one — it can only
 * report an anonymous count of visits. This is a stopgap: getting a real
 * "yes/no" from the visitor and updating consent accordingly needs a consent
 * banner, which does not exist yet. See the Privacy page for the
 * reader-facing version of this same explanation.
 *
 * Rendered from each page rather than the root layout. The root layout has
 * no dynamic API calls of its own, so the framework treats it as a fully
 * static shell and serves it from a cache that a change here does not
 * reliably invalidate on Cloudflare — confirmed by comparing against the
 * JSON-LD scripts on individual pages, which use the same
 * dangerouslySetInnerHTML pattern and do reliably reach production.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (!gaId) return null;
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html:
            "window.dataLayer=window.dataLayer||[];" +
            "function gtag(){dataLayer.push(arguments);}" +
            "gtag('consent','default',{'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','analytics_storage':'denied'});",
        }}
      />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `gtag('js', new Date());gtag('config', '${gaId}');`,
        }}
      />
    </>
  );
}
