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

interface AuthFormProps {
  mode: AuthMode;
}

export default function AuthForm({ mode }: AuthFormProps) {
  const isSignIn = mode === "sign-in";

  // React Hook Form Configuration
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SigninSchemaType>({
    resolver: zodResolver(isSignIn ? signinSchema : signupSchema),
    mode: "onSubmit",
  });

  // SignIn Handler
  const onSignInHandler: SubmitHandler<SigninSchemaType> = async (data) => {
    try {
      const { email, password } = data;
      await authClient.signIn.email({ email, password });
    } catch (error) {
      console.error("SignIn Error:", error);
    }
    reset();
  };

  // SignUp Handler
  const onSignUpHandler: SubmitHandler<SignupSchemaType> = async (data) => {
    try {
      const { email, password } = data;

      await authClient.signUp.email({
        email,
        password,
        name: email.split("@")[0],
      });
    } catch (error) {
      console.error("SignUp Error:", error);
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(isSignIn ? onSignInHandler : onSignUpHandler)}
      className="w-xs space-y-7 modal-content"
    >
      <div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
        </div>

        {errors.email && <ErrorMessage text={errors.email.message as string} />}
      </div>

      <div>
        <div className="space-y-2">
          <Label>Password</Label>
          <PasswordInput {...register("password")} />
        </div>

        {errors.password && (
          <ErrorMessage text={errors.password.message as string} />
        )}
      </div>

      <Button type="submit" size={"sm"} className="font-semibold w-full">
        {isSubmitting ? <LoaderSpin /> : "Submit"}
      </Button>
    </form>
  );
}
