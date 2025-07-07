"use client";

import { Button } from "@/components/ui";
import { SocialProvider } from "@/types";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import { GithubIcon, GoogleIcon } from "./social-icons";

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
      {isGoogle ? (
        <>
          <GoogleIcon className="scale-150" />
          Continue with Google
        </>
      ) : (
        <>
          <GithubIcon className="scale-150" />
          Continue with Github
        </>
      )}
    </Button>
  );
}
