"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ScrollReveal } from "@/components/scroll-reveal";
import { siteContainerClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function HomeHero() {
  return (
    <div className="flex w-full flex-1 items-center pt-6 pb-10 lg:py-12">
      <div
        className={cn(
          siteContainerClass,
          "grid w-full grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-8 xl:gap-16"
        )}
      >
        <div className="flex flex-col justify-start space-y-6 lg:col-span-5 lg:min-h-[472px] lg:justify-center lg:space-y-8">
          <ScrollReveal>
            <div>
              <h1 className="mb-4 text-[2rem] font-bold leading-[1.1] tracking-tight text-neutral-950 sm:text-[2.4rem] lg:mb-6 lg:text-[2.8rem]">
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
            <div>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-3 rounded-full bg-[#121829] px-6 py-3 font-semibold text-white shadow-md transition hover:opacity-90"
              >
                <span>Check Pricing</span>
                <div className="border-l border-neutral-600 pl-2">
                  <ArrowRight aria-hidden className="h-4 w-4 text-white" />
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
          <div className="grid w-full grid-cols-2 gap-3 sm:h-[460px] sm:grid-cols-12 sm:gap-4 lg:h-full lg:min-h-[472px] lg:flex-1">
            <div className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-3xl bg-neutral-100 shadow-sm sm:col-span-8 sm:aspect-auto sm:h-full">
              <Image
                src="/img1.webp"
                alt="WinWin Space main area"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 66vw"
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
              {/* Pricing hidden for now.
              <span className="rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-neutral-900">
                15 DT{" "}
                <span className="text-[0.65rem] font-normal text-neutral-500">
                  /day
                </span>
              </span>
              */}
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-3 sm:col-span-4 sm:flex sm:h-full sm:flex-col sm:gap-4">
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-neutral-100 shadow-sm sm:aspect-auto sm:flex-1">
                <Image
                  src="/img2.webp"
                  alt="Team work setting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                {/* Pricing hidden for now.
                <span className="shrink-0 rounded-lg bg-white px-2 py-0.5 text-[0.65rem] font-bold text-black">
                  150 DT
                </span>
                */}
              </div>

              <div className="relative aspect-square overflow-hidden rounded-3xl bg-neutral-100 shadow-sm sm:aspect-auto sm:flex-1">
                <Image
                  src="/img3.webp"
                  alt="Silent library workspace"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                {/* Pricing hidden for now.
                <span className="shrink-0 rounded-lg bg-white px-2 py-0.5 text-[0.65rem] font-bold text-black">
                  150 DT
                </span>
                */}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
