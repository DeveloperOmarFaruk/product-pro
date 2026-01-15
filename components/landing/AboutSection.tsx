import { motion as Motion } from "framer-motion";
import { Globe, Heart, Lightbulb, LucideIcon, Target } from "lucide-react";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-32 bg-white dark:bg-slate-900 relative overflow-hidden" // Section spacing, background & overflow handling
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Column */}
          <div>
            {/* Small badge / label */}
            <Motion.span
              initial={{ opacity: 0, y: 20 }} // fade-in from below
              whileInView={{ opacity: 1, y: 0 }} // animate when in view
              viewport={{ once: true }} // only animate once
              className="inline-block px-4 py-2 rounded-full bg-pink-50 dark:bg-pink-950/50
           text-pink-600 dark:text-pink-400 text-sm font-semibold mb-4"
            >
              About Us
            </Motion.span>

            {/* Main heading */}
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6"
            >
              Built for Modern
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Businesses {/* Gradient text effect */}
              </span>
            </Motion.h2>

            {/* Paragraph / description */}
            <Motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8"
            >
              {`Founded in 2020, ProductHub has grown from a simple idea to a platform 
          trusted by thousands of businesses worldwide. We believe that great 
          product management shouldn't require enterprise budgets or technical expertise.`}
            </Motion.p>

            {/* Values / Features grid */}
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-6"
            >
              {values.map((value: AboutValue) => (
                <div key={value.title} className="flex gap-4">
                  {/* Icon box */}
                  <div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br
               from-indigo-100 to-violet-100 dark:from-indigo-900/50 dark:to-violet-900/50
                flex items-center justify-center flex-shrink-0"
                  >
                    <value.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />{" "}
                    {/* Feature icon */}
                  </div>

                  {/* Title + Description */}
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                      {value.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </Motion.div>
          </div>

          {/* Image Column */}
          <Motion.div
            initial={{ opacity: 0, x: 30 }} // fade in from right
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            {/* Background gradient behind image */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-indigo-500
         to-violet-600 rounded-3xl transform rotate-3"
            />
            {/* Team / About image */}
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
              alt="Team working together"
              className="relative rounded-3xl shadow-2xl"
            />
          </Motion.div>
        </div>
      </div>
    </section>
  );
}

export interface AboutValue {
  icon: LucideIcon;
  title: string;
  description: string;
}

const values: AboutValue[] = [
  {
    icon: Target,
    title: "Mission",
    description:
      "To empower businesses of all sizes with intuitive product management tools.",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "We love building software that makes complex tasks simple and enjoyable.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Constantly pushing boundaries to bring you cutting-edge features.",
  },
  {
    icon: Globe,
    title: "Global",
    description:
      "Serving businesses in over 50 countries with localized support.",
  },
];
