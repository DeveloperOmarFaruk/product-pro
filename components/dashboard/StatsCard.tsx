import { cn } from "@/lib/utils";
import { motion as Motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";

export interface StatsCardProps {
  title: string; // The card title
  value: string | number; // The main value displayed
  change?: string | number; // Optional change value
  changeType?: "positive" | "negative"; // Optional, for coloring the change
  icon: React.ElementType; // The icon component passed as a prop
  gradient?: string; // Optional Tailwind CSS gradient classes
  delay?: number; // Optional animation delay
}

export default function StatsCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  gradient,
  delay = 0,
}: StatsCardProps) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 group hover:shadow-lg transition-shadow"
    >
      {/* Background Gradient */}
      <div
        className={cn(
          "absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity",
          gradient
        )}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            {value}
          </h3>

          {change && (
            <div className="flex items-center gap-1 mt-2">
              {changeType === "positive" ? (
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-rose-500" />
              )}
              <span
                className={cn(
                  "text-sm font-medium",
                  changeType === "positive"
                    ? "text-emerald-500"
                    : "text-rose-500"
                )}
              >
                {change}
              </span>
              <span className="text-sm text-slate-400">last month</span>
            </div>
          )}
        </div>

        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            gradient
          )}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Motion.div>
  );
}
