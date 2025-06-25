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
        <CardContent className="flex flex-col gap-y-10 items-center">
          <SignupForm mode="sign-up" />
          <Separator orientation="horizontal" />
          <div className="w-full flex flex-col gap-y-4 pb-4">
            <SignUpButton provider="google" mode="sign-up" />
            <SignUpButton provider="github" mode="sign-up" />
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-x-3 font-mono text-sm">
            <span>Already have an account?</span>
            <Link
              href={"/sign-in"}
              className="hover:underline underline-offset-1 hover:text-primary 
              transition-all ease-initial duration-200"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
