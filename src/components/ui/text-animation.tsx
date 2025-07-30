"use client";

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

interface TextAnimationProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  duration?: number;
  type?: "fade" | "slide" | "scale" | "reveal" | "typing";
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

export function TextAnimation({ 
  children, 
  className = "",
  delay = 0,
  duration = 0.8,
  type = "fade",
  direction = "up",
  distance = 30
}: TextAnimationProps) {
  const getVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }
      }
    };

    switch (type) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: {
              duration,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }
          }
        };
      case "slide":
        const slideVariants = {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: {
              duration,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }
          }
        };
        
        switch (direction) {
          case "up":
            return {
              hidden: { ...slideVariants.hidden, y: distance },
              visible: { ...slideVariants.visible, y: 0 }
            };
          case "down":
            return {
              hidden: { ...slideVariants.hidden, y: -distance },
              visible: { ...slideVariants.visible, y: 0 }
            };
          case "left":
            return {
              hidden: { ...slideVariants.hidden, x: distance },
              visible: { ...slideVariants.visible, x: 0 }
            };
          case "right":
            return {
              hidden: { ...slideVariants.hidden, x: -distance },
              visible: { ...slideVariants.visible, x: 0 }
            };
          default:
            return slideVariants;
        }
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
              duration,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }
          }
        };
      case "reveal":
        return {
          hidden: { 
            opacity: 0, 
            clipPath: "inset(0 100% 0 0)",
            y: distance 
          },
          visible: { 
            opacity: 1, 
            clipPath: "inset(0 0% 0 0)",
            y: 0,
            transition: {
              duration,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }
          }
        };
      case "typing":
        return {
          hidden: { 
            opacity: 0, 
            width: 0,
            overflow: "hidden"
          },
          visible: { 
            opacity: 1, 
            width: "100%",
            overflow: "visible",
            transition: {
              duration,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }
          }
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
      variants={getVariants()}
    >
      {children}
    </motion.div>
  );
}

interface StaggeredTextProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  staggerDelay?: number;
  type?: "fade" | "slide" | "scale" | "reveal" | "typing";
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

export function StaggeredText({ 
  children, 
  className = "",
  delay = 0,
  staggerDelay = 0.1,
  type = "fade",
  direction = "up",
  distance = 30
}: StaggeredTextProps) {
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

interface StaggeredTextItemProps extends PropsWithChildren {
  className?: string;
  type?: "fade" | "slide" | "scale" | "reveal" | "typing";
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

export function StaggeredTextItem({ 
  children, 
  className = "",
  type = "fade",
  direction = "up",
  distance = 30
}: StaggeredTextItemProps) {
  const getVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }
      }
    };

    switch (type) {
      case "fade":
        return baseVariants;
      case "slide":
        switch (direction) {
          case "up":
            return {
              hidden: { opacity: 0, y: distance },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
            };
          case "down":
            return {
              hidden: { opacity: 0, y: -distance },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
            };
          case "left":
            return {
              hidden: { opacity: 0, x: distance },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
            };
          case "right":
            return {
              hidden: { opacity: 0, x: -distance },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
            };
          default:
            return baseVariants;
        }
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
        };
      case "reveal":
        return {
          hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)", y: distance },
          visible: { opacity: 1, clipPath: "inset(0 0% 0 0)", y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
        };
      case "typing":
        return {
          hidden: { opacity: 0, width: 0, overflow: "hidden" },
          visible: { opacity: 1, width: "100%", overflow: "visible", transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
        };
      default:
        return baseVariants;
    }
  };

  return (
    <motion.div
      className={className}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  );
} 