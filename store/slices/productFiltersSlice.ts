// store/productFiltersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductFiltersState {
  searchQuery: string;
  categoryFilter: string;
  statusFilter: string;
}

const initialState: ProductFiltersState = {
  searchQuery: "",
  categoryFilter: "All",
  statusFilter: "All",
};

// Create a Redux slice for managing product filters in the dashboard
const productFiltersSlice = createSlice({
  name: "productFilters", // Slice name for Redux state
  initialState, // Initial state containing searchQuery, categoryFilter, statusFilter
  reducers: {
    // Set the search query filter
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload; // update searchQuery in state
    },

    // Set the category filter
    setCategoryFilter(state, action: PayloadAction<string>) {
      state.categoryFilter = action.payload; // update categoryFilter in state
    },

    // Set the status filter
    setStatusFilter(state, action: PayloadAction<string>) {
      state.statusFilter = action.payload; // update statusFilter in state
    },

    // Reset all filters to default values
    resetFilters(state) {
      state.searchQuery = ""; // clear search query
      state.categoryFilter = "All"; // reset category to "All"
      state.statusFilter = "All"; // reset status to "All"
    },
  },
});

// Export actions to use them in components
export const {
  setSearchQuery,
  setCategoryFilter,
  setStatusFilter,
  resetFilters,
} = productFiltersSlice.actions;

// Export reducer to include in the Redux store
export default productFiltersSlice.reducer;
