/* eslint-disable react-hooks/set-state-in-effect */
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
  mode, // "create" | "edit" | "view"
  product,
  onSave,
  isLoading = false,
}: ProductModalProps) {
  /* Local form state (string-based for controlled inputs) */
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "active",
    description: "",
    img_url: "",
  });

  /* Populate or reset form when modal opens or mode/product changes */
  useEffect(() => {
    if (!isOpen) return; // Avoid unnecessary updates when modal is closed

    // Populate form for edit/view mode
    if (product && (mode === "edit" || mode === "view")) {
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
      // Reset form for create mode
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
  }, [isOpen, mode, product]);

  /* Handle form submission */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Normalize values before saving
    onSave({
      ...formData,
      price: parseFloat(formData.price) || 0,
      stock: parseInt(formData.stock) || 0,
      status: formData.status as ProductStatus,
      description: formData.description || "",
      img_url: formData.img_url || "",
      createdAt: new Date().toISOString(), // Set creation/update time
    });
  };

  /* View mode disables all inputs and hides actions */
  const isViewMode = mode === "view";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        {/* ---------- Header ---------- */}
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>

            {/* Dynamic title based on mode */}
            {mode === "create"
              ? "Create Product"
              : mode === "edit"
              ? "Edit Product"
              : "Product Details"}
          </DialogTitle>
        </DialogHeader>

        {/* ---------- Loading Skeleton ---------- */}
        {isLoading ? (
          <div className="space-y-5 mt-4">
            {/* Skeleton mirrors form layout for better UX */}
            <div className="grid grid-cols-2 gap-4">
              {/* Reusable skeleton blocks */}
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
          /* ---------- Product Form ---------- */
          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Product name */}
              <div className="col-span-2 space-y-2">
                <Label>Product Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter product name"
                  disabled={isViewMode}
                  required
                  maxLength={40}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                  disabled={isViewMode}
                  required
                >
                  <SelectTrigger>
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

              {/* Status */}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                  disabled={isViewMode}
                  required
                >
                  <SelectTrigger>
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

              {/* Price (non-negative only) */}
              <div className="space-y-2">
                <Label>Price ($)</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || parseFloat(value) >= 0) {
                      setFormData({ ...formData, price: value });
                    }
                  }}
                  disabled={isViewMode}
                  required
                  placeholder="Enter price, e.g., 19.99"
                />
              </div>

              {/* Stock (non-negative integer) */}
              <div className="space-y-2">
                <Label>Stock</Label>
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
                  disabled={isViewMode}
                  required
                  placeholder="Enter stock quantity, e.g., 50"
                />
              </div>

              {/* Image URL */}
              <div className="col-span-2 space-y-2">
                <Label>Image URL</Label>
                <Input
                  value={formData.img_url}
                  onChange={(e) =>
                    setFormData({ ...formData, img_url: e.target.value })
                  }
                  disabled={isViewMode}
                  required
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Description */}
              <div className="col-span-2 space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  placeholder="Enter product description (max 100 characters)"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  disabled={isViewMode}
                  required
                  maxLength={100}
                />
              </div>
            </div>

            {/* ---------- Actions (hidden in view mode) ---------- */}
            {!isViewMode && (
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button type="submit" className="cursor-pointer">
                  {isLoading && (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  )}
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
