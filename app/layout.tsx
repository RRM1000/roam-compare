import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const socialImage = `${protocol}://${host}/og.png`;

  return {
    title: "RoamCompare — Compare eSIMs for UK travellers",
    description: "Compare UK roaming costs with travel eSIMs in pounds, sized for your trip.",
    openGraph: {
      title: "RoamCompare — Land connected for less",
      description: "A clearer eSIM comparison for UK travellers.",
      type: "website",
      images: [{ url: socialImage, width: 1728, height: 910, alt: "RoamCompare — land connected without roaming shock" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "RoamCompare — Land connected for less",
      description: "A clearer eSIM comparison for UK travellers.",
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
