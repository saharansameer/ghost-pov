"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button, Label } from "@/components/ui";
import { TextEditor } from "@/components/client";
import { ErrorMessage, LoaderSpin } from "@/components/server";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  feedbackSchema,
  FeedbackSchemaType,
} from "@/zod/schema/feedback.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ghost } from "lucide-react";
import { toast } from "sonner";
import { useParams } from "next/navigation";

export function FeedbackForm() {
  const params = useParams();
  const echoPublicId = params.echoPublicId as string;

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    control,
    watch,
    setError,
  } = useForm<FeedbackSchemaType>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      category: "General",
      feedbackMessage: "",
    },
    mode: "onSubmit",
  });

  const onSendHandler: SubmitHandler<FeedbackSchemaType> = async (formData) => {
    try {
      const { category, feedbackMessage } = formData;

      const response = await fetch(`/api/feedback/${echoPublicId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          feedbackMessage,
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
      reset();
    } catch {
      toast.error("Failed to send feedback");
    }
  };

  const feedbackValue = watch("feedbackMessage") || "";
  const maxCharacters = 5000;

  return (
    <form
      onSubmit={handleSubmit(onSendHandler)}
      className="w-full max-w-2xl flex flex-col gap-y-1 transition-all"
    >
      {errors.root && <ErrorMessage text={errors.root.message as string} />}

      {/* Category */}
      <div className="space-y-2">
        <div className="space-x-4">
          <Label htmlFor="category">Category</Label>
          {errors.category && (
            <ErrorMessage
              text={errors.category.message as string}
              className="line-clamp-1"
            />
          )}
        </div>

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="min-w-40 max-w-2xs">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Feature Request">
                    Feature Request
                  </SelectItem>
                  <SelectItem value="Bug Report">Bug Report</SelectItem>
                  <SelectItem value="Error Report">Error Report</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="py-2"></div>

      {/* Feedback Message Input */}
      <div className="space-y-2">
        <div>
          <Label htmlFor="feedback-message">Feedback Message</Label>
          {errors.feedbackMessage && (
            <ErrorMessage
              text={errors.feedbackMessage.message as string}
              className="line-clamp-1"
            />
          )}
        </div>

        <Controller
          name="feedbackMessage"
          control={control}
          render={({ field }) => (
            <TextEditor
              id="feedback-message"
              placeholder="Start writing..."
              className="min-h-24 md:min-h-40 max-h-80 overflow-y-scroll"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        {/* Character Counter */}
        <div className="flex justify-end">
          <span
            className={`text-sm ${
              feedbackValue.length > maxCharacters
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            {feedbackValue.length}/{maxCharacters}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant={"default"}
        className="max-w-40 font-semibold"
        disabled={isSubmitting || isSubmitSuccessful}
      >
        <Ghost />
        {isSubmitting || isSubmitSuccessful ? <LoaderSpin /> : "Send"}
      </Button>
    </form>
  );
}
