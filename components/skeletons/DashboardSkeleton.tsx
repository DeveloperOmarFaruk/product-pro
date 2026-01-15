"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* ---------- Page Header Skeleton ---------- */}
      <div>
        {/* Title placeholder */}
        <Skeleton className="h-9 w-48 mb-2" />
        {/* Subtitle / description placeholder */}
        <Skeleton className="h-5 w-96" />
      </div>

      {/* ---------- Stats Cards Skeleton ---------- */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6"
          >
            {/* Card header: label + icon */}
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-12 w-12 rounded-xl" />
            </div>
            {/* Main value / stats */}
            <Skeleton className="h-8 w-20 mb-2" />
            {/* Secondary info */}
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>

      {/* ---------- Charts Row Skeleton ---------- */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <Skeleton className="h-6 w-32 mb-6" /> {/* Chart title */}
          <Skeleton className="h-64 w-full" /> {/* Chart area */}
        </div>

        {/* Secondary chart / stats */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <Skeleton className="h-6 w-40 mb-6" /> {/* Section title */}
          <Skeleton className="h-48 w-48 rounded-full mx-auto mb-4" />{" "}
          {/* Circular chart / avatar */}
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-full" /> // Small stats lines
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Recent Products Skeleton ---------- */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <Skeleton className="h-6 w-40 mb-6" /> {/* Section title */}
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0"
            >
              {/* Product image */}
              <Skeleton className="w-12 h-12 rounded-lg" />
              {/* Product info */}
              <div className="flex-1">
                <Skeleton className="h-5 w-40 mb-2" /> {/* Product name */}
                <Skeleton className="h-4 w-24" />{" "}
                {/* Category or secondary info */}
              </div>
              {/* Price placeholder */}
              <Skeleton className="h-6 w-20" />
              {/* Status placeholder */}
              <Skeleton className="h-5 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
