import type { Metadata } from "next";
import { CloudAlert } from "lucide-react";
import { RateLimitTimer } from "@/components/Common/RateLimitTimer";

export const metadata: Metadata = {
  title: "Rate Limit Exceeded",
  description: "Too many requests, Please slow down",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <div className="flex justify-center">
            <CloudAlert className="w-16 h-16 text-destructive" />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Too Many Requests
          </h1>
        </div>

        <RateLimitTimer />
      </div>
    </div>
  );
}
