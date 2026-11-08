"use client";

import { MapPin } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { ScrollReveal } from "@/components/scroll-reveal";
import { siteContainerClass } from "@/lib/layout";
import { CLUB_MAPS_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ContactHero() {
  return (
    <div
      className={cn(
        siteContainerClass,
        "grid grid-cols-1 gap-12 pb-20 pt-2 lg:grid-cols-2 lg:items-stretch lg:gap-16 lg:pb-28 lg:pt-8"
      )}
    >
      <ScrollReveal className="flex max-w-[400px] flex-col justify-start lg:min-h-[472px]">
        <h1 className="text-[2.75rem] font-semibold leading-[1.1] tracking-tight lg:text-5xl">
          Let&apos;s connect
        </h1>
        <p className="mt-5 max-w-[340px] text-[15px] leading-[1.65] text-white/55">
          Got a question? Want to book a tour or just say hi? We&apos;d love to
          hear from you.
        </p>

        <a
          href={CLUB_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 flex items-center gap-3.5 text-[15px] text-white/85 transition-colors hover:text-white"
        >
          <MapPin aria-hidden className="size-[18px] shrink-0 text-white/55" />
          Find us on Google Maps
        </a>
      </ScrollReveal>

      <ScrollReveal
        className="flex w-full flex-col lg:min-h-[472px] lg:pb-6"
        delay={0.12}
        direction="right"
      >
        <ContactForm />
      </ScrollReveal>
    </div>
  );
}
