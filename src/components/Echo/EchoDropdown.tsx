"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
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
  EllipsisVertical,
  Pencil,
  Trash2,
  Copy,
  MessageCircleOff,
  MessageCircleMore,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EchoObject } from "@/types";

interface EchoDropdownProps {
  echo: EchoObject;
}

export function EchoDropdown({ echo }: EchoDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  // Copy Link
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_APP_URL}/e/${text}`
      );
      toast.info("Copied to clipboard");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  // Echo Toggle
  const echoToggleHandler = async () => {
    setOpen(false);

    const response = await fetch(`/api/echo/toggle/${echo._id}`, {
      method: "PATCH",
      next: { revalidate: 0 },
    });

    const { success, message } = await response.json();

    if (!success) {
      console.log(message);
      toast.error("Toggle Failed");
      return;
    }

    toast.success(message);
    router.refresh();
  };

  // Delete
  const onDeleteHandler = async () => {
    setOpen(false);

    const response = await fetch(`/api/echo/delete?echoId=${echo._id}`, {
      method: "DELETE",
      next: { revalidate: 0 },
    });

    const { success, message } = await response.json();

    toast.success(message);
    router.refresh();

    return success;
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="cursor-pointer px-1 rounded-sm hover:bg-accent dark:hover:bg-accent/60 
          transition-colors outline-none"
          aria-label="Echo options"
        >
          <EllipsisVertical size={16} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col">
        {/* Share Button */}
        <DropdownMenuItem asChild>
          <Button
            onClick={() => copyToClipboard(echo.publicId)}
            variant={"ghost"}
            className="button-echo-dropdown"
          >
            <Copy />
            Share
          </Button>
        </DropdownMenuItem>

        {/* Start/Stop Accepting Feedbacks */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"ghost"} className="button-echo-dropdown">
              {echo.isAcceptingFeedback ? (
                <>
                  <MessageCircleOff />
                  Pause
                </>
              ) : (
                <>
                  <MessageCircleMore />
                  Resume
                </>
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {echo.isAcceptingFeedback
                  ? "Stop Accepting Feedbacks?"
                  : "Start Accepting Feedbacks?"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {echo.isAcceptingFeedback
                  ? "No one will be able to send feedback."
                  : "Anyone with access to the public link can send feedback."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-none"
                onClick={echoToggleHandler}
              >
                {echo.isAcceptingFeedback ? "Yes, Stop" : "Yes, Resume"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Edit Button */}
        <DropdownMenuItem asChild>
          <Link
            href={`/dashboard/echo/update?echoId=${echo._id}`}
            className="min-h-9 pl-3 font-semibold dark:hover:text-foreground dark:hover:bg-accent/40"
          >
            <Pencil />
            Edit
          </Link>
        </DropdownMenuItem>

        {/* Delete Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"ghost"} className="button-echo-dropdown">
              <Trash2 />
              Delete
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
              <AlertDialogCancel onClick={() => setOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={onDeleteHandler}
                className="destructive-button"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
