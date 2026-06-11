import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const STICKY_TOP = 96;
const STACK_GAP = 20;

type StickyCardStackProps = {
  children: ReactNode[];
  className?: string;
};

export function StickyCardStack({ children, className }: StickyCardStackProps) {
  const count = children.length;

  return (
    <div className={cn("flex w-full flex-col gap-4 lg:gap-0", className)}>
      {children.map((child, index) => {
        const isLast = index === count - 1;

        return (
          <div
            key={index}
            className={cn(
              !isLast && "lg:min-h-[calc(100vh-12rem)]",
              isLast && "lg:min-h-[calc(50vh)] lg:pb-24"
            )}
          >
            <div
              className="relative lg:sticky"
              style={{
                top: `${STICKY_TOP + index * STACK_GAP}px`,
                zIndex: index + 1,
              }}
            >
              {child}
            </div>
          </div>
        );
      })}
    </div>
  );
}
