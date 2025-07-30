"use client";

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

interface StaggeredAnimationProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

export function StaggeredAnimation({ 
  children, 
  className = "", 
  delay = 0,
  staggerDelay = 0.1,
  direction = "up",
  distance = 20
}: StaggeredAnimationProps) {
  const getDirectionalVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }
      }
    };

    switch (direction) {
      case "up":
        return {
          hidden: { ...baseVariants.hidden, y: distance },
          visible: { ...baseVariants.visible, y: 0 }
        };
      case "down":
        return {
          hidden: { ...baseVariants.hidden, y: -distance },
          visible: { ...baseVariants.visible, y: 0 }
        };
      case "left":
        return {
          hidden: { ...baseVariants.hidden, x: distance },
          visible: { ...baseVariants.visible, x: 0 }
        };
      case "right":
        return {
          hidden: { ...baseVariants.hidden, x: -distance },
          visible: { ...baseVariants.visible, x: 0 }
        };
      default:
        return baseVariants;
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggeredItemProps extends PropsWithChildren {
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

export function StaggeredItem({ 
  children, 
  className = "",
  direction = "up",
  distance = 20
}: StaggeredItemProps) {
  const getDirectionalVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }
      }
    };

    switch (direction) {
      case "up":
        return {
          hidden: { ...baseVariants.hidden, y: distance },
          visible: { ...baseVariants.visible, y: 0 }
        };
      case "down":
        return {
          hidden: { ...baseVariants.hidden, y: -distance },
          visible: { ...baseVariants.visible, y: 0 }
        };
      case "left":
        return {
          hidden: { ...baseVariants.hidden, x: distance },
          visible: { ...baseVariants.visible, x: 0 }
        };
      case "right":
        return {
          hidden: { ...baseVariants.hidden, x: -distance },
          visible: { ...baseVariants.visible, x: 0 }
        };
      default:
        return baseVariants;
    }
  };

  return (
    <motion.div
      className={className}
      variants={getDirectionalVariants()}
    >
      {children}
    </motion.div>
  );
} 