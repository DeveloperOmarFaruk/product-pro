import { AlertTriangle, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface DeleteConfirmModalProps {
  isOpen: boolean; // whether the modal is open
  onClose: () => void; // callback to close the modal
  onConfirm: () => void; // callback to confirm deletion
  isLoading?: boolean; // optional loading state
  count?: number; // optional number of items to delete, default is 1
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  count = 1,
}: DeleteConfirmModalProps) {
  return (
    /* Controlled dialog (open state handled by parent) */
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* Modal container */}
      <DialogContent
        className="sm:max-w-md bg-white dark:bg-slate-900
         border-slate-200 dark:border-slate-800"
      >
        {/* ---------- Header ---------- */}
        <DialogHeader className="text-center">
          {/* Warning icon */}
          <div
            className="mx-auto w-16 h-16 rounded-full
             bg-rose-100 dark:bg-rose-900/30
             flex items-center justify-center mb-4"
          >
            <AlertTriangle className="w-8 h-8 text-rose-600 dark:text-rose-400" />
          </div>

          {/* Modal title (plural-aware) */}
          <DialogTitle
            className="text-xl text-center font-semibold
             text-slate-900 dark:text-white"
          >
            Delete {count > 1 ? `${count} Products` : "Product"}?
          </DialogTitle>

          {/* Confirmation message */}
          <DialogDescription className="text-slate-500 dark:text-slate-400 text-center">
            {count > 1
              ? `Are you sure you want to delete these ${count} products? This action cannot be undone.`
              : "Are you sure you want to delete this product? This action cannot be undone."}
          </DialogDescription>
        </DialogHeader>

        {/* ---------- Actions ---------- */}
        <div className="flex justify-center gap-3 mt-6">
          {/* Cancel button */}
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading} // prevent interaction while deleting
            className="min-w-24 cursor-pointer"
          >
            Cancel
          </Button>

          {/* Confirm delete button */}
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="min-w-24 bg-rose-600 hover:bg-rose-700
             text-white cursor-pointer"
          >
            {/* Loading indicator */}
            {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
