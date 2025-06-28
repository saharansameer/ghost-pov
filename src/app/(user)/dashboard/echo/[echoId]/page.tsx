import { headers } from "next/headers";
import {
  PaginationButtons,
  FeedbackCard,
  EchoDetails,
} from "@/components/server";
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
    `${process.env.APP_URL}/api/echo/feedbacks?echoId=${echoId}&page=${page}&limit=15`,
    {
      next: { revalidate: 10 },
      headers: await headers(),
    }
  );

  const { success, message, data, echo } = await response.json();

  if (!success) {
    return <div>{message}</div>;
  }

  const paginationInfo = getPaginationInfo({ ...data, docs: [] });

  // const isPremiumUser = echo.owner.plan !== "FREE";

  return (
    <div className="w-full max-w-3xl flex flex-col items-center mx-auto min-h-screen h-auto py-5 px-1 ">
      <div className="max-w-3xl">
        <EchoDetails title={echo.title} description={echo.description} />
      </div>

      <div className="w-full max-w-xl h-px my-10 bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="w-full flex justify-between px-12">
        <h2 className="font-bold text-3xl">Feedbacks</h2>
        <p>Filter Option</p>
      </div>

      <div className="flex flex-col gap-y-16 items-center py-10">
        {data.docs.map((item: FeedbackObject) => (
          <FeedbackCard key={item._id} feedback={item} />
        ))}
      </div>

      <PaginationButtons pagination={paginationInfo} />
    </div>
  );
}
