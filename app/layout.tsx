import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const socialImage = `${protocol}://${host}/og-premium.png`;

  return {
    title: "RoamCompare — UK roaming vs travel eSIMs",
    description: "Compare UK roaming with travel eSIM options across 20 popular destinations, with dated prices or clearly labelled live catalogue links.",
    openGraph: {
      title: "RoamCompare — Know your roaming cost before take-off",
      description: "Compare UK roaming and travel eSIM options across 20 popular destinations.",
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
