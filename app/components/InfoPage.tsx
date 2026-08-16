import type { ReactNode } from "react";
import Link from "next/link";

export function InfoPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return (
    <main className="info-page">
      <nav className="nav-shell" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="RoamCompare home"><span className="brand-mark">RC</span><span>RoamCompare</span></Link>
        <div className="nav-actions"><Link href="/">Compare</Link><Link href="/about">About</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
      </nav>
      <article className="info-article">
        <header><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="info-intro">{intro}</p><p className="updated">Last updated 16 August 2026</p></header>
        <div className="info-body">{children}</div>
      </article>
      <footer><Link className="brand" href="/"><span className="brand-mark">RC</span><span>RoamCompare</span></Link><div className="footer-links"><Link href="/">Compare</Link><Link href="/about">About & disclosure</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></footer>
    </main>
  );
}
