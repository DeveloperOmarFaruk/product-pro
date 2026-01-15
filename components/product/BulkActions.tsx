import { AnimatePresence } from "framer-motion";
import { Trash2, X } from "lucide-react";
import { Button } from "../ui/button";
import { motion as Motion } from "framer-motion";

interface BulkActionsProps {
  selectedCount: number;
  onDelete: () => void;
  onClear: () => void;
}

export default function BulkActions({
  selectedCount,
  onDelete,
  onClear,
}: BulkActionsProps) {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-4 px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                <span className="text-sm font-bold">{selectedCount}</span>
              </div>
              <span className="text-sm font-medium">
                {selectedCount === 1 ? "item" : "items"} selected
              </span>
            </div>

            <div className="w-px h-8 bg-slate-700 dark:bg-slate-200" />

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 cursor-pointer"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>

            <button
              onClick={onClear}
              className="ml-2 p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer
               dark:hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
