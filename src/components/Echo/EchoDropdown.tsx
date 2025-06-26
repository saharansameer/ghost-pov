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
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface EchoDropdownProps {
  echoId: string;
}

export function EchoDropdown({ echoId }: EchoDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const onDeleteHandler = async () => {
    setOpen(false);

    const response = await fetch(`/api/echo/delete?echoId=${echoId}`, {
      method: "DELETE",
    });

    const { success } = await response.json();

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
        <DropdownMenuItem asChild>
          <Link
            href={`/dashboard/echo/update?echoId=${echoId}`}
            className="font-semibold dark:hover:text-foreground dark:hover:bg-accent/40"
          >
            Edit
          </Link>
        </DropdownMenuItem>

        {/* Delete Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant={"ghost"}
              className="font-semibold pl-2 w-full flex justify-start dark:hover:text-foreground dark:hover:bg-accent/40"
            >
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
