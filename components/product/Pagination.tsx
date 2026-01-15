import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import React from "react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  /* Calculate visible item range */
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  /* Generate page numbers with smart ellipsis handling */
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    // If total pages are small, show all
    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Near the beginning
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
      // Near the end
      else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      }
      // In the middle
      else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
      {/* ---------- Items info ---------- */}
      <div className="text-sm text-slate-500 dark:text-slate-400">
        Showing{" "}
        <span className="font-medium text-slate-900 dark:text-white">
          {startItem}
        </span>{" "}
        to{" "}
        <span className="font-medium text-slate-900 dark:text-white">
          {endItem}
        </span>{" "}
        of{" "}
        <span className="font-medium text-slate-900 dark:text-white">
          {totalItems}
        </span>{" "}
        products
      </div>

      {/* ---------- Pagination controls ---------- */}
      <div className="flex items-center gap-2">
        {/* Items-per-page selector */}
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(v) => onItemsPerPageChange(parseInt(v))}
        >
          <SelectTrigger
            className="w-20 h-9 bg-white dark:bg-slate-800
             border-slate-200 dark:border-slate-700 cursor-pointer"
          >
            <SelectValue />
          </SelectTrigger>

          {/* Options */}
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1">
          {/* Go to first page */}
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 cursor-pointer"
            disabled={currentPage === 1}
            onClick={() => onPageChange(1)}
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>

          {/* Previous page */}
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 cursor-pointer"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {/* Page numbers */}
          {getPageNumbers().map((page, idx) => (
            <div key={idx}>
              {page === "..." ? (
                /* Ellipsis separator */
                <span className="px-2 text-slate-400">...</span>
              ) : (
                /* Page button */
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  className={cn(
                    "h-9 w-9 cursor-pointer",
                    currentPage === page &&
                      "bg-gradient-to-r from-indigo-500 to-violet-600 border-0"
                  )}
                  onClick={() => typeof page === "number" && onPageChange(page)}
                >
                  {page}
                </Button>
              )}
            </div>
          ))}

          {/* Next page */}
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 cursor-pointer"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Go to last page */}
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 cursor-pointer"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
          >
            <ChevronsRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
