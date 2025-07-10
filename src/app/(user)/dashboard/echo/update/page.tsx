import { headers } from "next/headers";
import { EchoForm } from "@/components/client";
import { NotSuccess, EchoFormSkeleton } from "@/components/server";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Update Echo Details",
  robots: {
    index: false,
    follow: true,
  },
};

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

  const { success, message, data } = await response.json();

  if (!success) {
    return <NotSuccess message={message} />;
  }

  return <EchoForm method="PATCH" data={data} />;
}

export default function Page(props: PageProps) {
  return (
    <div className="flex justify-center">
      <Suspense fallback={<EchoFormSkeleton />}>
        <EchoFormWithData {...props} />
      </Suspense>
    </div>
  );
}
