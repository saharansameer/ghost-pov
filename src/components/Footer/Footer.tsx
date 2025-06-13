import { Ghost } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <div className="container mx-auto px-4 py-8 border-t border-border">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
            <Ghost className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">
            GhostPOV
          </span>
        </div>
        <div className="flex space-x-6 text-muted-foreground text-sm">
          <Link href={"/privacy-policy"} className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href={"/terms-of-service"} className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href={"/contact-us"} className="hover:text-foreground transition-colors">
            Support
          </Link>
        </div>
      </div>
    </div>
  );
}
