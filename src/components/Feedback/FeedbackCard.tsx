import { ExpandableField } from "@/components/client";
import { getFormatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui";
import { FeedbackCategory } from "./FeedbackCategory";
import { FeedbackObject } from "@/types";
import { SpamToggleButton } from "./SpamToggleButton";

interface FeedbackCardProps {
  feedback: FeedbackObject;
}

export function FeedbackCard({ feedback }: FeedbackCardProps) {
  return (
    <div className="w-full max-w-2xl bg-card rounded-md border-t shadow-xs transition-all duration-300 ease-out">
      <div className="flex items-start justify-between py-1 px-1">
        {/*Category Badges*/}
        <div className="flex gap-x-2">
          {feedback.flagged && (
            <Badge
              variant={"outline"}
              className="text-xs bg-red-100 text-red-800 dark:bg-red-900/20 
              dark:text-red-400 border-red-200 dark:border-red-800"
            >
              Spam
            </Badge>
          )}

          <FeedbackCategory category={feedback.category} />
        </div>

        {/* Toggle Button */}
        <div>
          <SpamToggleButton flagged={feedback.flagged} feedbackId={feedback._id} />
        </div>
      </div>

      {/* Feedback Message */}
      <div className="min-h-18">
        <ExpandableField text={feedback.feedbackMessage} />
      </div>

      {/* Date and Time */}
      <div className="relative">
        <div className="absolute right-0 flex items-center justify-start gap-2 text-muted-foreground">
          <Calendar size={16} />
          <span className="text-sm">
            {getFormatDate(feedback.createdAt, "date-time")}
          </span>
        </div>
      </div>
    </div>
  );
}
