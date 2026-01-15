import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: string | null;
  token: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: true,
};

// Create a Redux slice for authentication state
const authSlice = createSlice({
  name: "auth", // Slice name, used in Redux state
  initialState, // Initial state for auth (user, token, loading)
  reducers: {
    // Action to log in a user
    login: (state, action: PayloadAction<{ email: string; token: string }>) => {
      state.user = action.payload.email; // Set user email
      state.token = action.payload.token; // Set auth token
      state.loading = false; // Mark loading as false
    },

    // Action to log out a user
    logout: (state) => {
      state.user = null; // Clear user
      state.token = null; // Clear token
      state.loading = false; // Mark loading as false
    },

    // Action to finish auth check (used for loading skeletons)
    finishAuthCheck: (state) => {
      state.loading = false; // Stop loading state
    },
  },
});

// Export actions to dispatch them elsewhere
export const { login, logout, finishAuthCheck } = authSlice.actions;

// Export reducer to include in Redux store
export default authSlice.reducer;
