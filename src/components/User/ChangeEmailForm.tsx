"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { emailSchema, EmailSchemaType } from "@/zod/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Badge } from "@/components/ui";
import { Edit3, Mail, ShieldCheck, ShieldX } from "lucide-react";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { ErrorMessage, LoaderSpin } from "@/components/server";
import { toast } from "sonner";

interface ChangeEmailFormProps {
  currEmail: string;
  changesAllowed: boolean;
  emailVerified: boolean;
}

const lucideStyle = { width: "14px", height: "14px" };

export function ChangeEmailForm({
  currEmail,
  changesAllowed,
  emailVerified,
}: ChangeEmailFormProps) {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    setFocus,
    setError,
  } = useForm<EmailSchemaType>({
    resolver: zodResolver(emailSchema),
    mode: "onSubmit",
    defaultValues: {
      email: currEmail,
    },
  });

  useEffect(() => {
    setFocus("email");
  }, [formOpen, setFocus]);

  const onSubmitHandler: SubmitHandler<EmailSchemaType> = async (formData) => {
    try {
      const { email } = formData;

      if (email === currEmail) {
        setFormOpen(false);
        reset();
        return;
      }

      const { error } = await authClient.changeEmail({
        newEmail: email,
        callbackURL: `/mail-sent?to=${email}&type=verification`,
      });

      if (error) {
        setError("email", {
          type: "validate",
          message: "Email already exist",
        });
        return;
      }

      router.push(`/mail-sent?to=${currEmail}&type=email`);
    } catch {
      toast.error("Unable to update email");
    }

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div className="flex items-center gap-3 w-full max-w-xs">
        <div className="p-2 rounded-full bg-muted">
          <Mail className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="w-full">
          <div className="flex items-end space-x-2">
            <p className="font-medium text-foreground">Email Address</p>
            <Badge variant="outline">
              {emailVerified ? (
                <ShieldCheck style={lucideStyle} className="text-green-500" />
              ) : (
                <ShieldX style={lucideStyle} className="text-red-500" />
              )}
              {emailVerified ? "Verified" : "Not Verified"}
            </Badge>
          </div>

          {!formOpen && <p className="text-muted-foreground">{currEmail}</p>}
          {formOpen && <Input {...register("email")} className="mt-2" />}
          {formOpen && errors.email && (
            <ErrorMessage text={errors.email.message as string} />
          )}
        </div>
      </div>
      {changesAllowed && (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFormOpen((prev) => !prev)}
          >
            {!formOpen && <Edit3 className="h-4 w-4 mr-2" />}
            {formOpen ? "Cancel" : "Change Email"}
          </Button>

          {formOpen && (
            <Button
              variant="outline"
              size="sm"
              type="submit"
              disabled={isSubmitting || isSubmitSuccessful}
            >
              {isSubmitting ? <LoaderSpin /> : "Save"}
            </Button>
          )}
        </div>
      )}
    </form>
  );
}
