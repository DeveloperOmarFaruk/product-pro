import { Eye, Package, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import TableSkeleton from "../skeletons/TableSkeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "../ui/checkbox";
import { motion as Motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { format } from "date-fns";
import { Product, ProductStatus } from "@/types/productTypes";

interface ProductTableProps {
  products?: Product[];
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  isLoading?: boolean;
  loadingIds?: number[];
  onStatusChange: (id: number, status: ProductStatus) => Promise<void>;
}

export default function ProductTable({
  products,
  selectedIds,
  setSelectedIds,
  onView,
  onEdit,
  onDelete,
  isLoading = false,
  loadingIds = [],
  onStatusChange,
}: ProductTableProps) {
  /* Check selection states for header checkbox */
  const allSelected =
    products && products.length > 0 && selectedIds.length === products.length;

  const someSelected =
    products && selectedIds.length > 0 && selectedIds.length < products.length;

  /* Toggle select/deselect all rows */
  const toggleAll = () => {
    if (!products) return; // Safety check

    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map((p) => p.id));
    }
  };

  /* Toggle selection for a single row */
  const toggleOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  /* Show skeleton while loading table data */
  if (isLoading) {
    return <TableSkeleton rows={5} />;
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          {/* ---------- Table Header ---------- */}
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-slate-800/50">
              {/* Select all checkbox */}
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    allSelected ? true : someSelected ? "indeterminate" : false
                  }
                  onCheckedChange={toggleAll}
                />
              </TableHead>

              {/* Column titles */}
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          {/* ---------- Table Body ---------- */}
          <TableBody>
            {products?.map((product, index) => (
              /* Animated table row */
              <Motion.tr
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className={cn(
                  "border-b hover:bg-slate-50 dark:hover:bg-slate-800/30",
                  /* Highlight selected rows */
                  selectedIds.includes(product.id) &&
                    "bg-indigo-50 dark:bg-indigo-900/20"
                )}
              >
                {/* Row checkbox */}
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(product.id)}
                    onCheckedChange={() => toggleOne(product.id)}
                  />
                </TableCell>

                {/* Product name + image */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50">
                      {product.img_url ? (
                        <img
                          src={product.img_url}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-5 h-5 text-indigo-500" />
                      )}
                    </div>
                    <span className="font-medium">{product.name}</span>
                  </div>
                </TableCell>

                {/* Category */}
                <TableCell>{product.category}</TableCell>

                {/* Price */}
                <TableCell className="font-medium">
                  ${product.price?.toFixed(2)}
                </TableCell>

                {/* Stock with low-stock warning */}
                <TableCell>
                  <span
                    className={cn(
                      "font-medium",
                      product.stock < 10
                        ? "text-rose-600"
                        : "text-slate-900 dark:text-white"
                    )}
                  >
                    {product.stock}
                  </span>
                </TableCell>

                {/* Status dropdown with async update */}
                <TableCell>
                  <Select
                    value={product.status}
                    onValueChange={(value) => {
                      if (["active", "inactive", "draft"].includes(value)) {
                        onStatusChange(product.id, value as ProductStatus);
                      }
                    }}
                    disabled={loadingIds.includes(product.id)}
                  >
                    <SelectTrigger
                      className={cn(
                        "w-28 h-8 text-xs cursor-pointer",
                        statusColors[product.status as ProductStatus]
                      )}
                    >
                      {loadingIds.includes(product.id) ? (
                        "Updating..."
                      ) : (
                        <SelectValue />
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>

                {/* Created date */}
                <TableCell className="text-sm text-slate-500">
                  {product.createdAt
                    ? format(new Date(product.createdAt), "MMM dd, yyyy")
                    : "-"}
                </TableCell>

                {/* Row actions */}
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView(product)}
                      className="cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(product)}
                      className="cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(product)}
                      className="cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </Motion.tr>
            ))}

            {/* Empty state */}
            {products?.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-40 text-center">
                  <div className="flex flex-col items-center">
                    <Package className="w-12 h-12 text-slate-300 mb-3" />
                    <p className="text-slate-500">No products found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const statusColors: Record<ProductStatus, string> = {
  active: "text-emerald-700 bg-emerald-50 border-emerald-200",
  inactive: "text-slate-600 bg-slate-50 border-slate-200",
  draft: "text-amber-700 bg-amber-50 border-amber-200",
};
