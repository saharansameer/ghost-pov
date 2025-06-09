"use client";

import SignupForm from "../../../components/Auth/auth-form";
import { Separator } from "@/components/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignUpButton from "@/components/Auth/social-signin";
import { socialSignInHandler } from "@/lib/utils";

export default function SignupPage() {
  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="modal-container">
        <CardHeader>
          <CardTitle className="text-2xl">Create New Account</CardTitle>
          <CardDescription>
            Choose your way to create new account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-10">
          <SignupForm mode="sign-up" />
          <Separator orientation="horizontal" />
          <div className="flex flex-col gap-y-4">
            <SignUpButton
              provider="google"
              mode="sign-up"
              onClick={() => socialSignInHandler("google")}
            />
            <SignUpButton
              provider="github"
              mode="sign-up"
              onClick={() => socialSignInHandler("github")}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
