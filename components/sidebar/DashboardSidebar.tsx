"use client";

import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Package,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { motion as Motion } from "framer-motion";
import { usePathname } from "next/navigation";

// Define a type for menu items
interface MenuItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Props for the sidebar
interface DashboardSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Products",
    icon: Package,
    path: "/products",
  },
];

export default function DashboardSidebar({
  isCollapsed,
  setIsCollapsed,
}: DashboardSidebarProps) {
  const pathname = usePathname(); // Get current route for active menu highlighting

  return (
    <Motion.aside
      initial={false} // Do not animate on first render
      animate={{ width: isCollapsed ? 80 : 280 }} // Animate width when collapsed/expanded
      className={cn(
        "fixed left-0 top-0 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 flex flex-col",
        "transition-shadow duration-300" // Smooth shadow transition
      )}
    >
      {/* ---------- Logo Section ---------- */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 flex-shrink-0">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          {/* Show text only when sidebar is expanded */}
          {!isCollapsed && (
            <Motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xl font-bold text-slate-900 dark:text-white"
            >
              ProductHub
            </Motion.span>
          )}
        </Link>
      </div>

      {/* ---------- Navigation Menu ---------- */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path; // Highlight active menu item

            return (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  {/* Menu icon */}
                  <item.icon
                    className={cn(
                      "w-5 h-5 flex-shrink-0",
                      isActive && "text-white"
                    )}
                  />
                  {/* Menu text hidden when collapsed */}
                  {!isCollapsed && (
                    <Motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-medium"
                    >
                      {item.name}
                    </Motion.span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ---------- Collapse / Expand Button ---------- */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center cursor-pointer justify-center gap-2 px-4 py-3 rounded-xl
           text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {/* Show only icon when collapsed, icon + text when expanded */}
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </Motion.aside>
  );
}
