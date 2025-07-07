"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { echoSchema, EchoSchemaType } from "@/zod/schema/echo.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Label } from "@/components/ui";
import { TextEditor } from "@/components/client";
import { ErrorMessage, LoaderSpin } from "@/components/server";
import { useRouter } from "next/navigation";
import { EchoObject } from "@/types";
import { toast } from "sonner";

interface EchoFormProps {
  method: "POST" | "PATCH";
  data?: EchoObject;
}

export function EchoForm({ method, data }: EchoFormProps) {
  const isPostMethod = method === "POST";
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    setError,
    watch,
  } = useForm<EchoSchemaType>({
    resolver: zodResolver(echoSchema),
    mode: "onSubmit",
    defaultValues: isPostMethod
      ? { title: "", description: "" }
      : {
          title: data?.title,
          description: data?.description,
        },
  });

  const onSubmitHandler: SubmitHandler<EchoSchemaType> = async (formData) => {
    try {
      const { title, description } = formData;

      const url = isPostMethod
        ? "/api/echo/create"
        : `/api/echo/update?echoId=${data?._id}`;

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 0 },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const { success, message } = await response.json();

      if (!success) {
        setError("root", {
          type: "validate",
          message: message,
        });
        return;
      }

      toast.success(message);
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Echo Form Error:", error);
    }

    reset();
  };

  const titleValue = watch("title") || "";
  const maxTitleChars = 100;

  const descriptionValue = watch("description") || "";
  const maxDescriptionChars = 2000;

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="w-full max-w-2xl flex flex-col gap-y-5 p-5"
    >
      {/* Heading */}
      <div>
        <h1 className="text-primary font-bold text-2xl">
          {isPostMethod ? "Create New Echo" : "Update Echo"}
        </h1>
        <p className="text-foreground/80 text-sm">
          {isPostMethod
            ? "Share your thoughts and invite anonymous feedback."
            : "Make changes in your echo."}
        </p>
      </div>

      {errors.root && <ErrorMessage text={errors.root.message as string} />}

      {/* Title */}
      <div>
        <div className="space-y-2">
          <div>
            <Label htmlFor="title">Title</Label>
            {errors.title && (
              <ErrorMessage text={errors.title.message as string} />
            )}
          </div>

          <Input
            {...register("title")}
            id="title"
            placeholder="Start with a clear title"
          />
        </div>

        {/* Title Char Counter */}
        <div className="flex justify-end">
          <span
            className={`text-sm ${
              titleValue.length > maxTitleChars
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            {titleValue.length}/{maxTitleChars}
          </span>
        </div>
      </div>

      {/* Description */}
      <div>
        <div className="space-y-2">
          <div>
            <Label htmlFor="description">Description</Label>
            {errors.description && (
              <ErrorMessage text={errors.description.message as string} />
            )}
          </div>

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <>
                <TextEditor
                  id="description"
                  className="min-h-24 md:min-h-40 max-h-80 overflow-y-scroll"
                  value={field.value || ""}
                  onChange={field.onChange}
                  placeholder={"Add more context, details or links — Optional"}
                />
              </>
            )}
          />
        </div>

        {/* Description Char Counter */}
        <div className="flex justify-end">
          <span
            className={`text-sm ${
              descriptionValue.length > maxDescriptionChars
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            {descriptionValue.length}/{maxDescriptionChars}
          </span>
        </div>
      </div>

      <Button
        disabled={isSubmitting}
        type="submit"
        variant={"default"}
        className="font-semibold w-full sm:w-40"
      >
        {isSubmitting ? <LoaderSpin /> : "Publish"}
      </Button>
    </form>
  );
}
