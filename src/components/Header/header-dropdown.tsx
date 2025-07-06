"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ReactChildren } from "@/types";
import { cn } from "@/lib/utils";

export function HeaderDropdown({ children }: ReactChildren) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="sm:hidden">
      {/* Trigger Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleDropdown}
        className="p-2"
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 top-20 backdrop-blur-sm z-40"
          onClick={toggleDropdown}
        />
      )}

      {/* Dropdown Content */}
      <div
        className={cn(
          "absolute inset-0 top-full z-50 transition-all duration-200 ease-in-out",
          isOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-2 invisible"
        )}
      >
        <div
          className="flex flex-col gap-y-3 items-start bg-background/80 py-5 px-4 backdrop-blur-sm"
          onClick={toggleDropdown}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
