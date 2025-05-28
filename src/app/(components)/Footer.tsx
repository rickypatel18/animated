// app/(components)/Footer.tsx
"use client";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-800 text-gray-400 py-8 text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }} // Animate when 30% of footer is in view
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <p>© {new Date().getFullYear()} MotionSite. All rights reserved.</p>
        <p className="mt-2 text-sm">
          Powered by{" "}
          <motion.a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:text-teal-300"
            whileHover={{ letterSpacing: "2px" }}
          >
            Next.js 
          </motion.a>{" "}
          &{" "}
          <motion.a
            href="https://www.framer.com/motion/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:text-teal-300"
            whileHover={{ letterSpacing: "2px" }}
          >
            Framer Motion
          </motion.a>
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;