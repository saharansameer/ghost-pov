import { headers } from "next/headers";
import { PaginationButtons, FeedbackCard } from "@/components/server";
import { getPaginationInfo } from "@/lib/utils";
import { FeedbackObject } from "@/types";

type EchoPageProps = {
  params: Promise<{ echoId: string }>;
  searchParams: Promise<{ p?: string }>;
};

export default async function EchoPage({
  params,
  searchParams,
}: EchoPageProps) {
  const { echoId } = await params;
  const queryParams = await searchParams;
  const page = Number(queryParams?.p || 1);

  const response = await fetch(
    `${process.env.APP_URL}/api/echo/feedbacks?echoId=${echoId}&page=${page}&limit=2`,
    {
      next: { revalidate: 10 },
      headers: await headers(),
    }
  );

  const { data } = await response.json();

  const paginationInfo = getPaginationInfo(data);

  return (
    <div className="flex flex-col min-h-screen h-auto py-5 px-1">
      <div>{/* AI Summary or maybbe something else */}</div>

      <div className="flex flex-col gap-y-16 items-center">
        {data.docs.map((item: FeedbackObject) => (
          <FeedbackCard key={item._id} feedback={item} />
        ))}
      </div>

      <PaginationButtons pagination={paginationInfo} />
    </div>
  );
}
