import type { MonthlyPass } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function PassTimeTrack({
  pass,
  size = "lg",
}: {
  pass: MonthlyPass;
  size?: "sm" | "lg";
}) {
  const { from, to } = pass.access;

  return (
    <div
      role="img"
      aria-label={`${pass.name}: ${pass.hours}`}
      className={cn(
        "relative w-full overflow-hidden rounded-full bg-neutral-200",
        size === "lg" ? "h-1.5" : "h-1"
      )}
    >
      <div
        className="absolute inset-y-0 rounded-full bg-neutral-950"
        style={{ left: `${from}%`, width: `${to - from}%` }}
      />
    </div>
  );
}
