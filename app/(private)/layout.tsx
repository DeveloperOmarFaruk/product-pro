"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import SpinnerLoader from "@/components/skeletons/SpinnerLoader";
import { motion as Motion } from "framer-motion";
import dynamic from "next/dynamic";

const DashboardSidebar = dynamic(
  () => import("@/components/sidebar/DashboardSidebar"),
  { ssr: false }
);

const DashboardNavbar = dynamic(
  () => import("@/components/navbar/DashboardNavbar"),
  { ssr: false }
);

export default function PrivateLayout({ children }: { children: ReactNode }) {
  /* ---------------------------------------------
     Hooks MUST always run
  --------------------------------------------- */
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isAuthLoading } = useAuth();
  const isNotFoundRoute = pathname === "/not-found";

  /* ---------------------------------------------
     ✅ Lazy state initialization (NO effects)
  --------------------------------------------- */
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("darkMode") === "true";
  });

  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 1024;
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  //  handle auth & skeleton
  useEffect(() => {
    if (isNotFoundRoute) return;

    if (!isAuthLoading && !isAuthenticated) {
      router.replace("/login");
    }
    if (isAuthenticated) {
      const timer = setTimeout(() => setShowSkeleton(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isAuthLoading, router, isNotFoundRoute]);

  //  mark mounted in next tick to avoid linter warning
  useEffect(() => {
    if (isNotFoundRoute) return;
    if (document) {
      document.documentElement.classList.toggle("dark", isDarkMode);
      localStorage.setItem("darkMode", String(isDarkMode));
    }
  }, [isDarkMode, isNotFoundRoute]);

  //  sync dark mode with document & localStorage
  useEffect(() => {
    if (isNotFoundRoute) return;

    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isNotFoundRoute]);

  /* ---------------------------------------------
     Rendering
  --------------------------------------------- */
  if (isNotFoundRoute) {
    return <>{children}</>;
  }

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
