import { Button } from "@/components/ui/button";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => (
  <div className="flex items-center gap-2">
    <Button
      variant="outline"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage <= 1}
    >
      Previous
    </Button>
    <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
    <Button
      variant="outline"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage >= totalPages}
    >
      Next
    </Button>
  </div>
);

export default Pagination;
