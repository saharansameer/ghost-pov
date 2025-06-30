"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { passwordSchema, PasswordSchemaType } from "@/zod/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label, Button } from "@/components/ui";
import { PasswordInput } from "@/components/client";
import { LoaderSpin, ErrorMessage } from "@/components/server";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";

export default function ResetPasswordPage() {
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
      }

      toast.success("Password Reset Successfully");
    } catch (error) {
      console.error("Reset Password Error:", error);
    }

    reset();
  };
  return (
    <div className="flex flex-col items-center gap-y-5 py-10">
      <div className="w-full max-w-xl space-y-10">
        <div>
          <h1 className="font-bold text-3xl">Reset Password</h1>
          <p>Reset your password and remember this one.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-5">
          {errors.root && <ErrorMessage text={errors.root.message as string} />}

          <div className="space-y-2">
            <div>
              <Label htmlFor="new-password">New Password</Label>
              {errors.newPassword && (
                <ErrorMessage text={errors.newPassword.message as string} />
              )}
            </div>
            <PasswordInput id="new-password" {...register("newPassword")} />
          </div>

          <div className="space-y-2">
            <div>
              <Label htmlFor="c-new-password">Confirm Password</Label>
              {errors.confirmNewPassword && (
                <ErrorMessage
                  text={errors.confirmNewPassword.message as string}
                />
              )}
            </div>
            <PasswordInput
              id="c-new-password"
              {...register("confirmNewPassword")}
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
