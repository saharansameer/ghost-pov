"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { passwordSchema, PasswordSchemaType } from "@/zod/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label, Button } from "@/components/ui";
import { PasswordInput } from "@/components/client";
import { LoaderSpin, ErrorMessage } from "@/components/server";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token")!;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<PasswordSchemaType>({
    resolver: zodResolver(passwordSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmitHandler: SubmitHandler<PasswordSchemaType> = async (
    formData
  ) => {
    try {
      const { newPassword } = formData;

      const { error } = await authClient.resetPassword({
        newPassword,
        token,
      });

      if (error) {
        setError("root", {
          type: "validate",
          message: "Token Expired",
        });
        return;
      }

      toast.success("Password Reset Successfully");
      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Reset Password Error:", error);
    }

    reset();
  };
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Reset Password</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Choose a strong password that you&apos;ll remember.
          </p>
        </div>

        <div>
          <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
            {errors.root && (
              <div
                className="rounded-md bg-destructive/15 p-2"
              >
                <ErrorMessage text={errors.root.message as string} />
              </div>
            )}

            <div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <PasswordInput id="new-password" {...register("newPassword")} />
              </div>
              {errors.newPassword && (
                <ErrorMessage text={errors.newPassword.message as string} />
              )}
            </div>

            <div>
              <div className="space-y-2">
                <Label htmlFor="c-new-password">Confirm Password</Label>
                <PasswordInput
                  id="c-new-password"
                  {...register("confirmNewPassword")}
                />
              </div>
              {errors.confirmNewPassword && (
                <ErrorMessage
                  text={errors.confirmNewPassword.message as string}
                />
              )}
            </div>

            <Button
              type="submit"
              className="w-full font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoaderSpin /> : "Reset Password"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Remember your password?{" "}
              <a
                href="/sign=in"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
