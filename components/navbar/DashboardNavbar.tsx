"use client";

import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";

import { AnimatePresence } from "framer-motion";
import { motion as Motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/lib/toast";

// Define props type
interface DashboardNavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  onMenuClick: () => void;
}

export default function DashboardNavbar({
  isDarkMode,
  setIsDarkMode,
  onMenuClick,
}: DashboardNavbarProps) {
  const [notifications] = useState([
    { id: 1, title: "New order received", time: "5 min ago" },
    { id: 2, title: "Stock low on 3 items", time: "1 hour ago" },
    { id: 3, title: "Monthly report ready", time: "2 hours ago" },
  ]);
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    toast("success", "Logout Successful");
  };

  const handleComingSoon = () => {
    toast("info", "This feature will be available soon.");
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-30">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-11 h-11 rounded-xl cursor-pointer"
          >
            <AnimatePresence mode="wait">
              {isDarkMode ? (
                <Motion.div
                  key="sun"
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: 90, scale: 0 }}
                >
                  <Sun className="w-5 h-5 text-amber-500" />
                </Motion.div>
              ) : (
                <Motion.div
                  key="moon"
                  initial={{ rotate: 90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: -90, scale: 0 }}
                >
                  <Moon className="w-5 h-5 text-slate-600" />
                </Motion.div>
              )}
            </AnimatePresence>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-11 h-11 rounded-xl relative cursor-pointer"
              >
                <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 p-2 bg-white dark:bg-zinc-950 border border-zinc-300"
            >
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Notifications
                </h3>
              </div>
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="p-3 cursor-pointer"
                  onClick={handleComingSoon}
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {notification.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {notification.time}
                    </p>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-3 h-11 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <Avatar className="w-9 h-9">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-sm">
                    {getInitials("Admin")}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {"Admin"}
                  </p>
                  <p className="text-xs text-slate-500">{"Admin"}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 p-2 bg-white dark:bg-zinc-950 border border-zinc-300"
            >
              <DropdownMenuItem
                className="p-3 cursor-pointer"
                onClick={handleComingSoon}
              >
                <User className="w-4 h-4 mr-3" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="p-3 cursor-pointer"
                onClick={handleComingSoon}
              >
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="p-3 cursor-pointer text-rose-600 dark:text-rose-400 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/20"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-3 text-rose-600 dark:text-rose-400" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
}
