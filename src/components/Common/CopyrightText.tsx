import { getCurrentFullYear } from "@/lib/utils";

interface CopyrightTextProps {
  className?: string;
}

export function CopyrightText({
  className = "text-sm text-muted-foreground font-instrument",
}: CopyrightTextProps) {
  return (
    <p className={className}>
      &copy; {getCurrentFullYear()} GhostPOV All Rights Reserved
    </p>
  );
}
