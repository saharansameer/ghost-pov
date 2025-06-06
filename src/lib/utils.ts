import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { NextRequest } from "next/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function genVerificationCode() {
  // Generate Verification Code
  const code = String(Math.floor(100000 + Math.random() * 900000));

  // Verification Code Expiry
  const codeExpiry = new Date();
  codeExpiry.setMinutes(codeExpiry.getMinutes() + 10);

  return { code, codeExpiry };
}

export function getClientInfo(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown-ip";
  const userAgent = request.headers.get("user-agent") ?? "unknown-agent";

  return `${ip}:${userAgent}`
}
