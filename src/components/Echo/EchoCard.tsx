import { getFormatDate } from "@/lib/utils";
import { MessageCircle, Calendar } from "lucide-react";
import Link from "next/link";

interface EchoCardProps {
  echo: EchoObject;
}

export function EchoCard({ echo }: EchoCardProps) {
  return (
    <Link
      href={`/dashboard/${echo._id}`}
      className="w-[380px] modal-container group min-h-40 p-4 rounded-lg border 
      bg-card hover:bg-accent/50 shadow-sm hover:shadow-md cursor-pointer
      transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1
      active:scale-[0.98]"
    >
      <div className="flex flex-col justify-between h-full">
        {/* Title */}
        <h1 className="text-xl font-semibold text-foreground line-clamp-3 leading-6">
          {echo.title}
        </h1>

        {/* Stats section */}
        <div className="flex items-center justify-between pt-2 border-t">
          {/* Feedback count */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <MessageCircle
              size={16}
              className="group-hover:scale-110 transition-transform duration-200"
            />
            <span className="text-sm font-medium">{echo.feedbackCount}</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar
              size={16}
              className="group-hover:scale-110 transition-transform duration-200"
            />
            <span className="text-sm">{getFormatDate(echo.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
