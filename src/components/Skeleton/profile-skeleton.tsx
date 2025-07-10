import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { User, Calendar, Shield, Coins } from "lucide-react";

export function ProfileSkeleton() {
  return (
    <>
      {/* Profile Section Skeleton */}
      <Card className="transition-all duration-300 hover:shadow-md">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Profile Information</CardTitle>
              <CardDescription>Your personal account details</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar and Name Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <Skeleton className="h-7 w-32" />
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </div>
          <Separator />
          {/* Email Section Skeleton */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-5 w-16 mb-1" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>
          {/* Authentication Method Skeleton */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-muted">
              <Shield className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <Skeleton className="h-5 w-24 mb-1" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credits Section Skeleton */}
      <Card className="transition-all duration-300 hover:shadow-md">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Coins className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Credits</CardTitle>
              <CardDescription>
                Manage your credits and purchase more
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Credits Summary Skeleton */}
          <div className="p-2 rounded-lg border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Coins className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-9 w-16" />
                </div>
              </div>
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
