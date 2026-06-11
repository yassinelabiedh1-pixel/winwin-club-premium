import { AppointmentBookingSection } from "@/app/components/appointment-booking-section";
import { ExploreSpaceCarousel } from "@/app/components/explore-space-carousel";
import { HomeHero } from "@/app/components/home-hero";
import { PricingSection } from "@/app/components/pricing-section";
import { ContactTestimonials } from "@/components/contact-testimonials";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ScrollReveal } from "@/components/scroll-reveal";

const marqueeItems = [
  "Forerunner™",
  "aaaaaaa",
  "terra—tory™",
  "aaaaaaaa",
  "Forerunner™",
  "terra—tory™",
  "terra—tory™",
  { label: "✦ Soph...", className: "font-normal tracking-normal text-sm" },
] as const;

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-screen flex-col bg-white pt-[72px]">
        <Navbar />

        <HomeHero />

        <ScrollReveal>
          <div className="w-full shrink-0 overflow-hidden border-t border-neutral-100 py-8">
            <div className="marquee-track flex w-max items-center gap-8 text-lg font-bold tracking-widest text-neutral-700 opacity-40 grayscale">
              {[...marqueeItems, ...marqueeItems].map((item, index) =>
                typeof item === "string" ? (
                  <span key={`${item}-${index}`} className="shrink-0">
                    {item}
                  </span>
                ) : (
                  <span
                    key={`${item.label}-${index}`}
                    className={`flex shrink-0 items-center gap-1 ${item.className}`}
                  >
                    {item.label}
                  </span>
                )
              )}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <ExploreSpaceCarousel />

      <PricingSection />

      <ContactTestimonials />

      <AppointmentBookingSection />

      <Footer />
    </>
  );
}
