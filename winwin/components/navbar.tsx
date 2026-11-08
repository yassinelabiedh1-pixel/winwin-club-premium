"use client";

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
      </div>
    </header>
  );
}
