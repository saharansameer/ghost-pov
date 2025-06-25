import { headers } from "next/headers";
import { EchoCard, PaginationButtons } from "@/components/server";
import { Button } from "@/components/ui";
import { getPaginationInfo } from "@/lib/utils";
import { EchoObject } from "@/types";
import Link from "next/link";

interface DashboardProps {
  searchParams?: Promise<{ p?: string }>;
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const queryParams = await searchParams;
  const page = Number(queryParams?.p || 1);

  const response = await fetch(
    `${process.env.APP_URL}/api/user-echos?page=${page}&limit=15`,
    {
      next: { revalidate: 60 },
      headers: await headers(),
    }
  );
  const { data } = await response.json();
  const paginationInfo = getPaginationInfo(data);

  return (
    <div className="flex flex-col min-h-screen h-auto overflow-y-scroll">
      <div className="py-5">
        <Link href={"/dashboard/echo/create"}>
          <Button variant="default">Create Echo</Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-10 justify-center xl:justify-normal px-2">
        {data.docs.map((echo: EchoObject) => (
          <EchoCard key={echo.publicId} echo={echo} />
        ))}
      </div>

      <PaginationButtons pagination={paginationInfo} />
    </div>
  );
}
