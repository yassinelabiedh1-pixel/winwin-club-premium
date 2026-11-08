"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";

import { Navbar } from "@/components/navbar";
import { PassTimeTrack } from "@/components/pass-time-track";
import { ScrollReveal } from "@/components/scroll-reveal";
import { siteContainerClass } from "@/lib/layout";
import {
  daysPasses,
  dayTicks,
  firstVisitRates,
  formatPrice,
  lowestPrice,
  monthlyPasses,
  pricePerDay,
  regularRates,
  type HourlyRate,
  type Tier,
} from "@/lib/pricing";
import { CLUB_MAPS_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

const allHourlyRates = [...firstVisitRates, ...regularRates];

const sectionLinks = [
  { href: "#monthly", label: "Monthly" },
  { href: "#days", label: "Days Pack" },
  { href: "#hourly", label: "Hourly" },
];

const tierOptions: { value: Tier; label: string }[] = [
  { value: "pro", label: "Professional" },
  { value: "student", label: "Student" },
];

const rowWithMiddleGrid = "md:grid-cols-[minmax(0,1fr)_220px_130px] md:gap-8";

function formatPerDay(amount: number) {
  return `${Number.isInteger(amount) ? amount : amount.toFixed(1)} DT`;
}

function AnimatedPrice({
  amount,
  className,
}: {
  amount: number;
  className?: string;
}) {
  return (
    <motion.span
      key={amount}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("inline-block", className)}
    >
      {formatPrice(amount)}
    </motion.span>
  );
}

