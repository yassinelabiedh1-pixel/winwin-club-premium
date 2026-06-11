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
    label: "hello@yourcoworking.com",
    href: "mailto:hello@yourcoworking.com",
  },
  {
    icon: Phone,
    label: "+33 6 12 34 56 78",
    href: "tel:+33612345678",
  },
  {
    icon: Clock,
    label: "Mon–Fri: 9am to 6pm",
  },
  {
    icon: InstagramIcon,
    label: "@yourcoworking",
    href: "https://instagram.com/yourcoworking",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative bg-[#0A0E27] text-white">
        <Navbar variant="dark" />

        <div
          className={cn(
            siteContainerClass,
            "grid grid-cols-1 gap-12 pb-20 pt-2 lg:grid-cols-2 lg:items-stretch lg:gap-16 lg:pb-28 lg:pt-8"
          )}
        >
          <div className="flex max-w-[400px] flex-col justify-start lg:min-h-[472px]">
            <h1 className="text-[2.75rem] font-semibold leading-[1.1] tracking-tight lg:text-5xl">
              Let&apos;s connect
            </h1>
            <p className="mt-5 max-w-[340px] text-[15px] leading-[1.65] text-white/55">
              Got a question? Want to book a tour or just say hi? We&apos;d
              love to hear from you.
            </p>

            <ul className="mt-12 space-y-5">
              {contactDetails.map((item) => {
                const Icon = item.icon;
                const content = (
                  <span className="flex items-center gap-3.5 text-[15px] text-white/85">
                    <Icon className="size-[18px] shrink-0 text-white/55" />
                    {item.label}
                  </span>
                );

                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="transition-colors hover:text-white"
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

          <div className="flex w-full flex-col lg:min-h-[472px] lg:pb-6">
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
