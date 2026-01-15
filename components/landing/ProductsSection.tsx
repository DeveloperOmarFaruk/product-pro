import { motion as Motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductsSection() {
  return (
    <section
      id="products"
      className="py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden" // Section wrapper with spacing & background
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            {/* Badge */}
            <Motion.span
              initial={{ opacity: 0, y: 20 }} // fade in + slide up
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 text-sm font-semibold mb-4"
            >
              Products
            </Motion.span>

            {/* Section Title */}
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }} // small animation delay
              className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white"
            >
              Featured Products
            </Motion.h2>
          </div>

          {/* View All Button */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 md:mt-0"
          >
            <Button variant="outline" className="group cursor-pointer">
              View All Products
              {/* Arrow icon with hover animation */}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product: Product, index: number) => (
            <Motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }} // card entrance animation
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }} // stagger effect
              className="group"
            >
              {/* Product Image Card */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-white dark:bg-slate-800 mb-4">
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Hover CTA */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button className="w-full bg-white/90 text-slate-900 hover:bg-white">
                    Quick View
                  </Button>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-2">
                {/* Category */}
                <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                  {product.category}
                </span>

                {/* Product Name */}
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {product.name}
                </h3>

                {/* Price & Rating */}
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-slate-900 dark:text-white">
                    ${product.price}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {product.rating}
                    </span>
                  </div>
                </div>
              </div>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export type Product = {
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
};

const products: Product[] = [
  {
    name: "Wireless Headphones Pro",
    category: "Electronics",
    price: 299.99,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
  },
  {
    name: "Premium Watch Series",
    category: "Electronics",
    price: 599.99,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
  },
  {
    name: "Designer Sunglasses",
    category: "Clothing",
    price: 189.99,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
  },
  {
    name: "Leather Backpack",
    category: "Clothing",
    price: 149.99,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
  },
];
