import { Ghost } from "lucide-react";
import { HeaderDropdown } from "@/components/Header/header-dropdown";
import Link from "next/link";
import { Session } from "@/lib/auth";

interface HeaderProps {
  session: Session | null;
}

export async function Header({ session }: HeaderProps) {
  return (
    <div className="container mx-auto px-2 py-5 border-b border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Ghost className="w-5 h-5 text-primary-foreground" />
          </div>
          <Link
            href={"/"}
            className="text-2xl font-bold text-foreground select-none"
          >
            GhostPOV
          </Link>
        </div>
        {session && <HeaderDropdown />}
      </div>
    </div>
  );
}
