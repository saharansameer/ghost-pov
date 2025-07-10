import { Skeleton } from "@/components/ui/skeleton";

export function EchoFormSkeleton() {
  return (
    <form className="w-full max-w-2xl flex flex-col gap-y-5 p-5">
      {/* Heading Skeleton */}
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-80" />
      </div>

      {/* Title Section Skeleton */}
      <div>
        <div className="space-y-2">
          <div>
            <Skeleton className="h-4 w-12 mb-2" />
          </div>
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        {/* Title Char Counter Skeleton */}
        <div className="flex justify-end mt-1">
          <Skeleton className="h-4 w-12" />
        </div>
      </div>

      {/* Description Section Skeleton */}
      <div>
        <div className="space-y-2">
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
          </div>
          {/* Text Editor Skeleton */}
          <div className="min-h-24 md:min-h-40 max-h-80 border rounded-md p-3 bg-muted/20">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
        {/* Description Char Counter Skeleton */}
        <div className="flex justify-end mt-1">
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* Submit Button Skeleton */}
      <Skeleton className="h-10 w-full sm:w-40 rounded-md" />
    </form>
  );
}
