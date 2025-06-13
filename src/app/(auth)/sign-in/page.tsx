"use client";

import SigninForm from "@/components/Auth/auth-form";
import { Separator } from "@/components/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInButton from "@/components/Auth/social-signin";
import { socialSignInHandler } from "@/lib/utils";

export default function SigninPage() {
  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="modal-container">
        <CardHeader>
          <CardTitle className="text-2xl">Sign in to your account</CardTitle>
          <CardDescription>
            Enter your account&apos;s credentials below
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-10 items-center">
          <SigninForm mode="sign-in" />
          <Separator orientation="horizontal" />
          <div className="w-full flex flex-col gap-y-4 pb-4">
            <SignInButton
              provider="google"
              mode="sign-in"
              onClick={() => socialSignInHandler("google")}
            />
            <SignInButton
              provider="github"
              mode="sign-in"
              onClick={() => socialSignInHandler("github")}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
