"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import DashboardNavbar from "@/components/navbar/DashboardNavbar";
// import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";
import { useRouter } from "next/navigation";
import SpinnerLoader from "@/components/skeletons/SpinnerLoader";
import { motion as Motion } from "framer-motion";
import DashboardSidebar from "@/components/sidebar/DashboardSidebar";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  // ⚡ Lazy init dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  const [mounted, setMounted] = useState(false);

  const { isAuthenticated, isAuthLoading } = useAuth();
  const router = useRouter();

  //  handle auth & skeleton
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace("/login");
    }
    if (isAuthenticated) {
      const timer = setTimeout(() => setShowSkeleton(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isAuthLoading, router]);

  //  mark mounted in next tick to avoid linter warning
  useEffect(() => {
    const handleMount = () => setMounted(true);
    // schedule after render
    requestAnimationFrame(handleMount);
  }, []);

  //  sync dark mode with document & localStorage
  useEffect(() => {
    if (!mounted) return; // avoid SSR mismatch
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode, mounted]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true); // mobile → collapsed
      } else {
        setIsCollapsed(false); // desktop → expanded
      }
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isAuthLoading || showSkeleton || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <SpinnerLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed left-0 top-0 h-screen z-40 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <DashboardSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* Main Content */}
      <Motion.main
        initial={false}
        animate={{ marginLeft: isCollapsed ? 80 : 280 }}
        className="min-h-screen transition-all duration-300 lg:ml-0"
      >
        <DashboardNavbar
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        <div className="p-6">{children}</div>
      </Motion.main>
    </div>
  );
}
