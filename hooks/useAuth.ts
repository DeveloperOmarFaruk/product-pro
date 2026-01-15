"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/app/store";
import {
  finishAuthCheck,
  login as loginAction,
  logout as logoutAction,
} from "@/app/store/slices/authSlice";
import { useEffect } from "react";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, token, loading } = useSelector(
    (state: RootState) => state.auth
  );

  // 🔹 Simulate auth check (important for skeleton)
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(finishAuthCheck());
    }, 500); // short delay for smooth UX

    return () => clearTimeout(timer);
  }, [dispatch]);

  const login = (email: string, password: string) => {
    if (email === "admin@gmail.com" && password === "12345678") {
      dispatch(loginAction({ email, token: "product-pro-jwt-token" }));
      router.push("/dashboard");
      return true;
    }
    return false;
  };

  const logout = () => {
    dispatch(logoutAction());
    router.push("/");
  };

  return {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
    isAuthLoading: loading,
  };
};
