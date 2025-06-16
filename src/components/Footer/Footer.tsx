import Link from "next/link";

export function Footer() {
  return (
    <div className="container mx-auto px-4 py-8 border-t border-t-[#d5d5d5] dark:border-border">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>{/* Left Side of Footer */}</div>
        <div className="flex space-x-6 text-muted-foreground text-sm">
          <Link
            href={"/privacy-policy"}
            className="hover:text-foreground transition-colors"
          >
            Privacy
          </Link>
          <Link
            href={"/terms-of-service"}
            className="hover:text-foreground transition-colors"
          >
            Terms
          </Link>
          <Link
            href={"/contact-us"}
            className="hover:text-foreground transition-colors"
          >
            Support
          </Link>
        </div>
      </div>
    </div>
  );
}
