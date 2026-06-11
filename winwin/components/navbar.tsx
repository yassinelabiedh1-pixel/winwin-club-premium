"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { NavLoginButton } from "@/components/nav-login-button";
import { WinwinLogo } from "@/components/winwin-logo";
import { siteContainerClass } from "@/lib/layout";
import { cn } from "@/lib/utils";
const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/#features", label: "Features" },
  { href: "/contact", label: "Contact" },
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
    <header className="fixed top-0 left-0 z-50 w-full">
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-[72px] transition-opacity duration-300",
          isScrolled ? "opacity-100" : "opacity-0",
          isDark
            ? "bg-[linear-gradient(to_bottom,rgba(3,5,16,0.92)_0%,rgba(5,7,22,0.55)_62%,rgba(10,14,39,0.18)_84%,transparent_100%)]"
            : "bg-[linear-gradient(to_bottom,rgba(197,58,70,0.38)_0%,rgba(197,58,70,0.18)_62%,rgba(197,58,70,0.06)_84%,transparent_100%)]"
        )}
      />
      <div
        className={cn(
          "relative z-10 flex h-[72px] items-center justify-between",
          siteContainerClass
        )}
      >
        <WinwinLogo variant={resolvedVariant} />

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex lg:gap-10">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/contact"
                ? pathname === "/contact"
                : link.href === "/"
                  ? pathname === "/"
                  : false;

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

        <NavLoginButton variant={resolvedVariant} />
      </div>
    </header>
  );
}
