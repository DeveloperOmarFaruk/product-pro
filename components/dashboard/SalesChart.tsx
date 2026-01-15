import { motion as Motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SalesChart() {
  return (
    // Motion.div comes from Framer Motion for smooth animation
    <Motion.div
      initial={{ opacity: 0, y: 20 }} // initial state: slightly below & transparent
      animate={{ opacity: 1, y: 0 }} // animate to fully visible & original position
      transition={{ delay: 0.2 }} // delay the animation by 0.2s
      className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800"
    >
      {/* Header section: title and legend */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Sales Overview
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monthly sales performance
          </p>
        </div>

        {/* Legend for chart colors */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500" />{" "}
            {/* Sales color */}
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Sales
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-violet-500" />{" "}
            {/* Revenue color */}
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Revenue
            </span>
          </div>
        </div>
      </div>

      {/* Chart container */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            {" "}
            {/* Pass in the chart data */}
            <defs>
              {/* Gradient for sales area */}
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>

              {/* Gradient for revenue area */}
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              className="dark:stroke-slate-700"
            />
            {/* X Axis configuration */}
            <XAxis
              dataKey="name"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            {/* Y Axis configuration */}
            <YAxis
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`} // format as currency
            />
            {/* Tooltip on hover */}
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)",
              }}
            />
            {/* Sales area line */}
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#6366f1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSales)" // use gradient
            />
            {/* Revenue area line */}
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8b5cf6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)" // use gradient
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Motion.div>
  );
}

const data = [
  { name: "Jan", sales: 4000, revenue: 2400 },
  { name: "Feb", sales: 3000, revenue: 1398 },
  { name: "Mar", sales: 5000, revenue: 9800 },
  { name: "Apr", sales: 2780, revenue: 3908 },
  { name: "May", sales: 1890, revenue: 4800 },
  { name: "Jun", sales: 2390, revenue: 3800 },
  { name: "Jul", sales: 3490, revenue: 4300 },
];
