"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { WinwinLogo } from "@/components/winwin-logo";
import { siteContainerClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/contact", label: "Contact" },
  { href: "/pricing", label: "Pricing" },
] as const;

type NavbarProps = {
  variant?: "dark" | "light";
};

export function Navbar({ variant }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const resolvedVariant =
    variant ?? (pathname === "/contact" ? "dark" : "light");
  const isDark = resolvedVariant === "dark";

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="pointer-events-none fixed top-0 left-0 z-50 w-full">
      <div
        className={cn(
          "pointer-events-auto relative z-10 flex items-center justify-between border transition-all duration-300",
          isScrolled
            ? cn(
                "mx-auto mt-3 h-16 w-[calc(100%-2rem)] max-w-[1168px] rounded-full px-6 shadow-lg backdrop-blur-xl",
                isDark
                  ? "border-white/10 bg-[#0A0E27]/90 shadow-black/20"
                  : "border-neutral-200/70 bg-white/80 shadow-neutral-900/5"
              )
            : cn("h-[72px] rounded-none border-transparent", siteContainerClass)
        )}
      >
        <WinwinLogo variant={resolvedVariant} />

        <nav className="hidden items-center gap-8 md:flex lg:gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative inline-flex text-[15px] transition-colors duration-200",
                  isDark
                    ? isActive
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                    : isActive
                      ? "text-[#0A0E27]"
                      : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -top-1.5 -right-2 size-1.5 rounded-full bg-red-800" />
                )}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
          className={cn(
            "-mr-2 flex size-10 items-center justify-center rounded-full md:hidden",
            isDark ? "text-white" : "text-neutral-950"
          )}
        >
          {isMenuOpen ? (
            <X aria-hidden className="size-6" />
          ) : (
            <Menu aria-hidden className="size-6" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className={cn(
            "pointer-events-auto mx-auto mt-2 w-[calc(100%-2rem)] rounded-2xl border p-2 shadow-lg backdrop-blur-xl md:hidden",
            isDark
              ? "border-white/10 bg-[#0A0E27]/95 shadow-black/20"
              : "border-neutral-200/70 bg-white/95 shadow-neutral-900/5"
          )}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "block rounded-xl px-4 py-3 text-[15px] font-medium",
                  isDark
                    ? isActive
                      ? "bg-white/10 text-white"
                      : "text-white/80"
                    : isActive
                      ? "bg-neutral-100 text-neutral-950"
                      : "text-neutral-600"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
