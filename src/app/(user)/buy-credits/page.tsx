import { PaymentForm } from "@/components/Payments/PaymentForm";
import Script from "next/script";

export default function Page() {
  return (
    <div className="w-full max-w-lg mx-auto pt-10 pb-60 px-2">
      <PaymentForm />
      <Script
        id="rzpscr"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
