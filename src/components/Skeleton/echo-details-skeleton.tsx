import { Skeleton } from "@/components/ui/skeleton";

export function EchoDetailsSkeleton() {
  return (
    <div className="w-full max-w-2xl">
      <div className="animate-in fade-in-0 slide-in-from-top-4 duration-700">
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
}
