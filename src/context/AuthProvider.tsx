"use client"

import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }: ReactChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}
