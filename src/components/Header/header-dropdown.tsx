import { Button } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "./logout-button";
import { Menu } from "lucide-react";
import Link from "next/link";

export function HeaderDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Menu style={{ width: "20px", height: "20px" }} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={"/account"}>Account</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/billing"}>Billing</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/settings"}>Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/contact-us"}>Support</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
