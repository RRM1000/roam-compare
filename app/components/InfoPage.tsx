import type { ReactNode } from "react";
import Link from "next/link";
import { Analytics } from "@/app/components/Analytics";

/**
 * `updated` is required rather than defaulted, so editing a page forces the date
 * to be revisited. It was a shared literal, which meant all three pages claimed
 * the same date and kept claiming it after any of them changed.
 */
export function InfoPage({ eyebrow, title, intro, updated, children }: { eyebrow: string; title: string; intro: string; updated: string; children: ReactNode }) {
  return (
    <div className="info-page">
      <Analytics />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="info-header"><nav className="nav-shell" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="RoamCompare home"><span className="brand-mark" aria-hidden="true">RC</span><span>RoamCompare</span></Link>
        <div className="nav-actions"><Link href="/">Compare</Link><Link href="/about">About</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
      </nav></header>
      <main id="main-content"><article className="info-article">
        <header><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="info-intro">{intro}</p><p className="updated">Last updated {updated}</p></header>
        <div className="info-body">{children}</div>
      </article></main>
      <footer><Link className="brand" href="/"><span className="brand-mark" aria-hidden="true">RC</span><span>RoamCompare</span></Link><div className="footer-links"><Link href="/">Compare</Link><Link href="/about">About & disclosure</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></footer>
    </div>
  );
}
