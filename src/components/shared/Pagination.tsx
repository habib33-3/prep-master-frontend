import { memo } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = memo(
  ({ totalPages = 1, currentPage = 1, onPageChange }: PaginationProps) => (
    <div className="flex items-center justify-between gap-4 sm:gap-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1 || totalPages <= 1}
        className="gap-1 pl-2.5 pr-3.5 transition-all hover:bg-accent/90 hover:shadow-md disabled:opacity-50 disabled:hover:bg-transparent"
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4" />
        <span className="sr-only sm:not-sr-only sm:inline">Previous</span>
      </Button>

      <div className="flex items-center gap-3 font-semibold">
        <span className="rounded-xl bg-accent px-4 py-2 text-2xl font-semibold text-accent-foreground shadow-md transition-all hover:bg-accent/90 hover:shadow-lg">
          {currentPage}
        </span>
        <span className="text-2xl font-semibold text-foreground/50">/</span>
        <span className="text-xl text-foreground/50">
          {Math.max(1, totalPages)}
        </span>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages || totalPages <= 1}
        className="gap-1 pl-3.5 pr-2.5 transition-all hover:bg-accent/90 hover:shadow-md disabled:opacity-50 disabled:hover:bg-transparent"
        aria-label="Next page"
      >
        <span className="sr-only sm:not-sr-only sm:inline">Next</span>
        <ChevronRight className="size-4" />
      </Button>
    </div>
  )
);

Pagination.displayName = "Pagination";

export default Pagination;
