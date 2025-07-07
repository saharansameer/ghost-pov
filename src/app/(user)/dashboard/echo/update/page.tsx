import { headers } from "next/headers";
import { EchoForm } from "@/components/client";

interface EchoUpdatePageProps {
  searchParams: Promise<{ echoId?: string }>;
}

export default async function EchoUpdatePage({
  searchParams,
}: EchoUpdatePageProps) {
  const queryParams = await searchParams;
  const echoId = queryParams.echoId;

  const headersList = await headers();

  const response = await fetch(
    `${process.env.BASE_URL}/api/echo/read?echoId=${echoId}`,
    {
      headers: {
        cookie: headersList.get("cookie") || "",
        authorization: headersList.get("authorization") || "",
      },
      next: { revalidate: 0 },
    }
  );

  const { data } = await response.json();

  return (
    <div className="flex justify-center">
      <EchoForm method="PATCH" data={data} />
    </div>
  );
}
