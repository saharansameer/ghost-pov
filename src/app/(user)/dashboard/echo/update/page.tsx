import { headers } from "next/headers";
import { EchoForm } from "@/components/client";

interface PageProps {
  searchParams: Promise<{ echoId?: string }>;
}

async function EchoFormWithData({ searchParams }: PageProps) {
  const queryParams = await searchParams;
  const echoId = queryParams?.echoId;

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

  const { success, data } = await response.json();

  if (!success) {
    return <div>Echo no longer exist</div>;
  }

  return <EchoForm method="PATCH" data={data} />;
}

export default function Page(props: PageProps) {
  return (
    <div className="flex justify-center">
      <EchoFormWithData {...props} />
    </div>
  );
}
