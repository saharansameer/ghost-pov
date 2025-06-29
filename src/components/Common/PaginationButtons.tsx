import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationInfo } from "@/types";

interface PaginationButtonsProps {
  pagination: PaginationInfo;
  filter?: string;
}

export function PaginationButtons({
  pagination,
  filter,
}: PaginationButtonsProps) {
  const isFirstPage = pagination.currPage === 1;

  const getHref = (page: number) => {
    if (filter) return `?p=${page}&f=${filter}`;
    return `?p=${page}`;
  };

  return (
    <div
      className={
        isFirstPage && !pagination.hasNextPage ? "hidden" : "mt-auto py-10"
      }
    >
      <Pagination>
        <PaginationContent>
          {/* Previous Button */}
          {pagination.hasPrevPage && (
            <PaginationItem>
              <PaginationPrevious href={getHref(pagination.prevPage || 1)} />
            </PaginationItem>
          )}

          {/* First Page */}
          <PaginationItem>
            <PaginationLink href={getHref(1)} isActive={isFirstPage}>
              1
            </PaginationLink>
          </PaginationItem>

          {/* Ellipsis (Three Dots) */}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          {/* Current Page */}
          {!isFirstPage && (
            <PaginationItem>
              <PaginationLink
                href={getHref(pagination.currPage)}
                isActive={true}
              >
                {pagination.currPage}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Next Button */}
          {pagination.hasNextPage && (
            <PaginationItem>
              <PaginationNext
                href={getHref(pagination.nextPage || pagination.currPage)}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
