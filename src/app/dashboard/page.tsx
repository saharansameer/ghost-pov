import { headers } from "next/headers";
import { EchoCard } from "@/components/Echo/EchoCard";
import { PaginationButtons } from "@/components/Common/PaginationButtons";
import { getPaginationInfo } from "@/lib/utils";

interface DashboardProps {
  searchParams?: Promise<{ p?: string }>;
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const params = await searchParams;
  const page = Number(params?.p || 1);

  const response = await fetch(
    `${process.env.APP_URL}/api/get-echos?page=${page}&limit=1`,
    {
      next: { revalidate: 600 },
      headers: await headers(),
    }
  );
  const { data } = await response.json();
  const paginationInfo = getPaginationInfo(data);

  return (
    <div className="flex flex-col">
      <div> Create Echo </div>
      <div className="flex flex-wrap gap-10 justify-center xl:justify-normal px-5">
        {data.docs.map((echo: EchoObject) => (
          <EchoCard key={echo.publicId} echo={echo} />
        ))}
      </div>
      <PaginationButtons pagination={paginationInfo} />
    </div>
  );
}
