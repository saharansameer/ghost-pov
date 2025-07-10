"use client";

import { motion } from "framer-motion";
import { FileText, Brain, Zap, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export function SummaryLoadingUI() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Collecting feedback data...",
    "Analyzing sentiment patterns...",
    "Identifying key themes...",
    "Generating insights...",
    "Finalizing summary...",
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2000);

    return () => {
      clearInterval(stepInterval);
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="space-y-8">
        {/* Main Loading Section */}
        <div className="relative overflow-hidden rounded-lg border bg-gradient-to-br from-muted/30 via-muted/20 to-muted/30 p-8">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-yellow-500/5 animate-pulse" />

          {/* Main Content */}
          <div className="relative z-10">
            {/* Header with Icons */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-6">
                {/* Animated Icons with Glow Effect */}
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-blue-500/20" />
                  <div
                    className="relative animate-bounce bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full transition-all duration-300"
                    style={{ animationDelay: "0ms" }}
                  >
                    <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>

                {/* Arrow Animation */}
                <div className="flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-0.5 bg-muted-foreground/40 animate-pulse"
                      style={{
                        animationDelay: `${i * 200}ms`,
                        animationDuration: "1s",
                      }}
                    />
                  ))}
                </div>

                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-purple-500/20" />
                  <div
                    className="relative animate-bounce bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full transition-all duration-300"
                    style={{ animationDelay: "150ms" }}
                  >
                    <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>

                {/* Arrow Animation */}
                <div className="flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-0.5 bg-muted-foreground/40 animate-pulse"
                      style={{
                        animationDelay: `${i * 200 + 300}ms`,
                        animationDuration: "1s",
                      }}
                    />
                  ))}
                </div>

                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-yellow-500/20" />
                  <div
                    className="relative animate-bounce bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full transition-all duration-300"
                    style={{ animationDelay: "300ms" }}
                  >
                    <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Status Text */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary animate-spin" />
                <span className="text-lg font-medium text-foreground">
                  AI Summary Generation
                </span>
                <Sparkles
                  className="h-4 w-4 text-primary animate-spin"
                  style={{ animationDirection: "reverse" }}
                />
              </div>
              <div className="text-sm text-muted-foreground transition-all duration-500 ease-in-out">
                <span
                  key={currentStep}
                  className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
                >
                  {steps[currentStep]}
                </span>
              </div>
            </div>

            {/* Text Generation Indicator */}
            <div className="space-y-3 bg-card/30 rounded-lg p-4 border border-dashed border-muted-foreground/20">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium text-muted-foreground">
                  Generating Summary...
                </span>
              </div>

              {/* Animated Text Lines */}
              <div className="space-y-2">
                <div className="flex items-center space-x-1">
                  <div className="h-3 bg-muted-foreground/20 rounded animate-pulse flex-1" />
                  <div
                    className="h-3 w-16 bg-primary/60 rounded animate-pulse"
                    style={{ animationDelay: "0ms" }}
                  />
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-3 bg-muted-foreground/20 rounded animate-pulse flex-1" />
                  <div
                    className="h-3 w-12 bg-primary/60 rounded animate-pulse"
                    style={{ animationDelay: "200ms" }}
                  />
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-3 bg-muted-foreground/20 rounded animate-pulse w-3/4" />
                  <div
                    className="h-3 w-8 bg-primary/60 rounded animate-pulse"
                    style={{ animationDelay: "400ms" }}
                  />
                  <div className="flex space-x-1">
                    <div
                      className="w-1 h-3 bg-primary animate-pulse"
                      style={{ animationDelay: "600ms" }}
                    />
                  </div>
                </div>
              </div>

              {/* Typing Cursor Effect */}
              <div className="flex items-center space-x-1 mt-2">
                <div className="h-3 bg-muted-foreground/20 rounded w-1/3" />
                <div
                  className="w-0.5 h-4 bg-primary animate-pulse"
                  style={{ animationDuration: "1s" }}
                />
              </div>
            </div>
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float opacity-60"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + Math.sin(i) * 30}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              >
                <div className="w-1 h-1 bg-primary/40 rounded-full animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
