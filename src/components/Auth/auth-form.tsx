"use client";

import { Button, Input, Label } from "@/components/ui";
import { PasswordInput } from "@/components/client";
import { ErrorMessage, LoaderSpin } from "@/components/server";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  signinSchema,
  SigninSchemaType,
  signupSchema,
  SignupSchemaType,
} from "@/zod/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { AuthMode } from "@/types";

interface AuthFormProps {
  mode: AuthMode;
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const isSignIn = mode === "sign-in";

  // React Hook Form Configuration
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<SigninSchemaType>({
    resolver: zodResolver(isSignIn ? signinSchema : signupSchema),
    mode: "onSubmit",
  });

  // SignIn Handler
  const onSignInHandler: SubmitHandler<SigninSchemaType> = async (formData) => {
    try {
      const { email, password } = formData;
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error?.code) {
        setError("root", {
          type: "validate",
          message: error.message,
        });
        return;
      }
    } catch (error) {
      console.error("SignIn Error:", error);
    }
    reset();
    router.push("/dashboard");
    router.refresh();
  };

  // SignUp Handler
  const onSignUpHandler: SubmitHandler<SignupSchemaType> = async (formData) => {
    try {
      const { email, password } = formData;

      const { error } = await authClient.signUp.email({
        email,
        password,
        name: email.split("@")[0],
      });

      if (error?.code) {
        setError("root", {
          type: "validate",
          message: error.message,
        });
        return;
      }
    } catch (error) {
      console.error("SignUp Error:", error);
    }
    reset();
    router.push("/sign-in");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(isSignIn ? onSignInHandler : onSignUpHandler)}
      className="w-full space-y-7"
    >
      {errors.root && <ErrorMessage text={errors.root.message as string} />}
      <div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
        </div>

        {errors.email && <ErrorMessage text={errors.email.message as string} />}
      </div>

      <div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput {...register("password")} id="password" />
        </div>

        {errors.password && (
          <ErrorMessage text={errors.password.message as string} />
        )}
      </div>

      <Button type="submit" size={"sm"} className="font-semibold w-full">
        {isSubmitting ? <LoaderSpin /> : isSignIn ? "Sign in" : "Sign up"}
      </Button>
    </form>
  );
}
