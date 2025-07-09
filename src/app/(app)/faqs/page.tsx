import { CommonFaqs } from "@/components/Hero/common-faqs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs | GhostPOV",
  description: "Here are some Frequently Asked Questions on GhostPOV.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function FaqsPage() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <CommonFaqs />
    </div>
  );
}
