import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles } from "lucide-react";
import { EchoDetailsSkeleton } from "./echo-details-skeleton";

export function EchoPageSkeleton() {
  return (
    <>
      {/* EchoOptions Skeleton */}
      <div className="w-full max-w-2xl flex flex-row gap-x-2 items-center justify-end mb-2">
        {/* Share Button */}
        <Skeleton className="h-9 w-9" />
        {/* Start/Stop Button */}
        <Skeleton className="h-9 w-9" />
        {/* Edit Button */}
        <Skeleton className="h-9 w-9" />
        {/* Delete Button */}
        <Skeleton className="h-9 w-9" />
      </div>

      {/* EchoDetails Skeleton */}
      <EchoDetailsSkeleton />

      {/* Gradient Separator */}
      <div className="w-full max-w-xl h-px my-10 bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Summary Section Skeleton */}
      <div className="w-full max-w-2xl">
        <div className="w-full max-w-4xl space-y-6">
          {/* Header with Generate Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                AI Summaries
              </h2>
              <p className="text-muted-foreground">
                Generated insights from your feedback collection
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>

          {/* Summaries List Skeleton */}
          <div className="space-y-14">
            {/* Summary Item 1 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>

            {/* Summary Item 2 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Gradient Separator */}
      <div className="w-full max-w-xl h-px my-20 bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Feedbacks Header with Filter */}
      <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-y-2 max-w-2xl">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Feedbacks</h2>
          <p className="text-muted-foreground">
            Received anonymous feedback responses
          </p>
        </div>
        {/* FilterOptions Skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-[200px]" />
        </div>
      </div>

      {/* Feedback Cards Skeleton */}
      <div className="w-full flex flex-col gap-y-16 items-center py-10">
        {/* Feedback Card 1 */}
        <div className="w-full max-w-2xl bg-card rounded-md border-t-1 shadow-xs transition-all duration-300 ease-out">
          <div className="flex items-start justify-between py-1 px-1">
            {/* Category Badges */}
            <div className="flex gap-x-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            {/* Toggle Button */}
            <Skeleton className="h-8 w-8" />
          </div>
          {/* Feedback Message */}
          <div className="min-h-[72px] space-y-2 py-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        {/* Feedback Card 2 */}
        <div className="w-full max-w-2xl bg-card rounded-md border-t-1 shadow-xs transition-all duration-300 ease-out">
          <div className="flex items-start justify-between py-1 px-1">
            {/* Category Badges */}
            <div className="flex gap-x-2">
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            {/* Toggle Button */}
            <Skeleton className="h-8 w-8" />
          </div>
          {/* Feedback Message */}
          <div className="min-h-[72px] space-y-2 py-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        {/* Feedback Card 3 */}
        <div className="w-full max-w-2xl bg-card rounded-md border-t-1 shadow-xs transition-all duration-300 ease-out">
          <div className="flex items-start justify-between py-1 px-1">
            {/* Category Badges */}
            <div className="flex gap-x-2">
              <Skeleton className="h-6 w-12 rounded-full" />
              <Skeleton className="h-6 w-18 rounded-full" />
            </div>
            {/* Toggle Button */}
            <Skeleton className="h-8 w-8" />
          </div>
          {/* Feedback Message */}
          <div className="min-h-[72px] space-y-2 py-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>
    </>
  );
}
