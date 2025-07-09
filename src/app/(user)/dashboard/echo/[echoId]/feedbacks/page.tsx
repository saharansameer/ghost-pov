import {
  PaginationButtons,
  FeedbackCard,
  EchoDetails,
  NotSuccess,
  EmptyState,
} from "@/components/server";
import {
  FilterOptions,
  SummarySection,
  EchoOptions,
} from "@/components/client";
import { getPaginationInfo } from "@/lib/utils";
import { FeedbackObject } from "@/types";
import { headers } from "next/headers";

type PageProps = {
  params: Promise<{ echoId?: string }>;
  searchParams: Promise<{ p?: string; f?: string }>;
};

async function FeedbacksAndSummaries({ params, searchParams }: PageProps) {
  const { echoId } = await params;
  const queryParams = await searchParams;
  const page = Number(queryParams?.p || 1);
  const filterBy = queryParams?.f || "";

  const headersList = await headers();

  const response = await fetch(
    `${process.env.BASE_URL}/api/echo/feedbacks?echoId=${echoId}&page=${page}&limit=25&filter=${filterBy}`,
    {
      headers: {
        cookie: headersList.get("cookie") || "",
        authorization: headersList.get("authorization") || "",
      },
      next: { revalidate: 0 },
    }
  );

  const { success, message, data, echo } = await response.json();

  if (!success) {
    return <NotSuccess message={message} />;
  }

  const paginationInfo = getPaginationInfo({ ...data, docs: [] });

  return (
    <>
      <EchoOptions
        echoId={echo._id}
        publicId={echo.publicId}
        isAcceptingFeedback={echo.isAcceptingFeedback}
      />

      <div className="w-full max-w-2xl">
        <EchoDetails title={echo.title} description={echo.description} />
      </div>

      <div className="w-full max-w-xl h-px my-10 bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Summary Section */}
      <div className="w-full max-w-2xl ">
        <SummarySection summaries={echo.summaries} echoId={echo._id} />
      </div>

      <div className="w-full max-w-xl h-px my-20 bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-y-2 max-w-2xl">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Feedbacks</h2>
          <p className="text-muted-foreground">
            Recieved anonymous feedback responses
          </p>
        </div>

        <FilterOptions
          echoId={echo._id}
          page={String(page)}
          defaultFilter={filterBy}
        />
      </div>

      <div className="w-full flex flex-col gap-y-16 items-center py-10">
        {data.docs.length === 0 && (
          <EmptyState title="No Feedbacks Yet" type="feedback" />
        )}
        {data.docs.map((item: FeedbackObject) => (
          <FeedbackCard key={item._id} feedback={item} />
        ))}
      </div>

      <PaginationButtons pagination={paginationInfo} filter={filterBy} />
    </>
  );
}

export default function EchoPage(props: PageProps) {
  return (
    <div className="w-full max-w-3xl flex flex-col items-center mx-auto min-h-screen h-auto py-5 px-1">
      <FeedbacksAndSummaries {...props} />
    </div>
  );
}
