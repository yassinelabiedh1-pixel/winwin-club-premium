"use client";

import { Star } from "lucide-react";

import { siteContainerClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Liam R.",
    role: "Startup Founder",
    rating: 4.9,
    quote: "Booked a tour on a whim — ended up signing up the same week.",
    avatar: "https://i.pravatar.cc/80?u=liam-r",
  },
  {
    name: "Nora G.",
    role: "Startup Founder",
    rating: 5,
    quote: "The space feels alive without being chaotic. Perfect for focus.",
    avatar: "https://i.pravatar.cc/80?u=nora-g",
  },
  {
    name: "Zoe D.",
    role: "Startup Founder",
    rating: 5,
    quote: "Fast Wi-Fi, great coffee, and people who actually say hello.",
    avatar: "https://i.pravatar.cc/80?u=zoe-d",
  },
  {
    name: "Marcus T.",
    role: "Startup Founder",
    rating: 4.9,
    quote: "Finally found a coworking spot that doesn't feel like a call center.",
    avatar: "https://i.pravatar.cc/80?u=marcus-t",
  },
  {
    name: "Elena V.",
    role: "Startup Founder",
    rating: 5,
    quote: "The team made onboarding effortless. Felt at home on day one.",
    avatar: "https://i.pravatar.cc/80?u=elena-v",
  },
  {
    name: "James K.",
    role: "Startup Founder",
    rating: 4.9,
    quote: "Best decision for my solo practice. Community without the noise.",
    avatar: "https://i.pravatar.cc/80?u=james-k",
  },
  {
    name: "Priya S.",
    role: "Startup Founder",
    rating: 5,
    quote: "Meeting rooms are always ready. No awkward booking hassles.",
    avatar: "https://i.pravatar.cc/80?u=priya-s",
  },
  {
    name: "Alex M.",
    role: "Startup Founder",
    rating: 4.9,
    quote: "Toured three spaces — this was the only one that felt right.",
    avatar: "https://i.pravatar.cc/80?u=alex-m",
  },
];

type Testimonial = (typeof testimonials)[number];

function TestimonialCard({
  name,
  role,
  rating,
  quote,
  avatar,
  className,
}: Testimonial & { className?: string }) {
  return (
    <article
      className={cn(
        "flex w-[300px] shrink-0 flex-col rounded-xl border border-[#EEEEEE] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:w-[320px] lg:p-7",
        className
      )}
    >
      <div className="flex items-center gap-1.5 text-[#0A0E27]">
        <Star className="size-3.5 fill-current stroke-none" />
        <span className="text-[13px] font-semibold">{rating}</span>
      </div>

      <p className="mt-5 flex-1 text-[15px] leading-[1.65] text-[#0A0E27]">
        &ldquo;{quote}&rdquo;
      </p>

      <div className="mt-6 flex items-center gap-3">
        <img
          src={avatar}
          alt=""
          width={40}
          height={40}
          className="size-10 shrink-0 rounded-full object-cover"
        />
        <div>
          <p className="text-[14px] font-semibold text-[#0A0E27]">{name}</p>
          <p className="text-[13px] text-neutral-500">{role}</p>
        </div>
      </div>
    </article>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  offset = false,
}: {
  items: Testimonial[];
  direction?: "left" | "right";
  offset?: boolean;
}) {
  const loop = [...items, ...items];

  return (
    <div className={cn("w-full overflow-hidden", offset && "pl-8 sm:pl-16")}>
      <div
        className={cn(
          "flex w-max gap-4 will-change-transform",
          direction === "right"
            ? "testimonial-marquee-right"
            : "testimonial-marquee-left"
        )}
      >
        {loop.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.name}-${index}`}
            {...testimonial}
          />
        ))}
      </div>
    </div>
  );
}

export function ContactTestimonials() {
  const rowOne = testimonials.slice(0, 4);
  const rowTwo = testimonials.slice(4, 8);

  return (
    <section className="overflow-hidden bg-white pb-20 lg:pb-28">
      <div className={cn(siteContainerClass)}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[2rem] font-semibold leading-[1.15] tracking-tight text-[#0A0E27] lg:text-[2.25rem]">
            Still unsure? Here&apos;s what our members say.
          </h2>
          <p className="mt-5 text-[15px] leading-[1.65] text-neutral-500">
            Real words from people who booked a tour — and never looked back.
          </p>
        </div>
      </div>

      <div className="mt-14 w-full space-y-4">
        <MarqueeRow items={rowOne} direction="right" />
        <MarqueeRow items={rowTwo} direction="left" offset />
      </div>
    </section>
  );
}
