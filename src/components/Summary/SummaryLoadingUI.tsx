import { FileText, Brain, Zap } from "lucide-react";

export function SummaryLoadingUI() {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-muted/30 p-6">
      <div className="flex items-center justify-center space-x-8">
        {/* Animated Icons */}
        <div className="flex space-x-4">
          <div className="animate-bounce" style={{ animationDelay: "0ms" }}>
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div className="animate-bounce" style={{ animationDelay: "150ms" }}>
            <Brain className="h-6 w-6 text-purple-600" />
          </div>
          <div className="animate-bounce" style={{ animationDelay: "300ms" }}>
            <Zap className="h-6 w-6 text-yellow-600" />
          </div>
        </div>

        {/* Animated Text */}
        <div className="text-center">
          <div className="text-sm text-muted-foreground">
            <span className="inline-block animate-pulse">
              Analyzing Feedbacks
            </span>
            <span className="animate-pulse ml-1">
              <span className="animate-pulse" style={{ animationDelay: "0ms" }}>
                .
              </span>
              <span
                className="animate-pulse"
                style={{ animationDelay: "150ms" }}
              >
                .
              </span>
              <span
                className="animate-pulse"
                style={{ animationDelay: "300ms" }}
              >
                .
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Animated Progress Bar */}
      <div className="mt-4 w-full bg-muted rounded-full h-2 overflow-hidden">
        <div className="h-2 bg-primary rounded-full animate-pulse"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/60 rounded-full animate-ping opacity-75"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
