"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { PassTimeTrack } from "@/components/pass-time-track";
import { PricingTierToggle } from "@/components/pricing-tier-toggle";
import { ScrollReveal } from "@/components/scroll-reveal";
import { siteContainerClass } from "@/lib/layout";
import {
  daysPasses,
  firstVisitRates,
  formatPrice,
  lowestPrice,
  monthlyPasses,
  regularRates,
  type MonthlyPass,
  type Tier,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

type PlanVariant = "monthly" | "days" | "hourly";

const FLIP_MS = 700;
const IMAGE_CYCLE_MS = 4000;

const carouselImages = [
  { src: "/img1.webp", alt: "Open coworking area" },
  { src: "/img2.webp", alt: "Members working at a shared table" },
  { src: "/img3.webp", alt: "Members working by a large window" },
] as const;

type PreviewRow = {
  id: string;
  label: string;
  detail: string;
  price: number;
  pass?: MonthlyPass;
};

type PreviewContent = {
  title: string;
  description: string;
  lowest: number;
  suffix?: string;
  cta: string;
  href: string;
  rows: PreviewRow[];
};

function getPreview(variant: PlanVariant, tier: Tier): PreviewContent {
  if (variant === "monthly") {
    return {
      title: "Monthly Passes",
      description: "A full month, at the hours that suit you.",
      lowest: lowestPrice(monthlyPasses, tier),
      suffix: "/month",
      cta: "See monthly passes",
      href: "/pricing#monthly",
      rows: monthlyPasses.map((pass) => ({
        id: pass.id,
        label: pass.name,
        detail: pass.hours,
        price: pass.prices[tier],
        pass,
      })),
    };
  }

  if (variant === "days") {
    return {
      title: "Days Passes",
      description: "Buy your days, then use them when you need them.",
      lowest: lowestPrice(daysPasses, tier),
      cta: "See days passes",
      href: "/pricing#days",
      rows: daysPasses.map((pass) => ({
        id: pass.id,
        label: pass.name,
        detail: `Valid for ${pass.validity}`,
        price: pass.prices[tier],
      })),
    };
  }

  const regularShortest = regularRates[0];
  const regularLongest = regularRates[regularRates.length - 1];

  return {
    title: "Hourly Passes",
    description: "Pay only for the time you spend with us.",
    lowest: lowestPrice([...firstVisitRates, ...regularRates], tier),
    cta: "See hourly rates",
    href: "/pricing#hourly",
    rows: [
      ...firstVisitRates.map((rate) => ({
        id: rate.id,
        label: "First visit",
        detail: rate.duration,
        price: rate.prices[tier],
      })),
      ...[regularShortest, regularLongest].map((rate) => ({
        id: rate.id,
        label: "Regular customers",
        detail: rate.duration,
        price: rate.prices[tier],
      })),
    ],
  };
}

function useImageCarousel(enabled: boolean) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / IMAGE_CYCLE_MS, 1);
      setProgress(p);

      if (p >= 1) {
        setActiveIndex((i) => (i + 1) % carouselImages.length);
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [activeIndex, enabled]);

  return { activeIndex, progress };
}

