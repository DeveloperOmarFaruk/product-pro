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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; token: string }>) => {
      state.user = action.payload.email;
      state.token = action.payload.token;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
    },
    finishAuthCheck: (state) => {
      state.loading = false;
    },
  },
});

export const { login, logout, finishAuthCheck } = authSlice.actions;
export default authSlice.reducer;
