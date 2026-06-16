"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
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

const menuSpring = { type: "spring" as const, stiffness: 220, damping: 28 };
const menuEase = [0.22, 1, 0.36, 1] as const;

type NavbarProps = {
  variant?: "dark" | "light";
};

function isLinkActive(pathname: string, href: string) {
  if (href === "/contact") return pathname === "/contact";
  if (href === "/") return pathname === "/";
  return false;
}

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
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const linkClassName = (href: string) => {
    const isActive = isLinkActive(pathname, href);

    return cn(
      "relative inline-flex text-[15px] transition-colors duration-200",
      isDark
        ? isActive
          ? "text-white"
          : "text-white/70 hover:text-white"
        : isActive
          ? "text-[#0A0E27]"
          : "text-muted-foreground hover:text-foreground"
    );
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-[72px] transition-opacity duration-300",
          isScrolled || isMenuOpen ? "opacity-100" : "opacity-0",
          isDark
            ? "bg-[linear-gradient(to_bottom,rgba(3,5,16,0.92)_0%,rgba(5,7,22,0.55)_62%,rgba(10,14,39,0.18)_84%,transparent_100%)]"
            : "bg-[linear-gradient(to_bottom,rgba(197,58,70,0.38)_0%,rgba(197,58,70,0.18)_62%,rgba(197,58,70,0.06)_84%,transparent_100%)]"
        )}
      />
      <div
        className={cn(
          "relative z-10 flex h-16 items-center justify-between sm:h-[72px]",
          siteContainerClass
        )}
      >
        <WinwinLogo />

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex lg:gap-10">
          {navLinks.map((link) => {
            const isActive = isLinkActive(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={linkClassName(link.href)}
              >
                {link.label}
                {isActive && (
                  <span
                    className={cn(
                      "absolute -top-1.5 -right-2 size-1.5 rounded-full",
                      isDark ? "bg-white" : "bg-red-800"
                    )}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <NavLoginButton variant={resolvedVariant} />
          </div>

          <motion.button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            whileTap={{ scale: 0.94 }}
            className={cn(
              "relative inline-flex size-10 items-center justify-center overflow-hidden rounded-full border backdrop-blur-sm transition-colors md:hidden",
              isDark
                ? "border-white/25 bg-white/5 text-white hover:bg-white/10"
                : "border-[#0A0E27]/15 bg-[#0A0E27]/[0.03] text-[#0A0E27] hover:bg-[#0A0E27]/5"
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.32, ease: menuEase }}
                  className="inline-flex"
                >
                  <X className="size-5" aria-hidden />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.32, ease: menuEase }}
                  className="inline-flex"
                >
                  <Menu className="size-5" aria-hidden />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: menuEase }}
            className="fixed inset-x-0 top-[72px] bottom-0 z-40 md:hidden"
          >
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: menuEase }}
              className="absolute inset-0 bg-black/30 backdrop-blur-md"
              onClick={() => setIsMenuOpen(false)}
            />

            <div className="relative mx-4 mt-4">
              <motion.nav
                initial={{ opacity: 0, y: -16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={menuSpring}
                className="overflow-hidden rounded-2xl border border-white/10 bg-black/45 p-4 text-white backdrop-blur-xl"
              >
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link, index) => {
                    const isActive = isLinkActive(pathname, link.href);

                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          ...menuSpring,
                          delay: 0.14 + index * 0.1,
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={cn(
                            "group flex min-h-11 items-center rounded-xl px-3 text-sm transition-all duration-200",
                            isActive
                              ? "bg-white/10 font-semibold text-white"
                              : "font-medium text-neutral-300 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          <span
                            className={cn(
                              "mr-3 h-1.5 w-1.5 rounded-full bg-white transition-all duration-200",
                              isActive
                                ? "scale-100 opacity-100"
                                : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-60"
                            )}
                          />
                          {link.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...menuSpring, delay: 0.48 }}
                  className="mt-4 flex justify-center border-t border-white/10 pt-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="inline-flex h-9 items-center justify-center rounded-full border border-white/25 bg-white/95 px-5 text-[13px] font-medium tracking-wide text-[#0A0E27] transition-colors hover:bg-white"
                    >
                      Log In
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
