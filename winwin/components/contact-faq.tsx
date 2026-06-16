"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { siteContainerClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

const faqs = [
  {
    id: "visit",
    question: "Can I visit before signing up?",
    answer:
      "Absolutely. Book a free tour anytime — we'll show you around, answer your questions, and let you feel the vibe before you commit.",
  },
  {
    id: "faq-1",
    question: "What are your opening hours?",
    answer:
      "We're open Monday through Friday, 9am to 6pm. Members with 24/7 access can come and go outside those hours too.",
  },
  {
    id: "faq-2",
    question: "What's the difference between a hot desk and a dedicated desk?",
    answer:
      "A hot desk is a flexible spot you can use any day. A dedicated desk is yours every day — same seat, same setup, your own storage.",
  },
  {
    id: "faq-3",
    question: "Are pets allowed?",
    answer:
      "Well-behaved pets are welcome on select days. Check with our team for the current pet-friendly schedule.",
  },
  {
    id: "faq-4",
    question: "Is the Wi-Fi really that fast?",
    answer:
      "Yes — we run enterprise-grade fiber with a backup line. Most members say it's the fastest connection they've ever had at work.",
  },
  {
    id: "faq-5",
    question: "Can I switch plans later on?",
    answer:
      "Of course. Upgrade, downgrade, or pause your plan with 30 days' notice. We keep it flexible because your needs change.",
  },
];

function FaqCard({
  faq,
  stackTop,
}: {
  faq: (typeof faqs)[number];
  stackTop: number;
}) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setValue("");
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -90% 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="sticky" style={{ top: `${stackTop}px` }}>
      <Accordion value={value} onValueChange={setValue}>
        <AccordionItem
          value={faq.id}
          className="mb-3 overflow-hidden rounded-xl border border-[#EEEEEE] bg-white shadow-sm [&_h3]:w-full"
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
      </Accordion>
    </div>
  );
}

export function ContactFaq() {
  return (
    <section className="overflow-x-hidden bg-white py-14 sm:py-20 lg:py-28">
      <div
        className={cn(
          siteContainerClass,
          "grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16"
        )}
      >
        <ScrollReveal className="lg:sticky lg:top-32 lg:pt-1">
          <h2 className="max-w-sm text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-[#0A0E27] sm:text-[2rem] lg:text-[2.25rem]">
            Quick answers before you reach out
          </h2>
          <p className="mt-4 max-w-sm text-[15px] leading-[1.65] text-neutral-500 sm:mt-5">
            Got something on your mind? Check below — or just send us a message,
            we&apos;ll take it from there.
          </p>
        </ScrollReveal>

        <div className="flex flex-col">
          {faqs.map((faq, index) => (
            <FaqCard key={faq.id} faq={faq} stackTop={80 + index * 10} />
          ))}
        </div>
      </div>
    </section>
  );
}
