import { Ghost } from "@/components/server";
import { PartiallyHidden, HeaderParent } from "@/components/client";
import { Button } from "@/components/ui";
import { ThemeToggle } from "./theme-toggle";
import { LogoutButton } from "./logout-button";
import { HeaderDropdown } from "./header-dropdown";
import Link from "next/link";

const NavAuthItems = () => {
  return (
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

interface HeaderProps {
  authenticated: boolean;
}

export function Header({ authenticated }: HeaderProps) {
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
            {authenticated && (
              <>
                <div className="hidden sm:flex gap-x-5">
                  <NavAuthItems />
                </div>
                <HeaderDropdown>
                  <NavAuthItems />
                </HeaderDropdown>
              </>
            )}

            {/* Navigation Items (Non-Auth) */}
            {!authenticated && (
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
