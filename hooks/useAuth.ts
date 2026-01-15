"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  finishAuthCheck,
  login as loginAction,
  logout as logoutAction,
} from "@/store/slices/authSlice";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/store";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, token, loading } = useSelector(
    (state: RootState) => state.auth
  );

  // Simulate auth check for skeleton loading
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(finishAuthCheck());
    }, 500); // short delay for smoother UX

    return () => clearTimeout(timer); // cleanup on unmount
  }, [dispatch]);

  // Login function with hardcoded credentials
  const login = (email: string, password: string) => {
    if (email === "admin@gmail.com" && password === "12345678") {
      dispatch(loginAction({ email, token: "product-pro-jwt-token" }));
      router.push("/dashboard");
      return true;
    }
    return false;
  };

  // Logout function
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
