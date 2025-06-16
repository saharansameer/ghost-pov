import { Ghost } from "@/components/server";
import { HeaderDropdown } from "@/components/Header/header-dropdown";
import Link from "next/link";
import { Session } from "@/lib/auth";
import { User } from "better-auth";
import { Button, Separator } from "@/components/ui";
import { ThemeToggle } from "./theme-toggle";

interface HeaderProps {
  session: Session | null;
}

export async function Header({ session }: HeaderProps) {
  return (
    <div className="container mx-auto px-2 py-5 border-b border-b-[#d5d5d5] dark:border-border">
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
        <div className="flex gap-x-2">
          {session ? (
            <HeaderDropdown user={session.user as User} />
          ) : (
            <Link href={"/sign-in"}>
              <Button variant={"default"} className="font-semibold">
                Sign in
              </Button>
            </Link>
          )}
          <div className="h-9">
            <Separator orientation="vertical" />
          </div>

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
