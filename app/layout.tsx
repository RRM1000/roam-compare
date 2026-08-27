import type { Metadata } from "next";
import { getSiteOrigin } from "@/lib/site-url";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const origin = await getSiteOrigin();
  const socialImage = `${origin}/og-premium.jpg`;

  return {
    metadataBase: new URL(origin),
    title: "RoamCompare — UK roaming vs travel eSIMs",
    description: "Compare UK roaming with travel eSIMs across 20 destinations, including dated prices, hotspot rules, speed caps and fair-use limits.",
    robots: { index: false, follow: false, nocache: true },
    alternates: { canonical: `${origin}/` },
    openGraph: {
      title: "RoamCompare — Know your roaming cost before take-off",
      description: "Compare UK roaming and travel eSIMs with visible hotspot rules, speed caps and fair-use limits.",
      type: "website",
      images: [{ url: socialImage, width: 1536, height: 1024, alt: "RoamCompare — know the roaming cost before take-off" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "RoamCompare — Know your roaming cost before take-off",
      description: "Compare UK roaming and travel eSIM options across 20 popular destinations.",
      images: [socialImage],
    },
  };
}

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
 * banner, which does not exist yet. See the Privacy page for the reader-facing
 * version of this same explanation.
 */
function Analytics() {
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
