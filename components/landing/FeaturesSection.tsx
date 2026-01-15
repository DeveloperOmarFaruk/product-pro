import { motion as Motion } from "framer-motion";
import {
  BarChart3,
  Cloud,
  LucideIcon,
  Package,
  Shield,
  Users,
  Zap,
} from "lucide-react";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-32 bg-white dark:bg-slate-900 relative overflow-hidden" // Section spacing, background & overflow
    >
      {/* Background Gradient Circle */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br
   from-indigo-100/50 to-violet-100/50 dark:from-indigo-900/20 dark:to-violet-900/20 rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          {/* Small label */}
          <Motion.span
            initial={{ opacity: 0, y: 20 }} // fade in from below
            whileInView={{ opacity: 1, y: 0 }} // animate when in view
            viewport={{ once: true }} // animate only once
            className="inline-block px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/50
         text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-4"
          >
            Features
          </Motion.span>

          {/* Main heading */}
          <Motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6"
          >
            Everything You Need
          </Motion.h2>

          {/* Description paragraph */}
          <Motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Powerful features designed to help you manage products efficiently
            and grow your business.
          </Motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature: Feature, index: number) => (
            <Motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }} // start slightly lower and invisible
              whileInView={{ opacity: 1, y: 0 }} // animate into view
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }} // stagger animation for each feature
              className="group relative p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border
           border-slate-100 dark:border-slate-700/50 hover:border-indigo-200 dark:hover:border-indigo-800 
           transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
            >
              {/* Icon box with gradient background */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} 
            flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="w-7 h-7 text-white" />{" "}
                {/* Feature icon */}
              </div>

              {/* Feature title */}
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {feature.title}
              </h3>

              {/* Feature description */}
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: Package,
    title: "Inventory Management",
    description:
      "Track stock levels in real-time with automated alerts and smart reordering suggestions.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Gain insights with powerful charts and reports. Understand trends and make data-driven decisions.",
    color: "from-indigo-500 to-violet-500",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade encryption and security protocols keep your data safe and compliant.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized performance ensures your dashboard loads instantly, every time.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Cloud,
    title: "Cloud Sync",
    description:
      "Access your data from anywhere. Automatic backups ensure you never lose important information.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Invite team members, assign roles, and collaborate seamlessly across your organization.",
    color: "from-violet-500 to-purple-500",
  },
];
