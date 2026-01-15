"use client";

import Link from "next/link";
import { motion as Motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FormEvent, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/lib/toast";

export default function Login() {
  // -------------------------
  // Component state
  // -------------------------
  const [email, setEmail] = useState<string>("admin@gmail.com"); // Stores user email input
  const [password, setPassword] = useState<string>("12345678"); // Stores user password input
  const [showPassword, setShowPassword] = useState<boolean>(false); // Toggles password visibility
  const [rememberMe, setRememberMe] = useState<boolean>(false); // Tracks "Remember me" checkbox
  const [isLoading, setIsLoading] = useState<boolean>(false); // Tracks loading state during login

  // Custom hook to access auth functions
  const { login } = useAuth();

  // -------------------------
  // Form submission handler
  // -------------------------
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload
    setIsLoading(true); // Show loader while processing login

    // Call login function from auth context
    // Note: Consider using `await` if login is async
    const success = login(email, password);

    // Show toast message based on login result
    if (success) {
      toast("success", "Login successful"); // Login succeeded
    } else {
      toast("error", "Invalid email or password"); // Login failed
    }

    setIsLoading(false); // Hide loader after processing
  };

  return (
    <div className="min-h-screen flex">
      {/* -------------------------
          Left Panel: Login Form
         ------------------------- */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-slate-900">
        <Motion.div
          initial={{ opacity: 0, y: 20 }} // Animation initial state
          animate={{ opacity: 1, y: 0 }} // Animate to visible state
          className="w-full max-w-md"
        >
          {/* -------------------------
              Logo / Branding
             ------------------------- */}
          <Link href="/" className="flex items-center gap-3 mb-12">
            <div
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex 
              items-center justify-center shadow-lg shadow-indigo-500/30"
            >
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              ProductHub
            </span>
          </Link>

          {/* -------------------------
              Header Text
             ------------------------- */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Welcome back
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Sign in to your account to continue
            </p>
          </div>

          {/* -------------------------
              Login Form
             ------------------------- */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-slate-700 dark:text-slate-300"
              >
                Email address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update state on input
                  className="pl-12 h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-slate-700 dark:text-slate-300"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"} // Toggle visibility
                  placeholder="12345678"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update state
                  className="pl-12 pr-12 h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500"
                />
                {/* Show/Hide Password Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // Toggle state
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)} // Update checkbox state
                />
                <Label
                  htmlFor="remember"
                  className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
              <button
                type="button"
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading} // Disable during loading
              className="w-full h-12 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 cursor-pointer
               hover:to-violet-700 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" /> // Loading spinner
              ) : (
                <div className=" flex justify-start items-center">
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-slate-900 text-slate-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Back to Home Link */}
          <p className="mt-8 text-center text-slate-500 dark:text-slate-400">
            <Link
              href="/"
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            >
              ← Back to Home
            </Link>
          </p>
        </Motion.div>
      </div>

      {/* -------------------------
          Right Panel: Decorative Image
         ------------------------- */}
      <div className="hidden lg:block lg:w-1/2 relative">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-600" />
        {/* Background Image with Blend */}
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200')] 
          bg-cover bg-center mix-blend-overlay opacity-20"
        />
        {/* Centered Text */}
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Start Managing Products
              <br />
              Like a Pro
            </h2>
            <p className="text-lg text-indigo-100 max-w-md">
              Join thousands of businesses using ProductHub to streamline their
              operations and boost productivity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
