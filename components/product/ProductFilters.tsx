import { Filter, Search, X } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

type Category = (typeof categories)[number];
type Status = (typeof statuses)[number];

interface ProductFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  categoryFilter: Category;
  setCategoryFilter: (value: Category) => void;
  statusFilter: Status;
  setStatusFilter: (value: Status) => void;
}

const categories = [
  "All",
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports",
  "Beauty",
  "Books",
  "Toys",
  "Food",
];
const statuses = ["All", "active", "inactive", "draft"];

export default function ProductFilters({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
}: ProductFiltersProps) {
  const hasFilters =
    searchQuery || categoryFilter !== "All" || statusFilter !== "All";

  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("All");
    setStatusFilter("All");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-11 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2
            cursor-pointer text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40 h-11 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl">
              <SelectValue placeholder="Category" />
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

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32 h-11 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status} className="capitalize">
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-slate-500 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
