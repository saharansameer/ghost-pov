import type { Mongoose } from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var mongoose:
    | {
        connection: Mongoose | null;
        promise: Promise<Mongoose> | null;
      }
    | undefined;

  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

export {};
