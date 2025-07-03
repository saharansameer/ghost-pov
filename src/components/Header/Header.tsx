import { Ghost } from "@/components/server";
import { PartiallyHidden } from "@/components/client";
import { Button } from "@/components/ui";
import { ThemeToggle } from "./theme-toggle";
import { LogoutButton } from "./logout-button";
import { HeaderDropdown } from "./header-dropdown";
import Link from "next/link";
import { Session } from "@/lib/auth/auth";

interface HeaderProps {
  session: Session | null;
}

function NavItems({ session }: HeaderProps) {
  return (
    <>
      {session && (
        <Link href={"/dashboard"}>
          <Button variant={null} size={"sm"} className="nav-button">
            Dashboard
          </Button>
        </Link>
      )}

      {session && (
        <Link href={"/account"}>
          <Button variant={null} size={"sm"} className="nav-button">
            Account
          </Button>
        </Link>
      )}

      {session && <LogoutButton />}
    </>
  );
}

export function Header({ session }: HeaderProps) {
  return (
    <div className="mx-auto px-1 py-5 border-b border-b-[#d5d5d5] dark:border-border relative">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2">
          <Link href={"/"}>
            <Ghost />
          </Link>
          <Link
            href={"/"}
            className="text-2xl font-bold text-foreground select-none cursor-default"
          >
            GhostPOV
          </Link>
        </div>

        <div className="flex items-center gap-x-2">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Navigation Items */}
          <div className="hidden sm:flex gap-x-5">
            <NavItems session={session} />
          </div>

          {/* Dropdown */}
          {session && (
            <HeaderDropdown>
              <NavItems session={session} />
            </HeaderDropdown>
          )}

          {/* Sign in Button */}
          {!session && (
            <PartiallyHidden
              routes={[
                "/sign-in",
                "/sign-up",
                "/e/",
                "/f/",
                "/mail-sent",
              ]}
            >
              <Link href={"/sign-in"}>
                <Button variant={"outline"} className="font-semibold">
                  Sign in
                </Button>
              </Link>
            </PartiallyHidden>
          )}
        </div>
      </div>
    </div>
  );
}
