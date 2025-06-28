import { Badge } from "@/components/ui/badge";
import { FeedbackCategories } from "@/models/feedback.model";

const categories = {
  "General": {
    className:
      "text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  },
  "Feature Request": {
    className:
      "text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800",
  },
  "Bug Report": {
    className:
      "text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
  },
  "Error Report": {
    className:
      "text-xs bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 border-orange-200 dark:border-orange-800",
  },
};

export function FeedbackCategory({
  category,
}: {
  category: FeedbackCategories;
}) {
  return (
    <Badge variant="outline" className={categories[category].className}>
      {category}
    </Badge>
  );
}
