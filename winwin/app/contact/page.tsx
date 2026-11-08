import type { Metadata } from "next";

import { ContactHero } from "@/app/components/contact-hero";
import { ContactFaq } from "@/components/contact-faq";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Contact | Winwin CLUB",
  description:
    "Get in touch with Winwin CLUB to plan a visit, ask a question, or just say hi.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative bg-[#0A0E27] pt-[72px] text-white">
        <Navbar />
        <ContactHero />
      </section>

      <ContactFaq />
      <Footer />
    </>
  );
}
