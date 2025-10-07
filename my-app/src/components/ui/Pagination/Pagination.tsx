import React from "react";
import clsx from "clsx";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { Button } from "../Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  siblingCount?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  siblingCount = 1,
}) => {
  if (totalPages <= 1) return null;

  const createPageArray = () => {
    const pages: (number | string)[] = [];
    const startPage = Math.max(1, currentPage - siblingCount);
    const endPage = Math.min(totalPages, currentPage + siblingCount);

    if (startPage > 1) pages.push(1);
    if (startPage > 2) pages.push("...");

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) pages.push("...");
    if (endPage < totalPages) pages.push(totalPages);

    return pages;
  };

  const pages = createPageArray();

  return (
    <div
      className={clsx("flex justify-center gap-2 mt-4 flex-wrap", className)}
    >
      <Button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <MdNavigateBefore size={24} />
      </Button>

      {pages.map((page, idx) =>
        typeof page === "number" ? (
          <Button
            onClick={() => onPageChange(page)}
            className={clsx(
              "px-3 py-1 border rounded transition-colors",
              page === currentPage
                ? "bg-blue-500 dark:bg-blue-600 text-white border-blue-500 dark:border-blue-600"
                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            )}
          >
            {page}
          </Button>
        ) : (
          <span
            key={idx}
            className="px-2 py-1 text-gray-500 dark:text-gray-400"
          >
            {page}
          </span>
        )
      )}

      <Button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <MdNavigateNext size={24} />
      </Button>
    </div>
  );
};

export default Pagination;
