"use client";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import AnimatedText from "../(components)/AnimatedText";

const boxVariants = {
  hover: { scale: 1.1, rotate: 5, boxShadow: "0px 10px 30px rgba(0,0,0,0.3)" },
  tap: { scale: 0.9, rotate: -5 },
  drag: { scale: 1.2, boxShadow: "0px 15px 35px rgba(0,0,0,0.4)" },
};

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 2, ease: "easeInOut" },
  },
};

const PlaygroundPage = () => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect: moves faster than scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const [count, setCount] = useState(0);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AnimatedText
        text="Animation Playground"
        el="h1"
        className="text-4xl sm:text-5xl font-bold mb-10 text-center text-teal-400"
      />

      {/* Section 1: Gestures & Drag */}
      <section className="mb-16 p-6 bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-white">
          Gestures & Drag
        </h2>
        <div className="flex flex-wrap justify-around items-center gap-8">
          <motion.div
            className="w-32 h-32 bg-teal-500 rounded-lg cursor-pointer flex items-center justify-center text-white font-bold"
            variants={boxVariants}
            whileHover="hover"
            whileTap="tap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}  
          >
            Hover & Tap
          </motion.div>
          <motion.div
            className="w-32 h-32 bg-blue-600 rounded-full cursor-grab flex items-center justify-center text-white font-bold"
            drag
            dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
            dragElastic={0.1}
            variants={boxVariants}
            whileDrag="drag"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
          >
            Drag Me
          </motion.div>
          <motion.div
            className="w-32 h-32 bg-pink-500 rounded-md cursor-pointer flex items-center justify-center text-white font-bold"
            whileHover={{
              scale: [1, 1.2, 1, 1.2, 1],
              rotate: [0, 10, -10, 10, 0],
            }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
          >
            Keyframes
          </motion.div>
        </div>
      </section>

      {/* Section 2: Scroll-triggered Parallax Box */}
      <section className="h-[150vh] relative mb-16 ">
      
        <h2 className="text-2xl font-semibold mb-6 text-white text-center sticky top-24 z-10">
          Scroll Parallax
        </h2>
        <div
          ref={scrollRef}
          className="h-full flex items-center justify-center sticky top-1/3"
        >
          <motion.div
            className="w-48 h-48 sm:w-64 sm:h-64 bg-purple-600 rounded-xl shadow-2xl flex items-center justify-center text-white text-xl font-bold"
            style={{ y, scale, opacity }} 
          >
            Scroll Me
          </motion.div>
        </div>
      </section>

      {/* Section 3: SVG Path Animation */}
      <section className="mb-16 p-6 bg-gray-800 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-6 text-white">
          SVG Path Drawing
        </h2>
        <svg width="200" height="150" viewBox="0 0 200 150" className="mx-auto">
          <motion.path
            d="M 20 130 Q 100 20 180 130"
            stroke="rgb(20 184 166)"
            strokeWidth="8"
            fill="transparent"
            variants={pathVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          />
          <motion.circle
            cx="100"
            cy="70"
            r="15"
            fill="rgb(59 130 246)"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              transition: { delay: 1.5, type: "spring" },
            }}
            viewport={{ once: true, amount: 0.5 }}
          />
        </svg>
      </section>

      {/* Section 4: AnimatePresence with Counter */}
      <section className="mb-16 p-6 bg-gray-800 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-6 text-white">
          AnimatePresence: Counter
        </h2>
        <motion.button
          onClick={() => setCount((prev) => prev + 1)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded mb-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Increment
        </motion.button>
        <div className="relative h-20 w-20 mx-auto bg-gray-700 rounded-md overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={count}
              initial={{
                opacity: 0,
                y: 20,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              animate={{
                opacity: 1,
                y: 0,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="flex items-center justify-center text-4xl font-bold text-white"
            >
              {count}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default PlaygroundPage;
