import { EchoForm } from "@/components/client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Echo",
  robots: {
    index: false,
    follow: true,
  },
};

export default function CreateNewEcho() {
  return (
    <div className="flex justify-center">
      <EchoForm method="POST" />
    </div>
  );
}
