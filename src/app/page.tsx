import type { Metadata } from "next";
import HeroSection from "@/components/Hero/hero-section";
import PricingSection from "@/components/Hero/pricing-section";
import { XSeparator } from "@/components/server";
import { CommonFaqs } from "@/components/Hero/common-faqs";

export const metadata: Metadata = {
  title: "GhostPOV",
  description:
    "The simplest way to get anonymous feedback on your project, resume, portfolio and more.",
};

export default function Page() {
  return (
    <div>
      <HeroSection />
      <XSeparator />
      <PricingSection />
      <XSeparator />
      <CommonFaqs />
    </div>
  );
}
