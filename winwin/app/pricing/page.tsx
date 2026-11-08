import type { Metadata } from "next";

import { PricingPageContent } from "@/app/components/pricing-page-content";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Pricing | Winwin CLUB",
  description:
    "Monthly, days and hourly passes at Winwin CLUB, with Professional and Student prices in Tunisian dinars.",
};

export default function PricingPage() {
  return (
    <>
      <PricingPageContent />
      <Footer />
    </>
  );
}
