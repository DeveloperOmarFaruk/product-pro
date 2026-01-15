import { motion as Motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden" // Section padding, background & overflow
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          {/* Small Badge */}
          <Motion.span
            initial={{ opacity: 0, y: 20 }} // fade in from below
            whileInView={{ opacity: 1, y: 0 }} // animate when in view
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-600
             dark:text-amber-400 text-sm font-semibold mb-4"
          >
            Pricing
          </Motion.span>

          {/* Heading */}
          <Motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6"
          >
            Simple, Transparent Pricing
          </Motion.h2>

          {/* Description */}
          <Motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Choose the plan that fits your business. No hidden fees, cancel
            anytime.
          </Motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {plans.map((plan: PricingPlan, index: number) => (
            <Motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }} // fade + slide in
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }} // stagger each card
              className={`relative p-8 rounded-3xl ${
                plan.popular
                  ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-2xl shadow-indigo-500/30 scale-105" // highlight popular plan
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-amber-400 text-amber-900 text-sm font-semibold shadow-lg">
                    <Sparkles className="w-4 h-4" /> Most Popular
                  </span>
                </div>
              )}

              {/* Plan Name & Description */}
              <div className="mb-8">
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    plan.popular
                      ? "text-white"
                      : "text-slate-900 dark:text-white"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm ${
                    plan.popular
                      ? "text-indigo-100"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              {/* Pricing */}
              <div className="mb-8">
                <span
                  className={`text-5xl font-bold ${
                    plan.popular
                      ? "text-white"
                      : "text-slate-900 dark:text-white"
                  }`}
                >
                  ${plan.price}
                </span>
                <span
                  className={
                    plan.popular
                      ? "text-indigo-100"
                      : "text-slate-500 dark:text-slate-400"
                  }
                >
                  /month
                </span>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature: string) => (
                  <li key={feature} className="flex items-center gap-3">
                    {/* Check icon box */}
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        plan.popular
                          ? "bg-white/20"
                          : "bg-indigo-100 dark:bg-indigo-900/50"
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 ${
                          plan.popular
                            ? "text-white"
                            : "text-indigo-600 dark:text-indigo-400"
                        }`}
                      />
                    </div>
                    {/* Feature text */}
                    <span
                      className={
                        plan.popular
                          ? "text-indigo-50"
                          : "text-slate-600 dark:text-slate-300"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link href="/AdminLogin">
                <Button
                  className={`w-full h-12 ${
                    plan.popular
                      ? "bg-white text-indigo-600 hover:bg-indigo-50"
                      : "bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:from-indigo-600 hover:to-violet-700"
                  }`}
                >
                  Get Started
                </Button>
              </Link>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export type PricingPlan = {
  name: string;
  price: number;
  description: string;
  features: string[];
  popular: boolean;
};

const plans: PricingPlan[] = [
  {
    name: "Starter",
    price: 29,
    description: "Perfect for small businesses getting started",
    features: [
      "Up to 500 products",
      "Basic analytics",
      "Email support",
      "1 team member",
      "Weekly reports",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: 79,
    description: "For growing businesses with more needs",
    features: [
      "Up to 5,000 products",
      "Advanced analytics",
      "Priority support",
      "5 team members",
      "Real-time reports",
      "API access",
      "Custom integrations",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: 199,
    description: "For large organizations with complex needs",
    features: [
      "Unlimited products",
      "Custom analytics",
      "24/7 phone support",
      "Unlimited team members",
      "Custom reports",
      "Full API access",
      "Dedicated account manager",
      "Custom development",
    ],
    popular: false,
  },
];
