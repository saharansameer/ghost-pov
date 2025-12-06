import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PaginationInfo, PaginatedDataOnly } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPaginationInfo(data: PaginatedDataOnly) {
  return {
    currPage: data?.page,
    totalPages: data.totalPages,
    prevPage: data?.prevPage,
    nextPage: data?.nextPage,
    hasPrevPage: data.hasPrevPage,
    hasNextPage: data.hasNextPage,
  } as PaginationInfo;
}

export function getFormatDate(date: Date, type: "date-only" | "date-time") {
  if (type === "date-only") {
    return new Date(date).toDateString();
  }

  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function getCurrentFullYear() {
  return new Date().getFullYear();
}

export function trimAndClean(val: string) {
  return val.trim().replace(/\s+/g, " ");
}
