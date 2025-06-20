"use client";

import React from "react";
import { usePathname } from "next/navigation";

interface PartiallyHiddenProps {
  children: React.ReactNode;
}
const routes = ["/sign-in", "/sign-up", "/e"];

export function PartiallyHidden({ children }: PartiallyHiddenProps) {
  const pathname = usePathname();

  if (routes.some((route) => pathname.startsWith(route))) return null;

  return <>{children}</>;
}
