import { ExpandableField } from "@/components/client";
import { getFormatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { Separator, Badge } from "@/components/ui";
import { FeedbackCategory } from "./FeedbackCategory";
import { FeedbackDropdown } from "./feedback-dropdown";

interface FeedbackCardProps {
  feedback: FeedbackObject;
}

export function FeedbackCard({ feedback }: FeedbackCardProps) {
  return (
    <div className="w-full max-w-2xl bg-card rounded-md border-t-2">
      <div className="flex items-center justify-between py-1 px-1">
        <div className="flex items-center space-x-2">
          {/*Flagged Spam*/}
          {feedback.flagged && (
            <Badge
              variant={"outline"}
              className="text-sm bg-red-100 text-red-800 dark:bg-red-900/20 
              dark:text-red-400 border-red-200 dark:border-red-800"
            >
              Spam
            </Badge>
          )}

          {/*Feedback Category*/}
          <FeedbackCategory category={feedback.category} />

          {/*Separator*/}
          <div className="h-5">
            <Separator orientation="vertical" />
          </div>

          {/* Date and Time */}
          <div className="flex items-center justify-start gap-2 text-muted-foreground">
            <Calendar size={16} />
            <span className="text-sm">
              {getFormatDate(feedback.createdAt, "date-time")}
              <span className="text-[12px]"> UTC</span>
            </span>
          </div>
        </div>

        {/* Options Dropdown */}
        <div>
          <FeedbackDropdown flagged={feedback.flagged} />
        </div>
      </div>

      <div className="h-2">
        <Separator orientation="horizontal" />
      </div>

      {/* Feedback Message */}
      <ExpandableField text={feedback.message} />
    </div>
  );
}
