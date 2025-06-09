import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { NextRequest } from "next/server";
import { authClient } from "./auth-client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getClientInfo(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown-ip";
  const userAgent = request.headers.get("user-agent") ?? "unknown-agent";

  return `${ip}:${userAgent}`;
}

export async function socialSignInHandler(provider: SocialProvider) {
  await authClient.signIn.social({
    provider,
  });
}
