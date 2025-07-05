import { headers } from "next/headers";
import { Markdown } from "@/components/client";

type SummaryPageProps = {
  params: Promise<{ summaryId: string }>;
};

export default async function SummaryPage({ params }: SummaryPageProps) {
  const { summaryId } = await params;

  const response = await fetch(
    `${process.env.APP_URL}/api/summary/${summaryId}`,
    {
      method: "GET",
      headers: await headers(),
      next: { revalidate: 0 },
    }
  );

  const { success, message, content } = await response.json();

  if (!success) {
    return <div>{message}</div>;
  }

  return (
    <div>
      <Markdown markdownString={content} />
    </div>
  );
}
