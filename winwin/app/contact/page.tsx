import type { Metadata } from "next";
import { Clock, Mail, Phone } from "lucide-react";

import { ContactFaq } from "@/components/contact-faq";
import { ContactForm } from "@/components/contact-form";
import { ContactTestimonials } from "@/components/contact-testimonials";
import { Footer } from "@/components/footer";
import { InstagramIcon } from "@/components/icons";
import { Navbar } from "@/components/navbar";
import { siteContainerClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact | Winwin CLUB",
  description:
    "Get in touch with Winwin CLUB — book a tour, ask a question, or just say hi.",
};

const contactDetails = [
  {
    icon: Mail,
    label: "info@w2club.com",
    href: "mailto:info@w2club.com",
  },
  {
    icon: Phone,
    label: "+33 6 12 34 56 78",
    href: "tel:+33612345678",
  },
  {
    icon: Clock,
    label: "Available 24/7",
  },
  {
    icon: InstagramIcon,
    label: "@the.winwin.club",
    href: "https://www.instagram.com/the.winwin.club/",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-x-hidden bg-[#0A0E27] text-white">
        <Navbar variant="dark" />

        <div
          className={cn(
            siteContainerClass,
            "grid grid-cols-1 gap-8 pb-12 pt-4 sm:gap-10 sm:pb-16 sm:pt-6 lg:grid-cols-2 lg:items-stretch lg:gap-16 lg:pb-28 lg:pt-8"
          )}
        >
          <div className="flex w-full flex-col justify-start lg:max-w-[400px] lg:min-h-[472px]">
            <h1 className="text-[2rem] font-semibold leading-[1.12] tracking-tight sm:text-[2.5rem] lg:text-5xl">
              Let&apos;s connect
            </h1>
            <p className="mt-4 max-w-full text-[15px] leading-[1.65] text-white/55 sm:mt-5 sm:max-w-[340px]">
              Got a question? Want to book a tour or just say hi? We&apos;d
              love to hear from you.
            </p>

            <ul className="mt-8 space-y-1 sm:mt-12 sm:space-y-5">
              {contactDetails.map((item) => {
                const Icon = item.icon;
                const content = (
                  <span className="flex min-h-11 items-center gap-3 text-[15px] text-white/85 sm:min-h-0 sm:gap-3.5">
                    <Icon className="size-[18px] shrink-0 text-white/55" />
                    <span className="break-words">{item.label}</span>
                  </span>
                );

                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="-mx-1 block rounded-lg px-1 transition-colors hover:text-white active:bg-white/5 sm:mx-0 sm:px-0 sm:active:bg-transparent"
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex w-full min-w-0 flex-col lg:min-h-[472px] lg:pb-6">
            <ContactForm />
          </div>
        </div>
      </section>

      <ContactFaq />
      <ContactTestimonials />
      <Footer />
    </>
  );
}
