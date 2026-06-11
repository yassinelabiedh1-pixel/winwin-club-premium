import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type WinwinLogoProps = {
  className?: string;
  size?: "default" | "lg";
  variant?: "dark" | "light";
};

export function WinwinLogo({
  className,
  size = "default",
  variant = "dark",
}: WinwinLogoProps) {
  const isLarge = size === "lg";
  const isDark = variant === "dark";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 items-center",
        isLarge ? "gap-3.5" : "gap-3",
        className
      )}
    >
      <Image
        src="/winwin-mark.png"
        alt=""
        width={isLarge ? 44 : 40}
        height={isLarge ? 44 : 40}
        priority
        aria-hidden
        className={cn(
          "shrink-0 object-contain",
          isDark && "mix-blend-lighten",
          isLarge ? "size-11" : "size-10"
        )}
      />
      <span
        className={cn(
          "font-semibold leading-none tracking-[0.14em] text-[#C53A46]",
          isLarge ? "text-[14px]" : "text-[13px]"
        )}
      >
        WINWIN CLUB
      </span>
    </Link>
  );
}
