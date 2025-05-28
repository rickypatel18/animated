"use client";
import { motion, Variants } from "framer-motion";
import { JSX } from "react";

interface AnimatedTextProps {
  text: string | string[];
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  once?: boolean;
  repeatDelay?: number;
  animation?: {
    hidden: Variants;
    visible: Variants;
  };
  staggerTime?: number; // Time in seconds for staggering children
}

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
};

const AnimatedText = ({
  text,
  el: Wrapper = "p",
  className,
  once,
  animation = defaultAnimations,
  staggerTime = 0.05,
}: AnimatedTextProps) => {
  const textArray = Array.isArray(text) ? text : [text];
  const containerVariants: Variants = {
    hidden: {}, // Can be empty if parent handles initial state
    visible: {
      transition: {
        staggerChildren: staggerTime,
        delayChildren: animation.visible.transition?.delay || 0,
      },
    },
  };

  return (
    <Wrapper className={className}>
      <motion.span className="sr-only">{textArray.join(" ")}</motion.span>
      <motion.span
        aria-hidden
        variants={containerVariants}
        initial="hidden"
        whileInView={once ? "visible" : undefined}
        animate={!once ? "visible" : undefined}
        viewport={{ once }}
      >
        {textArray.map((line, lineIndex) => (
          <span key={`${line}-${lineIndex}`} className="block">
            {line.split(" ").map((word, wordIndex) => (
              <span key={`${word}-${wordIndex}`} className="inline-block">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={`${char}-${charIndex}`}
                    className="inline-block"
                    variants={animation}
                  >
                    {char}
                  </motion.span>
                ))}
                <span className="inline-block"> </span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

export default AnimatedText;
