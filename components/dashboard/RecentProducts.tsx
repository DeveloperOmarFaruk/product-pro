import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight, Package } from "lucide-react";
import { motion as Motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

export default function RecentProducts() {
  const recentProducts = products.slice(0, 5);
  // Take the first 5 products from the products array (most recent)

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }} // Fade in + slide up animation
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800"
    >
      {/* -------------------------
          Header: Title + View All button
         ------------------------- */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Recent Products
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Latest additions
          </p>
        </div>

        {/* Link to full products page */}
        <Link href="/products">
          <Button
            variant="ghost"
            size="sm"
            className="text-indigo-600 dark:text-indigo-400 cursor-pointer"
          >
            View All
            <ArrowRight className="w-4 h-4 ml-1" /> {/* Arrow icon */}
          </Button>
        </Link>
      </div>

      {/* -------------------------
          Recent Products List
         ------------------------- */}
      <div className="space-y-4">
        {recentProducts.map((product, index) => (
          <Motion.div
            key={product.id}
            initial={{ opacity: 0, x: -20 }} // Slide in from left + fade
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }} // Stagger animation
            className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50
             hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {/* Product image or default icon */}
            <div
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100
             dark:from-indigo-900/50 dark:to-violet-900/50 flex items-center justify-center"
            >
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <Package className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              )}
            </div>

            {/* Product name + category */}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-slate-900 dark:text-white truncate">
                {product.name}
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {product.category}
              </p>
            </div>

            {/* Price + Status badge */}
            <div className="text-right">
              <p className="font-semibold text-slate-900 dark:text-white">
                ${product.price?.toFixed(2)} {/* Format price to 2 decimals */}
              </p>
              <Badge className={cn("mt-1", statusColors[product.status])}>
                {product.status} {/* Status badge with dynamic color */}
              </Badge>
            </div>
          </Motion.div>
        ))}

        {/* -------------------------
            Fallback when no recent products
           ------------------------- */}
        {recentProducts.length === 0 && (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500 dark:text-slate-400">
              No products yet
            </p>
          </div>
        )}
      </div>
    </Motion.div>
  );
}

// 1. Define the Product Status type for better type safety
export type ProductStatus = "active" | "draft" | "archived";

// 2. Define the Product Interface
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  status: ProductStatus;
  image_url?: string;
  createdAt: string;
}

// 3. Create the Dummy Data
export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 299.99,
    status: "active",
    image_url:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop",
    createdAt: "2023-10-24T10:00:00Z",
  },
  {
    id: "2",
    name: "Minimalist Leather Wallet",
    category: "Accessories",
    price: 45.0,
    status: "active",
    image_url:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=150&h=150&fit=crop",
    createdAt: "2023-10-23T14:30:00Z",
  },
  {
    id: "3",
    name: "Mechanical Gaming Keyboard",
    category: "Electronics",
    price: 159.5,
    status: "active",
    // Missing image_url to test your fallback icon logic
    createdAt: "2023-10-22T09:15:00Z",
  },
  {
    id: "4",
    name: "Organic Cotton T-Shirt",
    category: "Apparel",
    price: 32.0,
    status: "active",
    image_url:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=150&h=150&fit=crop",
    createdAt: "2023-10-21T16:45:00Z",
  },
  {
    id: "5",
    name: "Smart Home Hub",
    category: "Home Tech",
    price: 129.0,
    status: "draft",

    createdAt: "2023-10-20T11:20:00Z",
  },
  {
    id: "6",
    name: "Portable Power Bank",
    category: "Electronics",
    price: 49.99,
    status: "active",
    image_url:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=150&h=150&fit=crop",
    createdAt: "2023-10-19T08:00:00Z",
  },
];

// 4. Status Color Mapping (Helper for your 'cn' logic)
export const statusColors = {
  active:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  draft: "bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400",
  archived:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
};
