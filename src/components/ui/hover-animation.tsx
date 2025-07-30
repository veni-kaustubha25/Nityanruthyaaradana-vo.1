"use client";

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

interface HoverAnimationProps extends PropsWithChildren {
  className?: string;
  scale?: number;
  y?: number;
  rotate?: number;
  duration?: number;
  delay?: number;
  whileHover?: "scale" | "lift" | "rotate" | "glow" | "tilt";
  whileTap?: "scale" | "lift" | "rotate" | "glow" | "tilt";
}

export function HoverAnimation({ 
  children, 
  className = "",
  scale = 1.05,
  y = -8,
  rotate = 2,
  duration = 0.3,
  delay = 0,
  whileHover = "lift",
  whileTap = "scale"
}: HoverAnimationProps) {
  const getHoverVariants = () => {
    switch (whileHover) {
      case "scale":
        return {
          scale: scale,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }
        };
      case "lift":
        return {
          y: y,
          scale: 1.02,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }
        };
      case "rotate":
        return {
          rotate: rotate,
          scale: 1.02,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }
        };
      case "glow":
        return {
          scale: 1.02,
          boxShadow: "0 20px 40px rgba(139, 26, 26, 0.15)",
          transition: {
            duration,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }
        };
      case "tilt":
        return {
          rotateY: 5,
          rotateX: 2,
          scale: 1.02,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }
        };
      default:
        return {
          scale: scale,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }
        };
    }
  };

  const getTapVariants = () => {
    switch (whileTap) {
      case "scale":
        return {
          scale: 0.98,
          transition: {
            duration: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }
        };
      case "lift":
        return {
          y: y * 0.5,
          scale: 0.98,
          transition: {
            duration: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }
        };
      case "rotate":
        return {
          rotate: rotate * 0.5,
          scale: 0.98,
          transition: {
            duration: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }
        };
      case "glow":
        return {
          scale: 0.98,
          boxShadow: "0 10px 20px rgba(139, 26, 26, 0.1)",
          transition: {
            duration: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }
        };
      case "tilt":
        return {
          rotateY: 2,
          rotateX: 1,
          scale: 0.98,
          transition: {
            duration: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }
        };
      default:
        return {
          scale: 0.98,
          transition: {
            duration: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }
        };
    }
  };

  return (
    <motion.div
      className={className}
      whileHover={getHoverVariants()}
      whileTap={getTapVariants()}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
} 