import React from "react";
import Link from "next/link";

import { getNavLinks } from "@/helpers/web-base-helpers";

async function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="" className="logo">
        WebBase
      </Link>
      <nav>
        <ol className="header-nav-links">
          <React.Suspense>
            <MainLinks />
          </React.Suspense>
        </ol>
      </nav>
    </header>
  );
}

async function MainLinks() {
  let navLinks = await getNavLinks();
  navLinks = navLinks.slice(0, 4);

  return (
    <>
      {navLinks.map(({ slug, label, href, type }) => (
        <li key={slug}>
          <Link href={href} className={`header-nav-link ${type}`}>
            {label}
          </Link>
        </li>
      ))}
    </>
  );
}
export default SiteHeader;
