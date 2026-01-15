import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Horizontal scroll wrapper */}
      <div className="overflow-x-auto">
        <Table>
          {/* ---------- Table Header Skeleton ---------- */}
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50">
              {/* Checkbox column */}
              <TableHead className="w-12">
                <Skeleton className="h-4 w-4" />
              </TableHead>
              {/* Column headers */}
              <TableHead>
                <Skeleton className="h-4 w-20" /> {/* Product name */}
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-20" /> {/* Category */}
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-16" /> {/* Price */}
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-16" /> {/* Stock */}
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-16" /> {/* Status */}
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-20" /> {/* Created */}
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="h-4 w-16 ml-auto" /> {/* Actions */}
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* ---------- Table Body Skeleton ---------- */}
          <TableBody>
            {Array.from({ length: rows }).map((_, index) => (
              <TableRow
                key={index}
                className="border-b border-slate-100 dark:border-slate-800"
              >
                {/* Checkbox */}
                <TableCell>
                  <Skeleton className="h-4 w-4" />
                </TableCell>

                {/* Product info */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-lg" />{" "}
                    {/* Product image */}
                    <Skeleton className="h-4 w-32" /> {/* Product name */}
                  </div>
                </TableCell>

                {/* Category */}
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>

                {/* Price */}
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>

                {/* Stock */}
                <TableCell>
                  <Skeleton className="h-4 w-12" />
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Skeleton className="h-8 w-28 rounded-md" />
                </TableCell>

                {/* Created */}
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Skeleton className="h-8 w-8 rounded-md" /> {/* View */}
                    <Skeleton className="h-8 w-8 rounded-md" /> {/* Edit */}
                    <Skeleton className="h-8 w-8 rounded-md" /> {/* Delete */}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
