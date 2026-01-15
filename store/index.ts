import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productFiltersReducer from "./slices/productFiltersSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { productsApi } from "./productsApi";

const persistConfig = {
  key: "auth",
  storage,
};

// Persist the auth slice using redux-persist
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Auth state, persisted in localStorage
    [productsApi.reducerPath]: productsApi.reducer, // RTK Query slice for products
    productFilters: productFiltersReducer, // Filters state slice for products
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions to prevent warnings about non-serializable values
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productsApi.middleware), // Add RTK Query middleware for caching & invalidation
});

// Create the persistor for redux-persist
export const persistor = persistStore(store);

// Type helpers for TypeScript
export type RootState = ReturnType<typeof store.getState>; // Root state type
export type AppDispatch = typeof store.dispatch; // Dispatch type
