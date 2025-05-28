// app/contact/page.tsx
"use client"; // For form handling and Framer Motion interactivity
import { useState } from "react";
import AnimatedText from "../(components)/AnimatedText";
import AnimatedSection from "../(components)/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";

const inputFieldVariants = {
  focus: {
    borderColor: "rgb(20 184 166)",
    boxShadow: "0 0 0 2px rgba(20, 184, 166, 0.3)",
    transition: { duration: 0.2 },
  },
  blur: {
    borderColor: "rgb(75 85 99)",
  },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AnimatedText
        text="Get In Touch"
        el="h1"
        className="text-4xl sm:text-5xl font-bold mb-10 text-center text-teal-400"
      />

      <AnimatedSection
        className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700"
        staggerChildren={0.2}
      >
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20, transition: { duration: 1 } }}
              className="mb-6 p-4 bg-green-600/30 border border-green-500 text-green-300 rounded-md text-center"
            >
              Thank you! Your message has been sent.
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6">
          {(["name", "email"] as const).map((fieldName, index) => (
            <motion.div
              key={fieldName}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 + 0.1 }}
            >
              <label
                htmlFor={fieldName}
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
              </label>
              <motion.input
                type={fieldName === "email" ? "email" : "text"}
                name={fieldName}
                id={fieldName}
                value={formData[fieldName]}
                onChange={handleChange}
                onFocus={() => setFocusedField(fieldName)}
                onBlur={() => setFocusedField(null)}
                animate={focusedField === fieldName ? "focus" : "blur"}
                variants={inputFieldVariants}
                required
                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 text-gray-100 rounded-md focus:ring-0 focus:outline-none placeholder-gray-500"
                placeholder={`Your ${fieldName}`}
              />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Message
            </label>
            <motion.textarea
              name="message"
              id="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              animate={focusedField === "message" ? "focus" : "blur"}
              variants={inputFieldVariants}
              required
              className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 text-gray-100 rounded-md focus:ring-0 focus:outline-none placeholder-gray-500"
              placeholder="Your message..."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <motion.button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-md shadow-md transition-colors text-lg"
              whileHover={{
                scale: 1.02,
                boxShadow: "0px 0px 12px rgba(20, 184, 166, 0.6)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </motion.div>
        </form>
      </AnimatedSection>

      {/* Draggable element example */}
      <div className="mt-16 flex justify-center">
        <motion.div
          className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold cursor-grab"
          drag
          dragConstraints={{ left: -200, right: 200, top: -50, bottom: 50 }}
          dragElastic={0.2}
          whileDrag={{
            scale: 1.1,
            rotate: 5,
          }}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 10,
            delay: 0.8,
            mass: 1,
            // ease: "easeInOut",
          }}
        >
          Drag Me!
        </motion.div>
      </div>
    </div>
  );
}
