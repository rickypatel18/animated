"use client";

import { CircleCheckBig } from "lucide-react";
import AnimatedText from "../(components)/AnimatedText";
import { motion } from "framer-motion";  

const serviceItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      type: "spring",
      stiffness: 200,
    },
  }),
};

const services = [
  {
    title: "Interactive UI/UX Design",
    description:
      "Crafting user interfaces that are not only beautiful but also highly interactive and intuitive.",
    features: [
      "Micro-interactions",
      "Animated onboarding",
      "Dynamic data visualization",
    ],
    icon: "🎨",
  },
  {
    title: "Framer Motion Integration",
    description:
      "Expertly integrating Framer Motion into Next.js applications for smooth, performant animations.",
    features: [
      "Page transitions",
      "Scroll-triggered animations",
      "Gesture handling",
    ],
    icon: "🚀",
  },
  {
    title: "Performance Optimization",
    description:
      "Ensuring your animated website loads quickly and runs smoothly on all devices.",
    features: ["Lazy loading", "Code splitting", "Bundle optimization"],
    icon: "⚙️",
  },
  {
    title: "Interactive UI/UX Design 2",
    description:
      "Crafting user interfaces that are not only beautiful but also highly interactive and intuitive.",
    features: [
      "Micro-interactions",
      "Animated onboarding",
      "Dynamic data visualization",
    ],
    icon: "🎨",
  },
  {
    title: "Framer Motion Integration 2",
    description:
      "Expertly integrating Framer Motion into Next.js applications for smooth, performant animations.",
    features: [
      "Page transitions",
      "Scroll-triggered animations",
      "Gesture handling",
    ],
    icon: "🚀",
  },
  {
    title: "Performance Optimization 2",
    description:
      "Ensuring your animated website loads quickly and runs smoothly on all devices.",
    features: ["Lazy loading", "Code splitting", "Bundle optimization"],
    icon: "⚙️",
  },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AnimatedText
        text="Our Services"
        el="h1"
        className="text-4xl sm:text-5xl font-bold mb-12 text-center text-teal-400"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-700 flex flex-col"
            variants={serviceItemVariants}
            custom={index} // Pass index to variants for custom delay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 10px 30px rgba(20, 184, 166, 0.2)",
              transition: { duration: 0.2 },
            }}
          >
            <div className="text-5xl mb-6 text-teal-400">{service.icon}</div>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              {service.title}
            </h2>
            <p className="text-gray-300 mb-6 flex-grow">
              {service.description}
            </p>
            <ul className="space-y-2">
              {service.features.map((feature) => (
                <motion.li
                  key={feature}
                  className="flex items-center text-gray-300"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }} // Stagger features too
                  viewport={{ once: true }}
                >
                  <CircleCheckBig className="h-5 w-5 text-teal-500 mr-2 flex-shrink-0" />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
