"use client";

import type { Tier } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function PricingTierToggle({
  tier,
  onToggle,
}: {
  tier: Tier;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={cn(
          "text-sm transition-colors",
          tier === "student"
            ? "font-semibold text-neutral-950"
            : "font-medium text-neutral-400"
        )}
      >
        Student
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={tier === "pro"}
        aria-label={`Showing ${tier === "pro" ? "Professional" : "Student"} prices`}
        onClick={onToggle}
        className="relative h-7 w-[52px] shrink-0 rounded-full bg-neutral-950 transition-colors"
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-transform duration-300 ease-out",
            tier === "pro" && "translate-x-[22px]"
          )}
        />
      </button>
      <span
        className={cn(
          "text-sm transition-colors",
          tier === "pro"
            ? "font-semibold text-neutral-950"
            : "font-medium text-neutral-400"
        )}
      >
        Professional
      </span>
    </div>
  );
}
