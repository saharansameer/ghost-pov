import { Ghost } from "@/components/server";
import { HeaderDropdown } from "@/components/Header/header-dropdown";
import Link from "next/link";
import { Session } from "@/lib/auth";
import { User } from "better-auth";
import { Button } from "@/components/ui";

interface HeaderProps {
  session: Session | null;
}

export async function Header({ session }: HeaderProps) {
  return (
    <div className="container mx-auto px-2 py-5 border-b border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Ghost />
          <Link
            href={"/"}
            className="text-2xl font-bold text-foreground select-none"
          >
            GhostPOV
          </Link>
        </div>
        {session ? (
          <HeaderDropdown user={session.user as User} />
        ) : (
          <Link href={"/sign-in"}>
            <Button variant={"outline"} className="font-semibold">Sign in</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
