"use client"

import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }: LayoutProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
