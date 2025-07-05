"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { ReactChildren } from "@/types";

export function HeaderParent({ children }: ReactChildren) {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={clsx(
        "layout-container sticky top-0 z-50 transition-transform duration-300 bg-background",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      {children}
    </header>
  );
}
