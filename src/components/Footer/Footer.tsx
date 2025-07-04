import Link from "next/link";
import { Ghost } from "@/components/server";

export function Footer() {
  return (
    <div className="mx-auto md:px-4 pt-4 pb-8 border-t border-t-[#d5d5d5] dark:border-border">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-y-5">
        <div className="flex items-center">
          <Ghost className="scale-75" />
          <p className="text-muted-foreground font-semibold">GhostPOV</p>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-x-6 md:space-y-0 text-muted-foreground text-sm pl-2">
          <Link
            href={"/contact-us"}
            className="hover:text-foreground transition-colors"
          >
            Contact us
          </Link>
          <Link
            href={"/faqs"}
            className="hover:text-foreground transition-colors"
          >
            FAQs
          </Link>
          <Link
            href={"/terms-of-service"}
            className="hover:text-foreground transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href={"/privacy-policy"}
            className="hover:text-foreground transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href={"/payments-policy"}
            className="hover:text-foreground transition-colors"
          >
            Payments Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
