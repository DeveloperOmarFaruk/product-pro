"use client";

import CategoryChart from "@/components/dashboard/CategoryChart";
import RecentProducts from "@/components/dashboard/RecentProducts";
import SalesChart from "@/components/dashboard/SalesChart";
import StatsCard from "@/components/dashboard/StatsCard";
import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const isLoading = false;

  return (
    <div>
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <div className="space-y-8">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              {`Welcome back! Here's what's happening with your products.`}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Products"
              value={stats.totalProducts}
              change="+12%"
              changeType="positive"
              icon={Package}
              gradient="bg-gradient-to-br from-indigo-500 to-indigo-600"
              delay={0}
            />
            <StatsCard
              title="Inventory Value"
              value={`$${stats.totalValue.toLocaleString()}`}
              change="+8.2%"
              changeType="positive"
              icon={DollarSign}
              gradient="bg-gradient-to-br from-emerald-500 to-emerald-600"
              delay={0.1}
            />
            <StatsCard
              title="Active Products"
              value={stats.activeProducts}
              change="+5%"
              changeType="positive"
              icon={ShoppingCart}
              gradient="bg-gradient-to-br from-violet-500 to-violet-600"
              delay={0.2}
            />
            <StatsCard
              title="Low Stock Items"
              value={stats.lowStock}
              change="-3%"
              changeType="negative"
              icon={TrendingUp}
              gradient="bg-gradient-to-br from-amber-500 to-orange-600"
              delay={0.3}
            />
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SalesChart />
            </div>
            <CategoryChart />
          </div>

          {/* Recent Products */}
          <RecentProducts />
        </div>
      )}
    </div>
  );
}

const stats = {
  totalProducts: 1248,
  totalValue: 8500.5,
  activeProducts: 1102,
  lowStock: 14,
};
