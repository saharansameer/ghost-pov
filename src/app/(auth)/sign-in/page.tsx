import SigninForm from "@/components/Auth/auth-form";
import { Separator } from "@/components/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import SignInButton from "@/components/Auth/social-signin";
import Link from "next/link";

export default function SigninPage() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <Card className="w-full max-w-96">
        <CardHeader>
          <CardTitle className="text-2xl">Sign in to your account</CardTitle>
          <CardDescription>
            Enter your account&apos;s credentials below
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-6">
          <SigninForm mode="sign-in" />
          <Separator orientation="horizontal" />
          <div className="w-full flex flex-col gap-y-4 pb-4">
            <SignInButton provider="google" mode="sign-in" />
            <SignInButton provider="github" mode="sign-in" />
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-center gap-x-2 text-sm font-semibold">
            <span>Don&apos;t have an account?</span>
            <Link
              href={"/sign-up"}
              className="hover:underline underline-offset-1 text-primary 
              transition-all ease-initial duration-200"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
