import Link from "next/link";

import { FacebookIcon, InstagramIcon } from "@/components/icons";
import { WinwinLogo } from "@/components/winwin-logo";
import { siteContainerClass } from "@/lib/layout";
import {
  CLUB_ADDRESS,
  CLUB_EMAIL,
  CLUB_FACEBOOK_URL,
  CLUB_INSTAGRAM_URL,
  CLUB_LEGAL_NAME,
  CLUB_MAPS_URL,
  CLUB_PHONE_DISPLAY,
  CLUB_PHONE_URL,
} from "@/lib/site";
import { cn } from "@/lib/utils";

const exploreLinks = [
  { href: "/", label: "Overview" },
  { href: "/contact", label: "Contact" },
  { href: "/pricing", label: "Pricing" },
];

const socialLinks = [
  { href: CLUB_INSTAGRAM_URL, label: "Instagram", icon: InstagramIcon },
  { href: CLUB_FACEBOOK_URL, label: "Facebook", icon: FacebookIcon },
];

const linkClassName = "text-sm text-white/80 transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="bg-[#0b1131] text-white">
      <div className={cn(siteContainerClass, "py-14")}>
        <div className="flex flex-col items-start gap-10 sm:flex-row sm:justify-between">
          <WinwinLogo size="lg" />

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
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
              <p className="mb-5 text-sm text-slate-400">Get in touch</p>
              <ul className="space-y-3">
                <li>
                  <a href={`mailto:${CLUB_EMAIL}`} className={linkClassName}>
                    {CLUB_EMAIL}
                  </a>
                </li>
                <li>
                  <a href={CLUB_PHONE_URL} className={linkClassName}>
                    {CLUB_PHONE_DISPLAY}
                  </a>
                </li>
                <li className="max-w-[240px]">
                  <a
                    href={CLUB_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClassName}
                  >
                    {CLUB_ADDRESS}
                  </a>
                </li>
              </ul>
              <div className="mt-5 flex items-center gap-4">
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-white/80 transition-colors hover:text-white"
                  >
                    <Icon className="size-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Winwin Club, operated by{" "}
            {CLUB_LEGAL_NAME}
          </p>
          <Link href="/privacy" className="transition-colors hover:text-white/80">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
