import { EchoForm } from "@/components/client";

export default function CreateNewEcho() {
  return (
    <div className="flex justify-center">
      <EchoForm method="POST" />
    </div>
  );
}
