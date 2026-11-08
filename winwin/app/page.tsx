import { ExploreSpaceCarousel } from "@/app/components/explore-space-carousel";
import { HomeHero } from "@/app/components/home-hero";
import { PricingSection } from "@/app/components/pricing-section";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <section className="relative flex flex-col bg-white pt-[72px] lg:min-h-screen">
        <Navbar />

        <HomeHero />
      </section>

      <ExploreSpaceCarousel />

      <PricingSection />

      <Footer />
    </>
  );
}
