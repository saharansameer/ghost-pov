import { MessageCircle, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function EchoCardSkeleton() {
  return (
    <div
      className="w-full max-w-2xl group relative bg-card border border-border rounded-xl px-4 py-2
      hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 
      transition-all duration-300 ease-in-out hover:-translate-y-0.5"
      role="article"
    >
      {/* Header with title and dropdown */}
      <div className="flex justify-between gap-8">
        <div className="flex-1 min-w-0">
          <Skeleton className="h-7 w-3/4" />
        </div>
        {/* Badge and Dropdown Skeleton */}
        <div className="flex gap-2">
          <div className="pb-1">
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </div>

      {/* Description Skeleton */}
      <div className="mb-4 mr-14 h-6">
        <div className="space-y-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>

      {/* Footer with metadata */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MessageCircle size={14} aria-hidden="true" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
          <Calendar size={14} aria-hidden="true" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      {/* Subtle visual indicator */}
      <div
        className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      />
    </div>
  );
}
