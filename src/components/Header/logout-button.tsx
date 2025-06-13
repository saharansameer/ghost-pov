"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const onSignOutHandler = async () => {
    await authClient.signOut();
    router.push("/sign-in");
    router.refresh();
  };
  return (
    <button
      onClick={onSignOutHandler}
      className="w-full text-left p-0 m-0 cursor-pointer"
    >
      Sign out
    </button>
  );
}
