// app/(components)/AnimatedSection.tsx
"use client";
import { motion, Variants } from "framer-motion";
import { JSX } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  initial?: Variants["initial"];
  animate?: Variants["animate"];
  whileInView?: Variants["whileInView"];
  viewport?: object;
  transition?: object;
  el?: keyof JSX.IntrinsicElements;
}

const AnimatedSection = ({
  children,
  className,
  delay = 0,
  staggerChildren = 0.2,
  initial = { opacity: 0, y: 20 },
  animate, // Allow override for continuous animation
  whileInView = { opacity: 1, y: 0 },
  viewport = { once: true, amount: 0.2 },
  transition = { duration: 0.5, ease: "easeOut" },
  el: Wrapper = "section",
}: AnimatedSectionProps) => {
  const sectionVariants: Variants = {
    hidden: initial,
    visible: {
      ...(animate || whileInView), // Use animate if provided, else whileInView for visibility
      transition: {
        delay,
        staggerChildren,
        ...transition,
      },
    },
  };

  return (
    <Wrapper className={className}>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView={!animate ? "visible" : undefined} // Only use whileInView if animate isn't set
        animate={animate ? "visible" : undefined}       // Use animate if provided
        viewport={viewport}
      >
        {children}
      </motion.div>
    </Wrapper>
  );
};

export default AnimatedSection;