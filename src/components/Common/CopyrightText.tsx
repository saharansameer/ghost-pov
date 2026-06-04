import Link from "next/link";
import { getCurrentFullYear } from "@/lib/utils";

export function CopyrightText() {
  return (
    <div className="text-xs text-muted-foreground font-instrument">
      <p>&copy; 2025-{getCurrentFullYear()} GhostPOV. All rights reserved.</p>
      <p>
        built by{" "}
        <Link href={"https://sameersaharan.com"} target="_blank" className="p-link">
          Sameer Saharan
        </Link>
      </p>
    </div>
  );
}
