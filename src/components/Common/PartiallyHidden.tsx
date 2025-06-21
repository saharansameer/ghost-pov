"use client";

import React from "react";
import { usePathname } from "next/navigation";

interface PartiallyHiddenProps {
  children: React.ReactNode;
  routes: string[];
}

export function PartiallyHidden({ children, routes }: PartiallyHiddenProps) {
  const pathname = usePathname();

  if (routes.some((route) => pathname.startsWith(route))) return null;

  return <>{children}</>;
}
