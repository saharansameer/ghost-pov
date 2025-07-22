"use client";

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
import { Button } from "@/components/ui";
import {
  Pencil,
  Trash2,
  Copy,
  MessageCircleOff,
  MessageCircleMore,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface EchoOptionsProps {
  echoId: string;
  publicId: string;
  isAcceptingFeedback: boolean;
}

export function EchoOptions({
  echoId,
  publicId,
  isAcceptingFeedback,
}: EchoOptionsProps) {
  const router = useRouter();

  // Copy Link
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_BASE_URL}/e/${text}`
      );
      toast.info("Copied to clipboard");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  // Echo Toggle
  const echoToggleHandler = async () => {
    const response = await fetch(`/api/echo/toggle/${echoId}`, {
      method: "PATCH",
      next: { revalidate: 0 },
    });

    const { success, message } = await response.json();

    if (!success) {
      toast.error("Toggle Failed");
      return;
    }

    toast.success(message);
    router.refresh();
  };

  // Delete
  const onDeleteHandler = async () => {
    const response = await fetch(`/api/echo/delete?echoId=${echoId}`, {
      method: "DELETE",
      next: { revalidate: 0 },
    });

    const { success, message } = await response.json();

    toast.success(message);
    router.refresh();

    return success;
  };
  return (
    <div className="w-full max-w-2xl flex flex-row gap-x-2 items-center justify-end mb-2">
      {/* Share */}
      <Button
        onClick={() => copyToClipboard(publicId)}
        variant={"outline"}
        size={"sm"}
        title="Share"
      >
        <Copy />
      </Button>

      {/* Start/Stop Accepting Feedbacks */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={"outline"}
            size={"sm"}
            title={isAcceptingFeedback ? "Pause" : "Resume"}
          >
            {isAcceptingFeedback ? (
              <>
                <MessageCircleOff />
              </>
            ) : (
              <>
                <MessageCircleMore />
              </>
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isAcceptingFeedback
                ? "Stop Accepting Feedbacks?"
                : "Start Accepting Feedbacks?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isAcceptingFeedback
                ? "No one will be able to send feedback."
                : "Anyone with access to the public link can send feedback."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-none" onClick={echoToggleHandler}>
              {isAcceptingFeedback ? "Yes, Stop" : "Yes, Resume"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Button */}
      <Link href={`/dashboard/echo/update?echoId=${echoId}`}>
        <Button variant={"outline"} size={"sm"} title="Edit">
          <Pencil />
        </Button>
      </Link>

      {/* Delete Button */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"outline"} size={"sm"} title="Delete">
            <Trash2 />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the echo. This change cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDeleteHandler}
              className="destructive-button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
