import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui";
import { EllipsisVertical } from "lucide-react";
import { EchoAlertDialog } from "./echo-delete-alert";
import Link from "next/link";

interface EchoDropdownProps {
  echoId: string;
}

export function EchoDropdown({ echoId }: EchoDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="cursor-pointer hover:text-primary transition-colors ease-in duration-150"
      >
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col">
        <Link href={`/dashboard/echo/update?echoId=${echoId}`}>
          <Button variant={"ghost"} className="w-full">
            Edit
          </Button>
        </Link>
        <EchoAlertDialog echoId={echoId}/>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
