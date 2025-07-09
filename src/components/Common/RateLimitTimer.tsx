"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui";
import { RotateCcw } from "lucide-react";
import Link from "next/link";

export function RateLimitTimer() {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);
  return (
    <div className="space-y-2">
      {timeLeft > 0 && (
        <p className="text-sm text-muted-foreground">
          Please slow down and try again after:{" "}
          <span className="font-mono text-foreground">{timeLeft}s</span>
        </p>
      )}

      {timeLeft === 0 && (
        <Link href="/">
          <Button variant="outline">
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
        </Link>
      )}
    </div>
  );
}
