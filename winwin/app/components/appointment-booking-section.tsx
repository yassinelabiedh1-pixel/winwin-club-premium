"use client";

import Image from "next/image";
import { CalendarDays, ChevronDown } from "lucide-react";
import { useState } from "react";

import { FormHoneypot } from "@/components/form-honeypot";
import { siteContainerClass } from "@/lib/layout";
import { CLUB_MAPS_URL } from "@/lib/site";
import { useFormSubmit } from "@/lib/use-form-submit";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/scroll-reveal";

const services = ["Monthly Pass", "Days Pass", "Hourly Pass", "Book a tour"];

function todayInputValue() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

const fieldClassName =
  "h-12 w-full border-0 border-b border-neutral-200 bg-transparent px-0 text-[15px] text-neutral-950 placeholder:text-neutral-400 outline-none transition-colors focus:border-neutral-950";

export function AppointmentBookingSection() {
  const { status, handleSubmit, reset } = useFormSubmit("booking");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const isSending = status === "sending";

  function handleReset() {
    setShowDatePicker(false);
    reset();
  }

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

            {status === "success" ? (
              <div role="status" className="mt-10 border-t border-neutral-200 pt-8">
                <p className="text-xl font-semibold text-neutral-950">
                  Request received
                </p>
                <p className="mt-2 text-[15px] text-neutral-600">
                  We&apos;ll get back to you to confirm your appointment.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-5 text-sm font-semibold text-neutral-950 underline underline-offset-4"
                >
                  Send another request
                </button>
              </div>
            ) : (
            <form className="relative mt-10 space-y-8" onSubmit={handleSubmit}>
              <FormHoneypot />
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <input
                  type="text"
                  name="fullName"
                  required
                  maxLength={120}
                  autoComplete="name"
                  aria-label="Full name"
                  placeholder="Write your Full Name"
                  className={fieldClassName}
                />
                <input
                  type="email"
                  name="email"
                  required
                  maxLength={200}
                  autoComplete="email"
                  aria-label="Email address"
                  placeholder="Enter your Email Address"
                  className={fieldClassName}
                />
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <input
                  type="tel"
                  name="phone"
                  maxLength={40}
                  autoComplete="tel"
                  aria-label="Phone number (optional)"
                  placeholder="Enter your phone number"
                  className={fieldClassName}
                />
                <div className="relative">
                  <input
                    type={showDatePicker ? "date" : "text"}
                    min={showDatePicker ? todayInputValue() : undefined}
                    name="date"
                    required
                    aria-label="Preferred date"
                    placeholder="Choose a date"
                    onFocus={() => setShowDatePicker(true)}
                    onBlur={(e) => {
                      if (!e.target.value) setShowDatePicker(false);
                    }}
                    className={cn(fieldClassName, "pr-8")}
                  />
                  {!showDatePicker && (
                    <CalendarDays
                      className="pointer-events-none absolute top-1/2 right-0 size-[18px] -translate-y-1/2 text-neutral-400"
                      aria-hidden
                    />
                  )}
                </div>
              </div>

              <div className="relative">
                <select
                  name="service"
                  required
                  aria-label="Service"
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
                maxLength={5000}
                aria-label="Additional notes (optional)"
                placeholder="Additional Notes"
                rows={4}
                className={cn(
                  fieldClassName,
                  "min-h-[120px] resize-none py-3 leading-relaxed"
                )}
              />

              <button
                type="submit"
                disabled={isSending}
                className="h-[52px] w-full rounded-xl bg-[#2D3354] text-[15px] font-semibold text-white transition hover:bg-[#252a47] disabled:opacity-60"
              >
                {isSending ? "Sending..." : "Confirm your appointment"}
              </button>

              {status === "error" && (
                <p role="alert" className="text-sm text-neutral-700">
                  We couldn&apos;t send your request. Please try again, or{" "}
                  <a
                    href={CLUB_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline underline-offset-4"
                  >
                    visit us at the club
                  </a>
                  .
                </p>
              )}
            </form>
            )}
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
