import type { Metadata } from "next";
import { getSiteOrigin } from "@/lib/site-url";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const origin = await getSiteOrigin();
  const socialImage = `${origin}/og-premium.jpg`;

  return {
    metadataBase: new URL(origin),
    title: "RoamCompare — UK roaming vs travel eSIMs",
    description: "Compare UK roaming with travel eSIMs across 26 destinations, including dated prices, hotspot rules, speed caps and fair-use limits.",
    robots: { index: true, follow: true },
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

// Google Analytics is rendered per-page, not here — see app/components/Analytics.tsx
// for why the root layout specifically doesn't work for this on Cloudflare.

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
