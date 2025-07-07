"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { toast } from "sonner";

export function LogoutButton() {
  const router = useRouter();
  const onSignOutHandler = async () => {
    await authClient.signOut();
    toast.success("Logged out");
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
