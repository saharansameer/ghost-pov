import { EchoForm } from "@/components/client";
import { headers } from "next/headers";

interface EchoUpdatePageProps {
  searchParams: Promise<{ echoId?: string }>;
}

export default async function EchoUpdatePage({
  searchParams,
}: EchoUpdatePageProps) {
  const queryParams = await searchParams;
  const echoId = queryParams.echoId;

  const response = await fetch(
    `${process.env.APP_URL}/api/echo/read?echoId=${echoId}`,
    {
      next: { revalidate: 0 },
      headers: await headers(),
    }
  );

  const { data } = await response.json();

  return (
    <div className="flex justify-center">
      <EchoForm method="PATCH" data={data} />
    </div>
  );
}
