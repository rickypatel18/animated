// app/about/page.tsx
import AnimatedText from "../(components)/AnimatedText";
import AnimatedSection from "../(components)/AnimatedSection";
import * as motion from "motion/react-client"; // Direct import for elements not wrapped


const teamMemberVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const svgVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: "spring", duration: 2, bounce: 0 },
      opacity: { duration: 0.5, delay: 0.2 }
    }
  }
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AnimatedText
        text="About MotionSite"
        el="h1"
        className="text-4xl sm:text-5xl font-bold mb-10 text-center text-teal-400"
        staggerTime={0.04}
      />

      <AnimatedSection className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-white">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              At MotionSite, we believe in the power of delightful user experiences.
              Our mission is to showcase how modern web technologies, particularly Framer Motion,
              can transform static websites into dynamic and engaging platforms.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We explore various animation techniques, from subtle micro-interactions to
              complex sequenced animations, always prioritizing performance and accessibility.
            </p>
          </div>
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
          >
            {/* Example SVG Animation */}
            <svg width="200" height="200" viewBox="0 0 100 100" className="text-teal-500">
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="7"
                fill="transparent"
                variants={svgVariants}
                initial="hidden"
                animate="visible" // Or whileInView
              />
              <motion.path
                d="M30 50 L50 70 L70 30"
                stroke="white"
                strokeWidth="5"
                fill="transparent"
                variants={svgVariants}
                initial="hidden"
                animate="visible" // Or whileInView
                custom={2} // If you need to pass custom data for variants
              />
            </svg>
          </motion.div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center text-white">Meet the (Imaginary) Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {["Riyan", "Dev", "Pehu"].map((name) => (
            <motion.div
              key={name}
              className="bg-gray-800 p-6 rounded-lg shadow-lg text-center border border-gray-700"
              variants={teamMemberVariants}
              // whileInView is handled by AnimatedSection
              whileHover={{ scale: 1.05, backgroundColor: "rgb(55 65 81)"}} // bg-gray-700
            >
              <motion.div
                className="w-24 h-24 rounded-full bg-teal-500 mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white"
                drag // Make it draggable
                dragConstraints={{ top: -10, left: -10, right: 10, bottom: 10 }}
                whileDrag={{ scale: 1.1, boxShadow: "0px 10px 12px #521212" }}
              >
                {name.charAt(0)}
              </motion.div>
              <h3 className="text-xl font-semibold text-white">{name}</h3>
              <p className="text-teal-400">Drag the Ball</p>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}