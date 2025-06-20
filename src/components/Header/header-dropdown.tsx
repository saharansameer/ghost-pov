import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

export function HeaderDropdown({ children }: ReactChildren) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer sm:hidden">
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
