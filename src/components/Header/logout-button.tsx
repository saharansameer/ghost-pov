"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";

export function LogoutButton() {
  const router = useRouter();
  const onSignOutHandler = async () => {
    await authClient.signOut();
    router.push("/sign-in");
    router.refresh();
  };
  return (
    <Button
      variant={null}
      size={"sm"}
      onClick={onSignOutHandler}
      className="nav-button"
    >
      Sign out
    </Button>
  );
}
