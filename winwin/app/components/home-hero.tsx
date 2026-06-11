"use client";

import Image from "next/image";
import Link from "next/link";

import { TestimonialCarousel } from "@/app/components/testimonial-carousel";
import { ScrollReveal } from "@/components/scroll-reveal";
import { siteContainerClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function HomeHero() {
  return (
    <div className="flex w-full flex-1 items-center py-8 lg:py-12">
      <div
        className={cn(
          siteContainerClass,
          "grid w-full grid-cols-1 gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-16"
        )}
      >
        <div className="flex flex-col justify-start space-y-8 lg:col-span-5 lg:min-h-[472px] lg:justify-center">
          <ScrollReveal>
            <div>
              <h1 className="text-20 mb-6 text-[2rem] font-bold leading-[1.1] tracking-tight text-neutral-950 sm:text-[2.4rem] lg:text-[2.8rem]">
                A <span className="text-[#7C2314]">24/7</span> Open Space <br />
                For <span className="text-[#7C2314]">Professional</span>
              </h1>
              <p className="max-w-[520px] text-[15px] font-medium leading-relaxed text-neutral-600">
                Discover WinWin Club a{" "}
                <span className="font-bold text-[#7C2314]">24/7 coworking space</span>{" "}
                where productivity meets opportunity. Work, connect, and grow in a
                modern and inspiring environment.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="-mx-6 overflow-hidden sm:-mx-10 lg:-mx-0">
              <TestimonialCarousel />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.18}>
            <div>
              <Link
                href="/spaces"
                className="inline-flex items-center gap-3 rounded-full bg-[#121829] px-6 py-3 font-semibold text-white shadow-md transition hover:opacity-90"
              >
                <span>Find Your Desk</span>
                <div className="border-l border-neutral-600 pl-2">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal
          className="flex w-full flex-col lg:col-span-7 lg:min-h-[472px] lg:pb-6"
          delay={0.12}
          direction="right"
        >
          <div className="grid h-[420px] w-full flex-1 grid-cols-12 gap-4 sm:h-[500px] lg:h-full lg:min-h-[472px]">
            <div className="relative col-span-8 h-full overflow-hidden rounded-3xl bg-neutral-100 shadow-sm">
              <Image
                src="/img1.webp"
                alt="WinWin Space main area"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
              <div className="absolute top-4 right-4 cursor-pointer rounded-full bg-black/30 p-2 text-white backdrop-blur-md transition hover:bg-black/50">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between rounded-2xl bg-black/40 p-4 text-white backdrop-blur-md">
                <div>
                  <h3 className="text-sm font-bold">Forfait baccalauréat</h3>
                  <p className="text-[0.7rem] text-neutral-300">
                    Flexibilité, confort et productivité.
                  </p>
                </div>
                <span className="rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-neutral-900">
                  15 DT{" "}
                  <span className="text-[0.65rem] font-normal text-neutral-500">
                    /day
                  </span>
                </span>
              </div>
            </div>

            <div className="col-span-4 flex h-full flex-col gap-4">
              <div className="relative flex-1 overflow-hidden rounded-3xl bg-neutral-100 shadow-sm">
                <Image
                  src="/img2.webp"
                  alt="Team work setting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between rounded-xl bg-black/50 p-2 text-white backdrop-blur-sm">
                  <span className="truncate pr-1 text-[0.65rem] font-bold">
                    Forfait baccalauréat
                  </span>
                  <span className="shrink-0 rounded-lg bg-white px-2 py-0.5 text-[0.65rem] font-bold text-black">
                    150 DT
                  </span>
                </div>
              </div>

              <div className="relative flex-1 overflow-hidden rounded-3xl bg-neutral-100 shadow-sm">
                <Image
                  src="/img3.webp"
                  alt="Silent library workspace"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between rounded-xl bg-black/50 p-2 text-white backdrop-blur-sm">
                  <span className="truncate pr-1 text-[0.65rem] font-bold">
                    Forfait baccalauréat
                  </span>
                  <span className="shrink-0 rounded-lg bg-white px-2 py-0.5 text-[0.65rem] font-bold text-black">
                    150 DT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
