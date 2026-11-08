import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { CLUB_ADDRESS, CLUB_EMAIL, CLUB_LEGAL_NAME } from "@/lib/site";
import { siteContainerClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Privacy Policy | Winwin CLUB",
  description: "How Winwin Club collects and uses personal information.",
};

const sections = [
  {
    title: "Who we are",
    paragraphs: [
      `Winwin Club is operated by ${CLUB_LEGAL_NAME}, located at ${CLUB_ADDRESS}. We are responsible for the personal information described in this policy.`,
    ],
  },
  {
    title: "What we collect",
    paragraphs: [
      "When you use our contact form, we collect your name, your email address, the topic you choose and your message. We also receive any information you share when you contact us by email, phone, WhatsApp or social media.",
      "Like most websites, our hosting provider may keep technical logs, such as IP addresses and browser details, to keep the site running and secure.",
    ],
  },
  {
    title: "How we use it",
    paragraphs: [
      "We use your information to answer your questions, manage your membership or visit, and meet our legal obligations. We do not sell your personal information and we do not use it for advertising.",
    ],
  },
  {
    title: "Who we share it with",
    paragraphs: [
      "We share information only with service providers that help us run the website and handle messages, including our website host and email provider, and when the law requires it.",
      "Links to Google Maps, WhatsApp, Instagram and Facebook take you to services that have their own privacy policies.",
    ],
  },
  {
    title: "Cookies",
    paragraphs: [
      "This website does not use advertising or analytics cookies.",
    ],
  },
  {
    title: "How long we keep it",
    paragraphs: [
      "We keep personal information only for as long as we need it for the purposes above, or as long as the law requires.",
    ],
  },
  {
    title: "Your rights",
    paragraphs: [
      `You can ask to access, correct or delete your personal information, or object to how we use it, in line with applicable law, including Tunisian Organic Law No. 2004-63 on the protection of personal data. To make a request, email us at ${CLUB_EMAIL}.`,
    ],
  },
  {
    title: "Changes to this policy",
    paragraphs: [
      "We may update this policy from time to time. The latest version will always be on this page.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="relative bg-white pt-[72px]">
        <Navbar />
        <div className={cn(siteContainerClass, "py-14 lg:py-20")}>
          <div className="max-w-2xl">
            <h1 className="text-[2.4rem] font-bold leading-[1.1] tracking-tight text-neutral-950 lg:text-[3rem]">
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm text-neutral-500">
              Last updated: November 2026
            </p>

            <div className="mt-10 flex flex-col gap-8">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-lg font-semibold text-neutral-950">
                    {section.title}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-2 text-[15px] leading-relaxed text-neutral-600"
                    >
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
