"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type NavLoginButtonProps = {
  variant?: "dark" | "light";
  className?: string;
};

export function NavLoginButton({
  variant = "dark",
  className,
}: NavLoginButtonProps) {
  const isDark = variant === "dark";

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={{
        rest: { scale: 1 },
        hover: { scale: 1.03 },
        tap: { scale: 0.97 },
      }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      className="relative"
    >
      <Link
        href="/login"
        className={cn(
          "relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full border px-6 text-[15px] font-normal transition-colors",
          isDark
            ? "border-white/40 text-white"
            : "border-[#0A0E27]/30 text-[#0A0E27]",
          className
        )}
      >
        <motion.span
          aria-hidden
          className={cn(
            "absolute inset-0 rounded-full",
            isDark ? "bg-white/10" : "bg-[#0A0E27]/5"
          )}
          variants={{
            rest: { opacity: 0, scale: 0.92 },
            hover: { opacity: 1, scale: 1 },
            tap: { opacity: 1, scale: 0.96 },
          }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.span
          aria-hidden
          className={cn(
            "absolute inset-0 rounded-full bg-gradient-to-r from-transparent to-transparent",
            isDark ? "via-white/25" : "via-[#0A0E27]/10"
          )}
          variants={{
            rest: { x: "-120%", opacity: 0 },
            hover: { x: "120%", opacity: 1 },
          }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          variants={{
            rest: {
              boxShadow: isDark
                ? "0 0 0 0 rgba(255,255,255,0)"
                : "0 0 0 0 rgba(10,14,39,0)",
            },
            hover: {
              boxShadow: isDark
                ? "0 0 24px 0 rgba(255,255,255,0.18)"
                : "0 0 20px 0 rgba(10,14,39,0.12)",
            },
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
        <span className="relative z-10">Log In</span>
      </Link>
    </motion.div>
  );
}
