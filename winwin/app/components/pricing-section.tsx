"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { siteContainerClass } from "@/lib/layout";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/scroll-reveal";

type Tier = "student" | "pro";
type PlanVariant = "daily" | "monthly" | "trimester";

const FLIP_MS = 700;
const IMAGE_CYCLE_MS = 4000;

const carouselImages = [
  { src: "/img1.webp", alt: "Coworking presentation space" },
  { src: "/img2.webp", alt: "Team collaboration area" },
  { src: "/img3.webp", alt: "Focused workspace" },
] as const;

type PlanContent = {
  price: string;
  tagline?: string;
  features: readonly string[];
};

const plans: Record<Tier, Record<PlanVariant, PlanContent>> = {
  student: {
    daily: {
      price: "15dt",
      features: [
        "Unlimited automation",
        "Basic integrations",
        "Real-time analytics",
        "Standard support",
      ],
    },
    monthly: {
      price: "330dt/month",
      tagline: "Every thing in Basic + Mobile App",
      features: [
        "Everything in Basic",
        "Premium integrations",
        "AI-powered efficiency",
        "Custom reporting",
      ],
    },
    trimester: {
      price: "460dt/month",
      tagline: "Every thing in Growth + Access to 2 Locations",
      features: [
        "Everything in Growth",
        "Dedicated account manager",
        "Advanced security controls",
        "API access & custom solutions",
      ],
    },
  },
  pro: {
    daily: {
      price: "25dt",
      features: [
        "Priority desk booking",
        "Advanced integrations",
        "Real-time analytics",
        "Priority support",
      ],
    },
    monthly: {
      price: "450dt/month",
      tagline: "Every thing in Basic + Mobile App",
      features: [
        "Everything in Basic",
        "Premium integrations",
        "AI-powered efficiency",
        "Custom reporting",
        "Meeting room credits",
      ],
    },
    trimester: {
      price: "620dt/month",
      tagline: "Every thing in Growth + Access to 2 Locations",
      features: [
        "Everything in Growth",
        "Dedicated account manager",
        "Advanced security controls",
        "API access & custom solutions",
        "Multi-location access",
      ],
    },
  },
};

const planTitles: Record<PlanVariant, string> = {
  daily: "Daily Pass",
  monthly: "Monthly Pass",
  trimester: "Trimester Pass",
};

function TierToggle({
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
        aria-label={`Pricing tier: ${tier === "pro" ? "Pro" : "Student"}`}
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
        Pro
      </span>
    </div>
  );
}

function useImageCarousel(enabled: boolean) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    setProgress(0);
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

