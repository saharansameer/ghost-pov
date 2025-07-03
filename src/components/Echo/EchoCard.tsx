import { getFormatDate } from "@/lib/utils";
import { MessageCircle, Calendar } from "lucide-react";
import Link from "next/link";
import { EchoObject } from "@/types";
import { EchoDropdown } from "./EchoDropdown";
import { Badge } from "@/components/ui/badge";

interface EchoCardProps {
  echo: EchoObject;
}

export function EchoCard({ echo }: EchoCardProps) {
  return (
    <div
      className="w-full max-w-2xl group relative bg-card border border-border rounded-xl px-4 py-2
      hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 
      transition-all duration-300 ease-in-out hover:-translate-y-0.5 
      animate-[fadeIn_0.5s_ease-in-out_forwards]"
      role="article"
      aria-labelledby={`echo-title-${echo._id}`}
    >
      {/* Header with title and dropdown */}
      <div className="flex justify-between gap-8">
        <div className="flex-1 min-w-0">
          <Link
            href={`/dashboard/echo/${echo._id}/feedbacks`}
            className="block group-hover:text-primary transition-colors focus:outline-none focus:text-primary"
          >
            <h2
              id={`echo-title-${echo._id}`}
              className="text-lg font-semibold text-foreground line-clamp-1 break-all"
            >
              {echo.title}
            </h2>
          </Link>
        </div>

        {/* Dropdown and Feedback Status */}
        <div className="flex gap-2">
          <div className="pb-1">
            {echo.isAcceptingFeedback ? (
              <Badge
                title="Accepting Feedbacks"
                variant={"outline"}
                className="text-xs select-none bg-green-100 text-green-800 dark:bg-green-900/20 
                dark:text-green-400 border-green-200 dark:border-green-800"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live
              </Badge>
            ) : (
              <Badge
                title="Not-Accepting Feedbacks"
                variant={"outline"}
                className="text-xs select-none bg-slate-100 text-slate-700 dark:bg-slate-800/50 
                dark:text-slate-300 border-slate-300 dark:border-slate-700"
              >
                <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400"></div>
                Paused
              </Badge>
            )}
          </div>
          <EchoDropdown echo={echo}/>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4 mr-14 h-6">
        <Link
          href={`/dashboard/echo/${echo._id}/feedbacks`}
          className="block text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:text-foreground"
        >
          <p className="text-sm line-clamp-2 leading-4 break-all">
            {echo.description}
          </p>
        </Link>
      </div>

      {/* Footer with metadata */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div
          className="flex items-center gap-1.5 text-muted-foreground"
          role="group"
          aria-label="Feedback information"
        >
          <MessageCircle size={14} aria-hidden="true" />
          <span className="text-xs font-medium">
            {echo.feedbackCount}{" "}
            {echo.feedbackCount === 1 ? "feedback" : "feedbacks"}
          </span>
        </div>

        <div
          className="flex items-center gap-1.5 text-muted-foreground text-xs"
          aria-label={`Created on ${getFormatDate(echo.createdAt, "date-only")}`}
        >
          <Calendar size={14} aria-hidden="true" />
          {getFormatDate(echo.createdAt, "date-only")}
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
