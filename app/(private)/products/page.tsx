"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductTable from "@/components/product/ProductTable";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/store/productsApi";
import {
  Product,
  ProductCreateInput,
  ProductStatus,
} from "@/types/productTypes";
import useError from "@/hooks/useError";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { toast } from "@/lib/toast";
import Pagination from "@/components/product/Pagination";
import ProductModal from "@/components/product/ProductModal";
import DeleteConfirmModal from "@/components/product/DeleteConfirmModal";
import BulkActions from "@/components/product/BulkActions";
import ProductFilters from "@/components/product/ProductFilters";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  setCategoryFilter,
  setSearchQuery,
  setStatusFilter,
} from "@/store/slices/productFiltersSlice";
import { debounce } from "lodash";

export default function Products() {
  const dispatch = useDispatch<AppDispatch>(); // Redux dispatch

  // -------------------------
  // Component State
  // -------------------------
  const [loadingIds, setLoadingIds] = useState<number[]>([]); // Track per-row loading for status updates
  const [itemsPerPage, setItemsPerPage] = useState(10); // Number of products per page
  const [currentPage, setCurrentPage] = useState(1); // Current pagination page
  const [selectedIds, setSelectedIds] = useState<number[]>([]); // Selected products for bulk actions
  const [modalMode, setModalMode] = useState<"create" | "view" | "edit">(
    "create"
  ); // Modal mode
  const [modalOpen, setModalOpen] = useState(false); // Product modal visibility
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Product currently selected for modal
  const [productToDelete, setProductToDelete] = useState<Product | null>(null); // Product selected for deletion
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Single delete modal
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false); // Bulk delete modal

  // -------------------------
  // API Queries and Mutations (RTK Query)
  // -------------------------
  const { data, isLoading } = useGetProductsQuery(); // Fetch all products

  const [
    createProduct,
    { isLoading: createLoading, isError: createIsError, error: createError },
  ] = useCreateProductMutation(); // Create product mutation

  const [
    updateProduct,
    { isLoading: updateLoading, isError: updateIsError, error: updateError },
  ] = useUpdateProductMutation(); // Update product mutation

  const [
    deleteProduct,
    { isLoading: deleteLoading, isError: deleteIsError, error: deleteError },
  ] = useDeleteProductMutation(); // Delete product mutation

  // -------------------------
  // Error handling hooks
  // -------------------------
  useError(
    createIsError,
    createError as FetchBaseQueryError | SerializedError | undefined,
    "Product created failed"
  );
  useError(
    updateIsError,
    updateError as FetchBaseQueryError | SerializedError | undefined,
    "Product updated failed"
  );
  useError(
    deleteIsError,
    deleteError as FetchBaseQueryError | SerializedError | undefined,
    "Product deleted failed"
  );

  // -------------------------
  // Data Preparation
  // -------------------------
  const safeData = data ?? []; // Ensure data is always an array

  // Redux filters
  const { searchQuery, categoryFilter, statusFilter } = useSelector(
    (state: RootState) => state.productFilters
  );

  const [searchInput, setSearchInput] = useState(searchQuery); // Local state for search input

  // -------------------------
  // Debounced filter dispatch functions
  // -------------------------
  const debouncedSearch = useMemo(
    () => debounce((value: string) => dispatch(setSearchQuery(value)), 800),
    [dispatch]
  );

  const debouncedCategory = useMemo(
    () => debounce((value: string) => dispatch(setCategoryFilter(value)), 800),
    [dispatch]
  );

  const debouncedStatus = useMemo(
    () => debounce((value: string) => dispatch(setStatusFilter(value)), 800),
    [dispatch]
  );

  // -------------------------
  // Filter Handlers
  // -------------------------
  const handleSearchChange = (value: string) => {
    setSearchInput(value); // Update local input
    debouncedSearch(value); // Dispatch debounced search
  };

  const handleCategoryChange = (value: string) => debouncedCategory(value);
  const handleStatusChangeFilter = (value: string) => debouncedStatus(value);

  // -------------------------
  // Filter and Sort Products
  // -------------------------
  const filteredProducts = useMemo(() => {
    return [...safeData]
      .filter((product) => {
        const matchesSearch = product.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesCategory =
          categoryFilter === "All" || product.category === categoryFilter;
        const matchesStatus =
          statusFilter === "All" || product.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }, [safeData, searchQuery, categoryFilter, statusFilter]);

  // -------------------------
  // Pagination
  // -------------------------
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage); // Total pages
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage); // Current page products
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Reset page on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter, statusFilter]);

  // -------------------------
  // Modal Handlers
  // -------------------------
  const handleCreate = () => {
    setModalMode("create");
    setSelectedProduct(null);
    setModalOpen(true);
  };
  const handleView = (product: Product) => {
    setModalMode("view");
    setSelectedProduct(product);
    setModalOpen(true);
  };
  const handleEdit = (product: Product) => {
    setModalMode("edit");
    setSelectedProduct(product);
    setModalOpen(true);
  };
  const handleDelete = (product: Product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };
  const handleBulkDelete = () => setBulkDeleteOpen(true);

  // -------------------------
  // Status Change Handler
  // -------------------------
  const handleStatusChange = async (id: number, status: ProductStatus) => {
    setLoadingIds((prev) => [...prev, id]); // Mark row as loading
    try {
      await updateProduct({ id, data: { status } }); // Update status via API
      toast("success", "Status updated successfully");
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingIds((prev) => prev.filter((loadingId) => loadingId !== id)); // Remove loading
    }
  };

  // -------------------------
  // Save (Create / Update) Product
  // -------------------------
  const handleSave = async (data: ProductCreateInput) => {
    try {
      if (modalMode === "create") {
        const payload = {
          ...data,
          description: data.description || "",
          img_url: data.img_url || "",
          createdAt: new Date().toISOString(),
        };
        await createProduct(payload).unwrap();
        toast("success", "Product created successfully");
      } else if (selectedProduct?.id) {
        const payload = {
          ...data,
          description: data.description || "",
          img_url: data.img_url || "",
        };
        await updateProduct({ id: selectedProduct.id, data: payload }).unwrap();
        toast("success", "Product updated successfully");
      }
      setModalOpen(false); // Close modal
    } catch (err) {
      console.error(err);
      toast("error", "Failed to save product");
    }
  };

  // -------------------------
  // Delete Handlers
  // -------------------------
  const handleDeleteConfirm = async () => {
    if (!productToDelete?.id) return;
    try {
      await deleteProduct(productToDelete.id).unwrap(); // Delete single product
      toast("success", "Product deleted successfully");
      setDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (err) {
      console.error(err);
      toast("error", "Failed to delete product");
    }
  };

  const handleBulkDeleteConfirm = async () => {
    if (!selectedIds.length) return;
    try {
      await deleteProduct(selectedIds).unwrap(); // Delete selected products
      toast("success", "Products deleted successfully");
      setBulkDeleteOpen(false);
      setSelectedIds([]);
    } catch (err) {
      console.error(err);
      toast("error", "Failed to delete selected products");
    }
  };

  // -------------------------
  // Cleanup debounced functions on unmount
  // -------------------------
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
      debouncedCategory.cancel();
      debouncedStatus.cancel();
    };
  }, [debouncedSearch, debouncedCategory, debouncedStatus]);

  // -------------------------
  // Render UI
  // -------------------------
  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Products
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Manage your product inventory
            </p>
          </div>
          <Button
            onClick={handleCreate}
            className="bg-gradient-to-r from-indigo-500 to-violet-600
           hover:from-indigo-600 hover:to-violet-700 shadow-lg shadow-indigo-500/30 cursor-pointer"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Filters */}
        <ProductFilters
          searchQuery={searchInput}
          setSearchQuery={handleSearchChange}
          categoryFilter={categoryFilter}
          setCategoryFilter={handleCategoryChange}
          statusFilter={statusFilter}
          setStatusFilter={handleStatusChangeFilter}
        />

        {/* Product Table */}
        <ProductTable
          products={paginatedProducts}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          isLoading={isLoading}
          loadingIds={loadingIds}
        />

        {/* Pagination */}
        {data && data.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={data.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(value) => {
              setItemsPerPage(value);
              setCurrentPage(1);
            }}
          />
        )}

        {/* Bulk Actions */}
        <BulkActions
          selectedCount={selectedIds.length}
          onDelete={handleBulkDelete}
          onClear={() => setSelectedIds([])}
        />

        {/* Product Modal */}
        <ProductModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          mode={modalMode}
          product={selectedProduct}
          onSave={handleSave}
          isLoading={createLoading || updateLoading}
        />

        {/* Single Delete Modal */}
        <DeleteConfirmModal
          isOpen={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setProductToDelete(null);
          }}
          onConfirm={handleDeleteConfirm}
          isLoading={deleteLoading}
        />

        {/* Bulk Delete Modal */}
        <DeleteConfirmModal
          isOpen={bulkDeleteOpen}
          onClose={() => setBulkDeleteOpen(false)}
          onConfirm={handleBulkDeleteConfirm}
          isLoading={deleteLoading}
          count={selectedIds.length}
        />
      </div>
    </>
  );
}
