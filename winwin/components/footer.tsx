import Link from "next/link";

import {
  FacebookSocialIcon,
  InstagramSocialIcon,
  LinkedInSocialIcon,
} from "@/components/icons";
import { WinwinLogo } from "@/components/winwin-logo";

const socialLinks = [
  {
    href: "https://www.instagram.com/the.winwin.club/",
    label: "Instagram",
    icon: InstagramSocialIcon,
  },
  {
    href: "https://linkedin.com/company/winwin-club",
    label: "LinkedIn",
    icon: LinkedInSocialIcon,
  },
  {
    href: "https://facebook.com/w2club",
    label: "Facebook",
    icon: FacebookSocialIcon,
  },
];

const aboutLinks = [
  { href: "/about", label: "About Us" },
  { href: "/#features", label: "Features" },
  { href: "/careers", label: "Career" },
  { href: "/pricing", label: "Pricing" },
];

const resourceLinks = [
  { href: "/blog", label: "Blog & Article" },
  { href: "/integrations", label: "Integration" },
  { href: "/contact", label: "Contact Us" },
  { href: "/license", label: "License" },
];

export function Footer() {
  return (
    <footer className="border-t-2 border-blue-500 bg-[#0b1131] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <WinwinLogo size="lg" />
          </div>

          <div>
            <p className="mb-5 text-sm text-slate-400">About</p>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-sm text-slate-400">Resources</p>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-sm text-slate-400">Get in touch</p>
            <a
              href="mailto:info@w2club.com"
              className="text-sm text-white/80 transition-colors hover:text-white"
            >
              info@w2club.com
            </a>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full bg-white text-[#0b1131] transition-all duration-200 hover:scale-105 hover:bg-white/90"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">© 2023 - 2024 Winwin Club</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-slate-500 transition-colors hover:text-white/80"
            >
              Privacy Policy
            </Link>
            <Link
              href="/changelog"
              className="text-xs text-slate-500 transition-colors hover:text-white/80"
            >
              Changelog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
