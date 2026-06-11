"use client";

import { Star } from "lucide-react";

const CARD_WIDTH = 168;

const testimonials = [
  {
    name: "Liam R.",
    role: "Startup Founder",
    rating: 4.9,
    quote:
      "Hot desks during the day, events at night. I get my work done and meet great people.",
    avatar: "https://i.pravatar.cc/80?u=liam-r",
  },
  {
    name: "Nora G.",
    role: "Startup Founder",
    rating: 5,
    quote:
      "The space feels alive without being chaotic. Perfect for focus.",
    avatar: "https://i.pravatar.cc/80?u=nora-g",
  },
  {
    name: "Zoe D.",
    role: "Startup Founder",
    rating: 5,
    quote:
      "Fast Wi-Fi, great coffee, and people who actually say hello.",
    avatar: "https://i.pravatar.cc/80?u=zoe-d",
  },
  {
    name: "Marcus T.",
    role: "Startup Founder",
    rating: 4.9,
    quote:
      "Finally found a coworking spot that doesn't feel like a call center.",
    avatar: "https://i.pravatar.cc/80?u=marcus-t",
  },
  {
    name: "Elena V.",
    role: "Startup Founder",
    rating: 5,
    quote:
      "The team made onboarding effortless. Felt at home on day one.",
    avatar: "https://i.pravatar.cc/80?u=elena-v",
  },
  {
    name: "James K.",
    role: "Startup Founder",
    rating: 4.9,
    quote:
      "Best decision for my solo practice. Community without the noise.",
    avatar: "https://i.pravatar.cc/80?u=james-k",
  },
] as const;

function TestimonialCard({
  rating,
  quote,
  name,
  role,
  avatar,
}: (typeof testimonials)[number]) {
  return (
    <article
      className="flex shrink-0 flex-col justify-between rounded-xl border border-neutral-100 bg-white p-3 shadow-sm"
      style={{ width: CARD_WIDTH, minHeight: 168 }}
    >
      <div>
        <div className="mb-1.5 flex items-center gap-1 text-[11px] font-bold text-neutral-900">
          <Star className="size-2.5 fill-current stroke-none" aria-hidden />
          <span>{rating}</span>
        </div>
        <p className="line-clamp-3 text-[11px] leading-[1.4] text-neutral-500">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
      <div className="mt-auto flex items-center gap-2 pt-3">
        <img
          src={avatar}
          alt=""
          width={24}
          height={24}
          className="size-6 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <h4 className="truncate text-[11px] leading-tight font-bold text-neutral-900">
            {name}
          </h4>
          <span className="truncate text-[10px] text-neutral-400">{role}</span>
        </div>
      </div>
    </article>
  );
}

function TestimonialRow({
  idPrefix,
  ariaHidden,
}: {
  idPrefix: string;
  ariaHidden?: boolean;
}) {
  return (
    <div
      className="flex shrink-0 items-stretch gap-2.5"
      aria-hidden={ariaHidden}
    >
      {testimonials.map((testimonial, index) => (
        <TestimonialCard
          key={`${idPrefix}-${testimonial.name}-${index}`}
          {...testimonial}
        />
      ))}
    </div>
  );
}

export function TestimonialCarousel() {
  return (
    <section
      aria-label="Member testimonials"
      className="testimonial-marquee-fade relative w-full overflow-hidden"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 22%, black 58%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 22%, black 58%, transparent 100%)",
      }}
    >
      <div
        className="testimonial-marquee-left flex w-max flex-nowrap will-change-transform"
        style={{
          animation: "testimonial-marquee-left 25s linear infinite",
        }}
      >
        <TestimonialRow idPrefix="a" />
        <TestimonialRow idPrefix="b" ariaHidden />
      </div>
    </section>
  );
}
