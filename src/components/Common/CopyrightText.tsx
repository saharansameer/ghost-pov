import Link from "next/link";

export function CopyrightText() {
  return (
    <div className="text-xs text-muted-foreground font-instrument">
      <p>&copy; 2025 GhostPOV. All Rights Reserved.</p>
      <p>
        built by{" "}
        <Link href={"https://sameersaharan.com"} target="_blank" className="p-link">
          Sameer Saharan
        </Link>
      </p>
    </div>
  );
}
