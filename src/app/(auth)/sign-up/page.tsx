import SignupForm from "@/components/Auth/auth-form";
import { Separator } from "@/components/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import SignUpButton from "@/components/Auth/social-signin";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up | GhostPOV",
  description: " Choose your way to create new account with GhostPOV.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SignupPage() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <Card className="w-full max-w-96">
        <CardHeader>
          <CardTitle className="text-2xl">Create New Account</CardTitle>
          <CardDescription>
            Choose your way to create new account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-6 items-center">
          <SignupForm mode="sign-up" />

          <Separator orientation="horizontal" />

          <div className="w-full flex flex-col gap-y-4 pb-4">
            <SignUpButton provider="google" />
            <SignUpButton provider="github" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-y-4">
          <div className="w-full flex justify-center gap-x-2 text-sm font-semibold">
            <span>Already have an account?</span>
            <Link
              href={"/sign-in"}
              className="hover:underline underline-offset-1 text-primary 
              transition-all ease-initial duration-200"
            >
              Sign in
            </Link>
          </div>
          <div>
            <p className="text-sm text-center">
              By signing up, you agree to our{" "}
              <Link href={"/terms-of-service"} className="p-link">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href={"/privacy-policy"} className="p-link">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
