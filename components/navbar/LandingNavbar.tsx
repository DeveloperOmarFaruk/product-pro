"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Menu, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Products", href: "#products" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
  ];

  return (
    <Motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-slate-900/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault(); // prevent route reload
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="flex items-center gap-3 group"
          >
            <div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500
             to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30
             group-hover:shadow-indigo-500/50 transition-shadow"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span
              className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700
             dark:from-white dark:to-slate-300 bg-clip-text text-transparent"
            >
              ProductHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300
                 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg
                  hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 cursor-pointer"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/login">
              <Button
                className="bg-gradient-to-r from-indigo-500 to-violet-600 cursor-pointer
               hover:from-indigo-600 hover:to-violet-700 text-white shadow-lg
               shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
              >
                Get Started
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 cursor-pointer" />
            ) : (
              <Menu className="w-5 h-5 cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <Motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800"
          >
            <div className="px-4 py-6 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300
                   hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100
                    dark:hover:bg-slate-800 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                <Link href="/login" className="block">
                  <Button variant="outline" className="w-full cursor-pointer">
                    Sign In
                  </Button>
                </Link>
                <Link href="/login" className="block">
                  <Button className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 cursor-pointer">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.nav>
  );
}
