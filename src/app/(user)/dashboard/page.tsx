import {
  EchoCard,
  PaginationButtons,
  EmptyState,
  EchoCardSkeleton,
} from "@/components/server";
import { Button } from "@/components/ui";
import { getPaginationInfo } from "@/lib/utils";
import { EchoObject } from "@/types";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard | GhostPOV",
  description: "Manage and track your echo collection.",
  robots: {
    index: false,
    follow: true,
  },
};

interface PageProps {
  searchParams: { p?: string };
}

async function EchoList({ searchParams }: PageProps) {
  const queryParams = await searchParams;
  const page = Number(queryParams?.p || 1);

  const headersList = await headers();

  const response = await fetch(
    `${process.env.BASE_URL}/api/user-echos?page=${page}&limit=25`,
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
    return <div>{message}</div>;
  }

  const paginationInfo = getPaginationInfo(data);

  if (data.docs.length === 0) {
    return (
      <EmptyState
        title="Empty For Now"
        message="Create your first echo to get started"
        type="echos"
      />
    );
  }

  return (
    <>
      <div className="flex flex-col items-center gap-y-10 px-2">
        {data.docs.map((echo: EchoObject) => (
          <EchoCard key={echo.publicId} echo={echo} />
        ))}
      </div>

      {!data.hasNextPage && <div className="py-10"></div>}
      <PaginationButtons pagination={paginationInfo} />

      {paginationInfo.currPage === 1 && !paginationInfo.hasNextPage && (
        <div className="py-40"></div>
      )}
    </>
  );
}

export default function DashboardPage(props: PageProps) {
  return (
    <div className="flex flex-col min-h-screen h-auto overflow-y-auto">
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

      {/* Echo Cards with Pagination */}
      <Suspense
        fallback={
          <div className="flex flex-col items-center gap-y-10 px-2">
            {Array.from({ length: 25 }).map((_, index) => (
              <EchoCardSkeleton key={index} />
            ))}
          </div>
        }
      >
        <EchoList {...props} />
      </Suspense>
    </div>
  );
}
