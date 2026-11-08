import Link from "next/link";

import { WinwinLogo } from "@/components/winwin-logo";
import { siteContainerClass } from "@/lib/layout";
import { CLUB_MAPS_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

const exploreLinks = [
  { href: "/", label: "Overview" },
  { href: "/contact", label: "Contact" },
  { href: "/pricing", label: "Pricing" },
];

const linkClassName = "text-sm text-white/80 transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="bg-[#0b1131] text-white">
      <div className={cn(siteContainerClass, "py-14")}>
        <div className="flex flex-col items-start gap-10 sm:flex-row sm:justify-between">
          <WinwinLogo size="lg" />

          <div className="flex gap-16">
            <div>
              <p className="mb-5 text-sm text-slate-400">Explore</p>
              <ul className="space-y-3">
                {exploreLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClassName}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-5 text-sm text-slate-400">Visit us</p>
              <a
                href={CLUB_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                Get directions
              </a>
            </div>
          </div>
        </div>

        <p className="mt-14 text-xs text-slate-500">
          © {new Date().getFullYear()} Winwin Club
        </p>
      </div>
    </footer>
  );
}
