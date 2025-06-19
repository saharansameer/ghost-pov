import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationButtonsProps {
  pagination: PaginationInfo;
}

export function PaginationButtons({ pagination }: PaginationButtonsProps) {
  const isFirstPage = pagination.currPage === 1;
  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        {pagination.hasPrevPage && (
          <PaginationItem >
            <PaginationPrevious href={`?p=${pagination.prevPage || 1}`}/>
          </PaginationItem>
        )}

        {/* First Page */}
        <PaginationItem>
          <PaginationLink href={`?p=${1}`} isActive={isFirstPage}>
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
            <PaginationLink href={`?p=${pagination.currPage}`} isActive={true}>
              {pagination.currPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Next Button */}
        {pagination.hasNextPage && (
          <PaginationItem>
            <PaginationNext
              href={`?p=${pagination.nextPage || pagination.currPage}`}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
