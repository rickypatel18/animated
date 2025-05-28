import AnimatedText from "./(components)/AnimatedText";
import AnimatedSection from "./(components)/AnimatedSection";
import * as motion from "motion/react-client"; // Direct import for elements not wrapped
import Link from "next/link";
import { scale } from "framer-motion";

const featureCardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24">
        <AnimatedText
          text="Welcome to MotionSite"
          el="h1"
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-blue-500"
          staggerTime={0.05}
        />
        <AnimatedText
          text="Experience the power of smooth animations."
          el="p"
          className="text-lg sm:text-xl text-gray-300 mb-8"
          staggerTime={0.02}
          animation={{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.8 },
            },
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5, type: "spring" }}
        >
          <Link href="/servicess">
            <motion.button
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors text-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 15px rgba(20, 184, 166, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Services
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <AnimatedSection className="py-16" staggerChildren={0.3}>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
          Key Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Fluid Transitions",
              description: "Seamlessly move between states.",
            },
            {
              title: "Interactive Elements",
              description: "Engage users with dynamic UI.",
            },
            {
              title: "Scroll Magic",
              description: "Animations that react to scroll.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700"
              variants={featureCardVariants}
              // whileInView handled by AnimatedSection's children
              whileHover={{
                y: -10,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
              }}
            >
              <h3 className="text-2xl font-semibold mb-3 text-teal-400">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Call to Action Section */}
      <AnimatedSection className="py-16 text-center" delay={0.5}>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Let us bring your ideas to life with stunning animations and a modern
          web experience.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/contact"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors text-lg"
          >
            Contact Us
          </Link>
        </motion.div>
      </AnimatedSection>
    </div>
  );
}
