import { AlertCircle } from "lucide-react";

interface NotSuccessProps {
  message: string;
  variant?: "default" | "minimal" | "inline";
  className?: string;
}

export function NotSuccess({
  message,
  variant = "default",
  className = "",
}: NotSuccessProps) {
  if (variant === "minimal") {
    return (
      <div
        className={`flex items-center gap-2 text-sm text-destructive ${className}`}
      >
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
        <span>{message}</span>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div
        className={`flex items-center justify-between p-3 bg-destructive/5 border border-destructive/20 rounded-md ${className}`}
      >
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
          <span className="text-sm text-destructive">{message}</span>
        </div>
      </div>
    );
  }

  // Default variant - clean, no card background
  return (
    <div
      className={`flex flex-col items-center justify-center text-center py-12 px-6 ${className}`}
    >
      <div className="relative mb-2">
        <AlertCircle className="w-10 h-10 text-destructive" />

        <div className="absolute inset-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-destructive/20 to-red-500/20 blur-xl opacity-30 -z-10"></div>
      </div>

      <div className="space-y-1 mb-2">
        <h3 className="text-xl font-semibold text-destructive tracking-tight">
          something went wrong
        </h3>
        <p className="text-muted-foreground max-w-md leading-relaxed text-sm">
          {message}
        </p>
      </div>
    </div>
  );
}