function TierSegmented({
  tier,
  onChange,
}: {
  tier: Tier;
  onChange: (tier: Tier) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Show prices for"
      className="flex rounded-full bg-neutral-100 p-1"
    >
      {tierOptions.map((option) => {
        const selected = tier === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
              selected ? "text-white" : "text-neutral-500 hover:text-neutral-950"
            )}
          >
            {selected && (
              <motion.span
                layoutId="pricing-tier-pill"
                aria-hidden
                className="absolute inset-0 rounded-full bg-[#121829]"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function PricingHero({ tier }: { tier: Tier }) {
  const overview = [
    {
      href: "#monthly",
      title: "Monthly",
      text: "A month of access, at the hours of your pass",
      amount: lowestPrice(monthlyPasses, tier),
      suffix: "/month",
    },
    {
      href: "#days",
      title: "Days Pack",
      text: "A set number of days, used when you need them",
      amount: lowestPrice(daysPasses, tier),
    },
    {
      href: "#hourly",
      title: "Hourly",
      text: "Pay according to how long you stay",
      amount: lowestPrice(allHourlyRates, tier),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0A0E27] pt-[72px] text-white">
      <Image
        src="/img1.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[#0A0E27] via-[#0A0E27]/85 to-[#0A0E27]/40"
      />
      <Navbar variant="dark" />

      <div className={cn(siteContainerClass, "relative pt-14 pb-24 lg:pt-20")}>
        <ScrollReveal className="max-w-2xl">
          <h1 className="text-[2.4rem] font-bold leading-[1.1] tracking-tight lg:text-[3.4rem]">
            Plans and pricing
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-300">
            Come for a month, a few days or a few hours. Every pass below shows
            exactly when you can use it and what it costs, in Tunisian dinars
            (DT).
          </p>
        </ScrollReveal>

        <ScrollReveal
          delay={0.1}
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {overview.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex flex-col rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md transition hover:bg-white/15"
            >
              <span className="flex items-center justify-between text-sm font-semibold">
                {item.title}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </span>
              <span className="mt-3 text-sm text-neutral-300">
                From{" "}
                <AnimatedPrice
                  amount={item.amount}
                  className="text-2xl font-bold tracking-tight text-white"
                />
                {item.suffix && ` ${item.suffix}`}
              </span>
              <span className="mt-2 text-[13px] leading-snug text-neutral-300">
                {item.text}
              </span>
            </a>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

function StickyControls({
  tier,
  onChange,
}: {
  tier: Tier;
  onChange: (tier: Tier) => void;
}) {
  return (
    <div className="sticky top-20 z-40 mx-auto -mt-7 w-[calc(100%-2rem)] max-w-[1168px]">
      <div className="flex items-center justify-center gap-2 rounded-full border border-neutral-200/70 bg-white/90 p-2 shadow-lg shadow-neutral-900/5 backdrop-blur-xl sm:justify-between">
        <nav
          aria-label="Pricing categories"
          className="hidden items-center sm:flex"
        >
          {sectionLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950 sm:px-4"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <TierSegmented tier={tier} onChange={onChange} />
      </div>
    </div>
  );
}

function PassFinder({ tier }: { tier: Tier }) {
  const [fullAccess, extended, night, morning] = monthlyPasses;
  const items = [
    {
      need: "I'm here most days",
      answer: fullAccess.name,
      href: "#monthly",
      price: `${formatPrice(fullAccess.prices[tier])} /month`,
    },
    {
      need: "I work afternoons and evenings",
      answer: extended.name,
      href: "#monthly",
      price: `${formatPrice(extended.prices[tier])} /month`,
    },
    {
      need: "I come in after work",
      answer: night.name,
      href: "#monthly",
      price: `${formatPrice(night.prices[tier])} /month`,
    },
    {
      need: "I work in the mornings",
      answer: morning.name,
      href: "#monthly",
      price: `${formatPrice(morning.prices[tier])} /month`,
    },
    {
      need: "I come a few days at a time",
      answer: "Days Pack Pass",
      href: "#days",
      price: `From ${formatPrice(lowestPrice(daysPasses, tier))}`,
    },
    {
      need: "I just need a few hours",
      answer: "Hourly Passes",
      href: "#hourly",
      price: `From ${formatPrice(lowestPrice(allHourlyRates, tier))}`,
    },
  ];

  return (
    <PricingCategory
      id="finder"
      title="Which pass fits you?"
      description="Start with how you plan to use the space."
      first
    >
      <ul className="divide-y divide-neutral-200 border-t border-neutral-200">
        {items.map((item) => (
          <li key={item.need}>
            <a
              href={item.href}
              className="group flex items-center justify-between gap-4 py-4"
            >
              <span className="min-w-0">
                <span className="block font-semibold text-neutral-950 group-hover:underline">
                  {item.answer}
                </span>
                <span className="mt-0.5 block text-sm text-neutral-500">
                  {item.need}
                </span>
              </span>
              <span className="shrink-0 text-sm text-neutral-700">
                {item.price}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </PricingCategory>
  );
}

function PricingCategory({
  id,
  title,
  description,
  first = false,
  children,
}: {
  id: string;
  title: string;
  description: string;
  first?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-52 md:scroll-mt-40"
    >
      <div className={siteContainerClass}>
        <ScrollReveal
          className={cn(
            "grid grid-cols-1 gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16",
            first
              ? "pt-16 pb-14 lg:pt-20 lg:pb-16"
              : "border-t border-neutral-200 py-14 lg:py-16"
          )}
        >
          <div>
            <h2
              id={`${id}-heading`}
              className="text-2xl font-bold tracking-tight text-neutral-950"
            >
              {title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              {description}
            </p>
          </div>
          <div className="min-w-0">{children}</div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function RowPrice({
  amount,
  suffix,
  saving,
}: {
  amount: number;
  suffix?: string;
  saving?: number;
}) {
  return (
    <div className="text-right">
      <p className="whitespace-nowrap text-sm text-neutral-500">
        <AnimatedPrice
          amount={amount}
          className="text-lg font-semibold text-neutral-950"
        />
        {suffix && ` ${suffix}`}
      </p>
      {saving ? (
        <p className="text-xs text-neutral-500">Save {formatPrice(saving)}</p>
      ) : null}
    </div>
  );
}

function DayAxis() {
  return (
    <div aria-hidden className="relative h-4 text-xs text-neutral-500">
      {dayTicks.map((tick) => (
        <span
          key={tick.label}
          className={cn(
            "absolute top-0 whitespace-nowrap",
            tick.at === 0 && "left-0",
            tick.at === 100 && "right-0",
            tick.at > 0 && tick.at < 100 && "-translate-x-1/2"
          )}
          style={
            tick.at > 0 && tick.at < 100 ? { left: `${tick.at}%` } : undefined
          }
        >
          {tick.label}
        </span>
      ))}
    </div>
  );
}

function studentSaving(prices: Record<Tier, number>, tier: Tier) {
  return tier === "student" ? prices.pro - prices.student : 0;
}

function MonthlySection({ tier }: { tier: Tier }) {
  return (
    <PricingCategory
      id="monthly"
      title="Monthly Passes"
      description="Valid for one month. Each pass gives you access only during its own hours."
    >
      <div className={cn("mb-4 md:grid", rowWithMiddleGrid)}>
        <span className="hidden md:block" />
        <DayAxis />
        <span className="hidden md:block" />
      </div>

      <ul className="divide-y divide-neutral-200 border-t border-neutral-200">
        {monthlyPasses.map((pass) => (
          <li
            key={pass.id}
            className={cn(
              "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 py-5",
              rowWithMiddleGrid
            )}
          >
            <div className="min-w-0">
              <h3 className="font-semibold text-neutral-950">{pass.name}</h3>
              <p className="mt-0.5 text-sm text-neutral-500">{pass.hours}</p>
            </div>
            <div className="col-span-2 row-start-2 md:col-span-1 md:row-start-auto">
              <PassTimeTrack pass={pass} />
            </div>
            <RowPrice
              amount={pass.prices[tier]}
              suffix="/month"
              saving={studentSaving(pass.prices, tier)}
            />
          </li>
        ))}
      </ul>
    </PricingCategory>
  );
}

function DaysSection({ tier }: { tier: Tier }) {
  return (
    <PricingCategory
      id="days"
      title="Days Pack Pass"
      description="Use your days whenever you like. They don't have to be consecutive. Each pass can be used throughout its validity period, starting from the activation date."
    >
      <ul className="divide-y divide-neutral-200 border-t border-neutral-200">
        {daysPasses.map((pass) => (
          <li
            key={pass.id}
            className={cn(
              "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 py-5",
              rowWithMiddleGrid
            )}
          >
            <div className="min-w-0">
              <h3 className="font-semibold text-neutral-950">{pass.name}</h3>
              <p className="mt-0.5 text-sm text-neutral-500">
                Valid for {pass.validity}
              </p>
            </div>
            <p className="col-span-2 row-start-2 text-sm text-neutral-500 md:col-span-1 md:row-start-auto">
              {formatPerDay(pricePerDay(pass, tier))} per day
            </p>
            <RowPrice
              amount={pass.prices[tier]}
              saving={studentSaving(pass.prices, tier)}
            />
          </li>
        ))}
      </ul>
    </PricingCategory>
  );
}

function HourlyGroup({
  title,
  note,
  rates,
  tier,
}: {
  title: string;
  note: string;
  rates: HourlyRate[];
  tier: Tier;
}) {
  return (
    <div>
      <h3 className="font-semibold text-neutral-950">{title}</h3>
      <p className="mt-0.5 mb-4 text-sm text-neutral-500">{note}</p>
      <ul className="divide-y divide-neutral-200 border-t border-neutral-200">
        {rates.map((rate) => (
          <li
            key={rate.id}
            className="flex items-center justify-between gap-4 py-3.5"
          >
            <span className="text-sm text-neutral-700">{rate.duration}</span>
            <RowPrice
              amount={rate.prices[tier]}
              saving={studentSaving(rate.prices, tier)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function HourlySection({ tier }: { tier: Tier }) {
  return (
    <PricingCategory
      id="hourly"
      title="Hourly Passes"
      description="The rate depends on your total time on site, and on whether it's your first visit."
    >
      <div className="flex flex-col gap-10">
        <HourlyGroup
          title="First Visit"
          note="Applies only to your first visit."
          rates={firstVisitRates}
          tier={tier}
        />
        <HourlyGroup
          title="Regular Customers"
          note="Applies from your second visit."
          rates={regularRates}
          tier={tier}
        />
      </div>
    </PricingCategory>
  );
}

const goodToKnow = [
  { label: "Included with every pass", value: "Wi-Fi and coffee" },
  { label: "Pausing your plan", value: "Up to 7 days" },
  { label: "Minimum age", value: "18, or case by case on application" },
];

function GoodToKnowSection() {
  return (
    <PricingCategory
      id="good-to-know"
      title="Good to know"
      description="A few things worth checking before you join."
    >
      <ul className="divide-y divide-neutral-200 border-t border-neutral-200">
        {goodToKnow.map((item) => (
          <li
            key={item.label}
            className="flex items-center justify-between gap-4 py-3.5"
          >
            <span className="text-sm text-neutral-700">{item.label}</span>
            <span className="text-right text-sm font-semibold text-neutral-950">
              {item.value}
            </span>
          </li>
        ))}
      </ul>
    </PricingCategory>
  );
}

function PricingCta() {
  return (
    <section>
      <div className={siteContainerClass}>
        <ScrollReveal className="flex flex-col items-start justify-between gap-6 border-t border-neutral-200 py-14 md:flex-row md:items-center lg:py-16">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
              Visit us to get your membership
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Come by WinWin Club and we&apos;ll help you choose the right pass.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-5">
            <Link
              href="/contact"
              className="text-sm font-semibold text-neutral-700 transition hover:text-neutral-950"
            >
              Get in touch
            </Link>
            <a
              href={CLUB_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Get directions
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function PricingPageContent() {
  const [tier, setTier] = useState<Tier>("pro");

  return (
    <>
      <PricingHero tier={tier} />
      <div className="relative bg-white">
        <StickyControls tier={tier} onChange={setTier} />
        <PassFinder tier={tier} />
        <MonthlySection tier={tier} />
        <DaysSection tier={tier} />
        <HourlySection tier={tier} />
        <GoodToKnowSection />
        <PricingCta />
      </div>
    </>
  );
}
