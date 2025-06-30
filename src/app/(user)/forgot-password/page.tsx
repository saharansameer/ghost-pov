"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { emailSchema, EmailSchemaType } from "@/zod/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "@/components/ui";
import { ErrorMessage, LoaderSpin } from "@/components/server";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";

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
        setError("root", {
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
        setError("root", {
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
    <div className="flex flex-col items-center gap-y-5 py-10">
      <div className="w-full max-w-xl space-y-10">
        <div>
          <h1 className="font-bold text-3xl">Forgot Password</h1>
          <p>Enter your registered email address to reset your password.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-5">
          {errors.root && <ErrorMessage text={errors.root.message as string} />}
          <div className="space-y-2">
            {errors.email && (
              <ErrorMessage text={errors.email.message as string} />
            )}
            <Input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
            />
          </div>

          <Button type="submit">
            {isSubmitting ? <LoaderSpin /> : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}
