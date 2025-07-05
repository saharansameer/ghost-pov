"use client";

import { Button } from "@/components/ui";
import Image from "next/image";
import { SocialProvider } from "@/types";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";

interface SocialSigninProps {
  provider: SocialProvider;
}

export default function SocialSignin({ provider }: SocialSigninProps) {
  const isGoogle = provider === "google";

  const onSignInHandler = async () => {
    const { error } = await authClient.signIn.social({
      provider,
    });

    if (error) {
      toast.error(error.message);
    }
  };
  return (
    <Button
      variant={"outline"}
      className="w-full font-semibold flex items-center gap-x-4"
      onClick={onSignInHandler}
    >
      <Image
        src={isGoogle ? "/google-icon.svg" : "/github-icon-1.svg"}
        alt="google"
        width={isGoogle ? 20 : 25}
        height={isGoogle ? 20 : 25}
      />
      Continue with {isGoogle ? "Google" : "Github"}
    </Button>
  );
}
