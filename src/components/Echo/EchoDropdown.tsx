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
import { EllipsisVertical, Pencil, Trash2, Copy } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface EchoDropdownProps {
  echoId: string;
  echoPublicId: string;
}

export function EchoDropdown({ echoId, echoPublicId }: EchoDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const onDeleteHandler = async () => {
    setOpen(false);

    const response = await fetch(`/api/echo/delete?echoId=${echoId}`, {
      method: "DELETE",
    });

    const { success, message } = await response.json();

    toast.success(message);
    router.refresh();

    return success;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_APP_URL}/e/${text}`
      );
      toast.info("Copied to clipboard")
    } catch {
      toast.error("Failed to copy link")
    }
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
        <DropdownMenuItem asChild>
          <Button
            onClick={() => copyToClipboard(echoPublicId)}
            variant={"ghost"}
            className="font-semibold pl-2 w-full flex justify-start dark:hover:text-foreground dark:hover:bg-accent/40"
          >
            <Copy />
            Share
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href={`/dashboard/echo/update?echoId=${echoId}`}
            className="min-h-9 pl-3 font-semibold dark:hover:text-foreground dark:hover:bg-accent/40"
          >
            <Pencil />
            Edit
          </Link>
        </DropdownMenuItem>

        {/* Delete Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant={"ghost"}
              className="font-semibold w-full flex justify-start dark:hover:text-foreground dark:hover:bg-accent/40"
            >
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
              <AlertDialogAction onClick={onDeleteHandler}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
