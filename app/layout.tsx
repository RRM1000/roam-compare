import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const socialImage = `${protocol}://${host}/og.png`;

  return {
    title: "RoamCompare — UK roaming vs travel eSIMs",
    description: "Compare sourced UK roaming estimates with Turkey travel eSIM plans, sized for your trip and shown in approximate pounds.",
    openGraph: {
      title: "RoamCompare — Know your roaming cost before take-off",
      description: "A sourced UK roaming and travel eSIM comparison for Turkey.",
      type: "website",
      images: [{ url: socialImage, width: 1728, height: 910, alt: "RoamCompare — land connected without roaming shock" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "RoamCompare — Know your roaming cost before take-off",
      description: "A sourced UK roaming and travel eSIM comparison for Turkey.",
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
