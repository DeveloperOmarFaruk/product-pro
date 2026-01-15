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

const productFiltersSlice = createSlice({
  name: "productFilters",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setCategoryFilter(state, action: PayloadAction<string>) {
      state.categoryFilter = action.payload;
    },
    setStatusFilter(state, action: PayloadAction<string>) {
      state.statusFilter = action.payload;
    },
    resetFilters(state) {
      state.searchQuery = "";
      state.categoryFilter = "All";
      state.statusFilter = "All";
    },
  },
});

export const {
  setSearchQuery,
  setCategoryFilter,
  setStatusFilter,
  resetFilters,
} = productFiltersSlice.actions;

export default productFiltersSlice.reducer;
