import PricingSection from "@/components/Hero/pricing-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | GhostPOV",
  description: "Simple and Transparent Pricing",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PricingPage() {
  return (
    <div className="pb-20">
      <PricingSection />
    </div>
  );
}
