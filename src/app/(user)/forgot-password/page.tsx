"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { emailSchema, EmailSchemaType } from "@/zod/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "@/components/ui";
import { ErrorMessage, LoaderSpin } from "@/components/server";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    setError,
  } = useForm<EmailSchemaType>({
    resolver: zodResolver(emailSchema),
    mode: "onSubmit",
  });

  const onSubmitHandler: SubmitHandler<EmailSchemaType> = async (formData) => {
    try {
      const { email } = formData;

      const response = await fetch("/api/user/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { success, message } = await response.json();

      if (!success) {
        setError("email", {
          type: "validate",
          message: message,
        });
        return;
      }

      const { error } = await authClient.forgetPassword({
        email,
        redirectTo: "/reset-password",
      });

      if (error) {
        setError("email", {
          type: "validate",
          message: error.message,
        });
      }

      toast.info("Email Sent");
    } catch (error) {
      console.log("Forgot Password Page Error:", error);
    }

    reset();
  };

  if (isSubmitSuccessful) {
    return <div>Mail Sent Successfully</div>;
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Forgot Password</h1>
          <p className="text-sm text-muted-foreground">
            Enter your registered email address to reset your password.
          </p>
        </div>

        <div>
          <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-8">
            <div className="space-y-2">
              {errors.email && (
                <div className="rounded-md bg-destructive/15 p-2 transition-all duration-100
                animate-[fadeIn_0.5s_ease-in-out_forwards]">
                  <ErrorMessage text={errors.email.message as string} />
                </div>
              )}
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Enter your email address"
              />
            </div>

            <Button
              type="submit"
              className="w-full font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoaderSpin /> : "Send Reset Link"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
