import { Flame, LayoutGrid, Lock, Presentation } from "lucide-react";

import { siteContainerClass } from "@/lib/layout";
import { StickyCardStack } from "@/components/sticky-card-stack";
import { cn } from "@/lib/utils";

const plans = [
  {
    icon: Flame,
    title: "Hot Desk",
    subtitle: "Sit anywhere, stay flexible",
    description:
      "Access a shared workspace whenever you need it — no booking, no hassle. Ideal for freelancers, remote workers, and digital nomads.",
  },
  {
    icon: LayoutGrid,
    title: "Dedicated Desk",
    subtitle: "Your own desk, every day",
    description:
      "Enjoy your personal workstation in an open space. Perfect for regular use, with storage and 24/7 access included.",
  },
  {
    icon: Lock,
    title: "Private Office",
    subtitle: "Focus and grow with your team",
    description:
      "Enclosed, lockable offices designed for 2–10 people. Fully furnished and customizable — ideal for startups and growing teams.",
  },
  {
    icon: Presentation,
    title: "Meeting Room",
    subtitle: "Where ideas take shape",
    description:
      "Fully equipped rooms for calls, workshops, or presentations — with whiteboards, screens, and unlimited coffee within reach.",
  },
];

function PlanCard({
  icon: Icon,
  title,
  subtitle,
  description,
}: (typeof plans)[number]) {
  return (
    <article className="rounded-2xl border border-[#EEEEEE] bg-white p-6 shadow-[0_4px_24px_rgba(10,14,39,0.05)] lg:p-8">
      <div className="flex gap-5">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#EEEEEE] bg-white lg:size-14">
          <Icon className="size-5 text-[#0A0E27] lg:size-6" strokeWidth={1.5} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-[#0A0E27] lg:text-xl">
            {title}
          </h3>
          <p className="mt-1 text-[15px] text-neutral-500">{subtitle}</p>
          <p className="mt-4 text-[15px] leading-[1.65] text-neutral-500">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}

export function PricingPlans() {
  return (
    <section id="features" className="bg-white py-20 lg:py-28">
      <div className={cn(siteContainerClass)}>
        <div className="mx-auto max-w-2xl text-center lg:max-w-xl">
          <h2 className="text-[2rem] font-semibold leading-[1.15] tracking-tight text-[#0A0E27] lg:text-[2.25rem]">
            Plans that fit how you work
          </h2>
          <p className="mt-5 text-[15px] leading-[1.65] text-neutral-500">
            From flexible hot desks to private offices — pick what suits you
            today and switch anytime.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-2xl">
          <StickyCardStack>
            {plans.map((plan) => (
              <PlanCard key={plan.title} {...plan} />
            ))}
          </StickyCardStack>
        </div>
      </div>
    </section>
  );
}
