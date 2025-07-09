"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { paymentSchema, PaymentSchemaType } from "@/zod/schema/payment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Label, Separator } from "@/components/ui";
import { LoaderSpin } from "@/components/server";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Zap, Check, Shield, Clock } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function PaymentForm() {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    control,
    setValue,
  } = useForm<PaymentSchemaType>({
    resolver: zodResolver(paymentSchema),
  });

  const paymentHandler: SubmitHandler<PaymentSchemaType> = async (formData) => {
    try {
      const { variant } = formData;

      const { success, message, data } = await fetch("/api/razorpay/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ variant }),
      }).then((res) => res.json());

      if (!success) {
        toast.error(message);
        return;
      }
      console.log("Order Response:", data);

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "GhostPOV",
        description: `GhostPOV - ${variant === "499" ? "50" : "25"} Credits`,
        order_id: data.orderId,
        handler: () => {
          toast.success(
            "Payment completed! Your credits will be added shortly."
          );
          router.push("/account");
        },
        prefill: {
          name: data.user.name,
          email: data.user.email,
        },
        modal: {
          ondismiss: async () => {
            await fetch(`/api/razorpay/orders?orderId=${data.orderId}`, {
              method: "DELETE",
            });
            toast.info("Payment Cancelled");
            setValue("variant", "");
            router.refresh();
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      toast.error("Unexpected Razorpay Client Error");
    }

    reset();
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
          <Zap className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Buy Credits</h1>
        <p className="text-muted-foreground text-lg">
          Power up your AI experience with more credits
        </p>
      </div>

      <form onSubmit={handleSubmit(paymentHandler)}>
        {errors.variant && toast.error(errors.variant.message)}

        <Controller
          name="variant"
          control={control}
          render={({ field }) => (
            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader className="text-center">
                <CardTitle className="text-4xl font-bold">
                  {field.value ? <> &#8377;{field.value}</> : "Select"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Package Selection */}
                <div className="space-y-2">
                  <Label htmlFor="pkgslct">Credits Packages</Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="pkgslct" className="w-full">
                      <SelectValue placeholder="Select credit package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="249">20 Credits</SelectItem>
                      <SelectItem value="499">50 Credits</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Features */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground">
                    What&apos;s Included
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-1 bg-primary/10 rounded-full">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm">Credits never expire</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-1 bg-primary/10 rounded-full">
                        <Shield className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm">Secure payment processing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-1 bg-primary/10 rounded-full">
                        <Clock className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm">Instant delivery</span>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-6">
                <Button
                  className="w-full h-12 text-base font-semibold"
                  size="lg"
                  disabled={isSubmitting || !field.value || isSubmitSuccessful}
                  type="submit"
                >
                  {isSubmitting ? <LoaderSpin /> : "Buy Credits"}
                </Button>
              </CardFooter>

              <p className="text-xs text-center text-muted-foreground px-5">
                Kindly ensure you have read and understood our{" "}
                <Link
                  href={"/payments-policy"}
                  target="_blank"
                  className="p-link text-xs"
                >
                  Payments Policy
                </Link>{" "}
                before proceeding.
              </p>
            </Card>
          )}
        />
      </form>

      {/* Trust Indicators */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Instant Delivery</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground ">
          Powered by Razorpay • SSL Encrypted
        </p>
      </div>
    </div>
  );
}
