import { Ghost } from "@/components/server";
import { PartiallyHidden, HeaderParent } from "@/components/client";
import { Button } from "@/components/ui";
import { ThemeToggle } from "./theme-toggle";
import { LogoutButton } from "./logout-button";
import { HeaderDropdown } from "./header-dropdown";
import Link from "next/link";
import { Session } from "@/lib/auth/auth";

interface HeaderProps {
  session: Session | null;
}

const NavAuthItems = ({ session }: HeaderProps) => {
  return (
    <>
      {session && (
        <>
          <Link href={"/dashboard"}>
            <Button variant={null} size={"sm"} className="nav-button">
              Dashboard
            </Button>
          </Link>

          <Link href={"/account"}>
            <Button variant={null} size={"sm"} className="nav-button">
              Account
            </Button>
          </Link>

          <LogoutButton />
        </>
      )}
    </>
  );
};

const NavItems = () => {
  return (
    <>
      <Link href={"/"}>
        <Button variant={null} className="nav-button">
          Home
        </Button>
      </Link>

      <Link href={"/pricing"}>
        <Button variant={null} className="nav-button">
          Pricing
        </Button>
      </Link>

      <Link href={"/faqs"}>
        <Button variant={null} className="nav-button">
          FAQ
        </Button>
      </Link>

      <PartiallyHidden
        routes={["/sign-in", "/sign-up", "/e/", "/f/", "/mail-sent"]}
      >
        <Link href={"/sign-in"}>
          <Button variant={null} className="nav-button">
            Sign in
          </Button>
        </Link>
      </PartiallyHidden>
    </>
  );
};

export function Header({ session }: HeaderProps) {
  return (
    <HeaderParent>
      <div className="mx-auto px-1 py-5 border-b border-b-[#d5d5d5] dark:border-border">
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

          <div className="flex items-center gap-x-3">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Navigation Items (Auth Related) */}
            {session && (
              <>
                <div className="hidden sm:flex gap-x-5">
                  <NavAuthItems session={session} />
                </div>
                <HeaderDropdown>
                  <NavAuthItems session={session} />
                </HeaderDropdown>
              </>
            )}

            {/* Navigation Items (Non-Auth) */}
            {!session && (
              <>
                <div className="hidden sm:flex gap-x-5">
                  <NavItems />
                </div>
                <HeaderDropdown>
                  <NavItems />
                </HeaderDropdown>
              </>
            )}
          </div>
        </div>
      </div>
    </HeaderParent>
  );
}
