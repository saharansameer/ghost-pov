import { Button } from "@/components/ui";
import Image from "next/image";

interface SocialSigninProps {
  provider: SocialProvider;
  mode: AuthMode;
  onClick?: () => Promise<void>;
}

export default function SocialSignin({
  provider,
  mode,
  onClick,
}: SocialSigninProps) {
  const isGoogle = provider === "google";
  const isSignIn = mode === "sign-in";
  return (
    <Button
      variant={"outline"}
      className="w-full font-semibold flex items-center gap-x-4"
      onClick={onClick}
    >
      <Image
        src={isGoogle ? "/google-icon.svg" : "/github-icon-1.svg"}
        alt="google"
        width={isGoogle ? 20 : 25}
        height={isGoogle ? 20 : 25}
      />
      {isSignIn ? "Sign in" : "Sign up"} with {isGoogle ? "Google" : "Github"}
    </Button>
  );
}
