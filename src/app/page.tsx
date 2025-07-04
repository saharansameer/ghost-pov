import type { Metadata } from "next";
import HeroSection from "@/components/Hero/hero-section";
import PricingSection from "@/components/Hero/pricing-section";
import { Separator } from "@/components/ui";

export const metadata: Metadata = {
  title: "GhostPOV",
  description:
    "The simplest way to get anonymous feedback on your project, resume, portfolio and more.",
};

export default function Page() {
  return (
    <div>
      <HeroSection />
      <Separator />
      <PricingSection />
    </div>
  );
}
