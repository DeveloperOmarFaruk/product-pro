import { motion as Motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899"];

export default function CategoryChart() {
  const getCategoryData = () => {
    // Define the type as a Record with string keys and number values
    const categoryCount: Record<string, number> = {};

    products.forEach((product) => {
      categoryCount[product.category] =
        (categoryCount[product.category] || 0) + 1;
    });

    return Object.entries(categoryCount).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const data = getCategoryData();

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Products by Category
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Distribution overview
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-sm text-slate-600 dark:text-slate-400 truncate">
              {item.name}
            </span>
            <span className="text-sm font-medium text-slate-900 dark:text-white ml-auto">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Motion.div>
  );
}

export const products = [
  { id: 1, name: "iPhone 15", category: "Electronics" },
  { id: 2, name: "MacBook Pro", category: "Electronics" },
  { id: 3, name: "Running Shoes", category: "Apparel" },
  { id: 4, name: "Yoga Mat", category: "Fitness" },
  { id: 5, name: "Coffee Maker", category: "Home & Kitchen" },
  { id: 6, name: "Desk Lamp", category: "Home & Kitchen" },
  { id: 7, name: "Bluetooth Speaker", category: "Electronics" },
  { id: 8, name: "Cotton T-Shirt", category: "Apparel" },
  { id: 9, name: "Dumbbells", category: "Fitness" },
  { id: 10, name: "Air Fryer", category: "Home & Kitchen" },
];
