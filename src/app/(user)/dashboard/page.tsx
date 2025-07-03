import { headers } from "next/headers";
import { EchoCard, PaginationButtons } from "@/components/server";
import { Button } from "@/components/ui";
import { getPaginationInfo } from "@/lib/utils";
import { EchoObject } from "@/types";
import Link from "next/link";
import { Plus } from "lucide-react";

interface DashboardProps {
  searchParams?: Promise<{ p?: string }>;
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const queryParams = await searchParams;
  const page = Number(queryParams?.p || 1);

  const response = await fetch(
    `${process.env.APP_URL}/api/user-echos?page=${page}&limit=15`,
    {
      next: { revalidate: 0 },
      headers: await headers(),
    }
  );
  const { success, message, data } = await response.json();

  if (!success) {
    return <div>{message}</div>;
  }

  const paginationInfo = getPaginationInfo(data);

  return (
    <div className="flex flex-col min-h-screen h-auto overflow-y-scroll">
      <div className="flex justify-center pt-4 pb-10">
        {/* Page Title and Actions */}
        <div className="w-full max-w-2xl flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Echos Dashboard
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage and track your echo collection
            </p>
          </div>
          <Link href={"/dashboard/echo/create"}>
            <Button variant="default" className="font-semibold">
              <Plus size={16} className="mr-2" />
              Create Echo
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center gap-y-10 px-2">
        {data.docs.map((echo: EchoObject) => (
          <EchoCard key={echo.publicId} echo={echo} />
        ))}
      </div>

      {!data.hasNextPage && <div className="py-10"></div>}
      <PaginationButtons pagination={paginationInfo} />
    </div>
  );
}
