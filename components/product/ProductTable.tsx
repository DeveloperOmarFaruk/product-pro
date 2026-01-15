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
  const allSelected =
    products && products.length > 0 && selectedIds.length === products.length;
  const someSelected =
    products && selectedIds.length > 0 && selectedIds.length < products.length;

  const toggleAll = () => {
    if (!products) return; // safeguard if products is undefined

    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map((p) => p.id));
    }
  };

  const toggleOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  if (isLoading) {
    return <TableSkeleton rows={5} />;
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    allSelected ? true : someSelected ? "indeterminate" : false
                  }
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                Product
              </TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                Category
              </TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                Price
              </TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                Stock
              </TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                Status
              </TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                Created
              </TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product, index) => (
              <Motion.tr
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className={cn(
                  "border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors",
                  selectedIds.includes(product.id) &&
                    "bg-indigo-50 dark:bg-indigo-900/20"
                )}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(product.id)}
                    onCheckedChange={() => toggleOne(product.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/50 dark:to-violet-900/50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {product?.img_url ? (
                        <img
                          src={product?.img_url}
                          alt={product?.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </div>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {product.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600 dark:text-slate-400">
                  {product.category}
                </TableCell>
                <TableCell className="font-medium text-slate-900 dark:text-white">
                  ${product.price?.toFixed(2)}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "font-medium",
                      product.stock < 10
                        ? "text-rose-600 dark:text-rose-400"
                        : "text-slate-900 dark:text-white"
                    )}
                  >
                    {product.stock}
                  </span>
                </TableCell>
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
                        "w-28 h-8 text-xs border cursor-pointer",
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
                <TableCell className="text-slate-500 dark:text-slate-400 text-sm">
                  {product.createdAt
                    ? format(new Date(product.createdAt), "MMM dd, yyyy")
                    : "-"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView(product)}
                      className="h-8 w-8 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(product)}
                      className="h-8 w-8 text-slate-500 hover:text-indigo-600 cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(product)}
                      className="h-8 w-8 text-slate-500 hover:text-rose-600 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </Motion.tr>
            ))}

            {products?.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Package className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" />
                    <p className="text-slate-500 dark:text-slate-400">
                      No products found
                    </p>
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
