import Link from "next/link";
import { Ghost, CopyrightText } from "@/components/server";
import { Separator } from "@/components/ui/separator";

type FooterArray = { text: string; href: string }[];

const general: FooterArray = [
  {
    text: "Contact us",
    href: "/contact-us",
  },
  {
    text: "FAQs",
    href: "/faqs",
  },
];

const legal: FooterArray = [
  {
    text: "Terms of Service",
    href: "/terms-of-service",
  },
  {
    text: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    text: "Payments Policy",
    href: "/payments-policy",
  },
];

export function Footer() {
  return (
    <div className="mx-auto md:px-4 pt-4 border-t border-t-[#d5d5d5] dark:border-border">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-y-3 md:gap-0">
        <div className="flex items-center">
          <Ghost className="scale-75" />
          <p className="text-muted-foreground font-semibold font-instrument select-none">
            GhostPOV
          </p>
        </div>

        <div className="flex flex-col gap-3 text-muted-foreground text-sm">
          <div className="flex flex-col md:flex-row justify-end gap-3 pl-1 md:pl-0">
            {general.map((item, index) => (
              <Link
                key={`${index}-ftgn`}
                href={item.href}
                className="hover:text-foreground transition-colors font-instrument"
              >
                {item.text}
              </Link>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-end gap-3 pl-1 md:pl-0">
            {legal.map((item, index) => (
              <Link
                key={`${index}-ftlg`}
                href={item.href}
                className="hover:text-foreground transition-colors font-instrument"
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5 pb-1 pl-1 text-center md:text-left">
        <Separator className="mb-1 md:hidden" />
        <CopyrightText />
      </div>
    </div>
  );
}