function DailyPassImageCarousel({
  activeIndex,
  progress,
}: {
  activeIndex: number;
  progress: number;
}) {
  const image = carouselImages[activeIndex];

  return (
    <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-neutral-100 [transform:translateZ(0)]">
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

function FeatureList({
  features,
  columns = 1,
  inverted = false,
}: {
  features: readonly string[];
  columns?: 1 | 2;
  inverted?: boolean;
}) {
  return (
    <ul
      className={cn(
        "gap-x-6 gap-y-2 text-[13px] leading-relaxed",
        columns === 2 ? "grid grid-cols-2" : "flex flex-col",
        inverted ? "text-neutral-300" : "text-neutral-600"
      )}
    >
      {features.map((feature) => (
        <li key={feature}>{feature}</li>
      ))}
    </ul>
  );
}

function PlanContentBody({
  plan,
  variant,
}: {
  plan: PlanContent;
  variant: PlanVariant;
}) {
  const isDark = variant === "trimester";
  const isDaily = variant === "daily";

  return (
    <div className={cn("flex h-full min-h-0 flex-1 flex-col p-6", isDaily && "pt-5")}>
      <div className="mb-1">
        <h3
          className={cn(
            "text-base font-bold",
            isDark ? "text-white" : "text-neutral-950"
          )}
        >
          {planTitles[variant]}
        </h3>
        <p
          className={cn(
            "mt-1 text-sm",
            isDark ? "text-neutral-400" : "text-neutral-500"
          )}
        >
          {plan.price}
        </p>
      </div>

      {plan.tagline && (
        <p
          className={cn(
            "mt-3 text-sm font-semibold",
            isDark ? "text-white" : "text-neutral-950"
          )}
        >
          {plan.tagline}
        </p>
      )}

      <Link
        href="/contact"
        className={cn(
          "mt-5 block w-full rounded-md py-3 text-center text-sm font-semibold transition hover:opacity-90",
          isDaily && "bg-[#7C2314] text-white",
          variant === "monthly" && "bg-[#121829] text-white",
          isDark && "bg-white text-[#121829]"
        )}
      >
        Get in touch
      </Link>

      <div className="mt-6 flex-1">
        <p
          className={cn(
            "mb-3 text-sm font-semibold",
            isDark ? "text-white" : "text-neutral-950"
          )}
        >
          What&apos;s included?
        </p>
        <FeatureList
          features={plan.features}
          columns={isDaily ? 2 : 1}
          inverted={isDark}
        />
      </div>

      <p
        className={cn(
          "mt-auto pt-6 text-[11px]",
          isDark ? "text-neutral-500" : "text-neutral-400"
        )}
      >
        Add some disclaimer text here if necessary.
      </p>
    </div>
  );
}

function CardFace({
  variant,
  plan,
  carousel,
}: {
  variant: PlanVariant;
  plan: PlanContent;
  carousel?: { activeIndex: number; progress: number };
}) {
  const isDark = variant === "trimester";

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
        <DailyPassImageCarousel
          activeIndex={carousel.activeIndex}
          progress={carousel.progress}
        />
      )}
      <div className="flex min-h-0 flex-1 flex-col">
        <PlanContentBody plan={plan} variant={variant} />
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
  const carousel = useImageCarousel(variant === "daily");

  return (
    <div className="h-full [perspective:1200px]">
      <div
        className="relative h-full transition-transform ease-in-out [transform-style:preserve-3d]"
        style={{
          transform: tier === "pro" ? "rotateY(180deg)" : "rotateY(0deg)",
          transitionDuration: `${flipMs}ms`,
        }}
      >
        <div className="h-full [backface-visibility:hidden]">
          <CardFace
            variant={variant}
            plan={plans.student[variant]}
            carousel={variant === "daily" ? carousel : undefined}
          />
        </div>
        <div
          className="absolute inset-0 h-full [backface-visibility:hidden] [transform:rotateY(180deg)]"
          aria-hidden={tier === "student"}
        >
          <CardFace
            variant={variant}
            plan={plans.pro[variant]}
            carousel={variant === "daily" ? carousel : undefined}
          />
        </div>
      </div>
    </div>
  );
}

export function PricingSection() {
  const [tier, setTier] = useState<Tier>("pro");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const flipMs = reducedMotion ? 0 : FLIP_MS;

  return (
    <section aria-label="Pricing plans" className="bg-white py-16 lg:py-20">
      <div className={siteContainerClass}>
        <ScrollReveal className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950 lg:text-[2.5rem] lg:leading-tight">
              Plans that fit the way you work
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">
              Whether you&apos;re dropping in for the day or setting up your new
              HQ, we&apos;ve got a plan designed to move with you.
            </p>
          </div>
          <TierToggle
            tier={tier}
            onToggle={() =>
              setTier((current) => (current === "student" ? "pro" : "student"))
            }
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch">
          <ScrollReveal delay={0.05}>
            <PricingFlipCard tier={tier} variant="daily" flipMs={flipMs} />
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <PricingFlipCard tier={tier} variant="monthly" flipMs={flipMs} />
          </ScrollReveal>
          <ScrollReveal delay={0.19}>
            <PricingFlipCard tier={tier} variant="trimester" flipMs={flipMs} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
