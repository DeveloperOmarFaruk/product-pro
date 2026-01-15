import { motion as Motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-32 bg-white dark:bg-slate-900 relative overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent
       to-violet-50/50 dark:from-indigo-950/30 dark:to-violet-950/30"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <Motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/50
             text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-4"
          >
            Testimonials
          </Motion.span>
          <Motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6"
          >
            Loved by Businesses
          </Motion.h2>
          <Motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Join thousands of satisfied customers who have transformed their
            product management.
          </Motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial: Testimonial, index: number) => (
            <Motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border
               border-slate-100 dark:border-slate-700/50"
            >
              <Quote className="w-10 h-10 text-indigo-200 dark:text-indigo-800 mb-6" />
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-amber-500 fill-amber-500"
                  />
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                {`"${testimonial?.content}"`}
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {testimonial.role}
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

export interface Testimonial {
  content: string;
  author: string;
  role: string;
  avatar: string;
  rating: number; // 1–5
}

const testimonials: Testimonial[] = [
  {
    content:
      "ProductHub transformed how we manage our inventory. The analytics alone saved us thousands in overstocking costs.",
    author: "Sarah Chen",
    role: "CEO, TechStart Inc.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
  },
  {
    content:
      "The best product management tool we've ever used. Clean interface, powerful features, and incredible support team.",
    author: "Michael Torres",
    role: "Operations Manager, RetailPro",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
  },
  {
    content:
      "We switched from three different tools to just ProductHub. It handles everything seamlessly in one place.",
    author: "Emily Watson",
    role: "Founder, EcoGoods",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
  },
];
