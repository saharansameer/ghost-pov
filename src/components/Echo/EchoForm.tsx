"use client";

import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { echoSchema, EchoSchemaType } from "@/zod/schema/echo.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Label } from "@/components/ui";
import { TextEditor } from "@/components/client";
import { ErrorMessage, LoaderSpin } from "@/components/server";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

export function EchoForm() {
  const router = useRouter();
  const [isEchoOverlayOpen, setEchoOverlayOpen] =
    React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    setError,
  } = useForm<EchoSchemaType>({
    resolver: zodResolver(echoSchema),
    mode: "onSubmit",
  });

  const onSubmitHandler: SubmitHandler<EchoSchemaType> = async (formData) => {
    try {
      const { title, description } = formData;

      const response = await axios.post("/api/echo", { title, description });

      if (!response.data.success) {
        setError("root", {
          type: "validate",
          message: response.data.message,
        });
        return;
      }

      router.push(`/dashboard/${response.data.data.echoId}`);
    } catch (error) {
      console.error("Echo Form Error:", error);
    }
    reset();
  };

  return (
    <div>
      <Button
        variant={"default"}
        onClick={() => setEchoOverlayOpen(true)}
        className="font-semibold"
      >
        Create Echo
      </Button>

      {isEchoOverlayOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm backdrop-brightness-90">
          <div className="w-full max-w-2xl px-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
            <div className="flex justify-end py-1">
              <Button
                variant={"outline"}
                onClick={() => setEchoOverlayOpen(false)}
                className="font-semibold"
              >
                <X />
              </Button>
            </div>

            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="flex flex-col gap-y-5 p-5 rounded-sm bg-background border border-[#d5d5d5] dark:border-border"
            >
              {errors.root && (
                <ErrorMessage text={errors.root.message as string} />
              )}
              <div>
                <h1 className="text-primary font-bold text-2xl">
                  Create New Echo
                </h1>
                <p className="text-foreground/80 text-sm">
                  Share your thoughts and invite anonymous feedback.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  {...register("title")}
                  placeholder="Start with a clear title"
                ></Input>
                {errors.title && (
                  <ErrorMessage text={errors.title.message as string} />
                )}
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <>
                      <TextEditor
                        className="min-h-24 md:min-h-40"
                        value={field.value || ""}
                        onChange={field.onChange}
                        placeholder={
                          "Add more context, details or links — Optional"
                        }
                      />
                    </>
                  )}
                />
                {errors.description && (
                  <ErrorMessage text={errors.description.message as string} />
                )}
              </div>

              <Button
                type="submit"
                variant={"default"}
                className="font-semibold w-full sm:w-40"
              >
                {isSubmitting ? <LoaderSpin /> : "Publish"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
