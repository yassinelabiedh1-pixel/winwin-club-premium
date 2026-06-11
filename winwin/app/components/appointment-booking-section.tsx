"use client";

import Image from "next/image";
import { CalendarDays, ChevronDown } from "lucide-react";

import { siteContainerClass } from "@/lib/layout";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/scroll-reveal";

const services = [
  "Hot Desk",
  "Daily Pass",
  "Monthly Pass",
  "Trimester Pass",
  "Virtual Office",
  "Book a tour",
];

const fieldClassName =
  "h-12 w-full border-0 border-b border-neutral-200 bg-transparent px-0 text-[15px] text-neutral-950 placeholder:text-neutral-400 outline-none transition-colors focus:border-neutral-950";

export function AppointmentBookingSection() {
  return (
    <section aria-label="Book your appointment" className="bg-white py-16 lg:py-24">
      <div
        className={cn(
          siteContainerClass,
          "grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
        )}
      >
        <ScrollReveal>
          <div>
            <h2 className="text-[2rem] font-bold leading-[1.1] tracking-tight text-neutral-950 sm:text-[2.25rem] lg:text-[2.5rem]">
              Book your appointment!!
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-500">
              Fill out the form below to schedule your appointment. We&apos;ll get
              back to you soon!
            </p>

            <form
              className="mt-10 space-y-8"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Write your Full Name"
                  className={fieldClassName}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email Address"
                  className={fieldClassName}
                />
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  className={fieldClassName}
                />
                <div className="relative">
                  <input
                    type="text"
                    name="date"
                    placeholder="mm/dd/yyyy"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = "text";
                    }}
                    className={cn(fieldClassName, "pr-8")}
                  />
                  <CalendarDays
                    className="pointer-events-none absolute top-1/2 right-0 size-[18px] -translate-y-1/2 text-neutral-400"
                    aria-hidden
                  />
                </div>
              </div>

              <div className="relative">
                <select
                  name="service"
                  defaultValue=""
                  className={cn(
                    fieldClassName,
                    "cursor-pointer appearance-none pr-8 text-neutral-400 [&:valid]:text-neutral-950"
                  )}
                >
                  <option value="" disabled>
                    Service...
                  </option>
                  {services.map((service) => (
                    <option key={service} value={service} className="text-neutral-950">
                      {service}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute top-1/2 right-0 size-[18px] -translate-y-1/2 text-neutral-400"
                  aria-hidden
                />
              </div>

              <textarea
                name="notes"
                placeholder="Additional Notes"
                rows={4}
                className={cn(
                  fieldClassName,
                  "min-h-[120px] resize-none py-3 leading-relaxed"
                )}
              />

              <button
                type="submit"
                className="h-[52px] w-full rounded-xl bg-[#2D3354] text-[15px] font-semibold text-white transition hover:bg-[#252a47]"
              >
                Confirm your appointment
              </button>
            </form>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.12} direction="right">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-neutral-100 sm:aspect-[5/6] lg:aspect-auto lg:h-full lg:min-h-[560px]">
            <Image
              src="/img2.webp"
              alt="Members collaborating in the coworking space"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
