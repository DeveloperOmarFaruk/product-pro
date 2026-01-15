import React, { useState, useEffect } from "react";
import { Loader2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Product,
  ProductCreateInput,
  ProductStatus,
} from "@/types/productTypes";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit" | "view";
  product?: Product | null;
  onSave: (data: ProductCreateInput) => void;
  isLoading?: boolean;
}

const categories = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports",
  "Beauty",
  "Books",
  "Toys",
  "Food",
];
const statuses = ["active", "inactive", "draft"];

export default function ProductModal({
  isOpen,
  onClose,
  mode,
  product,
  onSave,
  isLoading = false,
}: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "active",
    description: "",
    img_url: "",
  });

  useEffect(() => {
    if (!isOpen) return; // Only run when modal is open

    // If editing or viewing an existing product, populate the form
    if (product && (mode === "edit" || mode === "view")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: product.name || "",
        category: product.category || "",
        price: product.price?.toString() || "",
        stock: product.stock?.toString() || "",
        status: product.status || "active",
        description: product.description || "",
        img_url: product.img_url || "",
      });
    } else {
      // Otherwise, reset form for creating a new product
      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        status: "active",
        description: "",
        img_url: "",
      });
    }
  }, [isOpen, mode, product]); // Only depend on isOpen

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSave({
      ...formData,
      price: parseFloat(formData.price) || 0,
      stock: parseInt(formData.stock) || 0,
      status: formData.status as ProductStatus, // ensure type
      description: formData.description || "",
      img_url: formData.img_url || "",
      createdAt: new Date().toISOString(), // set to today
    });
  };

  const isViewMode = mode === "view";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            {mode === "create"
              ? "Create Product"
              : mode === "edit"
              ? "Edit Product"
              : "Product Details"}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-5 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-11 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-11 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-11 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-11 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-11 w-full" />
              </div>
              <div className="col-span-2 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-11 w-full" />
              </div>
              <div className="col-span-2 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">
                  Product Name
                </Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter product name"
                  disabled={isViewMode}
                  className="h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  required
                  maxLength={40}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">
                  Category
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                  disabled={isViewMode}
                  required
                >
                  <SelectTrigger className="h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                  disabled={isViewMode}
                  required
                >
                  <SelectTrigger className="h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem
                        key={status}
                        value={status}
                        className="capitalize"
                      >
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">
                  Price ($)
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Only allow empty or positive numbers
                    if (value === "" || parseFloat(value) >= 0) {
                      setFormData({ ...formData, price: value });
                    }
                  }}
                  placeholder="0.00"
                  disabled={isViewMode}
                  className="h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">
                  Stock
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || parseInt(value) >= 0) {
                      setFormData({ ...formData, stock: value });
                    }
                  }}
                  placeholder="0"
                  disabled={isViewMode}
                  className="h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  required
                />
              </div>

              <div className="col-span-2 space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">
                  Image URL
                </Label>
                <Input
                  value={formData.img_url}
                  onChange={(e) =>
                    setFormData({ ...formData, img_url: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                  disabled={isViewMode}
                  className="h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  required
                />
              </div>

              <div className="col-span-2 space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">
                  Description
                </Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter product description"
                  disabled={isViewMode}
                  className="min-h-24 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 resize-none"
                  required
                  maxLength={100}
                />
              </div>
            </div>

            {!isViewMode && (
              <div
                className="flex justify-end gap-3 pt-4 border-t border-slate-100
               dark:border-slate-800 "
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isLoading}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-indigo-500 to-violet-600
                   hover:from-indigo-600 hover:to-violet-700 cursor-pointer"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  {mode === "create" ? "Create Product" : "Save Changes"}
                </Button>
              </div>
            )}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
