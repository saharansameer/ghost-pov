import { getFormatDate } from "@/lib/utils";
import { MessageCircle, Calendar } from "lucide-react";
import Link from "next/link";
import { EchoObject } from "@/types";
import { EchoDropdown } from "./echo-dropdown";

interface EchoCardProps {
  echo: EchoObject;
}

export function EchoCard({ echo }: EchoCardProps) {
  return (
    <div
      className="w-xl min-h-16 flex items-center justify-between group px-3 py-1 rounded-lg border 
      bg-card hover:shadow-lg dark:hover:shadow-border dark:shadow-amber-50
      transition-all duration-300 ease-in-out animate-[fadeIn_0.5s_ease-in-out_forwards]"
    >
      {/* Title and Description */}
      <Link
        href={`/dashboard/echo/${echo._id}`}
        className="flex flex-col gap-y-1.5 select-none max-w-40 sm:max-w-80"
      >
        <h1 className="text-2xl font-semibold text-foreground line-clamp-1 break-all">
          {echo.title}
        </h1>
        <p className="text-foreground/60 line-clamp-1 break-all">
          {echo.description}
        </p>
      </Link>

      <div className="flex flex-col gap-y-4 pl-0.5">
        <div className="flex justify-end">
          <EchoDropdown echoId={String(echo._id)} />
        </div>

        <div className="flex items-center justify-between gap-x-4">
          {/* Feedback count */}
          <div className="flex items-center gap-x-0.5 text-muted-foreground select-none">
            <MessageCircle size={16} />
            <span className="text-sm font-medium">{echo.feedbackCount}</span>
          </div>
          {/* Date */}
          <div className="flex items-center gap-x-2 text-muted-foreground min-w-28 select-none">
            <Calendar size={16} />
            <span className="text-sm">
              {getFormatDate(echo.createdAt, "date-only")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
