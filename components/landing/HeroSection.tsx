"use client";

import { Button } from "@/components/ui/button";
import { motion as Motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <>
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden 
bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Colored blurred circles for visual flair */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-pink-500/10 rounded-full blur-3xl" />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center">
            {/* Trusted Badge */}
            <Motion.div
              initial={{ opacity: 0, y: 20 }} // fade-in from below
              animate={{ opacity: 1, y: 0 }} // animate to visible
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full
bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800 mb-8"
            >
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />{" "}
              {/* Badge icon */}
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Trusted by 10,000+ businesses worldwide
              </span>
            </Motion.div>

            {/* Hero Heading */}
            <Motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              {/* Gradient text lines */}
              <span
                className="bg-gradient-to-r from-slate-900 via-slate-700
to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent"
              >
                Manage Your Products
              </span>
              <br />
              <span
                className="bg-gradient-to-r from-indigo-600 via-violet-600
to-purple-600 bg-clip-text text-transparent"
              >
                Like Never Before
              </span>
            </Motion.h1>

            {/* Description Paragraph */}
            <Motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              The all-in-one platform for modern product management. Track
              inventory, analyze performance, and scale your business with
              powerful insights.
            </Motion.p>

            {/* CTA Buttons */}
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {/* Start Free Trial button */}
              <Link href="/login">
                <Button
                  size="lg"
                  className="h-14 px-8 text-base bg-gradient-to-r from-indigo-500
to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-xl shadow-indigo-500/30 
hover:shadow-indigo-500/50 transition-all cursor-pointer"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" /> {/* Arrow icon */}
                </Button>
              </Link>

              {/* Watch Demo button */}
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base border-slate-300 dark:border-slate-700
hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Play className="w-5 h-5 mr-2" /> {/* Play icon */}
                Watch Demo
              </Button>
            </Motion.div>

            {/* Stats Section */}
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { value: "50K+", label: "Active Users" },
                { value: "2M+", label: "Products Managed" },
                { value: "99.9%", label: "Uptime" },
                { value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  {/* Stat value with gradient text */}
                  <div
                    className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600
to-violet-600 bg-clip-text text-transparent"
                  >
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </Motion.div>
          </div>

          {/* Hero Image / Dashboard Preview */}
          <Motion.div
            initial={{ opacity: 0, y: 40 }} // fade in from below
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-20 relative"
          >
            {/* Gradient overlay for smooth blending */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 
via-transparent to-transparent z-10"
            />
            {/* Image container */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/20 
border border-slate-200 dark:border-slate-800 bg-slate-900"
            >
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=900&fit=crop"
                alt="dashboard_preview"
                className="w-full h-auto opacity-90"
              />
            </div>
          </Motion.div>
        </div>
      </section>
    </>
  );
}
