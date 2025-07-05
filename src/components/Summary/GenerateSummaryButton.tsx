"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface GenerateSummaryButtonProps {
  echoId: string;
}

export function GenerateSummaryButton({
  echoId,
}: GenerateSummaryButtonProps) {
  const [generating, setGenerating] = useState<boolean>(false);
  const router = useRouter();

  const onClickHandler = async () => {
    setGenerating(true);
    const response = await fetch(`/api/summary/generate/${echoId}`, {
      method: "POST",
    });

    const { success, message, summaryId } = await response.json();
    if (!success) {
      toast.error(message);
      setGenerating(false);
      return;
    }

    setGenerating(false);
    router.push(`/dashboard/summary/${summaryId}`);
    router.refresh();
  };

  if (generating) {
    return <div>Generating...</div>;
  }

  return (
    <Button
      variant={"default"}
      className="flex items-center gap-2"
      onClick={onClickHandler}
    >
      <Sparkles className="w-4 h-4" /> Generate Summary
    </Button>
  );
}
