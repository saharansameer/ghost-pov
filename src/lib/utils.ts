import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { authClient } from "@/lib/auth-client";
import { type NextRequest } from "next/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function socialSignInHandler(provider: SocialProvider) {
  await authClient.signIn.social({
    provider,
  });
}

export function getClientInfo(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown-ip";
  const userAgent = request.headers.get("user-agent") ?? "unknown-agent";

  return `${ip}:${userAgent}`;
}

export function getPaginationInfo(data: PaginatedDataOnly) {
  return {
    currPage: data.page,
    totalPages: data.totalPages,
    prevPage: data.prevPage,
    nextPage: data.nextPage,
    hasPrevPage: data.hasPrevPage,
    hasNextPage: data.hasNextPage,
  } as PaginationInfo;
}

export function getFormatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  
  return new Date(date).toLocaleString("en-US", options);
}
