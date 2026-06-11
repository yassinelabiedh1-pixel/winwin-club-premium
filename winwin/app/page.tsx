import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { PricingPlans } from "@/components/pricing-plans";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <Navbar variant="light" />
      <main className="flex-1">
        <PricingPlans />
      </main>
      <Footer />
    </div>
  );
}
