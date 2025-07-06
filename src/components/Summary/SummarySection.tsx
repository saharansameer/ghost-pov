"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { Sparkles, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SummaryLoadingUI } from "./SummaryLoadingUI";
import { ExpandableMarkdownField } from "./Markdown";

type Summary = {
  _id: string;
  createdAt: Date;
  content: string;
};

type SummarySectionProps = {
  summaries: Summary[];
  echoId: string;
};

export function SummarySection({ summaries, echoId }: SummarySectionProps) {
  const [generating, setGenerating] = useState<boolean>(false);
  const router = useRouter();

  const onClickHandler = async () => {
    setGenerating(true);
    const response = await fetch(`/api/summary/generate/${echoId}`, {
      method: "POST",
    });

    const { success, message } = await response.json();
    if (!success) {
      toast.error(message);
      setGenerating(false);
      return;
    }

    setGenerating(false);
    router.refresh();
  };

  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* Header with Generate Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Summaries</h2>
          <p className="text-muted-foreground">
            Generated insights from your feedback collection
          </p>
        </div>
        <Button
          variant={"default"}
          className="flex items-center gap-2"
          onClick={onClickHandler}
        >
          <Sparkles className="w-4 h-4" /> Generate Summary
        </Button>
      </div>

      {generating && <SummaryLoadingUI />}

      {/* Summaries List */}
      {!generating && (
        <div className="space-y-14">
          {summaries.length === 0 ? (
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 mx-auto bg-muted rounded-full flex items-center justify-center">
                <FileText />
              </div>
              <h3 className="font-semibold text-sm">No summaries yet</h3>
            </div>
          ) : (
            summaries.map((summary) => (
              <ExpandableMarkdownField
                key={summary._id}
                content={summary.content}
                createdAt={summary.createdAt}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
