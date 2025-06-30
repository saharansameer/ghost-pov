"use client";

import { Button } from "@/components/ui/button";
import { Shield, ShieldAlert } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface SpamToggleButtonProps {
  flagged: boolean;
  feedbackId: string;
}

export function SpamToggleButton({
  flagged,
  feedbackId,
}: SpamToggleButtonProps) {
  const router = useRouter();
  const onContinueHandler = async () => {
    try {
      const { message } = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/feedback/toggle/${feedbackId}`,
        {
          method: "PATCH",
          next: { revalidate: 0 }
        }
      ).then((res) => res.json());

      toast.success(message);
      router.refresh();
    } catch {
      toast.error("Toggle Failed");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          className="w-7 h-7 p-1 text-xs transition-all duration-200 hover:scale-105 active:scale-95"
        >
          {flagged ? (
            <Shield className="w-5 h-5" />
          ) : (
            <ShieldAlert className="w-5 h-5" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {flagged ? "Looks safe ?" : "Mark this as spam ?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {flagged
              ? "This message will be removed from spam and included in your summaries."
              : "This message will be excluded from summaries and moved to spam."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={flagged ? "bg-green-500" : ""}
            onClick={onContinueHandler}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
