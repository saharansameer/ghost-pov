import { getCurrentFullYear } from "@/lib/utils";
import Link from "next/link";

export function CopyrightText() {
  return (
    <div className="text-xs text-muted-foreground font-instrument">
      <p>&copy; {getCurrentFullYear()} GhostPOV All Rights Reserved</p>
      <p>
        built by{" "}
        <Link href={"https://sameersaharan.com"} className="p-link">
          Sameer Saharan
        </Link>
      </p>
    </div>
  );
}
