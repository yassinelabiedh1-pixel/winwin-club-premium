"use client";

import { Plus, X } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteContainerClass } from "@/lib/layout";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/scroll-reveal";

const faqs = [
  {
    id: "visit",
    question: "Can I visit before signing up?",
    answer:
      "Yes. Come by the club and we'll show you around and answer your questions.",
  },
  {
    id: "hours",
    question: "What are your opening hours?",
    answer: "We're open 24/7.",
  },
  {
    id: "included",
    question: "What's included with a pass?",
    answer: "Every pass includes Wi-Fi and coffee.",
  },
  {
    id: "wifi",
    question: "What's the Wi-Fi like?",
    answer: "We run on fiber with a backup line.",
  },
  {
    id: "pets",
    question: "Are pets allowed?",
    answer: "No, pets aren't allowed.",
  },
  {
    id: "pause",
    question: "Can I pause my plan?",
    answer: "Yes, you can pause your plan for up to 7 days.",
  },
  {
    id: "age",
    question: "Is there a minimum age?",
    answer:
      "Yes, members must be 18 or older. Applications from anyone under 18 are reviewed case by case.",
  },
];

export function ContactFaq() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div
        className={cn(
          siteContainerClass,
          "grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16"
        )}
      >
        <ScrollReveal className="lg:pt-1">
          <h2 className="max-w-sm text-[2rem] font-semibold leading-[1.15] tracking-tight text-[#0A0E27] lg:text-[2.25rem]">
            Quick answers before you reach out
          </h2>
          <p className="mt-5 max-w-sm text-[15px] leading-[1.65] text-neutral-500">
            Got something on your mind? Check below — or just send us a message,
            we&apos;ll take it from there.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.12} direction="right">
          <Accordion defaultValue={["visit"]} className="flex w-full flex-col gap-4">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="overflow-hidden rounded-xl border border-[#EEEEEE] bg-white shadow-none [&_h3]:w-full"
            >
              <AccordionTrigger className="min-h-14 w-full items-center justify-between gap-4 !rounded-none !border-0 bg-transparent px-6 py-6 text-left text-[15px] font-medium leading-snug text-[#0A0E27] shadow-none hover:no-underline focus-visible:!border-0 focus-visible:ring-0 focus-visible:after:hidden [&_[data-slot=accordion-trigger-icon]]:hidden">
                <span className="flex-1 pr-6">{faq.question}</span>
                <span className="relative flex size-[18px] shrink-0 items-center justify-center text-[#0A0E27]">
                  <Plus
                    aria-hidden
                    className="size-[18px] stroke-[1.5] group-aria-expanded/accordion-trigger:hidden"
                  />
                  <X
                    aria-hidden
                    className="absolute size-[18px] stroke-[1.5] hidden group-aria-expanded/accordion-trigger:block"
                  />
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0 text-[15px] leading-[1.65] text-neutral-500">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
}