function CardImageCarousel({
  activeIndex,
  progress,
}: {
  activeIndex: number;
  progress: number;
}) {
  const image = carouselImages[activeIndex];

  return (
    <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-neutral-100 [transform:translateZ(0)]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover [backface-visibility:hidden]"
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      <div
        className="absolute top-4 right-4 h-1 w-24 overflow-hidden rounded-full bg-white/30 backdrop-blur-sm"
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Image carousel progress"
      >
        <div
          className="h-full rounded-full bg-white transition-[width] duration-75 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}

function PreviewBody({
  preview,
  variant,
}: {
  preview: PreviewContent;
  variant: PlanVariant;
}) {
  const isDark = variant === "hourly";

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col p-6">
      <h3
        className={cn(
          "text-base font-bold",
          isDark ? "text-white" : "text-neutral-950"
        )}
      >
        {preview.title}
      </h3>
      <p
        className={cn(
          "mt-1 text-sm",
          isDark ? "text-neutral-400" : "text-neutral-500"
        )}
      >
        {preview.description}
      </p>

      <p
        className={cn(
          "mt-4 text-sm",
          isDark ? "text-neutral-400" : "text-neutral-500"
        )}
      >
        From{" "}
        <span
          className={cn(
            "text-2xl font-bold tracking-tight",
            isDark ? "text-white" : "text-neutral-950"
          )}
        >
          {formatPrice(preview.lowest)}
        </span>
        {preview.suffix && ` ${preview.suffix}`}
      </p>

      <ul
        className={cn(
          "mt-4 mb-6 flex flex-1 flex-col divide-y border-t",
          isDark
            ? "divide-white/10 border-white/10"
            : "divide-neutral-100 border-neutral-100"
        )}
      >
        {preview.rows.map((row) => (
          <li
            key={row.id}
            className="flex flex-1 items-center justify-between gap-4 py-2.5"
          >
            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  "text-[13px] font-semibold",
                  isDark ? "text-white" : "text-neutral-950"
                )}
              >
                {row.label}
              </p>
              <p
                className={cn(
                  "text-xs",
                  isDark ? "text-neutral-400" : "text-neutral-500"
                )}
              >
                {row.detail}
              </p>
              {row.pass && (
                <div className="mt-1.5">
                  <PassTimeTrack pass={row.pass} size="sm" />
                </div>
              )}
            </div>
            <span
              className={cn(
                "shrink-0 text-sm font-semibold",
                isDark ? "text-white" : "text-neutral-950"
              )}
            >
              {formatPrice(row.price)}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={preview.href}
        className={cn(
          "mt-auto block w-full rounded-md py-3 text-center text-sm font-semibold transition hover:opacity-90",
          variant === "monthly" && "bg-[#121829] text-white",
          variant === "days" && "bg-[#7C2314] text-white",
          isDark && "bg-white text-[#121829]"
        )}
      >
        {preview.cta}
      </Link>
    </div>
  );
}

function CardFace({
  variant,
  tier,
  carousel,
}: {
  variant: PlanVariant;
  tier: Tier;
  carousel?: { activeIndex: number; progress: number };
}) {
  const isDark = variant === "hourly";

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-lg border",
        isDark
          ? "border-neutral-800 bg-[#121829]"
          : "border-neutral-200 bg-white"
      )}
    >
      {carousel && (
        <CardImageCarousel
          activeIndex={carousel.activeIndex}
          progress={carousel.progress}
        />
      )}
      <div className="flex min-h-0 flex-1 flex-col">
        <PreviewBody preview={getPreview(variant, tier)} variant={variant} />
      </div>
    </div>
  );
}

function PricingFlipCard({
  tier,
  variant,
  flipMs,
}: {
  tier: Tier;
  variant: PlanVariant;
  flipMs: number;
}) {
  const carousel = useImageCarousel(variant === "days");
  const cardCarousel = variant === "days" ? carousel : undefined;

  return (
    <div className="h-full [perspective:1200px]">
      <div
        className="relative h-full transition-transform ease-in-out [transform-style:preserve-3d]"
        style={{
          transform: tier === "pro" ? "rotateY(180deg)" : "rotateY(0deg)",
          transitionDuration: `${flipMs}ms`,
        }}
      >
        <div
          className="h-full [backface-visibility:hidden]"
          inert={tier === "pro"}
        >
          <CardFace variant={variant} tier="student" carousel={cardCarousel} />
        </div>
        <div
          className="absolute inset-0 h-full [backface-visibility:hidden] [transform:rotateY(180deg)]"
          inert={tier === "student"}
        >
          <CardFace variant={variant} tier="pro" carousel={cardCarousel} />
        </div>
      </div>
    </div>
  );
}

export function PricingSection() {
  const [tier, setTier] = useState<Tier>("pro");
  const reducedMotion = useReducedMotion();

  const flipMs = reducedMotion ? 0 : FLIP_MS;

  return (
    <section
      id="pricing"
      aria-label="Pricing plans"
      className="bg-white py-16 lg:py-20"
    >
      <div className={siteContainerClass}>
        <ScrollReveal className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950 lg:text-[2.5rem] lg:leading-tight">
              Plans that fit the way you work
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">
              By the month, by the day or by the hour. Here&apos;s a quick look
              at our passes, with every plan and condition on the pricing page.
            </p>
          </div>
          <PricingTierToggle
            tier={tier}
            onToggle={() =>
              setTier((current) => (current === "student" ? "pro" : "student"))
            }
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch">
          <ScrollReveal delay={0.05}>
            <PricingFlipCard tier={tier} variant="monthly" flipMs={flipMs} />
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <PricingFlipCard tier={tier} variant="days" flipMs={flipMs} />
          </ScrollReveal>
          <ScrollReveal delay={0.19}>
            <PricingFlipCard tier={tier} variant="hourly" flipMs={flipMs} />
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.1} className="mt-10 flex justify-center">
          <Link
            href="/pricing"
            className="inline-flex items-center rounded-full bg-[#121829] px-6 py-3 font-semibold text-white shadow-md transition hover:opacity-90"
          >
            View all plans and conditions
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
