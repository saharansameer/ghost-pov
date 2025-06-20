"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant={"ghost"}
      size={"sm"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="transition-colors"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="hidden dark:block">
          <circle cx="12" cy="12" r="4" fill="currentColor" />
          <path
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        <g className="block dark:hidden">
          <path
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
            fill="currentColor"
          />
        </g>
      </svg>
    </Button>
  );
}
